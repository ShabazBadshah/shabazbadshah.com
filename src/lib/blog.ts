import dayjs from 'dayjs';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import readingTime from 'reading-time';

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
    publishedAt: data.publishedAt,
    tags: (data.tags ?? []).map(toKebabCase),
    readingTime: readingTime(content).text
  };
};

/** Newest first */
export const getAllPosts = (): Post[] =>
  getAllPostSlugs()
    .map(getPostBySlug)
    .sort((a, b) => dayjs(b.publishedAt).valueOf() - dayjs(a.publishedAt).valueOf());
