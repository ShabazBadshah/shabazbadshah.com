/**
 * Every project on the site: employers, client work and my own product. Pages read these only in
 * getStaticProps and pass `toPublic()` views to components, so a client that hasn't agreed to be
 * named never reaches the browser by name, logo, link or screenshot.
 *
 * Uses relative imports only: bin/generate.ts loads this file through ts-node, which has no `@/` alias.
 */
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

import { siteConfig } from '../lib/site';
import { isTodo, SHOW_PLACEHOLDERS, todo, VERIFY } from '../lib/todo';

export type Audience = 'career' | 'clinics';
/**
 * Which tab a project sits under on /work: Work or Volunteer. My own product ('project') sits under
 * the current role instead, with the client work.
 */
export type ProjectKind = 'employment' | 'volunteer' | 'project';
export type WorkTab = Exclude<ProjectKind, 'project'>;

export type Phase = {
  title: string;
  summary: string;
  outcome: string;
  status: 'live' | 'hidden';
};

export type Testimonial = { quote: string; name: string; role: string };

/** A generic icon in place of a logo; safe to show when the project can't be named */
export type ProjectIcon = 'plane';

type Img = { src: string; width: number; height: number; alt: string };

/** Card visuals. Only shown when the project can be named (`publicName`). */
export type ProjectMedia = {
  logo?: string;
  /** Monochrome dark logo that should render white in dark mode */
  logoInvertOnDark?: boolean;
  image?: Img;
  video?: { src: string; poster: string };
  /** Portrait app mockups, cycled as a card stack; with `features`, renders the card as a full-width row */
  appImages?: Img[];
  features?: string[];
};

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  /** Client work through Badshah Consulting: under the current role on /work */
  client?: boolean;
  org: string;
  publicName: boolean;
  anonymizedName: string;
  /** Empty for client projects, which take the current role's */
  role: string;
  /** Not shown for client projects, which sit under the Independent entry on the timeline */
  start: string;
  end: string;
  audiences: Audience[];
  summary: string;
  problem: string;
  /** Only without a case study, whose file holds these instead */
  whatIBuilt?: string;
  outcome?: string;
  stack?: string[];
  externalUrl?: string;
  testimonial?: Testimonial;
  phases?: Phase[];
  /** Extra detail on the card's flip side */
  disciplines?: string[];
  skills?: string[];
  /** File name in src/content/case-studies/ with the long-form case study; also the page's URL */
  caseStudy?: string;
  icon?: ProjectIcon;
  media?: ProjectMedia;
};

/** The current role, at the top of /work. Client projects are done through it. */
export const CURRENT_ROLE = {
  company: 'Badshah Consulting',
  role: 'Independent Product Work',
  start: '2024',
  end: 'present'
};

/** Newest first within each kind, the order /work lists them in */
export const PROJECTS: Project[] = [
  {
    slug: 'soti',
    caseStudy: 'soti-frontline-support-chat',
    title: 'SOTI',
    kind: 'employment',
    org: 'SOTI',
    publicName: true,
    anonymizedName: 'Enterprise mobility software',
    role: 'Technical Product Manager',
    start: 'Nov 2023',
    end: 'Oct 2024',
    audiences: ['career'],
    summary:
      'Shipped a realtime Android and Windows chat and video calling app to provide technical support in B2B/government environments.',
    problem:
      'Support teams needed to message and video call managed (MDM) devices to give technical support.',
    externalUrl: 'https://soti.net',
    disciplines: [
      'Technical Product Management',
      'UI/UX Design',
      'Quality Assurance (Design QA)',
      'Technical Writing (API and System Specifications)',
      'Systems Integration Architecture'
    ],
    media: {
      logo: '/images/portfolio/soti-logo.webp',
      image: {
        src: '/images/portfolio/soti-poster.webp',
        width: 1280,
        height: 720,
        alt: 'SOTI instant messaging and video calling tool'
      },
      video: {
        src: '/images/portfolio/xsight-video.mp4',
        poster: '/images/portfolio/soti-poster.webp'
      }
    }
  },
  {
    slug: 'planned',
    caseStudy: 'planned-vendor-onboarding',
    title: 'Planned',
    kind: 'employment',
    org: 'Planned',
    publicName: true,
    anonymizedName: 'Event management platform',
    role: 'Senior Product Manager',
    start: 'Nov 2022',
    end: 'Jun 2023',
    audiences: ['career'],
    summary:
      'Vendor marketplace data consolidation API for reducing onboarding time using LLMs, REST/GraphQL, and Google Maps.',
    problem:
      'Vendor data for the curated marketplace was spread across Google Maps, PDFs, Yelp and other sources, which made onboarding slow.',
    externalUrl: 'https://planned.com/',
    disciplines: [
      'Product Management',
      'Technical Discovery and Proof-of-Concept',
      'Data Engineering (Ingestion Pipeline Design)',
      'Workflow Automation',
      'System Design and Architecture'
    ],
    media: {
      logo: '/images/portfolio/planned-logo.webp',
      logoInvertOnDark: true,
      image: { src: '/images/portfolio/planned.webp', width: 1866, height: 1007, alt: 'Planned' }
    }
  },
  {
    slug: 'mednow',
    caseStudy: 'mednow-digital-pharmacy',
    title: 'Mednow',
    kind: 'employment',
    org: 'Mednow',
    publicName: true,
    anonymizedName: 'Digital pharmacy',
    role: 'Product Manager',
    start: 'Feb 2021',
    end: 'Jun 2022',
    audiences: ['career'],
    summary:
      'Owned and delivered to market a net-new patient pharmacy app in regulated Canadian healthcare (including Québec).',
    problem: todo('the problem Mednow set out to solve'),
    externalUrl: 'https://mednow.ca/',
    disciplines: [
      'Product Management (0-1)',
      'Platform Integration',
      'Healthcare Compliance',
      'Mobile Apps',
      'E-commerce'
    ],
    media: {
      logo: '/images/portfolio/mednow-logo.webp',
      image: {
        src: '/images/portfolio/mednow.webp',
        width: 1500,
        height: 1123,
        alt: 'Mednow marketing site'
      },
      appImages: [
        {
          src: '/images/portfolio/mednow-app.webp',
          width: 851,
          height: 1726,
          alt: 'Mednow pharmacy app on a phone'
        },
        {
          src: '/images/portfolio/mednow-app-2.webp',
          width: 851,
          height: 1726,
          alt: 'Mednow pharmacy app screen'
        },
        {
          src: '/images/portfolio/mednow-app-3.webp',
          width: 851,
          height: 1726,
          alt: 'Mednow pharmacy app screen'
        }
      ],
      features: [
        'Loved by patients: 400+ 5-star Google reviews.',
        'Available across Canada: Localized in English and French.',
        'PIPEDA & PHIPA adherence: Patient data/privacy, and operations compliant.',
        'Integrations: PharmacyLink, StreamChat, Stripe payments, etc.'
      ]
    }
  },
  {
    slug: 'project-include',
    title: 'Project Include',
    kind: 'volunteer',
    org: 'Project Include',
    publicName: true,
    anonymizedName: 'Coding education nonprofit',
    role: 'Frontend Developer',
    start: 'Feb 2020',
    end: 'Feb 2021',
    audiences: ['career'],
    summary:
      'An informational site for a volunteer nonprofit that empowers low socio-economic communities through free coding bootcamps and workshops.',
    problem: todo('the problem the Project Include site solved'),
    whatIBuilt:
      'Frontend development for the site, a Contentful CMS integration, and marketing automation and analytics.',
    outcome: 'Ran 50+ workshops for 250+ students before ending.',
    stack: ['React.JS', 'Next.JS', 'Contentful CMS', 'GA4'],
    externalUrl: 'https://www.facebook.com/hashtagprojectinclude/',
    disciplines: [
      'Frontend Web Development',
      'Software Migration',
      'Content Management System (CMS) Integration',
      'Marketing Automation',
      'Web Analytics'
    ],
    media: {
      logo: '/images/portfolio/project-include-logo.webp',
      image: {
        src: '/images/portfolio/project-include.webp',
        width: 1842,
        height: 983,
        alt: 'Project Include'
      }
    }
  },
  {
    slug: 'syftable',
    title: 'Syftable',
    kind: 'project',
    org: 'Syftable',
    publicName: true,
    anonymizedName: 'Syftable',
    role: 'Founder',
    start: 'Jun 2024',
    end: 'present',
    audiences: ['career'],
    summary:
      'My own product: a Mac app that follows your work as you do it, keeping track of the decisions, commitments and files you would otherwise have to remember. It processes and saves everything on your Mac, and acts only with your approval.',
    problem: '',
    externalUrl: siteConfig.syftable.url,
    media: {
      logo: siteConfig.syftable.logo,
      image: {
        src: '/images/portfolio/syftable.webp',
        width: 1920,
        height: 1080,
        alt: 'Syftable website'
      }
    }
  },
  {
    slug: 'upper-oakville-chiro',
    caseStudy: 'upper-oakville-chiropractic',
    title: 'Upper Oakville Chiropractic',
    kind: 'employment',
    client: true,
    org: 'Upper Oakville Chiropractic',
    publicName: true,
    anonymizedName: 'Chiropractic clinic, Oakville',
    role: 'Product Engineer',
    start: '',
    end: '',
    audiences: ['career', 'clinics'],
    summary:
      'Brand, website and compliance for a chiropractic clinic, designed, built and launched, with support after launch.',
    problem: 'The clinic needed an online presence that brings in patient bookings.',
    externalUrl: 'https://uochiro.com/',
    testimonial: { quote: todo('UOC testimonial'), name: '', role: '' },
    phases: [
      {
        title: 'Brand, website and compliance',
        summary:
          'A new brand and website for the clinic, built to PHIPA, PIPEDA and CCO compliance.',
        outcome: todo('UOC phase 1 outcome'),
        status: 'live'
      },
      {
        title: 'Patient journey discovery',
        summary: todo('UOC phase 2: patient journey discovery and site/workflow updates'),
        outcome: todo('UOC phase 2 before/after results'),
        status: 'hidden'
      }
    ],
    media: {
      logo: '/images/portfolio/uoc-logo.svg',
      image: {
        src: '/images/portfolio/uoc.webp',
        width: 1866,
        height: 1007,
        alt: 'Upper Oakville Chiropractic homepage hero section'
      }
    }
  },
  {
    slug: 'travel-app',
    caseStudy: 'travel-companion-app',
    title: 'Collaborative Travel App',
    kind: 'employment',
    client: true,
    org: 'Confidential client',
    // The client is under NDA: never show the app's name, logo or screenshots
    publicName: false,
    anonymizedName: 'Collaborative Travel App',
    icon: 'plane',
    role: 'Product Engineer',
    start: '',
    end: '',
    audiences: ['career'],
    summary:
      'Making trip planning in groups easier though collaborative real-time itineraries, AI suggestions, and a social networking system.',
    problem: todo('the problem the travel app MVP solves')
  }
];

/** What components receive: no client name, logo, link or screenshot unless `publicName` */
export type PublicProject = {
  /**
   * URL slug: the case study's file name when it has one, otherwise derived from the anonymized
   * name when the client can't be named
   */
  slug: string;
  kind: ProjectKind;
  client: boolean;
  name: string;
  /** The employer, or for client work the business it was done through */
  company: string;
  role: string;
  start: string;
  end: string;
  summary: string;
  problem: string;
  whatIBuilt: string;
  outcome: string;
  stack: string[];
  disciplines: string[];
  skills: string[];
  externalUrl: string | null;
  testimonial: Testimonial | null;
  /** Live phases only, in order */
  phases: Phase[];
  media: ProjectMedia | null;
  hasCaseStudy: boolean;
  caseStudy: string | null;
  icon: ProjectIcon | null;
};

const kebab = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const routeSlug = (project: Project): string =>
  project.caseStudy ?? (project.publicName ? project.slug : kebab(project.anonymizedName));

/** Production builds drop placeholders here, so they never reach page props either */
const clean = (value = ''): string =>
  SHOW_PLACEHOLDERS || !(isTodo(value) || VERIFY.test(value)) ? value : '';

/**
 * What a case study file holds instead of projects.ts, read even while it is a draft: its outcome
 * and stack, and its "What I built" section as plain text
 */
const caseStudyFacts = (file: string): Pick<Project, 'whatIBuilt' | 'outcome' | 'stack'> => {
  const path = join(process.cwd(), 'src/content/case-studies', `${file}.md`);
  const { data, content } = matter(fs.readFileSync(path, 'utf8'));
  const built = content.split(/^## /m).find((section) => section.startsWith('What I built\n'));
  return {
    outcome: data.outcome,
    stack: data.stack,
    whatIBuilt: (built ?? '')
      .replace(/^What I built\n/, '')
      .replace(/```[\s\S]*?```|<!--[\s\S]*?-->|\*\*/g, '')
      .replace(/^\s*(?:[-*]|\d+\.)\s+/gm, '')
      .replace(/\s+/g, ' ')
      .trim()
  };
};

export const toPublic = (project: Project): PublicProject => {
  const facts = project.caseStudy ? caseStudyFacts(project.caseStudy) : project;
  return {
    slug: routeSlug(project),
    kind: project.kind,
    client: project.client ?? false,
    name: project.publicName ? project.title : project.anonymizedName,
    company: project.client
      ? CURRENT_ROLE.company
      : project.publicName
      ? project.title
      : project.anonymizedName,
    role: project.role || (project.client ? CURRENT_ROLE.role : ''),
    start: clean(project.start),
    end: clean(project.end),
    summary: clean(project.summary),
    problem: clean(project.problem),
    whatIBuilt: clean(facts.whatIBuilt),
    outcome: clean(facts.outcome),
    stack: facts.stack ?? [],
    disciplines: project.disciplines ?? [],
    skills: project.skills ?? [],
    externalUrl: project.publicName ? project.externalUrl ?? null : null,
    testimonial:
      project.testimonial && clean(project.testimonial.quote) ? project.testimonial : null,
    phases: (project.phases ?? [])
      .filter((phase) => phase.status === 'live')
      .map((phase) => ({ ...phase, summary: clean(phase.summary), outcome: clean(phase.outcome) })),
    // Round-trip drops undefined fields, which getStaticProps can't serialize
    media: project.publicName && project.media ? JSON.parse(JSON.stringify(project.media)) : null,
    hasCaseStudy: project.kind !== 'project',
    caseStudy: project.caseStudy ?? null,
    icon: project.icon ?? null
  };
};

const bySlug = (slug: string): Project => {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
};

export const publicProject = (slug: string): PublicProject => toPublic(bySlug(slug));

/** Client case studies for an audience's grid */
export const caseStudiesFor = (audience: Audience): PublicProject[] =>
  PROJECTS.filter((p) => p.audiences.includes(audience) && p.client).map(toPublic);

/** A tab's rows on /work; client work and my own product sit under the current role instead */
export const projectsOfKind = (kind: WorkTab): PublicProject[] =>
  PROJECTS.filter((p) => p.kind === kind && !p.client).map(toPublic);

export const caseStudyProjects = (): PublicProject[] =>
  PROJECTS.filter((p) => p.kind !== 'project').map(toPublic);

/** Under the current role on /work: client work through Badshah Consulting, and my own product */
export const currentRoleProjects = (): PublicProject[] =>
  PROJECTS.filter((p) => p.client || p.kind === 'project').map(toPublic);
