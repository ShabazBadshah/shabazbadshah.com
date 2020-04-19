/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { globalStateContext } from '../contextProviders/global-state-context-provider.js';

import Header from './header/header';
import GithubLogo from './social-media-icons/github-logo';

const Layout = ({ children }) => {
  return (
    <globalStateContext.Consumer>
      {(globalState) => (
        <StyledBody enableDarkMode={globalState.darkMode.isDarkModeEnabled}>
          <main>{children}</main>
        </StyledBody>
      )}
    </globalStateContext.Consumer>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

const StyledBody = styled.body`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
  background-color: ${(props) => (props.enableDarkMode ? 'orange' : 'red')};
`;
