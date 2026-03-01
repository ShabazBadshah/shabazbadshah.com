import React from 'react';
import { BadgeInfo, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaCanadianMapleLeaf } from 'react-icons/fa';

const Hero = () => {
  const HERO_TITLE = 'Turning Operational Complexity Into Scalable Systems';
  const HERO_DESC =
    "I'm Shabaz 👋. I partner with organizations facing complex, high-impact challenges and turn operational friction into secure, scalable digital systems.";
  const SPECIALITY_DESC =
    'My specialty is healthcare digitization in Ontario, where I design and deliver secure, compliance-first infrastructure that modernizes clinic operations, and enables scalable growth.';

  return (
    <section className="pt-12 md:pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex gap-2 justify-center items-center border border-border rounded-full px-4 py-1.5">
            <FaCanadianMapleLeaf className="fill-red-600" />
            <span className="text-sm text-muted-foreground">Made in Canada</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{HERO_TITLE}</h1>

          <p className="text-lg text-muted-foreground">{HERO_DESC}</p>

          <span className="flex flex-row justify-center gap-2 border border-gray-300 bg-sky-100/30 px-4 py-2 rounded-lg">
            <BadgeInfo className="shrink-0 w-6 h-6 mt-1.5 text-sky-800" />
            <p className="text-lg text-muted-foreground">{SPECIALITY_DESC}</p>
          </span>

          <div className="flex flex-wrap gap-4 mt-10">
            <a href="https://calendly.com/badshahconsulting/30min" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="default"
                className="w-full gap-3 text-lg py-6 md:py-4 md:text-md font-normal rounded-full bg-blue-500 text-white hover:bg-black [&_svg]:size-6! md:[&_svg]:size-5!"
              >
                <MessageCircle />
                Let's work together
              </Button>
            </a>
            <a href="#works" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full text-lg md:text-md py-6 md:py-4 rounded-full text-gray-600 border-gray-500  hover:border-sky-700 hover:bg-sky-100 hover:text-sky-700 font-normal"
              >
                View selected work
              </Button>
            </a>
          </div>
        </div>

        {/* <div className="relative hidden md:block">
          <div className="relative rounded-3xl overflow-hidden lg:aspect-auto lg:h-[450px]">
            <img src="/images/hero.svg" alt="Hero" className="w-full h-full object-contain" />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
