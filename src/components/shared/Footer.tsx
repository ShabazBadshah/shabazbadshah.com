import React from 'react';

import { Divider, Box, Typography } from '@mui/material';

type Props = {
  extraFooterContent?: React.ReactNode;
};

const Footer = ({ extraFooterContent }: Props): JSX.Element => {
  return (
    <footer>
      <Box
        sx={{
          backgroundColor: 'background.alt',
          pb: 8
        }}
      >
        {extraFooterContent}
        <Divider sx={{ my: 4 }} />
        <Typography variant="body2">©{new Date().getFullYear()} built by Shabaz Badshah</Typography>
      </Box>
    </footer>
  );
};

export default Footer;
