import { getPayload } from "@/lib/payload";

export interface PricingPackage {
  id: string;
  name: string;
  category: "content_creation" | "photo_booth";
  subtitle?: string;
  shortDescription?: string;
  priceCents: number;
  priceDisplay: string;
  priceUnit?: string;
  isHourly: boolean;
  minimumHours?: number;
  features: { feature: string }[];
  isFeatured: boolean;
  badge?: string;
  sortOrder?: number;
}

export interface PricingAddOn {
  id: string;
  name: string;
  appliesTo: "all" | "photo_booth" | "content_creation";
  priceCents: number;
  priceDisplay: string;
  unit: "flat" | "per_hour" | "per_item";
  note?: string;
  sortOrder?: number;
}

export interface PricingData {
  packages: PricingPackage[];
  addOns: PricingAddOn[];
  depositPercent: number;
  travelPerMileCents: number;
  travelFreeRadiusMiles: number;
}

// Fallback data used when CMS collections are empty (no packages entered yet)
const FALLBACK_PACKAGES: PricingPackage[] = [
  { id: "fb-good-angle", name: "The Good Angle", category: "photo_booth", priceCents: 29000, priceDisplay: "$290", priceUnit: "3-HR MIN", isHourly: false, isFeatured: false, features: [{ feature: "Custom Backdrop" }, { feature: "On-Site Attendant" }, { feature: "Unlimited Prints" }, { feature: "Digital Gallery (24hr)" }], shortDescription: "Custom Backdrop, On-Site Attendant, Unlimited Prints, Digital Gallery (24hr)" },
  { id: "fb-extended", name: "5-Hour Extended Coverage", category: "photo_booth", priceCents: 45000, priceDisplay: "$450", priceUnit: "5 HOURS", isHourly: false, isFeatured: true, badge: "Popular", features: [{ feature: "Everything in The Good Angle" }, { feature: "Extended coverage" }, { feature: "Premium backdrops" }], shortDescription: "Everything in The Good Angle + extended coverage + premium backdrops" },
  { id: "fb-basic", name: "Basic Package", category: "content_creation", priceCents: 6000, priceDisplay: "$60", priceUnit: "/HR", isHourly: true, minimumHours: 2, isFeatured: false, features: [{ feature: "On-site capture" }, { feature: "All raw footage" }, { feature: "1 free short edit" }], shortDescription: "On-site capture, all raw footage, 1 free short edit" },
  { id: "fb-storyteller", name: "The Storyteller", category: "content_creation", priceCents: 55000, priceDisplay: "$550", priceUnit: "FLAT", isHourly: false, isFeatured: true, badge: "Popular", features: [{ feature: "4-hr shoot" }, { feature: "3 long + 2 short videos" }, { feature: "Raw footage" }, { feature: "48-hr delivery" }], shortDescription: "4-hr shoot, 3 long + 2 short videos, Raw footage, 48-hr delivery" },
  { id: "fb-signature", name: "Gigi's Signature Full-Day", category: "content_creation", priceCents: 80000, priceDisplay: "$800", priceUnit: "FLAT", isHourly: false, isFeatured: false, badge: "Wedding Favorite", features: [{ feature: "8-hr shoot" }, { feature: "5+ edited videos" }, { feature: "Complete raw footage" }, { feature: "7-10 day delivery" }], shortDescription: "8-hr shoot, 5+ edited videos, Complete raw footage, 7-10 day delivery" },
];

const FALLBACK_ADDONS: PricingAddOn[] = [
  { id: "fb-extra-time", name: "Additional Time", appliesTo: "photo_booth", priceCents: 9700, priceDisplay: "$97", unit: "per_hour" },
  { id: "fb-spandex", name: "Classic Spandex Backdrop", appliesTo: "photo_booth", priceCents: 2500, priceDisplay: "$25", unit: "flat" },
  { id: "fb-curtain", name: "Curtain Backdrop", appliesTo: "photo_booth", priceCents: 2500, priceDisplay: "$25", unit: "flat", note: "up to $50" },
  { id: "fb-flower", name: "Flower Wall Backdrop", appliesTo: "photo_booth", priceCents: 5000, priceDisplay: "$50", unit: "flat", note: "up to $100" },
  { id: "fb-short-edit", name: "Short Video Edit", appliesTo: "content_creation", priceCents: 3000, priceDisplay: "$30", unit: "flat" },
  { id: "fb-long-edit", name: "Long Video Edit", appliesTo: "content_creation", priceCents: 4000, priceDisplay: "$40", unit: "flat" },
  { id: "fb-rush", name: "Rush Delivery (24hr)", appliesTo: "content_creation", priceCents: 5000, priceDisplay: "$50", unit: "flat" },
  { id: "fb-assistant", name: "On-Site Assistant", appliesTo: "all", priceCents: 1000, priceDisplay: "$10", unit: "per_hour" },
];

export async function getPricingData(): Promise<PricingData> {
  try {
    const payload = await getPayload();
    const [pkgs, addons, settings, serviceArea] = await Promise.all([
      payload.find({ collection: "packages", where: { isVisible: { equals: true } }, sort: "sortOrder", limit: 50 }),
      payload.find({ collection: "add-ons", where: { isVisible: { equals: true } }, sort: "sortOrder", limit: 50 }),
      payload.findGlobal({ slug: "site-settings" }),
      payload.findGlobal({ slug: "service-area" }),
    ]);
    const cmsPkgs = pkgs.docs as unknown as PricingPackage[];
    const cmsAddOns = addons.docs as unknown as PricingAddOn[];
    return {
      packages: cmsPkgs.length > 0 ? cmsPkgs : FALLBACK_PACKAGES,
      addOns: cmsAddOns.length > 0 ? cmsAddOns : FALLBACK_ADDONS,
      depositPercent: (settings as Record<string, unknown>).depositPercent as number ?? 50,
      travelPerMileCents: (serviceArea as Record<string, unknown>).perMileCents as number ?? 50,
      travelFreeRadiusMiles: (serviceArea as Record<string, unknown>).includedRadiusMiles as number ?? 25,
    };
  } catch {
    return { packages: FALLBACK_PACKAGES, addOns: FALLBACK_ADDONS, depositPercent: 50, travelPerMileCents: 50, travelFreeRadiusMiles: 25 };
  }
}
