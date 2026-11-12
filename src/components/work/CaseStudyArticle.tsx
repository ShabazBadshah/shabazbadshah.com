import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import { Toc, type TocItem } from '@/components/blog/BlogArticle';
import { LazyVideo } from '@/components/home/ProjectCard';
import Todo from '@/components/Todo';
import { content } from '@/content/content';
import type { PublicProject } from '@/content/projects';
import { shown } from '@/lib/todo';
import { dateRange } from '@/lib/utils';

const { caseStudy } = content;
const HEADING = 'scroll-mt-8 text-xl font-semibold tracking-tight sm:text-2xl';
/** The article's body text, used by the summary's text too */
const BODY = 'leading-[1.75] text-fg-muted';

function Section({ title, value }: { title: string; value: string }): JSX.Element | null {
  if (!shown(value)) return null;
  return (
    <div className="flex flex-col gap-4">
      <h2 className={HEADING}>{title}</h2>
      <p className={BODY}>
        <Todo value={value} />
      </p>
    </div>
  );
}

/** One fact in the facts list: a label over a value or a stacked list, styled like the contents list */
function Meta({ title, value }: { title: string; value: string | string[] }): JSX.Element | null {
  const items = (Array.isArray(value) ? value : [value]).filter(shown);
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-1">
      <dt className="px-3 text-sm font-semibold leading-snug">{title}</dt>
      {items.map((item) => (
        <dd key={item} className="px-3 text-[0.8125rem] leading-snug text-fg-muted">
          <Todo value={item} />
        </dd>
      ))}
    </div>
  );
}

/** The project's facts: in the left gutter on wide screens, under the summary otherwise */
function Facts({ project, className }: { project: PublicProject; className: string }): JSX.Element {
  return (
    <dl className={`flex flex-col gap-5 ${className}`}>
      <Meta title={caseStudy.company} value={project.company} />
      {project.client && <Meta title={caseStudy.client} value={project.name} />}
      <Meta title={caseStudy.role} value={project.role} />
      {!project.client && (
        <Meta title={caseStudy.timeline} value={dateRange(project.start, project.end)} />
      )}
      <Meta title={caseStudy.stack} value={project.stack} />
      <Meta title={caseStudy.disciplines} value={project.disciplines} />
      <Meta title={caseStudy.skills} value={project.skills} />
    </dl>
  );
}

type Props = {
  project: PublicProject;
  /** Inside the /work panel or sheet rather than its own page: no page heading or hero id */
  embedded?: boolean;
};

/**
 * A case study's content, shared by /work/<slug> and the sheet on /work: a summary, then the rest
 * of the case study, with the project's facts in the left gutter and a table of contents in the
 * right one, like a blog article.
 */
export default function CaseStudyArticle({ project, embedded = false }: Props): JSX.Element {
  const media = project.media;
  const testimonial = project.testimonial;
  const Title = embedded ? 'h2' : 'h1';
  const Heading = embedded ? 'h3' : 'h2';
  const id = (section: string) => `${section}-${project.slug}`;
  // The header watches #hero on a page of its own
  const summaryId = embedded ? id('summary') : 'hero';

  const toc: TocItem[] = [
    { id: summaryId, text: caseStudy.summary, level: 2 },
    shown(project.whatIBuilt) && { id: id('built'), text: caseStudy.whatIBuilt, level: 2 },
    project.phases.length > 0 && { id: id('phases'), text: caseStudy.phases, level: 2 },
    testimonial &&
      shown(testimonial.quote) && { id: id('testimonial'), text: caseStudy.testimonial, level: 2 }
  ].filter((item): item is TocItem => Boolean(item));

  return (
    <article className="relative">
      {/* Sits in the gutter beside the article, sized to the space there so it never overlaps the text */}
      <aside className="absolute bottom-0 left-full top-0 ml-6 hidden w-[calc((100vw-100%)/2-3.5rem)] 2xl:block">
        <Toc items={toc} />
      </aside>

      {/* Mirrors the contents list in the gutter on the other side */}
      <aside className="absolute bottom-0 right-full top-0 mr-6 hidden w-[calc((100vw-100%)/2-3.5rem)] 2xl:block">
        <Facts
          project={project}
          className="sticky top-32 max-h-[calc(100dvh-9rem)] overflow-y-auto"
        />
      </aside>

      <div className="2xl:hidden">
        <Toc items={toc} collapsible />
      </div>

      <div className="flex flex-col gap-4 sm:gap-8">
        <section
          id={summaryId}
          aria-label={caseStudy.summary}
          className="flex scroll-mt-8 flex-col gap-8"
        >
          <header className="flex flex-col gap-4">
            <Title
              // Fills the column instead of the headings' balanced wrapping
              className={`mb-3 text-wrap font-semibold tracking-tight ${
                embedded ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'
              }`}
            >
              {project.name}
            </Title>
            <p className={BODY}>{project.summary}</p>
          </header>

          <Section title={caseStudy.problem} value={project.problem} />
          <Section title={caseStudy.outcome} value={project.outcome} />

          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              // The secondary button style of the home page hero
              className="pill self-start bg-gray-50 text-sm dark:border-gray-50 dark:bg-transparent"
            >
              {caseStudy.visit}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          )}

          {media?.video ? (
            <div className="card">
              <LazyVideo
                src={media.video.src}
                poster={media.video.poster}
                label={content.projectCard.demoLabel(project.name)}
              />
            </div>
          ) : (
            media?.image && (
              <div className="card aspect-video w-full">
                <Image
                  src={media.image.src}
                  alt={media.image.alt}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                  sizes="(max-width: 870px) 100vw, 870px"
                  priority={!embedded}
                />
              </div>
            )
          )}

          <Facts project={project} className="rounded-3xl border py-4 2xl:hidden" />
        </section>

        {shown(project.whatIBuilt) && (
          <section aria-labelledby={id('built')} className="flex flex-col gap-4">
            <Heading id={id('built')} className={HEADING}>
              {caseStudy.whatIBuilt}
            </Heading>
            <p className="text-fg-muted sm:text-lg">
              <Todo value={project.whatIBuilt} />
            </p>
          </section>
        )}

        {project.phases.length > 0 && (
          <section aria-labelledby={id('phases')}>
            <Heading id={id('phases')} className={HEADING}>
              {caseStudy.phases}
            </Heading>
            <ol className="mt-6 grid gap-4 sm:gap-5 lg:grid-cols-2">
              {project.phases.map((phase, index) => (
                <li key={phase.title} className="card gap-3 p-6">
                  <p className="eyebrow">{caseStudy.phase(index + 1)}</p>
                  <h3 className="text-lg font-semibold">{phase.title}</h3>
                  {shown(phase.summary) && (
                    <p className="text-fg-muted">
                      <Todo value={phase.summary} />
                    </p>
                  )}
                  {shown(phase.outcome) && (
                    <p className="font-medium">
                      <Todo value={phase.outcome} />
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}

        {testimonial && shown(testimonial.quote) && (
          <section aria-labelledby={id('testimonial')} className="flex flex-col gap-6">
            <Heading id={id('testimonial')} className={HEADING}>
              {caseStudy.testimonial}
            </Heading>
            <figure className="card gap-4 p-6 sm:p-8">
              <blockquote className="text-lg sm:text-xl">
                <Todo value={testimonial.quote} />
              </blockquote>
              {testimonial.name && (
                <figcaption className="text-fg-muted">
                  {testimonial.name}
                  {testimonial.role && `, ${testimonial.role}`}
                </figcaption>
              )}
            </figure>
          </section>
        )}
      </div>
    </article>
  );
}
