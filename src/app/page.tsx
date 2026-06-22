import Link from "next/link";
import Image from "next/image";
import { InquiryForm } from "@/components/InquiryForm";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { Gallery } from "@/components/Gallery";

export default function Home() {
  return (
    <>
      {/* ═══ 1 · CAPTURING MOMENTS ═══ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-wedding.png"
            alt="Elegant African American bride and groom on wedding steps"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center text-white py-20">
          <p className="text-[10px] md:text-[11px] tracking-[0.5em] text-white/60 mb-10 uppercase">
            Content Creation &middot; Luxury Photo Booth
          </p>
          <h1 className="font-script text-6xl sm:text-7xl md:text-[6.5rem] leading-[0.85] mb-5">
            Capturing
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl tracking-[0.3em] font-extralight uppercase mb-12 text-white/90">
            Moments
          </p>
          <p className="text-[13px] md:text-[15px] text-white/70 max-w-sm mx-auto mb-16 leading-[1.9]">
            Editorial content and a timeless photo-booth experience — quietly
            crafted, beautifully delivered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/services"
              className="bg-white text-brand-900 px-10 py-4 text-[10px] tracking-[0.3em] hover:bg-brand-200 transition-colors"
            >
              EXPLORE SERVICES
            </Link>
            <Link
              href="/contact"
              className="border border-white/40 text-white px-10 py-4 text-[10px] tracking-[0.3em] hover:bg-white hover:text-brand-900 transition-all"
            >
              INQUIRE
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 2 · ABOUT GIGI ═══ */}
      <section className="py-28 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
            {/* Left — Full uncropped photo */}
            <div className="relative w-full overflow-hidden group">
              <Image
                src="/gigi-portrait.png"
                alt="Gigi — Founder of Gigi's Concept"
                width={800}
                height={533}
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>

            {/* Right — Blurb + Quote */}
            <div className="text-center md:text-left">
              <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-7 uppercase">
                The Studio
              </p>
              <h2 className="font-script text-[2.4rem] md:text-[3rem] text-brand-900 leading-[1.15] mb-2">
                Quiet luxury,
              </h2>
              <h2 className="font-script text-[2.4rem] md:text-[3rem] text-brand-900 leading-[1.15] mb-10">
                captured on camera.
              </h2>
              <p className="text-[14px] text-brand-600 leading-[2] mb-5">
                Gigi&apos;s Concept is a boutique content &amp; photo-booth studio
                based in Dallas, serving clients across Texas and beyond. We shoot
                with an editorial eye so your brand, your wedding, or your
                milestone feels exactly like the one you&apos;ve been dreaming
                about.
              </p>
              <p className="text-[14px] text-brand-600 leading-[2] mb-12">
                Every shoot is treated like a small cover story — because the best
                moments rarely shout. They whisper.
              </p>
              <p className="font-script text-3xl text-brand-700">— Gigi</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3 · TWO WAYS TO WORK TOGETHER ═══ */}
      <section className="py-28 md:py-36 bg-brand-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">
              What We Offer
            </p>
            <h2 className="text-xl md:text-2xl tracking-[0.25em] font-light text-brand-900 uppercase mb-3">
              Two Ways To
            </h2>
            <p className="font-script text-5xl md:text-6xl text-brand-900">
              work together
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="group text-center">
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <Image
                  src="https://images.unsplash.com/photo-1515531980326-6244280b99c8?w=800&q=80"
                  alt="Elegant couple content shoot"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="font-script text-3xl text-brand-900 mb-4">Content Creation</h3>
              <p className="text-[13px] text-brand-600 leading-[1.9] mb-8 max-w-xs mx-auto">
                Editorial content days for founders, brands, and tastemakers.
                Directed shoots with short-form and long-form deliverables,
                returned to you within forty-eight hours.
              </p>
              <Link href="/services" className="inline-block border border-brand-900 px-8 py-3 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all">
                LEARN MORE
              </Link>
            </div>

            <div className="group text-center">
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <Image
                  src="/photo-booth.png"
                  alt="Upscale luxury photo booth setup"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="font-script text-3xl text-brand-900 mb-4">Photo Booth</h3>
              <p className="text-[13px] text-brand-600 leading-[1.9] mb-8 max-w-xs mx-auto">
                A slow, cinematic take on the classic photo booth — custom
                backdrops, heavyweight prints on-site, and a digital gallery the
                next day. For weddings, launches, and the nights worth
                remembering.
              </p>
              <Link href="/services" className="inline-block border border-brand-900 px-8 py-3 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all">
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4 · PACKAGES / QUOTE CALCULATOR ═══ */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">
              Investment
            </p>
            <h2 className="font-script text-5xl md:text-6xl text-brand-900">
              Packages
            </h2>
          </div>
          <QuoteCalculator />
        </div>
      </section>

      {/* ═══ 5 · TESTIMONIAL ═══ */}
      <section className="py-28 md:py-36 bg-brand-100">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <svg className="w-10 h-10 mx-auto text-brand-400/50 mb-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="font-script text-[1.35rem] md:text-[1.6rem] text-brand-900 leading-[1.7] mb-12">
            My mom started crying! She loves it so much — thank you so much.
            You are amazing at what you do.
          </p>
          <div className="w-14 h-px bg-brand-400 mx-auto mb-6" />
          <p className="text-[10px] tracking-[0.35em] text-brand-600 uppercase">
            Latoya E. &middot; 60th Birthday Celebration
          </p>
        </div>
      </section>

      {/* ═══ 6 · GET A QUOTE ═══ */}
      <section className="py-32 md:py-40 bg-brand-900">
        <div className="max-w-2xl mx-auto px-6 text-center text-white">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">
            Let&apos;s Create
          </p>
          <h2 className="font-script text-5xl md:text-7xl mb-5">Tell us</h2>
          <p className="text-lg md:text-xl tracking-[0.25em] font-extralight uppercase mb-14 text-white/70">
            About Your Moment
          </p>
          <Link href="/contact" className="inline-block border border-white/40 text-white px-14 py-4 text-[10px] tracking-[0.35em] hover:bg-white hover:text-brand-900 transition-all">
            GET YOUR QUOTE
          </Link>
        </div>
      </section>

      {/* ═══ 7 · GALLERY PREVIEW ═══ */}
      <section className="py-28 md:py-36 bg-brand-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">Our Work</p>
            <h2 className="font-script text-5xl md:text-6xl text-brand-900">Gallery</h2>
          </div>
          <Gallery />
          <div className="text-center mt-12">
            <Link href="/gallery" className="inline-block border border-brand-900 px-10 py-3.5 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all">
              VIEW FULL GALLERY
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 8 · CONTACT US ═══ */}
      <section id="contact" className="py-28 md:py-36 bg-brand-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">Get In Touch</p>
            <h2 className="font-script text-5xl md:text-6xl text-brand-900 mb-5">Contact Us</h2>
            <p className="text-[14px] text-brand-600 max-w-md mx-auto leading-[1.8]">
              Ready to book? Have questions? Fill out the form below and
              we&apos;ll get back to you within 24 hours.
            </p>
          </div>
          <InquiryForm />
          <div className="text-center mt-16 pt-12 border-t border-brand-400/30">
            <p className="text-[13px] text-brand-600 mb-3">Or reach us directly at</p>
            <a href="mailto:hello@gigisconcept.com" className="text-brand-900 underline underline-offset-4 text-lg">
              hello@gigisconcept.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
