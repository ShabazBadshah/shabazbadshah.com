import { Send } from 'lucide-react';
import { useState } from 'react';

import { trackConnectLinkClick } from '@/analytics/tracking';
import { siteConfig, type SocialProvider } from '@/config/site';
import { content } from '@/content/content';

const { socials } = siteConfig;
const { hero } = content;

// Fill colour that expands from behind the logo on hover
const HOVER_BG: Record<SocialProvider, string> = {
  video: 'bg-gray-200',
  email: 'bg-gray-200',
  linkedin: 'bg-[#007EBB]',
  github: 'bg-[#1B1F23]'
};

const externalProps = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};

/** Intro card content: name, one-line description and contact links */
export default function Hero(): JSX.Element {
  const [syftableActive, setSyftableActive] = useState(false);
  const { syftable } = siteConfig.hero;

  return (
    <>
      {/* Dims the page (header included); the Syftable link is raised above it */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[45] bg-black/30 transition-opacity duration-300 ${
          syftableActive ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="flex max-w-xl flex-col gap-4">
        <div className="flex items-center gap-3">
          <img
            src={siteConfig.person.image}
            alt={hero.title}
            width={80}
            height={80}
            className="size-20 rounded-full border object-cover"
          />
          <h1 className="text-lg">{hero.title}</h1>
        </div>
        <p className="text-fg-muted">{hero.intro}</p>
        <p className="text-fg-muted">
          {hero.syftable.before}{' '}
          <a
            href={syftable.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setSyftableActive(true)}
            onMouseLeave={() => setSyftableActive(false)}
            onFocus={() => setSyftableActive(true)}
            onBlur={() => setSyftableActive(false)}
            className="group relative z-50 mr-1 inline-flex items-center gap-1.5 rounded-lg bg-fill px-1.5 align-middle font-medium text-fg no-underline transition-colors hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white"
          >
            <img
              src={syftable.logo}
              alt=""
              aria-hidden="true"
              width={16}
              height={16}
              className="size-4 transition-[filter] group-hover:invert group-focus-visible:invert"
            />
            {hero.syftable.name}
          </a>
          {hero.syftable.after}
        </p>
      </div>

      <div className="mt-8 flex gap-3 sm:flex-wrap sm:justify-start">
        <a href={siteConfig.booking} className="pill pill-accent flex-1 text-sm sm:flex-none">
          <Send aria-hidden="true" className="size-5" />
          {hero.ctaPrimary}
        </a>
        <a
          href="#work"
          className="pill flex-1 text-center sm:flex-none bg-gray-50 dark:bg-transparent dark:border-gray-50 text-sm"
        >
          {hero.ctaSecondary}
        </a>
      </div>

      <ul
        aria-label={hero.socialsLabel}
        className="mt-6 flex justify-center gap-4 sm:justify-start sm:gap-2"
      >
        {socials.map(({ provider, url, label, logo }) => (
          <li key={provider}>
            <a
              href={url}
              aria-label={label}
              title={label}
              className="group relative grid size-[46px] place-items-center sm:size-10 overflow-hidden rounded-lg border bg-white transition-colors hover:border-line-strong"
              {...externalProps(url)}
              onClick={() => trackConnectLinkClick(provider)}
            >
              <span
                aria-hidden="true"
                className={`absolute left-1/2 top-1/2 size-[200%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full transition-transform duration-400 ease-out group-hover:scale-100 group-focus-visible:scale-100 motion-reduce:transition-none ${HOVER_BG[provider]}`}
              />
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                className={`relative size-7 object-contain sm:size-6 ${
                  provider === 'github' ? 'transition-[filter] group-hover:invert' : ''
                }`}
              />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
