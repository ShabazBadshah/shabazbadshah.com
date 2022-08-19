import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import dayjs from 'dayjs';

import Link from '@/components/shared/Link';
import { Post as PostType } from '@/services/blog/types';
import { trackPinnedPostClicked } from '@/analytics/tracking';

const ClampTypography = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  lineClamp: '2',
  WebkitBoxOrient: 'vertical'
};

type Props = {
  posts: PostType[];
};

const PinnedPosts = ({ posts }: Props): JSX.Element => {
  if (posts.length === 0) return <></>;
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          color: 'text.primary',
          fontSize: '16px !important',
          letterSpacing: 0,
          fontWeight: '500',
          lineHeight: '20px',
          mb: 2
        }}
      >
        Pinned Posts
      </Typography>
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
                key={post.slug}
                component={Link}
                href={`/blog/posts/${post.slug}`}
                sx={{
                  textDecoration: 'none',
                  color: 'black',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '1rem',
                  justifyContent: 'space-between',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '8px',
                  p: 2,
                  transition: 'all 150ms ease-out',
                  '&:hover': {
                    transition: 'all 150ms ease-in',
                    backgroundColor: 'rgba(8, 92, 197, 0.04)',
                    borderColor: 'primary.main',
                    '#pinnedPostTitle': {
                      color: 'primary.main'
                    }
                  },
                  '@media (max-width: 600px)': {
                    '&:hover': {
                      backgroundColor: 'transparent',
                      borderColor: '#cecece'
                    }
                  }
                }}
                onClick={() => trackPinnedPostClicked()}
              >
                <Box>
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
                    &nbsp;{`Pinned`}
                  </Typography>
                  <Typography
                    variant="body1"
                    id="pinnedPostTitle"
                    sx={{
                      ...ClampTypography,
                      color: 'text.primary !important',
                      fontWeight: '700',
                      lineHeight: '20px',
                      letterSpacing: '0',
                      transition: 'color 0.2s ease-in-out',
                      '&:hover': {
                        color: 'primary.main'
                      },
                      '@media (max-width: 900px)': {
                        '&:hover': {
                          color: 'unset'
                        }
                      }
                    }}
                  >
                    {' '}
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      ...ClampTypography,
                      marginTop: '0.75rem',
                      color: 'text.postBody',
                      lineHeight: '1.35rem'
                    }}
                  >
                    {post.shortBody}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center',
                      mt: 1.5
                    }}
                  >
                    <Typography color="text.secondary" variant="body2">
                      {dayjs(post.publishedAt).format('MMM D, YYYY')}
                      &nbsp;&nbsp;&bull;&nbsp;&nbsp;
                      {post.readingTime}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default PinnedPosts;
