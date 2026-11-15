import {
  ArrowUpRight,
  BrainCircuit,
  Globe,
  Maximize2,
  Plane,
  ShieldCheck,
  Star
} from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

import AppCardStack from '@/components/AppCardStack';
import CornerButton from '@/components/CornerButton';
import LazyVideo, { POSTER_WIDTH, optimizedImageUrl } from '@/components/LazyVideo';
import Todo from '@/components/Todo';
import { content } from '@/content/content';
import type { ProjectIcon, PublicProject } from '@/content/projects';
import { shown } from '@/lib/todo';
import { isPlainLeftClick } from '@/lib/utils';

const FEATURE_ICONS = [Star, Globe, ShieldCheck, BrainCircuit];
const PROJECT_ICONS: Record<ProjectIcon, typeof Plane> = { plane: Plane };

type Props = {
  project: PublicProject;
  className?: string;
  /** Opens the case study in place, from the card */
  onOpen?: (project: PublicProject, card: HTMLElement) => void;
};

/** Logo and name, as the card's header; also used by the rows on /work */
export function Title({
  name,
  logo,
  logoInvertOnDark = false,
  icon,
  className = ''
}: {
  name: string;
  logo?: string;
  logoInvertOnDark?: boolean;
  icon?: ProjectIcon | null;
  className?: string;
}): JSX.Element {
  const Icon = icon && PROJECT_ICONS[icon];
  return (
    <div data-keep className={`flex items-center gap-2.5 ${className}`}>
      {logo && (
        <Image
          src={logo}
          alt=""
          width={28}
          height={28}
          className={`size-7 object-contain ${logoInvertOnDark ? 'dark:invert' : ''}`}
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
      <h3 className="text-lg font-semibold">{name}</h3>
    </div>
  );
}

function Body({ summary, outcome }: { summary: string; outcome: string }): JSX.Element {
  return (
    <>
      <p className="text-fg-muted">{summary}</p>
      {shown(outcome) && (
        <p className="text-lg font-semibold leading-[1.2] tracking-tight">
          <Todo value={outcome} />
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
          <Title
            name={project.name}
            logo={media?.logo}
            logoInvertOnDark={media?.logoInvertOnDark}
            icon={project.icon}
          />
          <div className="flex flex-col gap-6">
            <Body summary={project.summary} outcome={project.outcome} />
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
      <Title
        name={project.name}
        logo={media?.logo}
        logoInvertOnDark={media?.logoInvertOnDark}
        icon={project.icon}
      />
      <div className="relative flex flex-1 flex-col gap-4">
        <Body summary={project.summary} outcome={project.outcome} />

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
