import { Box } from '@mui/material';

import Link from '@/components/shared/Link';
import PostTitleBody from '@/components/shared/PostTitleBody';
import SectionTitle from '@/components/shared/SectionTitle';
import { Post as PostType } from '@/services/blog/types';

type Props = {
  suggestedPosts: PostType[];
};

const MoreStories = ({ suggestedPosts }: Props): JSX.Element => {
  if (!suggestedPosts || suggestedPosts.length === 0) return <></>;
  return (
    <Box>
      <SectionTitle title="More Stories" />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {suggestedPosts.map((post) => {
          if (!post) return <></>;
          return (
            <Box
              key={post.slug}
              component={Link}
              href={post.slug}
              sx={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box
                sx={{
                  '#postDescription': {
                    display: 'none'
                  },
                  '#postTitle': {
                    fontSize: 'initial',
                    lineHeight: '20px',
                    letterSpacing: '0'
                  }
                }}
              >
                <PostTitleBody post={post} />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MoreStories;
