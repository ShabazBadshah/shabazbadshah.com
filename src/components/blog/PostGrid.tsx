import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import ArticleSheet from '@/components/home/ArticleSheet';
import BlogCard from '@/components/home/BlogCard';
import type { Post } from '@/lib/blog';

const GRID_GAP = 'gap-4 sm:gap-5 lg:gap-6';

type Props = {
  /** Posts with pre-rendered `html`, so a card opens instantly */
  posts: Post[];
  /** Give the first post the large featured card */
  featureFirst?: boolean;
  className?: string;
};

/**
 * Blog cards that grow into the full article in place. A card shallow-routes to
 * `<this page>?post=<slug>`, masked as the article's real URL.
 */
export default function PostGrid({
  posts,
  featureFirst = true,
  className = ''
}: Props): JSX.Element {
  const router = useRouter();
  const [featured, ...rest] = featureFirst ? posts : [undefined, ...posts];

  const routePost = posts.find((post) => post.slug === router.query.post);
  // Kept mounted after the route leaves so the article can shrink back into its card
  const [shown, setShown] = useState<Post>();
  useEffect(() => {
    if (routePost) setShown(routePost);
  }, [routePost]);
  const sheetPost = routePost ?? shown;
  const close = useCallback(() => router.back(), [router]);

  const columns = posts.length === 1 ? '' : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <>
      <ul className={`grid ${columns} ${GRID_GAP} ${className}`}>
        {featured && (
          <BlogCard
            post={featured}
            featured
            className={posts.length > 1 ? 'sm:col-span-2 lg:row-span-2' : ''}
          />
        )}
        {rest.map((post) => post && <BlogCard key={post.slug} post={post} />)}
      </ul>
      {sheetPost && (
        <ArticleSheet
          key={sheetPost.slug}
          post={sheetPost}
          closing={!routePost}
          onClose={close}
          onExited={() => setShown(undefined)}
        />
      )}
    </>
  );
}
