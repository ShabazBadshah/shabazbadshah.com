import { Box, Grid } from '@mui/material';
import { GetStaticPropsResult } from 'next';
import React from 'react';

import PinnedPosts from '@/components/pages/homepage/PinnedPosts';
import BlogPostsList from '@/components/shared/BlogPostsList';
import SEO from '@/components/shared/SEO';
import MainLayout from '@/layouts/MainLayout';
import BlogAPI from '@/services/blog';
import { Post as PostType } from '@services/blog/types';

type Props = {
  posts: PostType[];
  pinnedPosts: PostType[];
};

const Index = ({ posts, pinnedPosts }: Props): JSX.Element => {
  return (
    <MainLayout>
      <SEO
        pageTitle="Home | shabazbadshah.com"
        metaDescription="I'm a Product Manager who develops Fullstack web experiences during his downtime. This site catalogs things I learn, want to share, or anything cool I'm creating"
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 3, sm: 4 }
        }}
      >
        {/* <Grid my={2}>
          <WeeklySyftableUpdate />
        </Grid> */}

        <Grid my={2}>
          <PinnedPosts posts={pinnedPosts} />
        </Grid>

        <Grid my={5}>
          <BlogPostsList posts={posts} />
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default Index;

export const getStaticProps = async (): Promise<GetStaticPropsResult<any>> => {
  const posts = new BlogAPI().getAllPosts();
  return {
    props: {
      posts,
      pinnedPosts: posts.filter((post) => post.pinned)
    }
  };
};
