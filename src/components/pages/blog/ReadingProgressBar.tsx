import React from 'react';
import Router from 'next/router';
import { AppBar, Box, IconButton, Toolbar, LinearProgress, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fade from '@mui/material/Fade';

export default function ReadingProgressBar(props: any) {
  const { window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: false,
    threshold: 300
  });

  return (
    <Fade in={trigger}>
      <AppBar
        elevation={0}
        sx={{
          zIndex: 1,
          backgroundColor: 'white',
          color: 'text.primary',
          backdropFilter: 'blur(4px)',
          '@media (min-width: 1081px)': { display: 'none' }
        }}
      >
        <Toolbar
          sx={{
            gap: 1,
            maxWidth: '900px',
            width: '100%',
            mx: 'auto',
            p: '0 !important',
            justifyContent: 'flex-start',
            '@media (max-width: 600px)': {
              px: '1rem !important'
            }
          }}
        >
          <IconButton size="small" sx={{ pl: 0 }} onClick={() => Router.push('/')}>
            <HomeIcon sx={{ fontSize: '20px', color: 'black' }} />
          </IconButton>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '16px',
              '@media (max-width: 600px)': {
                fontSize: '14px'
              }
            }}
          >
            {props.text}
          </Typography>
        </Toolbar>
        <Box sx={{ width: '100%' }} ref={props.ref}>
          <LinearProgress variant="determinate" value={props.percent} />
        </Box>
      </AppBar>
    </Fade>
  );
}
