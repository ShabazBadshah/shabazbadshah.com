import dayjs from 'dayjs';

import Link from '@/components/shared/Link';
import { Post as PostType } from '@/services/blog/types';

type Props = {
  post: PostType;
};

const PostTitleBody = ({ post }: Props): JSX.Element => {
  return (
    <>
      <div className="flex items-center gap-2 mb-0.5">
        <p className="text-muted-foreground text-sm">
          {dayjs(post.publishedAt).format('MMM D, YYYY')}
          &nbsp;&nbsp;&bull;&nbsp;&nbsp;
          {post.readingTime}
        </p>
      </div>
      <Link href={`/blog/posts/${post.slug}`}>
        <h3
          id="postTitle"
          className="text-foreground text-lg font-bold leading-tight tracking-normal overflow-hidden text-ellipsis line-clamp-2 transition-colors duration-200 hover:text-primary sm:hover:text-primary"
        >
          {post.title}
        </h3>
      </Link>

      <p
        id="postDescription"
        className="text-muted-foreground leading-snug overflow-hidden text-ellipsis line-clamp-2"
      >
        {post.shortBody}
      </p>
    </>
  );
};

export default PostTitleBody;
