import type { Metadata } from "next";
import Image from "next/image";
import { renderBlocks } from "@/lib/render-blocks";
import { getPayload } from "@/lib/payload";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About | Gigi's Concept",
  description:
    "Gigi's Concept is a boutique content & photo-booth studio based in Dallas, serving clients across Texas and beyond.",
};

function FallbackContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-brand-600 mb-4">THE STUDIO</p>
          <h1 className="font-script text-5xl md:text-7xl text-brand-900">About</h1>
        </div>
      </section>

      {/* Bio */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-1 md:order-none overflow-hidden group">
              <Image
                src="/gigi-portrait.png"
                alt="Gigi, Founder of Gigi's Concept"
                width={800}
                height={533}
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-brand-600 mb-4">THE STUDIO</p>
              <h2 className="font-script text-4xl md:text-5xl text-brand-900 mb-2 leading-tight">
                Quiet luxury,
              </h2>
              <h2 className="font-script text-4xl md:text-5xl text-brand-900 mb-8 leading-tight">
                captured on camera.
              </h2>
              <p className="text-lg text-brand-600 leading-relaxed mb-6">
                Gigi&apos;s Concept is a boutique content &amp; photo-booth studio based in
                Dallas, serving clients across Texas and beyond. We shoot with an editorial
                eye so your brand, your wedding, or your milestone feels exactly like the
                one you&apos;ve been dreaming about.
              </p>
              <p className="text-lg text-brand-600 leading-relaxed mb-6">
                Every shoot is treated like a small cover story, because the best moments
                rarely shout. They whisper.
              </p>
              <p className="text-lg text-brand-600 leading-relaxed mb-6">
                At Gigi&apos;s Concept, we believe that the most memorable moments happen in
                quiet spaces between the poses. With a keen eye for soft luxury, our goal is
                to curate iconic footage for our clients. From the lighting of our photo booth
                to the composition of our behind-the-scenes content, every detail is handled
                with a strategic white-glove approach.
              </p>
              <p className="font-script text-3xl text-brand-900 mt-8">Gigi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-100 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <p className="font-script text-3xl text-brand-900 mb-4">Editorial Eye</p>
              <p className="text-sm text-brand-600 leading-relaxed">
                Every frame is composed with the precision of a magazine cover shoot.
              </p>
            </div>
            <div>
              <p className="font-script text-3xl text-brand-900 mb-4">White Glove</p>
              <p className="text-sm text-brand-600 leading-relaxed">
                From first inquiry to final delivery, every detail is handled with care.
              </p>
            </div>
            <div>
              <p className="font-script text-3xl text-brand-900 mb-4">Timeless</p>
              <p className="text-sm text-brand-600 leading-relaxed">
                We create content that feels as beautiful in ten years as it does today.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default async function AboutPage() {
  let blocks: Record<string, unknown>[] | null = null;

  try {
    const payload = await getPayload();
    const page = await payload.find({
      collection: "pages",
      where: { slug: { equals: "about" } },
      limit: 1,
      depth: 2,
    });
    blocks =
      ((page.docs[0] as Record<string, unknown>)?.layout as Record<string, unknown>[]) || null;
  } catch {
    // CMS not available, fall through to hardcoded fallback
  }

  if (blocks && blocks.length > 0) {
    return <>{renderBlocks(blocks)}</>;
  }

  return <FallbackContent />;
}
