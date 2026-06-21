import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | Gigi's Concept",
  description:
    "View our content creation packages and photo booth pricing. Starting from $50/hr for capture-only to $450 for our signature Storyteller package.",
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-brand-600 mb-4">INVESTMENT</p>
          <h1 className="font-script text-5xl md:text-7xl text-brand-900">Packages</h1>
        </div>
      </section>

      {/* Content Creation Packages */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-brand-600 mb-4">CONTENT CREATION</p>
            <h2 className="text-2xl tracking-[0.1em] font-light">Choose your package</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            {/* The Basic */}
            <div className="border border-brand-200 p-10">
              <p className="text-xs tracking-[0.2em] text-brand-600 mb-2">CAPTURE ONLY</p>
              <h3 className="text-2xl font-semibold text-brand-900 mb-1">THE BASIC</h3>
              <p className="font-script text-lg text-brand-600 mb-8 italic">on-the-go content</p>

              <div className="space-y-4 mb-10 min-h-[200px]">
                <p className="text-sm text-brand-600 border-b border-brand-200 pb-3">
                  On-site content capture
                </p>
                <p className="text-sm text-brand-600 border-b border-brand-200 pb-3">
                  Two-hour minimum
                </p>
                <p className="text-sm text-brand-600 border-b border-brand-200 pb-3">
                  All raw footage delivered
                </p>
              </div>

              <div className="border-t border-brand-200 pt-6">
                <span className="text-4xl font-light text-brand-900">$50</span>
                <span className="text-sm tracking-[0.1em] text-brand-600 ml-1">/ HR</span>
              </div>
            </div>

            {/* The Storyteller */}
            <div className="border border-brand-900 bg-brand-900 text-white p-10 relative">
              <p className="absolute top-4 right-4 font-script text-lg text-brand-500 italic">
                most loved
              </p>
              <p className="text-xs tracking-[0.2em] text-brand-500 mb-2">SIGNATURE</p>
              <h3 className="text-2xl font-semibold mb-1">THE STORYTELLER</h3>
              <p className="font-script text-lg text-brand-400 mb-8 italic">a complete content day</p>

              <div className="space-y-4 mb-10 min-h-[200px]">
                <p className="text-sm text-brand-400 border-b border-brand-700/30 pb-3">
                  Four hours of directed shooting
                </p>
                <p className="text-sm text-brand-400 border-b border-brand-700/30 pb-3">
                  Three fully-edited long videos
                </p>
                <p className="text-sm text-brand-400 border-b border-brand-700/30 pb-3">
                  Two fully-edited short videos
                </p>
                <p className="text-sm text-brand-400 border-b border-brand-700/30 pb-3">
                  All raw footage included
                </p>
                <p className="text-sm text-brand-400 border-b border-brand-700/30 pb-3">
                  48-hour delivery
                </p>
              </div>

              <div className="border-t border-brand-700/30 pt-6">
                <span className="text-4xl font-light">$450</span>
                <span className="text-sm tracking-[0.1em] text-brand-500 ml-1">FLAT</span>
              </div>
            </div>

            {/* Edited Videos */}
            <div className="border border-brand-200 p-10">
              <p className="text-xs tracking-[0.2em] text-brand-600 mb-2">ADD-ON</p>
              <h3 className="text-2xl font-semibold text-brand-900 mb-1">EDITED VIDEOS</h3>
              <p className="font-script text-lg text-brand-600 mb-8 italic">polish a single piece</p>

              <div className="space-y-4 mb-10 min-h-[200px]">
                <p className="text-sm text-brand-600 border-b border-brand-200 pb-3">
                  Short-form edit — $30
                </p>
                <p className="text-sm text-brand-600 border-b border-brand-200 pb-3">
                  Long-form edit — $40
                </p>
                <p className="text-sm text-brand-600 border-b border-brand-200 pb-3">
                  One long edit free with any shoot
                </p>
              </div>

              <div className="border-t border-brand-200 pt-6">
                <span className="text-4xl font-light text-brand-900">$30</span>
                <span className="text-sm tracking-[0.1em] text-brand-600 ml-1">STARTING</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Booth Pricing */}
      <section className="bg-brand-100 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-brand-600 mb-4">PHOTO BOOTH</p>
            <h2 className="font-script text-4xl md:text-5xl text-brand-900">
              Every booking includes
            </h2>
          </div>

          <div className="bg-white p-10 md:p-16">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg border-b border-brand-200 pb-4">
                <span>Custom Backdrop</span>
                <span className="text-sm tracking-[0.2em] text-brand-600">INCLUDED</span>
              </div>
              <div className="flex justify-between items-center text-lg border-b border-brand-200 pb-4">
                <span>On-Site Attendant</span>
                <span className="text-sm tracking-[0.2em] text-brand-600">INCLUDED</span>
              </div>
              <div className="flex justify-between items-center text-lg border-b border-brand-200 pb-4">
                <span>Instant Prints</span>
                <span className="text-sm tracking-[0.2em] text-brand-600">UNLIMITED</span>
              </div>
              <div className="flex justify-between items-center text-lg border-b border-brand-200 pb-4">
                <span>Digital Gallery</span>
                <span className="text-sm tracking-[0.2em] text-brand-600">24 HR</span>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-brand-600 mb-6">
                Photo booth pricing varies by event duration and location. Contact us for a custom quote.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-brand-900 text-white px-8 py-3 text-sm tracking-[0.2em] hover:bg-brand-700 transition-colors"
              >
                REQUEST A QUOTE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-script text-4xl md:text-5xl text-brand-900 mb-6">
            Let&apos;s create something timeless.
          </h2>
          <p className="text-brand-600 mb-8">
            Ready to book? Have questions? We&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-block border border-brand-900 px-8 py-3 text-sm tracking-[0.2em] hover:bg-brand-900 hover:text-white transition-all"
          >
            CONTACT US
          </Link>
        </div>
      </section>
    </>
  );
}
