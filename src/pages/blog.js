/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';

import { fadeIn } from 'react-animations';

import { deviceMaxWidth } from '../assets/media-query-sizes.js';

import { Layout } from '../components/layouts';
import SEO from '../components/seo';
import { WorkCard } from '../components/cards';

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
            const { slug } = blogNode.node.childMdx.fields;
            const { title, date, blurb } = blogNode.node.childMdx.frontmatter;
            return <WorkCard key={i} cardLink={slug} date={date} description={blurb} outline title={title} />;
          })}
        </StyledWorkItemList>
      </StyledWorkHighlightSection>
    </Layout>
  );
};

export default AllPosts;

const StyledWorkItemList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  border-radius: 8px;
  padding: 0;
`;

const StyledWorkHighlightSection = styled.div`
  display: flex;
  flex-direction: column;
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

const StyledH1 = styled.h1`
  width: 100%;
  margin: 2rem 0 1rem 0;
  font-family: 'Times New Roman', Times, serif;
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
