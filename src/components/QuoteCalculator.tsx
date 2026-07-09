"use client";

import { useState } from "react";

const BOOTH_PACKAGES = [
  { id: "good-angle", name: "The Good Angle", price: 290, unit: "3-hr min", desc: "Custom Backdrop · On-Site Attendant · Unlimited Prints · Digital Gallery (24hr)" },
  { id: "extended", name: "5-Hour Extended Coverage", price: 450, unit: "5 hours", desc: "Everything in The Good Angle + extended coverage + premium backdrops", badge: "Popular" },
];

const CONTENT_PACKAGES = [
  { id: "basic", name: "Basic Package", price: 60, unit: "/hr (2-hr min)", desc: "On-site capture · All raw footage · 1 free short edit", hourly: true },
  { id: "storyteller", name: "The Storyteller", price: 550, unit: "flat", desc: "4-hr shoot · 3 long + 2 short videos · Raw footage · 48-hr delivery", badge: "Popular" },
  { id: "signature", name: "Gigi's Signature Full-Day", price: 800, unit: "flat", desc: "8-hr shoot · 5+ edited videos · Complete raw footage · 7-10 day delivery", badge: "Wedding Favorite" },
];

const BOOTH_ADDONS = [
  { id: "extra-time", name: "Additional Time", price: 97, unit: "/hr" },
  { id: "spandex", name: "Classic Spandex Backdrop", price: 25 },
  { id: "curtain", name: "Curtain Backdrop", price: 25, note: "up to $50" },
  { id: "flower", name: "Flower Wall Backdrop", price: 50, note: "up to $100" },
];

const CONTENT_ADDONS = [
  { id: "short-edit", name: "Short Video Edit", price: 30 },
  { id: "long-edit", name: "Long Video Edit", price: 40 },
  { id: "rush", name: "Rush Delivery (24hr)", price: 50 },
];

const SHARED_ADDONS = [
  { id: "assistant", name: "On-Site Assistant", price: 10, unit: "/hr" },
];

const EVENT_TYPES = ["Wedding", "Birthday", "Corporate Event", "Baby Shower", "Graduation", "Brand Shoot", "Anniversary", "Other"];

export function QuoteCalculator() {
  const [wantsBooth, setWantsBooth] = useState(false);
  const [wantsContent, setWantsContent] = useState(false);
  const [boothPkg, setBoothPkg] = useState("");
  const [contentPkg, setContentPkg] = useState("");
  const [hours, setHours] = useState(3);
  const [addons, setAddons] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventHours, setEventHours] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const bPkg = BOOTH_PACKAGES.find(p => p.id === boothPkg);
  const cPkg = CONTENT_PACKAGES.find(p => p.id === contentPkg);

  // Calc total
  let total = 0;
  if (wantsBooth && bPkg) total += bPkg.price;
  if (wantsContent && cPkg) {
    total += cPkg.unit.includes("/hr") ? cPkg.price * Math.max(hours, 2) : cPkg.price;
  }
  Object.entries(addons).forEach(([id, qty]) => {
    if (qty <= 0) return;
    const all = [...BOOTH_ADDONS, ...CONTENT_ADDONS, ...SHARED_ADDONS];
    const a = all.find(x => x.id === id);
    if (a) total += ("unit" in a && a.unit === "/hr") ? a.price * (parseInt(eventHours) || hours) : a.price * qty;
  });
  const deposit = Math.round(total * 0.5);

  const toggleAddon = (id: string, delta: number) => {
    setAddons(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  async function handleSubmit() {
    if (!name || !email || (!boothPkg && !contentPkg)) return;
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
      message: `QUOTE REQUEST\n\nServices: ${services.join(" + ")}\nEvent Type: ${eventType}\nEvent Hours: ${eventHours || "Not specified"}\nEstimated Total: $${total}\n50% Deposit: $${deposit}\n\n${description}`,
      status: "new",
    };

    await Promise.all([
      fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
      fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, stage: "new", source: "website" }) }),
      fetch("/api/send-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "inquiry_auto_reply", data: { email, firstName: data.firstName } }) }),
      fetch("/api/send-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "owner_notification", data: { Name: name, Email: email, Phone: phone, "Event Date": eventDate, "Event Type": eventType, Service: data.serviceRequired, Packages: services.join(" + "), "Estimated Total": `$${total}`, "50% Deposit": `$${deposit}`, Description: description } }) }),
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
          <p className="text-[12px] text-brand-500">50% deposit: ${deposit}</p>
        </div>
        <button onClick={() => { setSubmitted(false); setBoothPkg(""); setContentPkg(""); setAddons({}); setName(""); setEmail(""); setPhone(""); setDescription(""); setWantsBooth(false); setWantsContent(false); }}
          className="block mx-auto mt-8 border border-brand-900 px-8 py-3 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all">
          BUILD ANOTHER QUOTE
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step 1: Choose services */}
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.2em] text-brand-500 uppercase mb-4">Step 1 — What services do you need?</p>
        <div className="flex gap-3">
          <button onClick={() => { setWantsBooth(!wantsBooth); if (wantsBooth) setBoothPkg(""); }}
            className={`flex-1 py-4 text-[11px] tracking-[0.15em] border rounded-lg transition-all ${wantsBooth ? "border-brand-900 bg-brand-900 text-white" : "border-brand-300 text-brand-900 hover:border-brand-700"}`}>
            {wantsBooth ? "✓ " : ""}PHOTO BOOTH
          </button>
          <button onClick={() => { setWantsContent(!wantsContent); if (wantsContent) setContentPkg(""); }}
            className={`flex-1 py-4 text-[11px] tracking-[0.15em] border rounded-lg transition-all ${wantsContent ? "border-brand-900 bg-brand-900 text-white" : "border-brand-300 text-brand-900 hover:border-brand-700"}`}>
            {wantsContent ? "✓ " : ""}CONTENT CREATION
          </button>
        </div>
      </div>

      {(!wantsBooth && !wantsContent) && (
        <p className="text-center text-[14px] text-brand-400 italic py-8">Select one or both services above to start building your quote</p>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left — packages + add-ons */}
        <div className="space-y-6">
          {/* Booth packages */}
          {wantsBooth && (
            <div>
              <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-3">Photo Booth Package</p>
              {BOOTH_PACKAGES.map(p => (
                <button key={p.id} onClick={() => setBoothPkg(p.id)}
                  className={`w-full text-left p-4 mb-2 border rounded-lg transition-all ${boothPkg === p.id ? "border-brand-900 bg-brand-50" : "border-brand-200 bg-white hover:border-brand-400"}`}>
                  <div className="flex justify-between items-start">
                    <div><p className="text-[14px] text-brand-900 font-medium">{p.name}</p><p className="text-[11px] text-brand-500 mt-1">{p.desc}</p></div>
                    <div className="text-right ml-4"><p className="text-lg text-brand-900">${p.price}</p><p className="text-[10px] text-brand-500">{p.unit}</p>
                      {p.badge && <span className="inline-block mt-1 text-[9px] bg-brand-900 text-white px-2 py-0.5 rounded-full">{p.badge}</span>}
                    </div>
                  </div>
                </button>
              ))}
              {/* Booth add-ons */}
              <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-2 mt-4">Booth Add-ons</p>
              {BOOTH_ADDONS.map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-white border border-brand-200 rounded-lg mb-1">
                  <div><p className="text-[12px] text-brand-900">{a.name}</p><p className="text-[10px] text-brand-500">${a.price}{"unit" in a ? a.unit : ""} {a.note ? `(${a.note})` : ""}</p></div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleAddon(a.id, -1)} className="w-7 h-7 border border-brand-300 rounded text-sm">−</button>
                    <span className="w-5 text-center text-[12px]">{addons[a.id] || 0}</span>
                    <button onClick={() => toggleAddon(a.id, 1)} className="w-7 h-7 border border-brand-300 rounded text-sm">+</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Content packages */}
          {wantsContent && (
            <div>
              <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-3">Content Creation Package</p>
              {CONTENT_PACKAGES.map(p => (
                <button key={p.id} onClick={() => setContentPkg(p.id)}
                  className={`w-full text-left p-4 mb-2 border rounded-lg transition-all ${contentPkg === p.id ? "border-brand-900 bg-brand-50" : "border-brand-200 bg-white hover:border-brand-400"}`}>
                  <div className="flex justify-between items-start">
                    <div><p className="text-[14px] text-brand-900 font-medium">{p.name}</p><p className="text-[11px] text-brand-500 mt-1">{p.desc}</p></div>
                    <div className="text-right ml-4"><p className="text-lg text-brand-900">${p.price}</p><p className="text-[10px] text-brand-500">{p.unit}</p>
                      {p.badge && <span className="inline-block mt-1 text-[9px] bg-brand-900 text-white px-2 py-0.5 rounded-full">{p.badge}</span>}
                    </div>
                  </div>
                </button>
              ))}
              {/* Hours for hourly package */}
              {cPkg && cPkg.unit.includes("/hr") && (
                <div className="mt-3 flex items-center gap-3">
                  <p className="text-[11px] text-brand-500">Hours:</p>
                  <button onClick={() => setHours(Math.max(2, hours - 1))} className="w-8 h-8 border border-brand-300 rounded">−</button>
                  <span className="text-lg font-light w-8 text-center">{hours}</span>
                  <button onClick={() => setHours(Math.min(12, hours + 1))} className="w-8 h-8 border border-brand-300 rounded">+</button>
                  <span className="text-[11px] text-brand-500">(2-hr minimum)</span>
                </div>
              )}
              {/* Content add-ons */}
              <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-2 mt-4">Content Add-ons</p>
              {CONTENT_ADDONS.map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-white border border-brand-200 rounded-lg mb-1">
                  <div><p className="text-[12px] text-brand-900">{a.name}</p><p className="text-[10px] text-brand-500">${a.price}</p></div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleAddon(a.id, -1)} className="w-7 h-7 border border-brand-300 rounded text-sm">−</button>
                    <span className="w-5 text-center text-[12px]">{addons[a.id] || 0}</span>
                    <button onClick={() => toggleAddon(a.id, 1)} className="w-7 h-7 border border-brand-300 rounded text-sm">+</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Shared add-ons */}
          {(wantsBooth || wantsContent) && (
            <div>
              <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-2">General Add-ons</p>
              {SHARED_ADDONS.map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-white border border-brand-200 rounded-lg mb-1">
                  <div><p className="text-[12px] text-brand-900">{a.name}</p><p className="text-[10px] text-brand-500">${a.price}{"unit" in a ? a.unit : ""}</p></div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleAddon(a.id, -1)} className="w-7 h-7 border border-brand-300 rounded text-sm">−</button>
                    <span className="w-5 text-center text-[12px]">{addons[a.id] || 0}</span>
                    <button onClick={() => toggleAddon(a.id, 1)} className="w-7 h-7 border border-brand-300 rounded text-sm">+</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — summary + contact */}
        {(wantsBooth || wantsContent) && (
          <div>
            {/* Quote summary */}
            <div className="bg-white border border-brand-200 rounded-lg p-6 mb-6 sticky top-24">
              <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-4">Your Estimate</p>
              {(!boothPkg && !contentPkg) ? (
                <p className="text-[13px] text-brand-400 italic">Select a package to see your estimate</p>
              ) : (
                <>
                  <div className="space-y-2 mb-4 text-[13px]">
                    {wantsBooth && bPkg && (
                      <div className="flex justify-between"><span className="text-brand-900">{bPkg.name}</span><span className="font-medium">${bPkg.price}</span></div>
                    )}
                    {wantsContent && cPkg && (
                      <div className="flex justify-between"><span className="text-brand-900">{cPkg.name}{cPkg.unit.includes("/hr") ? ` (${hours}hrs)` : ""}</span><span className="font-medium">${cPkg.unit.includes("/hr") ? cPkg.price * Math.max(hours, 2) : cPkg.price}</span></div>
                    )}
                    {Object.entries(addons).filter(([,q]) => q > 0).map(([id, qty]) => {
                      const a = [...BOOTH_ADDONS, ...CONTENT_ADDONS, ...SHARED_ADDONS].find(x => x.id === id);
                      if (!a) return null;
                      const cost = ("unit" in a && a.unit === "/hr") ? a.price * (parseInt(eventHours) || hours) : a.price * qty;
                      return <div key={id} className="flex justify-between text-[12px] text-brand-600"><span>{a.name} x{qty}</span><span>${cost}</span></div>;
                    })}
                  </div>
                  <div className="border-t border-brand-200 pt-3">
                    <div className="flex justify-between text-[16px] font-medium text-brand-900"><span>Estimated Total</span><span>${total}</span></div>
                    <div className="flex justify-between text-[12px] text-brand-500 mt-1"><span>50% Deposit to Book</span><span>${deposit}</span></div>
                  </div>
                </>
              )}
            </div>

            {/* Contact info */}
            <div className="bg-white border border-brand-200 rounded-lg p-6">
              <p className="text-[10px] tracking-[0.15em] text-brand-500 uppercase mb-4">Step 2 — Your Info</p>
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
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Tell us about your event — theme, venue, special requests..."
                  className="w-full border border-brand-300 px-4 py-3 text-[13px] rounded-lg focus:outline-none focus:border-brand-700 resize-none" />
              </div>
              <button onClick={handleSubmit} disabled={submitting || !name || !email || (!boothPkg && !contentPkg)}
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
