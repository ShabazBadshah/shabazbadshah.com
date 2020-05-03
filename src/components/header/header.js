import { Link } from 'gatsby';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { bounceIn } from 'react-animations';

import { device } from '../../../static/media-query-sizes.js';

import { globalThemeColour, darkModeThemeColor, headerWidthPx } from '../../assets/globalStyleConstants.js';

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
              <StyledHeaderButtonWrap>
                <NavHamburgerMenuButton
                  onClickCallback={this.toggleNavDrawer}
                  isNavDrawerOpen={this.state.isNavDrawerOpen}
                />
                <DarkModeSwitchButton />
              </StyledHeaderButtonWrap>
              <StyledHeaderLink to="/">
                <span>{this.wordToEmphasize}</span> {this.remainingString}
              </StyledHeaderLink>
              <SocialMediaLinks enableDarkMode={globalState.darkMode.isDarkModeEnabled} />
            </StyledCollapsedDesktopHeaderContainer>
            <StyledHeaderBackgroundBlur isNavDrawerOpen={this.state.isNavDrawerOpen} />
            {this.state.isNavDrawerOpen && (
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
            )}
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

const StyledHeaderButtonWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  position: fixed;
  top: 70px;
  left: 35px;
  z-index: 100;

  @media ${device.laptop} {
    flex-direction: row;
    align-items: flex-start;
    top: 10px;
    left: 10px;
  }
`;

const StyledHeaderBackgroundBlur = styled.div`
  position: fixed;
  z-index: -1000;
  background-color: rgba(0, 0, 0, 0.25);
  opacity: ${(props) => (props.isNavDrawerOpen ? 0.85 : 0)};
  transition: opacity 250ms ease-in;
  width: ${(props) => (props.isNavDrawerOpen ? '100vw' : 0)};
  height: ${(props) => (props.isNavDrawerOpen ? '100vh' : 0)};
`;

const StyledExpandedDesktopHeaderContainer = styled.div`
  position: fixed;
  top: 145px;
  border-radius: 4px;
  left: 80px;
  z-index: 9;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: ${(props) => (props.enableDarkMode ? `1px ${globalThemeColour} solid` : 'none')};

  padding: 20px 50px;
  box-shadow: 10px 0 50px 0 rgba(0, 0, 0, 0.04);

  height: fit-content;

  animation: ${keyframes`${bounceIn}`} 700ms ease-in-out;
  transform-origin: left top;

  background-color: ${(props) => (props.enableDarkMode ? '#2d2d2d' : 'white')};

  @media ${device.laptop} {
    top: 60px;
    left: 40px;
    padding: 30px 30px;
  }
`;

const StyledNavLink = styled(Link)`
  transition: color 0.2s linear;
  color: ${(props) => (props.enableDarkMode ? '#FFFFFF' : '#2d2d2d')};
  font-size: 1.9rem;
  margin: 10px 0;
  text-decoration: none;
  width: fit-content;

  /* Allow Link anchor tags to take up a single line */
  float: left;
  clear: both;

  &:hover {
    color: ${globalThemeColour};
    transition: color 0.1s linear;
    cursor: pointer;
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

  @media ${device.laptop} {
    display: block;
    width: 0;
    padding: 0;
  }
`;

const StyledHeaderLink = styled(Link)`
  position: relative;
  bottom: 60px;

  /* Display text vertically */
  writing-mode: vertical-lr;
  text-orientation: sideways;
  transform: scale(-1, -1);

  align-self: center;

  color: ${globalThemeColour};
  text-decoration: none;
  font-size: 1.3rem;

  & span:first-of-type {
    font-style: normal;
    font-weight: 900;
    margin-bottom: 0.4rem; /* spacing between first word and remainder of string*/
  }

  @media ${device.laptop} {
    display: none;
  }
`;
