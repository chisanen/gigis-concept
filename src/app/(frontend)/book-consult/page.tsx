"use client";

import { useState } from "react";

export default function BookConsultPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    date: "",
    startTime: "10:00",
    type: "call",
    notes: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          duration: 15,
          status: "scheduled",
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
          <h1 className="font-script text-5xl text-brand-900 mb-6">You&apos;re Booked!</h1>
          <p className="text-[14px] text-brand-600 leading-[1.8]">
            Your 15-minute consultation has been scheduled. We&apos;ll send a confirmation
            to your email shortly. Looking forward to chatting with you!
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-brand-200 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">Let&apos;s Chat</p>
          <h1 className="font-script text-5xl md:text-7xl text-brand-900">Book a Consultation</h1>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-lg mx-auto px-6">
          <p className="text-[14px] text-brand-600 text-center mb-10 leading-[1.8]">
            Schedule a free 15-minute consultation to discuss your event,
            our packages, and how we can bring your vision to life.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-2 text-brand-900">Your Name *</label>
              <input
                required
                value={form.clientName}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-brand-900">Email *</label>
              <input
                type="email"
                required
                value={form.clientEmail}
                onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-brand-900">Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-brand-900">Preferred Time *</label>
                <select
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700"
                >
                  {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
                    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"].map((t) => (
                    <option key={t} value={t}>{t.replace(/^(\d+):/, (_, h) => {
                      const hr = parseInt(h);
                      return `${hr > 12 ? hr - 12 : hr}:`;
                    }).replace(/:(\d+)$/, `:$1 ${parseInt(t) >= 13 ? "PM" : parseInt(t) === 12 ? "PM" : "AM"}`)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2 text-brand-900">Consultation Type</label>
              <div className="flex gap-3">
                {[
                  { value: "call", label: "Phone Call" },
                  { value: "video", label: "Video Chat" },
                  { value: "dm", label: "DM / Text" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm({ ...form, type: opt.value })}
                    className={`flex-1 py-3 text-[11px] tracking-[0.1em] border transition-colors ${
                      form.type === opt.value
                        ? "border-brand-900 bg-brand-900 text-white"
                        : "border-brand-400 text-brand-900"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2 text-brand-900">Tell us about your event</label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="What are you planning?"
                className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-brand-900 text-white py-3.5 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "BOOKING..." : "BOOK CONSULTATION"}
            </button>
            {status === "error" && <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </section>
    </>
  );
}
