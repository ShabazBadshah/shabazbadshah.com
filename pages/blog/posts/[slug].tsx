import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Home } from 'lucide-react';

import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { ParsedUrlQuery } from 'querystring';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkPrism from 'remark-prism';

import MDXComponents from '@/components/pages/blog/MDXComponents';
import ReadingProgressBar from '@/components/pages/blog/ReadingProgressBar';
import Link from '@/components/shared/Link';
import MoreStories from '@/components/shared/MoreStories';
import PostTags from '@/components/shared/PostTags';
import SEO from '@/components/shared/SEO';
import MainLayout from '@/layouts/MainLayout';
import BlogAPI from '@/services/blog';
import { Post as PostType } from '@/services/blog/types';
import { Button } from '@/components/ui/button';

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
    <MainLayout
      pageHeader={''}
      extraDrawerContent={
        <>
          <MoreStories suggestedPosts={suggestedPosts} />
        </>
      }
    >
      <ReadingProgressBar text={post.title} percent={width} />

      <SEO pageTitle={`Blog - ${post.title} | shabazbadshah.com`} metaDescription={post.shortBody}>
        <meta property="og:title" content={`Blog - ${post.title} | shabazbadshah.com`} />
        <meta property="og:image" content={`/images/blog/${post.slug}/${post.heroImagePath}`} />
        <meta property="og:description" content={post.shortBody} />
        <meta property="og:url" content={`https://shabazbadshah.com/blog/posts/${post.slug}`} />
      </SEO>
      <article itemScope itemType="http://schema.org/article">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            className="w-fit -ml-2.5 rounded-md hover:bg-[#eaf1f7]"
            asChild
          >
            <Link href="/">
              <Home className="text-foreground" />
            </Link>
          </Button>
          <header>
            <div className="flex items-center gap-2 flex-wrap justify-between">
              <div className="py-4">
                <div className="mb-3">
                  <h1 className="text-[32px] sm:text-4xl font-black leading-9 md:leading-10 tracking-tight mb-4">
                    {post.title}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {dayjs(post.publishedAt).format('MMM D, YYYY')}
                    &nbsp;&bull;&nbsp;{post.readingTime}
                  </p>
                  <div className="flex flex-row items-start gap-1 mt-2 flex-wrap w-full">
                    <PostTags tags={post.tags} />
                  </div>
                </div>

                <h2 className="text-lg font-medium leading-7 text-muted-foreground mb-4">
                  {post.shortBody}
                </h2>
              </div>
            </div>
          </header>
          <MDXRemote
            {...post.body}
            components={{
              ...MDXComponents,
              // Image component declared here separately so I can pass in the slug. This allows me in the MDX file to just specify the filename, and no path
              img: ({ src, height, width, ...rest }: any) => (
                <div className="rounded-lg">
                  <Image
                    layout="responsive"
                    src={src.startsWith('https') ? src : `/images/blog/${post.slug}/${src}`}
                    height={120}
                    width={200}
                    objectFit="contain"
                    loading="eager"
                    style={{
                      width: '100%',
                      height: 'auto'
                    }}
                    blurDataURL={src.startsWith('https') ? src : `/images/blog/${post.slug}/${src}`}
                    {...rest}
                  />
                </div>
              )
            }}
          />
        </div>
      </article>
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
