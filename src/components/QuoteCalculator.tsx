"use client";

import { useState } from "react";

const PACKAGES = {
  booth: [
    { id: "good-angle", name: "The Good Angle", price: 290, unit: "3-hr min", desc: "Custom Backdrop · On-Site Attendant · Unlimited Prints · Digital Gallery (24hr)" },
    { id: "extended", name: "5-Hour Extended Coverage", price: 450, unit: "5 hours", desc: "Everything in The Good Angle + extended coverage + premium backdrops", badge: "Popular" },
  ],
  content: [
    { id: "basic", name: "Basic Package", price: 60, unit: "/hr (2-hr min)", desc: "On-site capture · All raw footage · 1 free short edit" },
    { id: "storyteller", name: "The Storyteller", price: 550, unit: "flat", desc: "4-hr shoot · 3 long + 2 short videos · Raw footage · 48-hr delivery", badge: "Popular" },
    { id: "signature", name: "Gigi's Signature Full-Day", price: 800, unit: "flat", desc: "8-hr shoot · 5+ edited videos · Complete raw footage · 7-10 day delivery", badge: "Wedding Favorite" },
  ],
};

const ADDONS = [
  { id: "short-edit", name: "Short Video Edit", price: 30, for: "content" },
  { id: "long-edit", name: "Long Video Edit", price: 40, for: "content" },
  { id: "extra-time", name: "Additional Time", price: 97, for: "booth", unit: "/hr" },
  { id: "spandex", name: "Classic Spandex Backdrop", price: 25, for: "booth" },
  { id: "curtain", name: "Curtain Backdrop", price: 25, for: "booth", note: "up to $50" },
  { id: "flower", name: "Flower Wall Backdrop", price: 50, for: "booth", note: "up to $100" },
  { id: "assistant", name: "On-Site Assistant", price: 10, for: "all", unit: "/hr" },
  { id: "rush", name: "Rush Delivery (24hr)", price: 50, for: "content" },
];

export function QuoteCalculator() {
  const [service, setService] = useState<"booth" | "content">("booth");
  const [selectedPkg, setSelectedPkg] = useState("");
  const [hours, setHours] = useState(3);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const pkgs = service === "booth" ? PACKAGES.booth : PACKAGES.content;
  const addons = ADDONS.filter(a => a.for === service || a.for === "all");
  const pkg = pkgs.find(p => p.id === selectedPkg);

  // Calculate total
  let total = 0;
  if (pkg) {
    if (pkg.unit.includes("/hr")) {
      total = pkg.price * Math.max(hours, 2);
    } else {
      total = pkg.price;
    }
  }
  Object.entries(selectedAddons).forEach(([id, qty]) => {
    if (qty > 0) {
      const addon = ADDONS.find(a => a.id === id);
      if (addon) {
        if (addon.unit === "/hr") total += addon.price * hours;
        else total += addon.price * qty;
      }
    }
  });
  const deposit = Math.round(total * 0.5);

  async function handleSubmit() {
    if (!name || !email || !selectedPkg) return;
    setSubmitting(true);

    const lineItems = [];
    if (pkg) {
      lineItems.push(`${pkg.name}: $${pkg.unit.includes("/hr") ? pkg.price * Math.max(hours, 2) : pkg.price}`);
    }
    Object.entries(selectedAddons).forEach(([id, qty]) => {
      if (qty > 0) {
        const addon = ADDONS.find(a => a.id === id);
        if (addon) lineItems.push(`${addon.name} x${qty}: $${addon.unit === "/hr" ? addon.price * hours : addon.price * qty}`);
      }
    });

    // Create inquiry + lead
    const data = {
      firstName: name.split(" ")[0] || name,
      lastName: name.split(" ").slice(1).join(" ") || "",
      email, phone, eventDate,
      eventLocation: "TBD",
      eventType: service === "booth" ? "Photo Booth" : "Content Creation",
      serviceRequired: service === "booth" ? "Photo Booth" : "Content Creation",
      hearAbout: "Quote Builder",
      message: `QUOTE REQUEST\n\nPackage: ${pkg?.name} (${pkg?.unit})\nHours: ${hours}\nAdd-ons: ${lineItems.slice(1).join(", ") || "None"}\nEstimated Total: $${total}\n50% Deposit: $${deposit}\n\nDescription: ${description}`,
      status: "new",
    };

    await Promise.all([
      fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
      fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, stage: "new", source: "website", heardAbout: "Quote Builder" }) }),
      fetch("/api/send-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "inquiry_auto_reply", data: { email, firstName: data.firstName } }) }),
      fetch("/api/send-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "owner_notification", data: { Name: name, Email: email, Phone: phone, "Event Date": eventDate, Service: data.serviceRequired, "Package": pkg?.name || "", "Estimated Total": `$${total}`, "50% Deposit": `$${deposit}`, Description: description } }) }),
    ]).catch(() => {});

    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <h3 className="font-script text-4xl text-brand-900 mb-4">Quote Submitted!</h3>
        <p className="text-[14px] text-brand-600 mb-2">Thank you, {name}. We&apos;ve received your quote request.</p>
        <p className="text-[14px] text-brand-600 mb-8">We&apos;ll review your details and get back to you within 24 hours with a custom proposal.</p>
        <div className="bg-brand-100 inline-block px-8 py-4 rounded-lg">
          <p className="text-[12px] text-brand-500 mb-1">Estimated Total</p>
          <p className="text-3xl font-light text-brand-900">${total}</p>
          <p className="text-[12px] text-brand-500">50% deposit: ${deposit}</p>
        </div>
        <button onClick={() => { setSubmitted(false); setSelectedPkg(""); setSelectedAddons({}); setName(""); setEmail(""); setPhone(""); setDescription(""); }}
          className="block mx-auto mt-8 border border-brand-900 px-8 py-3 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all">
          BUILD ANOTHER QUOTE
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-5 uppercase">Estimate</p>
        <h2 className="font-script text-5xl text-brand-900">Build Your Quote</h2>
      </div>

      {/* Service toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-brand-200 p-1">
          <button onClick={() => { setService("booth"); setSelectedPkg(""); setSelectedAddons({}); }}
            className={`px-8 py-3 text-[10px] tracking-[0.2em] transition-all ${service === "booth" ? "bg-brand-900 text-white" : "text-brand-900"}`}>
            PHOTO BOOTH
          </button>
          <button onClick={() => { setService("content"); setSelectedPkg(""); setSelectedAddons({}); }}
            className={`px-8 py-3 text-[10px] tracking-[0.2em] transition-all ${service === "content" ? "bg-brand-900 text-white" : "text-brand-900"}`}>
            CONTENT CREATION
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left — selections */}
        <div className="space-y-6">
          {/* Packages */}
          <div>
            <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-3">Select Package</p>
            <div className="space-y-2">
              {pkgs.map(p => (
                <button key={p.id} onClick={() => setSelectedPkg(p.id)}
                  className={`w-full text-left p-4 border rounded-lg transition-all ${selectedPkg === p.id ? "border-brand-900 bg-brand-50" : "border-brand-200 bg-white hover:border-brand-400"}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[14px] text-brand-900 font-medium">{p.name}</p>
                      <p className="text-[12px] text-brand-500 mt-1">{p.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-lg text-brand-900 font-light">${p.price}</p>
                      <p className="text-[10px] text-brand-500">{p.unit}</p>
                      {p.badge && <span className="inline-block mt-1 text-[9px] bg-brand-900 text-white px-2 py-0.5 rounded-full">{p.badge}</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Hours */}
          {pkg && pkg.unit.includes("/hr") && (
            <div>
              <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-3">Hours</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setHours(Math.max(2, hours - 1))} className="w-10 h-10 border border-brand-400 rounded flex items-center justify-center text-brand-900 hover:bg-brand-100">−</button>
                <span className="text-2xl font-light text-brand-900 w-12 text-center">{hours}</span>
                <button onClick={() => setHours(Math.min(12, hours + 1))} className="w-10 h-10 border border-brand-400 rounded flex items-center justify-center text-brand-900 hover:bg-brand-100">+</button>
                <span className="text-[12px] text-brand-500 ml-2">{hours < 2 ? "(2-hr minimum)" : "hours"}</span>
              </div>
            </div>
          )}

          {/* Add-ons */}
          <div>
            <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-3">Add-ons</p>
            <div className="space-y-2">
              {addons.map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-white border border-brand-200 rounded-lg">
                  <div>
                    <p className="text-[13px] text-brand-900">{a.name}</p>
                    <p className="text-[11px] text-brand-500">${a.price}{a.unit || ""} {a.note ? `(${a.note})` : ""}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelectedAddons({ ...selectedAddons, [a.id]: Math.max(0, (selectedAddons[a.id] || 0) - 1) })}
                      className="w-7 h-7 border border-brand-300 rounded text-brand-600 text-sm hover:bg-brand-100">−</button>
                    <span className="w-6 text-center text-[13px] text-brand-900">{selectedAddons[a.id] || 0}</span>
                    <button onClick={() => setSelectedAddons({ ...selectedAddons, [a.id]: (selectedAddons[a.id] || 0) + 1 })}
                      className="w-7 h-7 border border-brand-300 rounded text-brand-600 text-sm hover:bg-brand-100">+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — summary + contact */}
        <div>
          {/* Quote summary */}
          <div className="bg-white border border-brand-200 rounded-lg p-6 mb-6">
            <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-4">Your Quote</p>
            {!pkg ? (
              <p className="text-[13px] text-brand-400 italic">Select a package to start building your quote</p>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-brand-900">{pkg.name}{pkg.unit.includes("/hr") ? ` (${hours} hrs)` : ""}</span>
                    <span className="text-brand-900 font-medium">${pkg.unit.includes("/hr") ? pkg.price * Math.max(hours, 2) : pkg.price}</span>
                  </div>
                  {Object.entries(selectedAddons).map(([id, qty]) => {
                    if (qty <= 0) return null;
                    const addon = ADDONS.find(a => a.id === id);
                    if (!addon) return null;
                    const cost = addon.unit === "/hr" ? addon.price * hours : addon.price * qty;
                    return (
                      <div key={id} className="flex justify-between text-[12px] text-brand-600">
                        <span>{addon.name} x{qty}</span>
                        <span>${cost}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-brand-200 pt-3 space-y-1">
                  <div className="flex justify-between text-[16px] font-medium text-brand-900">
                    <span>Estimated Total</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between text-[12px] text-brand-500">
                    <span>50% Deposit to Book</span>
                    <span>${deposit}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Contact info */}
          <div className="bg-white border border-brand-200 rounded-lg p-6">
            <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-4">Your Info</p>
            <div className="space-y-3">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name *"
                className="w-full border border-brand-300 px-4 py-3 text-[13px] rounded-lg focus:outline-none focus:border-brand-700" />
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email *"
                className="w-full border border-brand-300 px-4 py-3 text-[13px] rounded-lg focus:outline-none focus:border-brand-700" />
              <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone Number"
                className="w-full border border-brand-300 px-4 py-3 text-[13px] rounded-lg focus:outline-none focus:border-brand-700" />
              <input value={eventDate} onChange={e => setEventDate(e.target.value)} type="date"
                className="w-full border border-brand-300 px-4 py-3 text-[13px] rounded-lg focus:outline-none focus:border-brand-700" />
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
                placeholder="Tell us about your event — type, theme, venue, any special requests..."
                className="w-full border border-brand-300 px-4 py-3 text-[13px] rounded-lg focus:outline-none focus:border-brand-700 resize-none" />
            </div>

            <button onClick={handleSubmit}
              disabled={submitting || !name || !email || !selectedPkg}
              className="w-full mt-4 bg-brand-900 text-white py-3.5 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors disabled:opacity-40 rounded-lg">
              {submitting ? "SUBMITTING..." : "SUBMIT QUOTE REQUEST"}
            </button>
            <p className="text-[11px] text-brand-500 text-center mt-3">
              We&apos;ll review and send you a detailed proposal within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
