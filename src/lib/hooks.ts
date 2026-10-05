/** Strip the light markdown (bold) found in post summaries for plain-text display. */
export const plainText = (value: string): string => value.replace(/\*\*/g, '');
