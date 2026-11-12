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
