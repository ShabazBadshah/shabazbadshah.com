import { m, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  BrainCircuit,
  Briefcase,
  CalendarDays,
  Globe,
  Info,
  Maximize,
  ShieldCheck,
  Star
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import CornerButton from '@/components/CornerButton';
import { content } from '@/content/content';
import type { Project } from '@/content/projects';

const FEATURE_ICONS = [Star, Globe, ShieldCheck, BrainCircuit];

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
function LazyVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
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
        className="absolute bottom-3 right-3 grid size-9 cursor-pointer place-items-center rounded-pill border bg-elevated text-fg-muted backdrop-blur-lg backdrop-saturate-180 transition-colors hover:text-fg"
      >
        <Maximize aria-hidden="true" className="size-4" />
      </button>
    </>
  );
}

/** Phone mockups that take turns at the front of a fanned-out stack */
function AppCardStack({ images }: { images: NonNullable<Project['appImages']> }): JSX.Element {
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
          // Plain <img>: next/image does not optimize SVG
          <m.img
            key={image.src}
            src={image.src}
            alt={depth === 0 ? image.alt : ''}
            aria-hidden={depth !== 0}
            width={image.width}
            height={image.height}
            loading={index === 0 ? 'eager' : 'lazy'}
            // React 18 only passes the attribute through in its lowercase HTML spelling
            {...(index === 0 && { fetchpriority: 'high' })}
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
  project: Project;
  className?: string;
};

function Title({ project, className = '' }: { project: Project; className?: string }): JSX.Element {
  return (
    <div data-keep className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src={project.logo}
        alt=""
        width={28}
        height={28}
        className={`size-7 object-contain ${project.logoInvertOnDark ? 'dark:invert' : ''}`}
      />
      <h3 className="text-lg font-semibold">{project.title}</h3>
    </div>
  );
}

type PanelProps = { project: Project; open: boolean; className?: string; showTitle?: boolean };

function InfoPanel({
  project,
  open,
  className = 'absolute inset-0',
  showTitle = false
}: PanelProps): JSX.Element {
  const label = 'text-xs font-medium uppercase tracking-wide text-fg-muted';
  const list = 'list-disc space-y-1 pl-5 text-sm marker:text-fg-muted';
  const disciplines = (
    <div className="flex flex-col gap-2">
      <span className={label}>{content.projectCard.disciplines}</span>
      <ul className={list}>
        {project.disciplines.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
  const skills = (
    <div className="flex flex-col gap-2">
      <span className={label}>{content.projectCard.skills}</span>
      <ul className={list}>
        {project.skills_and_technologies.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <div
      data-keep
      aria-hidden={!open}
      className={`${className} flex flex-col gap-6 overflow-y-auto ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      {showTitle && <Title project={project} className="absolute left-5 top-3 h-8 sm:left-6" />}
      <div className="flex flex-wrap items-end gap-2">
        <div className="flex flex-col items-start gap-2">
          <span className="chip">
            <CalendarDays aria-hidden="true" className="size-3.5" />
            {project.date}
          </span>
        </div>
        <div className="flex flex-col items-start gap-2">
          <span className="chip">
            <Briefcase aria-hidden="true" className="size-3.5" />
            {project.role}
          </span>
        </div>
      </div>
      {showTitle ? (
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
          {disciplines}
          {skills}
        </div>
      ) : (
        <>
          {disciplines}
          {skills}
        </>
      )}
    </div>
  );
}

function Body({ project }: { project: Project }): JSX.Element {
  return (
    <>
      <p className="text-sm text-fg-muted">{project.description}</p>
      <p className="text-lg font-semibold leading-[1.2] tracking-tight">{project.metric}</p>
    </>
  );
}

// Content below the title is hidden while the info panel is open; [data-keep] elements stay.
// Below lg it is taken out of the flow so the card sizes to the panel instead.
const FACE_HIDDEN =
  '[&>:not([data-keep])]:invisible [&>:not([data-keep])]:opacity-0 max-lg:[&>:not([data-keep])]:hidden';
// Below lg the open panel sits in the flow (sizing the card); from lg it overlays the face
const PANEL_OPEN = 'max-lg:relative lg:absolute lg:inset-0';

const FLIP_MS = 220;

export default function ProjectCard({ project, className = '' }: Props): JSX.Element {
  const [showInfo, setShowInfo] = useState(false);
  const face = showInfo ? FACE_HIDDEN : '';
  const cardRef = useRef<HTMLElement>(null);
  const flipping = useRef(false);

  // Flip the card edge-on, swap faces at the midpoint, then flip back out
  const flip = () => {
    const card = cardRef.current;
    if (
      !card ||
      flipping.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShowInfo((prev) => !prev);
      return;
    }
    flipping.current = true;
    const options = { duration: FLIP_MS, fill: 'forwards' as const };
    card
      .animate(
        [
          { transform: 'perspective(1400px) rotateY(0deg)' },
          { transform: 'perspective(1400px) rotateY(90deg)' }
        ],
        { ...options, easing: 'ease-in' }
      )
      .finished.then(() => {
        setShowInfo((prev) => !prev);
        return card.animate(
          [
            { transform: 'perspective(1400px) rotateY(-90deg)' },
            { transform: 'perspective(1400px) rotateY(0deg)' }
          ],
          { ...options, easing: 'ease-out' }
        ).finished;
      })
      .then((animation) => animation.cancel())
      .finally(() => {
        flipping.current = false;
      });
  };
  const { showDetails, hideDetails } = content.projectCard;
  const toggle = (
    <CornerButton
      icon={showInfo ? ArrowLeft : Info}
      data-keep
      aria-expanded={showInfo}
      aria-label={showInfo ? hideDetails.label : showDetails.label}
      title={showInfo ? hideDetails.title : showDetails.title}
      onClick={flip}
    />
  );

  if (project.features && project.appImages) {
    return (
      <article
        ref={cardRef}
        data-card={project.slug}
        className={`card relative gap-6 p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-16 ${className} overflow-visible`}
      >
        <div
          className={`flex shrink-0 justify-center lg:w-[25%] ${
            showInfo ? 'invisible opacity-0 max-lg:hidden' : ''
          }`}
        >
          <AppCardStack images={project.appImages} />
        </div>

        <div className={`flex min-w-0 flex-1 flex-col gap-6 ${showInfo ? 'max-lg:hidden' : ''}`}>
          <Title project={project} className={`${showInfo ? 'invisible opacity-0' : ''}`} />
          <div className={`relative flex flex-col gap-6 ${face}`}>
            <Body project={project} />
            <ul className="grid gap-1">
              {project.features.map((feature, index) => {
                const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
                return (
                  <li key={feature.title}>
                    <div className="flex align-middle gap-2">
                      <Icon aria-hidden="true" className="mb-3 size-5 text-fg-muted" />
                      <p className="text-sm">{feature.title}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <InfoPanel
          project={project}
          open={showInfo}
          showTitle
          // In the flow, the negative margin cancels the card padding so the layout matches inset-0
          className={`px-5 pb-5 pt-16 sm:px-6 sm:pb-6 ${
            showInfo ? `${PANEL_OPEN} max-lg:-m-5 max-lg:sm:-m-6` : 'absolute inset-0'
          }`}
        />
        {toggle}
      </article>
    );
  }

  return (
    <article
      ref={cardRef}
      data-card={project.slug}
      className={`card gap-4 p-5 sm:p-6 ${className}`}
    >
      <Title project={project} />
      <div className={`relative flex flex-1 flex-col gap-4 ${face}`}>
        <Body project={project} />

        <div className="relative mt-auto overflow-hidden rounded-inner border border-line bg-fill">
          {project.video ? (
            <LazyVideo
              src={project.video.src}
              poster={optimizedImageUrl(project.video.poster, POSTER_WIDTH)}
              label={content.projectCard.demoLabel(project.title)}
            />
          ) : (
            <div className="relative aspect-video w-full">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 400px"
              />
            </div>
          )}
        </div>
        <InfoPanel
          project={project}
          open={showInfo}
          className={showInfo ? PANEL_OPEN : 'absolute inset-0'}
        />
      </div>
      {toggle}
    </article>
  );
}
