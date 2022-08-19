import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';

import { Box, Chip, Container, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import remarkPrism from 'remark-prism';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

import BlogAPI from '@/services/blog';
import { Post as PostType } from '@/services/blog/types';
import toKebabCase from '@/utils/strings/to-kebab-case';
import Link from '@/components/shared/Link';
import MainLayout from '@/layouts/MainLayout';
import MDXComponents from '@/components/pages/blog/MDXComponents';
import ReadingProgressBar from '@/components/pages/blog/ReadingProgressBar';
import SEO from '@/components/shared/SEO';

const ClampTypography = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  lineClamp: '2',
  WebkitBoxOrient: 'vertical'
};

type Props = {
  post: PostType;
  suggestedPosts: PostType[];
};

function MoreStories({ suggestedPosts }: { suggestedPosts: PostType[] }) {
  if (!suggestedPosts || suggestedPosts.length === 0) return <></>;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: 'text.primary',
          fontSize: '16px !important',
          letterSpacing: 0,
          fontWeight: '500',
          lineHeight: '20px'
        }}
      >
        More stories
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {suggestedPosts.map((post) => {
          if (!post) return;
          return (
            <Box
              key={post.slug}
              component={Link}
              href={post.slug}
              sx={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  fontWeight={700}
                  sx={{
                    ...ClampTypography,
                    color: 'text.primary',
                    lineHeight: '20px',
                    letterSpacing: '0',
                    transition: 'color 0.2s ease-in-out',
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                  gutterBottom
                >
                  {post.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {`${dayjs(post.publishedAt).format('MMM D, YYYY')} • ${post.readingTime}`}
                </Typography>
              </Box>

              <Image
                style={{ borderRadius: '8px' }}
                src={`/images/blog/${post.slug}/${post.heroImagePath}`}
                alt="Article image"
                layout="fixed"
                height={65} // Max height
                width={100}
                quality={100}
                objectFit="cover"
                loading="lazy"
                blurDataURL={`/images/blog/${post.slug}/${post.heroImagePath}`}
                placeholder="blur"
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

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
      title={''}
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
      <article itemScope itemType="http://schema.org/Article">
        <Container
          disableGutters
          sx={{
            maxWidth: { xs: '700px', md: '900px' },
            '@media (max-width: 600px)': {
              px: '1.5rem'
            }
          }}
        >
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
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
              }}
            >
              <Box py={4}>
                <Box mb={3}>
                  <Typography
                    variant="h1"
                    gutterBottom
                    sx={{
                      fontWeight: '900',
                      letterSpacing: '-0.016em',
                      lineHeight: '40px',
                      fontSize: '36px !important',
                      '@media (max-width: 900px)': {
                        lineHeight: '36px'
                      },
                      '@media (max-width: 600px)': {
                        fontSize: '32px !important'
                      }
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {dayjs(post.publishedAt).format('MMM D, YYYY')}
                    <Box
                      sx={{
                        display: 'inline',
                        '@media (max-width: 600px)': {
                          display: 'none'
                        }
                      }}
                    >
                      &nbsp;&bull;&nbsp;{post.readingTime}
                    </Box>
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
                    {post.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        clickable
                        component={Link}
                        href={`/tags/${toKebabCase(tag)}`}
                        sx={{ px: 0.5 }}
                      />
                    ))}
                  </Box>
                </Box>

                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{
                    fontSize: '22px !important',
                    letterSpacing: '0',
                    lineHeight: '28px',
                    fontWeight: '400',
                    color: 'text.disabled',
                    '@media (max-width: 600px)': {
                      fontSize: '22px !important'
                    }
                  }}
                >
                  {post.shortBody}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                maxHeight: '40rem',
                pb: '4rem',
                '& > div': { maxHeight: '40rem' }
              }}
            >
              <Image
                style={{ borderRadius: '6px' }}
                src={`/images/blog/${post.slug}/${post.heroImagePath}`}
                alt="Article image"
                layout="responsive"
                height={640} // Max height
                width={1440}
                quality={100}
                objectFit="cover"
                loading="lazy"
                blurDataURL={post.heroImagePath}
                placeholder="blur"
              />
            </Box>
          </header>
          <MDXRemote
            {...post.body}
            components={{
              ...MDXComponents,
              // Image component declared here separately so I can pass in the slug. This allows me in the MDX file to just specify the filename, and no path
              img: ({ src, height, width, ...rest }: any) => (
                <Image
                  layout="responsive"
                  src={src.startsWith('https') ? src : `/images/blog/${post.slug}/${src}`}
                  height={500}
                  width={900}
                  objectFit="contain"
                  loading="lazy"
                  style={{ borderRadius: '8px' }}
                  blurDataURL={src.startsWith('https') ? src : `/images/blog/${post.slug}/${src}`}
                  {...rest}
                />
              )
            }}
          />
        </Container>
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
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
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
