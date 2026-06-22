"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export function AdminNav({ userName }: { userName: string }) {
  return (
    <nav className="bg-brand-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/admin" className="font-script text-2xl text-brand-200">
            Gigi&apos;s Concept
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/admin"
              className="text-sm tracking-widest text-brand-400 hover:text-white transition-colors"
            >
              DASHBOARD
            </Link>
            <Link
              href="/admin/inquiries"
              className="text-sm tracking-widest text-brand-400 hover:text-white transition-colors"
            >
              INQUIRIES
            </Link>
            <Link
              href="/admin/content"
              className="text-sm tracking-widest text-brand-400 hover:text-white transition-colors"
            >
              CONTENT
            </Link>
            <Link
              href="/admin/gallery"
              className="text-sm tracking-widest text-brand-400 hover:text-white transition-colors"
            >
              GALLERY
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-brand-400 hidden md:block">
            Welcome, {userName}
          </span>
          <Link
            href="/"
            className="text-xs tracking-widest text-brand-500 hover:text-white transition-colors"
          >
            VIEW SITE
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-xs tracking-widest text-brand-500 hover:text-white transition-colors"
          >
            SIGN OUT
          </button>
        </div>
      </div>
    </nav>
  );
}
