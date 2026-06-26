import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Gigi's Concept",
  description:
    "Content creation and luxury photo booth services for weddings, events, and brand shoots in Dallas, Texas.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-brand-600 mb-4">WHAT WE OFFER</p>
          <h1 className="font-script text-5xl md:text-7xl text-brand-900">Services</h1>
        </div>
      </section>

      {/* Content Creation */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/3] bg-brand-200 relative overflow-hidden">
              <Image
                src="/hero-wedding.png"
                alt="Elegant wedding celebration — content creation"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-brand-600 mb-4">SERVICE ONE</p>
              <h2 className="font-script text-4xl md:text-5xl text-brand-900 mb-6">
                Content Creation
              </h2>
              <p className="text-lg text-brand-600 leading-relaxed mb-6">
                Editorial content days for founders, brands, and tastemakers. Directed
                shoots with short-form and long-form deliverables, returned to you within
                forty-eight hours.
              </p>
              <p className="text-brand-600 leading-relaxed mb-4">
                Whether you&apos;re launching a brand, refreshing your social presence, or
                documenting a milestone, we bring the editorial eye and creative direction
                to make every frame count.
              </p>

              <div className="mt-8 space-y-4">
                <h3 className="text-sm tracking-[0.2em] text-brand-900">WHAT&apos;S INCLUDED</h3>
                <ul className="space-y-2 text-brand-600">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-700 mt-1">&#8226;</span>
                    Professional directed shooting
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-700 mt-1">&#8226;</span>
                    Short-form and long-form video deliverables
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-700 mt-1">&#8226;</span>
                    All raw footage delivered
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-700 mt-1">&#8226;</span>
                    48-hour delivery turnaround
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex gap-4">
                <Link
                  href="/pricing"
                  className="bg-brand-900 text-white px-6 py-2.5 text-xs tracking-[0.2em] hover:bg-brand-700 transition-colors"
                >
                  SEE PACKAGES
                </Link>
                <Link
                  href="/contact"
                  className="border border-brand-900 px-6 py-2.5 text-xs tracking-[0.2em] hover:bg-brand-900 hover:text-white transition-all"
                >
                  INQUIRE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Booth */}
      <section className="bg-brand-100 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-1 md:order-2">
              <div className="aspect-[4/3] bg-brand-200 relative overflow-hidden">
                <Image
                  src="/photo-booth.png"
                  alt="Upscale luxury photo booth setup"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-2 md:order-1">
              <p className="text-xs tracking-[0.3em] text-brand-600 mb-4">SERVICE TWO</p>
              <h2 className="font-script text-4xl md:text-5xl text-brand-900 mb-6">
                Photo Booth
              </h2>
              <p className="text-lg text-brand-600 leading-relaxed mb-6">
                A slow, cinematic take on the classic photo booth — custom backdrops,
                heavyweight prints on-site, and a digital gallery the next day. For weddings,
                launches, and the nights worth remembering.
              </p>

              <div className="mt-8 space-y-4">
                <h3 className="text-sm tracking-[0.2em] text-brand-900">EVERY BOOKING INCLUDES</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm border-b border-brand-400/30 pb-2">
                    <span className="text-brand-600">Custom Backdrop</span>
                    <span className="tracking-[0.1em]">INCLUDED</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-brand-400/30 pb-2">
                    <span className="text-brand-600">On-Site Attendant</span>
                    <span className="tracking-[0.1em]">INCLUDED</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-brand-400/30 pb-2">
                    <span className="text-brand-600">Instant Prints</span>
                    <span className="tracking-[0.1em]">UNLIMITED</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-brand-400/30 pb-2">
                    <span className="text-brand-600">Digital Gallery</span>
                    <span className="tracking-[0.1em]">24 HR</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="bg-brand-900 text-white px-6 py-2.5 text-xs tracking-[0.2em] hover:bg-brand-700 transition-colors"
                >
                  REQUEST A QUOTE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Book */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-script text-5xl md:text-6xl text-brand-900 mb-4">
              How to book
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <p className="text-3xl font-light text-brand-900 mb-4">Step 1</p>
              <p className="text-brand-600 leading-relaxed">
                Shoot us your inquiry with your chosen package and any fun add ons!
                Just a heads up, dates get locked in after a non-refundable deposit is paid
                and the contract is signed.
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-light text-brand-900 mb-4">Step 2</p>
              <p className="text-brand-600 leading-relaxed">
                As your event date gets closer, we&apos;ll send you a questionnaire about a
                month before your event to nail down the little details!
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-light text-brand-900 mb-4">Step 3</p>
              <p className="text-brand-600 leading-relaxed">
                Let us handle the stress (and the fun!) We&apos;ll ensure that everyone has an
                incredible time at your event!
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-block bg-brand-500 text-white px-8 py-3 text-sm tracking-[0.2em] hover:bg-brand-700 transition-colors"
            >
              INQUIRE NOW
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
