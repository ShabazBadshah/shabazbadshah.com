import { GetStaticPaths, GetStaticProps } from 'next';

import SEO from '@/components/SEO';
import CaseStudyArticle from '@/components/work/CaseStudyArticle';
import { siteConfig } from '@/config/site';
import { caseStudyProjects, type PublicProject } from '@/content/projects';
import MainLayout from '@/layouts/MainLayout';

type Props = { project: PublicProject };

const CaseStudy = ({ project }: Props): JSX.Element => (
  <MainLayout narrow source={project.client ? 'consulting' : 'career'}>
    <SEO
      title={siteConfig.seo.caseStudyTitle(project.name)}
      description={project.summary}
      path={`/work/${project.slug}`}
    />
    <CaseStudyArticle project={project} />
  </MainLayout>
);

export default CaseStudy;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: caseStudyProjects().map((project) => `/work/${project.slug}`),
  fallback: false
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const project = caseStudyProjects().find((p) => p.slug === params?.slug) as PublicProject;
  return { props: { project } };
};
