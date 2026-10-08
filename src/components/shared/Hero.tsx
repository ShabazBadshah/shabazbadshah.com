import { CalendarDays } from 'lucide-react';
import { useState } from 'react';

import PageDim from '@/components/shared/PageDim';
import Socials from '@/components/shared/Socials';
import { siteConfig } from '@/config/site';

const HERO_TITLE = `Hey 👋, I'm Shabaz Badshah`;
const HERO_DESC = `I’m a product engineer with 5+ years in technical product management and software development roles, I build things end-to-end. I figure out what’s worth making, why it's useful, write the code, and make sure it's supported after launch.`;
const SYFTABLE_URL = 'https://syftable.com';

const CALENDLY_URL = siteConfig.socials.find((social) => social.provider === 'video')?.url ?? '#';

/** Intro card content: name, one-line description and contact links */
const Hero = (): JSX.Element => {
  const [syftableActive, setSyftableActive] = useState(false);

  return (
    <>
      <PageDim active={syftableActive} />
      {/* <div className="mb-8 flex flex-wrap items-center gap-2">
        <FaCanadianMapleLeaf aria-hidden="true" className="size-3.5 fill-red-500" />
        <p className="text-sm">Made in Canada</p>
      </div> */}

      <div className="max-w-xl flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/images/profile.png"
            alt={HERO_TITLE}
            width={48}
            height={48}
            className="size-20 rounded-full object-cover border border-gray-200"
          />
          <h1 className="text-lg">{HERO_TITLE}</h1>
        </div>
        <p className="text-fg-muted">{HERO_DESC}</p>
        <p className="text-fg-muted">
          I'm currently bootstrapping{' '}
          <a
            href={SYFTABLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setSyftableActive(true)}
            onMouseLeave={() => setSyftableActive(false)}
            onFocus={() => setSyftableActive(true)}
            onBlur={() => setSyftableActive(false)}
            className="group relative z-50 inline-flex items-center gap-1.5 rounded-lg bg-fill px-1.5 mr-1 align-middle font-medium text-fg no-underline transition-colors hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white"
          >
            <img
              src="/images/logos/syftable.svg"
              alt=""
              aria-hidden="true"
              width={16}
              height={16}
              className="size-4 transition-[filter] group-hover:invert group-focus-visible:invert"
            />
            Syftable
          </a>
          which keeps track of your work so you don't have to. It catches what you owe and surfaces
          what you need, without a single prompt, all on your computer.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={CALENDLY_URL} className="pill pill-accent text-sm w-fit h-0.5">
          <CalendarDays aria-hidden="true" className="size-5" />
          Let's work together
        </a>
        <a href="#work" className="pill size-5 text-sm w-fit">
          View selected works
        </a>
      </div>

      <div className="mt-6">
        <Socials />
      </div>
    </>
  );
};

export default Hero;
