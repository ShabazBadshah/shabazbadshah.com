const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ['shabazbadshah.com', 'shabazbadshah.github.io', 'localhost'] // Accept images from Contentful blog
  },
  env: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
  },
  webpack: (config) => {
    return config;
  },
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  async redirects() {
    return [
      {
        source: '/blog/posts',
        destination: '/blog',
        permanent: true
      }
    ];
  }
};

const withTM = require('next-transpile-modules')(['@mui/material']);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer(withTM(nextConfig));
