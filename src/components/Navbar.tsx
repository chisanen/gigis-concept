"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface NavLink {
  href: string;
  label: string;
}

const defaultLinks: NavLink[] = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "SERVICES" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/blog", label: "BLOG" },
  { href: "/pricing", label: "PRICING" },
];

interface NavbarProps {
  links?: NavLink[];
  logoUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
  mobileCta?: string;
  mobileCtaHref?: string;
  contactEmail?: string;
  phone?: string;
}

export function Navbar({
  links,
  logoUrl,
  ctaLabel = "INQUIRE",
  ctaHref = "/contact",
  mobileCta = "BUILD YOUR QUOTE",
  mobileCtaHref = "/pricing",
  contactEmail = "hello@gigisconcept.com",
  phone = "+1 (832) 873-7776",
}: NavbarProps) {
  const navLinks = links && links.length > 0 ? links : defaultLinks;
  const logo = logoUrl || "/logo.png";
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header className="sticky top-0 z-50 bg-brand-50 border-b border-brand-200/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image src={logo} alt="Gigi's Concept" width={200} height={189} className="h-10 sm:h-14 md:h-16 w-auto" priority />
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`text-sm lg:text-[15px] tracking-[0.15em] transition-colors ${pathname === link.href ? "text-brand-700" : "text-brand-900 hover:text-brand-700"}`}>
                {link.label}
              </Link>
            ))}
            <Link href={ctaHref} className="border border-brand-900 px-6 py-2.5 text-sm lg:text-[15px] tracking-[0.15em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all">
              {ctaLabel}
            </Link>
          </div>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3A2D28" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3A2D28" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            )}
          </button>
        </nav>

        {/* Mobile dropdown */}
        {open && (
          <div className="lg:hidden bg-brand-50 border-t border-brand-200 pb-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                className={`block px-6 py-3.5 text-[14px] tracking-[0.1em] border-b border-brand-100 ${pathname === link.href ? "text-brand-700 font-medium" : "text-brand-900"}`}>
                {link.label}
              </Link>
            ))}
            <div className="px-6 pt-4 space-y-3">
              <Link href={ctaHref} onClick={() => setOpen(false)}
                className="block text-center bg-brand-900 text-white py-3.5 text-[11px] tracking-[0.2em]">
                {ctaLabel}
              </Link>
              <Link href={mobileCtaHref} onClick={() => setOpen(false)}
                className="block text-center border border-brand-900 py-3.5 text-[11px] tracking-[0.2em] text-brand-900">
                {mobileCta}
              </Link>
              <p className="text-center text-[11px] text-brand-500 pt-2">
                {phone} &middot; {contactEmail}
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
