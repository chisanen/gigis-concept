import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Invoice | Gigi's Concept",
  robots: "noindex, nofollow",
};

export default function InvoicePayPage() {
  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">Payment</p>
        <h1 className="font-script text-5xl md:text-6xl text-brand-900 mb-8">Your Invoice</h1>
        <div className="bg-brand-100 p-10 rounded-lg mb-8">
          <p className="text-[14px] text-brand-600 leading-[1.8] mb-6">
            Invoice details will appear here. When ready, click the payment button
            to securely pay via Stripe.
          </p>
          <button
            disabled
            className="bg-brand-900 text-white px-10 py-3.5 text-[10px] tracking-[0.25em] opacity-50"
          >
            PAY NOW VIA STRIPE
          </button>
          <p className="text-[11px] text-brand-500 mt-4">
            Payments are processed securely through Stripe. We never see your card details.
          </p>
        </div>
        <p className="text-[12px] text-brand-500">
          Questions? Contact us at hello@gigisconcept.com
        </p>
      </div>
    </section>
  );
}
