import Link from 'next/link';

import { siteConfig, type ContactSource } from '@/config/site';
import { content } from '@/content/content';

const { footer } = content;
const SOCIAL_LINKS = footer.links;

const external = { target: '_blank', rel: 'noopener noreferrer' };
const LINK = 'text-fg-muted no-underline transition-colors hover:text-fg';

const LINKS = [
  ...siteConfig.socials
    .filter(({ provider }) => provider in SOCIAL_LINKS)
    .map(({ provider, url }) => ({ label: SOCIAL_LINKS[provider], href: url })),
  { label: footer.syftable, href: siteConfig.syftable.url }
];

type Props = {
  /** Article-width column, used with the article layout */
  narrow?: boolean;
  /** Audience of the page: picks the call to action and is passed along with the inquiry */
  source?: ContactSource;
};

const Footer = ({ narrow = false, source = 'career' }: Props): JSX.Element => {
  const cta = footer.cta[source];
  const email = siteConfig.contact.email(source);
  const booking = siteConfig.contact.booking(source);
  // A role inquiry starts with an email; a consulting one with a call
  const bookFirst = source !== 'career';

  return (
    <footer
      id="contact"
      className={`mx-auto w-full scroll-mt-8 px-4 pb-24 pt-16 sm:px-6 sm:pb-8 sm:pt-24 ${
        narrow ? 'max-w-article' : 'max-w-5xl'
      }`}
    >
      <p className="text-sm text-fg-muted">{cta.prompt}</p>
      <a
        href={bookFirst ? booking : email}
        {...(bookFirst && external)}
        className="mt-3 block break-words text-[clamp(2.25rem,9vw,6.5rem)] font-semibold leading-[0.95] tracking-tighter no-underline transition-colors hover:text-accent"
      >
        {cta.label}
      </a>
      <p className="mt-4 text-sm text-fg-muted">
        {footer.or}{' '}
        {bookFirst ? (
          <a href={email} className="font-medium text-accent no-underline hover:underline">
            {siteConfig.person.email}
          </a>
        ) : (
          <a
            href={booking}
            {...external}
            className="font-medium text-accent no-underline hover:underline"
          >
            {footer.orBook}
          </a>
        )}
      </p>

      <div className="mt-16 flex flex-col gap-6 border-t pt-6 sm:mt-24 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label={footer.navLabel}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <Link href={siteConfig.business.path}>
                <a className={LINK}>{footer.consulting}</a>
              </Link>
            </li>
            {LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className={LINK} {...external}>
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
};

export default Footer;
