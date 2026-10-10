import dayjs from 'dayjs';
import { ArrowLeft } from 'lucide-react';

import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

import BlogArticle from '@/components/pages/blog/BlogArticle';
import { renderPostHtml } from '@/components/pages/blog/RenderPostHTML';
import JsonLd from '@/components/shared/JsonLd';
import SEO from '@/components/shared/SEO';
import MainLayout from '@/layouts/MainLayout';
import { plainText } from '@/lib/hooks';
import { blogPostStructuredData } from '@/lib/structured-data';
import BlogAPI from '@/services/blog';
import { Post as PostType } from '@/services/blog/types';

type Props = {
  post: PostType;
  suggestedPosts: PostType[];
};

const BlogPost = ({ post }: Props) => {
  const title = `Thoughts - ${post.title} | shabazbadshah.com`;
  const description = plainText(post.shortBody);

  return (
    <MainLayout sheet>
      <SEO
        pageTitle={title}
        metaDescription={description}
        path={`/blog/posts/${post.slug}`}
        type="article"
        publishedAt={dayjs(post.publishedAt).format('YYYY-MM-DD')}
      />
      <JsonLd id="post-jsonld" data={blogPostStructuredData(post)} />
      <Link className="cursor-pointer" href="/">
        <a className="inline-flex h-10 items-center gap-1.5 rounded-pill border border-line bg-elevated px-4 text-sm font-medium text-fg-muted no-underline transition-colors hover:text-fg">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back
        </a>
      </Link>
      <BlogArticle post={post} />
    </MainLayout>
  );
};

export default BlogPost;

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const apiRef = new BlogAPI();
  const slugs = apiRef.getAllPostSlugs();

  return {
    paths: slugs.map((slug: string) => `/blog/posts/${slug}`),
    fallback: false
  };
};

export const getStaticProps = async ({
  params
}: {
  params: ParsedUrlQuery;
}): Promise<GetStaticPropsResult<Props>> => {
  const apiRef = new BlogAPI();
  const slug = params.slug as string;
  const post = apiRef.getPostBySlug(slug);

  const html = await renderPostHtml(post.slug, post.body || '');

  return {
    props: {
      post: { ...post, body: '', html },
      suggestedPosts: apiRef
        .getSuggestedBlogPosts(2, post.tags)
        .map((suggested) => ({ ...suggested, body: '' }))
    }
  };
};
