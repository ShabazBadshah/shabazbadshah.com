import { siteConfig } from '@/config/site';

const SOCIAL_LINKS: Record<string, string> = {
  linkedin: 'LinkedIn',
  github: 'GitHub',
  video: 'Meet virtually'
};

const LINKS = [
  // ...siteConfig.nav,
  ...siteConfig.socials
    .filter(({ provider }) => provider in SOCIAL_LINKS)
    .map(({ provider, url }) => ({ label: SOCIAL_LINKS[provider], href: url }))
];

/** `narrow`: article-width column, used with the article layout */
const Footer = ({ narrow = false }: { narrow?: boolean }): JSX.Element => (
  <footer
    className={`mx-auto w-full px-4 pb-8 pt-16 sm:px-6 sm:pt-24 ${
      narrow ? 'max-w-article' : 'max-w-5xl'
    }`}
  >
    <p className="text-sm text-fg-muted">Does my skillset sound like a great fit for your team?</p>
    <a
      href={siteConfig.socials.find((s) => s.provider === 'email')?.url}
      className="mt-3 block break-words text-[clamp(2.25rem,9vw,6.5rem)] font-semibold leading-[0.95] tracking-tighter no-underline transition-colors hover:text-accent"
    >
      Let&apos;s talk
    </a>

    <div className="mt-16 flex flex-col gap-6 border-t pt-6 sm:mt-24 sm:flex-row sm:items-center sm:justify-between">
      <nav aria-label="Footer">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-fg-muted no-underline transition-colors hover:text-fg"
                {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="text-sm text-fg-muted">
        ©{new Date().getFullYear()} {siteConfig.name}
      </p>
    </div>
  </footer>
);

export default Footer;
