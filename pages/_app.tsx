import React, { useEffect } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import { trackPageView } from '@/analytics/tracking';
import getCanonicalUrl from '@/utils/path/get-canonical-url';
import '@/styles/global.scss';
import '@/styles/globals.css';

export default function App(props: AppProps): React.ReactNode {
  const { Component, pageProps, router } = props;

  const handleRouteChange = () => trackPageView(window.location.pathname);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Home | Badshah Consulting</title>
        <link rel="shortcut icon" type="image/png" href="/images/favicon.png" />
        <meta content="initial-scale=1, width=device-width, user-scalable=yes" name="viewport" />
        <meta
          content="I'm a Product Manager who develops Fullstack web experiences during his downtime. This site catalogs things I learn, want to share, or anything cool I'm creating"
          name="description"
        />
        <link rel="canonical" href={getCanonicalUrl('https://shabazbadshah.com', router.asPath)} />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                page_path: window.location.pathname
              });`
          }}
          id="googleAnalyticsTrackingScript"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
