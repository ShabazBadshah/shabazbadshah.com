import Link from 'next/link';

import SEO from '@/components/SEO';
import { siteConfig } from '@/config/site';
import { content } from '@/content/content';
import MainLayout from '@/layouts/MainLayout';

export default function PageNotFound(): JSX.Element {
  return (
    <MainLayout>
      <SEO {...siteConfig.seo.notFound} path="/404" noindex />

      <div className="card mx-auto max-w-xl items-center px-6 py-16 text-center">
        <h1 className="mb-6 text-7xl font-semibold">{content.notFound.code}</h1>
        <h2 className="mb-1.5 text-3xl font-semibold">{content.notFound.title}</h2>
        <p className="mb-8 text-fg-muted">{content.notFound.body}</p>
        <Link href="/">
          <a className="pill pill-accent">{content.notFound.cta}</a>
        </Link>
      </div>
    </MainLayout>
  );
}
