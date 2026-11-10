import { GetStaticPaths, GetStaticProps } from 'next';

import BlogIndex, {
  pageCount,
  POSTS_PER_PAGE,
  type BlogIndexProps
} from '@/components/blog/BlogIndex';
import { getRenderedPosts } from '@/components/blog/RenderPostHTML';
import { getAllPosts } from '@/lib/blog';

export default BlogIndex;

/** Page 1 is /blog, so this route serves pages 2 and up */
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: Array.from(
    { length: pageCount(getAllPosts().length) - 1 },
    (_, i) => `/blog/page/${i + 2}`
  ),
  fallback: false
});

export const getStaticProps: GetStaticProps<BlogIndexProps> = async ({ params }) => {
  const all = getAllPosts();
  const page = Number(params?.page);
  const start = (page - 1) * POSTS_PER_PAGE;
  return {
    props: {
      posts: await getRenderedPosts(all.slice(start, start + POSTS_PER_PAGE)),
      page,
      pages: pageCount(all.length)
    }
  };
};
