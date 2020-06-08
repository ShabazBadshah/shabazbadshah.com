/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

import Layout from '../components/layout.js';
import SEO from '../components/seo.js';

import { globalStateContext } from '../contextProviders/global-state-context-provider.js';
import { deviceMaxWidth } from '../../static/media-query-sizes.js';
import LinkButton from '../components/LinkButton.js';

const NotFoundPage = () => {
  return (
    <globalStateContext.Consumer>
      {(globalState) => (
        <Layout>
          <SEO title="404" />
          <Styled404Section>
            <Styled404Wrapper>
              <StyledH1>😐 404 Page Not Found!</StyledH1>
              <StyledParagraph>
                "Um.......I swear this page was working on my computer. I'll add this bug to the backlog. Let's forget
                like this ever happened."
              </StyledParagraph>
              <LinkButton text="Go Home? 🏠" linkToMoveTo="/" enableDarkMode={globalState.darkMode.isDarkModeEnabled} />
            </Styled404Wrapper>
          </Styled404Section>
        </Layout>
      )}
    </globalStateContext.Consumer>
  );
};

export default NotFoundPage;

const Styled404Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${deviceMaxWidth.mobileL} {
    margin: 0 1rem 1rem 1rem;
  }
`;

const StyledParagraph = styled.p`
  font-size: 1.5em;
  line-height: 1.6;
  word-spacing: 0.1em;
  font-style: italic;
`;

const StyledH1 = styled.h1`
  margin: 4rem 0;
  font-family: 'Times New Roman', Times, serif;
  font-size: 8em;
  font-weight: bold;

  @media only screen and ${deviceMaxWidth.mobileL} {
    font-size: 3.5em;
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
