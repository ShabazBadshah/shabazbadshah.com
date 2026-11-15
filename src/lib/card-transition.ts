import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
/** Origin of the last opened card, undefined when motion is reduced */
let origin: CardOrigin | undefined;

export const cardOrigin = (): CardOrigin | undefined => origin;

/** Remember the card without routing, for a sheet the page opens from its own state */
export const rememberCard = (card: HTMLElement): void => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    origin = undefined;
    return;
  }
  const rect = card.getBoundingClientRect();
  origin = {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    radius: parseFloat(getComputedStyle(card).borderTopLeftRadius) || 24,
    html: snapshot(card)
  };
};

/**
 * Shallow-route to `href` (a same-page route the page renders itself), shown in the URL as
 * `mask`, and remember the card so the article can grow out of it.
 */
export const openCard = (href: string, card: HTMLElement, mask: string): void => {
  rememberCard(card);
  Router.push(href, mask, { scroll: false, shallow: true });
};

/**
 * A case study sheet opened from a card, routed like the blog cards: a shallow route to
 * `<this page>?project=<slug>`, masked as `/work/<slug>`, so the address bar shows the case study's
 * own URL and Back closes it. The sheet stays mounted after the route leaves so it can shrink back.
 */
export function useProjectSheet<T extends { slug: string }>(
  projects: T[]
): {
  sheet: T | undefined;
  closing: boolean;
  open: (project: T, card: HTMLElement) => void;
  close: () => void;
  exited: () => void;
} {
  const router = useRouter();
  const routed = projects.find((project) => project.slug === router.query.project);
  const [shown, setShown] = useState<T>();
  useEffect(() => {
    if (routed) setShown(routed);
  }, [routed]);

  return {
    sheet: routed ?? shown,
    closing: !routed,
    open: (project, card) => {
      const page = router.asPath.split(/[?#]/)[0];
      openCard(`${page}?project=${project.slug}`, card, `/work/${project.slug}`);
    },
    close: () => router.back(),
    exited: () => setShown(undefined)
  };
}
