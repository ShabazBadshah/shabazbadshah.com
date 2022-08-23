/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */

import React from 'react';
import { Alert, Box, Divider, Typography } from '@mui/material';
import MuiLink from '@mui/material/Link';

const MDXComponents = {
  p: (props: any) => (
    <Typography
      variant="body1"
      sx={{
        color: 'text.postBody',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '18px',
        lineHeight: '30px',
        letterSpacing: '-0.003em',
        mt: 3,
        wordBreak: 'break-word',
        hyphens: 'auto',
        '@media (max-width: 600px)': {
          fontSize: '17px',
          lineHeight: '28px',
          mt: 2
        }
      }}
      {...props}
    />
  ),
  h1: (props: any) => (
    <Typography
      variant="h2"
      sx={{
        mt: 8,
        mb: '-14px',
        fontSize: '24px !important',
        fontWeight: '900',
        lineHeight: '28px',
        letterSpacing: '0',
        '@media (max-width: 600px)': {
          fontSize: '20px !important',
          mt: 5
        }
      }}
      {...props}
    />
  ),
  h2: (props: any) => (
    <Typography
      variant="h3"
      sx={{
        mt: 6,
        mb: '-14px',
        fontSize: '20px !important',
        letterSpacing: '0',
        fontWeight: '900',
        '@media (max-width: 600px)': {
          fontSize: '17px !important',
          mt: 4
        }
      }}
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <Typography
      variant="h2"
      sx={{
        pl: 2,
        my: 4,
        lineHeight: '32px',
        borderLeft: '3px solid ',
        borderColor: 'text.disabled',
        fontStyle: 'italic',
        '& > p': {
          color: 'text.disabled',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '400',
          letterSpacing: '-0.003em',
          lineHeight: 'inherit',
          m: 'unset'
        }
      }}
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      {...props}
      style={{
        paddingLeft: 30,
        marginBottom: 10,
        marginTop: 30
      }}
    />
  ),
  li: (props: any) => (
    <li
      {...props}
      style={{
        listStyleType: 'square',
        marginTop: 10,
        marginBottom: -5,
        fontSize: '18px',
        lineHeight: '32px',
        letterSpacing: '-0.003em',
        paddingLeft: 1
      }}
    />
  ),
  hr: (props: any) => (
    <Divider
      sx={{
        borderWidth: 0,
        textAlign: 'center',
        height: 'auto',
        '&:before': {
          content: '"..."',
          fontSize: '2rem',
          letterSpacing: '16px !important'
        }
      }}
      {...props}
    />
  ),
  a: (props: any) => <MuiLink target="_blank" rel="noopener" {...props} color="inherit" />,
  mark: (props: any) => (
    <Typography
      sx={{
        backgroundColor: 'primary.light',
        fontFamily: 'Roboto, sans-serif',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        color: 'inherit',
        display: 'inline'
      }}
    >
      <mark {...props} style={{ backgroundColor: 'inherit', color: 'inherit' }}>
        {props.children}
      </mark>
    </Typography>
  ),
  figcaption: (props: any) => (
    <figcaption style={{ textAlign: 'center', marginTop: '8px', marginBottom: '16px' }}>
      <Typography
        variant="caption"
        {...props}
        sx={{
          lineHeight: '20px',
          fontSize: '14px',
          color: 'text.disabled',
          letterSpacing: 0
        }}
      ></Typography>
    </figcaption>
  ),
  Alert: (props: any) => (
    <Alert
      sx={{
        backgroundColor: 'background.alt',
        lineHeight: '20px',
        fontSize: '14px',
        letterSpacing: 0,
        my: 3,
        '@media (max-width: 600px)': { my: '1rem' }
      }}
      {...props}
    />
  ),
  SpecialLink: (props: any) => (
    <MuiLink href={props.href} underline="none" color={'inherit'}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 4,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: 2
          }}
        >
          <Typography sx={{ fontWeight: '600', fontSize: '17px' }}>{props.title}</Typography>
          <Typography
            sx={{ color: 'text.postBody', lineHeight: '20px' }}
            gutterBottom
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              lineClamp: '2',
              WebkitBoxOrient: 'vertical'
            }}
          >
            {props.description}
          </Typography>
          <Typography sx={{ color: 'text.disabled', fontSize: '14px' }}>{props.site}</Typography>
        </Box>
        <Box
          sx={{
            backgroundImage: `url(${props.image})`,
            width: '100%',
            maxWidth: '140px',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            '@media (max-width: 600px)': {
              maxWidth: '120px'
            }
          }}
        ></Box>
      </Box>
    </MuiLink>
  ),
  Box: (props: any) => <Box {...props} />,
  Typography: (props: any) => <Typography {...props} />
};

export default MDXComponents;
