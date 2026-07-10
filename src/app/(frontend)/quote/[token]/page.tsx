"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Quote {
  quoteNumber: string;
  clientName: string;
  lineItems: { label: string; qty: number; unitCents: number; totalCents: number }[];
  subtotalCents: number;
  totalCents: number;
  depositCents: number;
  status: string;
  validUntil: string;
  notes: string;
}

export default function QuoteAcceptPage() {
  const params = useParams();
  const token = params.token as string;
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [depositPercent, setDepositPercent] = useState(50);

  useEffect(() => {
    Promise.all([
      fetch(`/api/quotes?where[quoteNumber][equals]=${token}&limit=1`).then(r => r.json()),
      fetch("/api/pricing").then(r => r.json()).catch(() => null),
    ])
      .then(([quoteData, pricingData]) => {
        if (quoteData.docs?.[0]) setQuote(quoteData.docs[0]);
        if (pricingData?.depositPercent) setDepositPercent(pricingData.depositPercent);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const fmt = (cents: number) => `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  if (loading) return <div className="py-32 text-center text-brand-500">Loading your quote...</div>;

  if (!quote) {
    return (
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h1 className="font-script text-5xl text-brand-900 mb-6">Quote Not Found</h1>
          <p className="text-brand-600 mb-8">This quote link may have expired or is invalid. Please contact us for a new quote.</p>
          <Link href="/contact" className="bg-brand-900 text-white px-8 py-3 text-[10px] tracking-[0.25em]">CONTACT US</Link>
        </div>
      </section>
    );
  }

  if (accepted || quote.status === "accepted") {
    return (
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h1 className="font-script text-5xl text-brand-900 mb-6">Quote Accepted!</h1>
          <p className="text-brand-600 mb-4">Thank you for accepting your quote. We&apos;ll send your contract and deposit invoice shortly.</p>
          <p className="text-brand-500 text-sm">Questions? Email hello@gigisconcept.com</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">Your Proposal</p>
          <h1 className="font-script text-5xl text-brand-900 mb-2">Quote #{quote.quoteNumber}</h1>
          <p className="text-brand-600">For {quote.clientName}</p>
        </div>

        <div className="bg-brand-50 border border-brand-200 p-8 rounded-lg mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-200">
                <th className="text-left py-2 text-brand-500 text-[10px] tracking-[0.15em] uppercase">Item</th>
                <th className="text-right py-2 text-brand-500 text-[10px] tracking-[0.15em] uppercase">Qty</th>
                <th className="text-right py-2 text-brand-500 text-[10px] tracking-[0.15em] uppercase">Unit</th>
                <th className="text-right py-2 text-brand-500 text-[10px] tracking-[0.15em] uppercase">Total</th>
              </tr>
            </thead>
            <tbody>
              {quote.lineItems?.map((item, i) => (
                <tr key={i} className="border-b border-brand-100">
                  <td className="py-3 text-brand-900">{item.label}</td>
                  <td className="py-3 text-right text-brand-600">{item.qty}</td>
                  <td className="py-3 text-right text-brand-600">{fmt(item.unitCents)}</td>
                  <td className="py-3 text-right text-brand-900 font-medium">{fmt(item.totalCents)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 pt-4 border-t border-brand-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-brand-600">Subtotal</span>
              <span className="text-brand-900">{fmt(quote.subtotalCents)}</span>
            </div>
            <div className="flex justify-between text-lg font-medium">
              <span className="text-brand-900">Total</span>
              <span className="text-brand-900">{fmt(quote.totalCents)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-600">{depositPercent}% Deposit Due</span>
              <span className="text-brand-700 font-medium">{fmt(quote.depositCents)}</span>
            </div>
          </div>
        </div>

        {quote.notes && (
          <div className="mb-8 p-4 bg-brand-100 rounded-lg">
            <p className="text-sm text-brand-600">{quote.notes}</p>
          </div>
        )}

        {quote.validUntil && (
          <p className="text-center text-sm text-brand-500 mb-6">
            Valid until {new Date(quote.validUntil).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        )}

        <div className="text-center">
          <button
            onClick={async () => {
              await fetch(`/api/quotes/${token}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "accepted" }) }).catch(() => {});
              setAccepted(true);
            }}
            className="bg-brand-900 text-white px-14 py-4 text-[10px] tracking-[0.3em] hover:bg-brand-700 transition-colors"
          >
            ACCEPT QUOTE
          </button>
        </div>
      </div>
    </section>
  );
}
