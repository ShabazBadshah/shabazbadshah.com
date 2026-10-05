import dayjs from 'dayjs';

import { siteConfig } from '@/config/site';
import type { Post } from '@/services/blog/types';

const URL = siteConfig.url;
const iso = (date: string): string => dayjs(date).format('YYYY-MM-DD');
export const PERSON_ID = `${URL}/#person`;
export const ORG_ID = `${URL}/#organization`;
export const WEBSITE_ID = `${URL}/#website`;

const sameAs = siteConfig.socials
  .filter((social) => social.provider === 'linkedin' || social.provider === 'github')
  .map((social) => social.url);

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: siteConfig.person.name,
  jobTitle: siteConfig.person.jobTitle,
  description: siteConfig.description,
  url: URL,
  image: `${URL}${siteConfig.person.image}`,
  email: `mailto:${siteConfig.person.email}`,
  sameAs,
  knowsAbout: siteConfig.person.knowsAbout,
  worksFor: { '@id': ORG_ID },
  address: { '@type': 'PostalAddress', addressRegion: 'ON', addressCountry: 'CA' }
};

const organization = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: siteConfig.name,
  url: URL,
  logo: `${URL}${siteConfig.nav.logo.src}`,
  image: `${URL}${siteConfig.person.image}`,
  description: siteConfig.description,
  founder: { '@id': PERSON_ID },
  email: siteConfig.person.email,
  areaServed: { '@type': 'Country', name: 'Canada' },
  sameAs
};

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: URL,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: 'en-CA',
  publisher: { '@id': ORG_ID },
  author: { '@id': PERSON_ID }
};

export const homeStructuredData = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@graph': [
    website,
    person,
    organization,
    {
      '@type': 'ProfilePage',
      '@id': `${URL}/#webpage`,
      url: URL,
      name: siteConfig.seo.title,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      mainEntity: { '@id': PERSON_ID },
      inLanguage: 'en-CA'
    }
  ]
});

const breadcrumbs = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${URL}${item.path}`
  }))
});

export const blogPostStructuredData = (post: Post): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      '@id': `${URL}/blog/posts/${post.slug}#article`,
      headline: post.title,
      description: post.shortBody.replace(/\*\*/g, ''),
      datePublished: iso(post.publishedAt),
      dateModified: iso(post.publishedAt),
      inLanguage: 'en-CA',
      keywords: post.tags,
      image: `${URL}${siteConfig.seo.ogImage}`,
      mainEntityOfPage: `${URL}/blog/posts/${post.slug}`,
      isPartOf: { '@id': WEBSITE_ID },
      author: { '@id': PERSON_ID },
      publisher: { '@id': ORG_ID }
    },
    person,
    organization,
    breadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/#blog' },
      { name: post.title, path: `/blog/posts/${post.slug}` }
    ])
  ]
});
