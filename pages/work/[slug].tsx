import { ArrowUpRight } from 'lucide-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import SEO from '@/components/SEO';
import Todo from '@/components/Todo';
import { siteConfig } from '@/config/site';
import { content } from '@/content/content';
import { caseStudyProjects, type PublicProject } from '@/content/projects';
import MainLayout from '@/layouts/MainLayout';
import { shown } from '@/lib/todo';
import { dateRange } from '@/lib/utils';

const { caseStudy } = content;
const LABEL = 'text-xs font-medium uppercase tracking-wide text-fg-muted';

function Section({ title, value }: { title: string; value: string }): JSX.Element | null {
  if (!shown(value)) return null;
  return (
    <div className="flex flex-col gap-1.5">
      <h2 className={LABEL}>{title}</h2>
      <p className="sm:text-lg">
        <Todo value={value} />
      </p>
    </div>
  );
}

const CaseStudy = ({ project }: { project: PublicProject }): JSX.Element => {
  const dates = dateRange(project.start, project.end);
  const image = project.media?.image;
  const testimonial = project.testimonial;

  return (
    <MainLayout source={project.kind === 'client' ? 'consulting' : 'career'}>
      <SEO
        title={siteConfig.seo.caseStudyTitle(project.name)}
        description={project.summary}
        path={`/work/${project.slug}`}
      />
      <article className="flex flex-col gap-10 sm:gap-14">
        <header id="hero" className="flex max-w-3xl flex-col gap-4">
          <p className="eyebrow">
            {project.kind === 'client' ? content.business.name : project.role}
            {project.kind !== 'client' && shown(dates) && (
              <>
                {' · '}
                <Todo value={dates} />
              </>
            )}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{project.name}</h1>
          <p className="text-lg text-fg-muted sm:text-xl">{project.summary}</p>
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 self-start font-medium text-accent no-underline hover:underline"
            >
              {caseStudy.visit}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          )}
        </header>

        {image && (
          <div className="card relative aspect-video w-full">
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        )}

        <div className="card gap-8 p-6 sm:p-8">
          <Section title={caseStudy.problem} value={project.problem} />
          <Section title={caseStudy.whatIBuilt} value={project.whatIBuilt} />
          <Section title={caseStudy.outcome} value={project.outcome} />
          {project.stack.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className={LABEL}>{caseStudy.stack}</h2>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {project.phases.length > 0 && (
          <section aria-labelledby="phases-title">
            <h2 id="phases-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {caseStudy.phases}
            </h2>
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
        )}
      </article>
    </MainLayout>
  );
};

export default CaseStudy;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: caseStudyProjects().map((project) => `/work/${project.slug}`),
  fallback: false
});

export const getStaticProps: GetStaticProps<{ project: PublicProject }> = async ({ params }) => ({
  props: {
    project: caseStudyProjects().find((project) => project.slug === params?.slug) as PublicProject
  }
});
