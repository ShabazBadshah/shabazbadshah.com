import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { deviceMaxWidth } from '../../../static/media-query-sizes.js';

import { globalThemeColour, darkModeThemeColour } from '../../assets/global-style-constants.js';

import DarkModeSwitchButton from './dark-mode-switch-button.js';
import Logo from './logo.js';

const Header = ({ enableDarkMode }) => {
  const activeNavItemStyle = { color: globalThemeColour, fontWeight: 'bolder' };

  return (
    <StyledHeader enableDarkMode={enableDarkMode}>
      <div>
        <a href="/">
          <Logo colour={globalThemeColour} />
        </a>
      </div>
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
  // enableDarkMode default prop set in global-state-context-provider
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

  background-color: ${(props) => (props.enableDarkMode ? darkModeThemeColour : '#f9f8f7')};

  padding: 15px 60px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media only screen and ${deviceMaxWidth.tablet} {
    box-shadow: ${(props) =>
      props.enableDarkMode ? '0 0.6em 3em 0 rgba(0, 0, 0, 0.2)' : '0 0.5em 2em 0 rgba(85, 85, 85, 0.035)'};

    padding: 10px 15px;
  }
`;

const StyledNavLink = styled(Link)`
  margin: 5px 15px;

  transition: all 150ms ease-in;
  color: ${(props) => (props.state.enableDarkMode ? '#f9f8f7' : darkModeThemeColour)};
  font-size: 1.2em;
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
