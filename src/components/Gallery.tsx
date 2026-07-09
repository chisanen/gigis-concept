"use client";

import Image from "next/image";
import { useState } from "react";

const fallbackItems = [
  { src: "https://images.unsplash.com/photo-1745231991466-19d41014cc66?w=600&q=80", alt: "Couple embracing" },
  { src: "https://images.unsplash.com/photo-1515531980326-6244280b99c8?w=600&q=80", alt: "Elegant couple" },
  { src: "https://images.unsplash.com/photo-1515015337340-dbabb1fa63ae?w=600&q=80", alt: "Wedding couple" },
  { src: "https://images.unsplash.com/photo-1560461723-0fa849b3e03a?w=600&q=80", alt: "Bridal party" },
  { src: "https://images.unsplash.com/photo-1516668557604-c8e814fdb184?w=600&q=80", alt: "Birthday celebration" },
  { src: "https://images.unsplash.com/photo-1592599457454-e6ace3370314?w=600&q=80", alt: "Wedding celebration" },
  { src: "https://images.unsplash.com/photo-1585890483032-1465321a75a5?w=600&q=80", alt: "Bridal party formal" },
  { src: "https://images.unsplash.com/photo-1515015443787-2e0fb93d9783?w=600&q=80", alt: "Wedding portrait" },
];

interface GalleryItem {
  src: string;
  alt: string;
}

export function Gallery({ items }: { items?: GalleryItem[] }) {
  const galleryItems = items && items.length > 0 ? items : fallbackItems;
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
