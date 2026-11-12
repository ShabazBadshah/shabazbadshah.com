import { m } from 'framer-motion';
import { ArrowLeft, ArrowUp, Moon, Send, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';

import { trackConnectLinkClick } from '@/analytics/tracking';
import { useContactDialog } from '@/components/ContactDialog';
import { siteConfig, type ContactSource, type NavSection } from '@/config/site';
import { content } from '@/content/content';

const LAYOUT_TRANSITION = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

/** Active nav item, from the route. /clinics belongs to Consulting. */
const activeSection = (pathname: string): NavSection | null => {
  if (pathname.startsWith('/work')) return 'work';
  if (pathname === '/consulting' || pathname === '/clinics') return 'consulting';
  if (pathname.startsWith('/blog')) return 'blog';
  return null;
};

/** Audience of the page, carried into the contact dialog's email and booking links */
const contactSource = (pathname: string): ContactSource => {
  if (pathname === '/consulting') return 'consulting';
  if (pathname === '/clinics') return 'clinics';
  return 'career';
};

/** Every control in the nav pill: icon buttons, the logo and the theme toggle / close slot */
const ICON_BUTTON =
  'grid size-10 shrink-0 cursor-pointer place-items-center rounded-pill text-fg-muted transition-colors hover:text-fg';

/** Detail pages get a back button to their index */
const BACK: Record<string, string> = {
  '/blog/posts/[slug]': '/blog',
  '/work/[slug]': '/work'
};

function ThemeToggle(): JSX.Element {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  // Reveal the new theme as a circle expanding from the button. The View Transitions API is
  // missing from this TypeScript version's DOM types; browsers without it switch instantly.
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? 'light' : 'dark';
    const doc = document as Document & {
      startViewTransition?: (update: () => void) => { ready: Promise<void> };
    };
    if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(next);
      return;
    }

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // flushSync commits the theme (next-themes applies its class in an effect) before the snapshot
    doc
      .startViewTransition(() => flushSync(() => setTheme(next)))
      .ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 750,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
  };

  const { theme } = content.nav;
  const label = !mounted ? theme.toggle : isDark ? theme.toLight : theme.toDark;

  return (
    <button type="button" onClick={toggle} aria-label={label} className={ICON_BUTTON}>
      {/* Both icons are rendered and swapped with CSS so there is no hydration mismatch or layout shift */}
      <Sun aria-hidden="true" className="hidden size-[18px] dark:block" />
      <Moon aria-hidden="true" className="size-[18px] dark:hidden" />
    </button>
  );
}

/** The nav pill's contents while it is expanded into the contact dialog */
function ContactPanel({ source }: { source: ContactSource }): JSX.Element {
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

/**
 * The floating nav pill. The send button grows the pill itself into the contact dialog (and back),
 * with the close button taking the theme toggle's spot in the top-right corner.
 */
function NavBar({ pathname }: { pathname: string }): JSX.Element {
  const active = activeSection(pathname);
  const { open: contactOpen, setOpen: setContactOpen } = useContactDialog();
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
  }, [contactOpen, setContactOpen]);
  useEffect(() => setContactOpen(false), [pathname, setContactOpen]);

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
        // One width open and closed, so the dialog only grows in height. The closed pill leaves room
        // on the right for the theme toggle; the open dialog runs its rows under the close button.
        className={`pointer-events-auto relative col-span-3 row-start-2 w-[min(25rem,100%)] justify-self-center sm:w-[25rem] border bg-elevated p-1 shadow-float backdrop-blur-lg backdrop-saturate-180 sm:col-span-1 sm:col-start-2 sm:row-start-1 ${
          contactOpen ? '' : 'pr-11'
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
                onClick={scrollHome}
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-pill"
              >
                <img
                  src={siteConfig.assets.favicon}
                  alt=""
                  width={32}
                  height={32}
                  className="size-7"
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
                    className={`relative inline-flex h-8 items-center rounded-pill px-[clamp(0.5rem,2.5vw,1rem)] text-[0.9375rem] font-medium no-underline transition-colors duration-150 ${
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
            <span aria-hidden="true" className="ml-auto mr-0.5 h-5 w-px bg-line" />
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
              <Send aria-hidden="true" className="size-[18px]" />
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
              <X aria-hidden="true" className="size-[18px]" />
            </button>
          ) : (
            <ThemeToggle />
          )}
        </m.div>
      </m.nav>
    </>
  );
}

/**
 * Shown once the reader has scrolled past the hero (or one viewport on pages without one).
 * Sits above the nav on mobile and floats bottom-right from sm.
 */
function ScrollToTop(): JSX.Element {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.getElementById('hero');
      const threshold = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
      setVisible(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={content.layout.scrollToTop.label}
      title={content.layout.scrollToTop.title}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`col-start-3 row-start-1 grid size-11 justify-self-end cursor-pointer place-items-center rounded-full border bg-elevated text-fg shadow-float backdrop-blur-lg backdrop-saturate-180 transition-[opacity,transform] duration-200 hover:border-line-strong sm:fixed sm:bottom-6 sm:right-6 ${
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </button>
  );
}

export default function Header(): JSX.Element | null {
  const { pathname, query } = useRouter();
  const back = BACK[pathname];

  // The article sheet takes over the whole screen
  if (query.post) return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 bottom-6 z-40 grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 sm:bottom-auto sm:top-8 sm:px-4">
      {/* Detail pages only; the article sheet has its own collapse control */}
      {back && (
        <Link href={back}>
          <a
            aria-label={content.nav.back}
            // Lined up with the nav pill, which grows downwards into the contact dialog from sm
            className="pointer-events-auto col-start-1 row-start-1 inline-flex h-10 items-center gap-1.5 justify-self-start rounded-pill border bg-elevated px-3 text-sm shadow-float font-medium text-fg-muted no-underline backdrop-blur-lg backdrop-saturate-180 transition-colors hover:text-fg sm:mt-1 sm:self-start sm:px-4"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">{content.nav.back}</span>
          </a>
        </Link>
      )}
      {/* Below sm the nav gets its own full-width row, with the back and scroll buttons above it */}
      <NavBar pathname={pathname} />
      <ScrollToTop />
    </header>
  );
}
