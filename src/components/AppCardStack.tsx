import { m, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import type { ProjectMedia } from '@/content/projects';

const STACK_INTERVAL_MS = 4000;

/** Pose per depth: 0 is the front card, the rest fan out behind it. */
const STACK_POSES = [
  { x: '0%', rotate: 0, scale: 1 },
  { x: '8%', rotate: 8, scale: 0.9 },
  { x: '-8%', rotate: -8, scale: 0.9 }
];

/** Phone mockups that take turns at the front of a fanned-out stack */
export default function AppCardStack({
  images
}: {
  images: NonNullable<ProjectMedia['appImages']>;
}): JSX.Element {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = setInterval(
      () => setActive((current) => (current + 1) % images.length),
      STACK_INTERVAL_MS
    );
    return () => clearInterval(id);
  }, [images.length, reduceMotion]);

  const { width, height } = images[0];

  return (
    <div className="relative w-full max-w-56" style={{ aspectRatio: `${width} / ${height}` }}>
      {images.map((image, index) => {
        const depth = (index - active + images.length) % images.length;
        return (
          // A motion <img>, so each phone can animate between poses. The phones paint together and
          // are the same size before their transforms, so any of them can be the page's LCP image:
          // all load eagerly at high priority.
          <m.img
            key={image.src}
            src={image.src}
            alt={depth === 0 ? image.alt : ''}
            aria-hidden={depth !== 0}
            width={image.width}
            height={image.height}
            // React 18 only passes the attribute through in its lowercase HTML spelling
            {...{ fetchpriority: 'high' }}
            initial={false}
            animate={{ ...STACK_POSES[depth % STACK_POSES.length], zIndex: images.length - depth }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
            className="absolute inset-0 size-full origin-bottom object-contain drop-shadow-md"
          />
        );
      })}
    </div>
  );
}

export { AppCardStack };
