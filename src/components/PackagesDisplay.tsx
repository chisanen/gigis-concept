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

async function getData() {
  try {
    const payload = await getPayload();
    const [pkgs, addons] = await Promise.all([
      payload.find({ collection: "packages", where: { isVisible: { equals: true } }, sort: "sortOrder", limit: 20 }),
      payload.find({ collection: "add-ons", where: { isVisible: { equals: true } }, limit: 30 }),
    ]);
    return { packages: pkgs.docs as unknown as Package[], addOns: addons.docs as unknown as AddOn[] };
  } catch {
    return { packages: [], addOns: [] };
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
