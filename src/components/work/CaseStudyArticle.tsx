import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import type React from 'react';
import { Fragment, useEffect, useRef, useState } from 'react';

import { Toc, type TocItem } from '@/components/blog/BlogArticle';
import { LazyVideo } from '@/components/home/ProjectCard';
import Todo from '@/components/Todo';
import LockedMedia, { LOCKED_MEDIA_HTML } from '@/components/work/LockedMedia';
import { content } from '@/content/content';
import type { PublicProject } from '@/content/projects';
import type { CaseStudy, LockedMedia as Media } from '@/lib/case-studies';
import { renderDiagrams } from '@/lib/mermaid';
import { shown } from '@/lib/todo';
import { dateRange } from '@/lib/utils';

const ImageLightbox = dynamic(() => import('@/components/blog/ImageLightbox'), { ssr: false });

const { caseStudy } = content;
const HEADING = 'scroll-mt-8 text-xl font-semibold tracking-tight sm:text-2xl';
const BODY = 'text-fg-muted';
/**
 * Rendered Markdown from a case study file. Images on consecutive lines share a paragraph, and
 * sit side by side in one row.
 */
const PROSE =
  '[&>:first-child]:mt-0 [&_strong]:font-medium [&_strong]:text-fg [&_table]:text-left [&_table]:text-sm [&_p:has(>img~img)]:grid [&_p:has(>img~img)]:auto-cols-fr [&_p:has(>img~img)]:grid-flow-col [&_p:has(>img~img)]:items-start [&_p:has(>img~img)]:gap-4';

type Slide = { src: string; alt: string; description?: string };

/** Images that open in the lightbox: the Markdown's and the project's screenshot (not locked media) */
const ZOOMABLE = '[data-prose] img, [data-zoomable] img';
/**
 * The wide-screen layout: the article keeps the column's width (the footer's), with the sidebars
 * in the gutters beside it, --gap away (Header.tsx lines the back button up with the left one)
 */
const LAYOUT = 'relative [--gap:4rem]';
/** A list in a gutter beside the article on wide screens, 200px wide */
const SIDEBAR =
  'absolute inset-y-0 hidden w-[min(200px,(100vw_-_100%)/2_-_2rem_-_var(--gap))] 2xl:block';

const kebab = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const Text = ({ value }: { value: string }): JSX.Element => (
  <p className={BODY}>
    <Todo value={value} />
  </p>
);

/** Rendered Markdown, with the locked media block where the file marks one */
const Html = ({ html, lockedMedia }: { html: string; lockedMedia?: Media | null }): JSX.Element => (
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

type Block = { id: string; title: string; body: JSX.Element };

function Section({
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

/** One fact in the facts list: a label over a value or a stacked list, styled like the contents list */
function Meta({
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

/**
 * The project's facts, from its case study file when it has one: in the left gutter on wide
 * screens, under the summary otherwise
 */
function Facts({
  project,
  study,
  className
}: {
  project: PublicProject;
  study: CaseStudy | null;
  className: string;
}): JSX.Element {
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

type Props = {
  project: PublicProject;
  /** The long-form case study, when the project has one (and it is shown in this build) */
  study?: CaseStudy | null;
  /** Inside the /work panel or sheet rather than its own page: no page heading or hero id */
  embedded?: boolean;
};

/**
 * A case study's content, shared by /work/<slug> and the sheet on /work: a summary, then the rest
 * of the case study, with the project's facts in the left gutter and a table of contents in the
 * right one, like a blog article.
 */
export default function CaseStudyArticle({
  project,
  study = null,
  embedded = false
}: Props): JSX.Element {
  const { media, outcome } = project;
  const Title = embedded ? 'h2' : 'h1';
  const heading = embedded ? 'h3' : 'h2';
  const id = (section: string) => `${section}-${project.slug}`;
  // The header watches #hero on a page of its own
  const summaryId = embedded ? id('summary') : 'hero';

  const article = useRef<HTMLElement>(null);
  useEffect(() => {
    const draw = () => {
      renderDiagrams(article.current).catch(() => undefined);
    };
    draw();
    // Redraw in the other theme's colours when <html> switches between light and dark
    const observer = new MutationObserver(draw);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [study]);

  // The article's images open in a lightbox, by click or keyboard, which steps through all of them
  const [lightbox, setLightbox] = useState<{ slides: Slide[]; index: number }>();
  useEffect(() => {
    article.current?.querySelectorAll<HTMLImageElement>(ZOOMABLE).forEach((img) => {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', content.blog.enlargeImage(img.alt));
    });
  }, [study]);
  const openImage = (target: EventTarget) => {
    if (!(target instanceof HTMLImageElement) || !target.matches(ZOOMABLE)) return;
    const images = Array.from(article.current?.querySelectorAll<HTMLImageElement>(ZOOMABLE) ?? []);
    setLightbox({
      index: images.indexOf(target),
      // The image's Markdown title is its caption
      slides: images.map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt,
        description: img.title || undefined
      }))
    });
  };

  // The sections after the summary, each one also an entry in the contents. A case study file
  // replaces the fields' sections.
  const blocks = [
    ...(study
      ? study.sections.map((section) => ({
          id: id(kebab(section.title)),
          title: section.title,
          body: <Html html={section.html} lockedMedia={study.lockedMedia} />
        }))
      : [
          shown(project.whatIBuilt) && {
            id: id('built'),
            title: caseStudy.whatIBuilt,
            body: <Text value={project.whatIBuilt} />
          },
          project.phases.length > 0 && {
            id: id('phases'),
            title: caseStudy.phases,
            body: (
              <ol className="mt-2 grid gap-4 sm:gap-5 lg:grid-cols-2">
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
            )
          }
        ])
  ].filter((block): block is Block => Boolean(block));

  const toc: TocItem[] = [
    { id: summaryId, text: caseStudy.summary, level: 2 },
    ...blocks.map((block) => ({ id: block.id, text: block.title, level: 2 as const }))
  ];

  return (
    <article
      ref={article}
      className={LAYOUT}
      onClick={(event) => openImage(event.target)}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        if (!(event.target instanceof HTMLImageElement)) return;
        event.preventDefault();
        openImage(event.target);
      }}
    >
      <aside className={`${SIDEBAR} left-full ml-(--gap)`}>
        <Toc items={toc} />
      </aside>
      <aside className={`${SIDEBAR} right-full mr-(--gap)`}>
        <Facts
          project={project}
          study={study}
          className="sticky top-[var(--article-top,7rem)] max-h-[calc(100dvh_-_var(--article-top,7rem)_-_1rem)] overflow-y-auto"
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
            {study?.status && (
              <p className="chip self-start">
                <Todo value={study.status} />
              </p>
            )}
            <Title
              // Fills the column instead of the headings' balanced wrapping
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

          <Facts project={project} study={study} className="rounded-3xl border py-4 2xl:hidden" />
        </section>

        {blocks.map((block) => (
          <Section key={block.id} id={block.id} title={block.title} heading={heading}>
            {block.body}
          </Section>
        ))}
      </div>
      {lightbox && <ImageLightbox {...lightbox} onClose={() => setLightbox(undefined)} />}
    </article>
  );
}
