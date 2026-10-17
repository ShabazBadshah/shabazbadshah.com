import { m } from 'framer-motion';
import { Minimize2 } from 'lucide-react';
import Head from 'next/head';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import BlogArticle from '@/components/blog/BlogArticle';
import {
  EXPAND_DURATION,
  EXPAND_EASE,
  useCardTransition,
  type CardOrigin
} from '@/components/CardTransition';
import CornerButton from '@/components/CornerButton';
import { siteConfig } from '@/config/site';
import type { Post } from '@/lib/blog';

type Props = {
  post: Post;
  /** The route has left the article: shrink back into its card, then call onExited */
  closing: boolean;
  onClose: () => void;
  onExited: () => void;
};

type Box = Pick<CardOrigin, 'left' | 'top' | 'width' | 'height'>;

const margin = () => (window.innerWidth >= 640 ? 12 : 8);

/** clip-path revealing a viewport-space box inside the frame (the viewport inset by `margin`) */
const clipTo = (box: Box, radius: number) => {
  const m = margin();
  const frameW = window.innerWidth - m * 2;
  const frameH = window.innerHeight - m * 2;
  const top = Math.max(box.top - m, 0);
  const left = Math.max(box.left - m, 0);
  const right = Math.max(frameW - left - box.width, 0);
  const bottom = Math.max(frameH - top - box.height, 0);
  return `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius}px)`;
};

/**
 * Full-screen article over the home page. It is the clicked card, grown: a bordered frame whose
 * clip-path expands from the card's box to the whole frame (and back), with the card's snapshot
 * fading out on top. The article is already rendered inside, so there is nothing to load.
 */
export default function ArticleSheet({ post, closing, onClose, onExited }: Props): JSX.Element {
  const { origin } = useCardTransition();
  const [from] = useState(origin);
  const scroller = useRef<HTMLDivElement>(null);
  // Where the home page was scrolled when the card was opened, restored exactly on the way out
  const [homeScroll] = useState(() => window.scrollY);
  const radius = from?.radius ?? 24;

  // Lock the page behind the sheet, keeping its width steady when the scrollbar disappears
  useEffect(() => {
    const { documentElement, body } = document;
    const previous = [documentElement.style.overflow, body.style.overflow, body.style.paddingRight];
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    documentElement.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    scroller.current?.focus({ preventScroll: true });
    return () => {
      [documentElement.style.overflow, body.style.overflow, body.style.paddingRight] = previous;
    };
  }, []);

  // The page behind never moves while the sheet exists: the router (or the browser, on Back) may
  // try to scroll it, and <html> is scroll-smooth, so undo any such scroll before it is painted
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    const pin = () => {
      if (window.scrollY !== homeScroll) window.scrollTo(0, homeScroll);
    };
    window.addEventListener('scroll', pin);
    return () => {
      window.removeEventListener('scroll', pin);
      root.style.scrollBehavior = previous;
    };
  }, [homeScroll]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // On the way out, collapse onto the card where it sits now (the page keeps its scroll position)
  const [collapseTo, setCollapseTo] = useState<Box>();
  useLayoutEffect(() => {
    if (!closing) return;
    window.scrollTo(0, homeScroll);
    // The router may scroll once its own transition finishes, so reassert on the next frame
    const frame = requestAnimationFrame(() => window.scrollTo(0, homeScroll));
    const rect = document
      .querySelector<HTMLElement>(`[data-card="${post.slug}"]`)
      ?.getBoundingClientRect();
    if (rect) {
      setCollapseTo({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    }
    return () => cancelAnimationFrame(frame);
  }, [closing, post.slug, homeScroll]);

  const open = clipTo(
    { left: margin(), top: margin(), width: window.innerWidth, height: window.innerHeight },
    radius
  );
  const collapseBox = collapseTo ?? from;
  const target = closing && collapseBox ? clipTo(collapseBox, radius) : open;

  return (
    <>
      {/* Darkens the strip of page left visible around the sheet */}
      <m.div
        aria-hidden="true"
        className="fixed inset-0 z-30 bg-black/70"
        initial={{ opacity: from ? 0 : 1 }}
        animate={{ opacity: closing ? 0 : 1 }}
        transition={{ duration: from ? EXPAND_DURATION : 0, ease: EXPAND_EASE }}
        onClick={onClose}
      />
      <m.div
        aria-hidden={closing || undefined}
        className="fixed z-30 overflow-hidden border border-line bg-surface"
        style={{
          inset: margin(),
          borderRadius: radius,
          pointerEvents: closing ? 'none' : undefined
        }}
        initial={{ clipPath: from ? clipTo(from, radius) : open }}
        animate={{ clipPath: target }}
        transition={{ duration: from ? EXPAND_DURATION : 0, ease: EXPAND_EASE }}
        onAnimationComplete={() => {
          if (!closing) return;
          window.scrollTo(0, homeScroll);
          onExited();
        }}
      >
        <Head>
          <title>{siteConfig.seo.postTitle(post.title)}</title>
        </Head>
        <div
          ref={scroller}
          role="dialog"
          aria-label={post.title}
          tabIndex={-1}
          className="absolute inset-0 scroll-pt-16 overflow-y-auto overscroll-contain outline-none"
        >
          <div className="mx-auto w-full max-w-article px-4 pb-16 pt-20 sm:px-6">
            <BlogArticle post={post} />
          </div>
        </div>
        <CornerButton
          icon={Minimize2}
          onClick={onClose}
          aria-label="Collapse article"
          title="Collapse"
        />
        {from && (
          <m.div
            aria-hidden="true"
            className="pointer-events-none absolute [&>*]:!m-0 [&>*]:!transform-none"
            style={{
              left: from.left - margin() - 1,
              top: from.top - margin() - 1,
              width: from.width,
              height: from.height
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: closing ? 1 : 0 }}
            transition={{ duration: EXPAND_DURATION, ease: EXPAND_EASE }}
            dangerouslySetInnerHTML={{ __html: from.html }}
          />
        )}
      </m.div>
    </>
  );
}
