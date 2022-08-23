/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { EVENT_NAMES } from '@/analytics/event-names';
import { socialMediaProfileProviders } from '@/components/shared/Socials';

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackPageView = (url: string): void => {
  // Gtag not existing fix: https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window
  if (window && (window as any).gtag && NODE_ENV === 'production') {
    // @ts-ignore
    window?.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
      page_path: url
    });
  }
};

export const trackConnectLinkClick = (provider: socialMediaProfileProviders): void => {
  if (window && (window as any).gtag) {
    // @ts-ignore
    window?.gtag('event', EVENT_NAMES.SELECT_CONNECT_OPTION, {
      provider
    });
  }
};

export const trackPinnedPostClicked = (): void => {
  if (window && (window as any).gtag) {
    // @ts-ignore
    window?.gtag('event', EVENT_NAMES.SELECT_PINNED_POST);
  }
};

export const trackWeeklyUpdateCTAClicked = (): void => {
  if (window && (window as any).gtag) {
    // @ts-ignore
    window?.gtag('event', EVENT_NAMES.SELECT_WEEKLY_UPDATE_CTA);
  }
};
