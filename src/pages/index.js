import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import Layout from '../components/layout.js';
import SEO from '../components/seo.js';

import { globalThemeColour } from '../assets/global-style-constants.js';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "avatar.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Layout pageTitle="shabaz badshah">
      <SEO title="Home" />
      {/* <StyledImage fluid={data.file.childImageSharp.fluid} /> */}
      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  );
};

export default IndexPage;

const StyledImage = styled(Img)`
  max-width: 200px;
  border-radius: 6px;
  border: 3px ${globalThemeColour} solid;
`;
