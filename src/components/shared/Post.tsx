import { Box } from '@mui/material';

import PostTags from '@/components/shared/PostTags';
import PostTitleBody from '@/components/shared/PostTitleBody';
import { Post as PostType } from '@/services/blog/types';

type Props = {
  post: PostType;
};

const Post = ({ post }: Props): JSX.Element => {
  if (!post || !post.tags || !post.publishedAt || !post.readingTime || !post.shortBody) {
    return <></>;
  }
  return (
    <article style={{ width: '100%' }}>
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
    </article>
  );
};

export default Post;
