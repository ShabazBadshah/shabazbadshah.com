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

export const PROJECTS: Project[] = [
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
];
