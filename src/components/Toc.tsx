import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import { content } from '@/content/content';

export type TocItem = { id: string; text: string; level: 2 | 3 };

/** "On this page" list with the current section highlighted; `collapsible` folds it into a dropdown. */
export function Toc({
  items,
  collapsible = false
}: {
  items: TocItem[];
  collapsible?: boolean;
}): JSX.Element | null {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    let frame = 0;
    // The page, or the sheet the article sits in
    let scroller: Element | null = document.scrollingElement;
    const update = () => {
      frame = 0;
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) current = item.id;
      }
      // At the end the last sections can't scroll up to the line, so the last one is current
      if (scroller && scroller.scrollTop > 0) {
        const atEnd = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
        if (atEnd) current = items[items.length - 1]?.id;
      }
      setActive(current);
    };
    const onScroll = (event: Event) => {
      const { target } = event;
      // Not a list or code block scrolling inside the article
      if (target instanceof Element && !target.contains(document.getElementById(items[0]?.id))) {
        return;
      }
      scroller = target instanceof Element ? target : document.scrollingElement;
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
    <ul className="flex flex-col gap-0.5">
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <li key={item.id} className={collapsible ? '' : 'flex min-w-0 max-w-full'}>
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
              className={`block w-fit rounded-3xl px-3 py-1.5 text-sm leading-snug no-underline transition-colors hover:bg-accent-soft hover:text-fg ${
                collapsible ? '' : 'max-w-full truncate'
              } ${item.level === 3 ? 'pr-6 text-[0.8125rem]' : 'font-medium'} ${
                isActive ? 'bg-accent-soft font-medium text-fg' : 'text-fg-muted'
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
      <nav aria-label={content.blog.toc.label} className="mb-8 rounded-3xl border">
        <details className="group">
          <summary className="eyebrow flex cursor-pointer list-none items-center justify-between px-4 py-2 [&::-webkit-details-marker]:hidden">
            {content.blog.toc.summary}
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
      aria-label={content.blog.toc.label}
      className="sticky top-[var(--article-top,7rem)] max-h-[calc(100dvh_-_var(--article-top,7rem)_-_1rem)] overflow-y-auto whitespace-nowrap"
    >
      <p className="mb-2 px-3 text-sm font-semibold leading-snug">{content.blog.toc.summary}</p>
      {list}
    </nav>
  );
}

export default Toc;
