"use client";

import React, { ReactNode } from "react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

interface CulinaryHeroWrapperProps {
  locale: string;
  children: ReactNode;
}

export function CulinaryHeroWrapper({
  locale,
  children,
}: CulinaryHeroWrapperProps) {
  const isTe = locale === "te";

  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc="https://res.cloudinary.com/dro6n6co1/video/upload/v1792308468/APfood_ebb8wq.mp4"
      posterSrc="https://res.cloudinary.com/dro6n6co1/image/upload/v1792341031/APFOOD/hero-bhojanam.jpg"
      bgImageSrc="https://res.cloudinary.com/dro6n6co1/image/upload/v1792341031/APFOOD/hero-bhojanam.jpg"
      title={isTe ? "ఆంధ్ర రుచులు" : "Andhra Ruchulu"}

      scrollToExpand={
        isTe
          ? "విందును చూడటానికి స్క్రోల్ చేయండి ↓ · Scroll to Reveal"
          : "Scroll to Reveal the Feast ↓"
      }
      titleClassName="font-displayTe text-4xl sm:text-6xl lg:text-8xl font-black text-rice-50 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] tracking-tight"
      subtitleClassName="font-display text-sm sm:text-2xl font-bold text-turmeric-400 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-wide"
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 space-y-10 sm:space-y-16 py-4 sm:py-8">
        {children}
      </div>
    </ScrollExpandMedia>
  );
}
