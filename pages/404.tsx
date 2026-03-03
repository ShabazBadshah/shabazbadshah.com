import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import SEO from '@/components/shared/SEO';
import { Button } from '../src/components/ui/ui/button';

export default function PageNotFound() {
  return (
    <MainLayout>
      <SEO
        pageTitle="Not Found | Badshah Consulting"
        metaDescription="Whoops, couldn't find what you were looking for. Sorry about that"
      />

      <div className="text-center py-16 flex flex-col justify-center items-center h-[calc(100vh-96px)]">
        <h1 className="mb-12 text-7xl font-semibold">404!</h1>
        <h4 className="mb-1.5 text-3xl font-semibold">Something went wrong</h4>
        <p className="mb-6">The page you're looking for doesn't exist, let's go back home.</p>
        <Button
          variant="outline"
          size="sm"
          className="text-gray-700 text-sm py-4 mt-8 border-gray-400/80 font-normal w-full rounded-full text-center hover:text-primary hover:border-sky-700 hover:bg-sky-100"
          asChild
        >
          <a href="/" data-slot="button">
            Back to homepage
          </a>
        </Button>
      </div>
    </MainLayout>
  );
}
