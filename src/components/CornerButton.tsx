import type { LucideIcon } from 'lucide-react';

// One size, position and icon for every control pinned to a card's top-right corner (info,
// expand, collapse), so a card and the article it grows into keep it in the same place.
const BASE =
  'absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-pill border bg-elevated text-fg-muted backdrop-blur-lg backdrop-saturate-180 transition-colors';

type Props = {
  icon: LucideIcon;
  /** Static cue inside an element that is already interactive (no button of its own) */
  decorative?: boolean;
  className?: string;
} & Omit<JSX.IntrinsicElements['button'], 'children' | 'className'>;

export default function CornerButton({
  icon: Icon,
  decorative = false,
  className = '',
  ...props
}: Props): JSX.Element {
  const icon = <Icon aria-hidden="true" className="size-4" />;

  if (decorative) {
    return (
      <span aria-hidden="true" className={`${BASE} ${className}`}>
        {icon}
      </span>
    );
  }

  return (
    <button
      type="button"
      {...props}
      className={`${BASE} cursor-pointer hover:text-fg ${className}`}
    >
      {icon}
    </button>
  );
}
