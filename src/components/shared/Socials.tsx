import React from 'react';
import { Calendar, Linkedin, Mail } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

import { siteConfig } from '@/config/site';
import { trackConnectLinkClick } from '@/analytics/tracking';
import { Button } from '@/components/ui/button';

type SocialProfile = {
  name: string;
  provider: socialMediaProfileProviders;
  url: string;
  IconComponent: React.ReactNode;
  cta: string;
};

export type socialMediaProfileProviders = 'github' | 'linkedin' | 'email' | 'video';

const getIconComponent = (provider: socialMediaProfileProviders) => {
  switch (provider) {
    case 'video':
      return <Calendar className="size-6! md:size-5!" />;
    case 'email':
      return <Mail className="size-6! md:size-5!" />;
    case 'linkedin':
      return <Linkedin className="size-6! md:size-5! text-[#0077B5]" />;
    case 'github':
      return <FaGithub className="size-6! md:size-5!" />;
  }
};

const profiles: SocialProfile[] = siteConfig.socials.map((social) => ({
  ...social,
  IconComponent: getIconComponent(social.provider)
}));

const Socials = ({
  onLinkClick,
  isCollapsed
}: {
  onLinkClick?: () => void;
  isCollapsed?: boolean;
}): JSX.Element => {
  return (
    <div className="flex flex-col gap-2 ">
      <h3
        className={`text-sm font-normal leading-6 text-foreground whitespace-nowrap transition-all duration-300 ${
          isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 delay-150'
        }`}
      >
        Let's connect
      </h3>
      <div className="flex flex-col gap-3 md:gap-2">
        {profiles.map((profile) => {
          return (
            <Button
              key={profile.name}
              variant="outline"
              className="text-gray-700 text-md md:text-sm py-6 md:py-4 border-gray-400/80 font-normal w-full rounded-full text-center hover:text-primary hover:border-sky-700 hover:bg-sky-100 transition-all duration-300"
              asChild
            >
              <a
                href={profile.url}
                onClick={() => {
                  trackConnectLinkClick(profile.provider);
                  onLinkClick?.();
                }}
              >
                <div
                  className={`flex flex-row items-center ${
                    isCollapsed ? 'justify-center' : 'justify-center gap-3'
                  }`}
                >
                  {profile.IconComponent}
                  {!isCollapsed && (
                    <span className="transition-opacity duration-300 delay-150 whitespace-nowrap">
                      {profile.name}
                    </span>
                  )}
                </div>
              </a>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Socials;
