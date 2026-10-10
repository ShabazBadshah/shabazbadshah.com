import React from 'react';
import { Calendar } from 'lucide-react';

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
    <aside className="card my-12 px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="leading-relaxed text-fg-muted">{description}</p>
        <div className="pt-2">
          <a href={buttonLink} className="pill pill-accent">
            <Calendar aria-hidden="true" className="size-[18px]" />
            {buttonText}
          </a>
        </div>
      </div>
    </aside>
  );
};
