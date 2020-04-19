/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import '../../static/normalize.css';
import '../assets/base.css';

import { headerWidthPx, darkModeThemeColor } from '../assets/globalStyleConstants.js';
import { globalStateContext } from '../contextProviders/global-state-context-provider.js';

import Header from './header/header';
import GithubLogo from './social-media-icons/github-logo';

const Layout = ({ children }) => {
  return (
    <globalStateContext.Consumer>
      {(globalState) => (
        <React.Fragment>
          <GlobalStyle enableDarkMode={globalState.darkMode.isDarkModeEnabled} />
          <Header />
          <main>{children}</main>
        </React.Fragment>
      )}
    </globalStateContext.Consumer>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

const StyledBody = styled.body`
  min-height: 100%;
  margin-left: ${headerWidthPx}px;
  padding: 50px 100px;
  background-color: ${(props) => (props.enableDarkMode ? darkModeThemeColor : '#FFFFFF')};
`;

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100%;
    margin-left: ${headerWidthPx}px;
    padding: 50px 100px;
    background-color: ${(props) => (props.enableDarkMode ? darkModeThemeColor : '#FFFFFF')};
  }
`;
