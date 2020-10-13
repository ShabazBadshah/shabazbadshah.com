/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';

import { fadeIn } from 'react-animations';

import { deviceMaxWidth } from '../assets/media-query-sizes.js';
import { default as workShowcaseData } from '../../content/work/work-showcase.js';

import { Layout } from '../components/layouts';
import { WorkCard } from '../components/cards';
import SEO from '../components/seo';

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

const AllWork = () => {
  return (
    <Layout>
      <SEO title="Home" />

      <StyledWorkHighlightSection>
        <StyledH1>
          🔎 <br></br> All Work
        </StyledH1>
        <StyledH2>Here's everything of note I've worked on</StyledH2>
        <StyledWorkItemList>
          {workShowcaseData
            .sort((workItemA, workItemB) => sortWorkShowCaseItemByDateDesc(workItemA, workItemB))
            .map((workData, i) => {
              return (
                <WorkCard
                  cardLink={workData.source}
                  date={workData.date}
                  description={workData.description}
                  key={i}
                  outline
                  title={workData.title}
                >
                  <StyledLinkWrapper>
                    {workData.article && <StyledLink to={workData.article}>Article</StyledLink>}
                    {workData.demo && <StyledLink to={workData.demo}>Demo</StyledLink>}
                  </StyledLinkWrapper>
                </WorkCard>
              );
            })}
        </StyledWorkItemList>
      </StyledWorkHighlightSection>
    </Layout>
  );
};

export default AllWork;

AllWork.propTypes = {
  enableDarkMode: PropTypes.bool,
};

AllWork.defaultProps = {
  enableDarkMode: false,
};

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
  border: ${(props) => `1.5px ${props.theme.primaryThemeColour} solid`};
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

const StyledWorkItemList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  border-radius: 8px;
  padding: 0;
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

const StyledH1 = styled.h1`
  width: 100%;
  margin: 2rem 0 1rem 0;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 800;
  font-size: 4em;
  text-align: center;
`;

const StyledH2 = styled.h2`
  width: 100%;
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  font-weight: 400;
  font-style: italic;
  word-spacing: 0.1rem;
  text-align: center;
`;
