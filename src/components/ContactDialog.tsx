import { useEffect, useState } from 'react';

import { content } from '@/content/content';
import { siteConfig, type ContactSource } from '@/lib/site';
import { trackConnectLinkClick } from '@/lib/tracking';

/** The nav pill is expanded into the contact dialog */
let open = false;
const listeners = new Set<(open: boolean) => void>();

/** Lets anything on the page (the hero's call to action) open the contact dialog in the nav */
export const setContactOpen = (next: boolean): void => {
  open = next;
  listeners.forEach((listener) => listener(next));
};

/** Whether the contact dialog is open, re-rendering when it opens or closes */
export function useContactOpen(): boolean {
  const [value, setValue] = useState(open);
  useEffect(() => {
    listeners.add(setValue);
    setValue(open);
    return () => {
      listeners.delete(setValue);
    };
  }, []);
  return value;
}

/** The nav pill's contents while it is expanded into the contact dialog */
export function ContactPanel({ source }: { source: ContactSource }): JSX.Element {
  const { contact } = content.nav;
  // Email and booking links say which page the inquiry came from
  const href = (provider: string, url: string) => {
    if (provider === 'email') return siteConfig.contact.email(source);
    if (provider === 'video') return siteConfig.contact.booking(source);
    return url;
  };

  return (
    <div className="px-2 pb-2">
      {/* Same height as the close button beside it, and clear of it */}
      <h2 id="contact-title" className="flex h-10 items-center pl-1 pr-10 text-lg font-semibold">
        {contact.title}
      </h2>
      <p className="pl-1 text-sm text-fg-muted">{contact.body}</p>
      <ul className="mt-3 flex flex-col gap-1">
        {siteConfig.socials.map(({ provider, url, label, name, logo }) => {
          const link = href(provider, url);
          return (
            <li key={provider}>
              <a
                href={link}
                {...(link.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                onClick={() => trackConnectLinkClick(provider)}
                className="flex items-center gap-3 rounded-inner p-1.5 no-underline transition-colors hover:bg-fill"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border bg-white">
                  <img src={logo} alt="" aria-hidden="true" className="size-6 object-contain" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[0.9375rem] font-medium text-fg">{label}</span>
                  <span className="truncate text-sm text-fg-muted">{name}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
