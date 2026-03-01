import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArticleCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const ArticleCTA = ({
  title = 'Ready to Get Started?',
  description = "Let's discuss how I can help you achieve your goals. Book a free consultation to explore solutions tailored to your needs.",
  buttonText = 'Book a Consultation',
  buttonLink = 'https://calendly.com/badshahconsulting/30min'
}: ArticleCTAProps) => {
  return (
    <div className="my-12 border border-gray-300 bg-sky-100/30 px-4 py-8 rounded-lg">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        <div className="pt-2">
          <Button
            size="lg"
            className="gap-2 rounded-full bg-blue-400 text-white hover:bg-black"
            asChild
          >
            <a href={buttonLink} className="text-lg font-normal">
              <Calendar className="w-5 h-5" />
              {buttonText}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
