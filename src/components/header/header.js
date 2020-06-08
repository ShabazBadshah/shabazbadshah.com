import { Link } from 'gatsby';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { bounceIn } from 'react-animations';

import { deviceMaxWidth } from '../../../static/media-query-sizes.js';

import { globalThemeColour, darkModeThemeColour, headerWidthPx } from '../../assets/global-style-constants.js';

import SocialMediaLinks from '../social-media-links.js';
import NavHamburgerMenuButton from './nav-hamburger-menu-button.js';
import DarkModeSwitchButton from './dark-mode-switch-button.js';
import Logo from './logo.js';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavDrawerOpen: false,
      currentlySelectedItem: 'about',
    };
  }

  toggleNavDrawer = () => {
    this.setState({ isNavDrawerOpen: !this.state.isNavDrawerOpen });
  };

  render() {
    return (
      <StyledHeader enableDarkMode={this.props.enableDarkMode}>
        <a href="/">
          <Logo colour={globalThemeColour} />
        </a>
        <StyledNavigationWrapper enableDarkMode={this.props.enableDarkMode}>
          <StyledNavLink
            state={{ enableDarkMode: this.props.enableDarkMode }}
            activeStyle={{ color: globalThemeColour, fontWeight: 'bolder' }}
            to="/"
          >
            about
          </StyledNavLink>
          <StyledNavLink
            state={{ enableDarkMode: this.props.enableDarkMode }}
            activeStyle={{ color: globalThemeColour }}
            to="/work"
          >
            work
          </StyledNavLink>
          <StyledNavLink
            state={{ enableDarkMode: this.props.enableDarkMode }}
            activeStyle={{ color: globalThemeColour }}
            to="/blog"
          >
            blog
          </StyledNavLink>
          <DarkModeSwitchButton />
        </StyledNavigationWrapper>
      </StyledHeader>
    );
  }
}

export default Header;

Header.propTypes = {
  headerTitle: PropTypes.string,
  enableDarkMode: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  headerTitle: 'shabaz badshah',
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
  top: 0;
  left: 0;
  right: 0;

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

const StyledHeaderLink = styled(Link)`
  align-self: center;

  color: ${globalThemeColour};
  text-decoration: none;
  font-size: 1.1rem;

  & span:first-of-type {
    font-style: normal;
    font-weight: 900;
    margin-bottom: 0.4rem; /* spacing between first word and remainder of string*/
  }
`;
