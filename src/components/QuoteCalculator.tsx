"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Package {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  priceCents: number;
  priceDisplay: string;
  priceUnit: string;
  features: { feature: string }[];
  isFeatured: boolean;
  badge?: string;
}

interface AddOn {
  id: string;
  name: string;
  priceCents: number;
  priceDisplay: string;
  unit: string;
  appliesTo: string;
}

export function QuoteCalculator() {
  const [service, setService] = useState<"booth" | "content">("booth");
  const [packages, setPackages] = useState<Package[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/packages?limit=20&sort=sortOrder").then(r => r.json()).catch(() => ({ docs: [] })),
      fetch("/api/add-ons?limit=20&where[isVisible][equals]=true").then(r => r.json()).catch(() => ({ docs: [] })),
    ]).then(([pkgData, addOnData]) => {
      setPackages(pkgData.docs || []);
      setAddOns(addOnData.docs || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-center py-12"><p className="text-brand-500 text-sm">Loading packages...</p></div>;
  }

  const contentPkgs = packages.filter(p => p.category === "content_creation");
  const boothPkgs = packages.filter(p => p.category === "photo_booth");
  const contentAddOns = addOns.filter(a => a.appliesTo === "content_creation" || a.appliesTo === "all");
  const boothAddOns = addOns.filter(a => a.appliesTo === "photo_booth" || a.appliesTo === "all");

  const currentPkgs = service === "content" ? contentPkgs : boothPkgs;
  const currentAddOns = service === "content" ? contentAddOns : boothAddOns;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Toggle */}
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

      {/* Packages */}
      <div className={`grid gap-0 ${currentPkgs.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {currentPkgs.map((pkg) => (
          <div
            key={pkg.id}
            className={`p-8 md:p-10 relative ${
              pkg.isFeatured
                ? "bg-brand-900 text-white border border-brand-900"
                : "bg-white border border-brand-200"
            }`}
          >
            {pkg.badge && (
              <p className={`absolute top-4 right-4 font-script text-base italic ${
                pkg.isFeatured ? "text-brand-500" : "text-brand-600"
              }`}>{pkg.badge}</p>
            )}
            <h3 className={`text-xl font-semibold mb-1 ${pkg.isFeatured ? "text-white" : "text-brand-900"}`}>
              {pkg.name}
            </h3>
            <p className={`text-sm mb-8 italic ${pkg.isFeatured ? "text-brand-400" : "text-brand-600"}`}>
              {pkg.subtitle}
            </p>

            <div className="space-y-3 mb-10 min-h-[140px]">
              {pkg.features?.map((f, i) => (
                <p key={i} className={`text-sm border-b pb-3 ${
                  pkg.isFeatured ? "text-brand-400 border-brand-700/30" : "text-brand-600 border-brand-200"
                }`}>{f.feature}</p>
              ))}
            </div>

            <div className={`border-t pt-6 ${pkg.isFeatured ? "border-brand-700/30" : "border-brand-200"}`}>
              <span className={`text-3xl font-light ${pkg.isFeatured ? "text-white" : "text-brand-900"}`}>
                {pkg.priceDisplay}
              </span>
              <span className={`text-xs tracking-[0.1em] ml-1 ${pkg.isFeatured ? "text-brand-500" : "text-brand-600"}`}>
                {pkg.priceUnit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add-ons */}
      {currentAddOns.length > 0 && (
        <div className="mt-10 bg-white border border-brand-200 p-8">
          <h3 className="text-sm tracking-[0.15em] text-brand-900 uppercase mb-6 font-medium">Add-ons</h3>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {currentAddOns.map((addon) => (
              <div key={addon.id} className="flex justify-between items-center border-b border-brand-200 pb-3">
                <span className="text-sm text-brand-900">{addon.name}</span>
                <span className="text-sm text-brand-600">{addon.priceDisplay}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          href="/contact"
          className="inline-block bg-brand-900 text-white px-10 py-3.5 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors"
        >BOOK NOW</Link>
        <p className="text-[12px] text-brand-500 mt-3">
          50% non-refundable retainer required to secure your date. Travel fees may apply outside Dallas.
        </p>
      </div>
    </div>
  );
}
