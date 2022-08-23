import * as React from 'react';
import { Box, Grid } from '@mui/material';

import Link from '@/components/shared/Link';
import { Post as PostType } from '@/services/blog/types';
import Image from 'next/image';
import PostTitleBody from '@/components/shared/PostTitleBody';
import PostTags from '@/components/shared/PostTags';

type Props = {
  post: PostType;
};

const Post = ({ post }: Props): JSX.Element => {
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
          gap: { xs: 2, sm: 8 }
        }}
      >
        <Box
          sx={{
            textDecoration: 'none',
            color: 'color.primary',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 0.5
          }}
        >
          <PostTitleBody post={post} />
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <PostTags tags={post.tags} maxNumTagsToShow={3} />
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
            quality={100}
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
