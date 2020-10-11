import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';

import { headShake } from 'react-animations';
import { deviceMaxWidth } from '../media-query-sizes.js';

import './github-markdown.css';
class PostTemplate extends Component {
  render() {
    const { frontmatter, body } = this.props.data.mdx;
    return (
      <div>
        <Layout>
          <StyledArticleWrapper>
            <StyledMarkdownBodyContainer>
              <div className="markdown-body">
                <StyledArticleTitle>{frontmatter.title}</StyledArticleTitle>
                <MDXRenderer>{body}</MDXRenderer>
              </div>
            </StyledMarkdownBodyContainer>
          </StyledArticleWrapper>
        </Layout>
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

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

const StyledArticleWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledArticleTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: left;
  width: 100%;
`;

const StyledMarkdownBodyContainer = styled.div`
  min-width: 320px;
  max-width: 768px;
  padding-bottom: 2rem;

  p,
  h2,
  h3,
  h4,
  h5,
  h6,
  li {
    font-size: 1rem;
    line-height: 1.5rem;
    color: ${(props) => props.theme.postTextColour};
  }

  p {
    margin-bottom: 1rem;
    margin-top: 0;
  }

  h2 {
    color: ${(props) => props.theme.primaryThemeColour};
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

    color: ${(props) => props.theme.primaryThemeColour};
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
    margin: 0.25rem;
  }
`;
