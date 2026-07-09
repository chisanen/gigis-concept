import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-32 md:py-44 bg-brand-50">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">Page Not Found</p>
        <h1 className="font-script text-6xl md:text-8xl text-brand-900 mb-6">404</h1>
        <p className="text-[15px] text-brand-600 mb-10 leading-[1.8]">
          The page you&apos;re looking for doesn&apos;t exist. Maybe it was moved, or
          maybe you just need to head back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-brand-900 text-white px-10 py-3.5 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors"
          >
            GO HOME
          </Link>
          <Link
            href="/contact"
            className="border border-brand-900 px-10 py-3.5 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </section>
  );
}
