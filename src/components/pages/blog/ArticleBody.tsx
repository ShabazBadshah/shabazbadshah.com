import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const ImageLightbox = dynamic(() => import('./ImageLightbox'), { ssr: false });

type Props = {
  html: string;
};

type Slide = { src: string; alt?: string; title?: string };

/** Renders pre-compiled article HTML; images open in a lightbox (click or Enter/Space). */
export default function ArticleBody({ html }: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    if (!ref.current) return;
    const images = Array.from(ref.current.querySelectorAll('img'));
    images.forEach((img) => {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', `Enlarge image: ${img.alt || 'article image'}`);
      img.style.cursor = 'zoom-in';
    });
    setSlides(
      images.map((img) => ({ src: img.currentSrc || img.src, alt: img.alt, title: img.title }))
    );
  }, [html]);

  const open = (target: EventTarget | null) => {
    if (!(target instanceof HTMLImageElement) || !ref.current) return;
    const position = Array.from(ref.current.querySelectorAll('img')).indexOf(target);
    if (position !== -1) setIndex(position);
  };

  return (
    <>
      <div
        ref={ref}
        onClick={(event) => open(event.target)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            if (event.target instanceof HTMLImageElement) {
              event.preventDefault();
              open(event.target);
            }
          }
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {index >= 0 && <ImageLightbox slides={slides} index={index} onClose={() => setIndex(-1)} />}
    </>
  );
}
