import { ArrowUp } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/** Floating button, shown once the reader has scrolled past the hero (or one viewport on pages without one) */
const ScrollToTop = (): JSX.Element => {
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

  if (query.post) return <></>;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`glass fixed bottom-4 right-4 z-40 grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-elevated text-fg transition-[opacity,transform] duration-200 hover:border-line-strong sm:bottom-6 sm:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </button>
  );
};

export default ScrollToTop;
