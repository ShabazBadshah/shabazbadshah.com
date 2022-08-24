import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

import { Post as PostType } from '@/services/blog/types';
import Link from '@/components/shared/Link';
import SectionTitle from '@/components/shared/SectionTitle';
import PostTitleBody from '@/components/shared/PostTitleBody';

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
              <Image
                style={{ borderRadius: '4px' }}
                src={`/images/blog/${post.slug}/${post.heroImagePath}`}
                alt="Article image"
                layout="fixed"
                height={50} // Max height
                width={60}
                quality={100}
                objectFit="cover"
                loading="lazy"
                blurDataURL={`/images/blog/${post.slug}/${post.heroImagePath}`}
                placeholder="blur"
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MoreStories;
