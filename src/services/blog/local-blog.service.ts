import fs from 'fs';
import { join } from 'path';
import readingTime from 'reading-time';
import matter from 'gray-matter';

import { Post, PostFrontmatter, TagsWithAmount } from './types';
import toKebabCase from '@/utils/strings/to-kebab-case';

const POSTS_DIRECTORY_PATH = join(process.cwd(), 'content');

export default class LocalBlogService {
  public getAllPostSlugs(): string[] {
    return fs.readdirSync(POSTS_DIRECTORY_PATH).filter((slug) => slug[0] !== '.');
  }

  public getAllPosts(): Post[] {
    return this.getAllPostSlugs()
      .map((slug) => this.getPostBySlug(slug))
      .sort((post1, post2) => (post1.publishedAt > post2.publishedAt ? -1 : 1));
  }

  public getAllTags(): TagsWithAmount[] {
    const allTags: Set<string> = new Set();

    this.getAllPosts().forEach((post) => post.tags.forEach((tag) => allTags.add(tag)));

    const allTagsAndPostsCount = Array.from(allTags).map((tag) => {
      return { tag: tag, amount: this.getPostsByTag(tag).length };
    });

    return allTagsAndPostsCount;
  }

  public getPostsByTag(tag: string): Post[] {
    return this.getAllPosts()
      .filter((post) => post.tags.indexOf(tag) !== -1)
      .sort((postA, postB) => (postA.title < postB.title ? -1 : 1));
  }

  public getPostBySlug(slug: string): Post {
    try {
      const realSlug = slug.replace(/\.mdx$/, '');
      const fullPath = join(POSTS_DIRECTORY_PATH, `${realSlug}/${realSlug}.mdx`);
      console.log(fullPath);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const postFrontmatter = {
        ...data,
        slug: realSlug
      };

      return this.createPost(postFrontmatter as PostFrontmatter, content);
    } catch (e) {
      console.error(e);
      return {} as Post;
    }
  }

  /**
   * Returns the number of random blog posts that are used to suggest other articles for the user to read given a set of tags.
   *
   * Suggestion algorithm:
   * Check for other posts that share ANY tags with the provided list of tags (i.e. the existing post the user is viewing).
   *
   * @param numPosts Number of suggested blog posts to return
   * @param tags The set of tags to optionally check against. If no tags are provided a random set of Posts are returned without ANY tagging checks
   * @returns The number of posts requested
   */
  public getSuggestedBlogPosts(numPosts: number, tags?: string[]): Post[] {
    const allPosts = this.getAllPosts();

    if (!tags || tags?.length === 0)
      return allPosts.sort(() => Math.random() - Math.random()).slice(0, numPosts);

    return allPosts
      .filter((post) => post.tags.filter((value) => tags!.includes(value)).length !== 0)
      .sort(() => Math.random() - Math.random())
      .slice(0, numPosts);
  }

  private createPost = (frontmatterData: PostFrontmatter, articleMarkdown: string): Post => {
    const { title, slug, heroImagePath, shortBody, publishedAt, author, pinned, tags } =
      frontmatterData;

    return {
      title,
      slug,
      heroImagePath,
      shortBody,
      body: articleMarkdown,
      publishedAt,
      author,
      tags: tags.map((tag) => toKebabCase(tag)),
      pinned,
      readingTime: readingTime(articleMarkdown).text
    };
  };
}
