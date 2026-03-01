import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Calendar,
  Linkedin,
  Mail
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { siteConfig } from '@/config/site';
import About from '@/components/shared/About';
import Link from '@/components/shared/Link';
import Socials from '@/components/shared/Socials';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { trackConnectLinkClick } from '@/analytics/tracking';
import type { socialMediaProfileProviders } from '@/components/shared/Socials';

const getIconComponent = (provider: socialMediaProfileProviders) => {
  switch (provider) {
    case 'video':
      return <Calendar className="w-5 h-5 shrink-0" />;
    case 'email':
      return <Mail className="w-5 h-5 shrink-0" />;
    case 'linkedin':
      return <Linkedin className="w-5 h-5 shrink-0 text-[#0077B5]" />;
    case 'github':
      return <FaGithub className="w-5 h-5 shrink-0" />;
  }
};

const HeaderContents = ({
  onLinkClick,
  isCollapsed,
  onToggleCollapse,
  fullHeight = true
}: {
  onLinkClick?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  fullHeight?: boolean;
}) => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div
      className={`sticky top-0 flex flex-col p-4 transition-opacity duration-300 ${
        fullHeight ? 'h-screen' : 'h-full'
      }`}
    >
      <div>
        <div className="flex flex-col items-start gap-2 pb-2 border-b -mx-4 px-4 transition-all duration-300">
          <Link href="/" className="mb-2 flex items-center gap-2" onClick={onLinkClick}>
            <div className="relative w-10 h-10 shrink-0 border border-sky-700/50 rounded-xl">
              <Image
                src={siteConfig.nav.logo.src}
                alt={siteConfig.nav.logo.alt}
                layout="fill"
                objectFit="contain"
                loading="eager"
                className="rounded-xl"
              />
            </div>
            <span
              className={`font-medium text-foreground transition-all duration-300 ${
                isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 delay-150'
              }`}
            >
              {siteConfig.name}
            </span>
          </Link>
        </div>
      </div>

      <div className={`flex flex-col gap-8 ${fullHeight ? 'mt-auto' : 'mt-4'}`}>
        <div
          className={`border bg-gray-50 px-2 rounded-lg overflow-hidden transition-all duration-300 ${
            isCollapsed
              ? 'opacity-0 max-h-0 py-0 border-transparent'
              : 'opacity-100 max-h-96 border-black/10'
          }`}
        >
          <Collapsible open={isAboutOpen} onOpenChange={setIsAboutOpen}>
            <CollapsibleTrigger asChild className="cursor-pointer">
              <Button
                variant="ghost"
                className="flex items-center justify-between w-full px-0 h-auto hover:bg-transparent"
              >
                <span className="text-sm font-normal leading-6 text-foreground whitespace-nowrap">
                  About
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isAboutOpen ? 'rotate-180' : ''
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="py-2.5">
              <About />
            </CollapsibleContent>
          </Collapsible>
        </div>

        <Socials onLinkClick={onLinkClick} isCollapsed={isCollapsed} />

        {onToggleCollapse && (
          <div className="pt-4 px-4 border-t -mx-4">
            <Button
              variant="ghost"
              size="sm"
              className="bg-blue-500 text-white hover:bg-black w-full py-2 rounded-lg"
              onClick={onToggleCollapse}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <div className="flex items-center gap-2">
                  <ChevronLeft className="w-5 h-5" />
                </div>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    if (media.matches !== isMobile) {
      setIsMobile(media.matches);
    }
    const listener = () => setIsMobile(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [isMobile]);

  // Auto-collapse on iPad and smaller
  useEffect(() => {
    const media = window.matchMedia('(max-width: 1024px)');
    setIsCollapsed(media.matches && !isMobile);
    const listener = () => setIsCollapsed(media.matches && !isMobile);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [isMobile]);

  return (
    <>
      {isMobile && (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent className="bg-white">
            <div className="overflow-y-auto">
              <HeaderContents
                onLinkClick={() => setIsDrawerOpen(false)}
                isCollapsed={false}
                fullHeight={false}
              />
            </div>
          </DrawerContent>
        </Drawer>
      )}

      <Button
        variant="default"
        className="flex md:hidden fixed z-10 bottom-[32px] rounded-full right-[32px] w-[64px] h-[64px] shadow-[0px_0px_25px_15px_rgba(0,0,0,0.05)] bg-black hover:bg-black"
        onClick={() => setIsDrawerOpen(true)}
        aria-label="Open navigation menu"
      >
        <MoreHorizontal style={{ width: '32px', height: '32px' }} className="text-white" />
      </Button>

      {/* Spacer for fixed header */}
      <div
        className={`hidden md:block transition-all duration-300 ${
          isCollapsed ? 'w-[68px]' : 'w-[280px]'
        }`}
      />

      {/* Fixed header */}
      <div
        className={`hidden md:block fixed left-0 top-0 h-screen border-r border-border transition-all duration-300 bg-white z-10 ${
          isCollapsed ? 'w-[68px]' : 'w-[280px]'
        }`}
      >
        <div className="relative h-full overflow-y-auto">
          <HeaderContents
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          />
        </div>
      </div>
    </>
  );
}
