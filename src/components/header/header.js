import { Link } from 'gatsby';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import { globalThemeColor, darkModeThemeColor, headerWidthPx } from '../../assets/globalStyleConstants.js';

import { globalStateContext } from '../../contextProviders/global-state-context-provider.js';

import SocialMediaLinks from '../social-media-icons/social-media-links.js';
import NavHamburgerMenuButton from './nav-hamburger-menu-button.js';
import DarkModeSwitchButton from './dark-mode-switch-button.js';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavDrawerOpen: false,
    };

    this.wordToEmphasize = this.props.headerTitle.substr(0, this.props.headerTitle.indexOf(' '));
    this.remainingString = this.props.headerTitle.slice(
      this.props.headerTitle.indexOf(' ') + 1,
      this.props.headerTitle.length
    );
  }

  toggleNavDrawer = () => {
    this.setState({ isNavDrawerOpen: !this.state.isNavDrawerOpen });
  };

  render() {
    return (
      <globalStateContext.Consumer>
        {(globalState) => (
          <StyledHeader isNavDrawerOpen={this.state.isNavDrawerOpen}>
            <StyledCollapsedDesktopHeaderContainer enableDarkMode={globalState.darkMode.isDarkModeEnabled}>
              <NavHamburgerMenuButton
                onClickCallback={this.toggleNavDrawer}
                isNavDrawerOpen={this.state.isNavDrawerOpen}
              />
              <DarkModeSwitchButton />
              <StyledHeaderLink to="/">
                <span>{this.wordToEmphasize}</span> {this.remainingString}
              </StyledHeaderLink>
              <SocialMediaLinks />
            </StyledCollapsedDesktopHeaderContainer>

            <StyledExpandedDesktopHeaderContainer
              isNavDrawerOpen={this.state.isNavDrawerOpen}
              enableDarkMode={globalState.darkMode.isDarkModeEnabled}
            >
              <StyledNavLink to="/" enableDarkMode={globalState.darkMode.isDarkModeEnabled}>
                about
              </StyledNavLink>
              <StyledNavLink to="/" enableDarkMode={globalState.darkMode.isDarkModeEnabled}>
                work
              </StyledNavLink>
              <StyledNavLink to="/" enableDarkMode={globalState.darkMode.isDarkModeEnabled}>
                blog
              </StyledNavLink>
            </StyledExpandedDesktopHeaderContainer>
          </StyledHeader>
        )}
      </globalStateContext.Consumer>
    );
  }
}

export default Header;

Header.propTypes = {
  headerTitle: PropTypes.string,
};

Header.defaultProps = {
  headerTitle: 'shabaz badshah',
};

const StyledExpandedDesktopHeaderContainer = styled.div`
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-left: 60px;

  width: ${(props) => (props.isNavDrawerOpen ? '100vw' : 0)};
  opacity: ${(props) => (props.isNavDrawerOpen ? 0.85 : 0)};

  transition: width 0.2s ease-in, opacity 0.2s ease-in;

  background-color: ${(props) => (props.enableDarkMode ? '#2d2d2d' : '#F0F3F5')};
`;

const StyledNavLink = styled(Link)`
  transition: color 0.1s linear;
  color: ${(props) => (props.enableDarkMode ? '#FFFFFF' : '#2d2d2d')};
  font-size: 4rem;
  margin: 10px 0;
  text-decoration: none;
  width: fit-content;

  /* Allow Link anchor tags to take up a single line */
  float: left;
  clear: both;

  &:hover {
    color: ${globalThemeColor};
    transition: color 0.1s linear;
  }

  &:first-child {
    margin-top: none;
  }
`;

const StyledHeader = styled.header`
  height: 100vh;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
`;

const StyledCollapsedDesktopHeaderContainer = styled.div`
  background-color: ${(props) => (props.enableDarkMode ? '#2d2d2d' : '#FFFFFF')};
  box-shadow: 10px 0 50px 0 rgba(0, 0, 0, 0.01);
  height: 100%;
  width: ${headerWidthPx}px;
  padding: 40px 0 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledHeaderLink = styled(Link)`
  position: relative;
  bottom: 60px;

  /* Display text vertically */
  writing-mode: vertical-lr;
  text-orientation: sideways;
  transform: scale(-1, -1);

  align-self: center;

  color: ${globalThemeColor};
  text-decoration: none;
  font-size: 1.3rem;

  & span:first-of-type {
    font-style: normal;
    font-weight: 900;
    margin-bottom: 0.4rem; /* spacing between first word and remainder of string*/
  }
`;
