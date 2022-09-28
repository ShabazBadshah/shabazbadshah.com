import * as React from 'react';

import { Box, Grid, Typography, Link, Button } from '@mui/material';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

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
          I'm currently working on{' '}
          <Link
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
          </Link>
        </Typography>

        <Typography mt={1}>
          A competitor monitoring tools for Product Managers that streamlines gathering news and
          updates within their industries
        </Typography>
        <Typography mt={2} fontStyle="italic">
          Is it currently just a glorified RSS reader? Yeah...yeah it is. But not for long{' '}
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
          October 2022
        </Typography>
        <Typography mt={2} lineHeight="1.4rem">
          I finished the final landing page for the site. I'm going to be using it to gauge interest
          in the product and as a place where visitors can get more info. Currently, I'm adding support for user accounts
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
            textTransform: 'capitalize',
            '&:hover': {
              color: 'primary.main',
              border: '1px solid #085CC5'
            }
          }}
          href={
            'https://syftable.com?utm_source=shabazbadshah.com&utm_medium=website_link&utm_campaign=analytics&utm_content=weekly_update_card'
          }
          onClick={() => trackWeeklyUpdateCTAClicked()}
        >
          Check it out here <span style={{ fontSize: '1.2rem' }}>&nbsp; 👀</span>
        </Button>
      </Grid>
    </Grid>
  );
};

export default WeeklySyftableUpdate;
