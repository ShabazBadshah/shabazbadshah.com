/* eslint-disable @typescript-eslint/no-explicit-any */

import { ThemeOptions } from '@mui/material';

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  palette: {
    primary: {
      main: '#085CC5',
      light: '#e1ebf4'
    },
    text: {
      primary: '#1d1d1f',
      postBody: '#1d1d1f',
      disabled: 'rgba(0, 0, 0, 0.48)'
    },
    card: {
      borderColor: '#cecece'
    }
  }
} as any;

export default themeOptions;
