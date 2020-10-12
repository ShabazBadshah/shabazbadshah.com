/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { keyframes } from 'styled-components';

import { Layout } from '../components/layouts';
import SEO from '../components/seo';

import { headShake, fadeIn } from 'react-animations';

import { deviceMaxWidth } from '../assets/media-query-sizes.js';

import { SocialMediaLinks } from '../components/cards';
import { LinkButton } from '../components/buttons';

import { BlogArticleHighlightSection, WorkHighlightSection } from '../components/sections';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          contactInfo {
            email
            github
            linkedin
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Home" />
      <StyledHeroSection>
        <SocialMediaLinks />
        <StyledGreeting>
          <StyledH2>
            Hello <span aria-label="waving hand">👋,</span>
          </StyledH2>
          <StyledH1>I'm Shabaz Badshah.</StyledH1>
          <StyledParagraph>
            I'm a{' '}
            <StyledAnchorLink href={data.site.siteMetadata.contactInfo.linkedin}>Product Manager</StyledAnchorLink>
            &nbsp;who develops Fullstack web experiences during his downtime. This site catalogs things I learn, find
            interesting, want to share, or anything cool I'm{' '}
            <StyledAnchorLink href={data.site.siteMetadata.contactInfo.github}>creating</StyledAnchorLink>. There's no
            ads or distractions here.
          </StyledParagraph>
          <StyledRow>
            <LinkButton text="see my work" linkToMoveTo="/work" />
            <LinkButton text="read the blog" linkToMoveTo="/blog" />
          </StyledRow>
        </StyledGreeting>
      </StyledHeroSection>

      <BlogArticleHighlightSection />
      <WorkHighlightSection />
    </Layout>
  );
};

export default IndexPage;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;

  & a:last-of-type {
    margin-right: none;
  }

  @media ${deviceMaxWidth.tablet} {
    flex-direction: column;
    /* Target CTA LinkButton  */
    & a {
      width: 100%;
      margin-right: 0;
    }
  }
`;

const StyledGreeting = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${deviceMaxWidth.mobileL} {
    margin: 0;
  }
`;

const StyledAnchorLink = styled.a`
  display: inline-block;

  color: ${(props) => props.theme.primaryThemeColour};
  text-decoration: underline;
  text-underline-offset: 0.15rem;
  cursor: pointer;

  &:hover {
    animation: ${keyframes`${headShake}`} 800ms ease-in-out;
  }
`;

const StyledH2 = styled.h2`
  font-weight: normal;
  margin: 0;

  & span {
    font-size: 1.4em;
  }
`;

const StyledParagraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  word-spacing: 0.05rem;
  margin: 0 0 1rem 0;
`;

const StyledH1 = styled.h1`
  margin: 1.9rem 0;
  font-family: 'Times New Roman', Times, serif;
  font-size: 5rem;
  font-weight: bold;
`;

const StyledHeroSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 2rem;
  max-width: 1024px;
  animation: ${keyframes`${fadeIn}`} 400ms ease-in;

  @media only screen and ${deviceMaxWidth.laptop} {
    max-width: 800px;
  }

  @media only screen and ${deviceMaxWidth.mobileL} {
    flex-direction: column-reverse;
    align-items: center;
    margin: 0.5rem 0 3rem 0;
  }
`;
