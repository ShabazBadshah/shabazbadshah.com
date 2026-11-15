import { GetStaticPaths, GetStaticProps } from 'next';

import BlogIndex from '@/components/blog/BlogIndex';
import { getBlogIndexProps, getBlogPagePaths, type BlogIndexProps } from '@/lib/blog';

export default BlogIndex;

/** Page 1 is /blog, so this route serves pages 2 and up */
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getBlogPagePaths(),
  fallback: false
});

export const getStaticProps: GetStaticProps<BlogIndexProps> = async ({ params }) => ({
  props: await getBlogIndexProps(Number(params?.page))
});
