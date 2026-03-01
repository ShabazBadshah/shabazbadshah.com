import { Briefcase, Trophy, Play } from 'lucide-react';
import React, { useRef } from 'react';
import Image from 'next/image';

const PORTFOLIO_ITEMS = [
  {
    companyTitle: 'Planned',
    description:
      'REST API for consolidating disparate vendor data (Google Maps, PDFs, Yelp, etc.) using LLM technology to scale curated marketplace.',
    image: '/images/portfolio/planned.png',
    brandLogo: '/images/portfolio/planned-logo.png',
    companyWebsite: 'https://planned.com/',
    highlights: {
      role: 'Product manager',
      impact: 'Reduced vendor onboarding time from 48h to 6h',
      expertise: 'Technical architecture, REST APIs, ETL, AI, LLMs'
    }
  },
  {
    companyTitle: 'SOTI',
    description:
      'A custom instant-messaging and video calling tool (web and mobile apps) to communicate between MDM devices in order to provide technical support.',
    video: '/images/portfolio/xsight-video.mp4',
    brandLogo: '/images/portfolio/soti-logo.png',
    companyWebsite: 'https://soti.net',
    highlights: {
      role: 'Product manager',
      impact: 'Grew revenue by $280k MRR CAD post-release',
      expertise: 'Technical architecture, B2B, low-latency realtime systems'
    }
  },
  {
    companyTitle: 'Project Include',
    description:
      'An informational site volunteer nonprofit that empowers low socio-economic communities through free coding bootcamps and workshops.',
    image: '/images/portfolio/project-include.png',
    brandLogo: '/images/portfolio/project-include-logo.png',
    companyWebsite: 'https://www.facebook.com/hashtagprojectinclude/',
    highlights: {
      role: 'Frontend developer',
      impact: 'Ran 50+ workshops 250+ students prior to ending',
      expertise: 'Web development, design, sales, marketing'
    }
  }
];

interface PortfolioCardProps {
  companyTitle: string;
  companyWebsite: string;
  description: string;
  image?: string;
  video?: string;
  highlights: {
    role: string;
    impact: string;
    expertise: string;
  };
  brandLogo: string;
}

interface BadgeProps {
  icon: React.ReactNode;
  text: string;
  bgColor: string;
  borderColor: string;
  fullWidth?: boolean;
}

const Badge = ({ icon, text, bgColor, borderColor, fullWidth = false }: BadgeProps) => (
  <span
    data-slot="badge"
    className={`flex items-center justify-center gap-2 rounded-full border px-2 py-1.5 text-foreground text-sm ${bgColor} ${borderColor} ${
      fullWidth ? 'w-full' : 'w-fit'
    }`}
  >
    {icon}
    <p className="leading-none">{text}</p>
  </span>
);

const PortfolioCard = ({
  companyTitle,
  companyWebsite,
  description,
  image,
  video,
  highlights,
  brandLogo
}: PortfolioCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      }
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);

  return (
    <div
      data-slot="card"
      className="bg-gray-200/20 text-card-foreground flex flex-col rounded-xl border border-gray-300 py-6 group h-full justify-between gap-3 overflow-hidden pt-4 pb-0 transition-all duration-300"
    >
      <div className="flex flex-col gap-2 px-2 mb-3 lg:px-4">
        <Badge
          icon={<Trophy className="size-4 shrink-0" />}
          text={highlights.impact}
          bgColor="bg-amber-100"
          borderColor="border-amber-700/30"
          fullWidth
        />
        <div className="mx-auto">
          <span
            data-slot="badge"
            className={`flex items-center justify-center gap-2 px-2 py-1.5 text-foreground text-sm w-fit'
            }`}
          >
            <Briefcase className="size-4 shrink-0" />
            <p className="leading-none">{highlights.role}</p>
          </span>
        </div>
      </div>
      <div data-slot="card-content" className="space-y-2 px-4 mb-4">
        <div className="flex justify-start items-center gap-2">
          <div className="relative w-6 h-6">
            <Image
              src={brandLogo}
              alt={`${companyTitle} logo`}
              layout="fill"
              objectFit="contain"
              sizes="24px"
            />
          </div>
          <a href={companyWebsite} className="underline">
            <h4 className="text-xl font-medium">{companyTitle}</h4>
          </a>
        </div>
        <p>{description}</p>
      </div>
      <div className="relative">
        {video ? (
          <>
            <video
              ref={videoRef}
              src={video}
              className="w-full object-cover cursor-pointer"
              style={{ display: 'block' }}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
            />
            {!isPlaying && (
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors duration-200 group/play"
                aria-label="Play video"
              >
                <Play className="w-16 h-16 text-gray-100 fill-gray-200/50 p-2" />
              </button>
            )}
          </>
        ) : (
          <div className="relative w-full aspect-video">
            <Image
              src={image || ''}
              alt={companyTitle}
              layout="fill"
              objectFit="cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default function PortfolioGrid(): JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {PORTFOLIO_ITEMS.map((item) => (
        <PortfolioCard key={item.companyTitle} {...item} />
      ))}
    </div>
  );
}
