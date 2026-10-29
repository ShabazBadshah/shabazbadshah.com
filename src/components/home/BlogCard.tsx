import dayjs from 'dayjs';
import { Maximize2 } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';

import { trackPinnedPostClicked } from '@/analytics/tracking';
import { useCardTransition } from '@/components/CardTransition';
import CornerButton from '@/components/CornerButton';
import { content } from '@/content/content';
import type { Post } from '@/lib/blog';
import { plainText } from '@/lib/utils';

const isPlainLeftClick = (event: React.MouseEvent): boolean =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

type Props = {
  post: Post;
  /** Larger treatment for the lead article */
  featured?: boolean;
  className?: string;
};

export default function BlogCard({ post, featured = false, className = '' }: Props): JSX.Element {
  const router = useRouter();
  const { open } = useCardTransition();
  const href = `/blog/posts/${post.slug}`;

  return (
    <li className={className}>
      <a
        href={href}
        data-card={post.slug}
        className={`card group h-full justify-between gap-6 p-5 no-underline sm:p-6 ${
          featured ? 'lg:p-8' : ''
        }`}
        onPointerEnter={() => router.prefetch(href).catch(() => undefined)}
        onFocus={() => router.prefetch(href).catch(() => undefined)}
        onClick={(event) => {
          if (!isPlainLeftClick(event)) return;
          event.preventDefault();
          trackPinnedPostClicked();
          // Shallow route: the home page already holds the article, so nothing is fetched
          open(`/?post=${post.slug}`, event.currentTarget, href);
        }}
      >
        {/* Visual cue only: the whole card opens the article, this is part of that same link */}
        <CornerButton decorative icon={Maximize2} className="group-hover:text-fg" />
        <div className="flex flex-col gap-3">
          <p className="eyebrow">
            {featured && (
              <>
                <span className="text-accent rounded-pill border border-accent py-1 px-2 bg-blue-50">
                  {content.blog.featured}
                </span>
                <span aria-hidden="true"> · </span>
                <span className="sr-only">, </span>
              </>
            )}
            <time dateTime={dayjs(post.publishedAt).format('YYYY-MM-DD')}>
              {dayjs(post.publishedAt).format('MMM D, YYYY')}
            </time>
            <span aria-hidden="true"> · </span>
            <span className="sr-only">, </span>
            {post.readingTime}
          </p>
          <h3
            className={`font-semibold leading-tight max-sm:pt-2 ${
              featured ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl'
            }`}
          >
            {post.title}
          </h3>
          <p
            className={`text-fg-muted ${
              featured ? 'line-clamp-6 sm:text-lg' : 'line-clamp-3 text-[0.9375rem]'
            }`}
          >
            {plainText(post.shortBody)}
          </p>
        </div>
        {/* <span className="inline-flex items-center gap-1 text-sm font-medium text-fg">
          Read article
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span> */}
      </a>
    </li>
  );
}
