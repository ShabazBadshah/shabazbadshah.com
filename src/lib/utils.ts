import type React from 'react';

/** Strip the light markdown (bold) found in post summaries for plain-text display. */
export const plainText = (value: string): string => value.replace(/\*\*/g, '');

/**
 * "start–end", "start" when there's no end, or the TODO placeholder when a date is still missing
 * (rendered through <Todo>, so it disappears from production builds).
 */
export const dateRange = (start: string, end: string): string => {
  const missing = [start, end].find((value) => value.startsWith('TODO'));
  if (missing) return missing;
  return end ? `${start} – ${end}` : start;
};

/** True when a click event is a plain left-click with no modifier keys */
export const isPlainLeftClick = (event: React.MouseEvent): boolean =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

/** "Some Title!" → "some-title", for ids and URL slugs */
export const kebab = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
