import React from 'react';
import { Chip } from '@mui/material';

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
          <Chip
            label={tag}
            size="small"
            clickable
            component={Link}
            key={tag}
            href={`/tags/${toKebabCase(tag)}`}
            sx={{ px: 0.5 }}
          />
        );
      })}
    </>
  );
};

export default PostTags;
