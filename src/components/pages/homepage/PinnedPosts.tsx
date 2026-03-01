import React from 'react';
import { Pin } from 'lucide-react';

import Link from '@/components/shared/Link';
import { Post as PostType } from '@/services/blog/types';
import { trackPinnedPostClicked } from '@/analytics/tracking';
import dayjs from 'dayjs';

type Props = {
  posts: PostType[];
};

const PostTitleBody = ({ post }: { post: PostType }): JSX.Element => {
  return (
    <>
      <div className="flex items-center gap-2 mb-1">
        <p className="text-muted-foreground text-sm mb-4">
          {dayjs(post.publishedAt).format('MMM D, YYYY')}
          &nbsp;&nbsp;&bull;&nbsp;&nbsp;
          {post.readingTime}
        </p>
      </div>
      <Link href={`/blog/posts/${post.slug}`}>
        <p
          id="postTitle"
          className="mb-1  text-lg font-semibold text-ellipsis transition-colors duration-200"
        >
          {post.title}
        </p>
      </Link>

      <p
        id="postDescription"
        className="text-muted-foreground leading-snug overflow-hidden text-ellipsis line-clamp-2"
      >
        {post.shortBody}
      </p>
    </>
  );
};

const PinnedPosts = ({ posts }: Props): JSX.Element => {
  if (posts.length === 0) return <></>;
  return (
    <>
      <div className="mb-4 flex flex-col gap-2">
        <span
          data-slot="badge"
          className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3 text-foreground [a]:hover:bg-accent [a]:hover:text-accent-foreground text-sm font-normal"
        >
          Blog
        </span>
        <h2 className="text-2xl font-semibold">Some of my thoughts and expertise</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post) => {
          return (
            <div
              key={post.title}
              className="w-full px-6 py-4 hover:text-primary hover:border-sky-700 hover:bg-sky-100/50 text-gray-700 border-gray-300 hover:border-primary hover:[&_#postTitle]:text-primary hover:[&_#postDescription]:text-primary p-2 border border-border rounded-xl transition-all duration-150 ease-in-out"
            >
              <Link
                key={post.slug}
                href={`/blog/posts/${post.slug}`}
                className="no-underline text-foreground flex flex-col justify-between gap-0.5"
                onClick={() => trackPinnedPostClicked()}
              >
                <PostTitleBody post={post} />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PinnedPosts;
