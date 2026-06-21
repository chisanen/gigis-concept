import Link from "next/link";
import Image from "next/image";
import { InquiryForm } from "@/components/InquiryForm";
import { PackageToggle } from "@/components/PackageToggle";
import { Gallery } from "@/components/Gallery";

export default function Home() {
  return (
    <>
      {/* ─── SECTION 1: HERO ─── */}
      <section className="relative bg-brand-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-28 md:py-40 text-center">
          <p className="text-[11px] tracking-[0.35em] text-brand-600 mb-8 uppercase">
            Content Creation &middot; Luxury Photo Booth
          </p>
          <h1 className="font-script text-7xl md:text-9xl text-brand-900 mb-4 leading-[0.9]">
            Capturing
          </h1>
          <p className="text-3xl md:text-5xl tracking-[0.2em] text-brand-600 font-light uppercase mb-10">
            Moments
          </p>
          <p className="text-base md:text-lg text-brand-600 max-w-md mx-auto mb-14 leading-relaxed">
            Editorial content and a timeless photo-booth experience — quietly
            crafted, beautifully delivered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/services"
              className="bg-brand-900 text-white px-10 py-3.5 text-[11px] tracking-[0.25em] hover:bg-brand-700 transition-colors"
            >
              EXPLORE SERVICES
            </Link>
            <Link
              href="/contact"
              className="border border-brand-900 px-10 py-3.5 text-[11px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all"
            >
              INQUIRE
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: ABOUT GIGI ─── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left: Portrait */}
            <div className="relative aspect-[3/4] max-w-md mx-auto w-full overflow-hidden">
              <Image
                src="/gigi-portrait.png"
                alt="Gigi — Founder of Gigi's Concept"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Right: Blurb */}
            <div className="text-center md:text-left">
              <p className="text-[11px] tracking-[0.35em] text-brand-600 mb-5 uppercase">
                The Studio
              </p>
              <h2 className="font-script text-4xl md:text-5xl text-brand-900 leading-tight mb-3">
                Quiet luxury,
              </h2>
              <h2 className="font-script text-4xl md:text-5xl text-brand-900 leading-tight mb-10">
                captured on camera.
              </h2>
              <p className="text-brand-600 leading-relaxed mb-6 text-[15px]">
                Gigi&apos;s Concept is a boutique content &amp; photo-booth studio
                based in Dallas, serving clients across Texas and beyond. We shoot
                with an editorial eye so your brand, your wedding, or your milestone
                feels exactly like the one you&apos;ve been dreaming about.
              </p>
              <p className="text-brand-600 leading-relaxed mb-10 text-[15px]">
                Every shoot is treated like a small cover story — because the best
                moments rarely shout. They whisper.
              </p>
              <p className="font-script text-3xl text-brand-900">— Gigi</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: TWO WAYS TO WORK TOGETHER ─── */}
      <section className="py-24 md:py-32 bg-brand-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.35em] text-brand-600 mb-5 uppercase">
              What We Offer
            </p>
            <h2 className="text-2xl md:text-4xl tracking-[0.18em] font-light text-brand-900 uppercase mb-3">
              Two Ways To
            </h2>
            <p className="font-script text-5xl md:text-6xl text-brand-900">
              work together
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* Content Creation Card */}
            <div className="group bg-white overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1653899665441-e52920ff25e9?w=800&q=80"
                  alt="Content creation — editorial brand shoot"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="font-script text-3xl text-brand-900 mb-3">
                  Content Creation
                </h3>
                <p className="text-sm text-brand-600 leading-relaxed mb-6">
                  Editorial content days for founders, brands, and tastemakers.
                  Directed shoots with short-form and long-form deliverables,
                  returned to you within forty-eight hours.
                </p>
                <Link
                  href="/services"
                  className="inline-block border border-brand-900 px-6 py-2.5 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>

            {/* Photo Booth Card */}
            <div className="group bg-white overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1731664454047-b8e9ec397575?w=800&q=80"
                  alt="Couple on the dance floor at an elegant event"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="font-script text-3xl text-brand-900 mb-3">
                  Photo Booth
                </h3>
                <p className="text-sm text-brand-600 leading-relaxed mb-6">
                  A slow, cinematic take on the classic photo booth — custom
                  backdrops, heavyweight prints on-site, and a digital gallery the
                  next day. For weddings, launches, and the nights worth
                  remembering.
                </p>
                <Link
                  href="/services"
                  className="inline-block border border-brand-900 px-6 py-2.5 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: PACKAGES TOGGLE ─── */}
      <section className="py-24 md:py-32 bg-brand-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <p className="text-[11px] tracking-[0.35em] text-brand-600 mb-5 uppercase">
              Investment
            </p>
            <h2 className="font-script text-5xl md:text-6xl text-brand-900 mb-4">
              Packages
            </h2>
          </div>
          <PackageToggle />
        </div>
      </section>

      {/* ─── SECTION 5: TESTIMONIAL ─── */}
      <section className="py-24 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="mb-8">
            <svg className="w-10 h-10 mx-auto text-brand-400 mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
          <p className="font-script text-2xl md:text-3xl text-brand-900 leading-relaxed mb-10">
            My mom started crying! She loves it so much — thank you so much.
            You are amazing at what you do.
          </p>
          <div className="w-12 h-px bg-brand-400 mx-auto mb-6" />
          <p className="text-[11px] tracking-[0.25em] text-brand-600 uppercase">
            Latoya E. &middot; 60th Birthday Celebration
          </p>
        </div>
      </section>

      {/* ─── SECTION 6: GET A QUOTE CTA ─── */}
      <section className="bg-brand-900 text-white py-24 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.35em] text-brand-500 mb-5 uppercase">
            Let&apos;s Create
          </p>
          <h2 className="font-script text-5xl md:text-7xl mb-4">Tell us</h2>
          <p className="text-2xl md:text-3xl tracking-[0.18em] font-light uppercase mb-10">
            About Your Moment
          </p>
          <Link
            href="/contact"
            className="inline-block border border-white px-10 py-3.5 text-[11px] tracking-[0.25em] hover:bg-white hover:text-brand-900 transition-all"
          >
            GET YOUR QUOTE
          </Link>
        </div>
      </section>

      {/* ─── SECTION 7: GALLERY ─── */}
      <section className="py-24 md:py-32 bg-brand-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.35em] text-brand-600 mb-5 uppercase">
              Our Work
            </p>
            <h2 className="font-script text-5xl md:text-6xl text-brand-900">
              Gallery
            </h2>
          </div>
          <Gallery />
        </div>
      </section>

      {/* ─── SECTION 8: CONTACT US ─── */}
      <section id="contact" className="py-24 md:py-32 bg-brand-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.35em] text-brand-600 mb-5 uppercase">
              Get In Touch
            </p>
            <h2 className="font-script text-5xl md:text-6xl text-brand-900 mb-4">
              Contact Us
            </h2>
            <p className="text-brand-600 text-[15px]">
              Ready to book? Have questions? Fill out the form below and
              we&apos;ll get back to you within 24 hours.
            </p>
          </div>
          <InquiryForm />
          <div className="text-center mt-14 pt-10 border-t border-brand-400/30">
            <p className="text-sm text-brand-600 mb-2">Or reach us directly at</p>
            <a
              href="mailto:hello@gigisconcept.com"
              className="text-brand-900 underline underline-offset-4"
            >
              hello@gigisconcept.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
