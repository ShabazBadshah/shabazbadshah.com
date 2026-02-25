import React from 'react';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Tag } from 'lucide-react';

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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Tag className="text-primary" />
        <h5 className="text-xl font-semibold">{tagHeader}</h5>
      </div>

      <Link href={'/tags'}>
        <span className="font-medium border-b-2 border-dotted border-black text-foreground whitespace-nowrap">
          All Tags
        </span>
      </Link>
    </div>
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

      <div className="my-5">
        <BlogPostsList posts={posts} showTitle={false} />
      </div>
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
