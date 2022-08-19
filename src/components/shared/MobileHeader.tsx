import React from 'react';
import { SwipeableDrawer, Box, Avatar, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Socials from '@/components/shared/Socials';

type Props = {
  extraDrawerContent: React.ReactNode;
  isOpen: boolean;
  onClosed: () => void;
};

export default function MobileHeader({ extraDrawerContent, isOpen, onClosed }: Props) {
  return (
    <SwipeableDrawer
      anchor={'bottom'}
      open={isOpen}
      onClose={onClosed}
      onOpen={() => {
        return;
      }}
    >
      <Box
        sx={{
          display: 'block',
          minHeight: '100%',
          borderRight: '1px solid',
          borderColor: 'divider',
          width: '100%',
          backgroundColor: 'white'
        }}
      >
        <Box
          sx={{
            width: '100%',
            mt: 2,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <ExpandMoreIcon sx={{ fontSize: '2rem' }} onClick={() => onClosed()} />
        </Box>
        <Box
          sx={{
            position: 'sticky',
            top: '0px',
            marginTop: '0px',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'packed',
            gap: '50px',
            width: '100%',
            height: '100%'
          }}
        >
          {extraDrawerContent ? null : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <Box display={'flex'} gap={2} alignItems={'center'}>
                <Avatar
                  alt="Shabaz Badshah"
                  src="https://avatars.githubusercontent.com/u/4944388?v=4"
                  sx={{ width: 64, height: 64, backgroundColor: 'divider' }}
                >
                  Shabaz Badshah
                </Avatar>
                <div>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '16px !important',
                      letterSpacing: 0,
                      fontWeight: '500',
                      lineHeight: '20px',
                      color: 'text.primary'
                    }}
                  >
                    Shabaz Badshah
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    Product Manager
                  </Typography>
                </div>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                I'm a Product Manager who develops Fullstack web experiences during his downtime.
                This site catalogs things I learn, find interesting, want to share, or anything cool
                I'm creating.
              </Typography>
            </Box>
          )}
          {extraDrawerContent}
          <Socials />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: 'text.primary',
                fontSize: '16px !important',
                letterSpacing: 0,
                fontWeight: '500',
                lineHeight: '20px'
              }}
            >
              CV/Resume
            </Typography>
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: 'text.primary',
                borderColor: '#cecece',
                fontWeight: 400,
                height: 'fit-content',
                borderRadius: '99em',
                textAlign: 'center',
                textTransform: 'capitalize'
              }}
              href={'/'}
            >
              Download PDF
            </Button>
          </Box>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
