export const siteConfig = {
  // Site metadata
  name: 'Badshah Consulting',
  description:
    'I integrate product strategy with technical execution to solve impactful business problems.',
  url: 'https://shabazbadshah.com',

  // SEO
  seo: {
    title: 'Badshah Consulting - Technical Product Consultant',
    description:
      'I integrate product strategy with technical execution to solve impactful business problems.',
    keywords: ['product management', 'technical consulting', 'healthcare digitization'],
    author: 'Shabaz Badshah',
    ogImage: '/images/og-image.png'
  },

  // Social profiles
  socials: [
    {
      name: 'hello@shabazbadshah.com',
      provider: 'email' as const,
      url: 'mailto:hello@shabazbadshah.com?Subject=Hey%20Shabaz 👋',
      cta: 'Email'
    },
    {
      name: '/in/shabaz-badshah',
      provider: 'linkedin' as const,
      url: 'https://www.linkedin.com/in/shabaz-badshah/',
      cta: 'Connect'
    },
    {
      name: '@ShabazBadshah',
      provider: 'github' as const,
      url: 'https://github.com/ShabazBadshah',
      cta: 'Follow'
    }
  ],

  // Navigation
  nav: {
    logo: {
      src: '/images/logo.png',
      alt: 'Badshah Consulting Logo'
    }
  }
};
