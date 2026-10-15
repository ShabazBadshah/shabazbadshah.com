import dayjs from 'dayjs';
import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import type { Post } from '@/lib/blog';

const ImageLightbox = dynamic(() => import('./ImageLightbox'), { ssr: false });

type TocItem = { id: string; text: string; level: 2 | 3 };
type Slide = { src: string; alt?: string; title?: string };

/** "On this page" list with the current section highlighted; `collapsible` folds it into a dropdown. */
function Toc({ items, collapsible = false }: { items: TocItem[]; collapsible?: boolean }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    // Capture: the article can sit in its own scroll container, and scroll events don't bubble
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => {
      document.removeEventListener('scroll', onScroll, true);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  if (items.length < 2) return null;

  const list = (
    <ul className={`flex flex-col gap-1.5 ${collapsible ? '' : 'items-end'}`}>
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <li key={item.id} className={collapsible ? '' : 'flex min-w-0 max-w-full justify-end'}>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
              // Scroll in place: a hash navigation would add history entries, so Back would
              // step through sections instead of leaving the article
              onClick={(event) => {
                const target = document.getElementById(item.id);
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({
                  behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'auto'
                    : 'smooth',
                  block: 'start'
                });
                setActive(item.id);
              }}
              className={`block w-fit rounded-3xl px-3 py-1.5 text-sm leading-snug no-underline transition-colors hover:bg-fill hover:text-fg ${
                collapsible ? '' : 'max-w-full truncate'
              } ${item.level === 3 ? 'pr-6 text-[0.8125rem]' : ''} ${
                isActive ? 'bg-fill font-medium text-fg' : 'text-fg-muted'
              }`}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  if (collapsible) {
    return (
      <nav aria-label="Table of contents" className="mb-8 rounded-3xl border">
        <details className="group">
          <summary className="eyebrow flex cursor-pointer list-none items-center justify-between px-4 py-3 [&::-webkit-details-marker]:hidden">
            Contents
            <ChevronDown
              aria-hidden="true"
              className="size-4 transition-transform group-open:rotate-180"
            />
          </summary>
          <div className="px-2 pb-2">{list}</div>
        </details>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-32 max-h-[calc(100dvh-9rem)] overflow-y-auto whitespace-nowrap text-right"
    >
      {list}
    </nav>
  );
}

export default function BlogArticle({
  post,
  className = 'pb-10 pt-6 sm:pt-10'
}: {
  post: Post;
  className?: string;
}): JSX.Element {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [lightbox, setLightbox] = useState(-1);

  // The article is static HTML: anchor its headings for the table of contents and make its
  // images keyboard-accessible lightbox triggers
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    const used = new Set<string>();
    setHeadings(
      Array.from(body.querySelectorAll<HTMLElement>('h2, h3')).map((node, index) => {
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

    const images = Array.from(body.querySelectorAll('img'));
    images.forEach((img) => {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', `Enlarge image: ${img.alt || 'article image'}`);
      img.style.cursor = 'zoom-in';
    });
    setSlides(
      images.map((img) => ({ src: img.currentSrc || img.src, alt: img.alt, title: img.title }))
    );
  }, [post.html]);

  const openImage = (target: EventTarget | null) => {
    if (!(target instanceof HTMLImageElement) || !bodyRef.current) return;
    setLightbox(Array.from(bodyRef.current.querySelectorAll('img')).indexOf(target));
  };

  return (
    <article className={`relative text-base leading-[1.75] ${className}`}>
      {/* Sits in the gutter beside the article, sized to the space there so it never overlaps the text */}
      <aside className="absolute bottom-0 left-full top-0 ml-6 hidden w-[calc((100vw-100%)/2-3.5rem)] 2xl:block">
        <Toc items={headings} />
      </aside>

      <div className="2xl:hidden">
        <Toc items={headings} collapsible />
      </div>

      <header className="mb-14 text-center">
        <h1 className="mb-4 mt-3 text-3xl font-semibold sm:text-4xl">{post.title}</h1>
        <p className="mt-3 inline-block rounded-pill border bg-gray-50 text-fg-muted px-3 py-2 text-sm font-medium">
          <time dateTime={dayjs(post.publishedAt).format('YYYY-MM-DD')}>
            {dayjs(post.publishedAt).format('MMM D, YYYY')}
          </time>

          <span aria-hidden="true"> | </span>
          <span className="sr-only">, </span>
          {post.readingTime}
        </p>
      </header>

      <div
        ref={bodyRef}
        className="text-fg-muted [&_img]:border [&_strong]:font-medium [&_strong]:text-fg"
        onClick={(event) => openImage(event.target)}
        onKeyDown={(event) => {
          if (
            (event.key === 'Enter' || event.key === ' ') &&
            event.target instanceof HTMLImageElement
          ) {
            event.preventDefault();
            openImage(event.target);
          }
        }}
        dangerouslySetInnerHTML={{ __html: post.html ?? '' }}
      />
      {lightbox >= 0 && (
        <ImageLightbox slides={slides} index={lightbox} onClose={() => setLightbox(-1)} />
      )}
    </article>
  );
}
