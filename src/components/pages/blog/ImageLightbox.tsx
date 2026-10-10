import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Download from 'yet-another-react-lightbox/plugins/download';
import 'yet-another-react-lightbox/styles.css';

type Props = {
  slides: { src: string; alt?: string; title?: string }[];
  index: number;
  onClose: () => void;
};

export default function ImageLightbox({ slides, index, onClose }: Props): JSX.Element {
  return <Lightbox open index={index} slides={slides} close={onClose} plugins={[Download]} />;
}
