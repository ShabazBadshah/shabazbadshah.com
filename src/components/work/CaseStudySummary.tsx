import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import React, { Fragment } from 'react';

import LazyVideo from '@/components/LazyVideo';
import Todo from '@/components/Todo';
import CaseStudyFacts from '@/components/work/CaseStudyFacts';
import LockedMedia, { LOCKED_MEDIA_HTML } from '@/components/work/LockedMedia';
import { content } from '@/content/content';
import type { PublicProject } from '@/content/projects';
import type { CaseStudy, LockedMedia as Media } from '@/lib/case-studies';
import { shown } from '@/lib/todo';

const { caseStudy } = content;
const HEADING = 'scroll-mt-8 text-xl font-semibold tracking-tight sm:text-2xl';
const BODY = 'text-fg-muted';
const PROSE =
  '[&>:first-child]:mt-0 [&_strong]:font-medium [&_strong]:text-fg [&_table]:text-left [&_table]:text-sm [&_p:has(>img~img)]:grid [&_p:has(>img~img)]:auto-cols-fr [&_p:has(>img~img)]:grid-flow-col [&_p:has(>img~img)]:items-start [&_p:has(>img~img)]:gap-4';

export const Text = ({ value }: { value: string }): JSX.Element => (
  <p className={BODY}>
    <Todo value={value} />
  </p>
);

/** Rendered Markdown, with the locked media block where the file marks one */
export const Html = ({
  html,
  lockedMedia
}: {
  html: string;
  lockedMedia?: Media | null;
}): JSX.Element => (
  <>
    {html.split(LOCKED_MEDIA_HTML).map((part, index) => (
      <Fragment key={index}>
        {index > 0 && lockedMedia && <LockedMedia media={lockedMedia} />}
        {part.trim() && (
          <div
            data-prose=""
            className={`${BODY} ${PROSE}`}
            dangerouslySetInnerHTML={{ __html: part }}
          />
        )}
      </Fragment>
    ))}
  </>
);

export function Section({
  id,
  title,
  heading: Heading,
  children
}: {
  id: string;
  title: string;
  heading: 'h2' | 'h3';
  children: React.ReactNode;
}): JSX.Element {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <Heading id={id} className={HEADING}>
        {title}
      </Heading>
      {children}
    </section>
  );
}

export type CaseStudySummaryProps = {
  project: PublicProject;
  study?: CaseStudy | null;
  embedded?: boolean;
  summaryId: string;
  heading: 'h2' | 'h3';
};

export default function CaseStudySummary({
  project,
  study = null,
  embedded = false,
  summaryId,
  heading
}: CaseStudySummaryProps): JSX.Element {
  const { media, outcome } = project;
  const Title = embedded ? 'h2' : 'h1';
  const id = (section: string) => `${section}-${project.slug}`;

  return (
    <section
      id={summaryId}
      aria-label={caseStudy.summary}
      className="flex scroll-mt-8 flex-col gap-8"
    >
      <header className="flex flex-col gap-4">
        {study?.status && (
          <p className="chip self-start">
            <Todo value={study.status} />
          </p>
        )}
        <Title
          className={`mb-3 text-wrap font-semibold tracking-tight ${
            embedded ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'
          }`}
        >
          {study ? <Todo value={study.title} /> : project.name}
        </Title>
        <Text value={study ? study.summary : project.summary} />
      </header>

      {(study?.problemHtml || shown(project.problem)) && (
        <Section id={id('summary-problem')} title={caseStudy.problem} heading={heading}>
          {study?.problemHtml ? (
            <Html html={study.problemHtml} />
          ) : (
            <Text value={project.problem} />
          )}
        </Section>
      )}
      {shown(outcome) && (
        <Section id={id('summary-outcome')} title={caseStudy.outcome} heading={heading}>
          <Text value={outcome} />
        </Section>
      )}

      {project.externalUrl && (
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
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
          <div data-zoomable="" className="card aspect-video w-full">
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

      <CaseStudyFacts
        project={project}
        study={study}
        className="rounded-3xl border py-4 2xl:hidden"
      />
    </section>
  );
}
