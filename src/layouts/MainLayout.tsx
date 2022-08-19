import React, { useState } from 'react';

import { Divider, IconButton, Box, Container, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Link from '@/components/shared/Link';
import Header from '@/components/shared/Header';
import MobileHeader from '@/components/shared/MobileHeader';

type Props = {
  title?: React.ReactNode;
  extraDrawerContent?: React.ReactNode;
  extraFooterContent?: React.ReactNode;
  children: React.ReactNode;
};

const MainLayout = ({ title, extraDrawerContent, extraFooterContent, children }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Header extraDrawerContent={extraDrawerContent} />
        <Box sx={{ display: 'block', minWidth: 0, flex: '1 1 auto' }}>
          <Container
            disableGutters
            sx={{
              maxWidth: { xs: '700px', md: '900px' },
              py: '2rem',
              '@media (max-width: 600px)': {
                py: '1rem',
                px: '1.5rem'
              }
            }}
          >
            <Typography
              variant="h4"
              sx={{
                lineHeight: '52px',
                fontWeight: '700',
                '& > a': {
                  color: 'text.primary',
                  textDecoration: 'none'
                },
                '@media (max-width: 600px)': {
                  fontSize: '22px'
                }
              }}
            >
              <Link href="/">{title}</Link>
            </Typography>
          </Container>
          <main>{children}</main>
          <footer>
            <Container
              disableGutters
              sx={{
                backgroundColor: 'background.alt',
                pb: '4rem',

                maxWidth: 'unset !important'
              }}
            >
              <Container
                disableGutters
                sx={{
                  maxWidth: { xs: '700px', md: '900px' },
                  '@media (max-width: 600px)': {
                    px: '1.5rem'
                  }
                }}
              >
                {extraFooterContent}
                <Divider sx={{ my: '2rem' }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 4, md: 'unset' },
                    color: 'text.disabled'
                  }}
                >
                  <Typography variant="body2">
                    ©{new Date().getFullYear()} built by Shabaz Badshah
                  </Typography>
                </Box>
              </Container>
            </Container>
          </footer>
        </Box>
      </Box>

      <MobileHeader
        extraDrawerContent={extraDrawerContent}
        isOpen={isDrawerOpen}
        onClosed={() => setIsDrawerOpen(!isDrawerOpen)}
      />

      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          bottom: 30,
          right: 30
        }}
      >
        <IconButton
          sx={{
            boxShadow: '0px 0px 25px 15px rgba(0,0,0,0.05)',
            backgroundColor: 'black',
            '&:hover': {
              backgroundColor: 'black'
            }
          }}
          onClick={() => {
            setIsDrawerOpen(!isDrawerOpen);
            console.log(isDrawerOpen);
          }}
        >
          <MoreHorizIcon sx={{ color: 'white', fontSize: '40px' }} />
        </IconButton>
      </Box>
    </>
  );
};

export default MainLayout;
