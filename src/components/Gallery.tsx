"use client";

import Image from "next/image";
import { useState } from "react";

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1535428245347-3ab06a1b100a?w=600&q=80",
    alt: "Wedding love and marriage",
  },
  {
    src: "https://images.unsplash.com/photo-1692457799626-4477193123c6?w=600&q=80",
    alt: "Black love couple portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1700142534189-cc18e2d42917?w=600&q=80",
    alt: "Bride holding bouquet",
  },
  {
    src: "https://images.unsplash.com/photo-1562182856-e39faab686d7?w=600&q=80",
    alt: "Elegant bridal party in beautiful dresses",
  },
  {
    src: "https://images.unsplash.com/photo-1516668557604-c8e814fdb184?w=600&q=80",
    alt: "Toddler blowing birthday candles",
  },
  {
    src: "https://images.unsplash.com/photo-1632850741446-50260d19a158?w=600&q=80",
    alt: "Beautiful portrait session",
  },
  {
    src: "https://images.unsplash.com/photo-1719499719196-7a256956a22b?w=600&q=80",
    alt: "Bride and groom elegant pose",
  },
  {
    src: "https://images.unsplash.com/photo-1563525614522-b76b89d81024?w=600&q=80",
    alt: "Sweet baby birthday celebration",
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
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-brand-900/5 group-hover:bg-transparent transition-all duration-500" />
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
