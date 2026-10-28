/**
 * Every piece of copy on the site: page and component text, accessible labels, SEO text and project
 * cards. Components read from here directly; src/config/site.ts and src/content/projects.ts read
 * their text from here too, so bin/generate.ts picks up edits as well. Blog posts stay in content/.
 *
 * Uses relative imports only: bin/generate.ts loads this file through ts-node, which has no `@/` alias.
 */
import type { Project } from './projects';

export const content = {
  site: {
    name: 'Shabaz Badshah',
    /** One-liner used by structured data, the manifest and llms.txt */
    description:
      'I integrate product strategy with technical execution to solve impactful business problems.'
  },

  seo: {
    title: 'Shabaz Badshah - Product Engineer & Technical Product Consultant',
    /** Home page meta description */
    description:
      "I’m a product engineer with 5+ years in technical product management and software development roles, I build things end-to-end. I figure out what’s worth making, why it's useful, write the code, and make sure it's supported after launch.",
    keywords: [
      'product management',
      'product engineering',
      'software engineer',
      'technical consulting',
      'healthcare digitization',
      'software architecture'
    ],
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
    jobTitle: 'Product Engineer & Technical Product Consultant',
    location: 'Ontario, Canada',
    knowsAbout: [
      'Product management',
      'Healthcare digitization',
      'Software architecture',
      'REST APIs',
      'Large language models',
      'PIPEDA and PHIPA compliance'
    ]
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
    items: { home: 'About', work: 'Work', blog: 'Blog' },
    theme: {
      toggle: 'Toggle color theme',
      toLight: 'Switch to light theme',
      toDark: 'Switch to dark theme'
    }
  },

  socials: {
    linkedin: { name: '/in/shabaz-badshah', label: 'LinkedIn', cta: 'Connect' },
    github: { name: '@ShabazBadshah', label: 'GitHub', cta: 'Follow' },
    email: { name: 'badshah.shabaz@gmail.com', label: 'Send an email', cta: 'Email' },
    video: { name: 'Video call', label: "Let's meet virtually", cta: 'Video call' }
  },

  layout: {
    skipToContent: 'Skip to content',
    scrollToTop: { label: 'Scroll to top', title: 'Back to top' }
  },

  hero: {
    sectionLabel: 'Introduction',
    title: `Hey 👋, I'm Shabaz Badshah`,
    intro:
      "I’m a product engineer with 5+ years in technical product management and software development roles, I build things end-to-end. I figure out what’s worth making, why it's useful, write the code, and make sure it's supported after launch.",
    /** "<before> [Syftable] <after>" */
    syftable: {
      name: 'Syftable',
      before: "I'm currently bootstrapping",
      after:
        "which keeps track of your work so you don't have to. It catches what you owe and surfaces what you need, without a single prompt, all on your computer."
    },
    ctaPrimary: "Let's talk",
    ctaSecondary: 'View selected works',
    socialsLabel: 'Connect'
  },

  work: {
    title: 'Selected Works'
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
    enlargeImage: (alt: string): string => `Enlarge image: ${alt || 'article image'}`
  },

  footer: {
    prompt: 'Does my skillset sound like a great fit for your team?',
    cta: "Let's talk",
    navLabel: 'Footer',
    /** Footer link text per social provider; providers left out are not linked */
    links: { linkedin: 'LinkedIn', github: 'GitHub', video: 'Meet virtually' } as Record<
      string,
      string
    >
  },

  notFound: {
    code: '404!',
    title: 'Something went wrong',
    body: "The page you're looking for doesn't exist, let's go back home.",
    cta: 'Back to homepage'
  },

  projects: [
    {
      slug: 'mednow',
      title: 'Mednow',
      date: '2022',
      website: 'https://mednow.ca/',
      logo: '/images/portfolio/mednow-logo.png',
      description:
        'A Canadian digital pharmacy app providing automated medication management and free nationwide delivery. It integrates holistic healthcare through virtual medical consultations, mental health support, and personalized wellness programs.',
      role: 'Product manager',
      metric: 'Shipped a B2C pharmacy app 0→1 to national launch.',
      features: [
        {
          title: 'Loved by patients: 400+ 5-star Google reviews.',
          description: '400+ 5-star Google reviews.'
        },
        {
          title: 'Available across Canada: Localized in English and French.',
          description: 'Localized across Canada (including Québec).'
        },
        {
          title: 'PIPEDA & PHIPA adherence: Patient data/privacy, and operations compliant.',
          description: 'Patient data/privacy, and operations compliant.'
        },
        {
          title: 'Integrations: PharmacyLink, StreamChat, Stripe payments, etc.',
          description: 'PharmacyLink, instant messaging, Stripe payments, notifications.'
        }
      ],
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
      disciplines: [
        'Product Management (0 to 1 scaling)',
        'Platform and Systems Integration',
        'Stakeholder Management and Cross-functional Collaboration',
        'Healthcare Compliance',
        'E-commerce and Logistics Integration',
        'Release Management and Quality Assurance'
      ],
      skills_and_technologies: [
        'iOS and Android mobile apps',
        'Figma',
        'TELUS Kroll PMS',
        'Stripe',
        'Stream Chat',
        'PIPEDA compliance',
        'PHIPA compliance',
        'Shopify eCommerce integration',
        'Social SSO (Apple/Google)',
        'Native push notifications'
      ]
    },
    {
      slug: 'uoc',
      title: 'Upper Oakville Chiropractic',
      date: '2026',
      website: 'https://uoc-intake-clone.vercel.app/',
      logo: '/images/portfolio/uoc-logo.png',
      logoInvertOnDark: true,
      description:
        'Patient acquisition website and in-clinic digital intake system for an Oakville chiropractic clinic. The site is engineered for search and AI answer engines; the self-serve intake flow replaces paper forms and staff transcription at check-in.',
      role: 'Product Engineer Consultant',
      metric: 'Reduced patient intake time by ~1 hour per week via self-service intake form',
      expertise: 'Technical SEO and AEO, full-stack engineering, form UX, clinic workflow design',
      image: {
        src: '/images/portfolio/uoc.png',
        width: 1866,
        height: 1007,
        alt: 'Upper Oakville Chiropractic homepage hero section'
      },
      disciplines: [
        'Full-Stack Engineering',
        'Product Management',
        'Technical SEO and AEO',
        'Patient onboarding and form UX',
        'Clinic workflow design'
      ],
      skills_and_technologies: [
        'Next.js',
        'TypeScript',
        'React Hook Form',
        'Zod',
        'REST APIs',
        'PostgreSQL'
      ]
    },
    {
      slug: 'planned',
      title: 'Planned',
      date: '2023',
      website: 'https://planned.com/',
      logo: '/images/portfolio/planned-logo.png',
      logoInvertOnDark: true,
      description:
        'REST API for consolidating disparate vendor data (Google Maps, PDFs, Yelp, etc.) using LLM technology to scale curated marketplace.',
      role: 'Product manager',
      metric: 'Reduced vendor onboarding time from 48h to 6h',
      expertise: 'Technical architecture, REST APIs, ETL, AI, LLMs',
      image: { src: '/images/portfolio/planned.png', width: 1866, height: 1007, alt: 'Planned' },
      disciplines: [
        'Product Management',
        'Technical Discovery and Proof-of-Concept',
        'Data Engineering (Ingestion Pipeline Design)',
        'Workflow Automation',
        'System Design and Architecture'
      ],
      skills_and_technologies: [
        'LLMs (ChatGPT)',
        'Internal REST APIs',
        'Google Maps API',
        'Website scraping',
        'Data enrichment pipelines'
      ]
    },
    {
      slug: 'soti',
      title: 'SOTI',
      date: '2024',
      website: 'https://soti.net',
      logo: '/images/portfolio/soti-logo.png',
      description:
        'A custom instant-messaging and video calling tool (web and mobile apps) to communicate between MDM devices in order to provide technical support.',
      role: 'Product manager',
      metric: 'Grew revenue by $27K MRR CAD post-release',
      expertise: 'Technical architecture, B2B, low-latency realtime systems',
      image: {
        src: '/images/portfolio/soti-poster.jpg',
        width: 1280,
        height: 720,
        alt: 'SOTI instant messaging and video calling tool'
      },
      video: {
        src: '/images/portfolio/xsight-video.mp4',
        poster: '/images/portfolio/soti-poster.jpg'
      },
      disciplines: [
        'Technical Product Management',
        'UI/UX Design',
        'Quality Assurance (Design QA)',
        'Technical Writing (API and System Specifications)',
        'Systems Integration Architecture'
      ],
      skills_and_technologies: [
        'Android Enterprise',
        'WebRTC',
        'Real-time communication tools',
        'REST APIs and request/response schemas',
        'Data modeling'
      ]
    },
    {
      slug: 'project-include',
      title: 'Project Include',
      date: '2020',
      website: 'https://www.facebook.com/hashtagprojectinclude/',
      logo: '/images/portfolio/project-include-logo.png',
      description:
        'An informational site volunteer nonprofit that empowers low socio-economic communities through free coding bootcamps and workshops.',
      role: 'Frontend developer',
      metric: 'Ran 50+ workshops 250+ students prior to ending',
      expertise: 'Web development, design, sales, marketing',
      image: {
        src: '/images/portfolio/project-include.png',
        width: 1842,
        height: 983,
        alt: 'Project Include'
      },
      disciplines: [
        'Frontend Web Development',
        'Software Migration',
        'Content Management System (CMS) Integration',
        'Marketing Automation',
        'Web Analytics'
      ],
      skills_and_technologies: ['React.JS', 'Next.JS', 'Contentful CMS', 'GA4']
    }
  ] as Project[]
};
