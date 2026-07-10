"use client";

import { useState, useEffect, useCallback } from "react";

interface Testimonial {
  quote: string;
  author: string;
  event: string;
}

const fallbackTestimonials: Testimonial[] = [
  {
    quote: "The photo booth was the highlight of the entire party! Everyone was lined up all night. The prints came out gorgeous and my mom has them all over her fridge now.",
    author: "Latoya E.",
    event: "60th Birthday Celebration",
  },
  {
    quote: "I cannot stop watching the birthday recap video. My baby looked like a little superstar the whole time! You captured every moment perfectly. Best decision I made for her party.",
    author: "Briana M.",
    event: "Daughter's 3rd Birthday Party",
  },
];

export function TestimonialCarousel({
  testimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const items = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const goTo = useCallback(
    (index: number) => {
      setFade(false);
      setTimeout(() => {
        setCurrent(index);
        setFade(true);
      }, 300);
    },
    [],
  );

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      goTo((current + 1) % items.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [current, items.length, goTo]);

  const item = items[current];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
      <svg
        className="w-10 h-10 mx-auto text-brand-400/50 mb-10"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <div
        className={`transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
      >
        <p className="font-script text-[1.35rem] md:text-[1.6rem] text-brand-900 leading-[1.7] mb-12">
          {item.quote}
        </p>
        <div className="w-14 h-px bg-brand-400 mx-auto mb-6" />
        <p className="text-[10px] tracking-[0.35em] text-brand-600 uppercase">
          {item.author} &middot; {item.event}
        </p>
      </div>

      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current
                  ? "bg-brand-900 w-6"
                  : "bg-brand-400/40 hover:bg-brand-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
