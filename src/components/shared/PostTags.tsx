import React from 'react';

import toKebabCase from '@/utils/strings/to-kebab-case';
import Link from '@/components/shared/Link';

type Props = {
  tags: string[];
  maxNumTagsToShow?: number;
};

const PostTags = ({ tags, maxNumTagsToShow }: Props): JSX.Element => {
  maxNumTagsToShow = !maxNumTagsToShow || maxNumTagsToShow <= 0 ? tags.length : maxNumTagsToShow;
  return (
    <>
      {tags.slice(0, maxNumTagsToShow).map((tag) => {
        if (!tag || tag.trim() === '') return <></>;
        return (
          <Link
            key={tag}
            href={`/tags/${toKebabCase(tag)}`}
            className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            {tag}
          </Link>
        );
      })}
    </>
  );
};

export default PostTags;
