import React from 'react';
import dayjs from 'dayjs';
import { Box, Typography } from '@mui/material';

import { Post as PostType } from '@/services/blog/types';
import Link from '@/components/shared/Link';

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

const PostTitleBody = ({ post }: Props): JSX.Element => {
  return (
    <>
      <Link href={`/blog/posts/${post.slug}`}>
        <Typography
          id="postTitle"
          variant="body1"
          fontSize={'1.2rem'}
          fontWeight={700}
          sx={{
            ...ClampTypography,
            color: 'text.primary',
            letterSpacing: 0,
            transition: 'color 0.2s ease-in-out',
            '&:hover': {
              color: {
                xs: 'unset',
                sm: 'primary.main'
              }
            }
          }}
        >
          {post.title}
        </Typography>
      </Link>

      <Typography
        id="postDescription"
        variant="body1"
        lineHeight={1.4}
        gutterBottom
        sx={{
          ...ClampTypography,
          color: 'text.postBody'
        }}
      >
        {post.shortBody}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mt: 0.5
        }}
      >
        <Typography color="text.secondary" variant="body2">
          {dayjs(post.publishedAt).format('MMM D, YYYY')}
          &nbsp;&nbsp;&bull;&nbsp;&nbsp;
          {post.readingTime}
        </Typography>
      </Box>
    </>
  );
};

export default PostTitleBody;
