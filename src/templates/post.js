import React, { Component } from 'react';
import { graphql } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';

import { headShake } from 'react-animations';

import { globalStateContext } from '../contextProviders/global-state-context-provider.js';
import { globalThemeColour, darkModeThemeColour } from '../assets/global-style-constants';
import { deviceMaxWidth } from '../../static/media-query-sizes.js';

import './github-markdown.css';
class PostTemplate extends Component {
  render() {
    const { frontmatter } = this.props.data.mdx;
    return (
      <div>
        <globalStateContext.Consumer>
          {(globalState) => (
            <Layout>
              <StyledMarkdownBodyContainer enableDarkMode={globalState.darkMode.isDarkModeEnabled}>
                <StyledArticleTitle>{frontmatter.title}</StyledArticleTitle>
                <div className="markdown-body">
                  <MDXRenderer>{this.props.data.mdx.body}</MDXRenderer>
                </div>
              </StyledMarkdownBodyContainer>
            </Layout>
          )}
        </globalStateContext.Consumer>
      </div>
    );
  }
}

export const query = graphql`
  query GetMatchingPostViaSlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        tags
        date(formatString: "MMMM Do YYYY")
      }
      body
      excerpt
      tableOfContents
      timeToRead
      fields {
        slug
      }
    }
  }
`;

export default PostTemplate;

const StyledArticleTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: left;
  width: 100%;
`;

const StyledMarkdownBodyContainer = styled.div`
  min-width: 300px;
  max-width: 980px;
  padding: 2rem 2rem 2rem 2rem;
  margin: 2rem 2rem 4rem 2rem;

  p,
  h2,
  h3,
  h4,
  h5,
  h6,
  li {
    font-size: 1rem;
    line-height: 1.5rem;
    color: ${(props) => (props.enableDarkMode ? '#ced4da' : '#41484f')};
  }

  p {
    margin-bottom: 1rem;
    margin-top: 0;
  }

  h2 {
    color: ${globalThemeColour};
    border-bottom: 0.5px solid #c5c3c1;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.5rem;
  }

  h3 {
    line-height: 1.5rem;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 3rem;
  }

  h4 {
    font-size: 1.25rem;
    border-bottom: 0.5px solid #c5c3c1;
    margin-top: 3rem;
    margin-bottom: 1rem;
    padding-bottom: 0.25rem;
  }

  a {
    display: inline-block;

    color: ${globalThemeColour};
    text-decoration: underline;
    text-underline-offset: 0.15rem;
    cursor: pointer;

    &:hover {
      animation: ${keyframes`${headShake}`} 800ms ease-in-out;
    }
  }

  ul,
  ol {
    padding-left: 2rem;
    margin-bottom: 1.5rem;
    margin-top: 0;

    li {
      line-height: 1.75rem;
    }
  }

  table {
    border-spacing: 0;
    width: 100%;
    overflow-x: scroll;
    border-radius: 0.35rem;
    margin: 2rem 0 2rem 0;
    border: 1px solid #c5c3c1;
    border-radius: 8px;
  }

  tbody {
    & tr:last-child {
      & td {
        border-bottom: none;
      }
    }
  }

  th {
    border-bottom: 1px solid #d6d9de;
  }

  td {
    border-bottom: 1px solid #d6d9de;
  }

  th,
  td {
    text-align: left;
    padding: 0.75rem !important;
    hyphens: auto;
    word-break: break-word;
  }

  @media only screen and ${deviceMaxWidth.mobileL} {
    max-width: 100%;
    padding: 0;
    margin: 1rem;
  }
`;
