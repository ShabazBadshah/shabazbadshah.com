import { Post, TagsWithAmount } from './types';
import LocalBlogService from './local-blog.service';

export default class BlogAPI {
  private _client;

  constructor() {
    this._client = new LocalBlogService();
  }

  getAllPosts(): Post[] {
    return this._client.getAllPosts();
  }

  getAllPostSlugs(): string[] {
    return this._client.getAllPostSlugs();
  }

  getPostBySlug(slug: string): Post {
    return this._client.getPostBySlug(slug);
  }

  getSuggestedBlogPosts(numPosts: number, tags?: string[]): Post[] {
    return this._client.getSuggestedBlogPosts(numPosts, tags);
  }

  getAllTags(): TagsWithAmount[] {
    return this._client.getAllTags();
  }

  getPostsByTag(tag: string): Post[] {
    return this._client.getPostsByTag(tag);
  }
}
