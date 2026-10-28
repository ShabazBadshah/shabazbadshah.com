import { m } from 'framer-motion';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';

import { siteConfig } from '@/config/site';
import { content } from '@/content/content';

type Section = 'home' | 'work' | 'blog' | null;

const SCROLL_SECTIONS = ['work', 'blog'] as const;
const LAYOUT_TRANSITION = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

/** Active nav item: derived from the route on blog pages, from scroll position on the home page. */
const useActiveSection = (): Section => {
  const { pathname } = useRouter();
  const [scrolled, setScrolled] = useState<Section>('home');

  useEffect(() => {
    if (pathname !== '/') return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold = window.innerHeight * 0.4;
      let current: Section = 'home';
      for (const id of SCROLL_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) current = id;
      }
      setScrolled(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  if (pathname === '/') return scrolled;
  return pathname.startsWith('/blog') ? 'blog' : null;
};

function ThemeToggle(): JSX.Element {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  // Reveal the new theme as a circle expanding from the button. The View Transitions API is
  // missing from this TypeScript version's DOM types; browsers without it switch instantly.
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? 'light' : 'dark';
    const doc = document as Document & {
      startViewTransition?: (update: () => void) => { ready: Promise<void> };
    };
    if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(next);
      return;
    }

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // flushSync commits the theme (next-themes applies its class in an effect) before the snapshot
    doc
      .startViewTransition(() => flushSync(() => setTheme(next)))
      .ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 750,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
  };

  const { theme } = content.nav;
  const label = !mounted ? theme.toggle : isDark ? theme.toLight : theme.toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-pill text-fg-muted transition-colors hover:text-fg"
    >
      {/* Both icons are rendered and swapped with CSS so there is no hydration mismatch or layout shift */}
      <Sun aria-hidden="true" className="hidden size-[18px] dark:block" />
      <Moon aria-hidden="true" className="size-[18px] dark:hidden" />
    </button>
  );
}

export default function Header(): JSX.Element | null {
  const active = useActiveSection();
  const { pathname, query } = useRouter();

  // The article sheet takes over the whole screen
  if (query.post) return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 bottom-3 z-40 grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 sm:bottom-auto sm:top-4 sm:px-4">
      {/* Full article page only; the article sheet has its own collapse control */}
      {pathname === '/blog/posts/[slug]' && (
        <Link href="/">
          <a
            aria-label={content.nav.back}
            className="pointer-events-auto inline-flex h-10 items-center gap-1.5 justify-self-start rounded-pill border bg-elevated px-3 text-sm shadow-float font-medium text-fg-muted no-underline backdrop-blur-lg backdrop-saturate-180 transition-colors hover:text-fg sm:px-4"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">{content.nav.back}</span>
          </a>
        </Link>
      )}
      <nav
        aria-label={content.nav.label}
        className="pointer-events-auto col-start-2 flex items-center gap-0.5 rounded-pill border bg-elevated p-1 shadow-float backdrop-blur-lg backdrop-saturate-180"
      >
        <Link href="/" prefetch={false}>
          <a
            aria-label={content.nav.home}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-pill"
          >
            <img src={siteConfig.assets.favicon} alt="" width={32} height={32} className="size-7" />
          </a>
        </Link>
        {siteConfig.nav.map((item) => {
          const isActive = active === item.section;
          return (
            <Link
              key={item.label}
              href={item.href}
              scroll={item.section === 'home'}
              prefetch={false}
            >
              <a
                aria-current={isActive ? 'true' : undefined}
                className={`relative inline-flex h-8 items-center rounded-pill px-3 text-[0.9375rem] font-medium no-underline transition-colors duration-150 sm:px-4 ${
                  isActive ? 'text-accent' : 'text-fg-muted hover:text-fg'
                }`}
              >
                {isActive && (
                  <m.span
                    layoutId="nav-active"
                    transition={LAYOUT_TRANSITION}
                    className="absolute inset-0 rounded-pill bg-fill"
                    aria-hidden="true"
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            </Link>
          );
        })}
        <span aria-hidden="true" className="mx-0.5 h-5 w-px bg-line" />
        <ThemeToggle />
      </nav>
    </header>
  );
}
