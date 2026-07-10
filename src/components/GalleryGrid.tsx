"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";

interface Photo {
  src: string;
  alt: string;
  kind?: string;
}

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  const setVideoRef = useCallback((index: number, el: HTMLVideoElement | null) => {
    if (el) {
      videoRefs.current.set(index, el);
    } else {
      videoRefs.current.delete(index);
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="relative aspect-[3/4] overflow-hidden group cursor-pointer"
          >
            {photo.kind === "video" ? (
              <video
                ref={(el) => setVideoRef(i, el)}
                src={photo.src}
                muted
                playsInline
                onMouseEnter={() => videoRefs.current.get(i)?.play()}
                onMouseLeave={() => {
                  const v = videoRefs.current.get(i);
                  if (v) { v.pause(); v.currentTime = 0; }
                }}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-6 text-white/70 text-4xl hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="relative w-full max-w-3xl aspect-[3/4]">
            {photos[selected].kind === "video" ? (
              <video
                controls
                autoPlay
                src={photos[selected].src}
                className="absolute inset-0 w-full h-full object-contain"
              />
            ) : (
              <Image
                src={photos[selected].src.replace("w=600", "w=1200")}
                alt={photos[selected].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
