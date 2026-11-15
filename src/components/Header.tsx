import { ArrowLeft, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import NavBar from '@/components/NavBar';
import { content } from '@/content/content';

/**
 * Detail pages get a back button to their index, lined up from sm with the article's left edge
 * (--article-left, set on the header), or on a case study from 2xl with its left sidebar: --gap
 * (4rem) and up to 200px further left (see CaseStudyArticle.tsx). The header has 1rem of padding.
 */
const BACK: Record<string, { href: string; align: string }> = {
  '/blog/posts/[slug]': { href: '/blog', align: 'sm:ml-[calc(var(--article-left)_-_1rem)]' },
  '/work/[slug]': {
    href: '/work',
    align:
      'sm:ml-[calc(var(--article-left)_-_1rem)] 2xl:ml-[calc(var(--article-left)_-_5rem_-_min(200px,var(--article-left)_-_6rem))]'
  }
};

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
      className={`col-start-3 row-start-1 grid size-11 justify-self-end cursor-pointer place-items-center rounded-full bg-elevated text-fg shadow-float backdrop-blur-lg backdrop-saturate-180 transition-[opacity,transform] duration-200 sm:fixed sm:bottom-6 sm:right-6 ${
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
  const back = BACK[pathname];

  // The article sheet takes over the whole screen
  if (query.post) return null;

  return (
    <header
      data-site-header=""
      // A size container, so --article-left (the article column's left edge, from MainLayout's
      // max-w-article and its 1.5rem padding) can be worked out from the header's own width
      // Below sm the row sits at the bottom of a box as tall as the small viewport, so it stays put
      // while the browser's toolbar shows and hides (a `bottom` offset moves with it). The gaps are
      // tighter, so the back button, nav and scroll button fit on one row on a 360px screen.
      className="@container pointer-events-none fixed inset-x-0 top-0 z-40 grid h-[calc(100svh-1.25rem)] grid-cols-[1fr_auto_1fr] content-end items-center gap-1 px-2 [--article-left:max(1.5rem,calc((100cqw_-_var(--container-article))/2_+_2.5rem))] sm:top-8 sm:h-auto sm:content-normal sm:gap-2 sm:px-4"
    >
      {/* Detail pages only; the article sheet has its own collapse control */}
      {back && (
        <Link href={back.href}>
          <a
            aria-label={content.nav.back}
            // Lined up with the nav pill, which grows downwards into the contact dialog from sm
            className={`pointer-events-auto col-start-1 row-start-1 ${back.align} inline-flex h-10 items-center gap-1.5 justify-self-start rounded-pill border bg-elevated px-3 text-sm shadow-float font-medium text-fg-muted no-underline backdrop-blur-lg backdrop-saturate-180 transition-colors hover:text-fg sm:mt-1 sm:self-start sm:px-4`}
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">{content.nav.back}</span>
          </a>
        </Link>
      )}
      {/* Below sm the back and scroll buttons sit either side of the nav, on one row */}
      <NavBar pathname={pathname} />
      <ScrollToTop />
    </header>
  );
}
