/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from 'react';
import './static/normalize.css';
import GlobalStateContextProvider from './src/contextProviders/global-state-context-provider.js';

export const wrapRootElement = ({ element }) => <GlobalStateContextProvider>{element}</GlobalStateContextProvider>;
