/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { keyframes } from 'styled-components';

import Layout from '../components/layout.js';
import SEO from '../components/seo.js';

import { headShake, fadeIn } from 'react-animations';

import { globalThemeColour } from '../assets/global-style-constants.js';
import { globalStateContext } from '../contextProviders/global-state-context-provider.js';
import { deviceMaxWidth } from '../../static/media-query-sizes.js';

import SocialMediaLinks from '../components/social-media-links.js';
import LinkButton from '../components/link-button.js';

import LatestBlogArticlesSubsection from '../components/latest-blog-articles-subsection.js';

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
        <Layout>
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
                &nbsp;who develops Fullstack web experiences during his downtime. This site catalogs things I learn,
                find interesting, want to share, or anything cool I'm{' '}
                <StyledAnchorLink href={data.site.siteMetadata.contactInfo.github}>creating</StyledAnchorLink>. There's
                no ads or distractions here.
              </StyledParagraph>
              <StyledRow>
                <LinkButton
                  text="see my work"
                  linkToMoveTo="/404/"
                  enableDarkMode={globalState.darkMode.isDarkModeEnabled}
                />
                <LinkButton
                  text="read the blog"
                  linkToMoveTo="/404/"
                  enableDarkMode={globalState.darkMode.isDarkModeEnabled}
                />
              </StyledRow>
            </StyledGreeting>
          </StyledHeroSection>
          <LatestBlogArticlesSubsection enableDarkMode={globalState.darkMode.isDarkModeEnabled} />
        </Layout>
      )}
    </globalStateContext.Consumer>
  );
};

export default IndexPage;

const StyledEmoji = styled.span`
  font-size: 1.4em;
`;

const StyledRow = styled.div`
   display: flex;
   flex-direction: row;

   @media ${deviceMaxWidth.tablet} {
     flex-direction: column;

    /* Target CTA LinkButton  */
     & a {
       width: 98%;
       margin-right: 0;
     }
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
  text-underline-offset: 0.15rem;
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
  font-size: 1.3rem;
  line-height: 1.6;
  word-spacing: 0.1rem;
  margin: 0 0 1rem 0;
`;

const StyledH1 = styled.h1`
  margin: 2rem 0;
  font-family: 'Times New Roman', Times, serif;
  font-size: 5em;
  font-weight: bold;
`;

const StyledHeroSection = styled.div`
  display: flex;
  margin: 4rem 0;
  max-width: 1024px;
  animation: ${keyframes`${fadeIn}`} 400ms ease-in;

  @media only screen and ${deviceMaxWidth.laptop} {
    max-width: 800px;
  }

  @media only screen and ${deviceMaxWidth.mobileL} {
    flex-direction: column-reverse;
    align-items: center;
    margin: 1rem 0;
  }
`;
