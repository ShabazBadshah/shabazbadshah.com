import React from 'react';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Box, Container, Divider, Grid, IconButton, Typography } from '@mui/material/';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import Link from '@/components/shared/Link';
import Post from '@/components/shared/Post';
import MainLayout from '@/layouts/MainLayout';
import { Post as PostType } from '@/services/blog/types';
import BlogAPI from '@/services/blog/';
import toKebabCase from '@/utils/strings/to-kebab-case';
import SEO from '@/components/shared/SEO';

type Props = {
  posts: PostType[];
  tag: string;
  totalCount: number;
};

const Tags = ({ posts, tag, totalCount }: Props) => {
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`;

  return (
    <MainLayout
      title={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="small"
            sx={{
              mr: 1,
              backgroundColor: 'action.selected',
              color: 'text.primary'
            }}
          >
            <LocalOfferIcon fontSize="small" />
          </IconButton>
          <Typography variant="h5" fontWeight={600} pb={0.5}>
            {tag}
          </Typography>
        </Box>
      }
    >
      <SEO
        pageTitle={`${tag} (${totalCount}) | shabazbadshah.com`}
        metaDescription="All blogs posts that are tagged with the tag you've selected"
      />
      <Container
        disableGutters
        sx={{
          maxWidth: { xs: '700px', md: '900px' },
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          '@media (max-width: 600px)': {
            gap: '1.5rem',
            px: '1.5rem'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            '@media (max-width: 600px)': { gap: '1.5rem' }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              py: '12px',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography variant="body1">{tagHeader}</Typography>
            <Box
              href="/tags"
              color="inherit"
              component={Link}
              sx={{ borderBottom: '2px dotted black', color: 'text.primary' }}
            >
              All Tags
            </Box>
          </Box>

          {posts.map((post: PostType) => {
            return (
              <Grid
                item
                xs={12}
                key={post.title}
                sx={{
                  '&:last-child': { '& > hr': { display: 'none' } }
                }}
              >
                <Post post={post} />
                <Divider
                  sx={{
                    my: 4,
                    '@media (max-width: 600px)': { my: '1.5rem' }
                  }}
                />
              </Grid>
            );
          })}
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Tags;

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const apiRef = new BlogAPI();
  const tags = apiRef.getAllTags();

  return {
    paths: tags.map((tag) => `/tags/${toKebabCase(tag.tag)}`),
    fallback: false
  };
};

export const getStaticProps = async ({
  params
}: {
  params: ParsedUrlQuery;
}): Promise<GetStaticPropsResult<any>> => {
  const apiRef = new BlogAPI();
  const tag = params.tag as string;
  const postsByTag = apiRef.getPostsByTag(toKebabCase(tag));

  // console.log(suggestedPosts);

  return {
    props: {
      posts: postsByTag,
      tag,
      totalCount: postsByTag.length
    }
  };
};
