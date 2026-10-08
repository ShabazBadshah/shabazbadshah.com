import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dayjs from 'dayjs';

import { PROJECTS } from '../src/content/projects';
import { siteConfig } from '../src/config/site';

/**
 * Generates /llms.txt (index, https://llmstxt.org) and /llms-full.txt (index + full post text)
 * from the same sources the site renders: src/content/projects.ts, config/site.ts and content/*.mdx.
 * Runs after `next build` alongside the sitemap.
 */

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const CONTENT_DIR = path.join(process.cwd(), 'content');
const URL = siteConfig.url;

type PostData = {
  slug: string;
  title: string;
  shortBody: string;
  publishedAt: string;
  tags: string[];
  markdown: string;
};

const stripMarkdown = (value: string): string => value.replace(/\*\*/g, '');

const readPosts = (): PostData[] =>
  fs
    .readdirSync(CONTENT_DIR)
    .filter((slug) => slug[0] !== '.')
    .map((slug) => {
      const file = fs.readFileSync(path.join(CONTENT_DIR, slug, `${slug}.mdx`), 'utf8');
      const { data, content } = matter(file);
      return {
        slug,
        title: data.title,
        shortBody: data.shortBody,
        publishedAt: dayjs(data.publishedAt).format('YYYY-MM-DD'),
        tags: data.tags ?? [],
        // Drop JSX-only lines (e.g. <ArticleCTA />) that are meaningless as plain text
        markdown: content
          .split('\n')
          .filter((line) => !/^\s*<[A-Z][A-Za-z]*[^>]*\/>\s*$/.test(line))
          .join('\n')
          .trim()
      };
    })
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));

const contactLines = (): string[] =>
  siteConfig.socials.map((social) => {
    const url = social.url.split('?')[0];
    return `- [${social.name}](${url}): ${social.cta}`;
  });

const buildIndex = (posts: PostData[]): string => {
  const lines: string[] = [
    `# ${siteConfig.name} (${siteConfig.person.name})`,
    '',
    `> ${siteConfig.person.name} is a ${siteConfig.person.jobTitle} based in ${siteConfig.person.location}. He integrates product strategy with technical execution to solve impactful business problems, with a specialty in healthcare digitization in Ontario: secure, compliance-first infrastructure for independent clinics.`,
    '',
    'This site is the personal and consulting website of Shabaz Badshah. Content below is free to summarize and cite with attribution and a link to the source page.',
    '',
    '## Pages',
    '',
    `- [Home](${URL}/): Introduction, about, contact links, selected work and blog posts`,
    '',
    '## Selected work',
    ''
  ];

  PROJECTS.forEach((project) => {
    lines.push(
      `- [${project.title}](${URL}/#work): ${project.metric}. ${project.description}`
    );
  });

  lines.push('', '## Blog', '');
  posts.forEach((post) => {
    lines.push(
      `- [${post.title}](${URL}/blog/posts/${post.slug}): ${stripMarkdown(post.shortBody)} (${
        post.publishedAt
      })`
    );
  });

  lines.push('', '## Contact', '', ...contactLines());
  lines.push(
    '',
    '## Optional',
    '',
    `- [Full content for LLMs](${URL}/llms-full.txt): Complete text of every blog post and project`,
    `- [Sitemap](${URL}/sitemap.xml): All indexable URLs`
  );

  return `${lines.join('\n')}\n`;
};

const buildFull = (posts: PostData[]): string => {
  const lines: string[] = [
    buildIndex(posts).trimEnd(),
    '',
    '---',
    '',
    '# Projects (full detail)',
    ''
  ];

  PROJECTS.forEach((project) => {
    lines.push(
      `## ${project.title}`,
      '',
      `URL: ${URL}/#work`,
      `Website: ${project.website}`
    );
    lines.push(`Role: ${project.role}`, `Headline result: ${project.metric}`);
    if (project.expertise) lines.push(`Expertise: ${project.expertise}`);
    lines.push('', project.description);
    if (project.features) {
      lines.push('');
      project.features.forEach((feature) =>
        lines.push(`- ${feature.title}: ${feature.description}`)
      );
    }
    lines.push('');
  });

  lines.push('---', '', '# Blog posts (full text)', '');
  posts.forEach((post) => {
    lines.push(
      `## ${post.title}`,
      '',
      `URL: ${URL}/blog/posts/${post.slug}`,
      `Published: ${post.publishedAt}`,
      `Author: ${siteConfig.person.name}`,
      `Tags: ${post.tags.join(', ')}`,
      '',
      post.markdown,
      '',
      '---',
      ''
    );
  });

  return `${lines.join('\n')}\n`;
};

const main = (): void => {
  const posts = readPosts();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), buildIndex(posts));
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), buildFull(posts));
  console.log(
    `Wrote llms.txt and llms-full.txt (${posts.length} posts, ${PROJECTS.length} projects)`
  );
};

main();
