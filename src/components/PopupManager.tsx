"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface PopupData {
  id: string;
  name: string;
  heading?: string;
  body?: string;
  image?: { url: string; alt?: string };
  offerLabel?: string;
  discountCode?: string;
  ctaLabel?: string;
  ctaHref?: string;
  trigger: "onLoad" | "exitIntent" | "scroll" | "delay";
  delaySeconds?: number;
  frequency: "session" | "day" | "always";
  isActive: boolean;
  startsAt?: string;
  endsAt?: string;
}

// "Once per session" uses sessionStorage so it resets when the browser is
// closed and reopened. "Once per day" uses localStorage so the 24h window
// survives across sessions. "Every visit" is never suppressed.
function storeFor(popup: PopupData): Storage {
  return popup.frequency === "session" ? sessionStorage : localStorage;
}

function shouldShow(popup: PopupData): boolean {
  const now = Date.now();
  if (popup.startsAt && new Date(popup.startsAt).getTime() > now) return false;
  if (popup.endsAt && new Date(popup.endsAt).getTime() < now) return false;

  if (popup.frequency === "always") return true;

  const key = `popup-${popup.id}-shown`;
  const lastShown = storeFor(popup).getItem(key);
  if (!lastShown) return true;

  if (popup.frequency === "session") return false; // already shown this session
  if (popup.frequency === "day") {
    const diff = now - parseInt(lastShown, 10);
    return diff > 86400000; // 24 hours
  }
  return true;
}

function markShown(popup: PopupData) {
  if (popup.frequency === "always") return;
  storeFor(popup).setItem(`popup-${popup.id}-shown`, String(Date.now()));
}

export function PopupManager() {
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [active, setActive] = useState<PopupData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/popups?where[isActive][equals]=true&depth=1&limit=10")
      .then(r => r.json())
      .then(d => setPopups(d.docs || []))
      .catch(() => {});
  }, []);

  const show = useCallback((popup: PopupData) => {
    if (!shouldShow(popup)) return;
    markShown(popup);
    setActive(popup);
  }, []);

  // Set up triggers
  useEffect(() => {
    if (popups.length === 0) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cleanups: (() => void)[] = [];

    for (const popup of popups) {
      if (!shouldShow(popup)) continue;

      if (popup.trigger === "onLoad") {
        timers.push(setTimeout(() => show(popup), 500));
      } else if (popup.trigger === "delay") {
        timers.push(setTimeout(() => show(popup), (popup.delaySeconds || 5) * 1000));
      } else if (popup.trigger === "scroll") {
        const handler = () => {
          const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
          if (scrolled > 0.5) { show(popup); window.removeEventListener("scroll", handler); }
        };
        window.addEventListener("scroll", handler, { passive: true });
        cleanups.push(() => window.removeEventListener("scroll", handler));
      } else if (popup.trigger === "exitIntent") {
        const handler = (e: MouseEvent) => {
          if (e.clientY < 10) { show(popup); document.removeEventListener("mouseleave", handler); }
        };
        document.addEventListener("mouseleave", handler);
        cleanups.push(() => document.removeEventListener("mouseleave", handler));
      }
      break; // Only activate the first eligible popup
    }

    return () => {
      timers.forEach(clearTimeout);
      cleanups.forEach(fn => fn());
    };
  }, [popups, show]);

  // Close on Escape
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active]);

  if (!active) return null;

  const imgUrl = active.image?.url;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setActive(null)}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative bg-white max-w-md w-full rounded-lg overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={() => setActive(null)} className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-brand-600 hover:text-brand-900 transition-colors" aria-label="Close popup">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        {/* Offer badge */}
        {active.offerLabel && (
          <div className="absolute top-4 left-4 z-10 bg-brand-900 text-white text-[10px] tracking-[0.15em] px-3 py-1.5 rounded-full">{active.offerLabel}</div>
        )}

        {/* Image */}
        {imgUrl && (
          <div className="relative w-full aspect-[16/9]">
            <Image src={imgUrl} alt={active.image?.alt || active.heading || ""} fill className="object-cover" sizes="(max-width: 448px) 100vw, 448px" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8 text-center">
          {active.heading && <h3 className="font-script text-3xl text-brand-900 mb-3">{active.heading}</h3>}
          {active.body && <p className="text-[14px] text-brand-600 leading-[1.8] mb-6">{active.body}</p>}

          {active.discountCode && (
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.2em] text-brand-500 uppercase mb-2">Your code</p>
              <button
                onClick={() => { navigator.clipboard.writeText(active.discountCode!); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className="inline-block border-2 border-dashed border-brand-400 px-6 py-2 text-lg tracking-[0.15em] text-brand-900 font-medium hover:border-brand-900 transition-colors"
              >
                {copied ? "COPIED!" : active.discountCode}
              </button>
            </div>
          )}

          {active.ctaLabel && active.ctaHref && (
            <a href={active.ctaHref} onClick={() => setActive(null)} className="inline-block bg-brand-900 text-white px-8 py-3 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors">
              {active.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
