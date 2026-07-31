import Link from "next/link";

export const metadata = {
  title: "Client Portal - Coming Soon | Gigi's Concept",
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">Client Portal</p>
        <h1 className="font-script text-5xl md:text-6xl text-brand-900 mb-8">Coming Soon</h1>
        <p className="text-[14px] text-brand-600 mb-10 leading-[1.8]">
          Our client portal is not available yet. We&apos;re building a space where you&apos;ll
          be able to view your bookings, sign contracts, pay invoices, and access your private
          gallery. In the meantime, please reach out to us directly and we&apos;ll take care of you.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-brand-900 text-white px-10 py-3.5 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors"
        >
          GET IN TOUCH
        </Link>
      </div>
    </section>
  );
}
