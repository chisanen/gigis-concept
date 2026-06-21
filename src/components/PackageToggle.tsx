"use client";

import { useState } from "react";
import Link from "next/link";

const contentPackages = [
  {
    label: "CAPTURE ONLY",
    name: "THE BASIC",
    tagline: "on-the-go content",
    price: "$50",
    unit: "/ HR",
    features: [
      "On-site content capture",
      "Two-hour minimum",
      "All raw footage delivered",
    ],
    featured: false,
  },
  {
    label: "SIGNATURE",
    name: "THE STORYTELLER",
    tagline: "a complete content day",
    price: "$450",
    unit: "FLAT",
    badge: "most loved",
    features: [
      "Four hours of directed shooting",
      "Three fully-edited long videos",
      "Two fully-edited short videos",
      "All raw footage included",
      "48-hour delivery",
    ],
    featured: true,
  },
  {
    label: "ADD-ON",
    name: "EDITED VIDEOS",
    tagline: "polish a single piece",
    price: "$30",
    unit: "STARTING",
    features: [
      "Short-form edit — $30",
      "Long-form edit — $40",
      "One long edit free with any shoot",
    ],
    featured: false,
  },
];

const boothInclusions = [
  { item: "Custom Backdrop", value: "INCLUDED" },
  { item: "On-Site Attendant", value: "INCLUDED" },
  { item: "Instant Prints", value: "UNLIMITED" },
  { item: "Digital Gallery", value: "24 HR" },
  { item: "Props & Accessories", value: "INCLUDED" },
  { item: "Personalized Photo Strips", value: "INCLUDED" },
];

export function PackageToggle() {
  const [active, setActive] = useState<"booth" | "content">("booth");

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex bg-brand-200 p-1">
          <button
            onClick={() => setActive("booth")}
            className={`px-8 py-3 text-sm tracking-[0.15em] transition-all ${
              active === "booth"
                ? "bg-brand-900 text-white"
                : "text-brand-900 hover:text-brand-700"
            }`}
          >
            PHOTO BOOTH
          </button>
          <button
            onClick={() => setActive("content")}
            className={`px-8 py-3 text-sm tracking-[0.15em] transition-all ${
              active === "content"
                ? "bg-brand-900 text-white"
                : "text-brand-900 hover:text-brand-700"
            }`}
          >
            CONTENT CREATION
          </button>
        </div>
      </div>

      {/* Content Creation Packages */}
      {active === "content" && (
        <div className="grid md:grid-cols-3 gap-0 max-w-5xl mx-auto">
          {contentPackages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-8 md:p-10 relative ${
                pkg.featured
                  ? "bg-brand-900 text-white border border-brand-900"
                  : "bg-white border border-brand-200"
              }`}
            >
              {pkg.badge && (
                <p className="absolute top-4 right-4 font-script text-base text-brand-500 italic">
                  {pkg.badge}
                </p>
              )}
              <p
                className={`text-[10px] tracking-[0.2em] mb-2 ${
                  pkg.featured ? "text-brand-500" : "text-brand-600"
                }`}
              >
                {pkg.label}
              </p>
              <h3
                className={`text-xl font-semibold mb-1 ${
                  pkg.featured ? "text-white" : "text-brand-900"
                }`}
              >
                {pkg.name}
              </h3>
              <p
                className={`font-script text-base mb-8 italic ${
                  pkg.featured ? "text-brand-400" : "text-brand-600"
                }`}
              >
                {pkg.tagline}
              </p>

              <div className="space-y-3 mb-10 min-h-[180px]">
                {pkg.features.map((f) => (
                  <p
                    key={f}
                    className={`text-sm border-b pb-3 ${
                      pkg.featured
                        ? "text-brand-400 border-brand-700/30"
                        : "text-brand-600 border-brand-200"
                    }`}
                  >
                    {f}
                  </p>
                ))}
              </div>

              <div
                className={`border-t pt-6 ${
                  pkg.featured ? "border-brand-700/30" : "border-brand-200"
                }`}
              >
                <span
                  className={`text-3xl font-light ${
                    pkg.featured ? "text-white" : "text-brand-900"
                  }`}
                >
                  {pkg.price}
                </span>
                <span
                  className={`text-xs tracking-[0.1em] ml-1 ${
                    pkg.featured ? "text-brand-500" : "text-brand-600"
                  }`}
                >
                  {pkg.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Booth Package */}
      {active === "booth" && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-brand-200 p-8 md:p-12">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-semibold text-brand-900 mb-2">
                LUXURY PHOTO BOOTH
              </h3>
              <p className="font-script text-lg text-brand-600 italic">
                every booking includes
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4 mb-10">
              {boothInclusions.map((inc) => (
                <div
                  key={inc.item}
                  className="flex justify-between items-center border-b border-brand-200 pb-3"
                >
                  <span className="text-brand-900">{inc.item}</span>
                  <span className="text-xs tracking-[0.15em] text-brand-600">
                    {inc.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-brand-600 mb-6">
                Pricing varies by event duration and location.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-brand-900 text-white px-8 py-3 text-sm tracking-[0.2em] hover:bg-brand-700 transition-colors"
              >
                REQUEST A QUOTE
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
