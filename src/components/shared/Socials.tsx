import { trackConnectLinkClick } from '@/analytics/tracking';
import { siteConfig } from '@/config/site';

export type socialMediaProfileProviders = 'github' | 'linkedin' | 'email' | 'video';

// Official brand logos from the platforms' brand guidelines
const LOGO_SRC: Record<socialMediaProfileProviders, string> = {
  video: '/images/logos/google-meet.svg',
  email: '/images/logos/gmail.svg',
  linkedin: '/images/logos/linkedin.svg',
  github: '/images/logos/github.svg'
};

// Fill colour that expands from behind the logo on hover
const HOVER_BG: Record<socialMediaProfileProviders, string> = {
  video: 'bg-gray-200',
  email: 'bg-gray-200',
  linkedin: 'bg-[#007EBB]',
  github: 'bg-[#1B1F23]'
};

const ACCESSIBLE_LABEL: Record<socialMediaProfileProviders, string> = {
  video: 'Book a video call',
  email: 'Send an email',
  linkedin: 'LinkedIn',
  github: 'GitHub'
};

const Socials = (): JSX.Element => {
  return (
    <ul aria-label="Connect" className="flex gap-4">
      {siteConfig.socials.map((profile) => {
        const external = profile.url.startsWith('http');
        return (
          <li key={profile.provider}>
            <a
              href={profile.url}
              aria-label={ACCESSIBLE_LABEL[profile.provider]}
              title={ACCESSIBLE_LABEL[profile.provider]}
              className="pill group relative size-10 min-h-0 overflow-hidden rounded-lg bg-white p-0"
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => trackConnectLinkClick(profile.provider)}
            >
              <span
                aria-hidden="true"
                className={`absolute left-1/2 top-1/2 size-[200%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full transition-transform duration-400 ease-out group-hover:scale-100 group-focus-visible:scale-100 motion-reduce:transition-none ${
                  HOVER_BG[profile.provider]
                }`}
              />
              <img
                src={LOGO_SRC[profile.provider]}
                alt=""
                aria-hidden="true"
                className={`relative size-6 object-contain ${
                  profile.provider === 'github'
                    ? 'transition-[filter] dark:invert group-hover:invert'
                    : ''
                }`}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Socials;
