import type { Metadata } from "next";
import { GalleryTabs } from "@/components/GalleryTabs";
import { PrivateGallery } from "@/components/PrivateGallery";
import { getPayload } from "@/lib/payload";
import { getMediaUrl } from "@/lib/render-blocks";

export const metadata: Metadata = {
  title: "Gallery | Gigi's Concept",
  description:
    "Browse our portfolio of weddings, events, and brand shoots. Clients can access their private gallery with a password.",
};

export const dynamic = "force-dynamic";

async function getSettings() {
  try {
    const payload = await getPayload();
    return await payload.findGlobal({ slug: "site-settings" });
  } catch {
    return null;
  }
}

async function getGalleryImages() {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "gallery-images",
      where: {
        and: [
          { category: { equals: "public" } },
          { hidden: { not_equals: true } },
        ],
      },
      sort: "sortOrder",
      limit: 200,
      depth: 2,
    });
    return result.docs.length > 0 ? result.docs : null;
  } catch {
    return null;
  }
}

async function getGalleryPage() {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "pages",
      where: { slug: { equals: "gallery" } },
      limit: 1,
      depth: 1,
    });
    if (result.docs.length > 0) {
      const page = result.docs[0] as Record<string, unknown>;
      const blocks = page.layout as Record<string, unknown>[] | undefined;
      return blocks || null;
    }
    return null;
  } catch {
    return null;
  }
}

function findBlock(blocks: Record<string, unknown>[] | null, blockType: string) {
  if (!blocks) return null;
  return blocks.find((b) => b.blockType === blockType) || null;
}

interface GalleryPhoto {
  src: string;
  alt: string;
  kind?: string;
}

interface GalleryCollection {
  name: string;
  photos: GalleryPhoto[];
}

function buildCollections(docs: Record<string, unknown>[]): GalleryCollection[] {
  const collectionMap = new Map<string, GalleryPhoto[]>();

  for (const doc of docs) {
    const url = getMediaUrl(doc.image);
    if (!url) continue;

    const media = doc.image as Record<string, unknown> | null;
    const kind = (media?.kind as string) || "image";
    const photo: GalleryPhoto = { src: url, alt: (doc.title as string) || "", kind };
    const name = (doc.collectionName as string) || "Uncategorized";

    const existing = collectionMap.get(name);
    if (existing) {
      existing.push(photo);
    } else {
      collectionMap.set(name, [photo]);
    }
  }

  const collections: GalleryCollection[] = [];
  for (const [name, photos] of collectionMap) {
    collections.push({ name, photos });
  }
  return collections;
}

export default async function GalleryPage() {
  const [settings, cmsDocs, pageBlocks] = await Promise.all([
    getSettings(),
    getGalleryImages(),
    getGalleryPage(),
  ]);

  const showGalleryPage = (settings as Record<string, unknown>)?.showGalleryPage as boolean ?? true;

  // Build collections from CMS-uploaded images only
  const collections: GalleryCollection[] = cmsDocs
    ? buildCollections(cmsDocs as Record<string, unknown>[])
    : [];

  // Extract headings from CMS blocks if available
  const heroBlock = findBlock(pageBlocks, "hero");
  const heroEyebrow = (heroBlock?.subtitle as string) || (heroBlock?.eyebrow as string) || "Our Work";
  const heroHeading = (heroBlock?.heading as string) || "Gallery";

  const galleryBlock = findBlock(pageBlocks, "gallerySection");
  const galleryEyebrow = (galleryBlock?.eyebrow as string) || "Portfolio";
  const galleryHeading = (galleryBlock?.heading as string) || "Public Gallery";

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-200 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">
            {heroEyebrow}
          </p>
          <h1 className="font-script text-5xl md:text-7xl text-brand-900">{heroHeading}</h1>
        </div>
      </section>

      {/* Public Gallery */}
      {showGalleryPage && collections.length > 0 && (
      <section className="py-24 md:py-32 bg-brand-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">{galleryEyebrow}</p>
            <h2 className="font-script text-4xl md:text-5xl text-brand-900">{galleryHeading}</h2>
          </div>
          <GalleryTabs collections={collections} />
        </div>
      </section>
      )}

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
