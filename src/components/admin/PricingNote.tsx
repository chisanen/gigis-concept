"use client";

export default function PricingNote() {
  return (
    <div style={{ padding: "16px 20px", background: "#F8F5F1", borderRadius: 8, border: "1px solid #E8E0D8", marginBottom: 16 }}>
      <p style={{ fontSize: 14, color: "#3A2D28", fontWeight: 600, marginBottom: 8 }}>
        Where to edit package and add-on prices
      </p>
      <p style={{ fontSize: 13, color: "#76220B", lineHeight: 1.7 }}>
        All package prices are managed in <strong>Studio &gt; Packages</strong> and add-on prices in <strong>Studio &gt; Add-Ons</strong>.
        Changes there automatically update on the pricing page, quote calculator, homepage FAQ, and all quotes.
      </p>
    </div>
  );
}
