"use client";

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const DEFAULT_VIDEO_SRC =
  "https://res.cloudinary.com/dro6n6co1/video/upload/v1792308468/APfood_ebb8wq.mp4";

export interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc?: string;
  posterSrc?: string;
  bgImageSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  titleClassName?: string;
  subtitleClassName?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc = DEFAULT_VIDEO_SRC,
  posterSrc,
  bgImageSrc = "https://res.cloudinary.com/dro6n6co1/image/upload/v1792341031/APFOOD/hero-bhojanam.jpg",
  title,
  date,
  scrollToExpand,
  textBlend,
  titleClassName,
  subtitleClassName,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Silently catch browser autoplay restrictions if any
      });
    }
  }, [mediaSrc, mediaType]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile, { passive: true });
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Passive, non-blocking scroll-driven expansion (120fps hardware composited)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Smoothly expands over the first 240px (mobile) or 360px (desktop)
          const threshold = isMobileState ? 240 : 360;
          const progress = Math.min(Math.max(scrollY / threshold, 0), 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileState]);

  const scrollToContent = () => {
    const threshold = isMobileState ? 260 : 380;
    window.scrollTo({
      top: threshold,
      behavior: "smooth",
    });
  };

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 450 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 180 : 380);
  const textTranslateX = scrollProgress * (isMobileState ? 28 : 120);
  const titleOpacity = Math.max(0, 1 - scrollProgress * (isMobileState ? 2.0 : 1.5));
  const ctaOpacity = Math.max(0, 1 - scrollProgress * 2.5);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden bg-ambient-light-drift"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          {/* Base Light Amber & Mist Atmosphere */}
          <div
            className="absolute inset-0 z-0 h-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 20%, rgba(242, 179, 27, 0.12) 0%, rgba(238, 245, 237, 0.6) 50%, #FAF7F0 100%)",
            }}
          />

          {/* Fullscreen Atmospheric Background */}
          <div
            className="absolute inset-0 z-0 h-full transition-opacity duration-300 pointer-events-none"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 1.2) }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              className="w-screen h-screen object-cover object-center"
              priority
            />
            {/* Atmospheric overlay with subtle blur that fades cleanly to the canvas in both themes */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#FAF7F0] dark:to-[#081C14] backdrop-blur-[1px]" />
          </div>

          <div className="w-full flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative overflow-hidden">
              {/* Expanding Central Media Window */}
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden border border-white/20 will-change-transform"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: isMobileState ? "calc(100vw - 24px)" : "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 20px 60px rgba(0, 0, 0, 0.6)",
                }}
              >
                {mediaType === "video" ? (
                  mediaSrc.includes("youtube.com") ? (
                    <div className="relative w-full h-full pointer-events-none">
                      <iframe
                        width="100%"
                        height="100%"
                        src={
                          mediaSrc.includes("embed")
                            ? mediaSrc +
                              (mediaSrc.includes("?") ? "&" : "?") +
                              "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1"
                            : mediaSrc.replace("watch?v=", "embed/") +
                              "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=" +
                              mediaSrc.split("v=")[1]
                        }
                        className="w-full h-full rounded-xl"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div
                        className="absolute inset-0 z-10 pointer-events-none"
                      />
                      <div
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        style={{ opacity: Math.max(0.1, 0.5 - scrollProgress * 0.3) }}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full pointer-events-none">
                      <video
                        ref={videoRef}
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover rounded-xl"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className="absolute inset-0 z-10 pointer-events-none"
                      />
                      <div
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        style={{ opacity: Math.max(0.1, 0.5 - scrollProgress * 0.3) }}
                      />
                    </div>
                  )
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover rounded-xl"
                      priority
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl"
                      style={{ opacity: Math.max(0.2, 0.7 - scrollProgress * 0.5) }}
                    />
                  </div>
                )}

                {/* Subtitle / Expansion prompt inside the card at rest */}
                <div
                  className="absolute inset-x-0 bottom-6 flex flex-col items-center text-center z-20 px-4 transition-opacity duration-200"
                  style={{ opacity: ctaOpacity }}
                >
                  {date && (
                    <p
                      className={
                        subtitleClassName ||
                        "text-lg sm:text-2xl font-bold text-turmeric-400 drop-shadow-md"
                      }
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <button
                      type="button"
                      onClick={scrollToContent}
                      className={
                        subtitleClassName
                          ? `${subtitleClassName} mt-2 text-xs sm:text-sm font-semibold text-rice-50/90 hover:text-turmeric-300 transition-colors cursor-pointer bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 animate-bounce active:scale-95`
                          : "mt-2 text-xs sm:text-sm text-blue-200 font-medium text-center cursor-pointer bg-black/40 px-3 py-1 rounded-full active:scale-95"
                      }
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </button>
                  )}
                </div>
              </div>

              {/* Splitting Title (Left & Right animation) */}
              <div
                className={`flex items-center justify-center text-center gap-2 sm:gap-4 w-full relative z-10 transition-none flex-col overflow-hidden px-4 pointer-events-none ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <h2
                  className={
                    titleClassName ||
                    "text-4xl md:text-6xl lg:text-7xl font-extrabold text-rice-50 drop-shadow-xl will-change-transform"
                  }
                  style={{
                    transform: `translateX(-${textTranslateX}vw)`,
                    opacity: titleOpacity,
                  }}
                >
                  {firstWord}
                </h2>
                <h2
                  className={
                    titleClassName ||
                    "text-4xl md:text-6xl lg:text-7xl font-extrabold text-center text-turmeric-400 drop-shadow-xl will-change-transform"
                  }
                  style={{
                    transform: `translateX(${textTranslateX}vw)`,
                    opacity: titleOpacity,
                  }}
                >
                  {restOfTitle}
                </h2>
              </div>
            </div>

            {/* Revealed Content Section — seamlessly flows right below the hero */}
            <div
              ref={contentRef}
              className="flex flex-col w-full transition-opacity duration-500 opacity-100 pointer-events-auto"
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
