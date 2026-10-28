import { content } from './content';

export type ProjectFeature = {
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  date: string;
  website: string;
  logo: string;
  /** Monochrome dark logo that should render white in dark mode */
  logoInvertOnDark?: boolean;
  description: string;
  role: string;
  disciplines: string[];
  skills_and_technologies: string[];
  /** Headline metric, shown like a widget value */
  metric: string;
  expertise?: string;
  features?: ProjectFeature[];
  image: { src: string; width: number; height: number; alt: string };
  video?: { src: string; poster: string };
  /** Portrait app mockups, cycled as a card stack; with `features`, renders the card as a full-width row */
  appImages?: { src: string; width: number; height: number; alt: string }[];
};

/** Project card data and copy live in content.ts */
export const PROJECTS: Project[] = content.projects;
