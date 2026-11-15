/**
 * Every piece of copy on the site: page and component text, accessible labels and SEO text.
 * Components read from here directly; src/config/site.ts reads its text from here too, so
 * bin/generate.ts picks up edits as well. Projects live in src/content/projects.ts and blog posts
 * in content/.
 *
 * Uses relative imports only: bin/generate.ts loads this file through ts-node, which has no `@/` alias.
 */
import { todo } from '../lib/todo';

const BUSINESS_DESCRIPTION =
  'Building and supporting solutions for Ontario clinics, and taking on a limited number of end-to-end product builds.';

export const content = {
  site: {
    name: 'Shabaz Badshah',
    /** One-liner used by structured data, the manifest and llms.txt */
    description:
      'Product Manager. I take products from the problem to production, then keep them running.'
  },

  seo: {
    title: 'Shabaz Badshah - Product Manager',
    /** Home page meta description */
    description:
      'Shabaz Badshah is a product manager in the GTA. I own products end-to-end: problem framing, design, engineering, release and support after launch.',
    keywords: [
      'product management',
      'product engineering',
      'software engineer',
      'technical consulting',
      'healthcare digitization',
      'software architecture'
    ],
    work: {
      title: 'Work',
      description:
        'Where I’ve worked and what I’ve shipped: Mednow, SOTI, Planned and independent product work since 2024, with case studies.'
    },
    caseStudy: {
      /** "<project> - <suffix>" */
      suffix: 'Case study'
    },
    clinics: {
      title: 'Clinic websites in Ontario - Badshah Consulting',
      description:
        'Websites that help patients find and book what they need, so your front desk handles fewer repetitive calls. Serving Ontario, focused on the GTA.'
    },
    blog: {
      title: 'Blog',
      description: "Some of Shabaz Badshah's thoughts on product, engineering, AI and healthcare."
    },
    /** Blog post <title>: "<prefix> - <post title> | <host>" */
    postTitlePrefix: 'Thoughts',
    notFound: {
      /** Followed by " | <host>" */
      title: 'Not Found',
      description: "Whoops, couldn't find what you were looking for. Sorry about that"
    },
    /** Title of the <link rel="alternate"> pointing at /llms.txt */
    llmsLinkTitle: 'LLM-readable site summary'
  },

  person: {
    name: 'Shabaz Badshah',
    jobTitle: 'Product Manager',
    location: 'the Greater Toronto Area, Ontario, Canada',
    knowsAbout: [
      'Product management',
      'Healthcare digitization',
      'Software architecture',
      'REST APIs',
      'Large language models',
      'PIPEDA and PHIPA compliance'
    ]
  },

  business: {
    name: 'Badshah Consulting Inc.',
    description: BUSINESS_DESCRIPTION
  },

  llms: {
    /** Follows "<name> is a <jobTitle> based in <location>." in the llms.txt summary */
    focus:
      'He is a hybrid product manager and full-stack engineer building zero-to-one applications. He offers end-to-end software development skillsets, from system architecture to final market launch, implementing features end-to-end, from problem definition to design, development, testing, deployment, and post-launch support.',
    usage:
      'Content below is free to summarize and cite with attribution and a link to the source page.'
  },

  nav: {
    label: 'Primary',
    home: 'Home',
    back: 'Back',
    items: { work: 'Work', blog: 'Blog' },
    contact: {
      open: 'Contact',
      close: 'Close contact',
      title: 'Get in touch',
      body: 'Reach out on any of these, or book a call.'
    },
    theme: {
      toggle: 'Toggle color theme',
      toLight: 'Switch to light theme',
      toDark: 'Switch to dark theme'
    }
  },

  socials: {
    linkedin: { name: '/in/shabaz-badshah', label: 'Connect on LinkedIn', cta: 'Connect' },
    github: { name: '@ShabazBadshah', label: 'Follow on GitHub', cta: 'Follow' },
    email: { name: 'badshah.shabaz@gmail.com', label: 'Send an email', cta: 'Email' },
    video: { name: 'Video call', label: 'Schedule a call', cta: 'Video or phone call' }
  },

  /** Email subject per contact source, so each inquiry says where it came from */
  contact: {
    subject: {
      career: 'Hey Shabaz 👋 (product manager role)',
      clinics: 'Hey Shabaz 👋 (free website review)'
    },
    /** Appended to the email body: "<signature> <source>" */
    signature: 'Sent from shabazbadshah.com, source:'
  },

  layout: {
    skipToContent: 'Skip to content',
    scrollToTop: { label: 'Scroll to top', title: 'Back to top' },
    /** The name tag that follows the mouse */
    cursorName: 'You'
  },

  hero: {
    sectionLabel: 'Introduction',
    name: 'Shabaz Badshah',
    role: 'Technical Product Manager',
    title: 'I take products from the problem to production, then keep them running.',
    currentlyLabel: 'Currently',
    /** "<before> [Syftable]<after>" */
    currently: {
      before: 'Shipping products independently for founders through Badshah Consulting. Building',
      syftable: 'Syftable',
      after: '.'
    },
    ctaPrimary: 'Get in touch',
    ctaSecondary: 'View my work'
  },

  home: {
    proof: { title: 'Selected work', viewAll: 'View all work' },
    blog: { viewAll: 'View all posts' }
  },

  work: {
    title: 'Work',
    subtitle:
      'The titles change, but the purpose remains. Solve meaningful problems and create lasting value for users.',
    /** The role at the top of the page (CURRENT_ROLE in projects.ts); its description is the business description */
    current: { label: 'Current role', clientsLabel: 'Client work' },
    filters: {
      label: 'Filter work history',
      employment: 'Work',
      volunteer: 'Volunteer'
    }
  },

  caseStudy: {
    back: 'All work',
    summary: 'Summary',
    company: 'Company',
    client: 'Client',
    role: 'Role',
    timeline: 'Timeline',
    team: 'Team',
    customers: 'Customers',
    disciplines: 'Disciplines',
    skills: 'Skills',
    problem: 'The problem',
    whatIBuilt: 'What I built',
    outcome: 'Outcome',
    stack: 'Stack',
    phases: 'Phases',
    phase: (n: number): string => `Phase ${n}`,
    visit: 'Visit site',
    /** Subject of the email a locked media block opens */
    walkthroughSubject: 'Walkthrough request: travel companion app'
  },

  clinics: {
    hero: {
      title: 'Patients find and book what they need on your website.',
      subtitle: 'Your front desk spends less time on the same calls and questions.',
      cta: 'Get a free website review'
    },
    offers: {
      title: 'What I can help with',
      /** TODO: confirm which offers are live; unconfirmed offers are left out of production builds */
      items: [
        {
          title: 'A website that guides patients to booking',
          body: 'A redesign that answers common questions up front and leads patients to book, with less back-and-forth with your front desk.',
          confirmed: false
        },
        {
          title: 'A compliant, accessible clinic website',
          body: 'Built to Ontario’s privacy and advertising rules, easy to use for every patient, and easy to find on Google.',
          confirmed: false
        },
        {
          title: 'CDCP coverage helper for dental offices',
          body: todo('describe the CDCP coverage helper'),
          confirmed: false
        }
      ],
      unconfirmed: todo('confirm this offer is live')
    },
    background: {
      label: 'Previous role',
      body: "I've built patient-facing software in Canadian healthcare. At Mednow, I helped build a patient pharmacy app through its national launch."
    },
    work: { title: 'Clinic work' },
    support: {
      title: 'After launch',
      items: [
        { title: 'Maintenance', body: todo('maintenance terms') },
        { title: 'Updates', body: todo('update terms') },
        { title: 'Response time', body: todo('response time') }
      ]
    },
    area: {
      title: 'Where I work',
      body: 'Ontario, focused on the GTA. In-person visits available.'
    }
  },

  projectCard: {
    demoLabel: (project: string): string => `${project} product demo`,
    fullscreen: {
      label: (video: string): string => `View ${video} fullscreen`,
      title: 'Fullscreen'
    }
  },

  blog: {
    title: 'Blog',
    subtitle: "Some of my thoughts and things I'd like to share.",
    featured: 'Featured',
    collapse: { label: 'Collapse article', title: 'Collapse' },
    toc: { label: 'Table of contents', summary: 'Contents' },
    enlargeImage: (alt: string): string => `Enlarge image: ${alt || 'article image'}`,
    pagination: {
      label: 'Blog pages',
      previous: 'Newer posts',
      next: 'Older posts',
      page: (n: number): string => `Page ${n}`
    }
  },

  footer: {
    /** The large call to action at the bottom of every page, per audience */
    cta: {
      career: { prompt: 'Hiring a product manager?', label: "Let's talk." },
      clinics: { prompt: 'Curious how your website is doing?', label: 'Get a free website review.' }
    },
    /** "<or> [email]" under a booking call to action, "<or> [book a call]" under an email one */
    or: 'Or',
    orBook: 'book a call',
    navLabel: 'Footer',
    syftable: 'Syftable',
    /** Footer link text per social provider; providers left out are not linked */
    links: { linkedin: 'LinkedIn', github: 'GitHub' } as Record<string, string>
  },

  notFound: {
    code: '404!',
    title: 'Something went wrong',
    body: "The page you're looking for doesn't exist, let's go back home.",
    cta: 'Back to homepage'
  }
};
