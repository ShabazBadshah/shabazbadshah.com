import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Typography from '@mui/material/Typography';
import Link from '@/components/shared/Link';
import Button from '@mui/material/Button';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

import Post from '@/components/shared/Post';
import PinnedPosts from '@/components/shared/PinnedPosts';

import BlogAPI from '@/services/blog';

import MainLayout from '@/layouts/MainLayout';
import { Post as PostType } from '@services/blog/types';
import { trackWeeklyUpdateCTAClicked } from '@/analytics/tracking';
import SEO from '@/components/shared/SEO';

type Props = {
  posts: PostType[];
  pinnedPosts: PostType[];
};

const Index = ({ posts, pinnedPosts }: Props) => {
  return (
    <MainLayout title={''}>
      <SEO
        pageTitle="Home | shabazbadshah.com"
        metaDescription="I'm a Product Manager who develops Fullstack web experiences during his downtime. This site catalogs things I learn, want to share, or anything cool I'm creating"
      />
      <Container
        disableGutters
        sx={{
          maxWidth: { xs: '700px', md: '900px' },
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          '@media (max-width: 600px)': {
            gap: '1.5rem',
            px: '1.5rem'
          }
        }}
      >
        <Box my={2}>
          <Grid
            container
            flexDirection="row-reverse"
            flexWrap={{ xs: 'wrap', md: 'nowrap' }}
            justifyContent="center"
            alignItems="center"
            gap={3}
          >
            <Grid item md={6}>
              <Typography fontWeight={700}>
                I'm currently working on{' '}
                <Link href="https://syftable.com?utm_source=shabazbadshah.com&utm_medium=website_link&utm_campaign=analytics&utm_content=description_blurb">
                  <Box
                    component="span"
                    sx={{
                      color: 'primary.main',
                      borderBottom: '2px dotted black',
                      textDecorationThickness: '1.25px',
                      textUnderlineOffset: '4px'
                    }}
                  >
                    Syftable
                  </Box>
                </Link>
              </Typography>

              <Typography mt={1}>
                A competitor monitoring tools for Product Managers that streamlines gathering news
                and updates within their industries
              </Typography>
              <Typography mt={2} fontStyle="italic">
                Is it currently just a glorified RSS reader? Yeah...yeah it is. But not for long{' '}
                <span style={{ fontSize: '1.2rem' }}>🚀</span>
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
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
                August 22, 2022
              </Typography>
              <Typography mt={2} lineHeight="1.4rem">
                I finished the final landing page for the site. I'm going to be using it to gauge
                interest in the product and as a place where visitors can get more info.
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
        </Box>

        <Box my={2}>
          <PinnedPosts posts={pinnedPosts} />
        </Box>
        <Box my={6}>
          <Typography
            variant="h3"
            sx={{
              color: 'text.primary',
              fontSize: '16px !important',
              letterSpacing: 0,
              fontWeight: '500',
              lineHeight: '20px',
              mb: 2
            }}
          >
            All Posts
          </Typography>
          {posts.map((post: PostType) => {
            return (
              <Grid
                item
                xs={12}
                key={post.title}
                sx={{
                  '&:last-child': { '& > hr': { display: 'none' } }
                }}
              >
                <Post post={post} />
                <Divider
                  sx={{
                    my: 4,
                    '@media (max-width: 600px)': { my: '1.5rem' }
                  }}
                />
              </Grid>
            );
          })}
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Index;

export const getStaticProps = async () => {
  const apiRef = new BlogAPI();
  const posts = apiRef.getAllPosts();
  return {
    props: {
      posts,
      pinnedPosts: posts.filter((post) => post.pinned)
    }
  };
};
