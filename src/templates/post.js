import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';

const PostTemplate = ({ data }) => {
  const { frontmatter } = data.mdx;
  return (
    <div>
      <Layout>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.date}</p>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </Layout>
    </div>
  );
};

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
