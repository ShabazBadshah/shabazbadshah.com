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
  position: sticky;
  top, left, right: 0;

  padding: 20px 60px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media ${deviceMaxWidth.tablet} {
    padding: 15px;
  }
`;

const StyledNavLink = styled(Link)`
  margin: 5px 15px;

  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

  transition: all 150ms ease-in;
  color: ${(props) => (props.state.enableDarkMode ? 'white' : darkModeThemeColour)};
  font-size: 1.2em;
  letter-spacing: 0.1rem;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    color: ${globalThemeColour};
    transition: all 150ms ease-in;
    cursor: pointer;
  }

  @media ${deviceMaxWidth.mobileL} {
    margin: 10px;
    font-size: 1em;
  }
`;
