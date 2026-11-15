import { m } from 'framer-motion';
import { Send, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, type MouseEvent } from 'react';

import { ContactPanel, setContactOpen, useContactOpen } from '@/components/ContactDialog';
import ThemeToggle from '@/components/ThemeToggle';
import { content } from '@/content/content';
import { useCloseSound } from '@/lib/close-sound';
import { activeSection, contactSource, siteConfig } from '@/lib/site';

const LAYOUT_TRANSITION = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

/** Every control in the nav pill: icon buttons, the logo and the theme toggle / close slot */
const ICON_BUTTON =
  'grid size-11 shrink-0 cursor-pointer place-items-center rounded-pill text-fg-muted transition-colors hover:text-fg';

/**
 * The floating nav pill. The send button grows the pill itself into the contact dialog (and back),
 * with the close button taking the theme toggle's spot in the top-right corner.
 */
export default function NavBar({ pathname }: { pathname: string }): JSX.Element {
  const active = activeSection(pathname);
  const contactOpen = useContactOpen();
  useCloseSound(contactOpen);
  const navRef = useRef<HTMLElement>(null);
  const sendRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Whatever opened the dialog (the send button or the hero's call to action), to refocus on close
  const opener = useRef<HTMLElement | null>(null);

  // Focus follows the dialog: into it on open, back to what opened it on close
  useEffect(() => {
    if (contactOpen) {
      opener.current = document.activeElement as HTMLElement | null;
      closeRef.current?.focus({ preventScroll: true });
    } else if (opener.current) {
      const target = opener.current.isConnected ? opener.current : sendRef.current;
      target?.focus({ preventScroll: true });
      opener.current = null;
    }
  }, [contactOpen]);

  // Escape, a click outside, or leaving the page closes it
  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setContactOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setContactOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [contactOpen]);
  useEffect(() => setContactOpen(false), [pathname]);

  // Next's router jumps to the top on a route change; on the home page glide there instead,
  // like the hash links do, and drop any #contact from the URL
  const scrollHome = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') return;
    event.preventDefault();
    window.history.replaceState(window.history.state, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { contact } = content.nav;
  // Fades the new contents in once the pill has mostly reshaped. Not on the first render, so the
  // server-rendered links are visible before hydration.
  const everOpened = useRef(false);
  if (contactOpen) everOpened.current = true;
  const reveal = {
    initial: everOpened.current ? { opacity: 0 } : false,
    animate: { opacity: 1 },
    transition: { duration: 0.2, delay: 0.1 }
  };

  return (
    <>
      {/* Blurs and dims the page behind the open dialog; a click on it closes the dialog */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 bg-black/10 backdrop-blur-[3px] transition-opacity duration-300 ${
          contactOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <m.nav
        ref={navRef}
        layout
        transition={LAYOUT_TRANSITION}
        // Set here, not as a class, so framer keeps the corners round while the pill scales
        style={{ borderRadius: 24 }}
        aria-label={content.nav.label}
        // The closed pill is as wide as its links, leaving room on the right for the theme toggle;
        // the open dialog is wider, and runs its rows under the close button. Below sm the open
        // dialog takes the whole row, over the back and scroll buttons.
        className={`pointer-events-auto relative z-10 row-start-1 max-w-full justify-self-center border bg-elevated p-1 shadow-float backdrop-blur-lg backdrop-saturate-180 sm:col-span-1 sm:col-start-2 ${
          contactOpen ? 'col-span-3 col-start-1 w-[25rem]' : 'col-start-2 pr-12'
        }`}
      >
        {contactOpen ? (
          <m.div
            key="contact"
            layout="position"
            {...reveal}
            id="contact-dialog"
            role="dialog"
            aria-labelledby="contact-title"
          >
            <ContactPanel source={contactSource(pathname)} />
          </m.div>
        ) : (
          <m.div key="links" layout="position" {...reveal} className="flex items-center gap-0.5">
            <Link href="/" prefetch={false}>
              <a
                aria-label={content.nav.home}
                aria-current={pathname === '/' ? 'page' : undefined}
                onClick={scrollHome}
                className="relative inline-flex size-11 shrink-0 items-center justify-center rounded-pill"
              >
                {pathname === '/' && (
                  <m.span
                    layoutId="nav-active"
                    transition={LAYOUT_TRANSITION}
                    className="absolute inset-0 rounded-pill bg-fill"
                    aria-hidden="true"
                  />
                )}
                <img
                  src={siteConfig.assets.favicon}
                  alt=""
                  width={32}
                  height={32}
                  className="relative size-8"
                />
              </a>
            </Link>
            {siteConfig.nav.map((item) => {
              const isActive = active === item.section;
              return (
                <Link key={item.label} href={item.href} prefetch={false}>
                  <a
                    aria-current={isActive ? 'page' : undefined}
                    // The same at every width; the side padding only tightens on phones too
                    // narrow for the full 1rem
                    className={`relative inline-flex h-11 items-center rounded-pill px-[clamp(0.5rem,2.5vw,1rem)] text-base font-medium no-underline transition-colors duration-150 ${
                      isActive ? 'text-accent' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <m.span
                        layoutId="nav-active"
                        transition={LAYOUT_TRANSITION}
                        className="absolute inset-0 rounded-pill bg-fill"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </Link>
              );
            })}
            <span aria-hidden="true" className="mx-0.5 h-6 w-px bg-line" />
            <button
              ref={sendRef}
              type="button"
              aria-label={contact.open}
              title={contact.open}
              aria-expanded={false}
              aria-controls="contact-dialog"
              onClick={() => setContactOpen(true)}
              className={ICON_BUTTON}
            >
              <Send aria-hidden="true" className="size-5" />
            </button>
          </m.div>
        )}
        {/* One spot for the theme toggle and the dialog's close button */}
        <m.div layout="position" transition={LAYOUT_TRANSITION} className="absolute right-1 top-1">
          {contactOpen ? (
            <button
              ref={closeRef}
              type="button"
              aria-label={contact.close}
              title={contact.close}
              aria-expanded
              aria-controls="contact-dialog"
              data-close-sound
              onClick={() => setContactOpen(false)}
              className={ICON_BUTTON}
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          ) : (
            <ThemeToggle className={ICON_BUTTON} />
          )}
        </m.div>
      </m.nav>
    </>
  );
}
