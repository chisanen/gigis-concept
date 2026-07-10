"use client";

import { useEffect, useState } from "react";

interface Pkg { id: string; name: string; priceCents: number; priceDisplay: string; category: string; }
interface AddOn { id: string; name: string; priceCents: number; priceDisplay: string; unit: string; }

export const QuoteBuilder: React.FC = () => {
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [selectedPkg, setSelectedPkg] = useState<string>("");
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>({});
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [depositPercent, setDepositPercent] = useState(50);

  useEffect(() => {
    Promise.all([
      fetch("/api/packages?limit=20").then(r => r.json()).catch(() => ({ docs: [] })),
      fetch("/api/add-ons?limit=20").then(r => r.json()).catch(() => ({ docs: [] })),
      fetch("/api/pricing").then(r => r.json()).catch(() => null),
    ]).then(([p, a, pricing]) => {
      setPackages(p.docs || []);
      setAddOns(a.docs || []);
      if (pricing?.depositPercent) setDepositPercent(pricing.depositPercent);
    });
  }, []);

  const pkg = packages.find(p => p.id === selectedPkg);
  const lineItems: { label: string; qty: number; unitCents: number; totalCents: number }[] = [];

  if (pkg) {
    lineItems.push({ label: pkg.name, qty: 1, unitCents: pkg.priceCents, totalCents: pkg.priceCents });
  }

  Object.entries(selectedAddOns).forEach(([id, qty]) => {
    if (qty > 0) {
      const addon = addOns.find(a => a.id === id);
      if (addon) lineItems.push({ label: addon.name, qty, unitCents: addon.priceCents, totalCents: addon.priceCents * qty });
    }
  });

  const subtotal = lineItems.reduce((s, i) => s + i.totalCents, 0);
  const deposit = Math.round(subtotal * depositPercent / 100);
  const fmt = (c: number) => `$${(c / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  async function saveQuote() {
    if (!clientName || !selectedPkg) return;
    setSaving(true);
    const num = `Q-${Date.now().toString(36).toUpperCase()}`;
    await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quoteNumber: num, clientName, clientEmail,
        lineItems, subtotalCents: subtotal, discountCents: 0,
        totalCents: subtotal, depositCents: deposit,
        status: "draft", notes: "",
      }),
    }).catch(() => {});
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div style={{ padding: "32px 40px", fontFamily: "'Jost', system-ui, sans-serif" }}>
      <h2 style={{ fontSize: "22px", fontWeight: 300, color: "#3A2D28", margin: "0 0 24px" }}>Quote Builder</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Left — config */}
        <div style={{ background: "#fff", border: "1px solid #D1C7BD", borderRadius: "10px", padding: "24px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", color: "#A48374", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Client Name</label>
            <input value={clientName} onChange={e => setClientName(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid #D1C7BD", borderRadius: "6px", marginTop: "4px", fontSize: "14px" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", color: "#A48374", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Client Email</label>
            <input value={clientEmail} onChange={e => setClientEmail(e.target.value)} type="email" style={{ width: "100%", padding: "10px", border: "1px solid #D1C7BD", borderRadius: "6px", marginTop: "4px", fontSize: "14px" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", color: "#A48374", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Package</label>
            <select value={selectedPkg} onChange={e => setSelectedPkg(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid #D1C7BD", borderRadius: "6px", marginTop: "4px", fontSize: "14px" }}>
              <option value="">Select a package...</option>
              {packages.map(p => <option key={p.id} value={p.id}>{p.name} — {p.priceDisplay} ({p.category.replace("_", " ")})</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: "12px", color: "#A48374", letterSpacing: "0.1em", textTransform: "uppercase" as const, display: "block", marginBottom: "8px" }}>Add-ons</label>
            {addOns.map(a => (
              <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #F1EDE6" }}>
                <span style={{ fontSize: "13px", color: "#3A2D28" }}>{a.name} ({a.priceDisplay})</span>
                <input type="number" min={0} max={10} value={selectedAddOns[a.id] || 0}
                  onChange={e => setSelectedAddOns({ ...selectedAddOns, [a.id]: parseInt(e.target.value) || 0 })}
                  style={{ width: "50px", padding: "4px", border: "1px solid #D1C7BD", borderRadius: "4px", textAlign: "center" as const, fontSize: "13px" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right — preview */}
        <div style={{ background: "#fff", border: "1px solid #D1C7BD", borderRadius: "10px", padding: "24px" }}>
          <h3 style={{ fontSize: "14px", color: "#3A2D28", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "16px" }}>Quote Preview</h3>
          {clientName && <p style={{ fontSize: "14px", color: "#5C463B", marginBottom: "12px" }}>For: <strong>{clientName}</strong></p>}

          {lineItems.length === 0 ? (
            <p style={{ color: "#A48374", fontSize: "13px", fontStyle: "italic" }}>Select a package to start building your quote</p>
          ) : (
            <>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #D1C7BD" }}>
                    <th style={{ textAlign: "left" as const, padding: "6px 0", color: "#A48374", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Item</th>
                    <th style={{ textAlign: "right" as const, padding: "6px 0", color: "#A48374", fontSize: "10px" }}>Qty</th>
                    <th style={{ textAlign: "right" as const, padding: "6px 0", color: "#A48374", fontSize: "10px" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #F1EDE6" }}>
                      <td style={{ padding: "8px 0", color: "#3A2D28" }}>{item.label}</td>
                      <td style={{ padding: "8px 0", textAlign: "right" as const, color: "#5C463B" }}>{item.qty}</td>
                      <td style={{ padding: "8px 0", textAlign: "right" as const, color: "#3A2D28", fontWeight: 500 }}>{fmt(item.totalCents)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "2px solid #3A2D28" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 500, color: "#3A2D28" }}>
                  <span>Total</span><span>{fmt(subtotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#A48374", marginTop: "4px" }}>
                  <span>{depositPercent}% Deposit</span><span>{fmt(deposit)}</span>
                </div>
              </div>
            </>
          )}

          <button onClick={saveQuote} disabled={saving || !clientName || !selectedPkg}
            style={{
              marginTop: "20px", width: "100%", padding: "12px",
              background: saved ? "#2E7D32" : "#3A2D28", color: "#F1EDE6",
              border: "none", borderRadius: "999px", fontSize: "12px",
              letterSpacing: "0.15em", cursor: saving || !clientName ? "not-allowed" : "pointer",
              opacity: !clientName || !selectedPkg ? 0.4 : 1,
            }}>
            {saving ? "SAVING..." : saved ? "QUOTE SAVED ✓" : "SAVE QUOTE AS DRAFT"}
          </button>
        </div>
      </div>
    </div>
  );
};
