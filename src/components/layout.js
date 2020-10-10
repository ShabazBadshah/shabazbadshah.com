import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import '../../static/normalize.css';
import '../assets/base.css';

import { globalStateContext } from '../contextProviders/global-state-context-provider.js';

import Header from './header/header.js';
import { darkModeThemeColour } from '../assets/global-style-constants';

import { deviceMaxWidth } from '../media-query-sizes.js';

const Layout = ({ children }) => {
  return (
    <globalStateContext.Consumer>
      {(globalState) => (
        <React.Fragment>
          <GlobalStyle enableDarkMode={globalState.darkMode.isDarkModeEnabled} />
          <Header enableDarkMode={globalState.darkMode.isDarkModeEnabled} />
          <StyledMain>{children}</StyledMain>
        </React.Fragment>
      )}
    </globalStateContext.Consumer>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 100%;
    background-color: ${(props) => (props.enableDarkMode ? darkModeThemeColour : '#f9f8f7')};
    color: ${(props) => (props.enableDarkMode ? '#f9f8f7' : '#080708')};
  }

  ::selection {
    /* background: #FAC748; */
  }
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: inherit;
  padding: 1rem;
  margin-top: 4rem;
`;
