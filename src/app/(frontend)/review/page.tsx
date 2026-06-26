"use client";

import { useState } from "react";

export default function ReviewPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ authorName: "", eventDescription: "", quote: "", rating: "5" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          rating: parseInt(form.rating),
          status: "pending",
          featured: false,
          sortOrder: 0,
        }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h1 className="font-script text-5xl text-brand-900 mb-6">Thank You!</h1>
          <p className="text-[14px] text-brand-600 leading-[1.8]">
            Your review has been submitted and is pending approval.
            We truly appreciate you taking the time to share your experience.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-brand-200 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">Share Your Experience</p>
          <h1 className="font-script text-5xl md:text-7xl text-brand-900">Leave a Review</h1>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-lg mx-auto px-6">
          <p className="text-[14px] text-brand-600 text-center mb-10 leading-[1.8]">
            We&apos;d love to hear about your experience with Gigi&apos;s Concept.
            Your feedback means the world to us.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-2 text-brand-900">Your Name *</label>
              <input
                required
                value={form.authorName}
                onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                placeholder="e.g. Latoya E."
                className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-brand-900">Event *</label>
              <input
                required
                value={form.eventDescription}
                onChange={(e) => setForm({ ...form, eventDescription: e.target.value })}
                placeholder="e.g. 60th Birthday Celebration"
                className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-brand-900">Rating *</label>
              <div className="flex gap-2">
                {[5, 4, 3, 2, 1].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm({ ...form, rating: String(r) })}
                    className={`w-10 h-10 border text-sm transition-colors ${
                      form.rating === String(r)
                        ? "bg-brand-900 text-white border-brand-900"
                        : "border-brand-400 text-brand-900 hover:border-brand-900"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2 text-brand-900">Your Review *</label>
              <textarea
                required
                rows={5}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                placeholder="Tell us about your experience..."
                className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-brand-900 text-white py-3.5 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "SUBMITTING..." : "SUBMIT REVIEW"}
            </button>
            {status === "error" && <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </section>
    </>
  );
}
