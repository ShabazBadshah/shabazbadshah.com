import { useEffect, type RefObject } from 'react';

/** A box in viewport coordinates */
export type Box = { left: number; top: number; width: number; height: number };

/** clip-path revealing a viewport-space box inside the full-viewport frame */
export const clipTo = (box: Box, radius: number): string => {
  const top = Math.max(box.top, 0);
  const left = Math.max(box.left, 0);
  const right = Math.max(window.innerWidth - left - box.width, 0);
  const bottom = Math.max(window.innerHeight - top - box.height, 0);
  return `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius}px)`;
};

/**
 * Locks the page behind the sheet, keeping its width steady when the scrollbar disappears, and
 * moves focus into the sheet's scroller
 */
export function useScrollLock(scroller: RefObject<HTMLElement>): void {
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
  }, [scroller]);
}

/**
 * Keeps the page behind at `scrollY` while the sheet exists: the router (or the browser, on Back)
 * may try to scroll it, and <html> is scroll-smooth, so undo any such scroll before it is painted
 */
export function usePinnedScroll(scrollY: number): void {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    const pin = () => {
      if (window.scrollY !== scrollY) window.scrollTo(0, scrollY);
    };
    window.addEventListener('scroll', pin);
    return () => {
      window.removeEventListener('scroll', pin);
      root.style.scrollBehavior = previous;
    };
  }, [scrollY]);
}
