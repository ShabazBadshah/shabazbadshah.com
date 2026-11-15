import { GetStaticPaths, GetStaticProps } from 'next';

import BlogArticle from '@/components/blog/BlogArticle';
import SEO from '@/components/SEO';
import { siteConfig } from '@/lib/site';
import MainLayout from '@/components/MainLayout';
import { getBlogPostPaths, getRenderedPostBySlug, type Post } from '@/lib/blog';
import { blogPostStructuredData } from '@/lib/structured-data';
import { plainText } from '@/lib/utils';

const BlogPost = ({ post }: { post: Post }): JSX.Element => (
  <MainLayout narrow>
    <SEO
      title={siteConfig.seo.postTitle(post.title)}
      description={plainText(post.shortBody)}
      path={`/blog/posts/${post.slug}`}
      type="article"
      publishedAt={post.publishedAt}
      jsonLd={blogPostStructuredData(post)}
    />
    <BlogArticle
      title={post.title}
      publishedAt={post.publishedAt}
      readingTime={post.readingTime}
      html={post.html}
    />
  </MainLayout>
);

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getBlogPostPaths(),
  fallback: false
});

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({ params }) => ({
  props: { post: await getRenderedPostBySlug(params?.slug as string) }
});
