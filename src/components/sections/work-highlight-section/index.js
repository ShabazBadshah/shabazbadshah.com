/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';

import { fadeIn } from 'react-animations';

import { deviceMaxWidth } from '../../../assets/media-query-sizes.js';

import { default as workShowcaseData } from '../../../../content/work/work-showcase.js';

import { LinkButton } from '../../buttons';

const AMOUNT_WORK_ITEMS_TO_SHOWCASE = 4;

const WorkHighShowcaseSubsection = () => {
  return (
    <StyledWorkHighlightSection>
      <StyledH1>🔎 Selected Works</StyledH1>
      <StyledH2>Here's some of the the things I've built</StyledH2>
      <StyledWorkItemList>
        {workShowcaseData
          .filter((workData, i) => i < AMOUNT_WORK_ITEMS_TO_SHOWCASE)
          .map((workData, i) => {
            return (
              <StyledListItem to={`${workData.source}`} key={i}>
                <StyledWorkLinkSourceWrapper to={workData.source}>
                  <div>
                    <StyledWorkListItemTitle>{workData.title}</StyledWorkListItemTitle>
                    <StyledWorkListItemDate>{workData.date}</StyledWorkListItemDate>
                  </div>
                  <StyledWorkListItemBlurb>{workData.description}</StyledWorkListItemBlurb>
                  <StyledLinkWrapper>
                    {workData.article && <StyledLink to={workData.article}>Article</StyledLink>}
                    {workData.demo && <StyledLink to={workData.demo}>Demo</StyledLink>}
                  </StyledLinkWrapper>
                </StyledWorkLinkSourceWrapper>
              </StyledListItem>
            );
          })}
      </StyledWorkItemList>
      <LinkButton text="view all work" linkToMoveTo="/work" />
    </StyledWorkHighlightSection>
  );
};

export default WorkHighShowcaseSubsection;

const StyledWorkLinkSourceWrapper = styled(Link)`
  text-decoration: none;
  color: unset;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  text-underline-offset: 0.2rem;
  cursor: pointer;
  padding: 0.5rem 2rem;
  border-radius: 4px;
  color: #f9f8f7;
  box-shadow: 0.5rem 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.06);
  margin-top: 8px;
  margin-right: 1.5rem;
  border: ${(props) => `2px ${props.theme.primaryThemeColour} solid`};
  background-color: ${(props) => props.theme.primaryThemeColour};

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    border: ${(props) => props.theme.linkButtonSmallBorder};
    color: ${(props) => props.theme.linkButtonTextColour};
    background-color: ${(props) => props.theme.linkButtonHoverColour};
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
  margin: 0.7rem 0 0 0;

  @media only screen and ${deviceMaxWidth.mobileL} {
    flex-direction: column;
  }
`;

const StyledWorkListItemBlurb = styled.p`
  margin: 1.5rem 0 0 0;
  font-weight: 400;
  font-style: italic;
  line-height: 1.4rem;
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

const StyledListItem = styled.div`
  width: 49%;
  padding: 1rem 1.4rem 1.2rem 1.4rem;
  margin: 0.5rem 0;

  display: flex;
  flex-direction: column;
  text-decoration: none;

  box-shadow: ${(props) => props.theme.cardDropShadow};
  background-color: ${(props) => props.theme.cardBgColour};
  transition: background-color 100ms ease-out;
  border-radius: 5px;
  cursor: pointer;
  border: ${(props) => props.theme.cardBorder};

  &:hover {
    transition: background-color 100ms ease-in;
    cursor: pointer;
    background-color: ${(props) => props.theme.cardHoverColour};
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

const StyledWorkListItemDate = styled.h3`
  font-weight: lighter;
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
`;

const StyledWorkListItemTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.5rem;
  word-spacing: 0.05rem;
`;

const StyledH1 = styled.h1`
  margin: 2rem 0 1rem 0;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 800;
  font-size: 3.2rem;
`;

const StyledH2 = styled.h2`
  font-size: 1.15rem;
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
