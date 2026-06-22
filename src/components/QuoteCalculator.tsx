"use client";

import { useState } from "react";
import Link from "next/link";

export function QuoteCalculator() {
  const [service, setService] = useState<"booth" | "content">("booth");
  const [boothHours, setBoothHours] = useState(3);
  const [boothRate] = useState(150);
  const [contentPkg, setContentPkg] = useState<"basic" | "storyteller">("basic");
  const [basicHours, setBasicHours] = useState(2);
  const [shortEdits, setShortEdits] = useState(0);
  const [longEdits, setLongEdits] = useState(0);

  const boothTotal = boothHours * boothRate;

  const contentTotal =
    contentPkg === "storyteller"
      ? 450 + shortEdits * 30 + Math.max(0, longEdits - 1) * 40
      : basicHours * 50 + shortEdits * 30 + longEdits * 40;

  const total = service === "booth" ? boothTotal : contentTotal;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Service toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-brand-200 p-1">
          <button
            onClick={() => setService("booth")}
            className={`px-8 py-3 text-[10px] tracking-[0.2em] transition-all ${
              service === "booth"
                ? "bg-brand-900 text-white"
                : "text-brand-900 hover:text-brand-700"
            }`}
          >
            PHOTO BOOTH
          </button>
          <button
            onClick={() => setService("content")}
            className={`px-8 py-3 text-[10px] tracking-[0.2em] transition-all ${
              service === "content"
                ? "bg-brand-900 text-white"
                : "text-brand-900 hover:text-brand-700"
            }`}
          >
            CONTENT CREATION
          </button>
        </div>
      </div>

      <div className="bg-white border border-brand-200 p-8 md:p-10">
        {service === "booth" ? (
          <>
            <h3 className="text-lg font-semibold text-brand-900 text-center mb-8">
              LUXURY PHOTO BOOTH
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-[14px] text-brand-900">Event duration (hours)</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBoothHours(Math.max(1, boothHours - 1))}
                    className="w-8 h-8 border border-brand-400 text-brand-900 flex items-center justify-center hover:bg-brand-200 transition-colors"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-brand-900 font-medium">{boothHours}</span>
                  <button
                    onClick={() => setBoothHours(Math.min(12, boothHours + 1))}
                    className="w-8 h-8 border border-brand-400 text-brand-900 flex items-center justify-center hover:bg-brand-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t border-brand-200 pt-4 space-y-2 text-[13px] text-brand-600">
                <div className="flex justify-between"><span>Custom Backdrop</span><span>INCLUDED</span></div>
                <div className="flex justify-between"><span>On-Site Attendant</span><span>INCLUDED</span></div>
                <div className="flex justify-between"><span>Instant Prints</span><span>UNLIMITED</span></div>
                <div className="flex justify-between"><span>Digital Gallery</span><span>24 HR</span></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-brand-900 text-center mb-8">
              CONTENT CREATION
            </h3>
            <div className="space-y-6">
              {/* Package selection */}
              <div>
                <label className="text-[14px] text-brand-900 block mb-3">Package</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setContentPkg("basic")}
                    className={`flex-1 py-3 text-[11px] tracking-[0.15em] border transition-all ${
                      contentPkg === "basic"
                        ? "border-brand-900 bg-brand-900 text-white"
                        : "border-brand-400 text-brand-900 hover:border-brand-900"
                    }`}
                  >
                    THE BASIC — $50/HR
                  </button>
                  <button
                    onClick={() => setContentPkg("storyteller")}
                    className={`flex-1 py-3 text-[11px] tracking-[0.15em] border transition-all ${
                      contentPkg === "storyteller"
                        ? "border-brand-900 bg-brand-900 text-white"
                        : "border-brand-400 text-brand-900 hover:border-brand-900"
                    }`}
                  >
                    THE STORYTELLER — $450
                  </button>
                </div>
              </div>

              {/* Basic hours */}
              {contentPkg === "basic" && (
                <div className="flex items-center justify-between">
                  <label className="text-[14px] text-brand-900">Hours (2 hr min)</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setBasicHours(Math.max(2, basicHours - 1))}
                      className="w-8 h-8 border border-brand-400 text-brand-900 flex items-center justify-center hover:bg-brand-200 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-brand-900 font-medium">{basicHours}</span>
                    <button
                      onClick={() => setBasicHours(Math.min(10, basicHours + 1))}
                      className="w-8 h-8 border border-brand-400 text-brand-900 flex items-center justify-center hover:bg-brand-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add-ons */}
              <div className="border-t border-brand-200 pt-4">
                <p className="text-[11px] tracking-[0.2em] text-brand-500 mb-4 uppercase">Add-ons</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[14px] text-brand-900">Short-form edits ($30 ea)</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setShortEdits(Math.max(0, shortEdits - 1))}
                        className="w-8 h-8 border border-brand-400 text-brand-900 flex items-center justify-center hover:bg-brand-200 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-brand-900 font-medium">{shortEdits}</span>
                      <button
                        onClick={() => setShortEdits(shortEdits + 1)}
                        className="w-8 h-8 border border-brand-400 text-brand-900 flex items-center justify-center hover:bg-brand-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-[14px] text-brand-900">
                      Long-form edits ($40 ea)
                      {contentPkg === "storyteller" && (
                        <span className="text-brand-500 text-[12px] block">1st edit free with Storyteller</span>
                      )}
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setLongEdits(Math.max(0, longEdits - 1))}
                        className="w-8 h-8 border border-brand-400 text-brand-900 flex items-center justify-center hover:bg-brand-200 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-brand-900 font-medium">{longEdits}</span>
                      <button
                        onClick={() => setLongEdits(longEdits + 1)}
                        className="w-8 h-8 border border-brand-400 text-brand-900 flex items-center justify-center hover:bg-brand-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Total */}
        <div className="border-t border-brand-900 mt-8 pt-6 flex justify-between items-end">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-brand-500 uppercase mb-1">Estimated Total</p>
            <p className="text-4xl font-light text-brand-900">${total.toLocaleString()}</p>
          </div>
          <Link
            href="/contact"
            className="bg-brand-900 text-white px-8 py-3 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors"
          >
            BOOK NOW
          </Link>
        </div>
      </div>

      <p className="text-center text-[12px] text-brand-500 mt-4">
        Final pricing confirmed upon consultation. Travel fees may apply for locations outside Dallas.
      </p>
    </div>
  );
}
