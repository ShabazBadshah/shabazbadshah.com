import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import { LazyMotion, MotionConfig } from 'framer-motion';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

import { trackPageView } from '@/analytics/tracking';
import CardTransitionProvider from '@/components/CardTransition';
import { siteConfig } from '@/config/site';
import { content } from '@/content/content';
import '@/styles/globals.css';

// next-themes is typed for React 18 children; this repo still pins @types/react 17
const ThemeProvider = NextThemesProvider as React.ComponentType<
  React.PropsWithChildren<ThemeProviderProps>
>;

const loadMotionFeatures = () => import('@/lib/motion-features').then((mod) => mod.default);

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <meta
          name="theme-color"
          content={siteConfig.themeColor.light}
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content={siteConfig.themeColor.dark}
          media="(prefers-color-scheme: dark)"
        />
        <link rel="icon" type="image/svg+xml" href={siteConfig.assets.favicon} />
        <link rel="apple-touch-icon" href={siteConfig.assets.touchIcon} />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title={content.seo.llmsLinkTitle}
        />
      </Head>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="lazyOnload"
          />
          <Script id="googleAnalyticsTrackingScript" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {/* Layout/shared-element animation features load after first paint */}
        <LazyMotion features={loadMotionFeatures}>
          <MotionConfig reducedMotion="user">
            <CardTransitionProvider>
              <Component {...pageProps} />
            </CardTransitionProvider>
          </MotionConfig>
        </LazyMotion>
      </ThemeProvider>
    </>
  );
}
