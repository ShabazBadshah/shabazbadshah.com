import Todo from '@/components/Todo';
import { content } from '@/content/content';
import type { PublicProject } from '@/content/projects';
import type { CaseStudy } from '@/lib/case-studies';
import { shown } from '@/lib/todo';
import { dateRange } from '@/lib/utils';

const { caseStudy } = content;

/** One fact in the facts list: a label over a value or a stacked list, styled like the contents list */
export function Meta({
  title,
  value
}: {
  title: string;
  value: string | string[] | null | undefined | false;
}): JSX.Element | null {
  const items = ([] as string[]).concat(value || []).filter(shown);
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-1 px-3 leading-snug">
      <dt className="text-sm font-semibold">{title}</dt>
      {items.map((item) => (
        <dd key={item} className="text-[0.8125rem] text-fg-muted">
          <Todo value={item} />
        </dd>
      ))}
    </div>
  );
}

export type CaseStudyFactsProps = {
  project: PublicProject;
  study?: CaseStudy | null;
  className?: string;
};

/**
 * The project's facts, from its case study file when it has one: in the left gutter on wide
 * screens, under the summary otherwise
 */
export function CaseStudyFacts({
  project,
  study = null,
  className = ''
}: CaseStudyFactsProps): JSX.Element {
  return (
    <dl className={`flex flex-col gap-5 ${className}`}>
      <Meta
        title={caseStudy.company}
        value={!project.client && study ? study.client : project.company}
      />
      <Meta
        title={caseStudy.client}
        value={project.client && (study ? study.client : project.name)}
      />
      <Meta title={caseStudy.role} value={study ? study.role : project.role} />
      <Meta
        title={caseStudy.timeline}
        value={study ? study.timeline : !project.client && dateRange(project.start, project.end)}
      />
      <Meta title={caseStudy.team} value={study?.team} />
      <Meta title={caseStudy.customers} value={study?.customers} />
      <Meta title={caseStudy.stack} value={project.stack} />
      <Meta title={caseStudy.disciplines} value={project.disciplines} />
      <Meta title={caseStudy.skills} value={project.skills} />
    </dl>
  );
}

export default CaseStudyFacts;
