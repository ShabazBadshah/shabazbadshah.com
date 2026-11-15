import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';

import { content } from '@/content/content';

/** Switches between light and dark, revealing the new theme as a circle expanding from the button */
export default function ThemeToggle({ className }: { className: string }): JSX.Element {
  const { resolvedTheme, systemTheme, setTheme: setPicked } = useTheme();
  // Picking the system's own theme goes back to following the system
  const setTheme = (next: string) => setPicked(next === systemTheme ? 'system' : next);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  // Reveal the new theme as a circle expanding from the button. The View Transitions API is
  // missing from this TypeScript version's DOM types; browsers without it switch instantly.
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? 'light' : 'dark';
    const doc = document as Document & {
      startViewTransition?: (update: () => void) => { ready: Promise<void> };
    };
    if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(next);
      return;
    }

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // flushSync commits the theme (next-themes applies its class in an effect) before the snapshot
    doc
      .startViewTransition(() => flushSync(() => setTheme(next)))
      .ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 750,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
  };

  const { theme } = content.nav;
  const label = !mounted ? theme.toggle : isDark ? theme.toLight : theme.toDark;

  return (
    <button type="button" onClick={toggle} aria-label={label} className={className}>
      {/* Both icons are rendered and swapped with CSS so there is no hydration mismatch or layout shift */}
      <Sun aria-hidden="true" className="hidden size-[18px] dark:block" />
      <Moon aria-hidden="true" className="size-[18px] dark:hidden" />
    </button>
  );
}
