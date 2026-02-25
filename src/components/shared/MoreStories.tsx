import Link from '@/components/shared/Link';
import PostTitleBody from '@/components/shared/PostTitleBody';
import SectionTitle from '@/components/shared/SectionTitle';
import { Post as PostType } from '@/services/blog/types';

type Props = {
  suggestedPosts: PostType[];
};

const MoreStories = ({ suggestedPosts }: Props): JSX.Element => {
  if (!suggestedPosts || suggestedPosts.length === 0) return <></>;
  return (
    <div>
      <SectionTitle title="More Stories" />
      <div className="flex flex-col gap-3">
        {suggestedPosts.map((post) => {
          if (!post) return <></>;
          return (
            <Link
              key={post.slug}
              href={post.slug}
              className="no-underline flex flex-row items-center justify-between [&_#postDescription]:hidden [&_#postTitle]:text-base [&_#postTitle]:leading-5 [&_#postTitle]:tracking-normal"
            >
              <div>
                <PostTitleBody post={post} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MoreStories;
