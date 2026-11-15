import { Lock } from 'lucide-react';
import Image from 'next/image';

import { siteConfig } from '@/config/site';
import { content } from '@/content/content';
import type { LockedMedia as Media } from '@/lib/case-studies';

/** What a case study's `<!-- locked-media -->` comment renders as in its section's HTML */
export const LOCKED_MEDIA_HTML = '<div data-locked-media=""></div>';

/**
 * Screens under NDA: an already-blurred preview (never a real screenshot blurred with CSS, which
 * anyone could open unblurred) with a lock and a message over it, linking to a walkthrough request.
 * Without the image file it is a plain panel.
 */
export default function LockedMedia({ media }: { media: Media }): JSX.Element {
  const subject = encodeURIComponent(content.caseStudy.walkthroughSubject);
  return (
    <a
      href={`mailto:${siteConfig.person.email}?subject=${subject}`}
      className="card relative my-6 grid aspect-video place-items-center bg-fill no-underline"
    >
      {media.image && <Image src={media.image} alt={media.alt} layout="fill" objectFit="cover" />}
      <span className="relative mx-4 flex max-w-sm flex-col items-center gap-3 rounded-card border bg-elevated px-6 py-5 text-center text-sm text-fg backdrop-blur-lg">
        <Lock aria-hidden="true" className="size-5" />
        {media.message}
      </span>
    </a>
  );
}
