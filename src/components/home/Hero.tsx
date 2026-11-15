import { Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useContactDialog } from '@/components/ContactDialog';
import { siteConfig } from '@/config/site';
import { content } from '@/content/content';

const { hero } = content;

/** Intro: name, headline, what I'm doing now and calls to action */
export default function Hero(): JSX.Element {
  const [syftableActive, setSyftableActive] = useState(false);
  const contactDialog = useContactDialog();
  const { syftable } = siteConfig;

  return (
    <>
      {/* Dims the page (header included); the Syftable link is raised above it */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[45] bg-black/30 transition-opacity duration-300 ${
          syftableActive ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="flex max-w-2xl flex-col gap-4">
        <div className="flex items-center gap-3">
          <img
            src={siteConfig.person.image}
            alt=""
            width={80}
            height={80}
            className="size-20 rounded-full border object-cover"
          />
          <div>
            <p className="text-lg">{hero.name}</p>
            <p className="text-fg-muted">{hero.role}</p>
          </div>
        </div>
        {/* Larger than the section titles below, so the intro is read first */}
        <h1 className="text-2xl font-medium leading-snug tracking-tight sm:text-4xl">
          {hero.title}
        </h1>
        <p className="text-lg text-fg-muted sm:text-xl">
          <span className="font-medium text-fg">{hero.currentlyLabel}: </span>
          {hero.currently.before}{' '}
          <a
            href={syftable.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setSyftableActive(true)}
            onMouseLeave={() => setSyftableActive(false)}
            onFocus={() => setSyftableActive(true)}
            onBlur={() => setSyftableActive(false)}
            className="group relative z-50 inline-flex items-center gap-1.5 rounded-lg px-1.5 align-middle font-medium text-fg no-underline transition-colors hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white"
          >
            <img
              src={syftable.logo}
              alt=""
              aria-hidden="true"
              width={16}
              height={16}
              className="size-4 transition-[filter] group-hover:invert group-focus-visible:invert"
            />
            {hero.currently.syftable}
          </a>
          {hero.currently.after}
        </p>
      </div>

      <div className="mt-8 flex gap-3 sm:flex-wrap sm:justify-start">
        {/* Opens the contact dialog in the nav */}
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => contactDialog.setOpen(true)}
          className="pill pill-accent flex-1 cursor-pointer text-sm sm:flex-none"
        >
          <Send aria-hidden="true" className="size-5" />
          {hero.ctaPrimary}
        </button>
        <Link href="/work">
          <a className="pill flex-1 text-center sm:flex-none bg-gray-50 dark:bg-transparent border-fg hover:border-fg text-sm">
            {hero.ctaSecondary}
          </a>
        </Link>
      </div>
    </>
  );
}
