import PostTags from '@/components/shared/PostTags';
import PostTitleBody from '@/components/shared/PostTitleBody';
import { Post as PostType } from '@/services/blog/types';

type Props = {
  post: PostType;
};

const Post = ({ post }: Props): JSX.Element => {
  if (!post || !post.tags || !post.publishedAt || !post.readingTime || !post.shortBody) {
    return <></>;
  }
  return (
    <article style={{ width: '100%' }}>
      <div className="no-underline text-foreground flex flex-col justify-between gap-0.5">
        <PostTitleBody post={post} />
        {/* <div className="flex gap-1 mt-1">
          <PostTags tags={post.tags} maxNumTagsToShow={3} />
        </div> */}
      </div>
    </article>
  );
};

export default Post;
