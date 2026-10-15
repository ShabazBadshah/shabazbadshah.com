/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SocialProvider } from '@/config/site';

// gtag only exists once the (lazy-loaded) Google Analytics script has run
const gtag = (...args: unknown[]): void => (window as any).gtag?.(...args);

export const trackPageView = (url: string): void => {
  if (process.env.NODE_ENV === 'production') {
    gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, { page_path: url });
  }
};

export const trackConnectLinkClick = (provider: SocialProvider): void =>
  gtag('event', 'select_connect_option', { provider });

export const trackPinnedPostClicked = (): void => gtag('event', 'select_pinned_post');
