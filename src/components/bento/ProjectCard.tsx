import { ArrowLeft, BrainCircuit, Briefcase, Globe, Info, ShieldCheck, Star } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import CornerButton from '@/components/shared/CornerButton';
import type { Project } from '@/content/projects';

import AppCardStack from './AppCardStack';

const FEATURE_ICONS = [Star, Globe, ShieldCheck, BrainCircuit];

type Props = {
  project: Project;
  className?: string;
};

function Title({ project, className = '' }: { project: Project; className?: string }): JSX.Element {
  return (
    <div data-keep className={`flex items-center gap-2.5 ${className}`}>
      <Image src={project.logo} alt="" width={28} height={28} className="size-7 object-contain" />
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
  const skills = project.expertise?.split(',').map((skill) => skill.trim()) ?? [];
  return (
    <div
      data-keep
      aria-hidden={!open}
      className={`${className} flex flex-col gap-8 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      {showTitle && <Title project={project} className="absolute left-5 top-3 h-8 sm:left-6" />}
      <div className="flex flex-col items-start gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-fg-muted">Role</span>
        <span className="chip">
          <Briefcase aria-hidden="true" className="size-3.5" />
          {project.role}
        </span>
      </div>
      {skills.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-fg-muted">Skills</span>
          <ul className="list-disc space-y-1 pl-5 text-sm marker:text-fg-muted">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
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

// Content below the title is hidden while the info panel is open; [data-keep] elements stay
const FACE_HIDDEN = '[&>:not([data-keep])]:invisible [&>:not([data-keep])]:opacity-0';

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
  const toggle = (
    <CornerButton
      icon={showInfo ? ArrowLeft : Info}
      data-keep
      aria-expanded={showInfo}
      aria-label={showInfo ? 'Back to project' : 'Show role and expertise'}
      title={showInfo ? 'Back' : 'Role & expertise'}
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
            showInfo ? 'invisible opacity-0' : ''
          }`}
        >
          <AppCardStack images={project.appImages} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <Title project={project} className={`${showInfo ? 'invisible opacity-0' : ''}`} />
          <div className={`relative flex flex-col gap-6 ${face}`}>
            <Body project={project} />
            <ul className="grid gap-1">
              {project.features.map((feature, index) => {
                const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
                return (
                  <li key={feature.title} className="">
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
          className="absolute inset-0 px-5 pb-5 pt-16 sm:px-6 sm:pb-6"
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
            <video
              autoPlay
              loop
              controls
              muted
              playsInline
              preload="auto"
              poster={project.video.poster}
              aria-label={`${project.title} product demo`}
              width={1920}
              height={1080}
              className="block aspect-video h-auto w-full"
            >
              <source src={project.video.src} type="video/mp4" />
            </video>
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
        <InfoPanel project={project} open={showInfo} />
      </div>
      {toggle}
    </article>
  );
}
