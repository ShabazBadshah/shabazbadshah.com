import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import '../../assets/normalize.css';
import '../../assets/base.css';

import { useDarkMode } from '../../hooks/useDarkMode.js';

import Header from '../header';
import Footer from '../footer';

import { theme } from '../../theme/theme.js';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <ThemeProvider theme={darkMode ? theme.DARK : theme.LIGHT}>
      <React.Fragment>
        <Header enableDarkMode={darkMode} onThemeSwitchToggle={() => setDarkMode(!darkMode)} />
        <StyledMain>{children}</StyledMain>
        <Footer />
      </React.Fragment>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: inherit;
  padding: 1.5rem;
  margin-top: 3.4rem;
  background-color: ${(props) => props.theme.siteBg};
  color: ${(props) => props.theme.text};
`;
