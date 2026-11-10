import { isTodo, SHOW_PLACEHOLDERS } from '@/lib/todo';

/**
 * Renders text, or for a "TODO: ..." value a dashed placeholder in development and nothing in
 * production builds.
 */
export default function Todo({ value }: { value: string }): JSX.Element | null {
  if (!isTodo(value)) return <>{value}</>;
  if (!SHOW_PLACEHOLDERS) return null;
  return (
    <span className="rounded-chip border border-dashed border-line-strong px-1.5 text-fg-muted">
      {value}
    </span>
  );
}
