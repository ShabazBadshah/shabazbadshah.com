import React from 'react';
import { Box, Container, Divider, Grid, IconButton, Typography } from '@mui/material/';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';

import BlogAPI from '@/services/blog';
import { Post as PostType } from '@/services/blog/types';

import MainLayout from '@/layouts/MainLayout';
import Link from '@/components/shared/Link';
import SEO from '@/components/shared/SEO';
import Post from '@/components/shared/Post';

type Props = {
  suggestedPosts: PostType[];
};

export default function PageNotFound({ suggestedPosts }: Props): React.ReactNode {
  return (
    <MainLayout>
      <SEO
        pageTitle="Not Found | shabazbadshah.com"
        metaDescription="Whoops, couldn't find what you were looking for. Sorry about that"
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
        <Grid container flexDirection="row">
          <Box>
            <Typography variant="h3" fontWeight={700}>
              Page Not Found 🤡
            </Typography>
            <Typography variant="h5" fontWeight={500} sx={{ mt: 2, mb: 5 }}>
              In the meanwhile, you can check out...
            </Typography>
          </Box>
          <Box my={6}>
            {suggestedPosts.map((post: PostType) => {
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
        </Grid>
      </Container>
    </MainLayout>
  );
}

export const getStaticProps = async ({
  params
}: {
  params: ParsedUrlQuery;
}): Promise<GetStaticPropsResult<any>> => {
  const apiRef = new BlogAPI();
  const suggestedPosts = apiRef.getSuggestedBlogPosts(3);

  return {
    props: {
      suggestedPosts
    }
  };
};
