import Head from 'next/head';

import { siteConfig } from '@/config/site';

const { seo, person } = siteConfig;

type Props = {
  title: string;
  description: string;
  /** Canonical path, e.g. `/blog/posts/my-post`. Defaults to the home page. */
  path?: string;
  type?: 'website' | 'article';
  /** ISO date, articles only */
  publishedAt?: string;
  noindex?: boolean;
  /** Schema.org graph rendered as JSON-LD */
  jsonLd?: Record<string, unknown>;
};

const SEO = ({
  title,
  description,
  path = '/',
  type = 'website',
  publishedAt,
  noindex = false,
  jsonLd
}: Props): JSX.Element => {
  const url = `${siteConfig.url}${path}`;
  const image = `${siteConfig.url}${seo.ogImage}`;
  const robots = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return (
    <Head>
      <title>{title}</title>
      <meta key="description" name="description" content={description} />
      <meta key="robots" name="robots" content={robots} />
      <meta key="author" name="author" content={person.name} />
      <meta key="keywords" name="keywords" content={seo.keywords.join(', ')} />
      <link key="canonical" rel="canonical" href={url} />

      <meta key="og:site_name" property="og:site_name" content={siteConfig.name} />
      <meta key="og:locale" property="og:locale" content={siteConfig.ogLocale} />
      <meta key="og:type" property="og:type" content={type} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:url" property="og:url" content={url} />
      <meta key="og:image" property="og:image" content={image} />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:image:height" property="og:image:height" content="630" />
      <meta key="og:image:alt" property="og:image:alt" content={siteConfig.name} />
      {publishedAt && (
        <meta
          key="article:published_time"
          property="article:published_time"
          content={publishedAt}
        />
      )}
      {type === 'article' && (
        <meta key="article:author" property="article:author" content={person.name} />
      )}

      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      <meta key="twitter:image" name="twitter:image" content={image} />

      {jsonLd && (
        // `<` is escaped so content can't close the script tag
        <script
          key="jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
    </Head>
  );
};

export default SEO;
