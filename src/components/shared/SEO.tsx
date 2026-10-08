import React, { ReactElement } from 'react';
import Head from 'next/head';

import { siteConfig } from '@/config/site';

type SeoProps = {
  pageTitle: string;
  metaDescription: string;
  /** Canonical path, e.g. `/work/mednow`. Defaults to the home page. */
  path?: string;
  /** Absolute or site-relative image used for social cards */
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  noindex?: boolean;
  children?: React.ReactNode;
};

const absolute = (value: string): string =>
  value.startsWith('http') ? value : `${siteConfig.url}${value}`;

const SEO = ({
  pageTitle,
  metaDescription,
  path = '/',
  image = siteConfig.seo.ogImage,
  type = 'website',
  publishedAt,
  noindex = false,
  children
}: SeoProps): ReactElement => {
  const url = absolute(path);
  const imageUrl = absolute(image);
  const robots = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta key="description" name="description" content={metaDescription} />
      <meta key="robots" name="robots" content={robots} />
      <meta key="author" name="author" content={siteConfig.seo.author} />
      <meta key="keywords" name="keywords" content={siteConfig.seo.keywords.join(', ')} />
      <link key="canonical" rel="canonical" href={url} />

      <meta key="og:site_name" property="og:site_name" content={siteConfig.name} />
      <meta key="og:locale" property="og:locale" content="en_CA" />
      <meta key="og:type" property="og:type" content={type} />
      <meta key="og:title" property="og:title" content={pageTitle} />
      <meta key="og:description" property="og:description" content={metaDescription} />
      <meta key="og:url" property="og:url" content={url} />
      <meta key="og:image" property="og:image" content={imageUrl} />
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
        <meta key="article:author" property="article:author" content={siteConfig.seo.author} />
      )}

      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={pageTitle} />
      <meta key="twitter:description" name="twitter:description" content={metaDescription} />
      <meta key="twitter:image" name="twitter:image" content={imageUrl} />
      {children}
    </Head>
  );
};

export default SEO;
