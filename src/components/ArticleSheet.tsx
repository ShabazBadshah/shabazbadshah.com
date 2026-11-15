import { m } from 'framer-motion';
import { Minimize2 } from 'lucide-react';
import Head from 'next/head';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import {
  COLLAPSE_DURATION,
  EXPAND_DURATION,
  EXPAND_EASE,
  FADE_SHARE,
  useCardTransition
} from '@/components/CardTransition';
import CornerButton from '@/components/CornerButton';
import { content } from '@/content/content';
import { clipTo, usePinnedScroll, useScrollLock, type Box } from '@/lib/article-sheet';
import { useCloseSound } from '@/lib/close-sound';

type Props = {
  /** `data-card` of the card the sheet grew out of, to shrink back into */
  card: string;
  /** Dialog label */
  label: string;
  /** Document title while the sheet is open */
  pageTitle: string;
  children: React.ReactNode;
  /** The article is closing: shrink back into its card, then call onExited */
  closing: boolean;
  onClose: () => void;
  onExited: () => void;
};

/**
 * Full-screen article over the page. It is the clicked card, grown: a viewport-sized frame whose
 * clip-path expands from the card's box to the whole viewport (and back). Its content fades through,
 * like Material's container transform: the card's snapshot fades out early in the growth, then the
 * article fades in (and the reverse on the way back), so the two never sit half-faded over each
 * other. The article is already rendered inside, so there is nothing to load.
 */
export default function ArticleSheet({
  card,
  label,
  pageTitle,
  children,
  closing,
  onClose,
  onExited
}: Props): JSX.Element {
  const { origin } = useCardTransition();
  const [from] = useState(origin);
  const scroller = useRef<HTMLDivElement>(null);
  // Where the home page was scrolled when the card was opened, restored exactly on the way out
  const [homeScroll] = useState(() => window.scrollY);
  const radius = from?.radius ?? 24;
  const duration = from ? (closing ? COLLAPSE_DURATION : EXPAND_DURATION) : 0;
  const frame = { duration, ease: EXPAND_EASE };
  // The outgoing content fades over the first FADE_SHARE of the move, the incoming over the rest
  const fadeOut = { duration: duration * FADE_SHARE, ease: 'linear' as const };
  const fadeIn = {
    duration: duration * (1 - FADE_SHARE),
    delay: duration * FADE_SHARE,
    ease: 'easeOut' as const
  };
  useCloseSound(!closing);

  useScrollLock(scroller);
  usePinnedScroll(homeScroll);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      // An image lightbox open over the article takes its own Escape
      if (event.key === 'Escape' && !document.querySelector('.yarl__root')) onClose();
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
      .querySelector<HTMLElement>(`[data-card="${card}"]`)
      ?.getBoundingClientRect();
    if (rect) {
      setCollapseTo({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    }
    return () => cancelAnimationFrame(frame);
  }, [closing, card, homeScroll]);

  const open = clipTo({ left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }, 0);
  const collapseBox = collapseTo ?? from;
  const target = closing && collapseBox ? clipTo(collapseBox, radius) : open;

  return (
    <>
      {/* Darkens the page around the card while it grows and shrinks */}
      <m.div
        aria-hidden="true"
        className="fixed inset-0 z-50 bg-black/40"
        initial={{ opacity: from ? 0 : 1 }}
        animate={{ opacity: closing ? 0 : 1 }}
        transition={frame}
        onClick={onClose}
      />
      <m.div
        aria-hidden={closing || undefined}
        className="fixed inset-0 z-50 overflow-hidden bg-surface"
        style={{ pointerEvents: closing ? 'none' : undefined }}
        initial={{ clipPath: from ? clipTo(from, radius) : open }}
        animate={{ clipPath: target }}
        transition={frame}
        onAnimationComplete={() => {
          if (!closing) return;
          window.scrollTo(0, homeScroll);
          onExited();
        }}
      >
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <m.div
          className="absolute inset-0"
          initial={{ opacity: from ? 0 : 1, y: from ? 16 : 0 }}
          animate={closing ? { opacity: 0, y: 0 } : { opacity: 1, y: 0 }}
          transition={closing ? fadeOut : fadeIn}
        >
          <div
            ref={scroller}
            role="dialog"
            aria-label={label}
            tabIndex={-1}
            // The article starts lower on a page of its own (7rem), where the gutters' sticky lists
            // default to; here they stick level with the article's top instead
            className="absolute inset-0 scroll-pt-16 overflow-y-auto overscroll-contain outline-none [--article-top:5rem]"
          >
            <div className="mx-auto w-full max-w-article px-4 pb-16 pt-20 sm:px-6">{children}</div>
          </div>
          <CornerButton
            icon={Minimize2}
            onClick={onClose}
            data-close-sound
            aria-label={content.blog.collapse.label}
            title={content.blog.collapse.title}
          />
        </m.div>
        {from && (
          <m.div
            aria-hidden="true"
            className="pointer-events-none absolute [&>*]:!m-0 [&>*]:!transform-none"
            style={{
              left: from.left,
              top: from.top,
              width: from.width,
              height: from.height
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: closing ? 1 : 0 }}
            transition={closing ? fadeIn : fadeOut}
            dangerouslySetInnerHTML={{ __html: from.html }}
          />
        )}
      </m.div>
    </>
  );
}
