"use client";

import { useState } from "react";

export function PackagesSection({ boothHtml, contentHtml, depositPercent = 50 }: { boothHtml: React.ReactNode; contentHtml: React.ReactNode; depositPercent?: number }) {
  const [service, setService] = useState<"booth" | "content">("booth");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center mb-14">
        <div className="inline-flex bg-brand-200 p-1">
          <button
            onClick={() => setService("booth")}
            className={`px-8 py-3 text-[10px] tracking-[0.2em] transition-all ${
              service === "booth" ? "bg-brand-900 text-white" : "text-brand-900 hover:text-brand-700"
            }`}
          >PHOTO BOOTH</button>
          <button
            onClick={() => setService("content")}
            className={`px-8 py-3 text-[10px] tracking-[0.2em] transition-all ${
              service === "content" ? "bg-brand-900 text-white" : "text-brand-900 hover:text-brand-700"
            }`}
          >CONTENT CREATION</button>
        </div>
      </div>
      {service === "booth" ? boothHtml : contentHtml}
      <div className="text-center mt-10">
        <a href="/contact" className="inline-block bg-brand-900 text-white px-10 py-3.5 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors">
          BOOK NOW
        </a>
        <p className="text-[12px] text-brand-500 mt-3">{depositPercent}% non-refundable retainer required. Travel fees may apply outside Dallas.</p>
      </div>
    </div>
  );
}
