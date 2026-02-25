import React from 'react';
import { GetStaticPropsResult } from 'next';
import { Tag } from 'lucide-react';

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
      <div className="flex items-center gap-1">
        <Tag className="text-primary" />
        <h5 className="text-xl font-semibold whitespace-nowrap">All Tags ({numTotalTags})</h5>
      </div>
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
      <div className="flex flex-wrap gap-1.25">
        <PostTags tags={tags.map((tag) => tag.tag)} />
      </div>
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
