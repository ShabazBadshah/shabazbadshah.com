import { GetStaticPropsResult } from 'next';
import { useState } from 'react';

import { useCardTransition } from '@/components/CardTransition';
import ArticleSheet from '@/components/home/ArticleSheet';
import SEO from '@/components/SEO';
import CaseStudyArticle from '@/components/work/CaseStudyArticle';
import CurrentRole from '@/components/work/CurrentRole';
import WorkList from '@/components/work/WorkList';
import { siteConfig } from '@/config/site';
import { content } from '@/content/content';
import {
  clientProjects,
  CURRENT_ROLE,
  projectsOfKind,
  type ProjectKind,
  type PublicProject
} from '@/content/projects';
import MainLayout from '@/layouts/MainLayout';

const { work } = content;

type Props = {
  current: typeof CURRENT_ROLE;
  groups: Record<ProjectKind, PublicProject[]>;
  clients: PublicProject[];
};

/**
 * The current role and its client work, then the work history as a filterable table. A card or row
 * grows into its case study, like a blog card into its article.
 */
const Work = ({ current, groups, clients }: Props): JSX.Element => {
  const { remember } = useCardTransition();
  // Kept mounted after closing so the sheet can shrink back into its card or row
  const [sheet, setSheet] = useState<PublicProject>();
  const [sheetOpen, setSheetOpen] = useState(false);

  const open = (project: PublicProject, card: HTMLElement) => {
    remember(card);
    setSheet(project);
    setSheetOpen(true);
  };

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

        <CurrentRole current={current} clients={clients} onOpen={open} />
        <WorkList groups={groups} onOpen={open} />
      </div>
      {sheet && (
        <ArticleSheet
          key={sheet.slug}
          card={sheet.slug}
          label={sheet.name}
          pageTitle={siteConfig.seo.caseStudyTitle(sheet.name)}
          closing={!sheetOpen}
          onClose={() => setSheetOpen(false)}
          onExited={() => setSheet(undefined)}
        >
          <CaseStudyArticle project={sheet} embedded />
        </ArticleSheet>
      )}
    </MainLayout>
  );
};

export default Work;

export const getStaticProps = async (): Promise<GetStaticPropsResult<Props>> => ({
  props: {
    current: CURRENT_ROLE,
    groups: {
      employment: projectsOfKind('employment'),
      volunteer: projectsOfKind('volunteer'),
      project: projectsOfKind('project')
    },
    clients: clientProjects()
  }
});
