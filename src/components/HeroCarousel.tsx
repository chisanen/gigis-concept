"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";

interface HeroSlide {
  src: string;
  alt: string;
  type?: "image" | "video";
}

const VIDEO_EXT_RE = /\.(mp4|mov|webm|avi|mkv|m4v)$/i;

function isVideoSlide(slide: HeroSlide): boolean {
  return slide.type === "video" || VIDEO_EXT_RE.test(slide.src);
}

const defaultSlides: HeroSlide[] = [
  { src: "/hero-wedding.png", alt: "Elegant bride and groom on wedding steps" },
  { src: "/hero-champagne.png", alt: "Luxurious champagne tower at reception" },
  { src: "/hero-nigerian.png", alt: "Diverse group of friends celebrating at a luxury photo booth" },
  { src: "/hero-kiss.png", alt: "Bride and groom sharing a romantic kiss" },
  { src: "/hero-reception.png", alt: "Opulent wedding reception celebration" },
];

export function HeroCarousel({ slides: slidesProp }: { slides?: HeroSlide[] } = {}) {
  const slides = slidesProp && slidesProp.length > 0 ? slidesProp : defaultSlides;
  const [current, setCurrent] = useState(0);

  const currentIsVideo = useMemo(() => isVideoSlide(slides[current]), [slides, current]);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    // Pause auto-rotation when the current slide is a video
    if (currentIsVideo) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, currentIsVideo]);

  return (
    <>
      {slides.map((slide, i) => {
        if (isVideoSlide(slide)) {
          return (
            <video
              key={slide.src}
              src={slide.src}
              autoPlay
              muted
              loop
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
              disablePictureInPicture
              aria-label={slide.alt}
              // eslint-disable-next-line react/no-unknown-property
              {...{ "webkit-playsinline": "true" } as Record<string, string>}
              style={{ objectPosition: "center center" }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          );
        }

        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            className={`object-cover transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
            sizes="100vw"
          />
        );
      })}

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-white w-6"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </>
  );
}
