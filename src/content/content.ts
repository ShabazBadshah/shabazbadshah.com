/**
 * Every piece of copy on the site: page and component text, accessible labels and SEO text.
 * Components read from here directly; src/config/site.ts reads its text from here too, so
 * bin/generate.ts picks up edits as well. Projects live in src/content/projects.ts and blog posts
 * in content/.
 *
 * Uses relative imports only: bin/generate.ts loads this file through ts-node, which has no `@/` alias.
 */
import { todo } from '../lib/todo';

export const content = {
  site: {
    name: 'Shabaz Badshah',
    /** One-liner used by structured data, the manifest and llms.txt */
    description:
      'Product engineer. I take products from the problem to production, then keep them running.'
  },

  seo: {
    title: 'Shabaz Badshah - Product Engineer',
    /** Home page meta description */
    description:
      'Shabaz Badshah is a product engineer in the GTA. I own products end to end: problem framing, design, engineering, release and support after launch.',
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
    consulting: {
      title: 'Badshah Consulting Inc. - Software for Ontario clinics',
      description:
        'Badshah Consulting builds and supports software for Ontario clinics, and takes on a limited number of end-to-end product builds for founders.'
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
    jobTitle: 'Product Engineer',
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
    description:
      'Badshah Consulting builds and supports software for Ontario clinics, and takes on a limited number of end-to-end product builds for founders.'
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
    items: { work: 'Work', consulting: 'Consulting', blog: 'Blog' },
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
      career: 'Hey Shabaz 👋 (product engineer role)',
      consulting: 'Hey Shabaz 👋 (product build)',
      clinics: 'Hey Shabaz 👋 (free website review)'
    },
    /** Appended to the email body: "<signature> <source>" */
    signature: 'Sent from shabazbadshah.com, source:'
  },

  layout: {
    skipToContent: 'Skip to content',
    scrollToTop: { label: 'Scroll to top', title: 'Back to top' }
  },

  hero: {
    sectionLabel: 'Introduction',
    name: 'Shabaz Badshah',
    title:
      'Product engineer. I take products from the problem to production, then keep them running.',
    currentlyLabel: 'Currently',
    /** "<before> [Syftable]<after>" */
    currently: {
      before: 'Shipping software for Ontario clinics through Badshah Consulting. Building',
      syftable: 'Syftable',
      after: '. Open to a full-time Product Engineer role on a small team.'
    },
    ctaPrimary: 'Get in touch',
    ctaSecondary: 'View my work',
    socialsLabel: 'Connect'
  },

  home: {
    proof: {
      title: 'Selected work',
      syftable: {
        eyebrow: 'My own product',
        title: 'Syftable',
        body: "It keeps track of your work so you don't have to.",
        link: 'Visit syftable.com'
      },
      clients: {
        eyebrow: 'Independent',
        title: 'Client work',
        body: 'Projects for clients through Badshah Consulting, from a clinic website to a mobile app MVP.',
        link: 'See the timeline'
      }
    },
    howIWork: {
      title: 'How I work',
      steps: [
        {
          title: 'Frame the problem',
          body: 'I start with who has the problem, what it costs them, and what would change if it went away.'
        },
        {
          title: 'Design',
          body: 'I design the smallest flow that solves it and check it with the people who will use it.'
        },
        {
          title: 'Engineer',
          body: 'I build it myself across the stack, and write down the trade-offs as I make them.'
        },
        {
          title: 'Release',
          body: 'I ship in small, reversible steps with monitoring in place, so launch day is uneventful.'
        },
        {
          title: 'Support',
          body: 'After launch I watch how it is used, fix what breaks, and keep improving it.'
        }
      ]
    },
    blog: { viewAll: 'View all posts' }
  },

  work: {
    title: 'Work',
    subtitle: 'Where I’ve worked and what I’ve shipped.',
    resume: 'Download resume',
    timeline: {
      title: 'Experience',
      independent: {
        org: 'Independent',
        role: 'Product Engineer',
        dates: 'Oct 2024–present',
        consulting: { name: 'Badshah Consulting Inc.', note: 'Incorporated 2026' },
        syftableLink: 'syftable.com'
      }
    },
    caseStudies: { title: 'Case studies' }
  },

  caseStudy: {
    back: 'All work',
    problem: 'The problem',
    whatIBuilt: 'What I built',
    outcome: 'Outcome',
    stack: 'Stack',
    phases: 'Phases',
    phase: (n: number): string => `Phase ${n}`,
    testimonial: 'Testimonial',
    visit: 'Visit site',
    read: 'Read case study'
  },

  consulting: {
    hero: {
      title: 'Badshah Consulting builds and supports software for Ontario clinics.',
      subtitle: 'I also take on a limited number of end-to-end product builds for founders.',
      cta: 'Book a call'
    },
    clinics: {
      title: 'Clinics',
      body: 'Clinic websites that are clear for patients and easy on the front desk, built with Ontario’s privacy and advertising rules in mind. I design, build and launch the site, then keep it running.',
      link: 'Software for clinics'
    },
    builds: {
      title: 'End-to-end product builds',
      scopeTitle: 'What’s included',
      scope: ['Product definition', 'Design', 'Build', 'Release', 'Support'],
      processTitle: 'How an engagement works',
      steps: [
        {
          title: 'Discovery',
          body: 'We talk through the problem, the users and the constraints, and agree on what success looks like.'
        },
        {
          title: 'Scoped proposal',
          body: 'You get a written scope, timeline and price before any work starts.'
        },
        {
          title: 'Build in short milestones',
          body: 'I build in short milestones, and you see working software at the end of each one.'
        },
        {
          title: 'Launch',
          body: 'I handle the release, from hosting and app stores to monitoring and handover notes.'
        },
        {
          title: 'Support period',
          body: 'After launch, a support period covers fixes and small changes while real users settle in.'
        }
      ],
      caseStudiesTitle: 'Client work'
    }
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
    disciplines: 'Disciplines',
    skills: 'Skills',
    showDetails: { label: 'Show project details', title: 'Project details' },
    hideDetails: { label: 'Back to project', title: 'Back' },
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
      career: { prompt: 'Hiring a product engineer?', label: "Let's talk." },
      consulting: { prompt: 'Have a product to build?', label: 'Book a call.' },
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
