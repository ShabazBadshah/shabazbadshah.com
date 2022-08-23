import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';

import Link from '@/components/shared/Link';
import SectionTitle from '@/components/shared/SectionTitle';
import { Post as PostType } from '@/services/blog/types';
import { trackPinnedPostClicked } from '@/analytics/tracking';
import PostTitleBody from '@/components/shared//PostTitleBody';

type Props = {
  posts: PostType[];
};

const PinnedPosts = ({ posts }: Props): JSX.Element => {
  if (posts.length === 0) return <></>;
  return (
    <>
      <SectionTitle title={'Pinned Posts'} />
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        {posts.map((post) => {
          return (
            <Grid item xs={12} sm={6} key={post.title}>
              <Box
                component={Link}
                key={post.slug}
                href={`/blog/posts/${post.slug}`}
                sx={{
                  textDecoration: 'none',
                  color: 'color.primary',
                  '&:hover': {
                    backgroundColor: { xs: 'transparent', sm: '#085cc5a' },
                    borderColor: { xs: 'unset', sm: 'primary.main' },
                    '#postTitle, #postDescription': {
                      color: 'primary.main'
                    }
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 0.5,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '8px',
                  transition: 'all 150ms ease-in-out'
                }}
                onClick={() => trackPinnedPostClicked()}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  gutterBottom
                >
                  <PushPinIcon fontSize="inherit" />
                  &nbsp;Pinned
                </Typography>
                <PostTitleBody post={post} />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default PinnedPosts;
