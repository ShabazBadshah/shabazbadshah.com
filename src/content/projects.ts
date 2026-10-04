export type ProjectFeature = {
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  website: string;
  logo: string;
  description: string;
  role: string;
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
    ]
  },
  {
    slug: 'planned',
    title: 'Planned',
    website: 'https://planned.com/',
    logo: '/images/portfolio/planned-logo.png',
    description:
      'REST API for consolidating disparate vendor data (Google Maps, PDFs, Yelp, etc.) using LLM technology to scale curated marketplace.',
    role: 'Product manager',
    metric: 'Reduced vendor onboarding time from 48h to 6h',
    expertise: 'Technical architecture, REST APIs, ETL, AI, LLMs',
    image: { src: '/images/portfolio/planned.png', width: 1866, height: 1007, alt: 'Planned' }
  },
  {
    slug: 'soti',
    title: 'SOTI',
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
    }
  },
  {
    slug: 'project-include',
    title: 'Project Include',
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
    }
  }
];
