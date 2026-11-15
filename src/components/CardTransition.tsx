import { useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { createContext, useCallback, useContext, useMemo, useRef } from 'react';

/** Seconds the card takes to grow into the article, and to shrink back into its card */
export const EXPAND_DURATION = 0.45;
export const COLLAPSE_DURATION = 0.35;
/** Material's emphasized curve: leaves quickly, then settles slowly into place */
export const EXPAND_EASE = [0.2, 0, 0, 1] as const;
/** Share of the duration the outgoing content takes to fade, before the incoming fades in */
export const FADE_SHARE = 0.3;

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
  /** Remember the card without routing, for a sheet the page opens from its own state */
  remember: (card: HTMLElement) => void;
  /** Origin of the last opened card, undefined when motion is reduced */
  origin: () => CardOrigin | undefined;
};

const noop = () => undefined;

/**
 * The card's HTML for its snapshot. A subgrid row (the /work list) takes its columns from the grid
 * around it, which the snapshot is outside of, so it keeps those column widths inline: the grid's,
 * less the padding the row and any subgrid between them take from the first and last columns.
 */
const snapshot = (card: HTMLElement): string => {
  const clone = card.cloneNode(true) as HTMLElement;
  let grid: HTMLElement | null = card;
  let left = 0;
  let right = 0;
  while (grid && getComputedStyle(grid).gridTemplateColumns.startsWith('subgrid')) {
    const style = getComputedStyle(grid);
    left += parseFloat(style.paddingLeft) + parseFloat(style.borderLeftWidth);
    right += parseFloat(style.paddingRight) + parseFloat(style.borderRightWidth);
    grid = grid.parentElement;
  }
  if (grid && grid !== card) {
    const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').map(parseFloat);
    columns[0] -= left;
    columns[columns.length - 1] -= right;
    clone.style.gridTemplateColumns = columns.map((width) => `${width}px`).join(' ');
  }
  return clone.outerHTML;
};
const CardTransitionContext = createContext<Transition>({
  open: noop,
  remember: noop,
  origin: noop
});

export const useCardTransition = (): Transition => useContext(CardTransitionContext);

export default function CardTransitionProvider({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const originRef = useRef<CardOrigin | undefined>();

  const remember = useCallback(
    (card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      originRef.current = reduceMotion
        ? undefined
        : {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            radius: parseFloat(getComputedStyle(card).borderTopLeftRadius) || 24,
            html: snapshot(card)
          };
    },
    [reduceMotion]
  );

  const open = useCallback(
    (href: string, card: HTMLElement, mask: string) => {
      remember(card);
      router.push(href, mask, { scroll: false, shallow: true });
    },
    [remember, router]
  );

  const value = useMemo(
    () => ({ open, remember, origin: () => originRef.current }),
    [open, remember]
  );

  return <CardTransitionContext.Provider value={value}>{children}</CardTransitionContext.Provider>;
}
