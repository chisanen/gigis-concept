import type { Metadata } from "next";
import Link from "next/link";
import { QuoteCalculator } from "@/components/QuoteCalculator";

export const metadata: Metadata = {
  title: "Pricing | Gigi's Concept",
  description:
    "View our content creation packages and photo booth pricing. Build your custom quote instantly.",
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-200 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">Investment</p>
          <h1 className="font-script text-5xl md:text-7xl text-brand-900">Build Your Quote</h1>
        </div>
      </section>

      {/* Quote Calculator — the only pricing section */}
      <section className="py-16 md:py-24 bg-brand-50">
        <div className="max-w-5xl mx-auto px-6">
          <QuoteCalculator />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-script text-4xl md:text-5xl text-brand-900 mb-6">
            Let&apos;s create something timeless.
          </h2>
          <p className="text-[14px] text-brand-600 mb-8 leading-[1.8]">
            Ready to book? Have questions? We&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-900 text-white px-10 py-3.5 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors"
          >
            CONTACT US
          </Link>
        </div>
      </section>
    </>
  );
}
