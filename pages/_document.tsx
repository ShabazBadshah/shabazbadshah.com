import Document, { Head, Html, Main, NextScript } from 'next/document';

import { siteConfig } from '@/config/site';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang={siteConfig.locale} dir="ltr" className="h-full scroll-smooth scroll-pt-6 sm:scroll-pt-22">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
