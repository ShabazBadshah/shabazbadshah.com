import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import '../../static/normalize.css';
import '../assets/base.css';

import { deviceMaxWidth } from '../../static/media-query-sizes.js';

import { headerWidthPx, darkModeThemeColor } from '../assets/global-style-constants.js';
import { globalStateContext } from '../contextProviders/global-state-context-provider.js';

import Header from './header/header.js';
import GithubLogo from './social-media-icons/github-logo.js';

const Layout = ({ children, pageTitle }) => {
  return (
    <globalStateContext.Consumer>
      {(globalState) => (
        <React.Fragment>
          <GlobalStyle enableDarkMode={globalState.darkMode.isDarkModeEnabled} />
          <Header headerTitle={pageTitle} enableDarkMode={globalState.darkMode.isDarkModeEnabled} />
          <main>{children}</main>
        </React.Fragment>
      )}
    </globalStateContext.Consumer>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string,
};

export default Layout;

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100%;
    margin-left: ${headerWidthPx}px;
    padding: 50px 100px;
    background-color: ${(props) => (props.enableDarkMode ? '#121212' : '#f9f8f7')};
    color: ${(props) => (props.enableDarkMode ? '#f9f8f7' : '#121212')};

    @media ${deviceMaxWidth.laptop} {
      margin-left: 0;
      padding: 15px;
      margin-top: 60px;
    }
  }
`;
