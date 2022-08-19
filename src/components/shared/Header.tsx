import React from 'react';
import { Avatar, Button, Box, Typography } from '@mui/material';

import Link from '@/components/shared/Link';
import Socials from '@/components/shared/Socials';

type Props = {
  extraDrawerContent: React.ReactNode;
};

export default function Header({ extraDrawerContent }: Props) {
  return (
    <Box
      sx={{
        display: 'block',
        minHeight: '100vh',
        borderRight: '1px solid',
        borderColor: 'divider',
        width: '400px',
        '@media (max-width: 1240px)': {
          width: '280px'
        },
        '@media (max-width: 1080px)': {
          display: 'none'
        }
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: '0px',
          marginTop: '0px',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'packed',
          gap: '60px',
          width: '100%'
        }}
      >
        {extraDrawerContent ? null : (
          <Box
            // user info
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
              I'm a Product Manager who develops Fullstack web experiences during his downtime. This
              site catalogs things I learn, find interesting, want to share, or anything cool I'm
              creating.
            </Typography>
          </Box>
        )}
        {extraDrawerContent}
        <Socials />
      </Box>
    </Box>
  );
}
