import { GetStaticPaths, GetStaticProps } from 'next';

import SEO from '@/components/SEO';
import CaseStudyArticle from '@/components/work/CaseStudyArticle';
import { siteConfig } from '@/lib/site';
import type { PublicProject } from '@/content/projects';
import MainLayout from '@/components/MainLayout';
import {
  getCaseStudyPaths,
  getCaseStudyPageData,
  type CaseStudy as Study
} from '@/lib/case-studies';

type Props = { project: PublicProject; study: Study | null };

const CaseStudy = ({ project, study }: Props): JSX.Element => (
  <MainLayout narrow source="career">
    <SEO
      title={siteConfig.seo.caseStudyTitle(project.name)}
      description={project.summary}
      path={`/work/${project.slug}`}
    />
    <CaseStudyArticle project={project} study={study} />
  </MainLayout>
);

export default CaseStudy;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getCaseStudyPaths(),
  fallback: false
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const data = await getCaseStudyPageData(params?.slug as string);
  if (!data) return { notFound: true };
  return { props: data };
};
