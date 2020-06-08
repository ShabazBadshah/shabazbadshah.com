/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import styled, { keyframes } from 'styled-components';

import Layout from '../components/layout.js';
import SEO from '../components/seo.js';

import { globalThemeColour } from '../assets/global-style-constants.js';
import { headShake, fadeIn } from 'react-animations';

import { deviceMaxWidth } from '../../static/media-query-sizes.js';

const NotFoundPage = () => {
  return (
    <Layout pageTitle="shabaz badshah">
      <SEO title="Home" />
      <Styled404Section>
        <Styled404Wrapper>
          <StyledH2>
            Oh No! <StyledEmoji aria-label="screaming face">😱</StyledEmoji>
          </StyledH2>
          <StyledH1>404 Page Not Found.</StyledH1>
          <StyledParagraph>
            "Um.......I swear this page was working on my computer. I'll add this bug to the backlog. Let's forget like
            this ever happened."
          </StyledParagraph>
          <StyledAnchorLink href="/">Go Home? 🏠</StyledAnchorLink>
        </Styled404Wrapper>
      </Styled404Section>
    </Layout>
  );
};

export default NotFoundPage;

const StyledAnchorLink = styled.a`
  display: block;
  width: fit-content;

  color: ${globalThemeColour};
  text-decoration: underline;
  text-underline-offset: 0.15em;
  font-size: 1.5rem;
  margin-top: 4rem;
  cursor: pointer;

  &:hover {
    animation: ${keyframes`${headShake}`} 800ms ease-in-out;
  }
`;

const StyledEmoji = styled.span`
  font-size: 1.4em;
`;

const Styled404Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${deviceMaxWidth.mobileL} {
    margin: 0 1rem 1rem 1rem;
  }
`;

const StyledH2 = styled.h2`
  font-size: 2rem;
  font-weight: normal;
  margin: 0;
`;

const StyledParagraph = styled.p`
  font-size: 1.5em;
  line-height: 1.6;
  word-spacing: 0.1em;
  margin: 0;
  font-style: italic;
`;

const StyledH1 = styled.h1`
  margin: 4rem 0;
  font-family: 'Times New Roman', Times, serif;
  font-size: 8em;
  font-weight: bold;

  @media only screen and ${deviceMaxWidth.mobileL} {
    font-size: 4em;
  }
`;

const Styled404Section = styled.div`
  display: flex;
  max-width: 1024px;
  animation: ${keyframes`${fadeIn}`} 400ms ease-in;

  position: fixed;
  top: 50%;
  bottom: 50%;
  padding: 20px;

  @media only screen and ${deviceMaxWidth.laptop} {
    max-width: 800px;
  }

  @media only screen and ${deviceMaxWidth.mobileL} {
    position: initial;
    padding: 0;
    flex-direction: column-reverse;
    align-items: center;
  }
`;
