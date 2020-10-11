/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';

import { fadeIn } from 'react-animations';

import { globalThemeColour } from '../assets/global-style-constants.js';
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

      <StyledWorkHighlightSection>
        <StyledH1>
          📝 <br></br> All Posts
        </StyledH1>
        <StyledH2>Here's a my thoughts on bunch of things</StyledH2>
        <StyledWorkItemList>
          {allBlogPosts.blog.edges.map((blogNode, i) => {
            const blogPostData = blogNode.node.childMdx.frontmatter;
            const blogPostPath = blogNode.node.childMdx.fields.slug;
            return (
              <StyledListItem to={blogPostPath} key={i}>
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
    </Layout>
  );
};

export default AllPosts;

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

  box-shadow: ${(props) => props.theme.cardDropShadow};
  background-color: ${(props) => props.theme.cardBgColour};
  transition: background-color 100ms ease-out;
  border-radius: 5px;
  cursor: pointer;
  border: ${(props) => props.theme.cardBorder};

  &:hover {
    transition: background-color 100ms ease-in;
    cursor: pointer;
    background-color: ${(props) => props.theme.cardHoverColour};
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
