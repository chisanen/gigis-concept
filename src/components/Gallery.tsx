"use client";

import Image from "next/image";
import { useState } from "react";

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1643297654395-d6375d07215c?w=600&q=80",
    alt: "Graduation celebration with confetti",
  },
  {
    src: "https://images.unsplash.com/photo-1754490900179-528cc5a3f8c4?w=600&q=80",
    alt: "Couple dressed up for a glamorous event",
  },
  {
    src: "https://images.unsplash.com/photo-1754490899906-f793281ea1df?w=600&q=80",
    alt: "Two women dress up for an elegant party",
  },
  {
    src: "https://images.unsplash.com/photo-1742473532838-79aa8e8c1914?w=600&q=80",
    alt: "Woman poses for a photo with friends",
  },
  {
    src: "https://images.unsplash.com/photo-1768508659898-314050703e34?w=600&q=80",
    alt: "Smiling couple in wedding attire holding flowers",
  },
  {
    src: "https://images.unsplash.com/photo-1530519370550-209c4d0f6577?w=600&q=80",
    alt: "Smiling woman at a celebration",
  },
];

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {galleryItems.map((item, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="relative aspect-square overflow-hidden group cursor-pointer"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-6 right-6 text-white text-4xl hover:opacity-70 transition-opacity"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="relative w-full max-w-4xl aspect-square md:aspect-[4/3]">
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
