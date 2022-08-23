import * as React from 'react';

import { Divider, Grid } from '@mui/material';

import { Post as PostType } from '@services/blog/types';
import Post from '@/components/shared/Post';
import SectionTitle from '@/components/shared/SectionTitle';

type Props = {
  posts: PostType[];
  showTitle?: boolean;
};

const BlogPostsList = ({ posts, showTitle = true }: Props): JSX.Element => {
  if (!posts || posts.length === 0) return <></>;
  return (
    <>
      {showTitle && <SectionTitle title={'All Posts'} />}
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
            <Divider sx={{ my: { xs: 3, sm: 4 } }} />
          </Grid>
        );
      })}
    </>
  );
};

export default BlogPostsList;
