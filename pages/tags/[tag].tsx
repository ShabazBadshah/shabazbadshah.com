import React from 'react';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Box, Typography } from '@mui/material/';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

import BlogPostsList from '@/components/shared/BlogPostsList';
import MainLayout from '@/layouts/MainLayout';
import { Post as PostType } from '@/services/blog/types';
import BlogAPI from '@/services/blog/';
import toKebabCase from '@/utils/strings/to-kebab-case';
import SEO from '@/components/shared/SEO';
import PageTitle from '@/components/shared/PageTitle';
import Link from '@/components/shared/Link';

type Props = {
  posts: PostType[];
  tag: string;
  totalCount: number;
};

const IndividualTagPageHeader = ({ tagHeader }: { tagHeader: string }): JSX.Element => (
  <PageTitle>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocalOfferOutlinedIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h5" fontWeight={600}>
          {tagHeader}
        </Typography>
      </Box>

      <Link href={'/tags'}>
        <Typography
          fontWeight={500}
          sx={{ borderBottom: '2px dotted black', color: 'text.primary' }}
        >
          All Tags
        </Typography>
      </Link>
    </Box>
  </PageTitle>
);

const Tags = ({ posts, tag, totalCount }: Props): JSX.Element => {
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`;
  return (
    <MainLayout pageHeader={<IndividualTagPageHeader tagHeader={tagHeader} />}>
      <SEO
        pageTitle={`${tag} (${totalCount}) | shabazbadshah.com`}
        metaDescription="All blogs posts that are tagged with the tag you've selected"
      />

      <Box my={5}>
        <BlogPostsList posts={posts} showTitle={false} />
      </Box>
    </MainLayout>
  );
};

export default Tags;

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  return {
    paths: new BlogAPI().getAllTags().map((tag) => `/tags/${toKebabCase(tag.tag)}`),
    fallback: false
  };
};

export const getStaticProps = async ({
  params
}: {
  params: ParsedUrlQuery;
}): Promise<GetStaticPropsResult<any>> => {
  const tag = params.tag as string;
  const postsByTag = new BlogAPI().getPostsByTag(toKebabCase(tag));

  return {
    props: {
      posts: postsByTag,
      tag,
      totalCount: postsByTag.length
    }
  };
};
