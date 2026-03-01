import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { ParsedUrlQuery } from 'querystring';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkPrism from 'remark-prism';

import MDXComponents from '@/components/pages/blog/MDXComponents';
import { BlogImage } from '@/components/pages/blog/BlogImage';
import { LightboxProvider } from '@/components/pages/blog/LightboxContext';
import ReadingProgressBar from '@/components/pages/blog/ReadingProgressBar';
import Link from '@/components/shared/Link';
import PostTags from '@/components/shared/PostTags';
import SEO from '@/components/shared/SEO';
import MainLayout from '@/layouts/MainLayout';
import BlogAPI from '@/services/blog';
import { Post as PostType } from '@/services/blog/types';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { FaCanadianMapleLeaf } from 'react-icons/fa';
import { ArticleCTA } from '../../../src/components/pages/blog/ArticleCTA';

type Props = {
  post: PostType;
  suggestedPosts: PostType[];
};

const BlogPost = ({ post, suggestedPosts }: Props) => {
  const [width, setWidth] = useState(0);
  const scrollHeight = () => {
    const el = document.documentElement,
      ScrollTop = el.scrollTop || document.body.scrollTop,
      ScrollHeight = el.scrollHeight || document.body.scrollHeight;
    const percent = (ScrollTop / (ScrollHeight - el.clientHeight)) * 100;
    setWidth(percent);
  };

  //useEffect to control the component lifecycle
  useEffect(() => {
    window.addEventListener('scroll', scrollHeight);
    return () => window.removeEventListener('scroll', scrollHeight);
  });

  return (
    <MainLayout pageHeader={''}>
      <ReadingProgressBar text={post.title} percent={width} />

      <SEO pageTitle={`Blog - ${post.title} | shabazbadshah.com`} metaDescription={post.shortBody}>
        <meta property="og:title" content={`Blog - ${post.title} | shabazbadshah.com`} />
        <meta property="og:image" content={`/images/blog/${post.slug}/${post.heroImagePath}`} />
        <meta property="og:description" content={post.shortBody} />
        <meta property="og:url" content={`https://shabazbadshah.com/blog/posts/${post.slug}`} />
      </SEO>
      <article itemScope itemType="http://schema.org/article">
        <LightboxProvider>
          <div className="max-w-6xl my-8 mx-auto">
            <header>
              <div className="flex items-center gap-2 flex-wrap justify-between">
                <div className="inline-flex gap-2 justify-center items-center border border-border rounded-full px-4 py-1.5">
                  <span className="text-sm text-muted-foreground">Blog</span>
                </div>
                <div className="py-4">
                  <div className="mb-3">
                    <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                    <p className="text-muted-foreground mb-4">
                      {dayjs(post.publishedAt).format('MMM D, YYYY')}
                      &nbsp;&bull;&nbsp;{post.readingTime}
                    </p>
                    {/* <div className="flex flex-row items-start gap-1 mt-2 flex-wrap w-full">
                      <PostTags tags={post.tags} />
                    </div> */}
                  </div>

                  <span className="mb-6 border border-gray-300 bg-sky-100/30 px-4 py-2 rounded-lg flex flex-row justify-center gap-2">
                    <Sparkles className="shrink-0 w-6 h-6 mt-2 text-sky-800" />
                    <h2 className="italic text-muted-foreground">{post.shortBody}</h2>
                  </span>
                </div>
              </div>
            </header>
            <MDXRemote
              {...post.body}
              components={{
                ...MDXComponents,
                // Image component with lightbox functionality
                img: (props: any) => <BlogImage {...props} slug={post.slug} />
              }}
            />
          </div>
        </LightboxProvider>
      </article>
      <ArticleCTA />
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
}): Promise<GetStaticPropsResult<any>> => {
  const apiRef = new BlogAPI();
  const slug = params.slug as string;
  const post = apiRef.getPostBySlug(slug);

  post.body = await serialize(post.body || '', {
    mdxOptions: {
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, remarkGfm],
      remarkPlugins: [remarkPrism]
    }
  });

  return {
    props: {
      post,
      suggestedPosts: apiRef.getSuggestedBlogPosts(2, post.tags)
    }
  };
};
