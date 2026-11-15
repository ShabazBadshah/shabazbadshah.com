import { useReducedMotion } from 'framer-motion';
import { useRouter, type NextRouter } from 'next/router';
import { useEffect } from 'react';

/** The View Transitions API, missing from this TypeScript version's DOM types */
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void>) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

type Navigate = NextRouter['push'];

/** The path a push or replace goes to, as the address bar will show it */
const targetPath = (url: Parameters<Navigate>[0], as?: Parameters<Navigate>[1]): string => {
  const shown = as ?? url;
  const path = typeof shown === 'string' ? shown : shown.pathname ?? window.location.pathname;
  return new URL(path, window.location.href).pathname;
};

/**
 * Every change to a different page: the page shrinks into a card, slides out to the left as the
 * next page's card slides in from the right, and that one grows back to full screen. Wraps the
 * router's push and replace, which every Link and in-site navigation goes through. The browser
 * snapshots both pages (View Transitions API) and the `page-transition` rules in globals.css move
 * them. Staying on the same page (a hash, a query, a shallow route like the blog card's article),
 * browsers without the API, and reduced motion change as usual.
 */
export default function usePageTransitions(): void {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const original = { push: router.push, replace: router.replace };
    const wrap =
      (navigate: Navigate): Navigate =>
      (url, as, options) => {
        const doc = document as ViewTransitionDocument;
        const samePage = targetPath(url, as) === window.location.pathname;
        if (!doc.startViewTransition || reduceMotion || options?.shallow || samePage) {
          return navigate(url, as, options);
        }

        const root = document.documentElement;
        root.classList.add('page-transition');
        return new Promise<boolean>((resolve) => {
          // The new page is snapshotted once the route has changed (or failed to)
          const transition = doc.startViewTransition?.(() =>
            navigate(url, as, options)
              .catch(() => false)
              .then((changed) => resolve(changed))
          );
          // The browser skips the animation (rejecting these) in a hidden tab; the page still changes
          transition?.ready.catch(() => undefined);
          transition?.finished
            .catch(() => undefined)
            .then(() => root.classList.remove('page-transition'));
        });
      };

    router.push = wrap(original.push.bind(router));
    router.replace = wrap(original.replace.bind(router));
    return () => {
      router.push = original.push;
      router.replace = original.replace;
    };
  }, [router, reduceMotion]);
}
