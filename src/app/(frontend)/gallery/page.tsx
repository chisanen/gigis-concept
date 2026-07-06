import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PrivateGallery } from "@/components/PrivateGallery";
import { InstagramFeed } from "@/components/InstagramFeed";
import { getPayload } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Gallery | Gigi's Concept",
  description:
    "Browse our portfolio of weddings, events, and brand shoots. Clients can access their private gallery with a password.",
};

export const dynamic = "force-dynamic";

const fallbackPhotos = [
  { src: "https://images.unsplash.com/photo-1745231991466-19d41014cc66?w=600&q=80", alt: "Couple embracing" },
  { src: "https://images.unsplash.com/photo-1515531980326-6244280b99c8?w=600&q=80", alt: "Elegant couple" },
  { src: "https://images.unsplash.com/photo-1515015337340-dbabb1fa63ae?w=600&q=80", alt: "Wedding couple" },
  { src: "https://images.unsplash.com/photo-1560461723-0fa849b3e03a?w=600&q=80", alt: "Bridal party" },
  { src: "https://images.unsplash.com/photo-1516668557604-c8e814fdb184?w=600&q=80", alt: "Birthday celebration" },
  { src: "https://images.unsplash.com/photo-1592599457454-e6ace3370314?w=600&q=80", alt: "Wedding celebration" },
  { src: "https://images.unsplash.com/photo-1585890483032-1465321a75a5?w=600&q=80", alt: "Bridal party formal" },
  { src: "https://images.unsplash.com/photo-1515015443787-2e0fb93d9783?w=600&q=80", alt: "Wedding portrait" },
  { src: "https://images.unsplash.com/photo-1700142534189-cc18e2d42917?w=600&q=80", alt: "Bride with bouquet" },
  { src: "https://images.unsplash.com/photo-1632850741446-50260d19a158?w=600&q=80", alt: "Portrait session" },
  { src: "https://images.unsplash.com/photo-1719499719196-7a256956a22b?w=600&q=80", alt: "Bride and groom" },
  { src: "https://images.unsplash.com/photo-1563525614522-b76b89d81024?w=600&q=80", alt: "Birthday party" },
];

async function getSettings() {
  try {
    const payload = await getPayload();
    return await payload.findGlobal({ slug: "site-settings" });
  } catch {
    return null;
  }
}

export default async function GalleryPage() {
  const settings = await getSettings();
  const instagramHandle = (settings as Record<string, unknown>)?.instagramHandle as string || "";
  const showInstagramFeed = (settings as Record<string, unknown>)?.showInstagramFeed as boolean ?? true;

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-200 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">
            Our Work
          </p>
          <h1 className="font-script text-5xl md:text-7xl text-brand-900">Gallery</h1>
        </div>
      </section>

      {/* Instagram Feed */}
      {showInstagramFeed && instagramHandle && (
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">Follow Us</p>
              <h2 className="font-script text-4xl md:text-5xl text-brand-900">Instagram</h2>
            </div>
            <InstagramFeed handle={instagramHandle} />
          </div>
        </section>
      )}

      {/* Public Gallery */}
      <section className="py-24 md:py-32 bg-brand-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">Portfolio</p>
            <h2 className="font-script text-4xl md:text-5xl text-brand-900">Public Gallery</h2>
          </div>
          <GalleryGrid photos={fallbackPhotos} />
        </div>
      </section>

      {/* Private Gallery */}
      <section className="py-24 md:py-32 bg-brand-100">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">Client Access</p>
            <h2 className="font-script text-4xl md:text-5xl text-brand-900 mb-4">Private Gallery</h2>
            <p className="text-[14px] text-brand-600 leading-[1.8]">
              Enter the password provided to you after your event to access your photos.
            </p>
          </div>
          <PrivateGallery />
        </div>
      </section>
    </>
  );
}
