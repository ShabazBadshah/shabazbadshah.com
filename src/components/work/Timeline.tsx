import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import Todo from '@/components/Todo';
import { content } from '@/content/content';
import type { PublicProject } from '@/content/projects';
import { shown } from '@/lib/todo';
import { dateRange } from '@/lib/utils';

const { timeline } = content.work;
const { independent } = timeline;

const MUTED = 'text-[0.9375rem] text-fg-muted';
const LINK =
  'group inline-flex items-center gap-1 text-sm font-medium text-accent no-underline hover:underline';

function CaseStudyLink({ project }: { project: PublicProject }): JSX.Element {
  return (
    <Link href={`/work/${project.slug}`}>
      <a className={LINK}>
        {content.caseStudy.read}
        <span className="sr-only">: {project.name}</span>
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
        />
      </a>
    </Link>
  );
}

/** One row: a dot on the line, then the entry */
function Entry({ id, children }: { id?: string; children: React.ReactNode }): JSX.Element {
  return (
    <li id={id} className="relative scroll-mt-24 pb-10 pl-8 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 size-3 rounded-full border-2 border-accent bg-surface"
      />
      {children}
    </li>
  );
}

type Props = {
  /** Newest first */
  employment: PublicProject[];
  clients: PublicProject[];
  syftable: PublicProject;
};

/**
 * Work history. Everything since SOTI sits under one Independent entry: client projects are listed
 * as projects (no dates or titles of their own) and Syftable as a single line.
 */
export default function Timeline({ employment, clients, syftable }: Props): JSX.Element {
  return (
    <ol className="card p-5 before:absolute before:bottom-8 before:left-[1.625rem] before:top-8 before:w-px before:bg-line sm:p-8 sm:before:left-[2.375rem]">
      <Entry id="independent">
        <h3 className="text-lg font-semibold">{independent.org}</h3>
        <p className={MUTED}>
          {independent.role} · {independent.dates}
        </p>
        <ul className="mt-5 flex flex-col gap-6">
          <li>
            <h4 className="font-semibold">
              {independent.consulting.name}{' '}
              <span className="font-normal text-fg-muted">· {independent.consulting.note}</span>
            </h4>
            <ul className="mt-3 flex flex-col gap-3">
              {clients.map((project) => (
                <li key={project.slug} className="rounded-inner border bg-fill p-4">
                  <p className="font-medium">{project.name}</p>
                  <p className={`mt-1 ${MUTED}`}>{project.summary}</p>
                  <div className="mt-2">
                    <CaseStudyLink project={project} />
                  </div>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <h4 className="font-semibold">{syftable.name}</h4>
            <p className={`mt-1 ${MUTED}`}>
              {syftable.summary}{' '}
              {syftable.externalUrl && (
                <a
                  href={syftable.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  {independent.syftableLink}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              )}
            </p>
          </li>
        </ul>
      </Entry>

      {employment.map((project) => {
        const dates = dateRange(project.start, project.end);
        return (
          <Entry key={project.slug}>
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className={MUTED}>
              {project.role}
              {shown(dates) && (
                <>
                  {' · '}
                  <Todo value={dates} />
                </>
              )}
            </p>
            <p className="mt-2 text-[0.9375rem]">{project.summary}</p>
            <div className="mt-2">
              <CaseStudyLink project={project} />
            </div>
          </Entry>
        );
      })}
    </ol>
  );
}
