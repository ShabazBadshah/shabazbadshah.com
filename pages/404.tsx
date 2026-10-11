import React from 'react';
import Link from 'next/link';

import MainLayout from '@/layouts/MainLayout';
import SEO from '@/components/shared/SEO';

export default function PageNotFound(): JSX.Element {
  return (
    <MainLayout>
      <SEO
        pageTitle="Not Found | Badshah Consulting"
        metaDescription="Whoops, couldn't find what you were looking for. Sorry about that"
        path="/404"
        noindex
      />

      <div className="card mx-auto flex max-w-xl flex-col items-center px-6 py-16 text-center">
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
