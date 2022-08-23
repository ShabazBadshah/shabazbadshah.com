import React from 'react';
import { GetStaticPropsResult } from 'next';
import { Box, Typography } from '@mui/material';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

import MainLayout from '@/layouts/MainLayout';
import SEO from '@/components/shared/SEO';
import BlogAPI from '@/services/blog/';
import PageTitle from '@/components/shared/PageTitle';
import { TagsWithAmount } from '@/services/blog/types';
import PostTags from '@/components/shared/PostTags';

type Props = {
  tags: TagsWithAmount[];
};

const AllTagsPageTitle = ({ numTotalTags }: { numTotalTags: number }) => (
  <>
    <PageTitle>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocalOfferOutlinedIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h5" fontWeight={600} whiteSpace={'nowrap'}>
          All Tags ({numTotalTags})
        </Typography>
      </Box>
    </PageTitle>
  </>
);

const TagsPage = ({ tags }: Props): JSX.Element => {
  return (
    <MainLayout pageHeader={<AllTagsPageTitle numTotalTags={tags.length} />}>
      <SEO
        pageTitle={`All tags (${tags.length}) | shabazbadshah.com`}
        metaDescription="Find what you're looking for a bit easier. Here's all the tags on my site"
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
        <PostTags tags={tags.map((tag) => tag.tag)} />
      </Box>
    </MainLayout>
  );
};

export default TagsPage;

export const getStaticProps = async (): Promise<GetStaticPropsResult<any>> => {
  return {
    props: {
      tags: new BlogAPI().getAllTags()
    }
  };
};
