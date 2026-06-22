"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "SERVICES" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/pricing", label: "PRICING" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 bg-brand-50/95 backdrop-blur-sm border-b border-brand-200/50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-script text-3xl text-brand-700 hover:opacity-80 transition-opacity">
          Gigi&apos;s Concept
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-[0.2em] text-brand-900 hover:text-brand-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="border border-brand-900 px-6 py-2 text-sm tracking-[0.2em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all"
          >
            INQUIRE
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-brand-900 transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-brand-900 transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-brand-900 transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-50 border-t border-brand-200 px-6 pb-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm tracking-[0.2em] text-brand-900 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="inline-block mt-2 border border-brand-900 px-6 py-2 text-sm tracking-[0.2em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all"
          >
            INQUIRE
          </Link>
        </div>
      )}
    </header>
  );
}
