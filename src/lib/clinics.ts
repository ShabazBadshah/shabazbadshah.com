import { content } from '@/content/content';
import { caseStudiesFor, type PublicProject } from '@/content/projects';
import { SHOW_PLACEHOLDERS, shown } from '@/lib/todo';

export type ClinicOffer = (typeof content.clinics.offers.items)[number];
export type ClinicSupportItem = (typeof content.clinics.support.items)[number];
export type ClinicTestimonial = {
  slug: string;
  testimonial: NonNullable<PublicProject['testimonial']>;
};

export type ClinicsPageData = {
  caseStudies: PublicProject[];
  offers: ClinicOffer[];
  support: ClinicSupportItem[];
  testimonials: ClinicTestimonial[];
};

export const getClinicsPageData = (): ClinicsPageData => {
  const caseStudies = caseStudiesFor('clinics');
  const offers = content.clinics.offers.items.filter(
    (offer) => offer.confirmed || SHOW_PLACEHOLDERS
  );
  const support = content.clinics.support.items.filter((item) => shown(item.body));
  const testimonials = caseStudies
    .filter(
      (
        project
      ): project is PublicProject & { testimonial: NonNullable<PublicProject['testimonial']> } =>
        Boolean(project.testimonial && shown(project.testimonial.quote))
    )
    .map((project) => ({
      slug: project.slug,
      testimonial: project.testimonial
    }));

  return {
    caseStudies,
    offers,
    support,
    testimonials
  };
};
