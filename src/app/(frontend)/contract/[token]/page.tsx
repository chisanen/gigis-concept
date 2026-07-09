"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ContractSignPage() {
  const params = useParams();
  const token = params.token as string;
  const [contract, setContract] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [signatureName, setSignatureName] = useState("");
  const [consent, setConsent] = useState(false);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    fetch(`/api/contracts?where[id][equals]=${token}&limit=1`)
      .then(r => r.json())
      .then(d => { if (d.docs?.[0]) setContract(d.docs[0]); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  async function handleSign() {
    if (!signatureName.trim() || !consent) return;
    await fetch(`/api/contracts/${token}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "signed",
        clientSignatureName: signatureName,
        clientSignedAt: new Date().toISOString(),
      }),
    }).catch(() => {});
    setSigned(true);
  }

  if (loading) return <div className="py-32 text-center text-brand-500">Loading contract...</div>;

  if (!contract) {
    return (
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h1 className="font-script text-5xl text-brand-900 mb-6">Contract Not Found</h1>
          <p className="text-brand-600 mb-8">This link may be invalid. Please contact us.</p>
          <Link href="/contact" className="bg-brand-900 text-white px-8 py-3 text-[10px] tracking-[0.25em]">CONTACT US</Link>
        </div>
      </section>
    );
  }

  if (signed || contract.status === "signed") {
    return (
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h1 className="font-script text-5xl text-brand-900 mb-6">Contract Signed!</h1>
          <p className="text-brand-600 mb-4">Thank you for signing. A copy has been saved. Your deposit invoice will follow shortly.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">Service Agreement</p>
          <h1 className="font-script text-5xl text-brand-900 mb-2">Your Contract</h1>
          <p className="text-brand-600">For {contract.clientName as string}</p>
        </div>

        <div className="bg-brand-50 border border-brand-200 p-8 rounded-lg mb-8">
          <div className="prose prose-sm max-w-none text-brand-900">
            <h3>Terms & Conditions</h3>
            <ul className="text-sm text-brand-600 space-y-2">
              <li>A 50% non-refundable retainer is required to secure your date.</li>
              <li>Remaining 50% balance is due at the start of your session.</li>
              <li>Cancellation within 48 hours of the event forfeits the full retainer.</li>
              <li>Raw footage delivered within 24 hours. Edited content within 3-5 business days.</li>
              <li>Client grants Gigi&apos;s Concept permission to use event content for portfolio and social media (organic use only).</li>
              <li>Travel fees apply for events beyond 25 miles of Dallas (75219) at $0.50/mile.</li>
            </ul>
          </div>
        </div>

        <div className="max-w-sm mx-auto space-y-4">
          <div>
            <label className="block text-sm mb-2 text-brand-900">Your Legal Name *</label>
            <input
              type="text"
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              placeholder="Type your full legal name to sign"
              className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700"
            />
          </div>
          <label className="flex items-start gap-3 text-[13px] text-brand-600 cursor-pointer">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
            I have read and agree to the terms and conditions outlined above.
          </label>
          <button
            onClick={handleSign}
            disabled={!signatureName.trim() || !consent}
            className="w-full bg-brand-900 text-white py-3.5 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors disabled:opacity-40"
          >
            SIGN CONTRACT
          </button>
          <p className="text-[11px] text-brand-500 text-center">
            By signing, your name, date, and time are recorded as your electronic signature.
          </p>
        </div>
      </div>
    </section>
  );
}
