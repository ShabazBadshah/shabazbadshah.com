import { Box, Container } from '@mui/material';
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
    <>
      <Box sx={{ display: 'flex' }}>
        <Header extraDrawerContent={extraDrawerContent} />
        <Box
          sx={{
            display: 'block',
            minWidth: 0,
            flex: '1 1 auto',
            py: { xs: 2, sm: 5 },
            background: 'linear-gradient(245deg,#e5f1fb 0%, rgba(255, 255, 255, 1) 40%)'
          }}
        >
          {pageHeader && <Container>{pageHeader}</Container>}
          <Container maxWidth="lg">
            <main>{children}</main>
          </Container>

          <Container maxWidth="lg">
            <Footer extraFooterContent={extraFooterContent} />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
