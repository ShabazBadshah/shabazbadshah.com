import dayjs from 'dayjs';
import { ChevronRight, Maximize2 } from 'lucide-react';
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
  /** A plain list row instead of a card: title, then the date and reading time, then a chevron */
  row?: boolean;
  className?: string;
};

export default function BlogCard({
  post,
  featured = false,
  row = false,
  className = ''
}: Props): JSX.Element {
  const router = useRouter();
  const { open } = useCardTransition();
  const href = `/blog/posts/${post.slug}`;

  // Above the title on a grid card; under it on a list row, laid out like the article's own
  const meta = (
    <p className={`eyebrow ${row ? '-mt-1.5' : ''}`}>
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
      <span aria-hidden="true">{row ? ' | ' : ' · '}</span>
      <span className="sr-only">, </span>
      {post.readingTime}
    </p>
  );

  return (
    <li className={className}>
      <a
        href={href}
        data-card={post.slug}
        className={
          row
            ? // No card: a row with a chevron, like the rows on /work
              'group flex items-center gap-4 rounded-inner px-3 py-5 text-fg no-underline transition-colors hover:bg-accent-soft'
            : `card group h-full justify-between gap-6 p-5 no-underline sm:p-6 ${
                featured ? 'lg:p-8' : ''
              }`
        }
        onPointerEnter={() => router.prefetch(href).catch(() => undefined)}
        onFocus={() => router.prefetch(href).catch(() => undefined)}
        onClick={(event) => {
          if (!isPlainLeftClick(event)) return;
          event.preventDefault();
          trackPinnedPostClicked();
          // Shallow route: this page already holds the article, so nothing is fetched
          const page = router.asPath.split(/[?#]/)[0];
          open(`${page}?post=${post.slug}`, event.currentTarget, href);
        }}
      >
        {/* Visual cue only: the whole card opens the article, this is part of that same link */}
        {!row && <CornerButton decorative icon={Maximize2} className="group-hover:text-fg" />}
        <div className={`flex flex-col gap-3 ${row ? 'min-w-0 flex-1' : ''}`}>
          {!row && meta}
          <h3
            className={`font-semibold leading-tight ${row ? '' : 'max-sm:pt-2'} ${
              featured ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl'
            }`}
          >
            {post.title}
          </h3>
          {row && meta}
          <p className={`text-fg-muted ${featured ? 'line-clamp-6' : 'line-clamp-3'}`}>
            {plainText(post.shortBody)}
          </p>
        </div>
        {row && (
          <ChevronRight
            aria-hidden="true"
            className="size-5 shrink-0 text-fg-muted transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:text-fg"
          />
        )}
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
