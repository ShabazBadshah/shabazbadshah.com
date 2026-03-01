import { GetStaticPropsResult } from 'next';

import PinnedPosts from '@/components/pages/homepage/PinnedPosts';
import PortfolioSection from '@/components/pages/homepage/PortfolioSection';
import SEO from '@/components/shared/SEO';
import MainLayout from '@/layouts/MainLayout';
import BlogAPI from '@/services/blog';
import { Post as PostType } from '@/services/blog/types';
import Hero from '../src/components/shared/Hero';

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

      <div className="flex flex-col gap-24">
        <div className="my-2" id="hero">
          <Hero />
        </div>
        <div className="my-2" id="blog">
          <PinnedPosts posts={pinnedPosts} />
        </div>
        <div className="my-2" id="works">
          <PortfolioSection />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;

export const getStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const posts = new BlogAPI().getAllPosts();
  return {
    props: {
      posts,
      pinnedPosts: posts
        .filter((post) => post.pinned)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    }
  };
};
