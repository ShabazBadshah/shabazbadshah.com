export type Post = {
  title: string;
  slug: string;
  heroImagePath: string;
  shortBody: string;
  body: any; // Leaving as 'any' since I convert between string --> MDX when popupulating post
  publishedAt: string;
  author: string;
  tags: string[];
  readingTime: string;
  pinned: boolean;
};

export type PostFrontmatter = {
  title: string;
  slug: string;
  heroImagePath: string;
  shortBody: string;
  publishedAt: string;
  author: string;
  tags: string[];
  pinned: boolean;
};

export type TagsWithAmount = {
  tag: string;
  amount: number;
};
