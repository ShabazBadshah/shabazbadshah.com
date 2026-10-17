import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps } from 'next';

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
