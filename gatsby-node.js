const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve('./src/templates/post.js')

  const result = await graphql(`
    {
      allMdx(sort:{ fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            id
            frontmatter {
              title
              tags
              blurb
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allMdx.edges

  posts.forEach((post, i) => {
    createPage({
      path: `blog/${post.node.fields.slug}`,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug
      },
    })
  });
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const fileNode = getNode(node.parent)
    const { name: articleName } = path.parse(fileNode.relativePath)

    createNodeField({
      node,
      name: 'slug',
      value: articleName,
    })
  }
}