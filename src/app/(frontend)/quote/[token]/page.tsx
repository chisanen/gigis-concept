import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Quote | Gigi's Concept",
  robots: "noindex, nofollow",
};

export default function QuoteAcceptPage() {
  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">Your Proposal</p>
        <h1 className="font-script text-5xl md:text-6xl text-brand-900 mb-8">Your Quote</h1>
        <div className="bg-brand-100 p-10 rounded-lg mb-8">
          <p className="text-[14px] text-brand-600 leading-[1.8]">
            Quote details will appear here. This page is generated when a quote is sent
            to a client. You&apos;ll be able to review the line items, total, and accept
            the quote to begin the booking process.
          </p>
        </div>
        <p className="text-[12px] text-brand-500">
          Questions? Contact us at hello@gigisconcept.com
        </p>
      </div>
    </section>
  );
}
