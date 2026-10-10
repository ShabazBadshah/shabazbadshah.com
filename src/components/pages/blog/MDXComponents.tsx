/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */

import { Separator } from '@/components/ui/ui/separator';
import { ArticleCTA } from './ArticleCTA';

const MDXComponents = {
  ArticleCTA: ArticleCTA,
  p: (props: any) => <p className="mt-3" {...props} />,
  // The post title is the page's only <h1>, so a "# Heading" inside an article renders as an <h2>
  h1: (props: any) => <h2 className="mt-20 mb-4 text-3xl font-medium text-fg" {...props} />,
  h2: (props: any) => <h2 className="mt-12 mb-4 text-3xl font-medium text-fg" {...props} />,
  h3: (props: any) => <h3 className="mt-12 mb-3 text-xl font-medium text-fg" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="pl-2 my-4 border-l border-muted-foreground italic" {...props}>
      <p className="text-muted-foreground m-0">{props.children}</p>
    </blockquote>
  ),
  table: (props: any) => (
    <div className="overflow-hidden rounded-lg mb-8 border border-line">
      <table className="w-full border-collapse !mb-0" {...props} />
    </div>
  ),
  th: (props: any) => <th className="border border-line font-medium p-4" {...props} />,
  tr: (props: any) => <tr className="[&:not(:last-child)]:border-b" {...props} />,
  td: (props: any) => <td className="p-4" {...props} />,
  ul: (props: any) => <ul className="pl-8 mb-3" {...props} />,
  ol: (props: any) => <ol className="pl-8 mb-3 [&>li]:list-decimal" {...props} />,
  li: (props: any) => <li className="list-disc mt-2 " {...props} />,
  hr: (props: any) => (
    <Separator
      className="border-0 text-center h-auto before:content-['...'] before:text-[2rem] before:tracking-[16px]"
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline underline-offset-2 hover:brightness-110"
      {...props}
    />
  ),
  mark: (props: any) => (
    <span className="bg-primary/20 text-inherit leading-inherit inline">
      <mark className="bg-inherit text-inherit" {...props}>
        {props.children}
      </mark>
    </span>
  ),
  figcaption: (props: any) => (
    <figcaption className="text-center mt-2 mb-4">
      <span className="leading-5 text-sm text-muted-foreground tracking-normal" {...props} />
    </figcaption>
  )
};

/** Blog images live in /images/blog/<slug>/ (copied from content/ by the prebuild script) */
export const createMDXComponents = (slug: string) => ({
  ...MDXComponents,
  img: ({ src, alt, title }: any) => (
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

export default MDXComponents;
