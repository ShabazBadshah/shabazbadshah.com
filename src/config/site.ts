/**
 * Single source of truth for site-wide metadata. Everything that describes the site (SEO tags,
 * structured data, manifest, robots.txt, sitemap.xml, llms.txt, security.txt, nav, socials) is
 * read from here. The public/ files are generated from it by `pnpm generate` (bin/generate.ts).
 */

const BOOKING_URL = 'https://calendly.com/badshah-shabaz/30min';
const HOST = 'shabazbadshah.com';

export type SocialProvider = 'linkedin' | 'email' | 'video' | 'github';

export const siteConfig = {
  name: 'Shabaz Badshah',
  host: HOST,
  url: `https://${HOST}`,
  locale: 'en-CA',
  ogLocale: 'en_CA',
  /** One-liner used by structured data, the manifest and llms.txt */
  description:
    'I integrate product strategy with technical execution to solve impactful business problems.',

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
    ogImage: '/images/og-image.png',
    postTitle: (title: string) => `Thoughts - ${title} | ${HOST}`,
    notFound: {
      title: 'Not Found | shabazbadshah.com',
      description: "Whoops, couldn't find what you were looking for. Sorry about that"
    }
  },

  person: {
    name: 'Shabaz Badshah',
    jobTitle: 'Product Engineer & Technical Product Consultant',
    email: 'badshah.shabaz@gmail.com',
    image: '/images/profile.webp',
    location: 'Ontario, Canada',
    region: 'ON',
    country: 'CA',
    knowsAbout: [
      'Product management',
      'Healthcare digitization',
      'Software architecture',
      'REST APIs',
      'Large language models',
      'PIPEDA and PHIPA compliance'
    ]
  },

  hero: {
    title: `Hey 👋, I'm Shabaz Badshah`,
    intro:
      "I’m a product engineer with 5+ years in technical product management and software development roles, I build things end-to-end. I figure out what’s worth making, why it's useful, write the code, and make sure it's supported after launch.",
    syftable: { name: 'Syftable', url: 'https://syftable.com', logo: '/images/logos/syftable.svg' }
  },

  booking: BOOKING_URL,

  socials: [
    {
      provider: 'linkedin',
      name: '/in/shabaz-badshah',
      label: 'LinkedIn',
      cta: 'Connect',
      url: 'https://www.linkedin.com/in/shabaz-badshah/',
      logo: '/images/logos/linkedin.svg'
    },
    {
      provider: 'github',
      name: '@ShabazBadshah',
      label: 'GitHub',
      cta: 'Follow',
      url: 'https://github.com/ShabazBadshah',
      logo: '/images/logos/github.svg'
    },
    {
      provider: 'email',
      name: 'badshah.shabaz@gmail.com',
      label: 'Send an email',
      cta: 'Email',
      url: 'mailto:badshah.shabaz@gmail.com?subject=Hey%20Shabaz%20%F0%9F%91%8B',
      logo: '/images/logos/gmail.svg'
    },
    {
      provider: 'video',
      name: 'Video call',
      label: "Let's meet virtually",
      cta: 'Video call',
      url: BOOKING_URL,
      logo: '/images/logos/google-meet.svg'
    }
  ] as {
    provider: SocialProvider;
    name: string;
    label: string;
    cta: string;
    url: string;
    logo: string;
  }[],

  nav: [
    { label: 'About', href: '/', section: 'home' },
    { label: 'Work', href: '/#work', section: 'work' },
    { label: 'Blog', href: '/#blog', section: 'blog' }
  ] as { label: string; href: string; section: 'home' | 'work' | 'blog' }[],

  /** Brand assets referenced by <head>, the manifest and structured data */
  assets: {
    logo: '/images/logo.png',
    favicon: '/favicon.svg',
    touchIcon: '/images/favicon.png'
  },

  themeColor: { light: '#f5f5f7', dark: '#000000' },

  /** Crawlers explicitly welcomed in robots.txt */
  crawlers: [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'Claude-User',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot-Extended'
  ],

  /** How far ahead /.well-known/security.txt expires (it is regenerated on every build) */
  securityTxtMonths: 12,

  llms: {
    /** Follows "<name> is a <jobTitle> based in <location>." in the llms.txt summary */
    focus:
      'He is a hybrid product manager and full-stack engineer building zero-to-one applications. He offers end-to-end software development skillsets, from system architecture to final market launch, implementing features end-to-end, from problem definition to design, development, testing, deployment, and post-launch support.',
    usage:
      'Content below is free to summarize and cite with attribution and a link to the source page.'
  }
};
