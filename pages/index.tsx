import { GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { renderPostHtml } from '@/components/blog/RenderPostHTML';
import ArticleSheet from '@/components/home/ArticleSheet';
import BlogCard from '@/components/home/BlogCard';
import Hero from '@/components/home/Hero';
import ProjectCard from '@/components/home/ProjectCard';
import SEO from '@/components/SEO';
import { siteConfig } from '@/config/site';
import { content } from '@/content/content';
import { PROJECTS } from '@/content/projects';
import MainLayout from '@/layouts/MainLayout';
import { getAllPosts, type Post } from '@/lib/blog';
import { homeStructuredData } from '@/lib/structured-data';

const GRID_GAP = 'gap-4 sm:gap-5 lg:gap-6';
const SECTION_TITLE = 'text-2xl font-semibold tracking-tight sm:text-3xl';

const Index = ({ posts }: { posts: Post[] }): JSX.Element => {
  const [featured, ...rest] = posts;
  const router = useRouter();

  // The card transition shallow-routes to /?post=<slug>, masked as the article's real URL
  const routePost = posts.find((post) => post.slug === router.query.post);
  // Kept mounted after the route leaves so the article can shrink back into its card
  const [shown, setShown] = useState<Post>();
  useEffect(() => {
    if (routePost) setShown(routePost);
  }, [routePost]);
  const sheetPost = routePost ?? shown;
  const close = useCallback(() => router.back(), [router]);

  return (
    <MainLayout>
      <SEO
        title={siteConfig.seo.title}
        description={siteConfig.seo.description}
        jsonLd={homeStructuredData()}
      />
      <div className="flex flex-col gap-16 sm:gap-20">
        <section id="hero" aria-label={content.hero.sectionLabel}>
          <Hero />
        </section>

        <section aria-labelledby="work-heading">
          <h2 id="work" className={SECTION_TITLE}>
            <span id="work-heading">{content.work.title}</span>
          </h2>
          <div className={`mt-6 grid lg:grid-cols-2 ${GRID_GAP}`}>
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                className={project.appImages ? 'lg:col-span-2' : ''}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="blog-heading">
          <h2 id="blog" className={SECTION_TITLE}>
            <span id="blog-heading">{content.blog.title}</span>
            <p className="text-lg font-medium text-fg-muted">{content.blog.subtitle}</p>
          </h2>
          <ul className={`mt-6 grid sm:grid-cols-2 lg:grid-cols-3 ${GRID_GAP}`}>
            {featured && (
              <BlogCard post={featured} featured className="sm:col-span-2 lg:row-span-2" />
            )}
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </ul>
        </section>

        {sheetPost && (
          <ArticleSheet
            key={sheetPost.slug}
            post={sheetPost}
            closing={!routePost}
            onClose={close}
            onExited={() => setShown(undefined)}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Index;

export const getStaticProps = async (): Promise<GetStaticPropsResult<{ posts: Post[] }>> => {
  // Articles ship pre-rendered with the home page so a card opens instantly, with no extra request
  const posts = await Promise.all(
    getAllPosts().map(async (post) => ({
      ...post,
      html: await renderPostHtml(post.slug, post.body),
      body: ''
    }))
  );

  return { props: { posts } };
};
