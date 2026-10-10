import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

import ArticleBody from '@/components/pages/blog/ArticleBody';
import ArticleToc, { type TocItem } from '@/components/pages/blog/ArticleToc';
import type { Post } from '@/services/blog/types';

type Props = {
  post: Post;
  className?: string;
};

export default function BlogArticle({
  post,
  className = 'pb-10 pt-6 sm:pt-10'
}: Props): JSX.Element {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<TocItem[]>([]);

  // Headings are compiled to static HTML without ids, so anchor them here for the table of contents
  useEffect(() => {
    const nodes = Array.from(bodyRef.current?.querySelectorAll<HTMLElement>('h2, h3') ?? []);
    const used = new Set<string>();
    setHeadings(
      nodes.map((node, index) => {
        const text = node.textContent?.trim() ?? '';
        let id =
          text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || `section-${index}`;
        while (used.has(id)) id = `${id}-${index}`;
        used.add(id);
        node.id = id;
        // Breathing room above a heading when the contents list scrolls to it
        node.style.scrollMarginTop = '2rem';
        return { id, text, level: node.tagName === 'H3' ? 3 : 2 };
      })
    );
  }, [post.html]);

  return (
    <article className={`relative text-base leading-[1.75] ${className}`}>
      {/* Sits in the gutter beside the article, sized to the space there so it never overlaps the text */}
      <aside className="absolute bottom-0 left-full top-0 ml-6 hidden w-[calc((100vw-100%)/2-3.5rem)] 2xl:block">
        <ArticleToc items={headings} />
      </aside>

      <div>
        <div className="2xl:hidden">
          <ArticleToc items={headings} collapsible />
        </div>

        <header className="mx-auto mb-14 text-center">
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl mb-4">{post.title}</h1>
          <p className="mt-3 inline-block rounded-pill border border-line bg-gray-50 px-3 py-2 text-sm font-medium">
            <time dateTime={dayjs(post.publishedAt).format('YYYY-MM-DD')}>
              {dayjs(post.publishedAt).format('MMM D, YYYY')}
            </time>
            <span aria-hidden="true"> | </span>
            <span className="sr-only">, </span>
            {post.readingTime}
          </p>
        </header>

        {post.html ? (
          <div
            ref={bodyRef}
            className="text-fg-muted [&_img]:border [&_img]:border-line [&_strong]:font-medium [&_strong]:text-fg"
          >
            <ArticleBody html={post.html} />
          </div>
        ) : (
          <p className="text-fg-muted" role="status">
            Loading article…
          </p>
        )}
      </div>
    </article>
  );
}
