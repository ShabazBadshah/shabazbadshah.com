import { GetStaticPropsResult } from 'next';

import PinnedPosts from '@/components/pages/homepage/PinnedPosts';
import WeeklySyftableUpdate from '@/components/pages/homepage/WeeklySyftableUpdate';
import BlogPostsList from '@/components/shared/BlogPostsList';
import SEO from '@/components/shared/SEO';
import MainLayout from '@/layouts/MainLayout';
import BlogAPI from '@/services/blog';
import { Post as PostType } from '@/services/blog/types';

type Props = {
  posts: PostType[];
  pinnedPosts: PostType[];
};

const Index = ({ posts, pinnedPosts }: Props): JSX.Element => {
  return (
    <MainLayout>
      <SEO
        pageTitle="Home | shabazbadshah.com"
        metaDescription="I'm a Product Manager who develops Fullstack web experiences during his downtime. This site catalogs things I learn, want to share, or anything cool I'm creating"
      />
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="my-2">
          <WeeklySyftableUpdate />
        </div>

        <div className="my-2">
          <PinnedPosts posts={pinnedPosts} />
        </div>

        <div className="mt-3 mb-5">
          <BlogPostsList posts={posts} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;

export const getStaticProps = async (): Promise<GetStaticPropsResult<any>> => {
  const posts = new BlogAPI().getAllPosts();
  return {
    props: {
      posts,
      pinnedPosts: posts.filter((post) => post.pinned)
    }
  };
};
