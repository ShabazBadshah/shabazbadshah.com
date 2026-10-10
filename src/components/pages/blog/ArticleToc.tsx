import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export type TocItem = { id: string; text: string; level: 2 | 3 };

/** Sticky "On this page" list: muted links, a thin rail on the left and the current section marked on it. */
export default function ArticleToc({
  items,
  collapsible = false
}: {
  items: TocItem[];
  collapsible?: boolean;
}): JSX.Element | null {
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
    <ul className={`ml-0 flex flex-col gap-1.5 pl-0 ${collapsible ? '' : 'items-end'}`}>
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
              className={`block rounded-3xl px-3 py-1.5 text-sm w-fit leading-snug no-underline transition-colors duration-150 hover:bg-fill hover:text-fg ${
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
      <nav aria-label="Table of contents" className="mb-8 rounded-3xl border border-line">
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
      {/* <p className="mb-3 font-medium text-gray-500 md:text-right">Contents</p> */}
      {list}
    </nav>
  );
}
