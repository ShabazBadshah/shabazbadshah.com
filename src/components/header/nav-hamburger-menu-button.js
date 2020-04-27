import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import { globalThemeColor } from '../../assets/globalStyleConstants.js';

export const NavHamburgerMenuButton = ({ onClickCallback, isNavDrawerOpen }) =>
  isNavDrawerOpen ? (
    <NavHamburgerMenuButtonContainer
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 61 61"
      onClick={onClickCallback}
    >
      <g transform="translate(-73.8 -517.8)">
        <circle cx="30" cy="30" r="30" transform="translate(73.8 517.8)" fill="#ffffff" />
        <g id="hamburger-menu" transform="translate(88.8 539.3)">
          <rect width="20" height="4" rx="2" transform="translate(10 7)" fill={globalThemeColor} />
          <rect width="30" height="4" rx="2" transform="translate(0 -2)" fill={globalThemeColor} />
          <rect width="10" height="4" rx="2" transform="translate(20 16)" fill={globalThemeColor} />
        </g>
      </g>
    </NavHamburgerMenuButtonContainer>
  ) : (
    <NavHamburgerMenuButtonContainer
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      onClick={onClickCallback}
    >
      <g id="hamburger-menu-icon" transform="translate(-73.8 -517.8)">
        <circle cx="30" cy="30" r="30" transform="translate(73.8 517.8)" fill="#ffffff" />
        <path
          d="M35.6,18.95H13.086L23.427,8.609,20.8,6,6,20.8,20.8,35.6l2.608-2.609L13.086,22.65H35.6Z"
          transform="translate(82.2 527.3)"
          fill={globalThemeColor}
        />
      </g>
    </NavHamburgerMenuButtonContainer>
  );

export default NavHamburgerMenuButton;

const NavHamburgerMenuButtonContainer = styled.svg`
  position: relative;
  top: -35%;
  left: 60%;

  cursor: pointer;

  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.05);
    transition: all 0.1s ease-in-out;
  }
`;
