import { Star, Globe, ShieldCheck, BrainCircuit, Briefcase, Trophy, Blocks } from 'lucide-react';

const FEATURED_WORK_TITLE = 'Mednow';
const FEATURED_WORK_DESCRIPTION =
  'A Canadian digital pharmacy app providing automated medication management and free nationwide delivery. It integrates holistic healthcare through virtual medical consultations, mental health support, and personalized wellness programs.';

const HIGHLIGHTS = [
  {
    icon: Trophy,
    text: 'IPOd at $37MM CAD with a private exit',
    bgColor: 'bg-amber-100',
    borderColor: 'border-amber-700/30'
  },
  {
    icon: Briefcase,
    text: 'Product manager',
    bgColor: '',
    borderColor: 'border-gray-400'
  }
];

const FEATURES = [
  {
    title: 'Loved by patients',
    description: '400+ 5-star Google reviews throughout Canada.',
    icon: <Star />
  },
  {
    title: 'Available across Canada',
    description: 'Localized for all Canadain provinces and territories (including Québec).',
    icon: <Globe />
  },
  {
    title: 'PIPEDA/PHIPA compliant',
    description: 'Patient data/privacy, operations, and regulations in compliance.',
    icon: <ShieldCheck />
  },
  {
    title: 'Custom technology & integrations',
    description: 'PharmacyLink API, instant messaging, payments, notifications.',
    icon: <BrainCircuit />
  }
];

interface BadgeProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  bgColor: string;
  borderColor: string;
}

const Badge = ({ icon: Icon, text, bgColor, borderColor }: BadgeProps) => (
  <span
    data-slot="badge"
    className={`flex items-center justify-center gap-2 rounded-full border px-2 py-1 mb-1 text-foreground text-sm font-normal ${bgColor} ${borderColor}`}
  >
    <Icon className="size-4 shrink-0" />
    <>{text}</>
  </span>
);

const FeatureItem = ({ title, description, icon }) => {
  return (
    <div className="flex gap-1.5 py-3">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="font-medium pb-1">{title}</p>
        <p className="text-foreground/80">{description}</p>
      </div>
    </div>
  );
};

export default function FeaturedWork(): JSX.Element {
  return (
    <div className="mb-6">
      <div
        data-slot="card"
        className="text-card-foreground flex flex-col gap-4 rounded-xl border py-6 overflow-hidden border-gray-300 bg-sky-100/30"
      >
        <div className="lg:flex gap-2 px-2 lg:px-8 xs:flex-col">
          {HIGHLIGHTS.map((highlight) => (
            <Badge key={highlight.text} {...highlight} />
          ))}
        </div>
        <div
          data-slot="card-content"
          className="grid grid-cols-1 gap-8 px-2 lg:px-8 lg:grid-cols-2 xl:gap-0"
        >
          <div className="space-y-8 lg:max-xl:py-6">
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex justify-start items-center gap-2">
                <img
                  src="images/portfolio/mednow-logo.png"
                  alt="Mednow marketing site"
                  className="w-6 h-6 aspect-square object-contain"
                />
                <h3 className="text-2xl font-medium">{FEATURED_WORK_TITLE}</h3>
              </div>
              <p className="text-foreground/70">{FEATURED_WORK_DESCRIPTION}</p>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <FeatureItem key={feature.title} {...feature} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 max-lg:-mb-5 xl:-mb-16 xl:grid-cols-2 xl:gap-4">
            <div className="flex items-center justify-end xl:col-span-2 xl:items-end">
              <img
                src="images/portfolio/mednow.png"
                alt="Mednow marketing site"
                className="w-full rounded-xl object-cover xl:w-[86%] p-3 pb-0 bg-[#c9e8f6]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
