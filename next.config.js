const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    // Don't fail builds on ESLint warnings during next build
    ignoreDuringBuilds: true
  },
  experimental: {
    esmExternals: false
  },
  images: {
    domains: [
      'shabazbadshah.com',
      'shabazbadshah.github.io',
      'localhost',
      'avatars.githubusercontent.com'
    ] // Accept images from Contentful blog and GitHub
  },
  env: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
  },
  webpack: (config) => {
    // Handle ESM packages from Radix UI
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    });
    return config;
  },
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

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer(nextConfig);
