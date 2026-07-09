"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "SERVICES" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/blog", label: "BLOG" },
  { href: "/pricing", label: "PRICING" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 bg-brand-50/95 backdrop-blur-sm border-b border-brand-200/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
          <Image src="/logo.png" alt="Gigi's Concept" width={200} height={189} className="h-10 sm:h-14 md:h-16 w-auto" priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] xl:text-sm tracking-[0.2em] transition-colors ${
                pathname === link.href ? "text-brand-700" : "text-brand-900 hover:text-brand-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="border border-brand-900 px-5 py-2 text-[11px] xl:text-sm tracking-[0.2em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all"
          >
            INQUIRE
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-3 -mr-2"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`block w-6 h-0.5 bg-brand-900 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-brand-900 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-brand-900 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu - solid full screen overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]" style={{ top: 0 }}>
          {/* Solid background - completely covers page */}
          <div className="absolute inset-0 bg-brand-50" />

          {/* Header row with logo + close */}
          <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-brand-200/50">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex-shrink-0">
              <Image src="/logo.png" alt="Gigi's Concept" width={200} height={189} className="h-10 w-auto" />
            </Link>
            <button onClick={() => setMobileOpen(false)} className="p-3 -mr-2" aria-label="Close menu">
              <svg className="w-6 h-6 text-brand-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu content */}
          <div className="relative z-10 flex flex-col h-[calc(100%-60px)] overflow-y-auto">
            <div className="flex-1 px-6 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-4 text-[15px] tracking-[0.12em] border-b border-brand-200/40 ${
                    pathname === link.href ? "text-brand-700 font-medium" : "text-brand-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="px-6 pt-6 pb-10 space-y-3">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-brand-900 text-white py-4 text-[11px] tracking-[0.2em]"
              >
                INQUIRE
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className="block text-center border border-brand-900 py-4 text-[11px] tracking-[0.2em] text-brand-900"
              >
                BUILD YOUR QUOTE
              </Link>
              <p className="text-center text-[11px] text-brand-500 pt-3">
                +1 (832) 873-7776<br />hello@gigisconcept.com
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
