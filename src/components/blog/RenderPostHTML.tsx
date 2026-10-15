import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import type { ComponentProps } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import remarkGfm from 'remark-gfm';

// The post title is the page's only <h1>, so a "# Heading" inside an article renders as an <h2>
const H2 = (props: ComponentProps<'h2'>) => (
  <h2 className="mb-4 mt-12 text-3xl font-medium text-fg" {...props} />
);

/** Blog images live in /images/blog/<slug>/ (copied from content/ by bin/copy-blog-images-to-public.ts) */
const createComponents = (slug: string) => ({
  p: (props: ComponentProps<'p'>) => <p className="mt-3" {...props} />,
  h1: H2,
  h2: H2,
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="mb-3 mt-12 text-xl font-medium text-fg" {...props} />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote className="my-4 border-l border-fg-muted pl-2 italic" {...props} />
  ),
  table: (props: ComponentProps<'table'>) => (
    <div className="mb-8 overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  tr: (props: ComponentProps<'tr'>) => <tr className="[&:not(:last-child)]:border-b" {...props} />,
  th: (props: ComponentProps<'th'>) => (
    <th className="border-b border-line px-3 pb-3 pt-4 font-medium" {...props} />
  ),
  td: (props: ComponentProps<'td'>) => (
    <td className="border-r border-line px-3 pb-4 pt-3 last:border-r-0" {...props} />
  ),
  ul: (props: ComponentProps<'ul'>) => <ul className="mb-3 pl-8" {...props} />,
  ol: (props: ComponentProps<'ol'>) => <ol className="mb-3 pl-8 [&>li]:list-decimal" {...props} />,
  li: (props: ComponentProps<'li'>) => <li className="mt-2 list-disc" {...props} />,
  hr: (props: ComponentProps<'hr'>) => (
    <hr
      className="my-8 border-0 text-center before:text-[2rem] before:tracking-[16px] before:content-['...']"
      {...props}
    />
  ),
  a: (props: ComponentProps<'a'>) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline underline-offset-2 hover:brightness-110"
      {...props}
    />
  ),
  mark: (props: ComponentProps<'mark'>) => (
    <mark className="bg-accent/20 text-inherit" {...props} />
  ),
  figcaption: (props: ComponentProps<'figcaption'>) => (
    <figcaption className="mb-4 mt-2 text-center text-sm leading-5 text-fg-muted" {...props} />
  ),
  img: ({ src, alt, title }: ComponentProps<'img'>) => (
    <img
      src={src?.startsWith('https') ? src : `/images/blog/${slug}/${src}`}
      alt={alt || ''}
      title={title}
      loading="lazy"
      decoding="async"
      className="h-auto w-full rounded-inner"
    />
  )
});

/**
 * Compiles a post's MDX and renders it to static HTML at build time (server only).
 * Doing this in getStaticProps means the browser never evaluates compiled MDX,
 * so the site's CSP can stay free of 'unsafe-eval' and no MDX runtime is shipped.
 */
const render = async (slug: string, markdown: string): Promise<string> => {
  const source = await serialize(markdown, { mdxOptions: { remarkPlugins: [remarkGfm] } });
  return renderToStaticMarkup(<MDXRemote {...source} components={createComponents(slug)} />);
};

// Renders run one at a time: overlapping renderToStaticMarkup calls share MDXProvider's context
// and trigger React's "multiple renderers concurrently rendering the same context provider" warning.
let queue: Promise<unknown> = Promise.resolve();

export const renderPostHtml = (slug: string, markdown: string): Promise<string> => {
  const result = queue.then(() => render(slug, markdown));
  queue = result.catch(() => undefined);
  return result;
};
