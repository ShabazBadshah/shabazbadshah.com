import { useEffect } from 'react';

/** next/image's blank stand-in while a lazy image is still out of view */
const NEXT_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP';

/** Still being fetched, or next/image hasn't swapped in its source yet (a broken image is done) */
const pending = (img: HTMLImageElement): boolean =>
  !img.complete || (img.currentSrc || img.src).startsWith(NEXT_PLACEHOLDER);

/**
 * Every image on the site shows a shimmering skeleton (the `img[data-loading]` rule in
 * globals.css) until it has loaded. Images added later, and lazy images whose source is swapped
 * in, are tracked too; one that fails to load drops the skeleton rather than shimmering forever.
 */
export function useImageSkeletons(): void {
  useEffect(() => {
    const track = (img: HTMLImageElement) => {
      if (pending(img)) img.setAttribute('data-loading', '');
      else img.removeAttribute('data-loading');
    };
    // A load may only be next/image's placeholder, so the image is checked again
    const settle = (event: Event) => {
      if (event.target instanceof HTMLImageElement) track(event.target);
    };

    document.querySelectorAll('img').forEach(track);
    // Load and error don't bubble, so they're caught on the way down
    document.addEventListener('load', settle, true);
    document.addEventListener('error', settle, true);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target instanceof HTMLImageElement) track(mutation.target);
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLImageElement) track(node);
          else if (node instanceof Element) node.querySelectorAll('img').forEach(track);
        });
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'srcset']
    });

    return () => {
      document.removeEventListener('load', settle, true);
      document.removeEventListener('error', settle, true);
      observer.disconnect();
    };
  }, []);
}
