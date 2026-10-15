import dayjs from 'dayjs';
import { ArrowLeft } from 'lucide-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import BlogArticle from '@/components/blog/BlogArticle';
import { renderPostHtml } from '@/components/blog/RenderPostHTML';
import SEO from '@/components/SEO';
import { siteConfig } from '@/config/site';
import MainLayout from '@/layouts/MainLayout';
import { getAllPostSlugs, getPostBySlug, type Post } from '@/lib/blog';
import { blogPostStructuredData } from '@/lib/structured-data';
import { plainText } from '@/lib/utils';

const BlogPost = ({ post }: { post: Post }): JSX.Element => (
  <MainLayout narrow>
    <SEO
      title={siteConfig.seo.postTitle(post.title)}
      description={plainText(post.shortBody)}
      path={`/blog/posts/${post.slug}`}
      type="article"
      publishedAt={dayjs(post.publishedAt).format('YYYY-MM-DD')}
      jsonLd={blogPostStructuredData(post)}
    />
    <Link href="/">
      <a className="inline-flex h-10 items-center gap-1.5 rounded-pill border bg-elevated px-4 text-sm font-medium text-fg-muted no-underline transition-colors hover:text-fg">
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back
      </a>
    </Link>
    <BlogArticle post={post} />
  </MainLayout>
);

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPostSlugs().map((slug) => `/blog/posts/${slug}`),
  fallback: false
});

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string);
  return {
    props: { post: { ...post, body: '', html: await renderPostHtml(post.slug, post.body) } }
  };
};
