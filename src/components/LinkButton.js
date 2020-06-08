/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { globalThemeColour, darkModeThemeColour } from '../assets/global-style-constants.js';

const LinkButton = ({ text, linkToMoveTo, enableDarkMode }) => {
  return (
    <StyledLinkButton enableDarkMode={enableDarkMode} to={linkToMoveTo}>
      {text}
    </StyledLinkButton>
  );
};

LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  linkToMoveTo: PropTypes.string,
  // enableDarkMode default prop set in global-state-context-provider
  enableDarkMode: PropTypes.bool,
};

LinkButton.defaultProps = {
  enableDarkMode: false,
  linkToMoveTo: '/',
};

export default LinkButton;

const StyledLinkButton = styled(Link)`
  display: block;
  width: fit-content;
  text-decoration: none;
  font-size: 1.5em;
  background-color: ${globalThemeColour};
  color: #f9f8f7;
  box-shadow: 0.5rem 0.5rem 1.5rem 0 rgba(85, 85, 85, 0.15);
  padding: 0.6rem 2rem;
  border: 2px ${globalThemeColour} solid;
  border-radius: 4px;
  margin: 2rem 0;
  letter-spacing: 0.04rem;
  transition: all 100ms ease-in;

  &:hover {
    border: 2px ${globalThemeColour} solid;
    color: ${(props) => (props.enableDarkMode ? '#f9f8f7' : globalThemeColour)};
    background-color: ${(props) => (props.enableDarkMode ? darkModeThemeColour : '#f9f8f7')};
    transform: translateY(-0.2rem);
    transition: all 100ms ease-out;
  }
`;
