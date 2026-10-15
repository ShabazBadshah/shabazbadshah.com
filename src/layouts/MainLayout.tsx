import { ArrowUp } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

/** Floating button, shown once the reader has scrolled past the hero (or one viewport on pages without one) */
function ScrollToTop(): JSX.Element | null {
  const [visible, setVisible] = useState(false);
  const { query } = useRouter();

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

  if (query.post) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-4 right-4 z-40 grid size-11 cursor-pointer place-items-center rounded-full border bg-elevated text-fg backdrop-blur-lg backdrop-saturate-180 transition-[opacity,transform] duration-200 hover:border-line-strong sm:bottom-6 sm:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      } cursor-pointer`}
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </button>
  );
}

type Props = {
  children: React.ReactNode;
  /** Article-width column, for pages that are a single article */
  narrow?: boolean;
};

const MainLayout = ({ children, narrow = false }: Props): JSX.Element => (
  <>
    <a
      href="#main"
      className="sr-only left-4 top-4 z-50 rounded-pill bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed"
    >
      Skip to content
    </a>
    <Header />
    <main
      id="main"
      className={`mx-auto w-full px-4 pb-16 pt-24 sm:px-6 sm:pt-28 ${
        narrow ? 'max-w-article' : 'max-w-5xl'
      }`}
    >
      {children}
    </main>
    <Footer narrow={narrow} />
    <ScrollToTop />
  </>
);

export default MainLayout;
