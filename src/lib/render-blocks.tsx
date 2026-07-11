import Link from "next/link";
import Image from "next/image";
import { HeroCarousel } from "@/components/HeroCarousel";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { InquiryForm } from "@/components/InquiryForm";
import { Gallery } from "@/components/Gallery";
import { PackagesDisplay } from "@/components/PackagesDisplay";
import { PackagesSection } from "@/components/PackagesSection";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = Record<string, any>;

export function getMediaUrl(media: unknown): string | null {
  if (!media || typeof media !== "object") return null;
  const m = media as Record<string, unknown>;
  const url = m.url as string;
  if (!url) return null;
  if (url.startsWith("/api/media/file/")) return `/${url.replace("/api/media/file/", "")}`;
  return url;
}

export function getMediaAlt(media: unknown): string {
  if (!media || typeof media !== "object") return "";
  return (media as Record<string, unknown>).alt as string || "";
}

// ── Block: Hero ──────────────────────────────────────────────
function mediaToSlide(media: unknown): { src: string; alt: string; type: "image" | "video" } | null {
  const url = getMediaUrl(media);
  if (!url) return null;
  const m = media as Record<string, unknown> | null;
  const kind = m?.kind as string;
  const mimeType = (m?.mimeType as string) || "";
  const isVideo = kind === "video" || mimeType.startsWith("video/");
  return { src: url, alt: getMediaAlt(media), type: isVideo ? "video" : "image" };
}

function HeroBlock({ b }: { b: Block }) {
  // Build slides from individual upload fields
  const slideFields = [b.backgroundImage, b.slide2, b.slide3, b.slide4, b.slide5];
  const carouselSlides = slideFields.map(mediaToSlide).filter(Boolean) as { src: string; alt: string; type: "image" | "video" }[];

  return (
    <section className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <HeroCarousel slides={carouselSlides.length > 0 ? carouselSlides : undefined} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50 z-10" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center text-white py-12 sm:py-20">
        <p className="text-[10px] md:text-[11px] tracking-[0.5em] text-white/60 mb-10 uppercase">
          {b.subtitle || "Content Creation · Luxury Photo Booth"}
        </p>
        <h1 className="font-script text-5xl sm:text-6xl md:text-[6.5rem] leading-[0.85] mb-4 sm:mb-5">
          {b.heading || "Capturing"}
        </h1>
        <p className="text-xl sm:text-2xl md:text-4xl tracking-[0.2em] sm:tracking-[0.3em] font-extralight uppercase mb-8 sm:mb-12 text-white/90">
          {b.subheading || "Moments"}
        </p>
        <p className="text-[13px] md:text-[15px] text-white/70 max-w-sm mx-auto mb-8 sm:mb-16 leading-[1.9]">
          {b.tagline || "Editorial content and a timeless photo-booth experience, quietly crafted, beautifully delivered."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto">
          <Link href={b.ctaPrimaryHref || "/services"} className="w-full sm:w-auto text-center bg-white text-brand-900 px-8 sm:px-10 py-3.5 sm:py-4 text-[10px] tracking-[0.25em] sm:tracking-[0.3em] hover:bg-brand-200 transition-colors">
            {b.ctaPrimaryLabel || "EXPLORE SERVICES"}
          </Link>
          <Link href={b.ctaSecondaryHref || "/contact"} className="w-full sm:w-auto text-center border border-white/40 text-white px-8 sm:px-10 py-3.5 sm:py-4 text-[10px] tracking-[0.25em] sm:tracking-[0.3em] hover:bg-white hover:text-brand-900 transition-all">
            {b.ctaSecondaryLabel || "INQUIRE"}
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Block: About Split ───────────────────────────────────────
function AboutSplitBlock({ b }: { b: Block }) {
  const imgUrl = getMediaUrl(b.image) || "/gigi-portrait.png";
  return (
    <section className="py-16 sm:py-28 md:py-40 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="relative w-full overflow-hidden group">
            <Image src={imgUrl} alt={getMediaAlt(b.image) || "Gigi, Founder"} width={800} height={533} className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700" priority />
          </div>
          <div className="text-center md:text-left">
            <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-7 uppercase">{b.eyebrow || "The Studio"}</p>
            <h2 className="font-script text-[2rem] sm:text-[2.4rem] md:text-[3rem] text-brand-900 leading-[1.15] mb-2">{b.heading1 || "Quiet luxury,"}</h2>
            <h2 className="font-script text-[2rem] sm:text-[2.4rem] md:text-[3rem] text-brand-900 leading-[1.15] mb-6 sm:mb-10">{b.heading2 || "captured on camera."}</h2>
            <p className="text-[14px] text-brand-600 leading-[2] mb-5">{b.paragraph1 || "Gigi's Concept is a boutique content & photo-booth studio based in Dallas, serving clients across Texas and beyond."}</p>
            <p className="text-[14px] text-brand-600 leading-[2] mb-12">{b.paragraph2 || "Every shoot is treated like a small cover story, because the best moments rarely shout. They whisper."}</p>
            <p className="font-script text-3xl text-brand-700">{b.signature || "Gigi"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Block: Two Ways ──────────────────────────────────────────
function TwoWaysBlock({ b }: { b: Block }) {
  const card1Image = getMediaUrl(b.card1Image) || "/content-creation-bts.png";
  const card2Image = getMediaUrl(b.card2Image) || "/photo-booth.png";
  return (
    <section className="py-16 sm:py-28 md:py-36 bg-brand-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-20">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">{b.eyebrow || "What We Offer"}</p>
          <h2 className="text-xl md:text-2xl tracking-[0.25em] font-light text-brand-900 uppercase mb-3">{b.heading || "Two Ways To"}</h2>
          <p className="font-script text-5xl md:text-6xl text-brand-900">{b.subheading || "work together"}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            { img: card1Image, title: b.card1Title || "Content Creation", desc: b.card1Description || "Editorial content days for founders, brands, and tastemakers.", link: b.card1Link || "/services" },
            { img: card2Image, title: b.card2Title || "Photo Booth", desc: b.card2Description || "A slow, cinematic take on the classic photo booth.", link: b.card2Link || "/services" },
          ].map((card, i) => (
            <div key={i} className="group text-center">
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <Image src={card.img} alt={card.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <h3 className="font-script text-3xl text-brand-900 mb-4">{card.title}</h3>
              <p className="text-[13px] text-brand-600 leading-[1.9] mb-8 max-w-xs mx-auto">{card.desc}</p>
              <Link href={card.link} className="inline-block border border-brand-900 px-8 py-3 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all">LEARN MORE</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Block: Packages Toggle ───────────────────────────────────
function PackagesToggleBlock({ b, depositPercent }: { b: Block; depositPercent?: number }) {
  return (
    <section className="py-16 sm:py-28 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">{b.eyebrow || "Investment"}</p>
          <h2 className="font-script text-5xl md:text-6xl text-brand-900">{b.heading || "Packages"}</h2>
        </div>
        <PackagesSection
          boothHtml={<PackagesDisplay service="booth" />}
          contentHtml={<PackagesDisplay service="content" />}
          depositPercent={depositPercent}
        />
      </div>
    </section>
  );
}

// ── Block: CTA ───────────────────────────────────────────────
function CTABlock({ b, contactInfo }: { b: Block; contactInfo?: string }) {
  const isDark = b.style !== "light";
  return (
    <section className={`py-16 sm:py-32 md:py-40 ${isDark ? "bg-brand-900" : "bg-brand-100"}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p className={`text-[10px] tracking-[0.5em] mb-6 uppercase ${isDark ? "text-brand-500" : "text-brand-500"}`}>{b.eyebrow || "Let's Create"}</p>
        <h2 className={`font-script text-5xl md:text-7xl mb-5 ${isDark ? "text-white" : "text-brand-900"}`}>{b.heading || "Tell us"}</h2>
        <p className={`text-lg md:text-xl tracking-[0.25em] font-extralight uppercase mb-14 ${isDark ? "text-white/70" : "text-brand-600"}`}>{b.subheading || "About Your Moment"}</p>
        <Link href={b.buttonHref || "/contact"} className={`inline-block border px-14 py-4 text-[10px] tracking-[0.35em] transition-all ${isDark ? "border-white/40 text-white hover:bg-white hover:text-brand-900" : "border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white"}`}>
          {b.buttonLabel || "GET YOUR QUOTE"}
        </Link>
        {contactInfo && <p className={`text-[11px] mt-6 ${isDark ? "text-white/40" : "text-brand-500"}`}>{contactInfo}</p>}
      </div>
    </section>
  );
}

// ── Block: Gallery Section ───────────────────────────────────
function GallerySectionBlock({ b }: { b: Block }) {
  // Build gallery from individual photo upload fields
  const photoFields = [b.photo1, b.photo2, b.photo3, b.photo4, b.photo5, b.photo6, b.photo7, b.photo8];
  const cmsPhotos = photoFields
    .map(p => { const url = getMediaUrl(p); return url ? { src: url, alt: getMediaAlt(p) } : null; })
    .filter(Boolean) as { src: string; alt: string }[];

  return (
    <section className="py-16 sm:py-28 md:py-36 bg-brand-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">{b.eyebrow || "Our Work"}</p>
          <h2 className="font-script text-5xl md:text-6xl text-brand-900">{b.heading || "Gallery"}</h2>
        </div>
        <Gallery items={cmsPhotos.length > 0 ? cmsPhotos : undefined} />
        {b.showFullGalleryLink !== false && (
          <div className="text-center mt-12">
            <Link href="/gallery" className="inline-block border border-brand-900 px-10 py-3.5 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all">VIEW FULL GALLERY</Link>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Block: Contact Section ───────────────────────────────────
function ContactSectionBlock({ b, contactEmail }: { b: Block; contactEmail?: string }) {
  const email = contactEmail || "hello@gigisconcept.com";
  return (
    <section id="contact" className="py-16 sm:py-28 md:py-36 bg-brand-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">{b.eyebrow || "Get In Touch"}</p>
          <h2 className="font-script text-5xl md:text-6xl text-brand-900 mb-5">{b.heading || "Contact Us"}</h2>
          <p className="text-[14px] text-brand-600 max-w-md mx-auto leading-[1.8]">{b.description || "Ready to book? Have questions? Fill out the form below and we'll get back to you within 24 hours."}</p>
        </div>
        <InquiryForm />
        <div className="text-center mt-16 pt-12 border-t border-brand-400/30">
          <p className="text-[13px] text-brand-600 mb-3">Or reach us directly at</p>
          <a href={`mailto:${email}`} className="text-brand-900 underline underline-offset-4 text-lg">{email}</a>
        </div>
      </div>
    </section>
  );
}

// ── Block: Steps ─────────────────────────────────────────────
function StepsBlock({ b }: { b: Block }) {
  const steps = (b.steps as { title: string; description: string }[] | undefined) || [];
  return (
    <section className="py-14 sm:py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-5xl md:text-6xl text-brand-900 mb-4">{b.heading || "How to book"}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {steps.map((step, i) => (
            <div key={i}>
              <p className="text-3xl font-light text-brand-900 mb-4">{step.title || `Step ${i + 1}`}</p>
              <p className="text-[13px] text-brand-600 leading-[1.9]">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/contact" className="inline-block bg-brand-500 text-white px-8 py-3 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors">INQUIRE NOW</Link>
        </div>
      </div>
    </section>
  );
}

// ── Block: FAQ ───────────────────────────────────────────────
function FAQBlock({ b }: { b: Block }) {
  const questions = (b.questions as { question: string; answer: string }[] | undefined) || [];
  return (
    <section className="py-14 sm:py-24 md:py-32 bg-brand-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-5 uppercase">Common Questions</p>
          <h2 className="font-script text-5xl md:text-6xl text-brand-900">{b.heading || "FAQ"}</h2>
        </div>
        <div className="space-y-6">
          {questions.map((faq, i) => (
            <details key={i} className="group bg-white border border-brand-200 rounded-lg">
              <summary className="cursor-pointer px-6 py-5 text-[15px] text-brand-900 font-medium flex justify-between items-center">
                {faq.question}
                <span className="text-brand-500 group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <div className="px-6 pb-5 text-[13px] text-brand-600 leading-[1.9]">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Block: Testimonial ───────────────────────────────────────
function TestimonialBlock({ b }: { b: Block }) {
  const testimonials = b.quote ? [{ quote: b.quote, author: b.authorName || "", event: b.eventDescription || "" }] : undefined;
  return (
    <section className="py-16 sm:py-28 md:py-36 bg-brand-100">
      <TestimonialCarousel testimonials={testimonials} />
    </section>
  );
}

// ── Block: Service Detail ────────────────────────────────────
function ServiceDetailBlock({ b }: { b: Block }) {
  const imgUrl = getMediaUrl(b.image);
  const items = (b.includedItems as { label: string; value: string }[] | undefined) || [];
  const isRight = b.layoutDirection === "imageRight";
  return (
    <section className={`py-24 md:py-32 ${isRight ? "bg-brand-100" : ""}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={isRight ? "order-1 md:order-2" : ""}>
            {imgUrl && (
              <div className="aspect-[4/3] bg-brand-200 relative overflow-hidden">
                <Image src={imgUrl} alt={getMediaAlt(b.image) || b.title || ""} fill className="object-cover" />
              </div>
            )}
          </div>
          <div className={isRight ? "order-2 md:order-1" : ""}>
            {b.eyebrow && <p className="text-xs tracking-[0.3em] text-brand-600 mb-4">{b.eyebrow}</p>}
            <h2 className="font-script text-4xl md:text-5xl text-brand-900 mb-6">{b.title}</h2>
            {b.description && <p className="text-lg text-brand-600 leading-relaxed mb-6">{b.description}</p>}
            {b.secondaryDescription && <p className="text-brand-600 leading-relaxed mb-4">{b.secondaryDescription}</p>}
            {items.length > 0 && (
              <div className="mt-8 space-y-4">
                {b.includedHeading && <h3 className="text-sm tracking-[0.2em] text-brand-900">{b.includedHeading}</h3>}
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm border-b border-brand-400/30 pb-2">
                      <span className="text-brand-600">{item.label}</span>
                      <span className="tracking-[0.1em]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-8 flex gap-4">
              {b.cta1Label && <Link href={b.cta1Href || "/pricing"} className="bg-brand-900 text-white px-6 py-2.5 text-xs tracking-[0.2em] hover:bg-brand-700 transition-colors">{b.cta1Label}</Link>}
              {b.cta2Label && <Link href={b.cta2Href || "/contact"} className="border border-brand-900 px-6 py-2.5 text-xs tracking-[0.2em] hover:bg-brand-900 hover:text-white transition-all">{b.cta2Label}</Link>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Block: Values Grid ───────────────────────────────────────
function ValuesGridBlock({ b }: { b: Block }) {
  const values = (b.values as { title: string; description: string }[] | undefined) || [];
  return (
    <section className="bg-brand-100 py-24">
      <div className="max-w-5xl mx-auto px-6">
        {b.heading && <h2 className="font-script text-5xl text-brand-900 mb-12 text-center">{b.heading}</h2>}
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {values.map((v, i) => (
            <div key={i}>
              <p className="font-script text-3xl text-brand-900 mb-4">{v.title}</p>
              <p className="text-sm text-brand-600 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Block: Fomo Strip ────────────────────────────────────────
function FomoStripBlock({ b }: { b: Block }) {
  return (
    <section className="py-6 bg-brand-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[11px] tracking-[0.2em] text-brand-700">{b.text}</p>
      </div>
    </section>
  );
}

// ── Block: Video Embed ───────────────────────────────────────
function VideoEmbedBlock({ b }: { b: Block }) {
  const url = b.videoUrl as string;
  if (!url) return null;
  const embedUrl = url.includes("youtube.com/watch")
    ? url.replace("watch?v=", "embed/")
    : url.includes("youtu.be/")
    ? `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`
    : url;
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {b.heading && <h2 className="font-script text-4xl text-brand-900 mb-8 text-center">{b.heading}</h2>}
        <div className="relative aspect-video">
          <iframe src={embedUrl} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
        {b.caption && <p className="text-sm text-brand-500 text-center mt-4">{b.caption}</p>}
      </div>
    </section>
  );
}

// ── Block: Rich Text ─────────────────────────────────────────
function RichTextBlock({ b }: { b: Block }) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6 prose prose-lg text-brand-900 leading-[2]">
        {typeof b.content === "string" ? <div dangerouslySetInnerHTML={{ __html: b.content }} /> : null}
      </div>
    </section>
  );
}

// ── Main Renderer ────────────────────────────────────────────
interface RenderContext {
  contactEmail?: string;
  contactInfo?: string;
  depositPercent?: number;
}

export function renderBlock(block: Block, ctx: RenderContext = {}): React.ReactNode {
  if (block.isVisible === false) return null;
  const key = block.id || block.blockType;

  switch (block.blockType) {
    case "hero": return <HeroBlock key={key} b={block} />;
    case "aboutSplit": return <AboutSplitBlock key={key} b={block} />;
    case "twoWays": return <TwoWaysBlock key={key} b={block} />;
    case "packagesToggle": return <PackagesToggleBlock key={key} b={block} depositPercent={ctx.depositPercent} />;
    case "testimonial": return <TestimonialBlock key={key} b={block} />;
    case "cta": return <CTABlock key={key} b={block} contactInfo={ctx.contactInfo} />;
    case "gallerySection": return <GallerySectionBlock key={key} b={block} />;
    case "contactSection": return <ContactSectionBlock key={key} b={block} contactEmail={ctx.contactEmail} />;
    case "steps": return <StepsBlock key={key} b={block} />;
    case "faq": return <FAQBlock key={key} b={block} />;
    case "serviceDetail": return <ServiceDetailBlock key={key} b={block} />;
    case "valuesGrid": return <ValuesGridBlock key={key} b={block} />;
    case "fomoStrip": return <FomoStripBlock key={key} b={block} />;
    case "videoEmbed": return <VideoEmbedBlock key={key} b={block} />;
    case "richText": return <RichTextBlock key={key} b={block} />;
    default: return null;
  }
}

// Convenience: fetch a page's blocks and render them
export function renderBlocks(blocks: Block[] | null | undefined, ctx: RenderContext = {}): React.ReactNode[] {
  if (!blocks) return [];
  return blocks.map(b => renderBlock(b, ctx)).filter(Boolean) as React.ReactNode[];
}
