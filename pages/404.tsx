import Link from 'next/link';

import SEO from '@/components/SEO';
import { siteConfig } from '@/config/site';
import MainLayout from '@/layouts/MainLayout';

export default function PageNotFound(): JSX.Element {
  return (
    <MainLayout>
      <SEO {...siteConfig.seo.notFound} path="/404" noindex />

      <div className="card mx-auto max-w-xl items-center px-6 py-16 text-center">
        <h1 className="mb-6 text-7xl font-semibold">404!</h1>
        <h2 className="mb-1.5 text-3xl font-semibold">Something went wrong</h2>
        <p className="mb-8 text-fg-muted">
          The page you're looking for doesn't exist, let's go back home.
        </p>
        <Link href="/">
          <a className="pill pill-accent">Back to homepage</a>
        </Link>
      </div>
    </MainLayout>
  );
}
