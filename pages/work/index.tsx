import { FileDown } from 'lucide-react';
import { GetStaticPropsResult } from 'next';

import ProjectCard from '@/components/home/ProjectCard';
import SEO from '@/components/SEO';
import Todo from '@/components/Todo';
import Timeline from '@/components/work/Timeline';
import { siteConfig } from '@/config/site';
import { content } from '@/content/content';
import {
  caseStudiesFor,
  projectsOfKind,
  publicProject,
  type PublicProject
} from '@/content/projects';
import MainLayout from '@/layouts/MainLayout';
import { filled, shown } from '@/lib/todo';

const SECTION_TITLE = 'text-2xl font-semibold tracking-tight sm:text-3xl';
/** Timeline order, newest first */
const EMPLOYERS = ['soti', 'planned', 'mednow', 'project-include'];

const { work } = content;

type Props = {
  employment: PublicProject[];
  clients: PublicProject[];
  syftable: PublicProject;
  caseStudies: PublicProject[];
};

const Work = ({ employment, clients, syftable, caseStudies }: Props): JSX.Element => (
  <MainLayout source="career">
    <SEO
      title={siteConfig.seo.work.title}
      description={siteConfig.seo.work.description}
      path="/work"
    />
    <div className="flex flex-col gap-16 sm:gap-20">
      <section id="hero" aria-labelledby="work-title" className="flex max-w-3xl flex-col gap-5">
        <h1 id="work-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {work.title}
        </h1>
        <p className="text-lg text-fg-muted sm:text-xl">{work.subtitle}</p>
        {/* The only resume link on the site */}
        {shown(siteConfig.resume) && (
          <div>
            {filled(siteConfig.resume) ? (
              <a href={siteConfig.resume} download className="pill bg-surface">
                <FileDown aria-hidden="true" className="size-5" />
                {work.resume}
              </a>
            ) : (
              <Todo value={siteConfig.resume} />
            )}
          </div>
        )}
      </section>

      <section aria-labelledby="timeline-title">
        <h2 id="timeline-title" className={SECTION_TITLE}>
          {work.timeline.title}
        </h2>
        <div className="mt-6">
          <Timeline employment={employment} clients={clients} syftable={syftable} />
        </div>
      </section>

      <section aria-labelledby="case-studies-title">
        <h2 id="case-studies-title" className={SECTION_TITLE}>
          {work.caseStudies.title}
        </h2>
        <div className="mt-6 grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          {caseStudies.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              className={project.media?.appImages ? 'lg:col-span-2' : ''}
            />
          ))}
        </div>
      </section>
    </div>
  </MainLayout>
);

export default Work;

export const getStaticProps = async (): Promise<GetStaticPropsResult<Props>> => ({
  props: {
    employment: EMPLOYERS.map((slug) => publicProject(slug)),
    clients: projectsOfKind('client'),
    syftable: publicProject('syftable'),
    caseStudies: caseStudiesFor('career', { clientsOnly: false })
  }
});
