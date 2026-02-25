/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */

import React from 'react';
import { Separator } from '@/components/ui/separator';

const MDXComponents = {
  p: (props: any) => (
    <p
      className="text-[#292929] font-roboto text-lg leading-[30px] tracking-[-0.003em] mt-3 break-words hyphens-auto sm:text-[17px] sm:leading-7 sm:mt-2"
      {...props}
    />
  ),
  h1: (props: any) => (
    <h2
      className="mt-8 mb-[-14px] text-2xl font-black leading-7 tracking-normal sm:text-xl sm:mt-5"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h3
      className="mt-6 mb-[-14px] text-xl tracking-normal font-black sm:text-[17px] sm:mt-4"
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="pl-2 my-4 leading-8 border-l-[3px] border-muted-foreground italic"
      {...props}
    >
      <p className="text-muted-foreground font-roboto font-normal tracking-[-0.003em] leading-inherit m-0">
        {props.children}
      </p>
    </blockquote>
  ),
  ul: (props: any) => <ul className="pl-[30px] mb-[10px] mt-[30px]" {...props} />,
  li: (props: any) => (
    <li
      className="list-[square] mt-[10px] mb-[-5px] text-lg leading-8 tracking-[-0.003em] pl-[1px]"
      {...props}
    />
  ),
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
    <span className="bg-primary/20 font-roboto text-inherit leading-inherit inline">
      <mark className="bg-inherit text-inherit" {...props}>
        {props.children}
      </mark>
    </span>
  ),
  figcaption: (props: any) => (
    <figcaption className="text-center mt-2 mb-4">
      <span className="leading-5 text-sm text-muted-foreground tracking-normal" {...props} />
    </figcaption>
  ),
  Alert: (props: any) => (
    <div
      className="bg-secondary leading-5 text-sm tracking-normal my-3 p-4 rounded border border-border sm:my-4"
      {...props}
    />
  ),
  SpecialLink: (props: any) => (
    <a href={props.href} className="no-underline text-inherit">
      <div className="flex justify-between mt-4 border border-border">
        <div className="flex justify-center flex-col p-2">
          <p className="font-semibold text-[17px]">{props.title}</p>
          <p className="text-[#292929] leading-5 overflow-hidden text-ellipsis line-clamp-2">
            {props.description}
          </p>
          <p className="text-muted-foreground text-sm">{props.site}</p>
        </div>
        <div
          className="w-full max-w-[140px] bg-cover bg-center sm:max-w-[120px]"
          style={{ backgroundImage: `url(${props.image})` }}
        />
      </div>
    </a>
  ),
  Box: (props: any) => <div {...props} />,
  Typography: (props: any) => <span {...props} />
};

export default MDXComponents;
