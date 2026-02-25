import { MoreHorizontal, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import About from '@/components/shared/About';
import Link from '@/components/shared/Link';
import Socials from '@/components/shared/Socials';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';

type Props = {
  extraDrawerContent: React.ReactNode;
};

const HeaderContents = ({
  extraDrawerContent
}: {
  extraDrawerContent: React.ReactNode;
}): JSX.Element => (
  <div className="sticky top-0 mt-0 p-3 md:p-4 pb-5 md:pb-0 flex flex-col justify-start gap-4">
    {extraDrawerContent ? null : (
      <div className="flex flex-col items-start gap-2">
        <Link href="/" className="mb-2 flex justify-center">
          <Image
            layout="responsive"
            src={'/images/logo.png'}
            height={'12px'}
            width={'12px'}
            objectFit="cover"
            loading="eager"
            style={{
              width: '100%',
              height: '100%'
            }}
            blurDataURL={'/images/logo.png'}
          />
          <span className="text-lg font-semibold text-foreground">Badshah Consulting</span>
        </Link>
        <About />
      </div>
    )}
    {extraDrawerContent}
    <Socials />
  </div>
);

export default function Header({ extraDrawerContent }: Props): JSX.Element {
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
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetContent side="bottom" className="rounded-t-[14px] block md:hidden">
            <div className="w-full flex justify-center">
              <ChevronDown
                className="text-2xl mb-1 cursor-pointer"
                onClick={() => setIsDrawerOpen(false)}
              />
            </div>
            <HeaderContents
              extraDrawerContent={
                <>
                  <div>
                    <About />
                  </div>
                  {extraDrawerContent}
                </>
              }
            />
          </SheetContent>
        </Sheet>
      )}

      <Button
        variant="default"
        size="icon"
        className="flex md:hidden fixed z-10 bottom-[30px] right-[30px] w-[50px] h-[50px] shadow-[0px_0px_25px_15px_rgba(0,0,0,0.05)] bg-black hover:bg-black"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MoreHorizontal className="text-white text-[40px]" />
      </Button>

      <div className="hidden md:block min-h-screen border-r border-border w-[340px]">
        <HeaderContents extraDrawerContent={extraDrawerContent} />
      </div>
    </>
  );
}
