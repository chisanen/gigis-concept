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

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "#F8F5F1",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #EBE3DB" }}>
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image src="/logo.png" alt="Gigi's Concept" width={200} height={189} style={{ height: 40, width: "auto" }} />
            </Link>
            <button onClick={() => setMobileOpen(false)} style={{ padding: 12 }} aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3A2D28" strokeWidth="1.5">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "16px 0",
                  fontSize: 16,
                  letterSpacing: "0.1em",
                  color: pathname === link.href ? "#76220B" : "#3A2D28",
                  fontWeight: pathname === link.href ? 600 : 400,
                  borderBottom: "1px solid #EBE3DB",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom buttons */}
          <div style={{ padding: "16px 24px 32px" }}>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                textAlign: "center",
                backgroundColor: "#3A2D28",
                color: "#F1EDE6",
                padding: "16px",
                fontSize: 12,
                letterSpacing: "0.2em",
                textDecoration: "none",
                marginBottom: 10,
              }}
            >
              INQUIRE
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                textAlign: "center",
                border: "1px solid #3A2D28",
                color: "#3A2D28",
                padding: "16px",
                fontSize: 12,
                letterSpacing: "0.2em",
                textDecoration: "none",
                marginBottom: 16,
              }}
            >
              BUILD YOUR QUOTE
            </Link>
            <p style={{ textAlign: "center", fontSize: 11, color: "#A48374" }}>
              +1 (832) 873-7776 &middot; hello@gigisconcept.com
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
