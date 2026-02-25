import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

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

const profiles: SocialProfile[] = [
  {
    name: '@ShabazBadshah',
    provider: 'github',
    url: 'https://github.com/ShabazBadshah',
    IconComponent: <FaGithub className="w-5 h-5" />,
    cta: 'Follow'
  },
  {
    name: '/in/shabaz-badshah/',
    provider: 'linkedin',
    url: 'https://www.linkedin.com/in/shabaz-badshah/',
    IconComponent: <Linkedin className="w-[23px] h-[23px] text-[#0077B5]" />,
    cta: 'Connect'
  },
  {
    name: 'badshah.shabaz.dev@gmail.com',
    provider: 'email',
    url: 'mailto:badshah.shabaz.dev@gmail.comSubject=Hey%20Shabaz',
    IconComponent: <Mail className="w-5 h-5" />,
    cta: 'Email'
  }
];

const Socials = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base font-medium leading-5 text-foreground">Let's connect</h3>
      <div className="flex flex-col gap-2">
        {profiles.map((profile) => {
          return (
            <Button
              key={profile.name}
              variant="outline"
              size="sm"
              className="text-foreground py-0.5 border-[#cecece] font-normal w-full rounded-full text-center lowercase hover:text-primary hover:border-[#085CC5]"
              asChild
            >
              <a href={profile.url} onClick={() => trackConnectLinkClick(profile.provider)}>
                <div className="flex flex-row justify-center items-center gap-1">
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
