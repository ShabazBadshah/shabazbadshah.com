![logo](./readme-logo.png)

# V5 - shabazbadshah.github.io

This is the 5hth iteration of my site. My pervious iteration of my site was built using [Jekyll](https://www.gatsbyjs.com/) which sufficed for my needs at the time. However I've been using NextJS for all my projects (including professional) and have been loving it. I've done lots of work with it and can use existing work to iterate on my personal site faster.

## 🏁 Site Goals

1. Move to NextJS framework away from GatsbyJS (this is looking the last-ever framework I'll need)
2. Utilize MUI library since I've been using it for all my professional and hobby projects
3. Allow for easier maintainability of the codebase

## 💻 System Preparation

If for whatever reason you want to run this site , or modify if for your own needs , you're going to need the following:

1. [NodeJS+NPM](http://nodejs.org) - use the installer or CLI.
2. A unix-like shell (MacOS shell, Linux shells, or WSL should work)

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

This work was based off initial work from [Brian Ruiz's Gatsby Medium Blog](https://github.com/BrianRuizy/gatsby-medium-blog/tree/master/src) 🥳.

✅ I added in the following features:

1. Entire site has been rewritten in Typescript
2. Site is now written in NextJS and not GatsbyJS
3. Blog posts are written in MDX and their contents are stored in individual blog folders
4. Sitemap for the site is generated for all blog posts
5. Integrated Google Analytics tracking
6. Added a hero section on the homepage for important items
7. Homepage design is DRASTICALLY simplified
8. Easier means to add a custom article suggestion mechanism (currently I base it off similar tags)
9. Use absolute paths for all component imports

❌ I removed the following features:

1. Bottom navigation bar on mobile (it's a slideable drawer menu now)
2. Search capability for blog posts
3. Projects/works tabs. Only blog posts show on the homepage
4. Contact/email signup form
5. Left sidebar. Right sidebar is now the header
6. Dark/light mode switch (might add in a future iteration)
