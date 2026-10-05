/** Single easing curve and the layout duration used across the site (mirrors the CSS tokens). */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const DURATION_LAYOUT = 0.35;
export const LAYOUT_TRANSITION = { duration: DURATION_LAYOUT, ease: EASE };
