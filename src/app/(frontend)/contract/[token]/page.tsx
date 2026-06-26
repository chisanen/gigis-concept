import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Contract | Gigi's Concept",
  robots: "noindex, nofollow",
};

export default function ContractSignPage() {
  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">Agreement</p>
        <h1 className="font-script text-5xl md:text-6xl text-brand-900 mb-8">Your Contract</h1>
        <div className="bg-brand-100 p-10 rounded-lg mb-8">
          <p className="text-[14px] text-brand-600 leading-[1.8] mb-6">
            Your service agreement will appear here. Review the terms, then sign
            by typing your legal name below and checking the consent box.
          </p>
          <div className="max-w-sm mx-auto text-left space-y-4">
            <div>
              <label className="block text-sm mb-2 text-brand-900">Your Legal Name</label>
              <input
                type="text"
                placeholder="Type your full legal name"
                className="w-full border border-brand-400 bg-white px-4 py-3 text-sm"
                disabled
              />
            </div>
            <label className="flex items-start gap-3 text-[13px] text-brand-600">
              <input type="checkbox" className="mt-1" disabled />
              I agree to the terms and conditions outlined in this contract.
            </label>
            <button
              disabled
              className="w-full bg-brand-900 text-white py-3 text-[10px] tracking-[0.25em] opacity-50"
            >
              SIGN CONTRACT
            </button>
          </div>
        </div>
        <p className="text-[12px] text-brand-500">
          Questions? Contact us at hello@gigisconcept.com
        </p>
      </div>
    </section>
  );
}
