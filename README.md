![logo](./public/images/logo.png)

# V7 - shabazbadshah.com

This is the 7th iteration of my site. It uses motion and has a cleaner design overall.

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
