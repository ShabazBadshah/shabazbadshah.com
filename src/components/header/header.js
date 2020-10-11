import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, ThemeContext } from 'styled-components';
import { Link } from 'gatsby';

import { fadeIn } from 'react-animations';

import { deviceMaxWidth } from '../../media-query-sizes.js';
import DarkModeSwitchButton from './dark-mode-switch-button.js';
import Logo from './logo.js';

const Header = ({ enableDarkMode, onThemeSwitchToggle }) => {
  const { primaryThemeColour } = useContext(ThemeContext);
  const activeNavItemStyle = { color: primaryThemeColour, fontWeight: 'bolder' };

  return (
    <StyledHeader>
      <Link to="/">
        <Logo fillColour={primaryThemeColour} />
      </Link>
      <StyledNavigationWrapper>
        <StyledNavLink activeStyle={activeNavItemStyle} to="/">
          about
        </StyledNavLink>
        <StyledNavLink activeStyle={activeNavItemStyle} to="/work">
          work
        </StyledNavLink>
        <StyledNavLink activeStyle={activeNavItemStyle} to="/blog">
          blog
        </StyledNavLink>
        <DarkModeSwitchButton onToggle={onThemeSwitchToggle} enableDarkMode={enableDarkMode} />
      </StyledNavigationWrapper>
    </StyledHeader>
  );
};

export default Header;

Header.propTypes = {
  enableDarkMode: PropTypes.bool.isRequired,
  onThemeSwitchToggle: PropTypes.func.isRequired,
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
  background-color: ${(props) => props.theme.headerBg};

  padding: 6px 50px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  box-shadow: ${(props) => props.theme.headerDropShadow};

  @media only screen and ${deviceMaxWidth.tablet} {
    padding: 8px 15px;
  }
`;

const StyledNavLink = styled(Link)`
  margin: 5px 15px;

  transition: all 150ms ease-in;
  color: ${(props) => props.theme.headerNavLinkColour};
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    color: ${(props) => props.theme.primaryThemeColour};
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
