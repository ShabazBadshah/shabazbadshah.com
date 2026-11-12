import { isTodo, SHOW_PLACEHOLDERS, VERIFY } from '@/lib/todo';

const PLACEHOLDER = 'rounded-chip border border-dashed border-line-strong px-1.5 text-fg-muted';

/**
 * Renders text, or for a "TODO: ..." value a dashed placeholder in development and nothing in
 * production builds. "[VERIFY ...]" markers inside the text are shown as placeholders too.
 */
export default function Todo({ value }: { value: string }): JSX.Element | null {
  if (!isTodo(value)) return <Verify value={value} />;
  if (!SHOW_PLACEHOLDERS) return null;
  return <span className={PLACEHOLDER}>{value}</span>;
}

/** Text with its "[VERIFY ...]" markers shown as dashed placeholders */
export function Verify({ value }: { value: string }): JSX.Element {
  const parts = value.split(new RegExp(`(${VERIFY.source})`));
  return (
    <>
      {parts.map((part, index) =>
        // Odd parts are the markers captured by the split
        index % 2 ? (
          <span key={index} className={PLACEHOLDER}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}
