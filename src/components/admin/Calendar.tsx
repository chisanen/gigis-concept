"use client";

import { useEffect, useState } from "react";
import { AdminErrorBoundary } from "./AdminErrorBoundary";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeFetch(url: string, fallback: any = { docs: [], totalDocs: 0 }): Promise<any> {
  return fetch(url)
    .then(r => { if (!r.ok) return fallback; return r.json().catch(() => fallback); })
    .catch(() => fallback);
}

interface Event {
  id: string;
  name: string;
  date: string;
  type: "booking" | "consultation";
  status: string;
}

const statusColors: Record<string, string> = {
  confirmed: "#3A2D28", hold: "#A48374", inquiry: "#D1C7BD",
  in_production: "#5C463B", delivered: "#7C6253", completed: "#2E7D32",
  cancelled: "#9E9E9E", scheduled: "#7C6253",
};

export const StudioCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    Promise.all([
      safeFetch("/api/bookings?limit=100", { docs: [] }),
      safeFetch("/api/consultations?limit=100", { docs: [] }),
    ]).then(([b, c]) => {
      const bookingEvents = (b.docs || []).map((d: Record<string, unknown>) => ({
        id: d.id as string, name: d.clientName as string || "Booking",
        date: d.eventDate as string, type: "booking" as const, status: d.status as string,
      }));
      const consultEvents = (c.docs || []).map((d: Record<string, unknown>) => ({
        id: d.id as string, name: d.clientName as string || "Consultation",
        date: d.date as string, type: "consultation" as const, status: d.status as string,
      }));
      setEvents([...bookingEvents, ...consultEvents]);
    });
  }, []);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = new Date(year, month).toLocaleString("en-US", { month: "long", year: "numeric" });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const today = new Date();

  function getEventsForDay(day: number) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter(e => e.date?.startsWith(dateStr));
  }

  return (
    <AdminErrorBoundary name="Calendar">
    <div style={{ padding: "16px", fontFamily: "'Jost', system-ui, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 300, color: "#3A2D28", margin: 0 }}>Calendar</h2>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button onClick={() => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }}
            style={{ padding: "6px 12px", border: "1px solid #D1C7BD", borderRadius: "6px", background: "#fff", cursor: "pointer", color: "#3A2D28" }}>←</button>
          <span style={{ fontSize: "15px", color: "#3A2D28", fontWeight: 400, minWidth: "160px", textAlign: "center" as const }}>{monthName}</span>
          <button onClick={() => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); }}
            style={{ padding: "6px 12px", border: "1px solid #D1C7BD", borderRadius: "6px", background: "#fff", cursor: "pointer", color: "#3A2D28" }}>→</button>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #D1C7BD", borderRadius: "10px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <div key={d} style={{ padding: "10px", fontSize: "11px", letterSpacing: "0.1em", color: "#A48374", textAlign: "center" as const, borderBottom: "1px solid #F1EDE6", textTransform: "uppercase" as const }}>{d}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {blanks.map(i => <div key={`b${i}`} style={{ minHeight: "80px", borderBottom: "1px solid #F1EDE6", borderRight: "1px solid #F1EDE6" }} />)}
          {days.map(day => {
            const dayEvents = getEventsForDay(day);
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <div key={day} style={{
                minHeight: "80px", padding: "6px", borderBottom: "1px solid #F1EDE6", borderRight: "1px solid #F1EDE6",
                background: isToday ? "#F1EDE6" : "transparent",
              }}>
                <span style={{
                  fontSize: "12px", fontWeight: isToday ? 600 : 400,
                  display: "inline-block", width: "22px", height: "22px", lineHeight: "22px", textAlign: "center" as const,
                  borderRadius: "50%", background: isToday ? "#3A2D28" : "transparent", color: isToday ? "#fff" : "#7C6253",
                }}>{day}</span>
                {dayEvents.map(ev => (
                  <a key={ev.id} href={`/admin/collections/${ev.type === "booking" ? "bookings" : "consultations"}/${ev.id}`}
                    style={{
                      display: "block", fontSize: "10px", padding: "2px 4px", marginTop: "2px",
                      borderRadius: "3px", color: "#fff", textDecoration: "none", overflow: "hidden",
                      whiteSpace: "nowrap" as const, textOverflow: "ellipsis",
                      background: statusColors[ev.status] || "#A48374",
                    }}
                    title={`${ev.name} (${ev.status})`}
                  >{ev.name}</a>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: "16px", display: "flex", gap: "16px", flexWrap: "wrap" as const }}>
        {[["Confirmed", "#3A2D28"], ["Hold", "#A48374"], ["Consultation", "#7C6253"], ["Completed", "#2E7D32"]].map(([label, color]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: color }} />
            <span style={{ fontSize: "11px", color: "#7C6253" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
    </AdminErrorBoundary>
  );
};
