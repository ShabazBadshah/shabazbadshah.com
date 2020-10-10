/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { globalThemeColour, darkModeThemeColour } from '../assets/global-style-constants.js';
import { deviceMaxWidth } from '../media-query-sizes.js';

const LinkButton = ({ text, linkToMoveTo, enableDarkMode }) => {
  return (
    <StyledLinkButton state={{ enableDarkMode: enableDarkMode }} to={linkToMoveTo}>
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
  align-self: center;
  width: 50%;
  text-decoration: none;
  font-size: 1.2em;
  background-color: ${globalThemeColour};
  color: #f9f8f7;
  box-shadow: ${(props) =>
    props.state.enableDarkMode
      ? '0.5rem 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.2)'
      : '0.5rem 0.5rem 1.5rem 0 rgba(85, 85, 85, 0.12)'};
  padding: 0.6rem 1rem;
  border: 2px ${globalThemeColour} solid;
  border-radius: 4px;
  margin: 1rem 2rem 0 0;
  letter-spacing: 0.04rem;
  text-align: center;
  transition: all 100ms ease-in;

  &:hover {
    border:  ${(props) => (props.state.enableDarkMode ? '2px #f9f8f7 solid' : `2px ${globalThemeColour} solid`)};
    color: ${(props) => (props.state.enableDarkMode ? '#f9f8f7' : globalThemeColour)};
    background-color: ${(props) => (props.state.enableDarkMode ? darkModeThemeColour : '#f9f8f7')};
    transform: translateY(-0.2rem);
    transition: all 100ms ease-out;
  }

  @media ${deviceMaxWidth.mobileL} {
    width: 100%;
    margin: 1rem 0;
`;
