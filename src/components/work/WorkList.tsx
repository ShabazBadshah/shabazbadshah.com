import { m } from 'framer-motion';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import type React from 'react';

import { Title } from '@/components/ProjectCard';
import Todo from '@/components/Todo';
import { content } from '@/content/content';
import type { PublicProject, WorkTab } from '@/content/projects';
import { isTodo } from '@/lib/todo';
import { dateRange } from '@/lib/utils';

const { filters } = content.work;
/** The tabs, in order */
export const FILTERS: WorkTab[] = ['employment', 'volunteer'];
const LAYOUT_TRANSITION = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

export const isPlainLeftClick = (event: React.MouseEvent): boolean =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

/** The years, as a pill; a placeholder is shown as is (and dropped in production) */
export function Dates({
  dates,
  current = false
}: {
  dates: string;
  /** Still going: highlighted, with a dot */
  current?: boolean;
}): JSX.Element | null {
  if (!dates) return null;
  if (isTodo(dates)) return <Todo value={dates} />;
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill px-2.5 py-1 font-mono text-xs ${
        current ? 'bg-green-500/15 text-green-700 dark:text-green-400' : 'bg-fill text-fg-muted'
      }`}
    >
      {current && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {dates}
    </span>
  );
}

type Props = {
  /** The selected filter's rows, newest first */
  projects: PublicProject[];
  onOpen: (project: PublicProject, row: HTMLElement) => void;
};

/** The kinds of work as tabs (Work, Volunteer), at the top of /work */
export function WorkFilter({
  filter,
  onChange
}: {
  filter: WorkTab;
  onChange: (kind: WorkTab) => void;
}): JSX.Element {
  return (
    <div
      role="group"
      aria-label={filters.label}
      className="flex self-start rounded-pill border bg-elevated p-1"
    >
      {FILTERS.map((kind) => {
        const active = kind === filter;
        return (
          <button
            key={kind}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(kind)}
            className={`relative inline-flex h-8 cursor-pointer items-center rounded-pill px-4 text-[0.9375rem] font-medium transition-colors duration-150 ${
              active ? 'text-accent' : 'text-fg-muted hover:text-fg'
            }`}
          >
            {active && (
              <m.span
                layoutId="work-filter"
                transition={LAYOUT_TRANSITION}
                className="absolute inset-0 rounded-pill bg-accent/10"
                aria-hidden="true"
              />
            )}
            <span className="relative">{filters[kind]}</span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Work history as a table (company, role, summary and years). A row with a case study is a real
 * link to /work/<slug> (so a modified click and no-JS still work) that opens it in place; one
 * without (an own product) links out to its site.
 */
export default function WorkList({ projects, onOpen }: Props): JSX.Element {
  return (
    // One grid shared by every row (subgrid), so the role column is as wide as the longest role
    <ul className="md:grid md:grid-cols-[11.5rem_max-content_minmax(0,1fr)_auto_auto] md:gap-x-5">
      {projects.map((project) => {
        const external = !project.hasCaseStudy && project.externalUrl;
        const Icon = external ? ArrowUpRight : ChevronRight;
        return (
          <li key={project.slug} className="md:col-span-5 md:grid md:grid-cols-subgrid">
            <a
              href={external || `/work/${project.slug}`}
              data-card={project.slug}
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {
                    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
                      if (!isPlainLeftClick(event)) return;
                      event.preventDefault();
                      onOpen(project, event.currentTarget);
                    }
                  })}
              // Stacked below md, with the icon at the right; a row of columns from md
              className="group relative flex flex-col gap-1.5 rounded-inner px-3 py-4 pr-12 text-fg no-underline transition-colors hover:bg-accent-soft md:col-span-5 md:grid md:grid-cols-subgrid md:items-center md:gap-x-5 md:py-4 md:pr-3"
            >
              <Title project={project} className="whitespace-nowrap [&_h3]:text-base" />
              <p className="md:whitespace-nowrap">{project.role}</p>
              <p className="text-fg-muted">{project.summary}</p>
              <p className="mt-1 md:mt-0">
                <Dates dates={dateRange(project.start, project.end)} />
              </p>
              <Icon
                aria-hidden="true"
                className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-fg-muted transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:text-fg md:static md:translate-y-0"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
