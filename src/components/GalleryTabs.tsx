"use client";

import { useState } from "react";
import { GalleryGrid } from "./GalleryGrid";

interface GalleryPhoto {
  src: string;
  alt: string;
  kind?: string;
}

interface GalleryCollection {
  name: string;
  photos: GalleryPhoto[];
}

export function GalleryTabs({ collections }: { collections: GalleryCollection[] }) {
  const [active, setActive] = useState("all");
  const [copied, setCopied] = useState(false);

  const allPhotos = collections.flatMap(c => c.photos);
  const displayPhotos = active === "all"
    ? allPhotos
    : collections.find(c => c.name === active)?.photos || [];

  function handleShare(collectionName: string) {
    const url = `${window.location.origin}/gallery/${encodeURIComponent(collectionName)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setActive("all")}
          className={`px-5 py-2 text-[11px] tracking-[0.15em] uppercase transition-colors ${
            active === "all" ? "bg-brand-900 text-white" : "bg-brand-200 text-brand-900 hover:bg-brand-300"
          }`}
        >
          All
        </button>
        {collections.map(c => (
          <button
            key={c.name}
            onClick={() => setActive(c.name)}
            className={`px-5 py-2 text-[11px] tracking-[0.15em] uppercase transition-colors ${
              active === c.name ? "bg-brand-900 text-white" : "bg-brand-200 text-brand-900 hover:bg-brand-300"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Share link for selected collection */}
      {active !== "all" && (
        <div className="text-center mb-8">
          <button
            onClick={() => handleShare(active)}
            className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] text-brand-600 hover:text-brand-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            {copied ? "LINK COPIED!" : "SHARE THIS COLLECTION"}
          </button>
        </div>
      )}

      {/* Photo grid */}
      {displayPhotos.length > 0 ? (
        <GalleryGrid photos={displayPhotos} />
      ) : (
        <p className="text-center text-brand-500 text-sm italic py-12">No photos in this collection yet.</p>
      )}
    </div>
  );
}
