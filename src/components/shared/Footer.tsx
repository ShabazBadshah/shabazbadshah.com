import { siteConfig } from '@/config/site';

const EMAIL = siteConfig.person.email;

const LINKS = [
  ...siteConfig.nav.items.map(({ label, href }) => ({ label, href })),
  ...siteConfig.socials
    .filter((social) => social.provider === 'linkedin' || social.provider === 'github')
    .map((social) => ({
      label: social.provider === 'github' ? 'GitHub' : 'LinkedIn',
      href: social.url
    })),
  {
    label: 'Book a call',
    href: siteConfig.socials.find((social) => social.provider === 'video')?.url ?? '#'
  }
];

/** `narrow`: 15% thinner column, used with the article layout */
const Footer = ({ narrow = false }: { narrow?: boolean }): JSX.Element => {
  return (
    <footer
      className={`mx-auto w-full px-4 pb-8 pt-16 sm:px-6 sm:pt-24 ${
        narrow ? 'max-w-[54.4rem]' : 'max-w-5xl'
      }`}
    >
      <p className="text-sm text-fg-muted">Have a project in mind?</p>
      <a
        href={`mailto:${EMAIL}`}
        className="mt-3 block break-words text-[clamp(2.25rem,9vw,6.5rem)] font-semibold leading-[0.95] tracking-tighter no-underline transition-colors hover:text-accent"
      >
        Let&apos;s work
        <br />
        together.
      </a>

      <div className="mt-16 flex flex-col gap-6 border-t border-line pt-6 sm:mt-24 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {LINKS.map(({ label, href }) => {
              const external = href.startsWith('http');
              return (
                <li key={label}>
                  <a
                    href={href}
                    className="text-fg-muted no-underline transition-colors hover:text-fg"
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <p className="text-sm text-fg-muted">
          ©{new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
