/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { keyframes } from 'styled-components';

import Layout from '../components/layout.js';
import SEO from '../components/seo.js';

import { globalThemeColour } from '../assets/global-style-constants.js';
import { headShake, fadeInLeft } from 'react-animations';

import { globalStateContext } from '../contextProviders/global-state-context-provider.js';
import { deviceMaxWidth } from '../../static/media-query-sizes.js';

import SocialMediaLinks from '../components/social-media-links.js';

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
    <globalStateContext.Consumer>
      {(globalState) => (
        <Layout pageTitle="shabaz badshah">
          <SEO title="Home" />
          <StyledHeroSection>
            <SocialMediaLinks enableDarkMode={globalState.darkMode.isDarkModeEnabled} />
            <StyledGreeting>
              <StyledH2>
                Hello <StyledEmoji aria-label="waving hand">👋,</StyledEmoji>
              </StyledH2>
              <StyledH1>I'm Shabaz Badshah.</StyledH1>
              <StyledParagraph>
                I'm a{' '}
                <StyledAnchorLink href={data.site.siteMetadata.contactInfo.linkedin}>Product Manager</StyledAnchorLink>
                &nbsp;who develops Fullstack web experiences during his downtime. This site catalogs everything I learn,
                find interesting, or anything cool I'm{' '}
                <StyledAnchorLink href={data.site.siteMetadata.contactInfo.github}>creating</StyledAnchorLink>. There's
                no ads or distractions here.
              </StyledParagraph>
            </StyledGreeting>
          </StyledHeroSection>
        </Layout>
      )}
    </globalStateContext.Consumer>
  );
};

export default IndexPage;

const StyledEmoji = styled.span`
  font-size: 1.4em;
`;

const StyledGreeting = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${deviceMaxWidth.mobileL} {
    margin: 1rem;
  }
`;

const StyledAnchorLink = styled.a`
  display: inline-block;

  color: ${globalThemeColour};
  text-decoration: underline;
  text-underline-offset: 0.15em;
  cursor: pointer;

  &:hover {
    animation: ${keyframes`${headShake}`} 800ms ease-in-out;
  }
`;

const StyledH2 = styled.h2`
  font-weight: normal;
  margin: 0;
`;

const StyledParagraph = styled.p`
  font-size: 1.3em;
  line-height: 1.6;
  word-spacing: 0.1em;
  margin: 0;
`;

const StyledH1 = styled.h1`
  margin: 40px 0;
  font-family: 'Times New Roman', Times, serif;
  font-size: 4em;
  font-weight: bold;
`;

const StyledHeroSection = styled.div`
  display: flex;
  margin-top: 4rem;
  max-width: 1024px;
  animation: ${keyframes`${fadeInLeft}`} 250ms ease-in-out;

  @media only screen and ${deviceMaxWidth.laptop} {
    max-width: 800px;
  }

  @media only screen and ${deviceMaxWidth.mobileL} {
    flex-direction: column-reverse;
    align-items: center;
    margin-top: 1rem;
  }
`;
