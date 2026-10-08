import React from 'react';

import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import ScrollToTop from '@/components/shared/ScrollToTop';

type Props = {
  children: React.ReactNode;
  /** Full-bleed card-coloured page, the destination of the card-expand transition */
  sheet?: boolean;
};

const MainLayout = ({ children, sheet = false }: Props): JSX.Element => {
  const Wrapper = sheet ? 'div' : React.Fragment;
  return (
    <Wrapper {...(sheet ? { className: 'min-h-dvh bg' } : {})}>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-50 rounded-pill bg-accent px-4 py-2 text-accent-fg"
      >
        Skip to content
      </a>
      <Header />
      <main
        id="main"
        className={`mx-auto w-full px-4 pb-16 pt-24 sm:px-6 sm:pt-28 ${
          sheet ? 'max-w-8xl' : 'max-w-5xl'
        }`}
      >
        {children}
      </main>
      <Footer narrow={sheet} />
      <ScrollToTop />
    </Wrapper>
  );
};

export default MainLayout;
