import { Maximize } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { content } from '@/content/content';

/** Poster is shown at ~424px; 640 is the nearest Next image size above it */
export const POSTER_WIDTH = 640;

/** next/image's optimizer URL, for attributes that can't take srcset (e.g. video poster) */
export const optimizedImageUrl = (src: string, width: number): string =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;

/** Demo video that downloads and plays only while on screen */
export function LazyVideo({
  src,
  poster,
  label
}: {
  src: string;
  poster?: string;
  label: string;
}): JSX.Element {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => undefined);
      else video.pause();
    });
    observer.observe(video);
    // Native controls only while fullscreen, so the card itself stays clean
    const onFullscreenChange = () => {
      video.controls = document.fullscreenElement === video;
    };
    video.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      observer.disconnect();
      video.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  const enterFullscreen = () => {
    const video = ref.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen().catch(() => undefined);
    // iOS Safari only supports fullscreen on the video element through this API
    else video.webkitEnterFullscreen?.();
  };

  return (
    <>
      <video
        ref={ref}
        loop
        // controls
        muted
        playsInline
        preload="none"
        poster={poster}
        aria-label={label}
        width={1280}
        height={720}
        className="block aspect-video h-auto w-full"
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        aria-label={content.projectCard.fullscreen.label(label)}
        title={content.projectCard.fullscreen.title}
        onClick={enterFullscreen}
        className="absolute bottom-3 right-3 z-30 grid size-9 cursor-pointer place-items-center rounded-pill bg-elevated text-fg-muted backdrop-blur-lg backdrop-saturate-180 transition-colors hover:text-fg"
      >
        <Maximize aria-hidden="true" className="size-4" />
      </button>
    </>
  );
}

export default LazyVideo;
