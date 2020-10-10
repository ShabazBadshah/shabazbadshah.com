import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Link } from 'gatsby';

import { fadeIn } from 'react-animations';

import { deviceMaxWidth } from '../../media-query-sizes.js';

import { globalThemeColour, darkModeThemeColour } from '../../assets/global-style-constants.js';

import DarkModeSwitchButton from './dark-mode-switch-button.js';
import Logo from './logo.js';

const Header = ({ enableDarkMode }) => {
  const activeNavItemStyle = { color: globalThemeColour, fontWeight: 'bolder' };

  return (
    <StyledHeader enableDarkMode={enableDarkMode}>
      <Link to="/">
        <Logo colour={globalThemeColour} />
      </Link>
      <StyledNavigationWrapper enableDarkMode={enableDarkMode}>
        <StyledNavLink state={{ enableDarkMode }} activeStyle={activeNavItemStyle} to="/">
          about
        </StyledNavLink>
        <StyledNavLink state={{ enableDarkMode }} activeStyle={activeNavItemStyle} to="/work">
          work
        </StyledNavLink>
        <StyledNavLink state={{ enableDarkMode }} activeStyle={activeNavItemStyle} to="/blog">
          blog
        </StyledNavLink>
        <DarkModeSwitchButton />
      </StyledNavigationWrapper>
    </StyledHeader>
  );
};

export default Header;

Header.propTypes = {
  // enableDarkMode default prop set in global-state-context-provider.js
  enableDarkMode: PropTypes.bool.isRequired,
};

const StyledNavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & svg {
    margin: 0 0 0 12px;
  }
`;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  background-color: ${(props) => (props.enableDarkMode ? '#1d1d1d' : '#f9f8f7')};

  padding: 10px 50px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  animation: ${keyframes`${fadeIn}`} 300ms ease-in;
  box-shadow: ${(props) =>
    props.enableDarkMode ? '0 0.6em 3em 0 rgba(0, 0, 0, 0.2)' : '0 0.5em 2em 0 rgba(85, 85, 85, 0.06)'};
  @media only screen and ${deviceMaxWidth.tablet} {
    padding: 10px 15px;
  }
`;

const StyledNavLink = styled(Link)`
  margin: 5px 15px;

  transition: all 150ms ease-in;
  color: ${(props) => (props.state.enableDarkMode ? '#f9f8f7' : darkModeThemeColour)};
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    color: ${globalThemeColour};
    transition: all 150ms ease-in;
    cursor: pointer;
  }

  @media only screen and ${deviceMaxWidth.mobileL} {
    margin: 10px;
  }

  @media only screen and ${deviceMaxWidth.mobileS} {
    margin: 10px;
    font-size: 1.1em;
  }
`;
