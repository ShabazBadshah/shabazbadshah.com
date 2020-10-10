/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';

import { fadeIn } from 'react-animations';

import { globalThemeColour } from '../assets/global-style-constants.js';
import { deviceMaxWidth } from '../media-query-sizes.js';

import LinkButton from './link-button.js';

const LatestBlogArticlesSubsection = ({ enableDarkMode }) => {
  const highlightedBlogPosts = useStaticQuery(graphql`
    {
      blog: allFile(
        filter: { sourceInstanceName: { eq: "blog" }, extension: { eq: "md" } }
        sort: { fields: childMdx___frontmatter___date, order: DESC }
        limit: 3
      ) {
        edges {
          node {
            childMdx {
              frontmatter {
                title
                tags
                blurb
                date(formatString: "MMMM Do YYYY")
              }
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `);

  return (
    <StyledBlogHighlightSection>
      <StyledH1>📝 Latest Posts</StyledH1>
      <StyledH2>Peruse some of my latest posts below</StyledH2>
      <StyledBlogPostList enableDarkMode={enableDarkMode}>
        {highlightedBlogPosts.blog.edges.map((blogNode, i) => {
          const blogPostData = blogNode.node.childMdx.frontmatter;
          const blogPostPath = blogNode.node.childMdx.fields.slug;
          return (
            <StyledLink to={`/blog/${blogPostPath}`} key={i}>
              <StyledBlogPostListItem key={i} enableDarkMode={enableDarkMode}>
                <div>
                  <StyledBlogPostListItemTitle>{blogPostData.title}</StyledBlogPostListItemTitle>
                  <StyledBlogPostListItemDate>{blogPostData.date}</StyledBlogPostListItemDate>
                  <StyledBlogListItemBlurb>{blogPostData.blurb}</StyledBlogListItemBlurb>
                </div>
                {/* <StyledTagsWrapper>
                  {blogPostData.tags.map((tag, i) => {
                    return <StyledBlogListItemTag key={i}>{tag}</StyledBlogListItemTag>;
                  })}
                </StyledTagsWrapper> */}
              </StyledBlogPostListItem>
            </StyledLink>
          );
        })}
      </StyledBlogPostList>
      <LinkButton text="view all blog posts" linkToMoveTo="/blog" enableDarkMode={enableDarkMode} />
    </StyledBlogHighlightSection>
  );
};

export default LatestBlogArticlesSubsection;

LatestBlogArticlesSubsection.propTypes = {
  enableDarkMode: PropTypes.bool,
};

LatestBlogArticlesSubsection.defaultProps = {
  enableDarkMode: false,
};

const StyledBlogListItemBlurb = styled.p`
  margin: 1.5rem 0 0 0;
  font-weight: 400;
  font-style: italic;
  line-height: 1.4rem;

  @media only screen and ${deviceMaxWidth.mobileL} {
    margin: 1.5rem 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: unset;
  display: inline-block;
  width: 100%;
  &:hover {
    cursor: pointer;
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
  clear: both;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;

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

  @media only screen and ${deviceMaxWidth.mobileL} {
    margin: 0.6rem 0 0 0;
  }
`;

const StyledBlogPostListItemDate = styled.h3`
  font-weight: lighter;
  margin: 0.6rem 0 0 0;
  font-size: 1rem;
`;

const StyledBlogPostListItemTitle = styled.h2`
  margin: 0 1rem 0 0;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.5rem;
  word-spacing: 0.05rem;

  @media only screen and ${deviceMaxWidth.mobileL} {
    margin: 0;
  }
`;

const StyledBlogPostListItem = styled.li`
  padding: 0.8rem 1.4rem;
  margin: 0 0 0.4rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: background-color 100ms ease-out;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    transition: background-color 100ms ease-in;
    background-color: ${(props) => (props.enableDarkMode ? '#444242' : '#f7f7f7')};
  }

  @media only screen and ${deviceMaxWidth.mobileL} {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.3rem;
    margin: 0 0 1.3rem 0;
  }
`;

const StyledBlogPostList = styled.ul`
  list-style: none;
  background-color: ${(props) => (props.enableDarkMode ? '#262525' : 'white')};
  border-radius: 8px;
  padding: 1.9rem 1rem;
  box-shadow: ${(props) =>
    props.enableDarkMode ? '0.5rem 0.5rem 1rem 0 rgba(0, 0, 0, 0.01)' : '0.5rem 0.5rem 1rem 0 rgba(85, 85, 85, 0.03)'};
  margin-bottom: 1.5rem;
  border: ${(props) => (props.enableDarkMode ? `1px ${globalThemeColour} solid` : '1px solid #e1e4e8')};

  /* Get the last item in the highlight list and remove bottom margin */
  & a:last-child li {
    margin-bottom: 0;
  }
`;

const StyledH1 = styled.h1`
  margin: 2rem 0 1rem 0;
  font-family: 'Times New Roman', Times, serif;
  font-size: 4em;
  font-weight: bold;
`;

const StyledH2 = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 2rem 0;
  font-weight: lighter;
  font-style: italic;
  word-spacing: 0.1rem;
`;

const StyledBlogHighlightSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem 0;
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
