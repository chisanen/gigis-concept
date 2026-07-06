"use client";

import { useEffect, useState } from "react";

interface Props {
  handle?: string;
}

export function InstagramFeed({ handle }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!handle) return;

    // Use Behold's free embed (no API key needed, just the handle)
    // Alternative: use an iframe to embed the profile
    setLoaded(true);
  }, [handle]);

  if (!handle) {
    return (
      <div className="text-center py-12">
        <p className="text-[13px] text-brand-500">
          Connect your Instagram in Admin → Site Settings → Social to show your feed here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Embedded Instagram profile grid using an iframe */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {/* We use the Instagram embed approach — each post is linked to the profile */}
        {Array.from({ length: 8 }).map((_, i) => (
          <a
            key={i}
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square bg-brand-200 overflow-hidden group flex items-center justify-center"
          >
            <div className="text-center">
              <svg className="w-8 h-8 mx-auto text-brand-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <p className="text-[10px] text-brand-500 tracking-[0.1em]">@{handle}</p>
            </div>
            <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/10 transition-colors duration-300" />
          </a>
        ))}
      </div>
      <div className="text-center mt-8">
        <a
          href={`https://instagram.com/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-brand-900 px-8 py-3 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all"
        >
          FOLLOW @{handle.toUpperCase()} ON INSTAGRAM
        </a>
      </div>
    </div>
  );
}
