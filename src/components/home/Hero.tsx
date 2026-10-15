import { CalendarDays } from 'lucide-react';
import { useState } from 'react';

import { trackConnectLinkClick } from '@/analytics/tracking';
import { siteConfig, type SocialProvider } from '@/config/site';

const { hero, socials } = siteConfig;

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
  const { syftable } = hero;

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
          I'm currently bootstrapping{' '}
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
            {syftable.name}
          </a>
          which keeps track of your work so you don't have to. It catches what you owe and surfaces
          what you need, without a single prompt, all on your computer.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={siteConfig.booking} className="pill pill-accent text-sm">
          <CalendarDays aria-hidden="true" className="size-5" />
          Let's work together
        </a>
        <a href="#work" className="pill bg-gray-50 text-sm">
          View selected works
        </a>
      </div>

      <ul aria-label="Connect" className="mt-6 flex gap-2">
        {socials.map(({ provider, url, label, logo }) => (
          <li key={provider}>
            <a
              href={url}
              aria-label={label}
              title={label}
              className="group relative grid size-10 place-items-center overflow-hidden rounded-lg border bg-white transition-colors hover:border-line-strong"
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
                className={`relative size-6 object-contain ${
                  provider === 'github' ? 'transition-[filter] group-hover:invert dark:invert' : ''
                }`}
              />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
