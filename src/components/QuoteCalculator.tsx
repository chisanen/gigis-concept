"use client";

import { useState } from "react";
import type { PricingPackage, PricingAddOn } from "@/lib/pricing";

const EVENT_TYPES = ["Wedding", "Birthday", "Corporate Event", "Baby Shower", "Graduation", "Brand Shoot", "Anniversary", "Other"];

export function QuoteCalculator({
  packages,
  addOns,
  depositPercent,
}: {
  packages: PricingPackage[];
  addOns: PricingAddOn[];
  depositPercent: number;
}) {
  const boothPackages = packages.filter(p => p.category === "photo_booth");
  const contentPackages = packages.filter(p => p.category === "content_creation");
  const boothAddOns = addOns.filter(a => a.appliesTo === "photo_booth");
  const contentAddOns = addOns.filter(a => a.appliesTo === "content_creation");
  const sharedAddOns = addOns.filter(a => a.appliesTo === "all");

  const [wantsBooth, setWantsBooth] = useState(true);
  const [wantsContent, setWantsContent] = useState(true);
  const [boothPkgId, setBoothPkgId] = useState("");
  const [contentPkgId, setContentPkgId] = useState("");
  const [hours, setHours] = useState(3);
  const [addonQty, setAddonQty] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventHours, setEventHours] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const bPkg = boothPackages.find(p => p.id === boothPkgId);
  const cPkg = contentPackages.find(p => p.id === contentPkgId);

  // Calculate total in cents
  let totalCents = 0;
  if (wantsBooth && bPkg) {
    totalCents += bPkg.isHourly ? bPkg.priceCents * Math.max(hours, bPkg.minimumHours || 1) : bPkg.priceCents;
  }
  if (wantsContent && cPkg) {
    totalCents += cPkg.isHourly ? cPkg.priceCents * Math.max(hours, cPkg.minimumHours || 1) : cPkg.priceCents;
  }
  Object.entries(addonQty).forEach(([id, qty]) => {
    if (qty <= 0) return;
    const addon = addOns.find(a => a.id === id);
    if (!addon) return;
    if (addon.unit === "per_hour") {
      totalCents += addon.priceCents * (parseInt(eventHours) || hours);
    } else {
      totalCents += addon.priceCents * qty;
    }
  });

  const total = Math.round(totalCents / 100);
  const deposit = Math.round(total * depositPercent / 100);

  const toggleAddon = (id: string, delta: number) => {
    setAddonQty(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  async function handleSubmit() {
    if (!name || !email || (!boothPkgId && !contentPkgId)) return;
    setSubmitting(true);

    const services = [];
    if (wantsBooth && bPkg) services.push(bPkg.name);
    if (wantsContent && cPkg) services.push(cPkg.name);

    const data = {
      firstName: name.split(" ")[0] || name,
      lastName: name.split(" ").slice(1).join(" ") || "",
      email, phone, eventDate,
      eventLocation: "TBD",
      eventType: eventType || "Not specified",
      serviceRequired: [wantsBooth && "Photo Booth", wantsContent && "Content Creation"].filter(Boolean).join(" + ") || "TBD",
      hearAbout: "Quote Builder",
      message: `QUOTE REQUEST\n\nServices: ${services.join(" + ")}\nEvent Type: ${eventType}\nEvent Hours: ${eventHours || "Not specified"}\nEstimated Total: $${total}\n${depositPercent}% Deposit: $${deposit}\n\n${description}`,
      status: "new",
    };

    await Promise.all([
      fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
      fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, stage: "new", source: "website" }) }),
      fetch("/api/send-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "inquiry_auto_reply", data: { email, firstName: data.firstName } }) }),
      fetch("/api/send-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "owner_notification", data: { Name: name, Email: email, Phone: phone, "Event Date": eventDate, "Event Type": eventType, Service: data.serviceRequired, Packages: services.join(" + "), "Estimated Total": `$${total}`, [`${depositPercent}% Deposit`]: `$${deposit}`, Description: description } }) }),
    ]).catch(() => {});

    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h3 className="font-script text-4xl text-brand-900 mb-4">Quote Submitted!</h3>
        <p className="text-[14px] text-brand-600 mb-2">Thank you, {name}.</p>
        <p className="text-[14px] text-brand-600 mb-8">We&apos;ll send you a detailed proposal within 24 hours.</p>
        <div className="bg-brand-100 inline-block px-8 py-4 rounded-lg">
          <p className="text-3xl font-light text-brand-900">${total}</p>
          <p className="text-[12px] text-brand-500">{depositPercent}% deposit: ${deposit}</p>
        </div>
        <button onClick={() => { setSubmitted(false); setBoothPkgId(""); setContentPkgId(""); setAddonQty({}); setName(""); setEmail(""); setPhone(""); setDescription(""); setWantsBooth(false); setWantsContent(false); }}
          className="block mx-auto mt-8 border border-brand-900 px-8 py-3 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all">
          BUILD ANOTHER QUOTE
        </button>
      </div>
    );
  }

  function renderPackagePicker(pkgList: PricingPackage[], selectedId: string, setSelected: (id: string) => void, label: string) {
    return (
      <div>
        <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-3">{label}</p>
        {pkgList.map(p => (
          <button key={p.id} onClick={() => setSelected(selectedId === p.id ? "" : p.id)}
            className={`w-full text-left p-4 mb-2 border rounded-lg transition-all ${selectedId === p.id ? "border-brand-900 bg-brand-50" : "border-brand-200 bg-white hover:border-brand-400"}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[14px] text-brand-900 font-medium">{p.name}</p>
                <p className="text-[11px] text-brand-500 mt-1">{p.shortDescription || p.subtitle || ""}</p>
              </div>
              <div className="text-right ml-4">
                <p className="text-lg text-brand-900">{p.priceDisplay}</p>
                <p className="text-[10px] text-brand-500">{p.priceUnit || ""}</p>
                {p.badge && <span className="inline-block mt-1 text-[9px] bg-brand-900 text-white px-2 py-0.5 rounded-full">{p.badge}</span>}
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  }

  function renderAddOns(addonList: PricingAddOn[], label: string) {
    if (addonList.length === 0) return null;
    return (
      <div>
        <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-2 mt-4">{label}</p>
        {addonList.map(a => (
          <div key={a.id} className="flex items-center justify-between p-3 bg-white border border-brand-200 rounded-lg mb-1">
            <div>
              <p className="text-[12px] text-brand-900">{a.name}</p>
              <p className="text-[10px] text-brand-500">
                {a.priceDisplay}{a.unit === "per_hour" ? "/hr" : ""} {a.note ? `(${a.note})` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleAddon(a.id, -1)} className="w-7 h-7 border border-brand-300 rounded text-sm">&minus;</button>
              <span className="w-5 text-center text-[12px]">{addonQty[a.id] || 0}</span>
              <button onClick={() => toggleAddon(a.id, 1)} className="w-7 h-7 border border-brand-300 rounded text-sm">+</button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step 1: Choose services */}
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.2em] text-brand-500 uppercase mb-4">Step 1: What services do you need?</p>
        <div className="flex gap-3">
          <button onClick={() => { setWantsBooth(!wantsBooth); if (wantsBooth) setBoothPkgId(""); }}
            className={`flex-1 py-4 text-[11px] tracking-[0.15em] border rounded-lg transition-all ${wantsBooth ? "border-brand-900 bg-brand-900 text-white" : "border-brand-300 text-brand-900 hover:border-brand-700"}`}>
            {wantsBooth ? "\u2713 " : ""}PHOTO BOOTH
          </button>
          <button onClick={() => { setWantsContent(!wantsContent); if (wantsContent) setContentPkgId(""); }}
            className={`flex-1 py-4 text-[11px] tracking-[0.15em] border rounded-lg transition-all ${wantsContent ? "border-brand-900 bg-brand-900 text-white" : "border-brand-300 text-brand-900 hover:border-brand-700"}`}>
            {wantsContent ? "\u2713 " : ""}CONTENT CREATION
          </button>
        </div>
      </div>

      {(!wantsBooth && !wantsContent) && (
        <p className="text-center text-[14px] text-brand-400 italic py-8">Select one or both services above to start building your quote</p>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: packages + add-ons */}
        <div className="space-y-6">
          {wantsBooth && (
            <div>
              {renderPackagePicker(boothPackages, boothPkgId, setBoothPkgId, "Photo Booth Package")}
              {/* Hours for hourly booth packages */}
              {bPkg && bPkg.isHourly && (
                <div className="mt-3 flex items-center gap-3">
                  <p className="text-[11px] text-brand-500">Hours:</p>
                  <button onClick={() => setHours(Math.max(bPkg.minimumHours || 1, hours - 1))} className="w-8 h-8 border border-brand-300 rounded">&minus;</button>
                  <span className="text-lg font-light w-8 text-center">{hours}</span>
                  <button onClick={() => setHours(Math.min(12, hours + 1))} className="w-8 h-8 border border-brand-300 rounded">+</button>
                  {bPkg.minimumHours && <span className="text-[11px] text-brand-500">({bPkg.minimumHours}-hr minimum)</span>}
                </div>
              )}
              {renderAddOns(boothAddOns, "Booth Add-ons")}
            </div>
          )}

          {wantsContent && (
            <div>
              {renderPackagePicker(contentPackages, contentPkgId, setContentPkgId, "Content Creation Package")}
              {/* Hours for hourly content packages */}
              {cPkg && cPkg.isHourly && (
                <div className="mt-3 flex items-center gap-3">
                  <p className="text-[11px] text-brand-500">Hours:</p>
                  <button onClick={() => setHours(Math.max(cPkg.minimumHours || 1, hours - 1))} className="w-8 h-8 border border-brand-300 rounded">&minus;</button>
                  <span className="text-lg font-light w-8 text-center">{hours}</span>
                  <button onClick={() => setHours(Math.min(12, hours + 1))} className="w-8 h-8 border border-brand-300 rounded">+</button>
                  {cPkg.minimumHours && <span className="text-[11px] text-brand-500">({cPkg.minimumHours}-hr minimum)</span>}
                </div>
              )}
              {renderAddOns(contentAddOns, "Content Add-ons")}
            </div>
          )}

          {(wantsBooth || wantsContent) && renderAddOns(sharedAddOns, "General Add-ons")}
        </div>

        {/* Right: summary + contact */}
        {(wantsBooth || wantsContent) && (
          <div>
            {/* Quote summary */}
            <div className="bg-white border border-brand-200 rounded-lg p-6 mb-6 sticky top-24">
              <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-4">Your Estimate</p>
              {(!boothPkgId && !contentPkgId) ? (
                <p className="text-[13px] text-brand-400 italic">Select a package to see your estimate</p>
              ) : (
                <>
                  <div className="space-y-2 mb-4 text-[13px]">
                    {wantsBooth && bPkg && (
                      <div className="flex justify-between">
                        <span className="text-brand-900">{bPkg.name}{bPkg.isHourly ? ` (${hours}hrs)` : ""}</span>
                        <span className="font-medium">${Math.round((bPkg.isHourly ? bPkg.priceCents * Math.max(hours, bPkg.minimumHours || 1) : bPkg.priceCents) / 100)}</span>
                      </div>
                    )}
                    {wantsContent && cPkg && (
                      <div className="flex justify-between">
                        <span className="text-brand-900">{cPkg.name}{cPkg.isHourly ? ` (${hours}hrs)` : ""}</span>
                        <span className="font-medium">${Math.round((cPkg.isHourly ? cPkg.priceCents * Math.max(hours, cPkg.minimumHours || 1) : cPkg.priceCents) / 100)}</span>
                      </div>
                    )}
                    {Object.entries(addonQty).filter(([,q]) => q > 0).map(([id, qty]) => {
                      const a = addOns.find(x => x.id === id);
                      if (!a) return null;
                      const cost = a.unit === "per_hour" ? a.priceCents * (parseInt(eventHours) || hours) : a.priceCents * qty;
                      return <div key={id} className="flex justify-between text-[12px] text-brand-600"><span>{a.name} x{qty}</span><span>${Math.round(cost / 100)}</span></div>;
                    })}
                  </div>
                  <div className="border-t border-brand-200 pt-3">
                    <div className="flex justify-between text-[16px] font-medium text-brand-900"><span>Estimated Total</span><span>${total}</span></div>
                    <div className="flex justify-between text-[12px] text-brand-500 mt-1"><span>{depositPercent}% Deposit to Book</span><span>${deposit}</span></div>
                  </div>
                </>
              )}
            </div>

            {/* Contact info */}
            <div className="bg-white border border-brand-200 rounded-lg p-6">
              <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-4">Step 2: Your Info</p>
              <div className="space-y-3">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name *" className="w-full border border-brand-300 px-4 py-3 text-[13px] rounded-lg focus:outline-none focus:border-brand-700" />
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email *" className="w-full border border-brand-300 px-4 py-3 text-[13px] rounded-lg focus:outline-none focus:border-brand-700" />
                <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone Number" className="w-full border border-brand-300 px-4 py-3 text-[13px] rounded-lg focus:outline-none focus:border-brand-700" />
                <div>
                  <label className="block text-[11px] text-brand-500 mb-1">Date of Event</label>
                  <input value={eventDate} onChange={e => setEventDate(e.target.value)} type="date" className="w-full border border-brand-300 px-4 py-3 text-[13px] rounded-lg focus:outline-none focus:border-brand-700" />
                </div>
                <select value={eventType} onChange={e => setEventType(e.target.value)} className="w-full border border-brand-300 px-4 py-3 text-[13px] rounded-lg focus:outline-none focus:border-brand-700">
                  <option value="">Type of Event</option>
                  {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <select value={eventHours} onChange={e => setEventHours(e.target.value)} className="w-full border border-brand-300 px-4 py-3 text-[13px] rounded-lg focus:outline-none focus:border-brand-700">
                  <option value="">Hours of Event (optional)</option>
                  <option value="2">2 Hours</option>
                  <option value="3">3 Hours</option>
                  <option value="4">4 Hours</option>
                  <option value="5">5 Hours</option>
                  <option value="6">6 Hours</option>
                  <option value="8">8 Hours (Full Day)</option>
                  <option value="10">10+ Hours</option>
                </select>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Tell us about your event: theme, venue, special requests..."
                  className="w-full border border-brand-300 px-4 py-3 text-[13px] rounded-lg focus:outline-none focus:border-brand-700 resize-none" />
              </div>
              <button onClick={handleSubmit} disabled={submitting || !name || !email || (!boothPkgId && !contentPkgId)}
                className="w-full mt-4 bg-brand-900 text-white py-3.5 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors disabled:opacity-40 rounded-lg">
                {submitting ? "SUBMITTING..." : "SUBMIT QUOTE REQUEST"}
              </button>
              <p className="text-[11px] text-brand-500 text-center mt-3">We&apos;ll send a detailed proposal within 24 hours.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
