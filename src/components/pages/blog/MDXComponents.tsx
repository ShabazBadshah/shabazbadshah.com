/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */

import React from 'react';
import { Separator } from '@/components/ui/separator';
import { BlogImage } from './BlogImage';

const MDXComponents = {
  img: (props: any) => <BlogImage {...props} />,
  p: (props: any) => <p className="mt-2" {...props} />,
  h1: (props: any) => <h1 className="mt-8 text-2xl " {...props} />,
  h2: (props: any) => <h2 className="mt-6 mb-2 font-medium" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="pl-2 my-4 border-l border-muted-foreground italic" {...props}>
      <p className="text-muted-foreground m-0">{props.children}</p>
    </blockquote>
  ),
  table: (props: any) => (
    <div className="overflow-hidden rounded-lg mb-8 border border-gray-300">
      <table className="w-full border-collapse !mb-0" {...props} />
    </div>
  ),
  th: (props: any) => <th className="border border-gray-300 font-medium p-4" {...props} />,
  tr: (props: any) => <tr className="[&:not(:last-child)]:border-b" {...props} />,
  td: (props: any) => <td className="p-4" {...props} />,
  ul: (props: any) => <ul className="pl-8 mb-3" {...props} />,
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
      rel="noopener"
      className="text-inherit underline hover:text-primary"
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

export default MDXComponents;
