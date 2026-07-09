"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Invoice {
  invoiceNumber: string;
  clientName: string;
  lineItems: { label: string; qty: number; unitCents: number; totalCents: number }[];
  totalCents: number;
  amountPaidCents: number;
  balanceCents: number;
  status: string;
  dueDate: string;
  isDeposit: boolean;
}

export default function InvoicePayPage() {
  const params = useParams();
  const token = params.token as string;
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/invoices?where[invoiceNumber][equals]=${token}&limit=1`)
      .then(r => r.json())
      .then(d => { if (d.docs?.[0]) setInvoice(d.docs[0]); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const fmt = (cents: number) => `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  if (loading) return <div className="py-32 text-center text-brand-500">Loading invoice...</div>;

  if (!invoice) {
    return (
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h1 className="font-script text-5xl text-brand-900 mb-6">Invoice Not Found</h1>
          <p className="text-brand-600 mb-8">This link may be invalid. Please contact us.</p>
          <Link href="/contact" className="bg-brand-900 text-white px-8 py-3 text-[10px] tracking-[0.25em]">CONTACT US</Link>
        </div>
      </section>
    );
  }

  const isPaid = invoice.status === "paid";
  const statusColors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-700",
    sent: "bg-amber-50 text-amber-700",
    partial: "bg-blue-50 text-blue-700",
    paid: "bg-green-50 text-green-700",
    overdue: "bg-red-50 text-red-700",
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">
            {invoice.isDeposit ? "Deposit Invoice" : "Invoice"}
          </p>
          <h1 className="font-script text-5xl text-brand-900 mb-2">Invoice #{invoice.invoiceNumber}</h1>
          <p className="text-brand-600">{invoice.clientName}</p>
          <span className={`inline-block mt-3 px-3 py-1 text-xs tracking-[0.1em] uppercase rounded-full ${statusColors[invoice.status] || "bg-gray-100 text-gray-700"}`}>
            {invoice.status}
          </span>
        </div>

        <div className="bg-brand-50 border border-brand-200 p-8 rounded-lg mb-8">
          {invoice.lineItems && invoice.lineItems.length > 0 && (
            <table className="w-full text-sm mb-6">
              <thead>
                <tr className="border-b border-brand-200">
                  <th className="text-left py-2 text-brand-500 text-[10px] tracking-[0.15em] uppercase">Item</th>
                  <th className="text-right py-2 text-brand-500 text-[10px] tracking-[0.15em] uppercase">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.lineItems.map((item, i) => (
                  <tr key={i} className="border-b border-brand-100">
                    <td className="py-3 text-brand-900">{item.label}</td>
                    <td className="py-3 text-right text-brand-900">{fmt(item.totalCents)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="space-y-2 pt-4 border-t border-brand-200">
            <div className="flex justify-between text-sm">
              <span className="text-brand-600">Total</span>
              <span className="text-brand-900 font-medium">{fmt(invoice.totalCents)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-600">Paid</span>
              <span className="text-green-700">{fmt(invoice.amountPaidCents)}</span>
            </div>
            <div className="flex justify-between text-lg font-medium">
              <span className="text-brand-900">Balance Due</span>
              <span className="text-brand-700">{fmt(invoice.balanceCents)}</span>
            </div>
          </div>

          {invoice.dueDate && (
            <p className="mt-4 text-sm text-brand-500">
              Due: {new Date(invoice.dueDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          )}
        </div>

        <div className="text-center">
          {isPaid ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-700 font-medium">This invoice has been paid. Thank you!</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-brand-600 mb-4">
                Click below to pay securely via Stripe. We never see your card details.
              </p>
              <button
                onClick={() => alert("Stripe integration coming soon. For now, contact hello@gigisconcept.com to arrange payment.")}
                className="bg-brand-900 text-white px-14 py-4 text-[10px] tracking-[0.3em] hover:bg-brand-700 transition-colors"
              >
                PAY {fmt(invoice.balanceCents)}
              </button>
              <p className="text-[11px] text-brand-500 mt-4">
                Payments processed securely through Stripe. You can also pay via Zelle to +1 (832) 873-7776.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
