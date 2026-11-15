import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import BlogArticle from '@/components/blog/BlogArticle';
import ArticleSheet from '@/components/ArticleSheet';
import BlogCard from '@/components/blog/BlogCard';
import { siteConfig } from '@/lib/site';
import type { Post } from '@/lib/blog';

const GRID_GAP = 'gap-4 sm:gap-5 lg:gap-6';

type Props = {
  /** Posts with pre-rendered `html`, so a card opens instantly */
  posts: Post[];
  /** Give the first post the large featured card */
  featureFirst?: boolean;
  /** Posts from this index on are plain list rows under the card grid */
  listFrom?: number;
  className?: string;
};

/**
 * Blog cards that grow into the full article in place. A card shallow-routes to
 * `<this page>?post=<slug>`, masked as the article's real URL.
 */
export default function PostGrid({
  posts,
  featureFirst = true,
  listFrom = posts.length,
  className = ''
}: Props): JSX.Element {
  const router = useRouter();
  const cards = posts.slice(0, listFrom);
  const rows = posts.slice(listFrom);
  const [featured, ...rest] = featureFirst ? cards : [undefined, ...cards];

  const routePost = posts.find((post) => post.slug === router.query.post);
  // Kept mounted after the route leaves so the article can shrink back into its card
  const [shown, setShown] = useState<Post>();
  useEffect(() => {
    if (routePost) setShown(routePost);
  }, [routePost]);
  const sheetPost = routePost ?? shown;
  const close = useCallback(() => router.back(), [router]);

  const columns = cards.length === 1 ? '' : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`flex flex-col gap-10 ${className}`}>
      {cards.length > 0 && (
        <ul className={`grid ${columns} ${GRID_GAP}`}>
          {featured && (
            <BlogCard
              slug={featured.slug}
              title={featured.title}
              summary={featured.shortBody}
              publishedAt={featured.publishedAt}
              readingTime={featured.readingTime}
              featured
              className={cards.length > 1 ? 'sm:col-span-2 lg:row-span-2' : ''}
            />
          )}
          {rest.map(
            (post) =>
              post && (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  summary={post.shortBody}
                  publishedAt={post.publishedAt}
                  readingTime={post.readingTime}
                />
              )
          )}
        </ul>
      )}
      {rows.length > 0 && (
        <ul>
          {rows.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              summary={post.shortBody}
              publishedAt={post.publishedAt}
              readingTime={post.readingTime}
              row
            />
          ))}
        </ul>
      )}
      {sheetPost && (
        <ArticleSheet
          key={sheetPost.slug}
          card={sheetPost.slug}
          label={sheetPost.title}
          pageTitle={siteConfig.seo.postTitle(sheetPost.title)}
          closing={!routePost}
          onClose={close}
          onExited={() => setShown(undefined)}
        >
          <BlogArticle
            title={sheetPost.title}
            publishedAt={sheetPost.publishedAt}
            readingTime={sheetPost.readingTime}
            html={sheetPost.html}
          />
        </ArticleSheet>
      )}
    </div>
  );
}
