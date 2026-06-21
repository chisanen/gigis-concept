import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-100 py-24 md:py-36">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-brand-600 mb-6">
            CONTENT CREATION &middot; LUXURY PHOTO BOOTH
          </p>
          <h1 className="font-script text-6xl md:text-8xl text-brand-900 mb-2">
            Capturing
          </h1>
          <p className="text-4xl md:text-5xl tracking-[0.15em] text-brand-600 font-light mb-8">
            MOMENTS
          </p>
          <p className="text-lg md:text-xl text-brand-600 max-w-xl mx-auto mb-12 leading-relaxed">
            Editorial content and a timeless photo-booth experience — quietly
            crafted, beautifully delivered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="bg-brand-900 text-white px-8 py-3 text-sm tracking-[0.2em] hover:bg-brand-700 transition-colors"
            >
              EXPLORE SERVICES
            </Link>
            <Link
              href="/contact"
              className="border border-brand-900 px-8 py-3 text-sm tracking-[0.2em] hover:bg-brand-900 hover:text-white transition-all"
            >
              INQUIRE
            </Link>
          </div>
        </div>
      </section>

      {/* Two Ways to Work Together */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-brand-600 mb-4">WHAT WE OFFER</p>
            <h2 className="text-3xl md:text-4xl tracking-[0.15em] font-light mb-2">
              TWO WAYS TO
            </h2>
            <p className="font-script text-5xl md:text-6xl text-brand-900">
              work together
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Content Creation */}
            <div>
              <div className="aspect-[4/3] bg-brand-200 mb-8 overflow-hidden relative">
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <p className="text-xs tracking-[0.2em] text-brand-600">CONTENT CREATION</p>
                </div>
              </div>
              <h3 className="font-script text-4xl mb-4">Content Creation</h3>
              <p className="text-brand-600 leading-relaxed mb-6">
                Editorial content days for founders, brands, and tastemakers. Directed
                shoots with short-form and long-form deliverables, returned to you within
                forty-eight hours.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm border-b border-brand-200 pb-2">
                  <span>Capture Only</span>
                  <span className="text-brand-600">$50 / HR</span>
                </div>
                <div className="flex justify-between text-sm border-b border-brand-200 pb-2">
                  <span>Short Edit</span>
                  <span className="text-brand-600">$30</span>
                </div>
                <div className="flex justify-between text-sm border-b border-brand-200 pb-2">
                  <span>Long Edit</span>
                  <span className="text-brand-600">$40</span>
                </div>
                <div className="flex justify-between text-sm border-b border-brand-200 pb-2">
                  <span>The Storyteller</span>
                  <span className="text-brand-600">$450</span>
                </div>
              </div>
              <Link
                href="/pricing"
                className="inline-block border border-brand-900 px-6 py-2.5 text-xs tracking-[0.2em] hover:bg-brand-900 hover:text-white transition-all"
              >
                SEE PACKAGES
              </Link>
            </div>

            {/* Photo Booth */}
            <div>
              <div className="aspect-[4/3] bg-brand-200 mb-8 overflow-hidden relative">
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <p className="text-xs tracking-[0.2em] text-brand-600">PHOTO BOOTH</p>
                </div>
              </div>
              <h3 className="font-script text-4xl mb-4">Photo Booth</h3>
              <p className="text-brand-600 leading-relaxed mb-6">
                A slow, cinematic take on the classic photo booth — custom backdrops,
                heavyweight prints on-site, and a digital gallery the next day. For weddings,
                launches, and the nights worth remembering.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm border-b border-brand-200 pb-2">
                  <span>Custom Backdrop</span>
                  <span className="tracking-[0.1em] text-brand-600">INCLUDED</span>
                </div>
                <div className="flex justify-between text-sm border-b border-brand-200 pb-2">
                  <span>On-Site Attendant</span>
                  <span className="tracking-[0.1em] text-brand-600">INCLUDED</span>
                </div>
                <div className="flex justify-between text-sm border-b border-brand-200 pb-2">
                  <span>Instant Prints</span>
                  <span className="tracking-[0.1em] text-brand-600">UNLIMITED</span>
                </div>
                <div className="flex justify-between text-sm border-b border-brand-200 pb-2">
                  <span>Digital Gallery</span>
                  <span className="tracking-[0.1em] text-brand-600">24 HR</span>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-block border border-brand-900 px-6 py-2.5 text-xs tracking-[0.2em] hover:bg-brand-900 hover:text-white transition-all"
              >
                REQUEST A QUOTE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-white py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-script text-2xl md:text-3xl text-brand-900 leading-relaxed italic mb-8">
            My mom started crying! She loves it so much — thank you so much.
            You are amazing at what you do.
          </p>
          <p className="text-xs tracking-[0.2em] text-brand-600">
            — LATOYA E. &middot; 60TH BIRTHDAY CELEBRATION
          </p>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="aspect-[3/4] bg-brand-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xs tracking-[0.2em] text-brand-500">PORTRAIT</p>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-brand-600 mb-4">THE STUDIO</p>
              <h2 className="font-script text-4xl md:text-5xl text-brand-900 mb-2 leading-tight">
                Quiet luxury,
              </h2>
              <h2 className="font-script text-4xl md:text-5xl text-brand-900 mb-8 leading-tight">
                captured on camera.
              </h2>
              <p className="text-brand-600 leading-relaxed mb-6">
                Gigi&apos;s Concept is a boutique content &amp; photo-booth studio based in
                Dallas, serving clients across Texas and beyond. We shoot with an editorial
                eye so your brand, your wedding, or your milestone feels exactly like the
                one you&apos;ve been dreaming about.
              </p>
              <p className="text-brand-600 leading-relaxed mb-8">
                Every shoot is treated like a small cover story — because the best moments
                rarely shout. They whisper.
              </p>
              <p className="font-script text-3xl text-brand-900">— Gigi</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-900 text-white py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-brand-500 mb-4">LET&apos;S CREATE</p>
          <h2 className="font-script text-5xl md:text-6xl mb-2">Tell us</h2>
          <p className="text-2xl md:text-3xl tracking-[0.15em] font-light">
            ABOUT YOUR MOMENT
          </p>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="bg-brand-100 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-script text-5xl md:text-6xl text-center mb-4">
            Get your quote today!
          </h2>
          <p className="text-center text-brand-600 mb-12">
            If you have further questions, please do not hesitate to contact us at{" "}
            <a href="mailto:hello@gigisconcept.com" className="underline">
              hello@gigisconcept.com
            </a>
          </p>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
