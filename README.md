![logo](./public/images/logo.png)

# V7 - shabazbadshah.com

This is the 7th iteration of my site. The previous iteration moved the site from MUI to Tailwind, but kept most of the old layout. This one is a redesign: a simpler design with motion throughout, and a site built around my work and case studies instead of only blog posts.

## 🏁 Site Goals

1. Simplify the design and use motion to make the site feel alive
2. Show my work properly, with a work history and long-form case studies
3. Keep all site copy and project content in one place so it's easy to update

## 💻 System Preparation

If for whatever reason you want to run this site , or modify if for your own needs , you're going to need the following:

1. [NodeJS](http://nodejs.org) v24 - pinned via `engines` in `package.json`. Next 12 crashes on Node 25+.
2. [pnpm](https://pnpm.io/installation) v10
3. A unix-like shell (MacOS shell, Linux shells, or WSL should work)

## Running the app

The `.env` file is not commited to the repo, so it has to be manually configured

Create a `.env` file at the root of repo directoy with the following variables specified:

- NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

To run the app, open a shell and run the following

```bash
    pnpm install
    pnpm build
    pnpm dev
```

## 📋 Site Modifications

✅ I added in the following features:

1. Simplified design built on Tailwind v4 design tokens, with light and dark themes
2. Motion throughout with framer-motion: page transitions, cards that expand into articles, and an animated theme switch
3. Click sounds, a click ripple, custom cursors and a name tag that follows the mouse
4. A `/work` page with my current role, work history and long-form case studies written in Markdown
5. Code highlighting with Shiki and Mermaid diagrams in case studies and blog posts
6. A paginated blog index at `/blog`, and a full-screen article sheet that opens from the homepage
7. A contact dialog that opens from the nav
8. A `/clinics` page for Badshah Consulting's clinic work
9. All site copy lives in `src/content/content.ts` and all projects in `src/content/projects.ts`
10. Sitemap, `robots.txt`, `llms.txt` and `security.txt` are generated at build time
11. JSON-LD structured data, security headers and 301 redirects from the old routes

❌ I removed the following features:

1. MUI, SCSS and the shadcn UI components (everything is Tailwind now)
2. Tag pages and tag links on blog posts
3. Reading progress bar on blog posts
4. Weekly Syftable update on the homepage (Syftable lives on its own site now)
