import React from 'react';

import Header from '@/components/shared/Header';
import Footer from '../components/shared/Footer';

type Props = {
  pageHeader?: React.ReactNode;
  extraDrawerContent?: React.ReactNode;
  extraFooterContent?: React.ReactNode;
  children: React.ReactNode;
};

const MainLayout = ({
  pageHeader,
  extraDrawerContent,
  extraFooterContent,
  children
}: Props): JSX.Element => {
  return (
    <div className="flex">
      <Header extraDrawerContent={extraDrawerContent} />
      <div className="block min-w-0 flex-1 py-2 sm:py-5">
        {pageHeader && <div className="container">{pageHeader}</div>}
        <div className="container flex justify-center">
          <div className="max-w-7xl px-0 lg:px-2">{children}</div>
        </div>

        <div className="container">
          <Footer extraFooterContent={extraFooterContent} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
