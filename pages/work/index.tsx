import { GetStaticPropsResult } from 'next';
import { useEffect, useRef, useState } from 'react';

import ArticleSheet from '@/components/ArticleSheet';
import SEO from '@/components/SEO';
import CaseStudyArticle from '@/components/work/CaseStudyArticle';
import CurrentRole from '@/components/work/CurrentRole';
import WorkList, { FILTERS, WorkFilter } from '@/components/work/WorkList';
import { useProjectSheet } from '@/lib/card-transition';
import { siteConfig } from '@/lib/site';
import { content } from '@/content/content';
import type { PublicProject, WorkTab } from '@/content/projects';
import MainLayout from '@/components/MainLayout';
import { getWorkPageData, type WorkPageData } from '@/lib/case-studies';

const { work } = content;

type Props = WorkPageData;

/**
 * The current role and its client work, then the work history as a filterable table. A card or row
 * grows into its case study, like a blog card into its article.
 */
const Work = ({ current, groups, clients, studies }: Props): JSX.Element => {
  const { sheet, closing, open, close, exited } = useProjectSheet<PublicProject>([
    ...clients,
    ...Object.values(groups).flat()
  ]);
  const [filter, setFilter] = useState<WorkTab>('employment');
  // The selected tab's height, kept current as it changes (images loading, the window resizing)
  const panels = useRef<Partial<Record<WorkTab, HTMLDivElement | null>>>({});
  const [height, setHeight] = useState<number>();
  useEffect(() => {
    const panel = panels.current[filter];
    if (!panel) return;
    const observer = new ResizeObserver(() => setHeight(panel.offsetHeight));
    observer.observe(panel);
    return () => observer.disconnect();
  }, [filter]);

  return (
    <MainLayout source="career">
      <SEO
        title={siteConfig.seo.work.title}
        description={siteConfig.seo.work.description}
        path="/work"
      />
      <div className="flex flex-col gap-10 sm:gap-16">
        <section id="hero" aria-labelledby="work-title" className="flex max-w-3xl flex-col gap-5">
          <h1 id="work-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {work.title}
          </h1>
          <p className="text-lg text-fg-muted sm:text-xl">{work.subtitle}</p>
        </section>

        {/*
          The tabs come first; Work also shows the current role above its history. Every tab's list
          is laid out side by side in one track that slides to the one picked, while the area eases
          to that list's height. The others are clipped out of view (the margin keeps the card's
          shadow) and out of reach of the keyboard and screen readers.
        */}
        <div className="flex flex-col gap-6">
          <WorkFilter filter={filter} onChange={setFilter} />
          <div
            className="overflow-clip transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [overflow-clip-margin:1.5rem]"
            style={{ height }}
          >
            <div
              className="flex items-start gap-12 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(calc(${-FILTERS.indexOf(filter)} * (100% + 3rem)))` }}
            >
              {FILTERS.map((kind) => (
                <div
                  key={kind}
                  ref={(element) => {
                    panels.current[kind] = element;
                  }}
                  aria-hidden={kind !== filter || undefined}
                  // inert isn't in this React version's types
                  {...(kind !== filter && { inert: '' })}
                  className="flex w-full shrink-0 flex-col gap-6"
                >
                  {kind === 'employment' && (
                    <CurrentRole current={current} clients={clients} onOpen={open} />
                  )}
                  <WorkList projects={groups[kind]} onOpen={open} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {sheet && (
        <ArticleSheet
          key={sheet.slug}
          card={sheet.slug}
          label={sheet.name}
          pageTitle={siteConfig.seo.caseStudyTitle(sheet.name)}
          closing={closing}
          onClose={close}
          onExited={exited}
        >
          <CaseStudyArticle project={sheet} study={studies[sheet.slug]} embedded />
        </ArticleSheet>
      )}
    </MainLayout>
  );
};

export default Work;

export const getStaticProps = async (): Promise<GetStaticPropsResult<WorkPageData>> => ({
  props: await getWorkPageData()
});
