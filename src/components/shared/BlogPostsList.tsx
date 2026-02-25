import Post from '@/components/shared/Post';
import SectionTitle from '@/components/shared/SectionTitle';
import { Separator } from '@/components/ui/separator';
import { Post as PostType } from '@/services/blog/types';

type Props = {
  posts: PostType[];
  showTitle?: boolean;
};

const BlogPostsList = ({ posts, showTitle = true }: Props): JSX.Element => {
  if (!posts || posts.length === 0) return <></>;
  return (
    <>
      {showTitle && <SectionTitle title={'All Posts'} />}
      {posts.map((post: PostType, index: number) => {
        return (
          <div key={post.title} className="w-full">
            <Post post={post} />
            {index < posts.length - 1 && <Separator className="my-3" />}
          </div>
        );
      })}
    </>
  );
};

export default BlogPostsList;
