import { ArrowUpRight, ChevronRight } from 'lucide-react';
import type React from 'react';

import { Title } from '@/components/ProjectCard';
import { Dates, isPlainLeftClick } from '@/components/work/WorkList';
import { siteConfig } from '@/lib/site';
import { content } from '@/content/content';
import type { CURRENT_ROLE, PublicProject } from '@/content/projects';
import { dateRange } from '@/lib/utils';

const { current: labels } = content.work;

type Props = {
  current: typeof CURRENT_ROLE;
  clients: PublicProject[];
  onOpen: (project: PublicProject, card: HTMLElement) => void;
};

/**
 * The current role, above the work history: company, role and years, what the business does, then
 * its projects as rows (styled like the work history rows) that open their case studies in place, or
 * link out to the project's site when it has none (my own product).
 */
export default function CurrentRole({ current, clients, onOpen }: Props): JSX.Element {
  return (
    <section aria-label={labels.label} className="card gap-3 p-5 sm:p-6">
      {/* Company with the role under it on the left; the years on the right */}
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="flex items-center gap-2.5">
          {/* TODO: no Badshah Consulting logo yet, so the site mark stands in */}
          <img
            src={siteConfig.assets.favicon}
            alt=""
            width={35}
            height={35}
            className="size-[35px]"
          />
          <div>
            <h2 className="text-base font-semibold">{current.company}</h2>
            <p>{current.role}</p>
          </div>
        </div>
        <Dates dates={dateRange(current.start, current.end)} current />
      </div>
      <p className="max-w-3xl text-fg-muted">{content.business.description}</p>

      <ul aria-label={labels.clientsLabel} className="-mx-3 mt-2">
        {clients.map((project) => {
          const external = !project.hasCaseStudy && project.externalUrl;
          const Icon = external ? ArrowUpRight : ChevronRight;
          return (
            <li key={project.slug}>
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
                className="group flex items-center gap-4 rounded-inner px-3 py-4 text-fg no-underline transition-colors hover:bg-accent-soft"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <Title project={project} className="[&_h3]:text-base" />
                  {/* In line with the name, past the logo (size-7) and its gap (2.5) */}
                  <p className="pl-9.5 text-fg-muted">{project.summary}</p>
                </div>
                <Icon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-fg-muted transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:text-fg"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
