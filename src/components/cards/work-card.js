import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { deviceMaxWidth } from '../../assets/media-query-sizes.js';

const WorkCard = ({ title, date, description, cardLink, span, outline, dropShadow, children }) => {
  return (
    <StyledListItem dropShadow={dropShadow} outline={outline} span={span} to={cardLink}>
      <div>
        <StyledCardTitle>{title}</StyledCardTitle>
        {date && <StyledCardDate>{date}</StyledCardDate>}
      </div>
      <StyledCardDescription>{description}</StyledCardDescription>
      {children}
    </StyledListItem>
  );
};

export default WorkCard;

WorkCard.propTypes = {
  cardLink: PropTypes.string,
  children: PropTypes.node,
  date: PropTypes.string,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  outline: PropTypes.bool,
  span: PropTypes.bool,
  dropShadow: PropTypes.bool,
};

WorkCard.defaultProps = {
  cardLink: '/',
  date: '',
  dropShadow: false,
  outline: false,
  span: false,
};

const StyledListItem = styled(Link)`
  color: unset;
  width: ${(props) => (props.span ? '100%' : '49%')};
  padding: ${(props) => (props.span ? '0.8rem 1.4rem' : '1.3rem 1.5rem 1.3rem 1.5rem')};
  margin: 0.6rem 0;

  display: flex;
  flex-direction: column;
  text-decoration: none;

  box-shadow: ${(props) => (props.dropShadow ? props.theme.cardDropShadow : 'none')};
  background-color: ${(props) => props.theme.cardBgColour};
  border-radius: 5px;
  cursor: pointer;
  border: ${(props) => (props.outline ? props.theme.cardBorder : 'none')};

  &:hover {
    transition: background-color 200ms ease-in;
    cursor: pointer;
    background-color: ${(props) => props.theme.cardHoverColour};
  }

  &:nth-child(odd) {
    margin-right: ${(props) => (props.span ? '0' : '1rem')};
  }

  @media only screen and ${deviceMaxWidth.mobileL} {
    width: 100%;
    padding: ${(props) => (props.span ? '0.8rem 1rem' : '1.3rem 1.5rem 1.3rem 1.5rem')};

    &:nth-child(odd) {
      margin-right: 0;
    }
  }
`;

const StyledCardTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.5rem;
  word-spacing: 0.05rem;
`;

const StyledCardDate = styled.h3`
  font-weight: lighter;
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
`;

const StyledCardDescription = styled.p`
  margin: 1.2rem 0 0 0;
  font-weight: 400;
  font-style: italic;
  line-height: 1.4rem;
`;
