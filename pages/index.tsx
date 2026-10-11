import { GetStaticPropsResult } from 'next';

import { renderPostHtml } from '@/components/pages/blog/RenderPostHTML';
import BentoHome from '@/components/pages/homepage/BentoHome';
import JsonLd from '@/components/shared/JsonLd';
import SEO from '@/components/shared/SEO';
import { siteConfig } from '@/config/site';
import MainLayout from '@/layouts/MainLayout';
import { homeStructuredData } from '@/lib/structured-data';
import BlogAPI from '@/services/blog';
import { Post as PostType } from '@/services/blog/types';

type Props = {
  posts: PostType[];
};

const Index = ({ posts }: Props): JSX.Element => {
  return (
    <MainLayout>
      <SEO
        pageTitle={siteConfig.seo.title}
        metaDescription="I'm Shabaz 👋, a Product Engineer. I partner with organizations facing complex, high-impact challenges and turn operational friction into secure, scalable digital systems."
        path="/"
      />
      <JsonLd id="home-jsonld" data={homeStructuredData()} />
      <BentoHome posts={posts} />
    </MainLayout>
  );
};

export default Index;

export const getStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  // Articles ship pre-rendered with the home page so a card opens instantly, with no extra request
  const posts = await Promise.all(
    new BlogAPI().getAllPosts().map(async (post) => ({
      ...post,
      html: await renderPostHtml(post.slug, post.body || ''),
      body: ''
    }))
  );

  return { props: { posts } };
};
