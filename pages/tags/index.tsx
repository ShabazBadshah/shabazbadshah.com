import React from 'react';
import { Chip, Box, Container, IconButton, Typography } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';

import MainLayout from '@/layouts/MainLayout';
import Link from '@/components/shared/Link';
import Post from '@/components/shared/Post';
import SEO from '@/components/shared/SEO';
import BlogAPI from '@/services/blog/';
import { TagsWithAmount } from '@/services/blog/types';
import toKebabCase from '@/utils/strings/to-kebab-case';

type Props = {
  tags: TagsWithAmount[];
};

const Tags = ({ tags }: Props) => {
  return (
    <MainLayout
      title={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="small"
            sx={{
              mr: 1,
              backgroundColor: 'action.selected',
              color: 'text.primary'
            }}
          >
            <LocalOfferIcon fontSize="small" />
          </IconButton>
          <Typography variant="h5" fontWeight={600}>
            All Tags ({tags.length})
          </Typography>
        </Box>
      }
    >
      <SEO
        pageTitle={`All tags (${tags.length}) | shabazbadshah.com`}
        metaDescription="Find what you're looking for a bit easier. Here's all the tags on my site"
      />
      <Container
        disableGutters
        sx={{
          maxWidth: { xs: '700px', md: '900px' },
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          '@media (max-width: 600px)': {
            gap: '1.5rem',
            px: '1.5rem'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            '@media (max-width: 600px)': { gap: '1.5rem' }
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {tags.map((tag) => {
              return (
                <Chip
                  key={tag.tag}
                  component={Link}
                  href={`/tags/${toKebabCase(tag.tag)}`}
                  label={`${tag.tag} (${tag.amount})`}
                  clickable
                />
              );
            })}
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Tags;

export const getStaticProps = async ({
  params
}: {
  params: ParsedUrlQuery;
}): Promise<GetStaticPropsResult<any>> => {
  const apiRef = new BlogAPI();
  const allTags = apiRef.getAllTags();

  return {
    props: {
      tags: allTags
    }
  };
};
