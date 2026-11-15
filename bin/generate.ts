import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';

import { siteConfig } from '../src/config/site';
import { caseStudyProjects, type PublicProject } from '../src/content/projects';
import { getAllPosts } from '../src/lib/blog';
import { filled } from '../src/lib/todo';
import { plainText } from '../src/lib/utils';

/**
 * Writes every machine-readable file in public/ from src/config/site.ts, src/content/projects.ts
 * and content/*.mdx: robots.txt, sitemap.xml, manifest.webmanifest, llms.txt, llms-full.txt and
 * .well-known/security.txt. The outputs are git-ignored; this runs before `dev` and `build`.
 */

const { url: URL, name, person, llms } = siteConfig;
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const posts = getAllPosts();
/** Public views only: unnamed clients appear under their anonymized names */
const projects = caseStudyProjects();
const projectUrl = (project: PublicProject): string => `${URL}/work/${project.slug}`;
const blogPages = Math.max(1, Math.ceil(posts.length / siteConfig.postsPerPage));
const day = (date: string): string => dayjs(date).format('YYYY-MM-DD');

const write = (file: string, content: string): void => {
  const target = path.join(PUBLIC_DIR, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${content.trimEnd()}\n`);
};

const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  '# AI and answer-engine crawlers are welcome; see /llms.txt for a machine-readable summary',
  ...siteConfig.crawlers.flatMap((crawler) => [`User-agent: ${crawler}`, 'Allow: /', '']),
  `Sitemap: ${URL}/sitemap.xml`
].join('\n');

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...['/', '/work', '/clinics', '/blog'].map(
    (route) => `  <url><loc>${URL}${route}</loc></url>`
  ),
  ...projects.map((project) => `  <url><loc>${projectUrl(project)}</loc></url>`),
  ...Array.from(
    { length: blogPages - 1 },
    (_, i) => `  <url><loc>${URL}/blog/page/${i + 2}</loc></url>`
  ),
  ...posts.map(
    (post) =>
      `  <url><loc>${URL}/blog/posts/${post.slug}</loc><lastmod>${day(
        post.publishedAt
      )}</lastmod></url>`
  ),
  '</urlset>'
].join('\n');

const manifest = JSON.stringify(
  {
    name: siteConfig.host,
    short_name: name.replace(/\s/g, ''),
    description: siteConfig.description,
    start_url: '/',
    display: 'browser',
    background_color: siteConfig.themeColor.light,
    theme_color: siteConfig.themeColor.light,
    icons: [
      { src: siteConfig.assets.touchIcon, sizes: '500x500', type: 'image/png', purpose: 'any' }
    ]
  },
  null,
  2
);

const securityTxt = [
  `Contact: mailto:${person.email}`,
  `Expires: ${dayjs().add(siteConfig.securityTxtMonths, 'month').toISOString()}`,
  'Preferred-Languages: en',
  `Canonical: ${URL}/.well-known/security.txt`
].join('\n');

const llmsIndex = [
  `# ${name} (${person.name})`,
  '',
  `> ${person.name} is a ${person.jobTitle} based in ${person.location}. ${llms.focus}`,
  '',
  `This site is the personal and consulting website of ${person.name}. ${llms.usage}`,
  '',
  '## Pages',
  '',
  `- [Home](${URL}/): Introduction, selected work, how I work and recent blog posts`,
  `- [Work](${URL}/work): Work history timeline and case studies`,
  `- [Clinics](${URL}/clinics): Clinic websites for Ontario, focused on the GTA`,
  `- [Blog](${URL}/blog): All blog posts`,
  '',
  '## Case studies',
  '',
  ...projects.map((project) => `- [${project.name}](${projectUrl(project)}): ${project.summary}`),
  '',
  '## Blog',
  '',
  ...posts.map(
    (post) =>
      `- [${post.title}](${URL}/blog/posts/${post.slug}): ${plainText(post.shortBody)} (${day(
        post.publishedAt
      )})`
  ),
  '',
  '## Contact',
  '',
  ...siteConfig.socials.map(
    (social) => `- [${social.name}](${social.url.split('?')[0]}): ${social.cta}`
  ),
  '',
  '## Optional',
  '',
  `- [Full content for LLMs](${URL}/llms-full.txt): Complete text of every blog post and project`,
  `- [Sitemap](${URL}/sitemap.xml): All indexable URLs`
].join('\n');

const llmsFull = [
  llmsIndex,
  '',
  '---',
  '',
  '# Projects (full detail)',
  '',
  ...projects.flatMap((project) => [
    `## ${project.name}`,
    '',
    `URL: ${projectUrl(project)}`,
    ...(project.externalUrl ? [`Website: ${project.externalUrl}`] : []),
    ...(project.role ? [`Role: ${project.role}`] : []),
    '',
    project.summary,
    ...[
      ['Problem', project.problem],
      ['What I built', project.whatIBuilt],
      ['Outcome', project.outcome]
    ]
      .filter(([, value]) => filled(value))
      .map(([label, value]) => `- ${label}: ${value}`),
    ...(project.stack.length ? [`- Stack: ${project.stack.join(', ')}`] : []),
    ''
  ]),
  '---',
  '',
  '# Blog posts (full text)',
  '',
  ...posts.flatMap((post) => [
    `## ${post.title}`,
    '',
    `URL: ${URL}/blog/posts/${post.slug}`,
    `Published: ${day(post.publishedAt)}`,
    `Author: ${person.name}`,
    `Tags: ${post.tags.join(', ')}`,
    '',
    post.body.trim(),
    '',
    '---',
    ''
  ])
].join('\n');

write('robots.txt', robots);
write('sitemap.xml', sitemap);
write('manifest.webmanifest', manifest);
write('.well-known/security.txt', securityTxt);
write('llms.txt', llmsIndex);
write('llms-full.txt', llmsFull);

console.log(
  `Generated public/ files from site config (${posts.length} posts, ${projects.length} projects)`
);
