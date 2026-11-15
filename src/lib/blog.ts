import dayjs from 'dayjs';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import readingTime from 'reading-time';

import { siteConfig } from './site';

export type Post = {
  slug: string;
  title: string;
  shortBody: string;
  /** Raw MDX; emptied before it is sent to the browser */
  body: string;
  publishedAt: string;
  tags: string[];
  readingTime: string;
  /** Pre-rendered article HTML (MDX is compiled at build time) */
  html?: string;
};

export const POSTS_PER_PAGE = siteConfig.postsPerPage;

export const pageCount = (total: number): number => Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

/** /blog is page 1; later pages live at /blog/page/<n> */
export const pageHref = (page: number): string => (page === 1 ? '/blog' : `/blog/page/${page}`);

export type BlogIndexProps = { posts: Post[]; page: number; pages: number };

const POSTS_DIR = join(process.cwd(), 'content');

const toKebabCase = (value: string): string =>
  value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const getAllPostSlugs = (): string[] =>
  fs.readdirSync(POSTS_DIR).filter((slug) => slug[0] !== '.');

export const getPostBySlug = (slug: string): Post => {
  const source = fs.readFileSync(join(POSTS_DIR, slug, `${slug}.mdx`), 'utf8');
  const { data, content } = matter(source);
  return {
    slug,
    title: data.title,
    shortBody: data.shortBody,
    body: content,
    publishedAt: dayjs(data.publishedAt).format('YYYY-MM-DD'),
    tags: (data.tags ?? []).map(toKebabCase),
    readingTime: readingTime(content).text
  };
};

/** Newest first */
export const getAllPosts = (): Post[] =>
  getAllPostSlugs()
    .map(getPostBySlug)
    .sort((a, b) => dayjs(b.publishedAt).valueOf() - dayjs(a.publishedAt).valueOf());

export const getBlogPagePaths = (): string[] =>
  Array.from(
    { length: pageCount(getAllPosts().length) - 1 },
    (_, i) => `/blog/page/${i + 2}`
  );

export const getBlogPostPaths = (): string[] =>
  getAllPostSlugs().map((slug) => `/blog/posts/${slug}`);

export const getBlogIndexProps = async (page: number = 1): Promise<BlogIndexProps> => {
  const { getRenderedPosts } = await import('./render-html');
  const all = getAllPosts();
  const start = (page - 1) * POSTS_PER_PAGE;
  return {
    posts: await getRenderedPosts(all.slice(start, start + POSTS_PER_PAGE)),
    page,
    pages: pageCount(all.length)
  };
};

export const getRenderedPostBySlug = async (slug: string): Promise<Post> => {
  const { renderPostHtml } = await import('./render-html');
  const post = getPostBySlug(slug);
  return {
    ...post,
    body: '',
    html: await renderPostHtml(post.slug, post.body)
  };
};
