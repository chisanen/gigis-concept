import type { Metadata } from "next";
import { getPayload } from "@/lib/payload";
import { GalleryGrid } from "@/components/GalleryGrid";
import { CollectionPasswordForm } from "@/components/CollectionPasswordForm";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ collectionName: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { collectionName } = await params;
  const decoded = decodeURIComponent(collectionName);
  return {
    title: `${decoded} | Gallery | Gigi's Concept`,
    description: `View the ${decoded} gallery from Gigi's Concept.`,
  };
}

export default async function CollectionGalleryPage({ params }: PageProps) {
  const { collectionName } = await params;
  const decoded = decodeURIComponent(collectionName);

  const payload = await getPayload();
  const results = await payload.find({
    collection: "gallery-images",
    where: { collectionName: { equals: decoded } },
    sort: "sortOrder",
    limit: 200,
    depth: 2,
  });

  if (results.docs.length === 0) {
    return (
      <section className="py-24 md:py-32 bg-brand-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-script text-5xl md:text-7xl text-brand-900 mb-6">Gallery not found</h1>
          <p className="text-[14px] text-brand-600 leading-[1.8]">
            This gallery does not exist or has been removed.
          </p>
        </div>
      </section>
    );
  }

  const firstDoc = results.docs[0] as Record<string, unknown>;
  const category = firstDoc.category as string;

  if (category === "private") {
    return (
      <section className="py-24 md:py-32 bg-brand-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-script text-5xl md:text-7xl text-brand-900 mb-6">Gallery not found</h1>
          <p className="text-[14px] text-brand-600 leading-[1.8]">
            This gallery does not exist or has been removed.
          </p>
        </div>
      </section>
    );
  }

  if (category === "password") {
    return (
      <>
        <section className="bg-brand-200 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">Client Gallery</p>
            <h1 className="font-script text-5xl md:text-7xl text-brand-900">{decoded}</h1>
          </div>
        </section>
        <section className="py-24 md:py-32 bg-brand-100">
          <div className="max-w-2xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[14px] text-brand-600 leading-[1.8]">
                Enter the password provided to you to access your photos.
              </p>
            </div>
            <CollectionPasswordForm collectionName={decoded} />
          </div>
        </section>
      </>
    );
  }

  // Public gallery
  const photos = results.docs
    .map((doc: Record<string, unknown>) => {
      const media = doc.image as Record<string, unknown> | null;
      const url = media?.url as string || "";
      const kind = media?.kind as string || "image";
      if (!url) return null;
      return { src: url, alt: (doc.title as string) || "", kind };
    })
    .filter(Boolean) as { src: string; alt: string; kind?: string }[];

  return (
    <>
      <section className="bg-brand-200 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">Gallery</p>
          <h1 className="font-script text-5xl md:text-7xl text-brand-900">{decoded}</h1>
        </div>
      </section>
      <section className="py-24 md:py-32 bg-brand-50">
        <div className="max-w-6xl mx-auto px-6">
          <GalleryGrid photos={photos} />
        </div>
      </section>
    </>
  );
}
