/**
 * Single source of truth for site-wide metadata. Everything that describes the site (SEO tags,
 * structured data, manifest, robots.txt, sitemap.xml, llms.txt, security.txt, nav, socials) is
 * read from here. The public/ files are generated from it by `pnpm generate` (bin/generate.ts).
 * Text lives in src/content/content.ts; this file holds URLs, assets and other non-copy settings.
 */

import { content } from '../content/content';

const BOOKING_URL = 'https://calendly.com/badshah-shabaz/30min';
const HOST = 'shabazbadshah.com';

export type SocialProvider = 'linkedin' | 'email' | 'video' | 'github';

const SOCIAL_LINKS: { provider: SocialProvider; url: string; logo: string }[] = [
  {
    provider: 'linkedin',
    url: 'https://www.linkedin.com/in/shabaz-badshah/',
    logo: '/images/logos/linkedin.svg'
  },
  { provider: 'github', url: 'https://github.com/ShabazBadshah', logo: '/images/logos/github.svg' },
  {
    provider: 'email',
    url: 'mailto:badshah.shabaz@gmail.com?subject=Hey%20Shabaz%20%F0%9F%91%8B',
    logo: '/images/logos/gmail.svg'
  },
  { provider: 'video', url: BOOKING_URL, logo: '/images/logos/google-meet.svg' }
];

const NAV_LINKS: { href: string; section: 'home' | 'work' | 'blog' }[] = [
  { href: '/', section: 'home' },
  { href: '/#work', section: 'work' },
  { href: '/#blog', section: 'blog' }
];

export const siteConfig = {
  name: content.site.name,
  host: HOST,
  url: `https://${HOST}`,
  locale: 'en-CA',
  ogLocale: 'en_CA',
  /** One-liner used by structured data, the manifest and llms.txt */
  description: content.site.description,

  seo: {
    title: content.seo.title,
    /** Home page meta description */
    description: content.seo.description,
    keywords: content.seo.keywords,
    ogImage: '/images/og-image.png',
    postTitle: (title: string) => `${content.seo.postTitlePrefix} - ${title} | ${HOST}`,
    notFound: {
      title: `${content.seo.notFound.title} | ${HOST}`,
      description: content.seo.notFound.description
    }
  },

  person: {
    ...content.person,
    email: 'badshah.shabaz@gmail.com',
    image: '/images/profile.webp',
    region: 'ON',
    country: 'CA'
  },

  hero: {
    syftable: { url: 'https://syftable.com', logo: '/images/logos/syftable.svg' }
  },

  booking: BOOKING_URL,

  socials: SOCIAL_LINKS.map((link) => ({ ...link, ...content.socials[link.provider] })),

  nav: NAV_LINKS.map((link) => ({ ...link, label: content.nav.items[link.section] })),

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

  llms: content.llms
};
