import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReadingProgressBar(props: any): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) {
    return <></>;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm text-foreground hidden max-md:block">
      <div className="flex items-center gap-1 max-w-[900px] w-full mx-auto p-0 justify-start px-0 sm:px-4">
        <Button
          variant="ghost"
          size="icon"
          className="pl-0 h-8 w-8"
          onClick={() => Router.push('/')}
        >
          <Home className="w-5 h-5 text-black" />
        </Button>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis text-base sm:text-sm">
          {props.text}
        </p>
      </div>
      <div className="w-full" ref={props.ref}>
        <div className="h-1 bg-primary" style={{ width: `${props.percent}%` }} />
      </div>
    </div>
  );
}
