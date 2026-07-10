import Link from "next/link";
import Image from "next/image";
import { InquiryForm } from "@/components/InquiryForm";
import { PackagesDisplay } from "@/components/PackagesDisplay";
import { PackagesSection } from "@/components/PackagesSection";
import { Gallery } from "@/components/Gallery";
import { HeroCarousel } from "@/components/HeroCarousel";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { getPayload } from "@/lib/payload";
import { getPricingData } from "@/lib/pricing";

export const dynamic = "force-dynamic";

function getMediaUrl(media: unknown): string | null {
  if (!media || typeof media !== "object") return null;
  const m = media as Record<string, unknown>;
  const url = m.url as string;
  if (!url) return null;
  if (url.startsWith("/api/media/file/")) return `/${url.replace("/api/media/file/", "")}`;
  return url;
}

async function getSiteData() {
  try {
    const payload = await getPayload();
    const [settings, homePage, testimonials] = await Promise.all([
      payload.findGlobal({ slug: "site-settings" }),
      payload.find({ collection: "pages", where: { slug: { equals: "home" } }, limit: 1, depth: 2 }),
      payload.find({ collection: "testimonials", where: { featured: { equals: true }, status: { equals: "approved" } }, limit: 10, sort: "sortOrder" }),
    ]);
    const cmsTestimonials = (testimonials.docs as Record<string, unknown>[])
      .map(t => ({ quote: t.quote as string, author: t.authorName as string, event: t.eventDescription as string }))
      .filter(t => t.quote);
    return {
      settings,
      blocks: (homePage.docs[0] as Record<string, unknown>)?.layout as Record<string, unknown>[] || null,
      testimonials: cmsTestimonials.length > 0 ? cmsTestimonials : undefined,
    };
  } catch {
    return { settings: null, blocks: null, testimonials: undefined };
  }
}

function formatCents(cents: number): string {
  const dollars = cents / 100;
  return dollars % 1 === 0 ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

function getBlock(blocks: Record<string, unknown>[] | null, type: string): Record<string, unknown> | null {
  if (!blocks) return null;
  return blocks.find((b) => b.blockType === type) || null;
}

export default async function Home() {
  const [{ settings, blocks, testimonials }, pricing] = await Promise.all([
    getSiteData(),
    getPricingData(),
  ]);

  // Dynamic pricing values for FAQ and schema
  const { packages, addOns, depositPercent, travelPerMileCents, travelFreeRadiusMiles } = pricing;
  const rushAddon = addOns.find(a => a.name.toLowerCase().includes("rush"));
  const rushPrice = rushAddon ? formatCents(rushAddon.priceCents) : "$50";
  const travelPerMile = `$${(travelPerMileCents / 100).toFixed(2)}`;
  const backdropAddOns = addOns.filter(a => a.name.toLowerCase().includes("backdrop"));
  const backdropText = backdropAddOns.length > 0
    ? backdropAddOns.map(a => `${a.name} (${a.priceDisplay}${a.note ? `, ${a.note}` : ""})`).join(", ")
    : "Classic Spandex ($25), Curtain ($25, up to $50), and Flower Wall ($50, up to $100)";

  // Price range for schema
  const allPriceDollars = packages.map(p => p.priceCents / 100).filter(p => p > 0);
  const minPrice = allPriceDollars.length > 0 ? Math.min(...allPriceDollars) : 290;
  const maxPrice = allPriceDollars.length > 0 ? Math.max(...allPriceDollars) : 800;

  const hero = getBlock(blocks, "hero");
  const about = getBlock(blocks, "aboutSplit");
  const twoWays = getBlock(blocks, "twoWays");
  const pkgs = getBlock(blocks, "packagesToggle");
  const ctaBlock = getBlock(blocks, "cta");
  const galleryBlock = getBlock(blocks, "gallerySection");
  const contactBlock = getBlock(blocks, "contactSection");

  // Image URLs from CMS or fallback to static files
  const aboutImage = (about && getMediaUrl(about.image)) || "/gigi-portrait.png";
  const card1Image = (twoWays && getMediaUrl(twoWays.card1Image)) || "/content-creation-bts.png";
  const card2Image = (twoWays && getMediaUrl(twoWays.card2Image)) || "/photo-booth.png";

  return (
    <>
      {/* ═══ 1 · CAPTURING MOMENTS ═══ */}
      <section className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <HeroCarousel />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50 z-10" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center text-white py-12 sm:py-20">
          <p className="text-[10px] md:text-[11px] tracking-[0.5em] text-white/60 mb-10 uppercase">
            {(hero?.subtitle as string) || "Content Creation · Luxury Photo Booth"}
          </p>
          <h1 className="font-script text-5xl sm:text-6xl md:text-[6.5rem] leading-[0.85] mb-4 sm:mb-5">
            {(hero?.heading as string) || "Capturing"}
          </h1>
          <p className="text-xl sm:text-2xl md:text-4xl tracking-[0.2em] sm:tracking-[0.3em] font-extralight uppercase mb-8 sm:mb-12 text-white/90">
            {(hero?.subheading as string) || "Moments"}
          </p>
          <p className="text-[13px] md:text-[15px] text-white/70 max-w-sm mx-auto mb-8 sm:mb-16 leading-[1.9]">
            {(hero?.tagline as string) || "Editorial content and a timeless photo-booth experience, quietly crafted, beautifully delivered."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto">
            <Link href={(hero?.ctaPrimaryHref as string) || "/services"} className="w-full sm:w-auto text-center bg-white text-brand-900 px-8 sm:px-10 py-3.5 sm:py-4 text-[10px] tracking-[0.25em] sm:tracking-[0.3em] hover:bg-brand-200 transition-colors">
              {(hero?.ctaPrimaryLabel as string) || "EXPLORE SERVICES"}
            </Link>
            <Link href={(hero?.ctaSecondaryHref as string) || "/contact"} className="w-full sm:w-auto text-center border border-white/40 text-white px-8 sm:px-10 py-3.5 sm:py-4 text-[10px] tracking-[0.25em] sm:tracking-[0.3em] hover:bg-white hover:text-brand-900 transition-all">
              {(hero?.ctaSecondaryLabel as string) || "INQUIRE"}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 2 · ABOUT GIGI ═══ */}
      <section className="py-16 sm:py-28 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="relative w-full overflow-hidden group">
              <Image src={aboutImage} alt="Gigi, Founder" width={800} height={533} className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700" priority />
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-7 uppercase">
                {(about?.eyebrow as string) || "The Studio"}
              </p>
              <h2 className="font-script text-[2rem] sm:text-[2.4rem] md:text-[3rem] text-brand-900 leading-[1.15] mb-2">
                {(about?.heading1 as string) || "Quiet luxury,"}
              </h2>
              <h2 className="font-script text-[2rem] sm:text-[2.4rem] md:text-[3rem] text-brand-900 leading-[1.15] mb-6 sm:mb-10">
                {(about?.heading2 as string) || "captured on camera."}
              </h2>
              <p className="text-[14px] text-brand-600 leading-[2] mb-5">
                {(about?.paragraph1 as string) || "Gigi's Concept is a boutique content & photo-booth studio based in Dallas, serving clients across Texas and beyond."}
              </p>
              <p className="text-[14px] text-brand-600 leading-[2] mb-12">
                {(about?.paragraph2 as string) || "Every shoot is treated like a small cover story, because the best moments rarely shout. They whisper."}
              </p>
              <p className="font-script text-3xl text-brand-700">{(about?.signature as string) || "Gigi"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3 · TWO WAYS TO WORK TOGETHER ═══ */}
      <section className="py-16 sm:py-28 md:py-36 bg-brand-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-20">
            <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">
              {(twoWays?.eyebrow as string) || "What We Offer"}
            </p>
            <h2 className="text-xl md:text-2xl tracking-[0.25em] font-light text-brand-900 uppercase mb-3">
              {(twoWays?.heading as string) || "Two Ways To"}
            </h2>
            <p className="font-script text-5xl md:text-6xl text-brand-900">
              {(twoWays?.subheading as string) || "work together"}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="group text-center">
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <Image src={card1Image} alt="Content creation" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <h3 className="font-script text-3xl text-brand-900 mb-4">{(twoWays?.card1Title as string) || "Content Creation"}</h3>
              <p className="text-[13px] text-brand-600 leading-[1.9] mb-8 max-w-xs mx-auto">
                {(twoWays?.card1Description as string) || "Editorial content days for founders, brands, and tastemakers."}
              </p>
              <Link href={(twoWays?.card1Link as string) || "/services"} className="inline-block border border-brand-900 px-8 py-3 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all">LEARN MORE</Link>
            </div>
            <div className="group text-center">
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <Image src={card2Image} alt="Photo booth" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <h3 className="font-script text-3xl text-brand-900 mb-4">{(twoWays?.card2Title as string) || "Photo Booth"}</h3>
              <p className="text-[13px] text-brand-600 leading-[1.9] mb-8 max-w-xs mx-auto">
                {(twoWays?.card2Description as string) || "A slow, cinematic take on the classic photo booth."}
              </p>
              <Link href={(twoWays?.card2Link as string) || "/services"} className="inline-block border border-brand-900 px-8 py-3 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all">LEARN MORE</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4 · PACKAGES (server-rendered) ═══ */}
      <section className="py-16 sm:py-28 md:py-36 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">{(pkgs?.eyebrow as string) || "Investment"}</p>
            <h2 className="font-script text-5xl md:text-6xl text-brand-900">{(pkgs?.heading as string) || "Packages"}</h2>
          </div>
          <PackagesSection
            boothHtml={<PackagesDisplay service="booth" />}
            contentHtml={<PackagesDisplay service="content" />}
            depositPercent={depositPercent}
          />
        </div>
      </section>

      {/* ═══ 5 · TESTIMONIALS CAROUSEL ═══ */}
      <section className="py-16 sm:py-28 md:py-36 bg-brand-100">
        <TestimonialCarousel testimonials={testimonials} />
      </section>

      {/* ═══ FOMO STRIP ═══ */}
      <section className="py-6 bg-brand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[11px] tracking-[0.2em] text-brand-700">
            Limited Saturdays available each season &middot; Now booking 2026 &amp; 2027 events &middot; Secure your date today
          </p>
        </div>
      </section>

      {/* ═══ 6 · GET A QUOTE ═══ */}
      <section className="py-16 sm:py-32 md:py-40 bg-brand-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center text-white">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">{(ctaBlock?.eyebrow as string) || "Let's Create"}</p>
          <h2 className="font-script text-5xl md:text-7xl mb-5">{(ctaBlock?.heading as string) || "Tell us"}</h2>
          <p className="text-lg md:text-xl tracking-[0.25em] font-extralight uppercase mb-14 text-white/70">{(ctaBlock?.subheading as string) || "About Your Moment"}</p>
          <Link href={(ctaBlock?.buttonHref as string) || "/contact"} className="inline-block border border-white/40 text-white px-14 py-4 text-[10px] tracking-[0.35em] hover:bg-white hover:text-brand-900 transition-all">
            {(ctaBlock?.buttonLabel as string) || "GET YOUR QUOTE"}
          </Link>
          <p className="text-[11px] text-white/40 mt-6">+1 (832) 873-7776 &middot; hello@gigisconcept.com</p>
        </div>
      </section>

      {/* ═══ 7 · GALLERY ═══ */}
      <section className="py-16 sm:py-28 md:py-36 bg-brand-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">{(galleryBlock?.eyebrow as string) || "Our Work"}</p>
            <h2 className="font-script text-5xl md:text-6xl text-brand-900">{(galleryBlock?.heading as string) || "Gallery"}</h2>
          </div>
          <Gallery />
          <div className="text-center mt-12">
            <Link href="/gallery" className="inline-block border border-brand-900 px-10 py-3.5 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all">VIEW FULL GALLERY</Link>
          </div>
        </div>
      </section>

      {/* ═══ 8 · CONTACT US ═══ */}
      <section id="contact" className="py-16 sm:py-28 md:py-36 bg-brand-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">{(contactBlock?.eyebrow as string) || "Get In Touch"}</p>
            <h2 className="font-script text-5xl md:text-6xl text-brand-900 mb-5">{(contactBlock?.heading as string) || "Contact Us"}</h2>
            <p className="text-[14px] text-brand-600 max-w-md mx-auto leading-[1.8]">
              {(contactBlock?.description as string) || "Ready to book? Have questions? Fill out the form below and we'll get back to you within 24 hours."}
            </p>
          </div>
          <InquiryForm />
          <div className="text-center mt-16 pt-12 border-t border-brand-400/30">
            <p className="text-[13px] text-brand-600 mb-3">Or reach us directly at</p>
            <a href={`mailto:${(settings as Record<string, unknown>)?.contactEmail || "hello@gigisconcept.com"}`} className="text-brand-900 underline underline-offset-4 text-lg">
              {(settings as Record<string, unknown>)?.contactEmail as string || "hello@gigisconcept.com"}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ HOW TO BOOK ═══ */}
      <section className="py-14 sm:py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-script text-5xl md:text-6xl text-brand-900 mb-4">How to book</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-3xl font-light text-brand-900 mb-4">Step 1</p>
              <p className="text-[13px] text-brand-600 leading-[1.9]">
                Shoot us your inquiry with your chosen package and any fun add ons!
                Dates get locked in after a non-refundable {depositPercent}% deposit is paid and the contract is signed.
              </p>
            </div>
            <div>
              <p className="text-3xl font-light text-brand-900 mb-4">Step 2</p>
              <p className="text-[13px] text-brand-600 leading-[1.9]">
                As your event date gets closer, we&apos;ll send you a questionnaire about a
                month before your event to nail down the little details!
              </p>
            </div>
            <div>
              <p className="text-3xl font-light text-brand-900 mb-4">Step 3</p>
              <p className="text-[13px] text-brand-600 leading-[1.9]">
                Let us handle the stress (and the fun!) We&apos;ll ensure that everyone has an
                incredible time at your event!
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="inline-block bg-brand-500 text-white px-8 py-3 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors">
              INQUIRE NOW
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-14 sm:py-24 md:py-32 bg-brand-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-5 uppercase">Common Questions</p>
            <h2 className="font-script text-5xl md:text-6xl text-brand-900">FAQ</h2>
          </div>
          <div className="space-y-6">
            {[
              { q: "How do I book?", a: `Fill out the inquiry form or DM us on Instagram. We'll send you a custom quote within 24 hours. Once you accept, sign the contract and pay the ${depositPercent}% deposit to lock in your date.` },
              { q: "What's the deposit policy?", a: `A ${depositPercent}% non-refundable retainer is required to secure your date. The remaining ${100 - depositPercent}% is due at the start of your session.` },
              { q: "How fast do I get my content?", a: `Raw footage is delivered within 24 hours. Edited videos take 3–5 business days. Rush delivery (24 hours) is available for ${rushPrice}.` },
              { q: "Do you travel outside Dallas?", a: `Yes! We serve all of Texas and beyond. Events within ${travelFreeRadiusMiles} miles of Dallas (75219) have no travel fee. Beyond that, a ${travelPerMile}/mile travel fee applies.` },
              { q: "What's included with the photo booth?", a: "Every booking includes a custom backdrop, on-site attendant, unlimited instant prints, props & accessories, and a digital gallery delivered within 24 hours." },
              { q: "Can I customize my photo booth backdrop?", a: `Absolutely! We offer ${backdropText}. We can also work with your event designer for custom setups.` },
              { q: "Do you offer content for social media?", a: "Yes! That's our specialty. Our content creation packages deliver short-form and long-form video perfect for Instagram, TikTok, and YouTube." },
            ].map((faq, i) => (
              <details key={i} className="group bg-white border border-brand-200 rounded-lg">
                <summary className="cursor-pointer px-6 py-5 text-[15px] text-brand-900 font-medium flex justify-between items-center">
                  {faq.q}
                  <span className="text-brand-500 group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <div className="px-6 pb-5 text-[13px] text-brand-600 leading-[1.9]">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ JSON-LD SCHEMA ═══ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Gigi's Concept",
            description: "Luxury content creation and photo booth services in Dallas, Texas",
            url: "https://gigis-concept.vercel.app",
            telephone: "+1-832-873-7776",
            email: "hello@gigisconcept.com",
            address: { "@type": "PostalAddress", addressLocality: "Dallas", addressRegion: "TX", postalCode: "75219", addressCountry: "US" },
            geo: { "@type": "GeoCoordinates", latitude: 32.7767, longitude: -96.7970 },
            areaServed: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: 32.7767, longitude: -96.7970 }, geoRadius: "40000" },
            priceRange: `$${minPrice}–$${maxPrice}`,
            image: "https://gigis-concept.vercel.app/og-image.png",
            sameAs: ["https://instagram.com/gigisconcept"],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Services",
              itemListElement: packages.map(p => ({
                "@type": "Offer",
                name: `${p.category === "content_creation" ? "Content Creation" : "Photo Booth"} | ${p.name}`,
                price: String(p.priceCents / 100),
                priceCurrency: "USD",
              })),
            },
          }),
        }}
      />
    </>
  );
}
