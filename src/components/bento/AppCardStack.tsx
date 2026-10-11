import { m, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import type { Project } from '@/content/projects';

const INTERVAL_MS = 4000;

/** Pose per depth: 0 is the front card, the rest fan out behind it. */
const POSES = [
  { x: '0%', rotate: 0, scale: 1 },
  { x: '8%', rotate: 6, scale: 0.9 },
  { x: '-8%', rotate: -6, scale: 0.9 }
];

type Props = {
  images: NonNullable<Project['appImages']>;
};

export default function AppCardStack({ images }: Props): JSX.Element {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = setInterval(
      () => setActive((current) => (current + 1) % images.length),
      INTERVAL_MS
    );
    return () => clearInterval(id);
  }, [images.length, reduceMotion]);

  const { width, height } = images[0];

  return (
    <div className="relative w-full max-w-[14rem]" style={{ aspectRatio: `${width} / ${height}` }}>
      {images.map((image, index) => {
        const depth = (index - active + images.length) % images.length;
        const pose = POSES[depth % POSES.length];
        return (
          // Plain <img>: next/image does not optimize SVG
          <m.img
            key={image.src}
            src={image.src}
            alt={depth === 0 ? image.alt : ''}
            aria-hidden={depth !== 0}
            width={image.width}
            height={image.height}
            loading="lazy"
            initial={false}
            animate={{ ...pose, zIndex: images.length - depth }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
            className="absolute inset-0 h-full w-full object-contain drop-shadow-md"
            style={{
              transformOrigin: '50% 100%'
            }}
          />
        );
      })}
    </div>
  );
}
