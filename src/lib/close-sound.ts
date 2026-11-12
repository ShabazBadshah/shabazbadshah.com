import { useEffect, useRef } from 'react';

const SRC = '/sounds/close.mp3';
/** On a dialog's own close button, so it plays the close sound instead of the click sound */
export const CLOSE_SOUND_ATTR = 'data-close-sound';

let audio: HTMLAudioElement | undefined;

const play = () => {
  audio ??= new Audio(SRC);
  // Restart rather than wait, so quick closes each get their sound
  audio.currentTime = 0;
  audio.play().catch(() => undefined);
};

/**
 * Plays the close sound whenever `open` goes from true to false, however the dialog was closed
 * (its button, Escape, a click outside, Back)
 */
export function useCloseSound(open: boolean): void {
  const wasOpen = useRef(open);

  useEffect(() => {
    audio ??= new Audio(SRC);
    audio.preload = 'auto';
  }, []);

  useEffect(() => {
    if (wasOpen.current && !open) play();
    wasOpen.current = open;
  }, [open]);
}
