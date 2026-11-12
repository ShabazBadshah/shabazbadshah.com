import { useEffect } from 'react';

/** Diameter the ripple grows to, in px */
const SIZE = 48;
const DURATION_MS = 600;

/** A small light-blue ripple that grows from wherever a mouse button is pressed, then fades */
export function useClickRipple(): void {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || reducedMotion.matches) return;
      const ripple = document.createElement('span');
      ripple.setAttribute('aria-hidden', 'true');
      Object.assign(ripple.style, {
        position: 'fixed',
        left: `${event.clientX - SIZE / 2}px`,
        top: `${event.clientY - SIZE / 2}px`,
        width: `${SIZE}px`,
        height: `${SIZE}px`,
        borderRadius: '50%',
        background: 'var(--accent-ripple)',
        pointerEvents: 'none',
        zIndex: '2147483647'
      });
      document.body.appendChild(ripple);
      ripple
        .animate(
          [
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(1)', opacity: 0 }
          ],
          { duration: DURATION_MS, easing: 'ease-out' }
        )
        .finished.finally(() => ripple.remove());
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, []);
}
