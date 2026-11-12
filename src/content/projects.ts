/**
 * Every project on the site: employers, client work and my own product. Pages read these only in
 * getStaticProps and pass `toPublic()` views to components, so a client that hasn't agreed to be
 * named never reaches the browser by name, logo, link or screenshot.
 *
 * Uses relative imports only: bin/generate.ts loads this file through ts-node, which has no `@/` alias.
 */
import { siteConfig } from '../config/site';
import { isTodo, SHOW_PLACEHOLDERS, todo } from '../lib/todo';

export type Audience = 'career' | 'consulting' | 'clinics';
/** Which filter a project sits under on /work: Work, Volunteer or Projects */
export type ProjectKind = 'employment' | 'volunteer' | 'project';

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
  /** Client work through Badshah Consulting: under the current role on /work, and on /consulting */
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
  whatIBuilt: string;
  outcome: string;
  stack: string[];
  externalUrl?: string;
  testimonial?: Testimonial;
  phases?: Phase[];
  /** Extra detail on the card's flip side */
  disciplines?: string[];
  skills?: string[];
  /** File name in src/content/case-studies/ with the long-form case study */
  caseStudy?: string;
  icon?: ProjectIcon;
  media?: ProjectMedia;
};

/** The current role, at the top of /work. Client projects are done through it. */
export const CURRENT_ROLE = {
  company: 'Badshah Consulting',
  role: 'Product Engineer Consultant',
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
    summary: 'Shipped Windows chat and video calling in an enterprise B2B/government product.',
    problem:
      'Support teams needed to message and video call managed (MDM) devices to give technical support.',
    whatIBuilt:
      'Instant messaging and video calling between support staff and managed devices, with the API and system specifications behind it.',
    outcome: 'Grew revenue by $27K MRR CAD post-release.',
    stack: [
      'Android Enterprise',
      'WebRTC',
      'Real-time communication tools',
      'REST APIs and request/response schemas',
      'Data modeling'
    ],
    externalUrl: 'https://soti.net',
    disciplines: [
      'Technical Product Management',
      'UI/UX Design',
      'Quality Assurance (Design QA)',
      'Technical Writing (API and System Specifications)',
      'Systems Integration Architecture'
    ],
    media: {
      logo: '/images/portfolio/soti-logo.png',
      image: {
        src: '/images/portfolio/soti-poster.jpg',
        width: 1280,
        height: 720,
        alt: 'SOTI instant messaging and video calling tool'
      },
      video: {
        src: '/images/portfolio/xsight-video.mp4',
        poster: '/images/portfolio/soti-poster.jpg'
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
    end: 'May 2023',
    audiences: ['career'],
    summary: 'Senior PM on an enterprise event management platform.',
    problem:
      'Vendor data for the curated marketplace was spread across Google Maps, PDFs, Yelp and other sources, which made onboarding slow.',
    whatIBuilt:
      'A REST API that uses LLMs to consolidate vendor data from those sources into the marketplace.',
    outcome: 'Reduced vendor onboarding time from 48h to 6h.',
    stack: [
      'LLMs (ChatGPT)',
      'Internal REST APIs',
      'Google Maps API',
      'Website scraping',
      'Data enrichment pipelines'
    ],
    externalUrl: 'https://planned.com/',
    disciplines: [
      'Product Management',
      'Technical Discovery and Proof-of-Concept',
      'Data Engineering (Ingestion Pipeline Design)',
      'Workflow Automation',
      'System Design and Architecture'
    ],
    media: {
      logo: '/images/portfolio/planned-logo.png',
      logoInvertOnDark: true,
      image: { src: '/images/portfolio/planned.png', width: 1866, height: 1007, alt: 'Planned' }
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
    end: 'Sep 2022',
    audiences: ['career'],
    summary:
      'Helped build a net-new patient pharmacy app through national launch, in regulated Canadian healthcare.',
    problem: todo('the problem Mednow set out to solve'),
    whatIBuilt:
      'A B2C pharmacy app for iOS and Android, localized in English and French, with PharmacyLink, Stream Chat, Stripe payments, social sign-in and push notifications.',
    outcome: 'Shipped 0→1 to national launch. 400+ 5-star Google reviews.',
    stack: [
      'iOS and Android mobile apps',
      'Figma',
      'TELUS Kroll PMS',
      'Stripe',
      'Stream Chat',
      'Shopify eCommerce integration',
      'Social SSO (Apple/Google)',
      'Native push notifications',
      'PIPEDA compliance',
      'PHIPA compliance'
    ],
    externalUrl: 'https://mednow.ca/',
    disciplines: [
      'Product Management (0 to 1 scaling)',
      'Platform and Systems Integration',
      'Stakeholder Management and Cross-functional Collaboration',
      'Healthcare Compliance',
      'E-commerce and Logistics Integration',
      'Release Management and Quality Assurance'
    ],
    media: {
      logo: '/images/portfolio/mednow-logo.png',
      image: {
        src: '/images/portfolio/mednow.webp',
        width: 1500,
        height: 1123,
        alt: 'Mednow marketing site'
      },
      appImages: [
        {
          src: '/images/portfolio/mednow-app.svg',
          width: 851,
          height: 1726,
          alt: 'Mednow pharmacy app on a phone'
        },
        {
          src: '/images/portfolio/mednow-app-2.svg',
          width: 851,
          height: 1726,
          alt: 'Mednow pharmacy app screen'
        },
        {
          src: '/images/portfolio/mednow-app-3.svg',
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
      logo: '/images/portfolio/project-include-logo.png',
      image: {
        src: '/images/portfolio/project-include.png',
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
    summary: "My own product. It keeps track of your work so you don't have to.",
    problem: '',
    whatIBuilt: '',
    outcome: '',
    stack: [],
    externalUrl: siteConfig.syftable.url,
    media: { logo: siteConfig.syftable.logo }
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
    role: '',
    start: '',
    end: '',
    audiences: ['career', 'consulting', 'clinics'],
    summary:
      'Brand, website and compliance for a chiropractic clinic, designed, built and launched end to end, with support after launch.',
    problem: 'The clinic needed an online presence that brings in patient bookings.',
    whatIBuilt:
      'A new brand and a WordPress website, built to PHIPA, PIPEDA and CCO compliance, with technical SEO and AEO, clear forms, and staff training and documentation.',
    outcome: todo('UOC outcome'),
    stack: [
      'WordPress',
      'PHP',
      'Technical SEO and AEO',
      'Form UX',
      'PHIPA and PIPEDA compliance',
      'Post-launch support and maintenance'
    ],
    externalUrl: 'https://uoc-intake-clone.vercel.app/',
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
        src: '/images/portfolio/uoc.png',
        width: 1866,
        height: 1007,
        alt: 'Upper Oakville Chiropractic homepage hero section'
      }
    }
  },
  {
    slug: 'travel-app',
    caseStudy: 'travel-companion-app',
    title: 'Travel app MVP',
    kind: 'employment',
    client: true,
    org: 'Confidential client',
    // The client is under NDA: never show the app's name, logo or screenshots
    publicName: false,
    anonymizedName: 'Travel app MVP',
    icon: 'plane',
    role: '',
    start: '',
    end: '',
    audiences: ['career', 'consulting'],
    summary: 'React Native/Expo MVP for iOS and Android, built on Firebase with Google sign-in.',
    problem: todo('the problem the travel app MVP solves'),
    whatIBuilt:
      'An iOS and Android MVP built with React Native and Expo, on Firebase, with Google sign-in.',
    outcome: todo('travel app MVP outcome'),
    stack: ['React Native', 'Expo', 'Firebase', 'Google sign-in', 'iOS', 'Android']
  }
];

/** What components receive: no client name, logo, link or screenshot unless `publicName` */
export type PublicProject = {
  /** URL slug; derived from the anonymized name when the client can't be named */
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
  project.publicName ? project.slug : kebab(project.anonymizedName);

/** Production builds drop placeholders here, so they never reach page props either */
const clean = (value: string): string => (SHOW_PLACEHOLDERS || !isTodo(value) ? value : '');

export const toPublic = (project: Project): PublicProject => ({
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
  whatIBuilt: clean(project.whatIBuilt),
  outcome: clean(project.outcome),
  stack: project.stack,
  disciplines: project.disciplines ?? [],
  skills: project.skills ?? [],
  externalUrl: project.publicName ? project.externalUrl ?? null : null,
  testimonial: project.testimonial && clean(project.testimonial.quote) ? project.testimonial : null,
  phases: (project.phases ?? [])
    .filter((phase) => phase.status === 'live')
    .map((phase) => ({ ...phase, summary: clean(phase.summary), outcome: clean(phase.outcome) })),
  // Round-trip drops undefined fields, which getStaticProps can't serialize
  media: project.publicName && project.media ? JSON.parse(JSON.stringify(project.media)) : null,
  hasCaseStudy: project.kind !== 'project',
  caseStudy: project.caseStudy ?? null,
  icon: project.icon ?? null
});

const bySlug = (slug: string): Project => {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
};

export const publicProject = (slug: string): PublicProject => toPublic(bySlug(slug));

/**
 * Case studies for an audience's grid. Only client work appears in a client grid, so `clientsOnly`
 * is set everywhere except /work.
 */
export const caseStudiesFor = (audience: Audience, { clientsOnly = true } = {}): PublicProject[] =>
  PROJECTS.filter(
    (p) => p.audiences.includes(audience) && p.kind !== 'project' && (!clientsOnly || p.client)
  ).map(toPublic);

/** A filter's rows on /work; client work sits under the current role instead */
export const projectsOfKind = (kind: ProjectKind): PublicProject[] =>
  PROJECTS.filter((p) => p.kind === kind && !p.client).map(toPublic);

export const caseStudyProjects = (): PublicProject[] =>
  PROJECTS.filter((p) => p.kind !== 'project').map(toPublic);

/** Client work through Badshah Consulting, the current role on /work */
export const clientProjects = (): PublicProject[] => PROJECTS.filter((p) => p.client).map(toPublic);
