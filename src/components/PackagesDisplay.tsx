import Link from "next/link";
import { getPayload } from "@/lib/payload";

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
  priceDisplay: string;
  appliesTo: string;
}

const fallbackPackages: Package[] = [
  { id: "fb-good-angle", name: "The Good Angle", subtitle: "3-hour photo booth experience", category: "photo_booth", priceCents: 29000, priceDisplay: "$290", priceUnit: "3-HR MIN", features: [{ feature: "Custom Backdrop" }, { feature: "On-Site Attendant" }, { feature: "Unlimited Prints" }, { feature: "Digital Gallery (24hr)" }], isFeatured: false },
  { id: "fb-extended", name: "5-Hour Extended Coverage", subtitle: "extended photo booth coverage", category: "photo_booth", priceCents: 45000, priceDisplay: "$450", priceUnit: "5 HOURS", features: [{ feature: "Everything in The Good Angle" }, { feature: "Extended coverage" }, { feature: "Premium backdrops" }], isFeatured: true, badge: "Popular" },
  { id: "fb-basic", name: "Basic Package", subtitle: "capture only", category: "content_creation", priceCents: 6000, priceDisplay: "$60", priceUnit: "/HR", features: [{ feature: "On-site content capture" }, { feature: "Two-hour minimum" }, { feature: "All raw footage delivered" }, { feature: "1 free short video edit" }], isFeatured: false },
  { id: "fb-storyteller", name: "The Storyteller", subtitle: "a complete content day", category: "content_creation", priceCents: 55000, priceDisplay: "$550", priceUnit: "FLAT", features: [{ feature: "Four hours of directed shooting" }, { feature: "Three fully-edited long videos" }, { feature: "Two fully-edited short videos" }, { feature: "All raw footage included" }, { feature: "48-hour delivery" }], isFeatured: true, badge: "Popular" },
  { id: "fb-signature", name: "Gigi's Signature Full-Day", subtitle: "the complete experience", category: "content_creation", priceCents: 80000, priceDisplay: "$800", priceUnit: "FLAT", features: [{ feature: "8-hour shoot" }, { feature: "5+ edited videos total" }, { feature: "Complete raw footage delivered" }, { feature: "7-10 day delivery" }], isFeatured: false, badge: "Wedding Favorite" },
];

const fallbackAddOns: AddOn[] = [
  { id: "fb-spandex", name: "Classic Spandex Backdrop", priceDisplay: "$25", appliesTo: "photo_booth" },
  { id: "fb-curtain", name: "Curtain Backdrop", priceDisplay: "$25-$50", appliesTo: "photo_booth" },
  { id: "fb-flower", name: "Flower Wall Backdrop", priceDisplay: "$50-$100", appliesTo: "photo_booth" },
  { id: "fb-rush", name: "Rush Delivery (24hr)", priceDisplay: "$50", appliesTo: "content_creation" },
  { id: "fb-assistant", name: "On-Site Assistant", priceDisplay: "$10/hr", appliesTo: "all" },
];

async function getData() {
  try {
    const payload = await getPayload();
    const [pkgs, addons] = await Promise.all([
      payload.find({ collection: "packages", where: { isVisible: { equals: true } }, sort: "sortOrder", limit: 20 }),
      payload.find({ collection: "add-ons", where: { isVisible: { equals: true } }, limit: 30 }),
    ]);
    const cmsPkgs = pkgs.docs as unknown as Package[];
    const cmsAddOns = addons.docs as unknown as AddOn[];
    return {
      packages: cmsPkgs.length > 0 ? cmsPkgs : fallbackPackages,
      addOns: cmsAddOns.length > 0 ? cmsAddOns : fallbackAddOns,
    };
  } catch {
    return { packages: fallbackPackages, addOns: fallbackAddOns };
  }
}

export async function PackagesDisplay({ service }: { service: "content" | "booth" }) {
  const { packages, addOns } = await getData();

  const category = service === "content" ? "content_creation" : "photo_booth";
  const currentPkgs = packages.filter(p => p.category === category);
  const currentAddOns = addOns.filter(a => a.appliesTo === category || a.appliesTo === "all");

  return (
    <div>
      <div className={`grid gap-0 ${currentPkgs.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {currentPkgs.map((pkg) => (
          <div
            key={pkg.id}
            className={`p-8 md:p-10 relative ${
              pkg.isFeatured ? "bg-brand-900 text-white border border-brand-900" : "bg-white border border-brand-200"
            }`}
          >
            {pkg.badge && (
              <p className={`absolute top-4 right-4 font-script text-base italic ${pkg.isFeatured ? "text-brand-500" : "text-brand-600"}`}>
                {pkg.badge}
              </p>
            )}
            <h3 className={`text-xl font-semibold mb-1 ${pkg.isFeatured ? "text-white" : "text-brand-900"}`}>{pkg.name}</h3>
            <p className={`text-sm mb-8 italic ${pkg.isFeatured ? "text-brand-400" : "text-brand-600"}`}>{pkg.subtitle}</p>
            <div className="space-y-3 mb-10 min-h-[140px]">
              {pkg.features?.map((f, i) => (
                <p key={i} className={`text-sm border-b pb-3 ${pkg.isFeatured ? "text-brand-400 border-brand-700/30" : "text-brand-600 border-brand-200"}`}>
                  {f.feature}
                </p>
              ))}
            </div>
            <div className={`border-t pt-6 ${pkg.isFeatured ? "border-brand-700/30" : "border-brand-200"}`}>
              <span className={`text-3xl font-light ${pkg.isFeatured ? "text-white" : "text-brand-900"}`}>{pkg.priceDisplay}</span>
              <span className={`text-xs tracking-[0.1em] ml-1 ${pkg.isFeatured ? "text-brand-500" : "text-brand-600"}`}>{pkg.priceUnit}</span>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
}
