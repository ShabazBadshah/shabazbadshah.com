import { Avatar, Box, Typography } from '@mui/material';

export default function About(): JSX.Element {
  return (
    <>
      <Box display={'flex'} gap={2} alignItems={'center'} mb={2}>
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
            Software Developer
          </Typography>
        </div>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        I'm a Software Developer who develops Fullstack web experiences through a user-centric,
        Product mindset. This site catalogs things I learn, find interesting, want to share, or
        anything cool I'm creating.
      </Typography>
    </>
  );
}
