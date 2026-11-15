import React from 'react';
import Lightbox, { type DownloadFunctionProps } from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Download from 'yet-another-react-lightbox/plugins/download';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/counter.css';

type Props = {
  /** `description` is the caption under the image, which the toolbar can hide */
  slides: { src: string; alt?: string; title?: string; description?: string }[];
  index: number;
  onClose: () => void;
};

/**
 * Images are served as WebP, but download as PNG: the full-size original (not next/image's resized
 * copy) is drawn to a canvas and saved from there
 */
async function downloadAsPng({ slide, saveAs }: DownloadFunctionProps): Promise<void> {
  let url = new URL(slide.src, window.location.href);
  const optimized = url.pathname === '/_next/image' && url.searchParams.get('url');
  if (optimized) url = new URL(optimized, window.location.href);
  const original = url.href;
  const basename = url.pathname
    .split('/')
    .pop()
    ?.replace(/\.\w+$/, '');
  const name = `${basename || 'image'}.png`;
  try {
    const bitmap = await createImageBitmap(await (await fetch(original)).blob());
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0);
    const png = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    saveAs(png ?? original, name);
  } catch {
    // Falls back to the file as it is served
    saveAs(original);
  }
}

export default function ImageLightbox({ slides, index, onClose }: Props): JSX.Element {
  return (
    <Lightbox
      open
      index={index}
      slides={slides}
      close={onClose}
      // An image count ("2 / 3") only when there is more than one
      plugins={slides.length > 1 ? [Captions, Counter, Download] : [Captions, Download]}
      captions={{ showToggle: true, descriptionTextAlign: 'center' }}
      download={{ download: (props) => void downloadAsPng(props) }}
    />
  );
}
