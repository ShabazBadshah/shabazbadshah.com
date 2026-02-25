import React from 'react';
import { Pin } from 'lucide-react';

import Link from '@/components/shared/Link';
import SectionTitle from '@/components/shared/SectionTitle';
import { Post as PostType } from '@/services/blog/types';
import { trackPinnedPostClicked } from '@/analytics/tracking';
import PostTitleBody from '@/components/shared//PostTitleBody';

type Props = {
  posts: PostType[];
};

const PinnedPosts = ({ posts }: Props): JSX.Element => {
  if (posts.length === 0) return <></>;
  return (
    <>
      <SectionTitle title={'Pinned Posts'} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {posts.map((post) => {
          return (
            <div key={post.title} className="w-full">
              <Link
                key={post.slug}
                href={`/blog/posts/${post.slug}`}
                className="no-underline text-foreground hover:bg-[#085cc50a] hover:border-primary hover:[&_#postTitle]:text-primary hover:[&_#postDescription]:text-primary sm:hover:bg-[#085cc50a] sm:hover:border-primary flex flex-col justify-between gap-0.5 p-2 border border-border rounded-lg transition-all duration-150 ease-in-out"
                onClick={() => trackPinnedPostClicked()}
              >
                <p className="text-sm text-muted-foreground flex items-center mb-1">
                  <Pin className="w-3 h-3" />
                  &nbsp;Pinned
                </p>
                <PostTitleBody post={post} />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PinnedPosts;
