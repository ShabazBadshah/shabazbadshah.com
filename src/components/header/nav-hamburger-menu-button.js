import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import { globalThemeColor } from '../../assets/globalStyles.js';

const NavHamburgerMenuButton = ({ backgroundColour, iconColour, diameterPx }) => (
  <NavHamburgerMenuButtonContainer
    xmlns="http://www.w3.org/2000/svg"
    width={diameterPx}
    height={diameterPx}
    viewBox={`0 0 ${diameterPx + 1} ${diameterPx + 1}`}
  >
    <g id="hamburger-menu-icon" transform="translate(-73.8 -517.8)">
      <circle cx="30" cy="30" r="30" transform="translate(73.8 517.8)" fill={backgroundColour} />
      <g id="hamburger-menu" transform="translate(88.8 539.3)">
        <rect width="20" height="4" rx="2" transform="translate(10 7)" fill={iconColour} />
        <rect width="30" height="4" rx="2" transform="translate(0 -2)" fill={iconColour} />
        <rect width="10" height="4" rx="2" transform="translate(20 16)" fill={iconColour} />
      </g>
    </g>
  </NavHamburgerMenuButtonContainer>
);

export default NavHamburgerMenuButton;

NavHamburgerMenuButton.propTypes = {
  backgroundColour: PropTypes.string,
  iconColour: PropTypes.string,
  diameterPx: PropTypes.number,
};

NavHamburgerMenuButton.defaultProps = {
  backgroundColour: '#ffffff',
  iconColour: globalThemeColor,
  diameterPx: 60,
};

const NavHamburgerMenuButtonContainer = styled.svg`
  position: absolute;
  top: 40px;
  left: 65%;

  cursor: pointer;

  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.05);
    transition: all 0.1s ease-in-out;
  }
`;
