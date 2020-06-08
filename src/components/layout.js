import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import '../../static/normalize.css';
import '../assets/base.css';

import { deviceMaxWidth } from '../../static/media-query-sizes.js';

import { headerWidthPx } from '../assets/global-style-constants.js';
import { globalStateContext } from '../contextProviders/global-state-context-provider.js';

import Header from './header/header.js';

const Layout = ({ children, pageTitle }) => {
  return (
    <globalStateContext.Consumer>
      {(globalState) => (
        <React.Fragment>
          <GlobalStyle enableDarkMode={globalState.darkMode.isDarkModeEnabled} />
          <Header headerTitle={pageTitle} enableDarkMode={globalState.darkMode.isDarkModeEnabled} />
          <StyledMain>{children}</StyledMain>
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
    max-width: 2560px;
    background-color: ${(props) => (props.enableDarkMode ? '#121212' : '#f9f8f7')};
    color: ${(props) => (props.enableDarkMode ? '#f9f8f7' : '#121212')};
  }
`;

const StyledMain = styled.main`
  @media ${deviceMaxWidth.tablet} {
    padding-top: 20px;
  }
`;
