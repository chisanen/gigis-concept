import Link from "next/link";
import Image from "next/image";
import { InquiryForm } from "@/components/InquiryForm";
import { PackageToggle } from "@/components/PackageToggle";
import { Gallery } from "@/components/Gallery";

export default function Home() {
  return (
    <>
      {/* ═══ SECTION 1: CAPTURING MOMENTS (HERO) ═══ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-R7sKX3PXZ1A?w=1600&q=80"
            alt="Elegant wedding moment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-brand-900/50" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <p className="text-[11px] tracking-[0.4em] text-white/70 mb-8 uppercase">
            Content Creation &middot; Luxury Photo Booth
          </p>
          <h1 className="font-script text-7xl md:text-9xl mb-4 leading-[0.85]">
            Capturing
          </h1>
          <p className="text-3xl md:text-5xl tracking-[0.25em] font-extralight uppercase mb-12">
            Moments
          </p>
          <p className="text-sm md:text-base text-white/80 max-w-lg mx-auto mb-14 leading-relaxed">
            Editorial content and a timeless photo-booth experience — quietly
            crafted, beautifully delivered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/services"
              className="bg-white text-brand-900 px-10 py-3.5 text-[11px] tracking-[0.25em] hover:bg-brand-200 transition-colors"
            >
              EXPLORE SERVICES
            </Link>
            <Link
              href="/contact"
              className="border border-white/60 text-white px-10 py-3.5 text-[11px] tracking-[0.25em] hover:bg-white hover:text-brand-900 transition-all"
            >
              INQUIRE
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: ABOUT GIGI (Photo left, blurb right) ═══ */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
            {/* Left — Portrait */}
            <div className="relative aspect-[3/4] max-w-lg mx-auto w-full overflow-hidden group">
              <Image
                src="/gigi-portrait.png"
                alt="Gigi — Founder of Gigi's Concept"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>

            {/* Right — Blurb + Quote */}
            <div className="text-center md:text-left max-w-lg mx-auto md:mx-0">
              <p className="text-[11px] tracking-[0.4em] text-brand-600 mb-6 uppercase">
                The Studio
              </p>
              <h2 className="font-script text-4xl md:text-[3.2rem] text-brand-900 leading-[1.1] mb-3">
                Quiet luxury,
              </h2>
              <h2 className="font-script text-4xl md:text-[3.2rem] text-brand-900 leading-[1.1] mb-10">
                captured on camera.
              </h2>
              <p className="text-[15px] text-brand-600 leading-[1.8] mb-6">
                Gigi&apos;s Concept is a boutique content &amp; photo-booth studio
                based in Dallas, serving clients across Texas and beyond. We shoot
                with an editorial eye so your brand, your wedding, or your
                milestone feels exactly like the one you&apos;ve been dreaming
                about.
              </p>
              <p className="text-[15px] text-brand-600 leading-[1.8] mb-10">
                Every shoot is treated like a small cover story — because the best
                moments rarely shout. They whisper.
              </p>
              <p className="font-script text-3xl text-brand-900">— Gigi</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: TWO WAYS TO WORK TOGETHER ═══ */}
      <section className="py-28 md:py-36 bg-brand-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[11px] tracking-[0.4em] text-brand-600 mb-5 uppercase">
              What We Offer
            </p>
            <h2 className="text-2xl md:text-3xl tracking-[0.2em] font-light text-brand-900 uppercase mb-3">
              Two Ways To
            </h2>
            <p className="font-script text-5xl md:text-6xl text-brand-900">
              work together
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Content Creation */}
            <div className="group">
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <Image
                  src="https://images.unsplash.com/photo-1611784728558-6c7d9b409cdf?w=800&q=80"
                  alt="Content creation — behind the scenes of a directed shoot"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="text-center px-4">
                <h3 className="font-script text-3xl md:text-4xl text-brand-900 mb-4">
                  Content Creation
                </h3>
                <p className="text-sm text-brand-600 leading-relaxed mb-8 max-w-sm mx-auto">
                  Editorial content days for founders, brands, and tastemakers.
                  Directed shoots with short-form and long-form deliverables,
                  returned to you within forty-eight hours.
                </p>
                <Link
                  href="/services"
                  className="inline-block border border-brand-900 px-8 py-3 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>

            {/* Photo Booth */}
            <div className="group">
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <Image
                  src="https://images.unsplash.com/photo-9vHAhn_gUtg?w=800&q=80"
                  alt="Bride with bridesmaids at elegant celebration"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="text-center px-4">
                <h3 className="font-script text-3xl md:text-4xl text-brand-900 mb-4">
                  Photo Booth
                </h3>
                <p className="text-sm text-brand-600 leading-relaxed mb-8 max-w-sm mx-auto">
                  A slow, cinematic take on the classic photo booth — custom
                  backdrops, heavyweight prints on-site, and a digital gallery the
                  next day. For weddings, launches, and the nights worth
                  remembering.
                </p>
                <Link
                  href="/services"
                  className="inline-block border border-brand-900 px-8 py-3 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: PACKAGES TOGGLE ═══ */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-[11px] tracking-[0.4em] text-brand-600 mb-5 uppercase">
              Investment
            </p>
            <h2 className="font-script text-5xl md:text-6xl text-brand-900">
              Packages
            </h2>
          </div>
          <PackageToggle />
        </div>
      </section>

      {/* ═══ SECTION 5: TESTIMONIAL ═══ */}
      <section className="py-28 md:py-32 bg-brand-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <svg
            className="w-12 h-12 mx-auto text-brand-400/60 mb-10"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="font-script text-2xl md:text-[1.7rem] text-brand-900 leading-relaxed mb-12">
            My mom started crying! She loves it so much — thank you so much.
            You are amazing at what you do.
          </p>
          <div className="w-16 h-px bg-brand-400 mx-auto mb-6" />
          <p className="text-[11px] tracking-[0.3em] text-brand-600 uppercase">
            Latoya E. &middot; 60th Birthday Celebration
          </p>
        </div>
      </section>

      {/* ═══ SECTION 6: GET A QUOTE CTA ═══ */}
      <section className="relative py-28 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-RjgyOT2cYIA?w=1600&q=80"
            alt="Bridesmaids celebrating"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-900/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <p className="text-[11px] tracking-[0.4em] text-white/60 mb-5 uppercase">
            Let&apos;s Create
          </p>
          <h2 className="font-script text-5xl md:text-7xl mb-4">Tell us</h2>
          <p className="text-xl md:text-2xl tracking-[0.2em] font-extralight uppercase mb-12">
            About Your Moment
          </p>
          <Link
            href="/contact"
            className="inline-block border border-white/50 px-12 py-4 text-[11px] tracking-[0.3em] hover:bg-white hover:text-brand-900 transition-all"
          >
            GET YOUR QUOTE
          </Link>
        </div>
      </section>

      {/* ═══ SECTION 7: GALLERY ═══ */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.4em] text-brand-600 mb-5 uppercase">
              Our Work
            </p>
            <h2 className="font-script text-5xl md:text-6xl text-brand-900">
              Gallery
            </h2>
          </div>
          <Gallery />
        </div>
      </section>

      {/* ═══ SECTION 8: CONTACT US ═══ */}
      <section id="contact" className="py-28 md:py-36 bg-brand-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.4em] text-brand-600 mb-5 uppercase">
              Get In Touch
            </p>
            <h2 className="font-script text-5xl md:text-6xl text-brand-900 mb-5">
              Contact Us
            </h2>
            <p className="text-[15px] text-brand-600 max-w-md mx-auto">
              Ready to book? Have questions? Fill out the form below and
              we&apos;ll get back to you within 24 hours.
            </p>
          </div>
          <InquiryForm />
          <div className="text-center mt-16 pt-12 border-t border-brand-400/30">
            <p className="text-sm text-brand-600 mb-3">Or reach us directly at</p>
            <a
              href="mailto:hello@gigisconcept.com"
              className="text-brand-900 underline underline-offset-4 text-lg"
            >
              hello@gigisconcept.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
