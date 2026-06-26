"use client";

import { useState } from "react";
import Link from "next/link";

export default function PortalPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/customers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.user) {
        setLoggedIn(true);
      } else {
        setError("Invalid email or password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loggedIn) {
    return (
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-6 uppercase">Client Portal</p>
          <h1 className="font-script text-5xl md:text-6xl text-brand-900 mb-8">Welcome</h1>
          <p className="text-[14px] text-brand-600 mb-12 leading-[1.8]">
            Your portal is being prepared. You&apos;ll be able to view your bookings,
            sign contracts, pay invoices, complete questionnaires, and access your
            private gallery here soon.
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
            {["My Bookings", "Contracts", "Invoices", "My Gallery"].map((item) => (
              <div key={item} className="bg-brand-100 p-6 rounded text-center">
                <p className="text-[13px] text-brand-600">{item}</p>
                <p className="text-[11px] text-brand-500 mt-1">Coming soon</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-brand-200 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">Client Access</p>
          <h1 className="font-script text-5xl md:text-7xl text-brand-900">Client Portal</h1>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-sm mx-auto px-6">
          <p className="text-[14px] text-brand-600 text-center mb-8 leading-[1.8]">
            Log in to view your bookings, contracts, invoices, and private gallery.
          </p>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm mb-2 text-brand-900">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-brand-900">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700"
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-900 text-white py-3.5 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors disabled:opacity-50"
            >
              {loading ? "SIGNING IN..." : "LOG IN"}
            </button>
          </form>
          <p className="text-center text-[12px] text-brand-500 mt-6">
            Don&apos;t have an account? Your login is created when you book with us.
          </p>
        </div>
      </section>
    </>
  );
}
