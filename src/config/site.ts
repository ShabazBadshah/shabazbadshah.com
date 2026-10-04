export const siteConfig = {
  // Site metadata
  name: 'Shabaz Badshah',
  description:
    'I integrate product strategy with technical execution to solve impactful business problems.',
  url: 'https://shabazbadshah.com',

  // SEO
  seo: {
    title: 'Shabaz Badshah - Product Engineer (FDE) & Technical Product Consultant',
    description:
      'I integrate product strategy with technical execution to solve impactful business problems.',
    keywords: ['product management', 'technical consulting', 'healthcare digitization'],
    author: 'Shabaz Badshah',
    ogImage: '/images/og-image.png'
  },

  // Person / entity (structured data, llms.txt)
  person: {
    name: 'Shabaz Badshah',
    jobTitle: 'Product Engineer (FDE) & Technical Product Consultant',
    email: 'hello@shabazbadshah.com',
    image: '/images/avatar.webp',
    location: 'Ontario, Canada',
    knowsAbout: [
      'Product management',
      'Healthcare digitization',
      'Software architecture',
      'REST APIs',
      'Large language models',
      'PIPEDA and PHIPA compliance'
    ]
  },

  // Social profiles
  socials: [
    {
      name: '/in/shabaz-badshah',
      provider: 'linkedin' as const,
      url: 'https://www.linkedin.com/in/shabaz-badshah/',
      cta: 'Connect'
    },
    {
      name: 'hello@shabazbadshah.com',
      provider: 'email' as const,
      url: 'mailto:hello@shabazbadshah.com?subject=Hey%20Shabaz%20%F0%9F%91%8B',
      cta: 'Email'
    },
    {
      name: 'Video call',
      provider: 'video' as const,
      url: 'https://calendly.com/badshahconsulting/30min',
      cta: 'Video call'
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
    items: [
      { label: 'About', href: '/', section: 'home' },
      { label: 'Work', href: '/#work', section: 'work' },
      { label: 'Blog', href: '/#blog', section: 'blog' }
    ] as { label: string; href: string; section: 'home' | 'about' | 'work' | 'blog' }[],
    logo: {
      src: '/images/logo.png',
      alt: 'Shabaz Badshah Logo'
    }
  }
};
