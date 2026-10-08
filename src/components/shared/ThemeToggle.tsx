import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = (): JSX.Element => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';
  const label = !mounted
    ? 'Toggle color theme'
    : isDark
    ? 'Switch to light theme'
    : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      className="relative grid size-10 shrink-0 place-items-center rounded-pill text-fg-muted transition-colors duration-150 hover:text-fg cursor-pointer"
    >
      {/* Both icons are rendered and swapped with CSS so there is no hydration mismatch or layout shift */}
      <Sun aria-hidden="true" className="hidden size-[18px] dark:block" />
      <Moon aria-hidden="true" className="size-[18px] dark:hidden" />
    </button>
  );
};

export default ThemeToggle;
