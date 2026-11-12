/**
 * Facts still to be supplied are written as "TODO: <what>". They render as a visible placeholder in
 * development and are left out of production builds (`next build`), along with the section they fill.
 *
 * Uses no imports: bin/generate.ts loads this through ts-node.
 */
export const todo = (what: string): string => `TODO: ${what}`;

export const isTodo = (value: unknown): boolean =>
  typeof value === 'string' && value.startsWith('TODO');

export const SHOW_PLACEHOLDERS = process.env.NODE_ENV !== 'production';

/** Has real content, or is a placeholder that this build shows */
export const shown = (value: string | null | undefined): boolean =>
  Boolean(value) && (!isTodo(value) || SHOW_PLACEHOLDERS);

/** Has real content (placeholders never count) */
export const filled = (value: string | null | undefined): boolean =>
  Boolean(value) && !isTodo(value);

/** An unconfirmed fact in a case study, "[VERIFY ...]"; the author confirms or removes each one */
export const VERIFY = /\[VERIFY[^\]]*\]/;
