import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import { FaGithub } from 'react-icons/fa';

import { trackConnectLinkClick } from '@/analytics/tracking';

type SocialProfile = {
  name: string;
  provider: socialMediaProfileProviders;
  url: string;
  IconComponent: React.ReactNode;
  cta: string;
};

export type socialMediaProfileProviders = 'github' | 'linkedin' | 'email';

const profiles: SocialProfile[] = [
  {
    name: '@ShabazBadshah',
    provider: 'github',
    url: 'https://github.com/ShabazBadshah',
    IconComponent: <FaGithub style={{ width: '20px', height: '20px' }} />,
    cta: 'Follow'
  },
  {
    name: '/in/shabaz-badshah/',
    provider: 'linkedin',
    url: 'https://www.linkedin.com/in/shabaz-badshah/',
    IconComponent: <LinkedInIcon htmlColor="#0077B5" style={{ width: '23px', height: '23px' }} />,
    cta: 'Connect'
  },
  {
    name: 'badshah.shabaz.dev@gmail.com',
    provider: 'email',
    url: 'mailto:badshah.shabaz.dev@gmail.comSubject=Hey%20Shabaz',
    IconComponent: <AlternateEmailOutlinedIcon style={{ width: '20px', height: '20px' }} />,
    cta: 'Email'
  }
];

const Socials = (): JSX.Element => {
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
        lineHeight={'20px'}
        fontWeight={500}
        sx={{
          color: 'text.primary',
          fontSize: '16px !important',
          letterSpacing: 0
        }}
      >
        Let's connect
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {profiles.map((profile) => {
          return (
            <Button
              key={profile.name}
              variant="outlined"
              size="small"
              sx={{
                color: 'text.primary',
                py: 0.5,
                borderColor: '#cecece',
                fontWeight: 400,
                width: '100%',
                borderRadius: '100px',
                textAlign: 'center',
                textTransform: 'lowercase',
                '&:hover': {
                  color: 'primary.main',
                  border: '1px solid #085CC5'
                }
              }}
              href={profile.url}
              onClick={() => trackConnectLinkClick(profile.provider)}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                {profile.IconComponent}
                {profile.name}
              </Box>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default Socials;
