import { Link } from 'gatsby';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { bounceIn } from 'react-animations';

import { deviceMaxWidth } from '../../../static/media-query-sizes.js';

import { globalThemeColour, darkModeThemeColour, headerWidthPx } from '../../assets/global-style-constants.js';

import { globalStateContext } from '../../contextProviders/global-state-context-provider.js';

import SocialMediaLinks from '../social-media-icons/social-media-links.js';
import NavHamburgerMenuButton from './nav-hamburger-menu-button.js';
import DarkModeSwitchButton from './dark-mode-switch-button.js';

export default class Header extends Component {
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
          <StyledHeader>
            <StyledCollapsedHeader enableDarkMode={globalState.darkMode.isDarkModeEnabled}>
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
            </StyledCollapsedHeader>

            <StyledHeaderBackgroundBlur isNavDrawerOpen={this.state.isNavDrawerOpen} />

            {this.state.isNavDrawerOpen && (
              <StyledExpandedHeader enableDarkMode={globalState.darkMode.isDarkModeEnabled}>
                <StyledNavLink state={{ enableDarkMode: globalState.darkMode.isDarkModeEnabled }} to="/">
                  about
                </StyledNavLink>
                <StyledNavLink state={{ enableDarkMode: globalState.darkMode.isDarkModeEnabled }} to="/">
                  work
                </StyledNavLink>
                <StyledNavLink state={{ enableDarkMode: globalState.darkMode.isDarkModeEnabled }} to="/">
                  blog
                </StyledNavLink>
              </StyledExpandedHeader>
            )}
          </StyledHeader>
        )}
      </globalStateContext.Consumer>
    );
  }
}

Header.propTypes = {
  headerTitle: PropTypes.string,
};

Header.defaultProps = {
  headerTitle: 'shabaz badshah',
};

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  display: flex;
`;

const StyledHeaderButtonWrap = styled.div`
  position: fixed;
  top: 70px;
  left: 35px;
  z-index: 100;

  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;

  @media ${deviceMaxWidth.laptop} {
    flex-direction: row;
    align-items: flex-start;
    top: 15px;
    left: 15px;
  }
`;

const StyledHeaderBackgroundBlur = styled.div`
  position: fixed;
  width: ${(props) => (props.isNavDrawerOpen ? '100vw' : 0)};
  height: ${(props) => (props.isNavDrawerOpen ? '100vh' : 0)};
  z-index: -1000;

  opacity: ${(props) => (props.isNavDrawerOpen ? 0.85 : 0)};
  background-color: rgba(0, 0, 0, 0.25);
  transition: opacity 250ms ease-in;
`;

const StyledCollapsedHeader = styled.div`
  width: ${headerWidthPx}px;
  padding: 40px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${(props) => (props.enableDarkMode ? darkModeThemeColour : 'white')};
  box-shadow: 10px 0 50px 0 rgba(0, 0, 0, 0.01);

  @media ${deviceMaxWidth.laptop} {
    display: block;
    width: 0;
    padding: 0;
  }
`;

const StyledExpandedHeader = styled.div`
  position: fixed;
  top: 145px;
  left: 76px;
  z-index: 9;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 20px 35px;

  border-radius: 3px;
  background-color: ${(props) => (props.enableDarkMode ? darkModeThemeColour : 'white')};
  border: ${(props) => (props.enableDarkMode ? `1px ${globalThemeColour} solid` : `1px #f5f5f5 solid`)};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.04), 0 1px 3px 1px rgba(60, 64, 67, 0.16);

  animation: ${keyframes`${bounceIn}`} 700ms ease-in-out;
  transform-origin: left top;

  @media ${deviceMaxWidth.laptop} {
    top: 63px;
    left: 40px;
    padding: 30px;
  }
`;

const StyledNavLink = styled(Link)`
  margin: 10px 0;
  padding: 2px 6px;
  width: fit-content;

  transition: all 150ms ease-in;
  color: ${(props) => (props.state.enableDarkMode ? 'white' : darkModeThemeColour)};
  font-size: 1.9rem;
  text-decoration: none;
  border-radius: 2px;
  text-decoration: underline;
  text-decoration-color: ${globalThemeColour};
  text-decoration-thickness: 3px;

  /* Allow Link anchor tags to take up a single line */
  float: left;
  clear: both;

  &:hover,
  &:active {
    background-color: ${globalThemeColour};
    color: white;
    transition: all 150ms ease-in;
    cursor: pointer;
  }

  &:first-child {
    margin-top: none;
  }
`;

const StyledHeaderLink = styled(Link)`
  align-self: center;

  /* Display text vertically */
  writing-mode: vertical-lr;
  text-orientation: sideways;
  transform: scale(-1, -1);

  color: ${globalThemeColour};
  text-decoration: none;
  font-size: 1.3rem;

  & span:first-of-type {
    font-style: normal;
    font-weight: 900;
    margin-bottom: 0.4rem; /* spacing between first word and remainder of string*/
  }

  @media ${deviceMaxWidth.laptop} {
    display: none;
  }
`;
