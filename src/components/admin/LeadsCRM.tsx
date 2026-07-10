"use client";

import { useEffect, useState } from "react";
import { AdminErrorBoundary } from "./AdminErrorBoundary";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeFetch(url: string, fallback: any = { docs: [], totalDocs: 0 }): Promise<any> {
  return fetch(url)
    .then(r => { if (!r.ok) return fallback; return r.json().catch(() => fallback); })
    .catch(() => fallback);
}

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  eventDate: string;
  serviceRequired: string;
  stage: string;
  source: string;
  valueCents: number;
}

const stages = ["new", "contacted", "consultation", "quote_sent", "booked", "lost"];
const stageLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  consultation: "Consultation",
  quote_sent: "Quote Sent",
  booked: "Booked",
  lost: "Lost",
};
const stageColors: Record<string, string> = {
  new: "#3A2D28",
  contacted: "#5C463B",
  consultation: "#7C6253",
  quote_sent: "#A48374",
  booked: "#2E7D32",
  lost: "#9E9E9E",
};

export const LeadsCRM: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"board" | "list">("board");

  useEffect(() => {
    safeFetch("/api/leads?limit=100&sort=-createdAt", { docs: [] })
      .then((d) => setLeads(d.docs || []))
      .finally(() => setLoading(false));
  }, []);

  async function moveStage(id: string, newStage: string) {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: newStage }),
      });
      if (!res.ok) { console.error("PATCH failed:", res.status); return; }
      await res.json().catch(() => null);
    } catch (e) {
      console.error("moveStage error:", e);
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage: newStage } : l)));
  }

  if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#A48374" }}>Loading CRM...</div>;

  return (
    <AdminErrorBoundary name="LeadsCRM">
    <div style={{ padding: "16px", fontFamily: "'Jost', system-ui, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 300, color: "#3A2D28", margin: 0 }}>Leads Pipeline</h2>
          <p style={{ fontSize: "13px", color: "#A48374", marginTop: "4px" }}>{leads.length} total leads</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setView("board")}
            style={{
              padding: "6px 16px", fontSize: "11px", letterSpacing: "0.1em",
              background: view === "board" ? "#3A2D28" : "transparent",
              color: view === "board" ? "#F1EDE6" : "#3A2D28",
              border: "1px solid #3A2D28", borderRadius: "999px", cursor: "pointer",
            }}
          >BOARD</button>
          <button
            onClick={() => setView("list")}
            style={{
              padding: "6px 16px", fontSize: "11px", letterSpacing: "0.1em",
              background: view === "list" ? "#3A2D28" : "transparent",
              color: view === "list" ? "#F1EDE6" : "#3A2D28",
              border: "1px solid #3A2D28", borderRadius: "999px", cursor: "pointer",
            }}
          >LIST</button>
          <a
            href="/admin/collections/leads/create"
            style={{
              padding: "6px 16px", fontSize: "11px", letterSpacing: "0.1em",
              background: "#3A2D28", color: "#F1EDE6",
              border: "1px solid #3A2D28", borderRadius: "999px", textDecoration: "none",
            }}
          >+ NEW LEAD</a>
        </div>
      </div>

      {view === "board" ? (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${stages.length}, 1fr)`, gap: "12px", overflowX: "auto" }}>
          {stages.map((stage) => {
            const stageLeads = leads.filter((l) => l.stage === stage);
            return (
              <div key={stage} style={{ background: "#F1EDE6", borderRadius: "10px", padding: "12px", minHeight: "300px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: stageColors[stage], textTransform: "uppercase" as const, fontWeight: 500 }}>
                    {stageLabels[stage]}
                  </span>
                  <span style={{
                    fontSize: "10px", background: stageColors[stage], color: "#fff",
                    borderRadius: "999px", padding: "1px 8px", minWidth: "18px", textAlign: "center" as const,
                  }}>{stageLeads.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: "8px" }}>
                  {stageLeads.map((lead) => (
                    <a
                      key={lead.id}
                      href={`/admin/collections/leads/${lead.id}`}
                      style={{
                        background: "#FFFFFF", borderRadius: "8px", padding: "12px",
                        textDecoration: "none", display: "block",
                        borderLeft: `3px solid ${stageColors[stage]}`,
                      }}
                    >
                      <p style={{ fontSize: "13px", color: "#3A2D28", fontWeight: 500, margin: "0 0 4px" }}>
                        {lead.firstName} {lead.lastName}
                      </p>
                      <p style={{ fontSize: "11px", color: "#A48374", margin: "0 0 4px" }}>
                        {lead.serviceRequired || "—"} · {lead.source || "website"}
                      </p>
                      {lead.eventDate && (
                        <p style={{ fontSize: "10px", color: "#7C6253", margin: 0 }}>
                          {new Date(lead.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      )}
                      {/* Stage move buttons */}
                      <div style={{ marginTop: "8px", display: "flex", gap: "4px", flexWrap: "wrap" as const }}>
                        {stages.filter((s) => s !== stage).slice(0, 3).map((s) => (
                          <button
                            key={s}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); moveStage(lead.id, s); }}
                            style={{
                              fontSize: "9px", padding: "2px 6px", background: "#F1EDE6",
                              border: "1px solid #D1C7BD", borderRadius: "4px", cursor: "pointer",
                              color: "#7C6253", letterSpacing: "0.05em",
                            }}
                          >→ {stageLabels[s]}</button>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ background: "#FFFFFF", border: "1px solid #D1C7BD", borderRadius: "10px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #D1C7BD" }}>
                {["Name", "Email", "Service", "Event Date", "Stage", "Source"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", fontSize: "10px", letterSpacing: "0.12em", color: "#A48374", textTransform: "uppercase" as const, textAlign: "left" as const, fontWeight: 500 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: "1px solid #F1EDE6" }}>
                  <td style={{ padding: "10px 16px" }}>
                    <a href={`/admin/collections/leads/${lead.id}`} style={{ color: "#3A2D28", textDecoration: "none", fontSize: "13px" }}>
                      {lead.firstName} {lead.lastName}
                    </a>
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: "12px", color: "#7C6253" }}>{lead.email}</td>
                  <td style={{ padding: "10px 16px", fontSize: "12px", color: "#7C6253" }}>{lead.serviceRequired}</td>
                  <td style={{ padding: "10px 16px", fontSize: "12px", color: "#7C6253" }}>
                    {lead.eventDate ? new Date(lead.eventDate).toLocaleDateString() : "—"}
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <span style={{
                      fontSize: "10px", padding: "2px 8px", borderRadius: "999px",
                      background: stageColors[lead.stage] || "#D1C7BD", color: "#fff",
                      letterSpacing: "0.08em", textTransform: "uppercase" as const,
                    }}>{stageLabels[lead.stage] || lead.stage}</span>
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: "12px", color: "#A48374" }}>{lead.source || "—"}</td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr><td colSpan={6} style={{ padding: "40px", textAlign: "center" as const, color: "#A48374", fontSize: "13px" }}>No leads yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </AdminErrorBoundary>
  );
};
