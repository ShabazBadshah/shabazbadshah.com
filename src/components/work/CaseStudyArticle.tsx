import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import Toc, { type TocItem } from '@/components/Toc';
import Todo from '@/components/Todo';
import CaseStudyFacts from '@/components/work/CaseStudyFacts';
import CaseStudySummary, { Html, Section, Text } from '@/components/work/CaseStudySummary';
import { content } from '@/content/content';
import type { PublicProject } from '@/content/projects';
import type { CaseStudy } from '@/lib/case-studies';
import { renderDiagrams } from '@/lib/mermaid';
import { shown } from '@/lib/todo';
import { kebab } from '@/lib/utils';

const ImageLightbox = dynamic(() => import('@/components/ImageLightbox'), { ssr: false });

const { caseStudy } = content;
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

type Block = { id: string; title: string; body: JSX.Element };

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
        <CaseStudyFacts
          project={project}
          study={study}
          className="sticky top-[var(--article-top,7rem)] max-h-[calc(100dvh_-_var(--article-top,7rem)_-_1rem)] overflow-y-auto"
        />
      </aside>

      <div className="2xl:hidden">
        <Toc items={toc} collapsible />
      </div>

      <div className="flex flex-col gap-4 sm:gap-8">
        <CaseStudySummary
          project={project}
          study={study}
          embedded={embedded}
          summaryId={summaryId}
          heading={heading}
        />

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
