import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ArticleSheet from '@/components/pages/homepage/ArticleSheet';
import BlogCard from '@/components/bento/BlogCard';
import ProjectCard from '@/components/bento/ProjectCard';
import Hero from '@/components/shared/Hero';
import { PROJECTS } from '@/content/projects';
import type { Post } from '@/services/blog/types';

type Props = {
  posts: Post[];
};

const SECTION_TITLE = 'text-2xl font-semibold tracking-tight sm:text-3xl';

export default function BentoHome({ posts }: Props): JSX.Element {
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
    <div className="flex flex-col gap-16 sm:gap-20">
      <section id="hero" aria-label="Introduction" className="pt-6 sm:pt-10 lg:pt-14">
        <Hero />
      </section>

      <section aria-labelledby="work-heading">
        <h2 id="work" className={SECTION_TITLE}>
          <span id="work-heading">Selected Works</span>
        </h2>
        <div className="mt-6 grid gap-(--grid-gap) lg:grid-cols-2">
          {PROJECTS.map((item) => (
            <ProjectCard
              key={item.slug}
              project={item}
              className={item.appImages ? 'lg:col-span-2' : ''}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="blog-heading">
        <h2 id="blog" className={SECTION_TITLE}>
          <span id="blog-heading">Thoughts</span>
          <p className="text-lg text-fg-muted font-medium">
            Some of my thoughts and things I&apos;d like to share.
          </p>
        </h2>
        <div>
          <ul className="mt-6 grid gap-(--grid-gap) sm:grid-cols-2 lg:grid-cols-3">
            {featured && (
              <BlogCard post={featured} featured className="sm:col-span-2 lg:row-span-2" />
            )}
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </ul>
        </div>
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
  );
}
