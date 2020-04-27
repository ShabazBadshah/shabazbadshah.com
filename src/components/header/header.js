import { Link } from 'gatsby';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { globalThemeColor, headerWidthPx } from '../../assets/globalStyleConstants.js';

import SocialMediaLinks from '../social-media-icons/social-media-links.js';
import NavHamburgerMenuButton from './nav-hamburger-menu-button.js';
import DarkModeSwitchButton from './dark-mode-switch-button.js';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavDrawerOpen: true,
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
      <StyledHeader isNavDrawerOpen={this.state.isNavDrawerOpen}>
        {!this.state.isNavDrawerOpen && (
          <StyledExpandedDesktopHeaderContainer>
            <StyledNavLink to="/">about</StyledNavLink>
            <StyledNavLink to="/">work</StyledNavLink>
            <StyledNavLink to="/">blog</StyledNavLink>
          </StyledExpandedDesktopHeaderContainer>
        )}
        <StyledCollapsedDesktopHeaderContainer>
          <NavHamburgerMenuButton onClickCallback={this.toggleNavDrawer} isNavDrawerOpen={this.state.isNavDrawerOpen} />
          <DarkModeSwitchButton />
          <StyledHeaderLink to="/">
            <span>{this.wordToEmphasize}</span> {this.remainingString}{' '}
          </StyledHeaderLink>
          <SocialMediaLinks />
        </StyledCollapsedDesktopHeaderContainer>
      </StyledHeader>
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
  padding: 30px 0 40px 40px;
  height: inherit;
  background-color: ${globalThemeColor};
  z-index: 1;
`;

const StyledNavLink = styled(Link)`
  color: white;
  font-size: 4rem;
  font-weight: bold;
  margin: 10px 0;
  text-decoration: none;

  /* Allow Link anchor tags to take up a single line */
  float: left;
  clear: both;

  &:first-child {
    margin-top: 0;
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
  background-color: ${globalThemeColor};
  box-shadow: 10px 0 50px 0 rgba(0, 0, 0, 0.15);
  height: 100%;
  width: ${headerWidthPx}px;
  padding: 40px 0 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledHeaderLink = styled(Link)`
  /* Display text vertically */
  writing-mode: vertical-lr;
  text-orientation: sideways;
  transform: scale(-1, -1);

  align-self: center;

  color: white;
  text-decoration: none;
  font-size: 2em;

  & span:first-of-type {
    font-style: normal;
    font-weight: 900;
    margin-bottom: 0.4em; /* spacing between first word and remainder of string*/
  }
`;
