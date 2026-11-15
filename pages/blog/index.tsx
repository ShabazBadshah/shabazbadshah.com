import { GetStaticPropsResult } from 'next';

import BlogIndex from '@/components/blog/BlogIndex';
import { getBlogIndexProps, type BlogIndexProps } from '@/lib/blog';

export default BlogIndex;

export const getStaticProps = async (): Promise<GetStaticPropsResult<BlogIndexProps>> => ({
  props: await getBlogIndexProps(1)
});
