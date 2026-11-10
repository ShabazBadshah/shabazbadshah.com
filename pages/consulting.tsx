import { ArrowRight, CalendarCheck } from 'lucide-react';
import { GetStaticPropsResult } from 'next';
import Link from 'next/link';

import ProjectCard from '@/components/home/ProjectCard';
import SEO from '@/components/SEO';
import { siteConfig } from '@/config/site';
import { content } from '@/content/content';
import { caseStudiesFor, type PublicProject } from '@/content/projects';
import MainLayout from '@/layouts/MainLayout';
import { businessStructuredData } from '@/lib/structured-data';

const PAGE = '/consulting';
const SECTION_TITLE = 'text-2xl font-semibold tracking-tight sm:text-3xl';
const SUBSECTION_TITLE = 'text-lg font-semibold';

const { consulting } = content;
const { builds } = consulting;

const Consulting = ({ caseStudies }: { caseStudies: PublicProject[] }): JSX.Element => (
  <MainLayout source="consulting">
    <SEO
      title={siteConfig.seo.consulting.title}
      description={siteConfig.seo.consulting.description}
      path={PAGE}
      jsonLd={businessStructuredData(PAGE, siteConfig.seo.consulting.title)}
    />
    <div className="flex flex-col gap-16 sm:gap-20">
      <section
        id="hero"
        aria-labelledby="consulting-title"
        className="flex max-w-3xl flex-col gap-5"
      >
        <h1 id="consulting-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {consulting.hero.title}
        </h1>
        <p className="text-lg text-fg-muted sm:text-xl">{consulting.hero.subtitle}</p>
        <div className="mt-2">
          <a
            href={siteConfig.contact.booking('consulting')}
            target="_blank"
            rel="noopener noreferrer"
            className="pill pill-accent px-6"
          >
            <CalendarCheck aria-hidden="true" className="size-5" />
            {consulting.hero.cta}
          </a>
        </div>
      </section>

      <section aria-labelledby="clinics-title" className="card gap-4 p-6 sm:p-8">
        <h2 id="clinics-title" className={SECTION_TITLE}>
          {consulting.clinics.title}
        </h2>
        <p className="max-w-2xl text-fg-muted sm:text-lg">{consulting.clinics.body}</p>
        <Link href="/clinics">
          <a className="group inline-flex items-center gap-1 self-start font-medium text-accent no-underline hover:underline">
            {consulting.clinics.link}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </a>
        </Link>
      </section>

      <section aria-labelledby="builds-title" className="flex flex-col gap-8">
        <h2 id="builds-title" className={SECTION_TITLE}>
          {builds.title}
        </h2>

        <div>
          <h3 className={SUBSECTION_TITLE}>{builds.scopeTitle}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {builds.scope.map((item) => (
              <li key={item} className="chip text-[0.9375rem] text-fg">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={SUBSECTION_TITLE}>{builds.processTitle}</h3>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5">
            {builds.steps.map((step, index) => (
              <li key={step.title} className="card gap-3 p-5">
                <span
                  aria-hidden="true"
                  className="grid size-9 place-items-center rounded-pill bg-fill text-sm font-semibold"
                >
                  {index + 1}
                </span>
                <h4 className="font-semibold">{step.title}</h4>
                <p className="text-sm text-fg-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {caseStudies.length > 0 && (
          <div>
            <h3 className={SUBSECTION_TITLE}>{builds.caseStudiesTitle}</h3>
            <div className="mt-4 grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
              {caseStudies.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  </MainLayout>
);

export default Consulting;

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<{ caseStudies: PublicProject[] }>
> => ({
  props: { caseStudies: caseStudiesFor('consulting') }
});
