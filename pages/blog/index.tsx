import { GetStaticPropsResult } from 'next';

import BlogIndex, {
  pageCount,
  POSTS_PER_PAGE,
  type BlogIndexProps
} from '@/components/blog/BlogIndex';
import { getRenderedPosts } from '@/lib/render-html';
import { getAllPosts } from '@/lib/blog';

export default BlogIndex;

export const getStaticProps = async (): Promise<GetStaticPropsResult<BlogIndexProps>> => {
  const all = getAllPosts();
  return {
    props: {
      posts: await getRenderedPosts(all.slice(0, POSTS_PER_PAGE)),
      page: 1,
      pages: pageCount(all.length)
    }
  };
};
