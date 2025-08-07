import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { Box, Button, Grid, Typography } from '@mui/material';

import { trackWeeklyUpdateCTAClicked } from '@/analytics/tracking';

const WeeklySyftableUpdate = (): JSX.Element => {
  return (
    <Grid
      container
      flexDirection="row-reverse"
      flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
      justifyContent="center"
      alignItems="center"
      gap={4}
    >
      <Grid item xs={12} sm={6}>
        <Typography fontWeight={700}>
          I'm currently working on Syftable v2
          {/* <Link
            href="https://syftable.com?utm_source=shabazbadshah.com&utm_medium=website_link&utm_campaign=analytics&utm_content=description_blurb"
            sx={{ textDecoration: 'none !important' }}
          >
            <Box
              component="span"
              sx={{
                color: 'primary.main',
                borderBottom: '2px dotted black'
              }}
            >
              Syftable
            </Box>
          </Link> */}
        </Typography>

        <Typography mt={1}>
          A tool to help reduce your cognitive overload with all of your digital data, making it
          easier for you to get your work done faster.
        </Typography>
        <Typography mt={2} fontStyle="italic">
          Stay tuned to the blog for updates!
          <span style={{ fontSize: '1.2rem' }}>🚀</span>
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          backgroundColor: '#085CC510',
          padding: '20px',
          borderRadius: '6px',
          border: '1px solid',
          borderColor: 'card.borderColor'
        }}
      >
        <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
          <TipsAndUpdatesOutlinedIcon sx={{ color: 'primary.main' }} />
          <Typography fontSize={'1.15rem'} fontWeight={600}>
            Weekly Syftable Update
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight={500} mt={1}>
          May 2025
        </Typography>
        <Typography mt={2} lineHeight="1.4rem">
          Syftable v1 - the competitor analysis news aggregator is no more :(
        </Typography>
        <Typography lineHeight="1.4rem">
          After 4 months of supporting it, and slowing traction (thanks ChatGPT), I'm going to
          pursue some other projects.
        </Typography>

        <Button
          variant="outlined"
          size="medium"
          sx={{
            mt: 3,
            width: '100%',
            backgroundColor: 'black',
            color: 'white',
            borderColor: 'black',
            fontWeight: 500,
            borderRadius: '99em',
            textTransform: 'unset',
            '&:hover': {
              color: 'primary.main',
              border: '1px solid #085CC5',
              backgroundColor: '#085dc521'
            }
          }}
          href={'https://shabazbadshah.com/blog/posts/syftable-v1-shutting-down'}
          onClick={() => trackWeeklyUpdateCTAClicked()}
        >
          Check out the latest update <span style={{ fontSize: '1.2rem' }}>&nbsp; 👀</span>
        </Button>
      </Grid>
    </Grid>
  );
};

export default WeeklySyftableUpdate;
