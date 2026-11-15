import { m, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  BrainCircuit,
  Globe,
  Maximize,
  Maximize2,
  Plane,
  ShieldCheck,
  Star
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import CornerButton from '@/components/CornerButton';
import Todo from '@/components/Todo';
import { content } from '@/content/content';
import type { ProjectIcon, ProjectMedia, PublicProject } from '@/content/projects';
import { shown } from '@/lib/todo';
import { isPlainLeftClick } from '@/components/work/WorkList';

const FEATURE_ICONS = [Star, Globe, ShieldCheck, BrainCircuit];
const PROJECT_ICONS: Record<ProjectIcon, typeof Plane> = { plane: Plane };

const STACK_INTERVAL_MS = 4000;

/** Pose per depth: 0 is the front card, the rest fan out behind it. */
const STACK_POSES = [
  { x: '0%', rotate: 0, scale: 1 },
  { x: '8%', rotate: 8, scale: 0.9 },
  { x: '-8%', rotate: -8, scale: 0.9 }
];

/** Poster is shown at ~424px; 640 is the nearest Next image size above it */
const POSTER_WIDTH = 640;

/** next/image's optimizer URL, for attributes that can't take srcset (e.g. video poster) */
const optimizedImageUrl = (src: string, width: number) =>
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
      if (entry.isIntersecting) video.play().catch(() => {});
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
    if (video.requestFullscreen) video.requestFullscreen().catch(() => {});
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

/** Phone mockups that take turns at the front of a fanned-out stack */
function AppCardStack({ images }: { images: NonNullable<ProjectMedia['appImages']> }): JSX.Element {
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

type Props = {
  project: PublicProject;
  className?: string;
  /** Opens the case study in place, from the card */
  onOpen?: (project: PublicProject, card: HTMLElement) => void;
};

/** Logo and name, as the card's header; also used by the rows on /work */
export function Title({
  project,
  className = ''
}: {
  project: PublicProject;
  className?: string;
}): JSX.Element {
  const logo = project.media?.logo;
  const Icon = project.icon && PROJECT_ICONS[project.icon];
  return (
    <div data-keep className={`flex items-center gap-2.5 ${className}`}>
      {logo && (
        <Image
          src={logo}
          alt=""
          width={28}
          height={28}
          className={`size-7 object-contain ${
            project.media?.logoInvertOnDark ? 'dark:invert' : ''
          }`}
        />
      )}
      {!logo && Icon && (
        <span
          aria-hidden="true"
          className="grid size-7 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent"
        >
          <Icon className="size-4" />
        </span>
      )}
      <h3 className="text-lg font-semibold">{project.name}</h3>
    </div>
  );
}

function Body({ project }: { project: PublicProject }): JSX.Element {
  return (
    <>
      <p className="text-fg-muted">{project.summary}</p>
      {shown(project.outcome) && (
        <p className="text-lg font-semibold leading-[1.2] tracking-tight">
          <Todo value={project.outcome} />
        </p>
      )}
    </>
  );
}

/** To the case study, or to the project's site when it has none (my own product) */
/**
 * A project as a card, like the blog cards: the whole card is a link, with a corner cue. With a case
 * study it opens it (in place through `onOpen`, or as its own page without); without one it opens the
 * project's site in a new tab.
 */
export default function ProjectCard({ project, className = '', onOpen }: Props): JSX.Element {
  const cardRef = useRef<HTMLElement>(null);
  const external = !project.hasCaseStudy && project.externalUrl;
  const media = project.media;

  // Spans the card, above its content; the video's fullscreen button sits above it
  const link = (
    <a
      href={external || `/work/${project.slug}`}
      aria-label={project.name}
      className="absolute inset-0 z-20 rounded-[inherit]"
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {
            onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
              if (!onOpen || !cardRef.current || !isPlainLeftClick(event)) return;
              event.preventDefault();
              onOpen(project, cardRef.current);
            }
          })}
    />
  );
  const cue = (
    <CornerButton
      decorative
      icon={external ? ArrowUpRight : Maximize2}
      className="group-hover:text-fg"
    />
  );

  if (media?.features && media.appImages) {
    return (
      <article
        ref={cardRef}
        data-card={project.slug}
        className={`card group relative gap-6 p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-16 ${className} overflow-visible`}
      >
        <div className="flex shrink-0 justify-center lg:w-[25%]">
          <AppCardStack images={media.appImages} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <Title project={project} />
          <div className="flex flex-col gap-6">
            <Body project={project} />
            <ul className="grid gap-1">
              {media.features.map((feature, index) => {
                const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
                return (
                  <li key={feature}>
                    <div className="flex align-middle gap-2">
                      <Icon aria-hidden="true" className="mb-3 size-5 text-fg-muted" />
                      <p>{feature}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {link}
        {cue}
      </article>
    );
  }

  return (
    <article
      ref={cardRef}
      data-card={project.slug}
      className={`card group gap-4 p-5 sm:p-6 ${className}`}
    >
      <Title project={project} />
      <div className="relative flex flex-1 flex-col gap-4">
        <Body project={project} />

        {(media?.video || media?.image) && (
          <div className="relative mt-auto overflow-hidden rounded-inner border border-line bg-fill">
            {media.video ? (
              <LazyVideo
                src={media.video.src}
                poster={optimizedImageUrl(media.video.poster, POSTER_WIDTH)}
                label={content.projectCard.demoLabel(project.name)}
              />
            ) : (
              <div className="relative aspect-video w-full">
                <Image
                  src={media.image.src}
                  alt={media.image.alt}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 400px"
                />
              </div>
            )}
          </div>
        )}
      </div>
      {link}
      {cue}
    </article>
  );
}
