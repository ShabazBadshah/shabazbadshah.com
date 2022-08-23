import React from 'react';
import { Typography } from '@mui/material/';
import { GetStaticPropsResult } from 'next';

import BlogAPI from '@/services/blog';
import { Post as PostType } from '@/services/blog/types';
import MainLayout from '@/layouts/MainLayout';
import SEO from '@/components/shared/SEO';
import BlogPostsList from '@/components/shared/BlogPostsList';
import PageTitle from '@/components/shared/PageTitle';

type Props = {
  suggestedPosts: PostType[];
};

const NotFoundPageTitle = (): JSX.Element => (
  <PageTitle>
    <Typography variant="h3" fontWeight={700}>
      Page Not Found 🤡
    </Typography>
    <Typography variant="h5" fontWeight={500} sx={{ mt: 1, mb: 4 }}>
      In the meanwhile, you can check out...
    </Typography>
  </PageTitle>
);

export default function PageNotFound({ suggestedPosts }: Props): React.ReactNode {
  return (
    <MainLayout pageHeader={<NotFoundPageTitle />}>
      <SEO
        pageTitle="Not Found | shabazbadshah.com"
        metaDescription="Whoops, couldn't find what you were looking for. Sorry about that"
      />
      <BlogPostsList posts={suggestedPosts} showTitle={false} />
    </MainLayout>
  );
}

export const getStaticProps = async (): Promise<GetStaticPropsResult<any>> => {
  const apiRef = new BlogAPI();
  const suggestedPosts = apiRef.getSuggestedBlogPosts(3);

  return {
    props: {
      suggestedPosts
    }
  };
};
