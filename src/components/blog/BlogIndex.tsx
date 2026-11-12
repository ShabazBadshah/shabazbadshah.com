import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import PostGrid from '@/components/blog/PostGrid';
import SEO from '@/components/SEO';
import { siteConfig } from '@/config/site';
import { content } from '@/content/content';
import MainLayout from '@/layouts/MainLayout';
import type { Post } from '@/lib/blog';

const { blog } = content;
const { pagination } = blog;

export const POSTS_PER_PAGE = siteConfig.postsPerPage;

export const pageCount = (total: number): number => Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

/** /blog is page 1; later pages live at /blog/page/<n> */
export const pageHref = (page: number): string => (page === 1 ? '/blog' : `/blog/page/${page}`);

export type BlogIndexProps = { posts: Post[]; page: number; pages: number };

const PILL = 'pill bg-surface';

export default function BlogIndex({ posts, page, pages }: BlogIndexProps): JSX.Element {
  const first = page === 1;
  return (
    <MainLayout>
      <SEO
        title={first ? siteConfig.seo.blog.title : siteConfig.seo.blogPageTitle(page)}
        description={siteConfig.seo.blog.description}
        path={pageHref(page)}
      />
      <section id="hero" aria-labelledby="blog-title">
        <h1 id="blog-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {blog.title}
        </h1>
        <p className="mt-2 text-lg font-medium text-fg-muted">{blog.subtitle}</p>
      </section>

      {/* Page 1 leads with the featured post and the two most recent, as on the home page */}
      <PostGrid posts={posts} listFrom={first ? 3 : 0} className="mt-8" />

      {pages > 1 && (
        <nav aria-label={pagination.label} className="mt-10 flex flex-wrap items-center gap-2">
          {page > 1 && (
            <Link href={pageHref(page - 1)}>
              <a className={PILL}>
                <ArrowLeft aria-hidden="true" className="size-4" />
                {pagination.previous}
              </a>
            </Link>
          )}
          <ul className="flex flex-wrap gap-2">
            {Array.from({ length: pages }, (_, index) => index + 1).map((n) => (
              <li key={n}>
                <Link href={pageHref(n)}>
                  <a
                    aria-label={pagination.page(n)}
                    aria-current={n === page ? 'page' : undefined}
                    className={`pill min-w-11 ${
                      n === page
                        ? 'border-transparent bg-fg text-bg hover:border-transparent'
                        : 'bg-surface'
                    }`}
                  >
                    {n}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          {page < pages && (
            <Link href={pageHref(page + 1)}>
              <a className={PILL}>
                {pagination.next}
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </Link>
          )}
        </nav>
      )}
    </MainLayout>
  );
}
