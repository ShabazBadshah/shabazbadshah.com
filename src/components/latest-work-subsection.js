/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';

import { fadeIn } from 'react-animations';

import { globalThemeColour, darkModeThemeColour } from '../assets/global-style-constants.js';
import { deviceMaxWidth } from '../../static/media-query-sizes.js';

import { default as workShowcaseData } from '../../content/work/work-showcase.js';

import LinkButton from './link-button.js';

const AMOUNT_WORK_ITEMS_TO_SHOWCASE = 4;

const sortWorkShowCaseItemByDateDesc = (workItemA, workItemB) => {
  const dateA = new Date(workItemA.date);
  const dateB = new Date(workItemB.date);

  if (dateA > dateB) {
    return -1;
  } else if (dateA < dateB) {
    return 1;
  }
  return 0;
};

const WorkHighShowcaseSubsection = ({ enableDarkMode }) => {
  return (
    <StyledWorkHighlightSection>
      <StyledH1>🔎 Selected Works</StyledH1>
      <StyledH2>Here's some of the the things I've built</StyledH2>
      <StyledWorkItemList enableDarkMode={enableDarkMode}>
        {workShowcaseData
          .filter((workData, i) => i < AMOUNT_WORK_ITEMS_TO_SHOWCASE)
          .map((workData, i) => {
            return (
              <StyledListItem to={`${workData.source}`} enableDarkMode={enableDarkMode} key={i}>
                <div>
                  <StyledWorkListItemTitle>{workData.title}</StyledWorkListItemTitle>
                  <StyledWorkListItemDate>{workData.date}</StyledWorkListItemDate>
                </div>
                <StyledWorkListItemBlurb>{workData.description}</StyledWorkListItemBlurb>
                {/* <StyledTagsWrapper>
                  {workData.tags.map((tag, i) => {
                    return <StyledBlogListItemTag key={i}>{tag}</StyledBlogListItemTag>;
                  })}
                </StyledTagsWrapper> */}

                <StyledLinkWrapper>
                  {workData.article && (
                    <StyledLink enableDarkMode={enableDarkMode} href={workData.article}>
                      Article
                    </StyledLink>
                  )}
                  {workData.demo && (
                    <StyledLink enableDarkMode={enableDarkMode} href={workData.demo}>
                      Demo
                    </StyledLink>
                  )}
                </StyledLinkWrapper>
              </StyledListItem>
            );
          })}
      </StyledWorkItemList>
      <LinkButton text="view all work" linkToMoveTo="/work" enableDarkMode={enableDarkMode} />
    </StyledWorkHighlightSection>
  );
};

export default WorkHighShowcaseSubsection;

WorkHighShowcaseSubsection.propTypes = {
  enableDarkMode: PropTypes.bool,
};

WorkHighShowcaseSubsection.defaultProps = {
  enableDarkMode: false,
};

const StyledLink = styled.a`
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  text-underline-offset: 0.2rem;
  cursor: pointer;
  padding: 0.7rem 3rem;
  border-radius: 4px;
  color: #f9f8f7;
  box-shadow: 0.5rem 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.06);
  margin-right: 1rem;
  border: 2px ${globalThemeColour} solid;
  background-color: ${globalThemeColour};

  &:hover {
    border: ${(props) => (props.enableDarkMode ? '2px #f9f8f7 solid' : `2px ${globalThemeColour} solid`)};
    color: ${(props) => (props.enableDarkMode ? '#f9f8f7' : globalThemeColour)};
    background-color: ${(props) => (props.enableDarkMode ? darkModeThemeColour : '#f9f8f7')};
    transform: translateY(-0.1rem);
    transition: all 100ms ease-out;
  }

  @media only screen and ${deviceMaxWidth.mobileL} {
    margin: 0.5rem 0;
    width: 100%;
    margin-right: 0;
  }
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  margin: 1.5rem 0 0.7rem 0;

  @media only screen and ${deviceMaxWidth.mobileL} {
    flex-direction: column;
  }
`;

const StyledWorkListItemBlurb = styled.p`
  margin: 1.5rem 0 0 0;
  font-weight: 400;
  font-style: italic;
  line-height: 1.4rem;

  @media only screen and ${deviceMaxWidth.mobileL} {
    margin: 1.5rem 0;
  }
`;

const StyledWorkItemList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  border-radius: 8px;
  padding: 0;
`;

const StyledListItem = styled(Link)`
  width: 49%;
  padding: 0.8rem 1.4rem;
  margin: 0.5rem 0;

  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: unset;

  box-shadow: ${(props) =>
    props.enableDarkMode ? '0.5rem 0.5rem 1rem 0 rgba(0, 0, 0, 0.01)' : '0.5rem 0.5rem 1rem 0 rgba(85, 85, 85, 0.03)'};
  background-color: ${(props) => (props.enableDarkMode ? '#262525' : 'white')};
  transition: background-color 100ms ease-out;
  border-radius: 5px;
  cursor: pointer;
  border: ${(props) => (props.enableDarkMode ? `1px ${globalThemeColour} solid` : '1px solid #e1e4e8')};

  &:hover {
    transition: background-color 100ms ease-in;
    cursor: pointer;
    background-color: ${(props) => (props.enableDarkMode ? '#444242' : '#f7f7f7')};
  }

  &:nth-child(odd) {
    margin-right: 1rem;
  }

  @media only screen and ${deviceMaxWidth.mobileL} {
    width: 100%;

    &:nth-child(odd) {
      margin-right: 0;
    }
  }
`;

const StyledBlogListItemTag = styled.h5`
  margin: 0 4px;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: 1.5px ${globalThemeColour} solid;
  font-weight: normal;
  color: ${globalThemeColour};
  font-size: 0.9rem;

  &:first-child {
    margin-left: 0;
  }

  @media only screen and ${deviceMaxWidth.mobileL} {
    margin: 0.3rem 0.3rem 0.3rem 0;
  }
`;

const StyledTagsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 2rem 0 0.6rem 0;

  @media only screen and ${deviceMaxWidth.mobileL} {
    margin: 0.6rem 0 0 0;
  }
`;

const StyledWorkListItemDate = styled.h3`
  font-weight: lighter;
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
`;

const StyledWorkListItemTitle = styled.h2`
  margin: 0.5rem 0.5rem 0 0;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.5rem;
  word-spacing: 0.05rem;

  @media only screen and ${deviceMaxWidth.mobileL} {
    margin: 0.75rem 0 0 0;
  }
`;

const StyledH1 = styled.h1`
  margin: 2rem 0 1rem 0;
  font-family: 'Playfair Display', serif;
  font-weight: 800;
  font-size: 4em;
`;

const StyledH2 = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  font-weight: 400;
  font-style: italic;
  word-spacing: 0.1rem;
`;

const StyledWorkHighlightSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 4rem 0;
  width: 1024px;
  animation: ${keyframes`${fadeIn}`} 400ms ease-in;

  @media only screen and ${deviceMaxWidth.laptop} {
    width: 800px;
    max-width: 100%;
  }

  @media only screen and ${deviceMaxWidth.mobileL} {
    flex-direction: column;
    align-items: flex-start;
    margin: 1rem 0 3rem 0;
  }
`;
