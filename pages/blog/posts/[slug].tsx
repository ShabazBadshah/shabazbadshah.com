import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import { Box, Container, IconButton, Typography } from '@mui/material';

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
      <Box component="article" itemScope itemType="http://schema.org/article">
        <Container maxWidth="md">
          <IconButton
            component={Link}
            href="/"
            sx={{
              width: 'fit-content',
              ml: '-10px',
              borderRadius: '6px',
              '&:hover': {
                backgroundColor: '#eaf1f7'
              }
            }}
          >
            <HomeIcon sx={{ color: 'text.primary' }} />
          </IconButton>
          <header>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
                justifyContent: 'space-between'
              }}
            >
              <Box py={4}>
                <Box mb={3}>
                  <Typography
                    variant="h1"
                    gutterBottom
                    fontWeight={900}
                    letterSpacing={'-0.016em'}
                    sx={{
                      lineHeight: { xs: '36px', md: '40px' },
                      fontSize: { xs: '32px !important', sm: '36px !important' }
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {dayjs(post.publishedAt).format('MMM D, YYYY')}
                    &nbsp;&bull;&nbsp;{post.readingTime}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      gap: 1,
                      mt: 2,
                      flexWrap: 'wrap',
                      width: '100%'
                    }}
                  >
                    <PostTags tags={post.tags} />
                  </Box>
                </Box>

                <Typography
                  variant="h2"
                  gutterBottom
                  letterSpacing={0}
                  lineHeight={'29px'}
                  fontWeight={400}
                  sx={{
                    fontSize: '18px !important',
                    fontWeight: 500,
                    color: 'text.disabled'
                  }}
                >
                  {post.shortBody}
                </Typography>
              </Box>
            </Box>
          </header>
          <MDXRemote
            {...post.body}
            components={{
              ...MDXComponents,
              // Image component declared here separately so I can pass in the slug. This allows me in the MDX file to just specify the filename, and no path
              img: ({ src, height, width, ...rest }: any) => (
                <Box sx={{ borderRadius: '8px' }}>
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
                </Box>
              )
            }}
          />
        </Container>
      </Box>
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
