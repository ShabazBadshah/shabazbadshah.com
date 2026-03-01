import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
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

export type socialMediaProfileProviders = 'github' | 'linkedin' | 'email';

const getIconComponent = (provider: socialMediaProfileProviders) => {
  switch (provider) {
    case 'email':
      return <Mail className="w-5 h-5" />;
    case 'linkedin':
      return <Linkedin className="w-5 h-5 text-[#0077B5]" />;
    case 'github':
      return <FaGithub className="w-5 h-5" />;
  }
};

const profiles: SocialProfile[] = siteConfig.socials.map((social) => ({
  ...social,
  IconComponent: getIconComponent(social.provider)
}));

const Socials = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-2 ">
      <h3 className="text-sm font-normal leading-6 text-foreground">Let's connect</h3>
      <div className="flex flex-col gap-2">
        {profiles.map((profile) => {
          return (
            <Button
              key={profile.name}
              variant="outline"
              size="sm"
              className="text-gray-700 text-sm py-4 border-gray-400/80 font-normal w-full rounded-full text-center lowercase hover:text-primary hover:border-sky-700 hover:bg-sky-100"
              asChild
            >
              <a href={profile.url} onClick={() => trackConnectLinkClick(profile.provider)}>
                <div className="flex flex-row justify-center items-center gap-3">
                  {profile.IconComponent}
                  {profile.name}
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
