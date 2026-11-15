import { CalendarCheck, MapPin } from 'lucide-react';
import { GetStaticPropsResult } from 'next';

import ProjectCard from '@/components/home/ProjectCard';
import SEO from '@/components/SEO';
import Todo from '@/components/Todo';
import { siteConfig } from '@/config/site';
import { content } from '@/content/content';
import { caseStudiesFor, type PublicProject } from '@/content/projects';
import MainLayout from '@/layouts/MainLayout';
import { businessStructuredData } from '@/lib/structured-data';
import { SHOW_PLACEHOLDERS, shown } from '@/lib/todo';

const PAGE = '/clinics';
const SECTION_TITLE = 'text-2xl font-semibold tracking-tight sm:text-3xl';

const { clinics } = content;
const offers = clinics.offers.items.filter((offer) => offer.confirmed || SHOW_PLACEHOLDERS);
const support = clinics.support.items.filter((item) => shown(item.body));

const Clinics = ({ caseStudies }: { caseStudies: PublicProject[] }): JSX.Element => {
  const testimonials = caseStudies.filter(
    (project) => project.testimonial && shown(project.testimonial.quote)
  );

  return (
    <MainLayout source="clinics">
      <SEO
        title={siteConfig.seo.clinics.title}
        description={siteConfig.seo.clinics.description}
        path={PAGE}
        jsonLd={businessStructuredData(PAGE, siteConfig.seo.clinics.title)}
      />
      <div className="flex flex-col gap-16 sm:gap-20">
        <section
          id="hero"
          aria-labelledby="clinics-title"
          className="flex max-w-3xl flex-col gap-5"
        >
          <h1 id="clinics-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {clinics.hero.title}
          </h1>
          <p className="text-lg text-fg-muted sm:text-xl">{clinics.hero.subtitle}</p>
          <div className="mt-2">
            <a
              href={siteConfig.contact.booking('clinics')}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-accent px-6"
            >
              <CalendarCheck aria-hidden="true" className="size-5" />
              {clinics.hero.cta}
            </a>
          </div>
        </section>

        {offers.length > 0 && (
          <section aria-labelledby="offers-title">
            <h2 id="offers-title" className={SECTION_TITLE}>
              {clinics.offers.title}
            </h2>
            <ul className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-3">
              {offers.map((offer) => (
                <li key={offer.title} className="card gap-3 p-6">
                  {!offer.confirmed && (
                    <p className="text-sm">
                      <Todo value={clinics.offers.unconfirmed} />
                    </p>
                  )}
                  <h3 className="text-lg font-semibold">{offer.title}</h3>
                  {shown(offer.body) && (
                    <p className="text-fg-muted">
                      <Todo value={offer.body} />
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {caseStudies.length > 0 && (
          <section aria-labelledby="work-title">
            <h2 id="work-title" className={SECTION_TITLE}>
              {clinics.work.title}
            </h2>
            <div className="mt-6 grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
              {caseStudies.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
            {testimonials.map(({ slug, testimonial }) => (
              <figure key={slug} className="card mt-4 gap-4 p-6 sm:p-8">
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
            ))}
          </section>
        )}

        {/* Kept apart from the clinic work above: a previous role, not a client */}
        <section aria-labelledby="background-title" className="card gap-3 p-6 sm:p-8">
          <h2 id="background-title" className="eyebrow">
            {clinics.background.label}
          </h2>
          <p className="max-w-2xl">{clinics.background.body}</p>
        </section>

        {support.length > 0 && (
          <section aria-labelledby="support-title">
            <h2 id="support-title" className={SECTION_TITLE}>
              {clinics.support.title}
            </h2>
            <ul className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-3">
              {support.map((item) => (
                <li key={item.title} className="card gap-2 p-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-fg-muted">
                    <Todo value={item.body} />
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section
          aria-labelledby="area-title"
          className="card gap-4 p-6 sm:flex-row sm:items-center sm:p-8"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-inner bg-fill text-accent">
            <MapPin aria-hidden="true" className="size-6" />
          </span>
          <div className="flex flex-col gap-1">
            <h2 id="area-title" className="text-lg font-semibold">
              {clinics.area.title}
            </h2>
            <p className="text-fg-muted">{clinics.area.body}</p>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Clinics;

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<{ caseStudies: PublicProject[] }>
> => ({
  props: { caseStudies: caseStudiesFor('clinics') }
});
