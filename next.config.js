const dotenv = require('dotenv');
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

// Next injects inline bootstrap scripts (and next-themes an inline no-flash script), so
// script-src needs 'unsafe-inline'. Dev additionally needs 'unsafe-eval' for React Refresh.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isProd ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://*.googletagmanager.com https://avatars.githubusercontent.com",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isProd ? ['upgrade-insecure-requests'] : [])
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' }
];

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
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      },
      {
        source: '/llms.txt',
        headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }]
      },
      {
        source: '/llms-full.txt',
        headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }]
      }
    ];
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
