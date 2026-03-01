import React from 'react';

import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

type Props = {
  pageHeader?: React.ReactNode;
  extraDrawerContent?: React.ReactNode;
  extraFooterContent?: React.ReactNode;
  children: React.ReactNode;
};

const MainLayout = ({ pageHeader, children }: Props): JSX.Element => {
  return (
    <div className="flex">
      <Header />
      <div className="min-w-0 flex-1 px-4 py-2 sm:py-5 relative">
        {pageHeader && <div className="container">{pageHeader}</div>}
        <div className="flex justify-center w-full">
          <div className="max-w-[1440px]">{children}</div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-[1440px]">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
