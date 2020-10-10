/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';

import { fadeIn } from 'react-animations';

import { globalStateContext } from '../contextProviders/global-state-context-provider.js';

import { globalThemeColour, darkModeThemeColour } from '../assets/global-style-constants.js';
import { deviceMaxWidth } from '../media-query-sizes.js';

import Layout from '../components/layout.js';
import SEO from '../components/seo.js';

const AllPosts = () => {
  const allBlogPosts = useStaticQuery(graphql`
    {
      blog: allFile(
        filter: { sourceInstanceName: { eq: "blog" }, extension: { eq: "md" } }
        sort: { fields: childMdx___frontmatter___date, order: DESC }
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
    <Layout>
      <SEO title="Blog" />
      <globalStateContext.Consumer>
        {(globalState) => (
          <StyledWorkHighlightSection>
            <StyledH1>
              📝 <br></br> All Posts
            </StyledH1>
            <StyledH2>Here's a my thoughts on bunch of things</StyledH2>
            <StyledWorkItemList enableDarkMode={globalState.darkMode.isDarkModeEnabled}>
              {allBlogPosts.blog.edges.map((blogNode, i) => {
                const blogPostData = blogNode.node.childMdx.frontmatter;
                const blogPostPath = blogNode.node.childMdx.fields.slug;
                return (
                  <StyledListItem to={blogPostPath} enableDarkMode={globalState.darkMode.isDarkModeEnabled} key={i}>
                    <div>
                      <StyledWorkListItemTitle>{blogPostData.title}</StyledWorkListItemTitle>
                      <StyledWorkListItemDate>{blogPostData.date}</StyledWorkListItemDate>
                    </div>
                    <StyledWorkListItemBlurb>{blogPostData.blurb}</StyledWorkListItemBlurb>

                    {/* <StyledTagsWrapper>
                      {blogPostData.tags.map((tag, i) => {
                        return <StyledBlogListItemTag key={i}>{tag}</StyledBlogListItemTag>;
                      })}
                    </StyledTagsWrapper> */}
                  </StyledListItem>
                );
              })}
            </StyledWorkItemList>
          </StyledWorkHighlightSection>
        )}
      </globalStateContext.Consumer>
    </Layout>
  );
};

export default AllPosts;

AllPosts.propTypes = {
  enableDarkMode: PropTypes.bool,
};

AllPosts.defaultProps = {
  enableDarkMode: false,
};

const StyledLink = styled.a`
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  text-underline-offset: 0.2rem;
  cursor: pointer;
  padding: 0.7rem 3rem;
  border-radius: 4px;
  color: #f9f8f7;
  box-shadow: 0.5rem 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.06);
  margin-right: 1rem;
  border: 2px ${globalThemeColour} solid;
  background-color: ${globalThemeColour};

  &:hover {
    border: ${(props) => (props.enableDarkMode ? '2px #f9f8f7 solid' : `2px ${globalThemeColour} solid`)};
    color: ${(props) => (props.enableDarkMode ? '#f9f8f7' : globalThemeColour)};
    background-color: ${(props) => (props.enableDarkMode ? darkModeThemeColour : '#f9f8f7')};
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
  display: flex;
  margin: 1.5rem 0 0.7rem 0;

  @media only screen and ${deviceMaxWidth.mobileL} {
    flex-direction: column;
  }
`;

const StyledWorkListItemBlurb = styled.p`
  margin: 1.5rem 0 0 0;
  font-weight: 400;
  font-style: italic;
  line-height: 1.4rem;

  @media only screen and ${deviceMaxWidth.mobileL} {
    margin: 1.5rem 0;
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

const StyledListItem = styled(Link)`
  width: 49%;
  padding: 0.8rem 1.4rem;
  margin: 0.5rem 0;
  padding-bottom: 1.5rem;

  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: unset;

  box-shadow: ${(props) =>
    props.enableDarkMode ? '0.5rem 0.5rem 1rem 0 rgba(0, 0, 0, 0.01)' : '0.5rem 0.5rem 1rem 0 rgba(85, 85, 85, 0.03)'};
  background-color: ${(props) => (props.enableDarkMode ? '#262525' : 'white')};
  transition: background-color 100ms ease-out;
  border-radius: 5px;
  cursor: pointer;
  border: ${(props) => (props.enableDarkMode ? `1px ${globalThemeColour} solid` : '1px solid #e1e4e8')};

  &:hover {
    transition: background-color 100ms ease-in;
    cursor: pointer;
    background-color: ${(props) => (props.enableDarkMode ? '#444242' : '#f7f7f7')};
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

const StyledBlogListItemTag = styled.h5`
  margin: 0 4px;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: 1.5px ${globalThemeColour} solid;
  font-weight: normal;
  color: ${globalThemeColour};
  font-size: 0.9rem;

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
  margin: 2rem 0 0.6rem 0;

  @media only screen and ${deviceMaxWidth.mobileL} {
    margin: 0.6rem 0 0 0;
  }
`;

const StyledWorkListItemDate = styled.h3`
  font-weight: lighter;
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
`;

const StyledWorkListItemTitle = styled.h2`
  margin: 0.5rem 0.5rem 0 0;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.5rem;
  word-spacing: 0.05rem;

  @media only screen and ${deviceMaxWidth.mobileL} {
    margin: 0.75rem 0 0 0;
  }
`;

const StyledH1 = styled.h1`
  width: 100%;
  margin: 2rem 0 1rem 0;
  font-family: 'Playfair Display', serif;
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

const StyledWorkHighlightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
