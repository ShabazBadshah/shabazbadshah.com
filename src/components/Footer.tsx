import { siteConfig } from '@/config/site';
import { content } from '@/content/content';

const SOCIAL_LINKS = content.footer.links;

const LINKS = [
  // ...siteConfig.nav,
  ...siteConfig.socials
    .filter(({ provider }) => provider in SOCIAL_LINKS)
    .map(({ provider, url }) => ({ label: SOCIAL_LINKS[provider], href: url }))
];

/** `narrow`: article-width column, used with the article layout */
const Footer = ({ narrow = false }: { narrow?: boolean }): JSX.Element => (
  <footer
    className={`mx-auto w-full px-4 pb-24 pt-16 sm:px-6 sm:pb-8 sm:pt-24 ${
      narrow ? 'max-w-article' : 'max-w-5xl'
    }`}
  >
    <p className="text-sm text-fg-muted">{content.footer.prompt}</p>
    <a
      href={siteConfig.socials.find((s) => s.provider === 'email')?.url}
      className="mt-3 block break-words text-[clamp(2.25rem,9vw,6.5rem)] font-semibold leading-[0.95] tracking-tighter no-underline transition-colors hover:text-accent"
    >
      {content.footer.cta}
    </a>

    <div className="mt-16 flex flex-col gap-6 border-t pt-6 sm:mt-24 sm:flex-row sm:items-center sm:justify-between">
      <nav aria-label={content.footer.navLabel}>
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
