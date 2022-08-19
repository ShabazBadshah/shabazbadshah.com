import * as React from 'react';
import { Box, Chip, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

import Link from '@/components/shared/Link';
import toKebabCase from '@/utils/strings/to-kebab-case';
import { Post as PostType } from '@/services/blog/types';
import Image from 'next/image';

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
};

const MAX_NUM_TAGS_TO_SHOW = 3;

const Post = ({ post }: Props) => {
  if (!post || !post.tags || !post.publishedAt || !post.readingTime || !post.shortBody) {
    return <></>;
  }
  return (
    <article style={{ width: '100%' }}>
      <Grid
        item
        xs={12}
        key={post.slug}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '60px',
          '@media (max-width: 600px)': {
            gap: '1rem'
          }
        }}
      >
        <Box sx={{ padding: '0 !important' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              '@media (max-width: 600px)': { gap: 1.5 }
            }}
          >
            <Box
              component={Link}
              href={`/blog/posts/${post.slug}`}
              sx={{
                textDecoration: 'none',
                color: 'unset',
                '&:hover': {
                  '.highlightOnParentHover': {
                    color: 'primary.main'
                  }
                },
                '@media (max-width: 900px)': {
                  '&:hover': {
                    '.highlightOnParentHover': {
                      color: 'unset'
                    }
                  }
                }
              }}
            >
              <Typography
                variant="h2"
                gutterBottom
                className="highlightOnParentHover"
                sx={{
                  ...ClampTypography,
                  fontWeight: '700',
                  lineHeight: '28px',
                  fontSize: '22px !important',
                  letterSpacing: '0',
                  color: 'text.primary',
                  transition: 'color 0.2s ease-in-out',
                  '@media (max-width: 600px)': {
                    marginBottom: '0',
                    lineHeight: '20px',
                    fontSize: '16px !important'
                  }
                }}
              >
                {post.title || post.slug}
              </Typography>
              <Typography
                className="highlightOnParentHover"
                variant="body1"
                gutterBottom
                sx={{
                  ...ClampTypography,
                  marginBottom: '1rem',
                  color: 'text.postBody',
                  '@media (max-width: 600px)': {
                    display: 'none !important'
                  }
                }}
              >
                {`${post.shortBody}`}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography color="text.secondary" variant="body2">
                {dayjs(post.publishedAt).format('MMM D, YYYY')}
                &nbsp;&nbsp;&bull;&nbsp;&nbsp;{post.readingTime}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {post.tags.slice(0, MAX_NUM_TAGS_TO_SHOW).map((tag) => (
                <Chip
                  label={tag}
                  size="small"
                  clickable
                  component={Link}
                  key={tag}
                  href={`/tags/${toKebabCase(tag)}`}
                  sx={{ px: 0.5 }}
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ '& > span': { borderRadius: '6px' }, display: { xs: 'none', sm: 'block' } }}
          component={Link}
          href={`/blog/posts/${post.slug}`}
        >
          <Image
            src={`/images/blog/${post.slug}/${post.heroImagePath}`}
            alt="Article image"
            layout="fixed"
            height={140}
            width={240}
            quality={50}
            objectFit="cover"
            loading="lazy"
            blurDataURL={post.heroImagePath}
            placeholder="blur"
          />
        </Box>
      </Grid>
    </article>
  );
};

export default Post;
