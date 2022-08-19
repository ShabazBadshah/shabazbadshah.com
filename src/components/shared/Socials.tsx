import React from 'react';
import { Avatar, Box, Button, Stack, Typography, Grid } from '@mui/material';

import { trackConnectLinkClick } from '@/analytics/tracking';

type SocialProfile = {
  name: string;
  provider: socialMediaProfileProviders;
  url: string;
  icon: string;
  cta: string;
};
export type socialMediaProfileProviders = 'github' | 'linkedin' | 'email';

const profiles: SocialProfile[] = [
  {
    name: '@ShabazBadshah',
    provider: 'github',
    url: 'https://github.com/ShabazBadshah',
    icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
    cta: 'Follow'
  },
  {
    name: '/in/shabaz-badshah/',
    provider: 'linkedin',
    url: 'https://www.linkedin.com/in/shabaz-badshah/',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png',
    cta: 'Connect'
  },
  {
    name: 'badshah.shabaz.dev@gmail.com',
    provider: 'email',
    url: 'mailto:badshah.shabaz.dev@gmail.comSubject=Hey%20Shabaz',
    icon: 'https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/send-icon.png',
    cta: 'Email'
  }
];

const socials = () => {
  return (
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
        Let's connect
      </Typography>
      <Grid display="flex" flexDirection="column" gap={2}>
        {profiles.map((profile) => {
          return (
            <Box
              key={profile.name}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <Avatar
                    variant="square"
                    alt="avatar"
                    src={profile.icon}
                    sx={{ width: 20, height: 20, mr: 1 }}
                  />
                </Box>
                <Box>
                  <Typography fontSize={14} sx={{ fontWeight: 500 }}>
                    {profile.name}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: 'text.primary',
                  borderColor: '#cecece',
                  fontWeight: 400,
                  height: 'fit-content',
                  width: '70px',
                  borderRadius: '100px',
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  '&:hover': {
                    color: 'primary.main',
                    border: '1px solid #085CC5'
                  }
                }}
                href={profile.url}
                onClick={() => trackConnectLinkClick(profile.provider)}
              >
                {profile.cta}
              </Button>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};

export default socials;
