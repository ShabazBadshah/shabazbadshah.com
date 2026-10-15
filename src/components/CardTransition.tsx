import { useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { createContext, useCallback, useContext, useMemo, useRef } from 'react';

/** Seconds the card takes to grow into the article (and shrink back); the only timing to tune. */
export const EXPAND_DURATION = 0.2;
export const EXPAND_EASE = 'easeOut';

/** Where the opened card was, so the article can grow out of it and collapse back into it */
export type CardOrigin = {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: number;
  /** Snapshot of the clicked card, faded out while the article grows */
  html: string;
};

type Transition = {
  /**
   * Shallow-route to `href` (a same-page route the page renders itself), shown in the URL as
   * `mask`, and remember the card so the article can grow out of it.
   */
  open: (href: string, card: HTMLElement, mask: string) => void;
  /** Origin of the last opened card, undefined when motion is reduced */
  origin: () => CardOrigin | undefined;
};

const noop = () => undefined;
const CardTransitionContext = createContext<Transition>({ open: noop, origin: noop });

export const useCardTransition = (): Transition => useContext(CardTransitionContext);

export default function CardTransitionProvider({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const originRef = useRef<CardOrigin | undefined>();

  const open = useCallback(
    (href: string, card: HTMLElement, mask: string) => {
      const rect = card.getBoundingClientRect();
      originRef.current = reduceMotion
        ? undefined
        : {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            radius: parseFloat(getComputedStyle(card).borderTopLeftRadius) || 24,
            html: card.outerHTML
          };
      router.push(href, mask, { scroll: false, shallow: true });
    },
    [reduceMotion, router]
  );

  const value = useMemo(() => ({ open, origin: () => originRef.current }), [open]);

  return <CardTransitionContext.Provider value={value}>{children}</CardTransitionContext.Provider>;
}
