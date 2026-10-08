import { m } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ThemeToggle from '@/components/shared/ThemeToggle';
import { siteConfig } from '@/config/site';
import { LAYOUT_TRANSITION } from '@/lib/motion';

type Section = 'home' | 'work' | 'blog' | null;

const SCROLL_SECTIONS: Exclude<Section, 'home' | null>[] = ['work', 'blog'];

/** Active nav item: derived from the route on detail pages, from scroll position on the home page. */
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
  if (pathname.startsWith('/blog')) return 'blog';
  if (pathname.startsWith('/work')) return 'work';
  return null;
};

export default function Header(): JSX.Element {
  const active = useActiveSection();
  const { query } = useRouter();

  // The article sheet takes over the whole screen
  if (query.post) return <></>;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-4">
      <nav
        aria-label="Primary"
        className="glass pointer-events-auto flex items-center gap-0.5 rounded-pill border border-line bg-elevated p-1"
      >
        <Link href="/" prefetch={false}>
          <a
            aria-label="Home"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-pill"
          >
            <img src="/favicon.svg" alt="" width={32} height={32} className="size-7" />
          </a>
        </Link>
        {siteConfig.nav.items.map((item) => {
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
