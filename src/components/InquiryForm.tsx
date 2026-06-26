"use client";

import { useState } from "react";

const eventTypes = [
  "Wedding",
  "Birthday",
  "Corporate Event",
  "Brand Shoot",
  "Baby Shower",
  "Graduation",
  "Anniversary",
  "Other",
];

const hearAboutOptions = [
  "Instagram",
  "Facebook",
  "TikTok",
  "Google",
  "Referral",
  "Other",
];

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const formObj = Object.fromEntries(data);

      // Submit inquiry
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formObj),
      });

      // Also create a lead for CRM tracking
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formObj.firstName,
          lastName: formObj.lastName,
          email: formObj.email,
          phone: formObj.phone,
          eventDate: formObj.eventDate,
          eventLocation: formObj.eventLocation,
          eventType: formObj.eventType,
          serviceRequired: formObj.serviceRequired,
          heardAbout: formObj.hearAbout,
          promoCode: formObj.promoCode,
          message: formObj.message,
          stage: "new",
          source: "website",
        }),
      }).catch(() => {});

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <p className="font-script text-4xl text-brand-700 mb-4">Thank you!</p>
        <p className="text-lg text-brand-600">
          We&apos;ve received your inquiry and will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 border border-brand-900 px-8 py-3 text-sm tracking-[0.2em] hover:bg-brand-900 hover:text-white transition-all"
        >
          SUBMIT ANOTHER
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 border border-brand-200 grid md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm mb-2">
          First Name <span className="text-brand-700">*</span>
        </label>
        <input
          name="firstName"
          required
          placeholder="Enter your first name e.g Jane"
          className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">
          Last Name <span className="text-brand-700">*</span>
        </label>
        <input
          name="lastName"
          required
          placeholder="Enter your Last Name e.g Smith"
          className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">
          Email <span className="text-brand-700">*</span>
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="Enter your email"
          className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">
          Mobile Number <span className="text-brand-700">*</span>
        </label>
        <input
          name="phone"
          type="tel"
          required
          placeholder="Enter your phone"
          className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">
          Event Date <span className="text-brand-700">*</span>
        </label>
        <input
          name="eventDate"
          type="date"
          required
          className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">
          Event Location <span className="text-brand-700">*</span>
        </label>
        <input
          name="eventLocation"
          required
          placeholder="Enter Event Location"
          className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">
          Event Type <span className="text-brand-700">*</span>
        </label>
        <select
          name="eventType"
          required
          defaultValue=""
          className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700 transition-colors"
        >
          <option value="" disabled>Select Event Type</option>
          {eventTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-2">
          Service Required <span className="text-brand-700">*</span>
        </label>
        <select
          name="serviceRequired"
          required
          defaultValue=""
          className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700 transition-colors"
        >
          <option value="" disabled>Select Service</option>
          <option value="Content Creation">Content Creation</option>
          <option value="Photo Booth">Photo Booth</option>
          <option value="Both">Both</option>
        </select>
      </div>

      <div>
        <label className="block text-sm mb-2">
          How did you hear about us? <span className="text-brand-700">*</span>
        </label>
        <select
          name="hearAbout"
          required
          defaultValue=""
          className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700 transition-colors"
        >
          <option value="" disabled>Choose your option</option>
          {hearAboutOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-2">Promo Code</label>
        <input
          name="promoCode"
          placeholder="Enter Promo Code"
          className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700 transition-colors"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm mb-2">Anything else you&apos;d like us to know?</label>
        <textarea
          name="message"
          rows={5}
          maxLength={5000}
          placeholder="Tell us about your event, or just say hello! :)"
          className="w-full border border-brand-400 bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-700 transition-colors resize-none"
        />
      </div>

      <div className="md:col-span-2 text-center pt-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-brand-900 text-white px-14 py-3.5 text-[11px] tracking-[0.25em] hover:bg-brand-700 transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "SUBMITTING..." : "SUBMIT"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  );
}
