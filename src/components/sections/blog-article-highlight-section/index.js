/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';

import { fadeIn } from 'react-animations';

import { deviceMaxWidth } from '../../../assets/media-query-sizes.js';

import { LinkButton } from '../../buttons';
import { WorkCard } from '../../cards';

const LatestBlogArticlesSubsection = () => {
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
      <StyledBlogPostList>
        {highlightedBlogPosts.blog.edges.map((blogNode, i) => {
          const postData = blogNode.node.childMdx.frontmatter;

          return (
            <WorkCard
              cardLink={`/blog/${blogNode.node.childMdx.fields.slug}`}
              date={postData.date}
              description={postData.blurb}
              key={i}
              span
              title={postData.title}
            />
          );
        })}
      </StyledBlogPostList>
      <LinkButton text="view all blog posts" linkToMoveTo="/blog" />
    </StyledBlogHighlightSection>
  );
};

export default LatestBlogArticlesSubsection;

const StyledBlogPostList = styled.ul`
  list-style: none;
  background-color: ${(props) => props.theme.cardBgColour};
  border-radius: 8px;
  padding: 1.9rem 1rem;
  box-shadow: ${(props) => props.theme.cardDropShadow};
  margin-bottom: 1.5rem;
  border: ${(props) => props.theme.cardBorder};

  /* Get the last item in the highlight list and remove bottom margin */
  & a:last-child li {
    margin-bottom: 0;
  }
`;

const StyledH1 = styled.h1`
  margin: 2rem 0 1rem 0;
  font-family: 'Times New Roman', Times, serif;
  font-size: 3.2rem;
  font-weight: bold;
`;

const StyledH2 = styled.h2`
  font-size: 1.15rem;
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
