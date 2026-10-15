import dayjs from 'dayjs';

import { siteConfig } from '@/config/site';
import type { Post } from '@/lib/blog';
import { plainText } from '@/lib/utils';

const { url, locale, person: me, assets } = siteConfig;
const PERSON_ID = `${url}/#person`;
const ORG_ID = `${url}/#organization`;
const WEBSITE_ID = `${url}/#website`;
const CONTEXT = 'https://schema.org';

const sameAs = siteConfig.socials
  .filter(({ provider }) => provider === 'linkedin' || provider === 'github')
  .map((social) => social.url);

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: me.name,
  jobTitle: me.jobTitle,
  description: siteConfig.description,
  url,
  image: `${url}${me.image}`,
  email: `mailto:${me.email}`,
  sameAs,
  knowsAbout: me.knowsAbout,
  worksFor: { '@id': ORG_ID },
  address: { '@type': 'PostalAddress', addressRegion: me.region, addressCountry: me.country }
};

const organization = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: siteConfig.name,
  url,
  logo: `${url}${assets.logo}`,
  image: `${url}${me.image}`,
  description: siteConfig.description,
  founder: { '@id': PERSON_ID },
  email: me.email,
  areaServed: { '@type': 'Country', name: 'Canada' },
  sameAs
};

export const homeStructuredData = (): Record<string, unknown> => ({
  '@context': CONTEXT,
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: locale,
      publisher: { '@id': ORG_ID },
      author: { '@id': PERSON_ID }
    },
    person,
    organization,
    {
      '@type': 'ProfilePage',
      '@id': `${url}/#webpage`,
      url,
      name: siteConfig.seo.title,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      mainEntity: { '@id': PERSON_ID },
      inLanguage: locale
    }
  ]
});

export const blogPostStructuredData = (post: Post): Record<string, unknown> => {
  const postUrl = `${url}/blog/posts/${post.slug}`;
  const published = dayjs(post.publishedAt).format('YYYY-MM-DD');
  return {
    '@context': CONTEXT,
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${postUrl}#article`,
        headline: post.title,
        description: plainText(post.shortBody),
        datePublished: published,
        dateModified: published,
        inLanguage: locale,
        keywords: post.tags,
        image: `${url}${siteConfig.seo.ogImage}`,
        mainEntityOfPage: postUrl,
        isPartOf: { '@id': WEBSITE_ID },
        author: { '@id': PERSON_ID },
        publisher: { '@id': ORG_ID }
      },
      person,
      organization,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { name: 'Home', item: `${url}/` },
          { name: 'Blog', item: `${url}/#blog` },
          { name: post.title, item: postUrl }
        ].map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb }))
      }
    ]
  };
};
