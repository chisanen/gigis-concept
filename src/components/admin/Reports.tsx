"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ReportData {
  totalLeads: number;
  totalBookings: number;
  totalInvoicedCents: number;
  totalPaidCents: number;
  outstandingCents: number;
  blogPosts: number;
  testimonials: number;
  leadsBySource: Record<string, number>;
  bookingsByStatus: Record<string, number>;
}

export const StudioReports: React.FC = () => {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/leads?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0, docs: [] })),
      fetch("/api/leads?limit=100").then(r => r.json()).catch(() => ({ docs: [] })),
      fetch("/api/bookings?limit=100").then(r => r.json()).catch(() => ({ totalDocs: 0, docs: [] })),
      fetch("/api/invoices?limit=100").then(r => r.json()).catch(() => ({ totalDocs: 0, docs: [] })),
      fetch("/api/blog-posts?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
      fetch("/api/testimonials?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
    ]).then(([leadsCount, leadsAll, bookings, invoices, blog, testimonials]) => {
      const leadsBySource: Record<string, number> = {};
      (leadsAll.docs || []).forEach((l: Record<string, unknown>) => {
        const src = (l.source as string) || "website";
        leadsBySource[src] = (leadsBySource[src] || 0) + 1;
      });

      const bookingsByStatus: Record<string, number> = {};
      (bookings.docs || []).forEach((b: Record<string, unknown>) => {
        const st = (b.status as string) || "inquiry";
        bookingsByStatus[st] = (bookingsByStatus[st] || 0) + 1;
      });

      let totalInvoiced = 0, totalPaid = 0;
      (invoices.docs || []).forEach((inv: Record<string, unknown>) => {
        totalInvoiced += (inv.totalCents as number) || 0;
        totalPaid += (inv.amountPaidCents as number) || 0;
      });

      setData({
        totalLeads: leadsCount.totalDocs || 0,
        totalBookings: bookings.totalDocs || 0,
        totalInvoicedCents: totalInvoiced,
        totalPaidCents: totalPaid,
        outstandingCents: totalInvoiced - totalPaid,
        blogPosts: blog.totalDocs || 0,
        testimonials: testimonials.totalDocs || 0,
        leadsBySource,
        bookingsByStatus,
      });
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#A48374" }}>Loading reports...</div>;
  if (!data) return null;

  const fmt = (cents: number) => `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

  const sourceData = Object.entries(data.leadsBySource).map(([name, value]) => ({ name, value }));
  const statusData = Object.entries(data.bookingsByStatus).map(([name, value]) => ({ name, value }));

  return (
    <div style={{ padding: "32px 40px", fontFamily: "'Jost', system-ui, sans-serif" }}>
      <h2 style={{ fontSize: "22px", fontWeight: 300, color: "#3A2D28", margin: "0 0 24px" }}>Reports</h2>

      {/* Revenue cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "32px" }}>
        {[
          { label: "Total Invoiced", value: fmt(data.totalInvoicedCents) },
          { label: "Total Paid", value: fmt(data.totalPaidCents) },
          { label: "Outstanding", value: fmt(data.outstandingCents) },
        ].map(card => (
          <div key={card.label} style={{ background: "#fff", border: "1px solid #D1C7BD", borderRadius: "10px", padding: "20px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#A48374", textTransform: "uppercase" as const, margin: "0 0 6px" }}>{card.label}</p>
            <p style={{ fontSize: "28px", fontWeight: 300, color: "#3A2D28", margin: 0 }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ background: "#fff", border: "1px solid #D1C7BD", borderRadius: "10px", padding: "24px" }}>
          <h3 style={{ fontSize: "13px", letterSpacing: "0.12em", color: "#3A2D28", textTransform: "uppercase" as const, margin: "0 0 20px", fontWeight: 500 }}>Leads by Source</h3>
          {sourceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EDE6" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#A48374" }} />
                <YAxis tick={{ fontSize: 11, fill: "#A48374" }} />
                <Tooltip />
                <Bar dataKey="value" fill="#3A2D28" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ color: "#A48374", fontSize: "13px", textAlign: "center" as const, padding: "40px 0" }}>No lead data yet</p>
          )}
        </div>

        <div style={{ background: "#fff", border: "1px solid #D1C7BD", borderRadius: "10px", padding: "24px" }}>
          <h3 style={{ fontSize: "13px", letterSpacing: "0.12em", color: "#3A2D28", textTransform: "uppercase" as const, margin: "0 0 20px", fontWeight: 500 }}>Bookings by Status</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EDE6" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#A48374" }} />
                <YAxis tick={{ fontSize: 11, fill: "#A48374" }} />
                <Tooltip />
                <Bar dataKey="value" fill="#A48374" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ color: "#A48374", fontSize: "13px", textAlign: "center" as const, padding: "40px 0" }}>No booking data yet</p>
          )}
        </div>
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginTop: "20px" }}>
        {[
          { label: "Total Leads", value: data.totalLeads },
          { label: "Total Bookings", value: data.totalBookings },
          { label: "Blog Posts", value: data.blogPosts },
          { label: "Testimonials", value: data.testimonials },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1px solid #D1C7BD", borderRadius: "10px", padding: "16px", textAlign: "center" as const }}>
            <p style={{ fontSize: "24px", fontWeight: 300, color: "#3A2D28", margin: "0 0 4px" }}>{s.value}</p>
            <p style={{ fontSize: "10px", letterSpacing: "0.1em", color: "#A48374", textTransform: "uppercase" as const, margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
