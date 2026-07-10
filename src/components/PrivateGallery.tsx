"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  kind?: string;
}

export function PrivateGallery() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [collectionName, setCollectionName] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  const setVideoRef = useCallback((index: number, el: HTMLVideoElement | null) => {
    if (el) {
      videoRefs.current.set(index, el);
    } else {
      videoRefs.current.delete(index);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter your gallery password.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/gallery/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const data = await res.json();
        setCollectionName(data.collectionName);
        setImages(data.images);
        setUnlocked(true);
      } else if (res.status === 401) {
        setError("Invalid password. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setUnlocked(false);
    setPassword("");
    setImages([]);
    setCollectionName("");
    setSelected(null);
    setError("");
  }

  if (unlocked) {
    return (
      <div>
        <div className="text-center mb-10">
          <h3 className="font-script text-3xl text-brand-900 mb-2">{collectionName}</h3>
          <p className="text-[14px] text-brand-600 leading-[1.8]">
            {images.length} photo{images.length !== 1 ? "s" : ""} and video{images.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="relative aspect-[3/4] overflow-hidden group cursor-pointer"
            >
              {img.kind === "video" ? (
                <video
                  ref={(el) => setVideoRef(i, el)}
                  src={img.src}
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
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}
              {/* Download overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
                <a
                  href={img.src}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white/90 text-brand-900 px-3 py-1.5 text-[9px] tracking-[0.15em] hover:bg-white transition-colors"
                >
                  DOWNLOAD
                </a>
              </div>
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
              className="absolute top-4 right-6 text-white/70 text-4xl hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="relative w-full max-w-3xl aspect-[3/4]">
              {images[selected].kind === "video" ? (
                <video
                  controls
                  autoPlay
                  src={images[selected].src}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={images[selected].src}
                  alt={images[selected].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              )}
            </div>
            <a
              href={images[selected].src}
              download
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-6 bg-white/90 text-brand-900 px-6 py-2.5 text-[10px] tracking-[0.2em] hover:bg-white transition-colors"
            >
              DOWNLOAD
            </a>
          </div>
        )}

        <div className="text-center mt-12">
          <button
            onClick={handleReset}
            className="border border-brand-900 px-8 py-3 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all"
          >
            ENTER ANOTHER CODE
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your gallery password"
          className="w-full border border-brand-400 bg-white px-4 py-3.5 text-sm text-center focus:outline-none focus:border-brand-700 transition-colors"
        />
      </div>
      {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-900 text-white py-3.5 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors disabled:opacity-50"
      >
        {loading ? "VERIFYING..." : "ACCESS GALLERY"}
      </button>
    </form>
  );
}
