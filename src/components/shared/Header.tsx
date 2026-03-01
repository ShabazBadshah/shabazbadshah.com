import { ChevronDown, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { siteConfig } from '@/config/site';
import About from '@/components/shared/About';
import Link from '@/components/shared/Link';
import Socials from '@/components/shared/Socials';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

const HeaderContents = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className="sticky top-0 flex flex-col md:justify-between gap-4 md:h-screen p-4">
      <div className="flex flex-col items-start gap-2 pb-2 border-b -mx-4 px-4">
        <Link href="/" className="mb-2 flex items-center gap-2 " onClick={onLinkClick}>
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
          <span className="font-medium text-foreground">{siteConfig.name}</span>
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        <div className="border border-black/10 bg-gray-50 px-2 rounded-lg">
          <Collapsible open={isAboutOpen} onOpenChange={setIsAboutOpen}>
            <CollapsibleTrigger asChild className="cursor-pointer">
              <Button
                variant="ghost"
                className="flex items-center justify-between w-full px-0 h-auto hover:bg-transparent"
              >
                <span className="text-sm font-normal leading-6 text-foreground">About</span>
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
        <Socials onLinkClick={onLinkClick} />
      </div>
    </div>
  );
};

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    if (media.matches !== isMobile) {
      setIsMobile(media.matches);
    }
    const listener = () => setIsMobile(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [isMobile]);

  return (
    <>
      {isMobile && (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent className="max-h-[85vh] bg-white">
            <div className="overflow-y-auto">
              <HeaderContents onLinkClick={() => setIsDrawerOpen(false)} />
            </div>
          </DrawerContent>
        </Drawer>
      )}

      <Button
        variant="default"
        className="flex md:hidden fixed z-10 bottom-[32px] rounded-full right-[32px] w-[64px] h-[64px] shadow-[0px_0px_25px_15px_rgba(0,0,0,0.05)] bg-black hover:bg-black"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MoreHorizontal style={{ width: '32px', height: '32px' }} className="text-white" />
      </Button>

      <div className="hidden md:block min-h-screen border-r border-border w-[340px]">
        <HeaderContents />
      </div>
    </>
  );
}
