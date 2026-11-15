import { useEffect, useRef } from 'react';

import { content } from '@/content/content';

/**
 * A Figma-style name tag ("You") that follows the mouse, just below and right of the cursor. It moves
 * by writing its transform directly, so nothing re-renders on every move. Touch and pen input never
 * show it, and it hides when the mouse leaves the window.
 */
export default function CursorName(): JSX.Element {
  const tag = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = tag.current;
    if (!element) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      element.style.transform = `translate(${event.clientX + 12}px, ${event.clientY + 10}px)`;
      element.style.opacity = '1';
    };
    const hide = () => {
      element.style.opacity = '0';
    };
    // Leaving the page entirely, not just moving between elements
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', leave);
    window.addEventListener('blur', hide);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', hide);
    };
  }, []);

  return (
    <div
      ref={tag}
      aria-hidden="true"
      data-cursor-name=""
      // Above everything, the image lightbox included; square only at the corner nearest the cursor
      className="pointer-events-none fixed left-0 top-0 z-[10000] select-none rounded-md rounded-tl-none bg-accent px-2 py-1 text-xs font-semibold leading-none text-accent-fg opacity-0 shadow-float transition-opacity duration-150"
    >
      {content.layout.cursorName}
    </div>
  );
}
