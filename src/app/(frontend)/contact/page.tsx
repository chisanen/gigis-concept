import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { renderBlocks } from "@/lib/render-blocks";
import { getPayload } from "@/lib/payload";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Inquire | Gigi's Concept",
  description:
    "Get your quote today. Contact Gigi's Concept for content creation and luxury photo booth services in Dallas, Texas.",
};

function FallbackContent({
  contactEmail,
  instagramUrl,
  facebookUrl,
  tiktokUrl,
}: {
  contactEmail: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
}) {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-brand-600 mb-4">LET&apos;S CONNECT</p>
          <h1 className="font-script text-5xl md:text-7xl text-brand-900">
            Get your quote today!
          </h1>
        </div>
      </section>

      {/* Form */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <InquiryForm />

          <div className="text-center mt-16 pt-16 border-t border-brand-200">
            <p className="text-brand-600 mb-2">
              If you have further questions, please do not hesitate to contact us at
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="text-brand-900 underline underline-offset-4 text-lg"
            >
              {contactEmail}
            </a>

            <div className="flex justify-center gap-6 mt-8">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-brand-600 hover:text-brand-900 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-brand-600 hover:text-brand-900 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-brand-600 hover:text-brand-900 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default async function ContactPage() {
  let blocks: Record<string, unknown>[] | null = null;
  let contactEmail = "hello@gigisconcept.com";
  let instagramUrl = "https://instagram.com";
  let facebookUrl = "https://facebook.com";
  let tiktokUrl = "https://tiktok.com";

  try {
    const payload = await getPayload();

    // Fetch page blocks
    const page = await payload.find({
      collection: "pages",
      where: { slug: { equals: "contact" } },
      limit: 1,
      depth: 2,
    });
    blocks =
      ((page.docs[0] as Record<string, unknown>)?.layout as Record<string, unknown>[]) || null;

    // Fetch SiteSettings global
    try {
      const settings = (await payload.findGlobal({ slug: "site-settings" })) as Record<
        string,
        unknown
      >;
      if (settings?.contactEmail) contactEmail = settings.contactEmail as string;
      if (settings?.instagramUrl) instagramUrl = settings.instagramUrl as string;
      if (settings?.facebookUrl) facebookUrl = settings.facebookUrl as string;
      if (settings?.tiktokUrl) tiktokUrl = settings.tiktokUrl as string;
    } catch {
      // SiteSettings global not available, use defaults
    }
  } catch {
    // CMS not available, fall through to hardcoded fallback
  }

  if (blocks && blocks.length > 0) {
    return <>{renderBlocks(blocks, { contactEmail })}</>;
  }

  return (
    <FallbackContent
      contactEmail={contactEmail}
      instagramUrl={instagramUrl}
      facebookUrl={facebookUrl}
      tiktokUrl={tiktokUrl}
    />
  );
}
