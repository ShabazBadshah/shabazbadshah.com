import { writeFileSync } from 'fs';
import path from 'path';
import prettier from 'prettier';
import { GlobSync } from 'glob';
import { basename } from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const SITE_BASE_URL = 'shabazbadshah.com.com';
const RELATIVE_PUBLIC_DIR_TO_SCRIPT_FILE = '../public';
const POSTS_ABSOLUTE_DIRECTORY_PATH = join(process.cwd(), '/content');
const PAGE_FILE_EXTENSION = '.tsx';
const BLACKLISTED_NON_BLOG_ROUTES = ['404', 'tags'];

const BLOG_URL_PATH = '/blog/posts';

/**
 * Generates a sitemap XML file for NextJS site for all routes in the /pages directory (except _*.tsx files)
 * Saves sitemap.xml to public directory by default
 *
 * TO RUN CWD TO THE SCRIPTS DIRECTORY AND RUN `npx ts-node generate-sitemap.ts`
 */
export async function generateFullSitemap(): Promise<void> {
  console.log('Generating Complete Sitemap');
  const pageSlugs = await new GlobSync(
    path.join(__dirname, `../pages/[!_]*${PAGE_FILE_EXTENSION}`)
  ).found
    .map((page) => basename(page, PAGE_FILE_EXTENSION))
    .filter((route) => !(BLACKLISTED_NON_BLOG_ROUTES.indexOf(route) > -1));

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${await generateSitemap(pageSlugs)}
      ${generateStaticBlogPostSitemap()}
    </urlset>
    `;

  console.log(`Writing sitemap.xml to ${RELATIVE_PUBLIC_DIR_TO_SCRIPT_FILE}/sitemap.xml`);
  writeFileSync(
    path.join(__dirname, `${RELATIVE_PUBLIC_DIR_TO_SCRIPT_FILE}/sitemap.xml`),
    prettier.format(sitemap, {
      parser: 'html'
    })
  );
}

function generateStaticBlogPostSitemap(): string {
  console.log('-- Generating NextJS Static Blog Sitemap');
  const slugs: string[] = getAllPostSlugs();

  return `${slugs
    .map((slug) => {
      const blogPostURL = `https://${SITE_BASE_URL}${BLOG_URL_PATH}/${slug}`;
      const publishedAt = getPostFrontmatterBySlug(slug).publishedAt;

      if (typeof publishedAt !== 'string') {
        return;
      }

      return `
        <url>
            <loc> ${blogPostURL} </loc>
            <lastmod> ${publishedAt} </lastmod>
        </url>
      `;
    })
    .join('')}`;
}

type PostFrontmatter = {
  title: string;
  slug: string;
  heroImagePath: string;
  shortBody: string;
  publishedAt: string;
  author: string;
  tags: string[];
  pinned: boolean;
};

function getPostFrontmatterBySlug(slug: string): PostFrontmatter {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');

    if (realSlug[0] === '.') {
      return {} as PostFrontmatter;
    }

    const fullPath = join(POSTS_ABSOLUTE_DIRECTORY_PATH, `${realSlug}/${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const postFrontmatter = {
      ...data,
      slug: realSlug
    };
    return postFrontmatter as PostFrontmatter;
  } catch (e) {
    console.error(e);
    return {} as PostFrontmatter;
  }
}

function getAllPostSlugs(): string[] {
  return fs.readdirSync(POSTS_ABSOLUTE_DIRECTORY_PATH);
}

/**
 * Generates the pages the sitemap using all the non-blacklisted pages in the NextJS /pages directory. Returns a string representing the site XML portion of the final sitemap.xml file
 * @returns string, representing the site portion of the sitemap. Returns <url> tags
 * @example
 * <url>
 *    <loc> https://shabazbadshah.com/ </loc>
 *  </url>
 */
async function generateSitemap(pageSlugs: string[]): Promise<string> {
  console.log('-- Generating NextJS Sitemap');
  return pageSlugs
    .map((page: string) => {
      const route = page === 'index' ? '' : page;
      return `
      <url>
          <loc> ${`https://${SITE_BASE_URL}/${route}`} </loc>
      </url>
    `;
    })
    .join('');
}

/**
 * @usage generate-sitemap [.envFilePath]
 */
async function main() {
  try {
    let envFilePath: string = process.argv[2];

    if (envFilePath === undefined) {
      envFilePath = './.env';
      console.log('.env file path not provided, using .env in CWD');
    } else {
      console.log(`.env file path provided, using .env at path: ${envFilePath}`);
    }

    dotenv.config({ path: envFilePath });

    await generateFullSitemap();
  } catch (e) {
    console.error(e);
    console.error('Could not generate sitemap.xml file');
  }
}

main();
