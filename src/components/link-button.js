import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { globalThemeColour } from '../assets/global-style-constants.js';
import { deviceMaxWidth } from '../media-query-sizes.js';

const LinkButton = ({ text, linkToMoveTo }) => {
  return <StyledLinkButton to={linkToMoveTo}>{text}</StyledLinkButton>;
};

LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  linkToMoveTo: PropTypes.string,
};

LinkButton.defaultProps = {
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
  box-shadow: ${(props) => props.theme.linkButtonBorder};
  padding: 0.6rem 1rem;
  border: 2px ${globalThemeColour} solid;
  border-radius: 4px;
  margin: 1rem 2rem 0 0;
  letter-spacing: 0.04rem;
  text-align: center;
  transition: all 100ms ease-in;

  &:hover {
    border: ${(props) => props.theme.linkButtonHoverBorder};
    color: ${(props) => props.theme.linkButtonTextColour};
    background-color: ${(props) => props.theme.linkButtonHoverColour};
    transform: translateY(-0.2rem);
    transition: all 100ms ease-out;
  }

  @media ${deviceMaxWidth.mobileL} {
    width: 100%;
    margin: 1rem 0;
  }
`;
