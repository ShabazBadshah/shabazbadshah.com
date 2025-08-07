import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, IconButton, SwipeableDrawer, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import About from '@/components/shared/About';
import Link from '@/components/shared/Link';
import Socials from '@/components/shared/Socials';

type Props = {
  extraDrawerContent: React.ReactNode;
};

const HeaderContents = ({
  extraDrawerContent
}: {
  extraDrawerContent: React.ReactNode;
}): JSX.Element => (
  <>
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        marginTop: 0,
        padding: { xs: 3, md: 4 },
        pb: { xs: 5, md: 'initial' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'packed',
        gap: 4
      }}
    >
      {extraDrawerContent ? null : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 2
          }}
        >
          <Box component={Link} href="/" sx={{ mb: 2 }}>
            <Typography
              fontSize="1.1rem"
              fontWeight={600}
              color="text.primary"
              sx={{
                borderBottom: '3px dotted black',
                color: 'text.primary'
              }}
            >
              shabazbadshah.com
            </Typography>
          </Box>
          <About />
        </Box>
      )}
      {extraDrawerContent}
      <Socials />
    </Box>
  </>
);

export default function Header({ extraDrawerContent }: Props): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    if (media.matches !== isMobile) {
      setIsMobile(media.matches);
    }
    const listener = () => setIsMobile(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [isMobile]);

  return (
    <>
      {isMobile && (
        <SwipeableDrawer
          sx={{
            '& > *': {
              display: {
                xs: 'block',
                md: 'none'
              }
            }
          }}
          anchor={'bottom'}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onOpen={() => {
            return;
          }}
          PaperProps={{
            square: false,
            sx: {
              borderTopRightRadius: '14px',
              borderTopLeftRadius: ' 14px',
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0
            }
          }}
        >
          <HeaderContents
            extraDrawerContent={
              <>
                <Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <ExpandMoreIcon
                      sx={{ fontSize: '2rem', mb: 1 }}
                      onClick={() => setIsDrawerOpen(false)}
                    />
                  </Box>
                  <About />
                </Box>
                {extraDrawerContent}
              </>
            }
          />
        </SwipeableDrawer>
      )}

      <IconButton
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          zIndex: 1,
          bottom: 30,
          right: 30,
          width: '50px',
          height: '50px',
          boxShadow: '0px 0px 25px 15px rgba(0,0,0,0.05)',
          backgroundColor: 'black',
          '&:hover': {
            backgroundColor: 'black'
          }
        }}
        onClick={() => setIsDrawerOpen(true)}
      >
        <MoreHorizIcon sx={{ color: 'white', fontSize: '40px' }} />
      </IconButton>

      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          minHeight: '100vh',
          borderRight: '1px solid',
          borderColor: 'divider',
          width: '400px'
        }}
      >
        <HeaderContents extraDrawerContent={extraDrawerContent} />
      </Box>
    </>
  );
}
