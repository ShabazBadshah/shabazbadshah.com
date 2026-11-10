import { m } from 'framer-motion';
import { ArrowLeft, ArrowUp, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';

import { siteConfig, type NavSection } from '@/config/site';
import { content } from '@/content/content';

const LAYOUT_TRANSITION = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

/** Active nav item, from the route. /clinics belongs to Consulting. */
const activeSection = (pathname: string): NavSection | null => {
  if (pathname.startsWith('/work')) return 'work';
  if (pathname === '/consulting' || pathname === '/clinics') return 'consulting';
  if (pathname.startsWith('/blog')) return 'blog';
  return null;
};

/** Detail pages get a back button to their index */
const BACK: Record<string, string> = {
  '/blog/posts/[slug]': '/blog',
  '/work/[slug]': '/work'
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

/**
 * Shown once the reader has scrolled past the hero (or one viewport on pages without one).
 * Sits above the nav on mobile and floats bottom-right from sm.
 */
function ScrollToTop(): JSX.Element {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.getElementById('hero');
      const threshold = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
      setVisible(window.scrollY > threshold);
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
  }, []);

  return (
    <button
      type="button"
      aria-label={content.layout.scrollToTop.label}
      title={content.layout.scrollToTop.title}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`col-start-3 row-start-1 grid size-11 justify-self-end cursor-pointer place-items-center rounded-full border bg-elevated text-fg shadow-float backdrop-blur-lg backdrop-saturate-180 transition-[opacity,transform] duration-200 hover:border-line-strong sm:fixed sm:bottom-6 sm:right-6 ${
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </button>
  );
}

export default function Header(): JSX.Element | null {
  const { pathname, query } = useRouter();
  const active = activeSection(pathname);
  const back = BACK[pathname];

  // The article sheet takes over the whole screen
  if (query.post) return null;

  // Next's router jumps to the top on a route change; on the home page glide there instead,
  // like the hash links do, and drop any #contact from the URL
  const scrollHome = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') return;
    event.preventDefault();
    window.history.replaceState(window.history.state, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 bottom-6 z-40 grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 sm:bottom-auto sm:top-4 sm:px-4">
      {/* Detail pages only; the article sheet has its own collapse control */}
      {back && (
        <Link href={back}>
          <a
            aria-label={content.nav.back}
            className="pointer-events-auto col-start-1 row-start-1 inline-flex h-10 items-center gap-1.5 justify-self-start rounded-pill border bg-elevated px-3 text-sm shadow-float font-medium text-fg-muted no-underline backdrop-blur-lg backdrop-saturate-180 transition-colors hover:text-fg sm:px-4"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">{content.nav.back}</span>
          </a>
        </Link>
      )}
      {/* Below sm the nav gets its own full-width row, with the back and scroll buttons above it */}
      <nav
        aria-label={content.nav.label}
        className="pointer-events-auto col-span-3 row-start-2 flex items-center gap-0.5 justify-self-center rounded-pill sm:col-span-1 sm:col-start-2 sm:row-start-1 border bg-elevated p-1 shadow-float backdrop-blur-lg backdrop-saturate-180"
      >
        <Link href="/" prefetch={false}>
          <a
            aria-label={content.nav.home}
            onClick={scrollHome}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-pill"
          >
            <img src={siteConfig.assets.favicon} alt="" width={32} height={32} className="size-7" />
          </a>
        </Link>
        {siteConfig.nav.map((item) => {
          const isActive = active === item.section;
          const className = `relative inline-flex h-8 items-center rounded-pill px-1.5 text-sm font-medium no-underline transition-colors duration-150 sm:px-4 sm:text-[0.9375rem] ${
            isActive ? 'text-accent' : 'text-fg-muted hover:text-fg'
          }`;
          const label = (
            <>
              {isActive && (
                <m.span
                  layoutId="nav-active"
                  transition={LAYOUT_TRANSITION}
                  className="absolute inset-0 rounded-pill bg-fill"
                  aria-hidden="true"
                />
              )}
              <span className="relative">{item.label}</span>
            </>
          );
          // #contact is the footer of the current page, so a plain in-page link
          return item.href.startsWith('#') ? (
            <a key={item.label} href={item.href} className={className}>
              {label}
            </a>
          ) : (
            <Link key={item.label} href={item.href} prefetch={false}>
              <a aria-current={isActive ? 'page' : undefined} className={className}>
                {label}
              </a>
            </Link>
          );
        })}
        <span aria-hidden="true" className="mx-0.5 h-5 w-px bg-line" />
        <ThemeToggle />
      </nav>
      <ScrollToTop />
    </header>
  );
}
