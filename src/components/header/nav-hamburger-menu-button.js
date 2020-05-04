import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import bounceOut from 'react-animations';

import { deviceMaxWidth } from '../../../static/media-query-sizes.js';

import { globalThemeColour } from '../../assets/global-style-constants.js';

const NavHamburgerMenuButton = ({ onClickCallback, isNavDrawerOpen }) =>
  isNavDrawerOpen ? (
    <NavHamburgerMenuButtonContainer
      xmlns="http://www.w3.org/2000/svg"
      width="55"
      height="55"
      viewBox="0 0 60 60"
      onClick={onClickCallback}
    >
      <g id="hamburger-menu-icon" transform="translate(-73.8 -517.8)">
        <circle cx="30" cy="30" r="30" transform="translate(73.8 517.8)" fill={globalThemeColour} />
        <path
          d="M35.6,18.95H13.086L23.427,8.609,20.8,6,6,20.8,20.8,35.6l2.608-2.609L13.086,22.65H35.6Z"
          transform="translate(82.2 527.3)"
          fill="#ffffff"
        />
      </g>
    </NavHamburgerMenuButtonContainer>
  ) : (
    <NavHamburgerMenuButtonContainer
      xmlns="http://www.w3.org/2000/svg"
      width="55"
      height="55"
      viewBox="0 0 61 61"
      onClick={onClickCallback}
    >
      <g transform="translate(-73.8 -517.8)">
        <circle cx="30" cy="30" r="30" transform="translate(73.8 517.8)" fill={globalThemeColour} />
        <g id="hamburger-menu" transform="translate(88.8 539.3)">
          <rect width="20" height="4" rx="2" transform="translate(10 7)" fill="#ffffff" />
          <rect width="30" height="4" rx="2" transform="translate(0 -2)" fill="#ffffff" />
          <rect width="10" height="4" rx="2" transform="translate(20 16)" fill="#ffffff" />
        </g>
      </g>
    </NavHamburgerMenuButtonContainer>
  );

export default NavHamburgerMenuButton;

const NavHamburgerMenuButtonContainer = styled.svg`
  z-index: 10;
  margin-top: 10px;

  cursor: pointer;

  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.05);
    transition: all 0.1s ease-in-out;
  }

  @media ${deviceMaxWidth.laptop} {
    margin-top: 0;
    margin-right: 10px;
  }
`;
