import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

import { createMDXComponents } from '@/components/pages/blog/MDXComponents';

/**
 * Compiles a post's MDX and renders it to static HTML at build time (server only).
 * Doing this in getStaticProps means the browser never evaluates compiled MDX,
 * so the site's CSP can stay free of 'unsafe-eval' and no MDX runtime is shipped.
 */
const render = async (slug: string, markdown: string): Promise<string> => {
  const source = await serialize(markdown, { mdxOptions: { remarkPlugins: [remarkGfm] } });
  return renderToStaticMarkup(<MDXRemote {...source} components={createMDXComponents(slug)} />);
};

// Renders run one at a time: overlapping renderToStaticMarkup calls share MDXProvider's context
// and trigger React's "multiple renderers concurrently rendering the same context provider" warning.
let queue: Promise<unknown> = Promise.resolve();

export const renderPostHtml = (slug: string, markdown: string): Promise<string> => {
  const result = queue.then(() => render(slug, markdown));
  queue = result.catch(() => undefined);
  return result;
};
