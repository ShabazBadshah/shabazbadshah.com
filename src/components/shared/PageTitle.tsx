import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import Link from '@/components/shared/Link';

type Props = {
  children: React.ReactNode;
  href?: string;
};

const StyledPageTitle = ({ children }: { children: React.ReactNode }) => (
  <>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <IconButton
        component={Link}
        href="/"
        sx={{
          width: 'fit-content',
          ml: '-10px',
          borderRadius: '6px',
          '&:hover': {
            backgroundColor: '#eaf1f7'
          }
        }}
      >
        <HomeIcon sx={{ color: 'text.primary' }} />
      </IconButton>
    </Box>
    <Typography
      variant="h5"
      fontWeight={600}
      lineHeight={'52px'}
      fontSize={{ xs: '22px', sm: 'unset' }}
      sx={{
        '& > a': {
          color: 'text.primary',
          textDecoration: 'none'
        },
        mt: 2,
        pb: 4
      }}
    >
      {children}
    </Typography>
  </>
);

const PageTitle = ({ children, href }: Props): JSX.Element => {
  if (href && href.trim().length !== 0) {
    return (
      <Link href={href}>
        <StyledPageTitle>{children}</StyledPageTitle>
      </Link>
    );
  }
  return <StyledPageTitle>{children}</StyledPageTitle>;
};

export default PageTitle;
