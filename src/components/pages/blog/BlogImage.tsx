import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Download from 'yet-another-react-lightbox/plugins/download';
import 'yet-another-react-lightbox/styles.css';
import { useLightbox } from './LightboxContext';

interface BlogImageProps {
  src?: string;
  alt?: string;
  title?: string;
  slug?: string;
}

export const BlogImage = ({ src, alt, title, slug }: BlogImageProps) => {
  const { addImage, openLightbox, images, currentIndex, isOpen, closeLightbox } = useLightbox();
  const [imageIndex, setImageIndex] = useState(-1);

  if (!src) return null;

  const imageSrc = src.startsWith('https') ? src : `/images/blog/${slug}/${src}`;

  useEffect(() => {
    const image = { src: imageSrc, alt: alt || '', title };
    addImage(image);

    // Find the index of this image
    const index = images.findIndex((img) => img.src === imageSrc);
    if (index !== -1) {
      setImageIndex(index);
    }
  }, [imageSrc, alt, title, addImage, images]);

  const handleClick = () => {
    // Find current index in case images array has changed
    const index = images.findIndex((img) => img.src === imageSrc);
    if (index !== -1) {
      openLightbox(index);
    }
  };

  return (
    <>
      <div
        className="rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
        onClick={handleClick}
      >
        <Image
          layout="responsive"
          src={imageSrc}
          height={120}
          width={200}
          objectFit="contain"
          loading="eager"
          alt={alt || ''}
          title={title}
          style={{
            width: '100%',
            height: 'auto'
          }}
          blurDataURL={imageSrc}
        />
      </div>
      {imageIndex === 0 && (
        <Lightbox
          open={isOpen}
          close={closeLightbox}
          slides={images}
          index={currentIndex}
          plugins={[Download]}
        />
      )}
    </>
  );
};
