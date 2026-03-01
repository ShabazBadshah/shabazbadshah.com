import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LightboxImage {
  src: string;
  alt?: string;
  title?: string;
}

interface LightboxContextType {
  images: LightboxImage[];
  addImage: (image: LightboxImage) => void;
  openLightbox: (index: number) => void;
  currentIndex: number;
  isOpen: boolean;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const LightboxProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const addImage = (image: LightboxImage) => {
    setImages((prev) => {
      // Check if image already exists
      if (prev.some((img) => img.src === image.src)) {
        return prev;
      }
      return [...prev, image];
    });
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <LightboxContext.Provider
      value={{ images, addImage, openLightbox, currentIndex, isOpen, closeLightbox }}
    >
      {children}
    </LightboxContext.Provider>
  );
};

export const useLightbox = () => {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within LightboxProvider');
  }
  return context;
};
