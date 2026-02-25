/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * DEPRECATED: This file is no longer used.
 * Theme configuration has been migrated to Tailwind CSS.
 * See tailwind.config.js and src/styles/globals.css for theme configuration.
 */

// Legacy theme configuration - kept for reference only
const legacyThemeOptions = {
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
};

export default legacyThemeOptions;
