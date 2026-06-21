"use client";

import Image from "next/image";
import { useState } from "react";

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-R7sKX3PXZ1A?w=600&q=80",
    alt: "Bride in elegant wedding gown holding bouquet",
  },
  {
    src: "https://images.unsplash.com/photo-9vHAhn_gUtg?w=600&q=80",
    alt: "Bride with bridesmaids in black dresses",
  },
  {
    src: "https://images.unsplash.com/photo-RjgyOT2cYIA?w=600&q=80",
    alt: "Bride and bridesmaids celebrating with raised arms",
  },
  {
    src: "https://images.unsplash.com/photo-x-a6jIlbzC8?w=600&q=80",
    alt: "Couple embracing with love and affection",
  },
  {
    src: "https://images.unsplash.com/photo-M-adWhDQd7Y?w=600&q=80",
    alt: "Little girls in ballerina dresses at birthday",
  },
  {
    src: "https://images.unsplash.com/photo-USp3vDImrSU?w=600&q=80",
    alt: "Bride and bridesmaids laughing together",
  },
  {
    src: "https://images.unsplash.com/photo-91y7SsvXkJE?w=600&q=80",
    alt: "Beautiful bride in wedding dress with bouquet",
  },
  {
    src: "https://images.unsplash.com/photo-jWW3vn9hpFg?w=600&q=80",
    alt: "Bridal party holding bouquets in forest",
  },
];

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {galleryItems.map((item, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="relative aspect-[3/4] overflow-hidden group cursor-pointer"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-brand-900/10 group-hover:bg-transparent transition-all duration-500" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-6 text-white/80 text-4xl hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="relative w-full max-w-3xl aspect-[3/4]">
            <Image
              src={galleryItems[selected].src.replace("w=600", "w=1200")}
              alt={galleryItems[selected].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
