import { useEffect } from 'react';

import { CLOSE_SOUND_ATTR } from '@/lib/close-sound';

const SRC = '/sounds/click.mp3';
/** Anything a click acts on: links, buttons (cards are links) and form controls */
const INTERACTIVE =
  'a[href], button, [role="button"], summary, label, select, input[type="checkbox"], input[type="radio"]';

/** Plays the click sound whenever an interactive element is clicked, anywhere on the site */
export function useClickSound(): void {
  useEffect(() => {
    const audio = new Audio(SRC);
    audio.preload = 'auto';

    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest(INTERACTIVE);
      // A dialog's close button plays the close sound instead
      if (!target || target.matches(':disabled') || target.hasAttribute(CLOSE_SOUND_ATTR)) return;
      // Restart rather than wait, so quick clicks each get their sound
      audio.currentTime = 0;
      audio.play().catch(() => undefined);
    };

    // Capture, so a handler that stops propagation can't swallow it
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
}
