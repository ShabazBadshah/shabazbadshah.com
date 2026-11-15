import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import Toc, { type TocItem } from '@/components/Toc';
import { content } from '@/content/content';

const ImageLightbox = dynamic(() => import('@/components/ImageLightbox'), { ssr: false });

type Slide = { src: string; alt?: string; description?: string };

export default function BlogArticle({
  title,
  publishedAt,
  readingTime,
  html = '',
  className = 'pb-10'
}: {
  title: string;
  publishedAt: string;
  readingTime: string;
  /** Pre-rendered article HTML */
  html?: string;
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
      img.setAttribute('aria-label', content.blog.enlargeImage(img.alt));
      img.style.cursor = 'zoom-in';
    });
    setSlides(
      // An image's title is its caption, under the image in the lightbox
      images.map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt,
        description: img.title || undefined
      }))
    );
  }, [html]);

  const openImage = (target: EventTarget | null) => {
    if (!(target instanceof HTMLImageElement) || !bodyRef.current) return;
    setLightbox(Array.from(bodyRef.current.querySelectorAll('img')).indexOf(target));
  };

  return (
    <article className={`relative ${className}`}>
      {/* Sits in the gutter beside the article, sized to the space there so it never overlaps the text */}
      <aside className="absolute bottom-0 left-full top-0 ml-6 hidden w-[calc((100vw-100%)/2-3.5rem)] 2xl:block">
        <Toc items={headings} />
      </aside>

      <div className="2xl:hidden">
        <Toc items={headings} collapsible />
      </div>

      <header className="mb-14 text-center">
        <h1 className="mb-4 mt-3 text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="mt-3 inline-block rounded-pill text-fg-muted px-3 py-2 text-sm font-medium">
          <time dateTime={dayjs(publishedAt).format('YYYY-MM-DD')}>
            {dayjs(publishedAt).format('MMM D, YYYY')}
          </time>

          <span aria-hidden="true"> | </span>
          <span className="sr-only">, </span>
          {readingTime}
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
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {lightbox >= 0 && (
        <ImageLightbox slides={slides} index={lightbox} onClose={() => setLightbox(-1)} />
      )}
    </article>
  );
}
