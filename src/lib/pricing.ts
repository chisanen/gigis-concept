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

export async function getPricingData(): Promise<PricingData> {
  try {
    const payload = await getPayload();
    const [pkgs, addons, settings, serviceArea] = await Promise.all([
      payload.find({ collection: "packages", where: { isVisible: { equals: true } }, sort: "sortOrder", limit: 50 }),
      payload.find({ collection: "add-ons", where: { isVisible: { equals: true } }, sort: "sortOrder", limit: 50 }),
      payload.findGlobal({ slug: "site-settings" }),
      payload.findGlobal({ slug: "service-area" }),
    ]);
    return {
      packages: pkgs.docs as unknown as PricingPackage[],
      addOns: addons.docs as unknown as PricingAddOn[],
      depositPercent: (settings as Record<string, unknown>).depositPercent as number ?? 50,
      travelPerMileCents: (serviceArea as Record<string, unknown>).perMileCents as number ?? 50,
      travelFreeRadiusMiles: (serviceArea as Record<string, unknown>).includedRadiusMiles as number ?? 25,
    };
  } catch {
    return { packages: [], addOns: [], depositPercent: 50, travelPerMileCents: 50, travelFreeRadiusMiles: 25 };
  }
}
