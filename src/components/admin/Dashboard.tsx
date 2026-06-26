"use client";

import { useEffect, useState } from "react";

interface DashboardData {
  leads: number;
  bookings: number;
  tasks: { id: string; title: string; priority: string; dueDate: string }[];
  openTasks: number;
  blogPosts: number;
  testimonials: number;
  inquiries: { id: string; firstName: string; lastName: string; serviceRequired: string; createdAt: string }[];
  invoices: number;
  packages: number;
}

export const StudioDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [leads, bookings, tasks, blogPosts, testimonials, inquiries, invoices, packages] = await Promise.all([
          fetch("/api/leads?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch("/api/bookings?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch("/api/tasks?where[status][equals]=open&sort=dueDate&limit=10").then(r => r.json()).catch(() => ({ totalDocs: 0, docs: [] })),
          fetch("/api/blog-posts?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch("/api/testimonials?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch("/api/inquiries?sort=-createdAt&limit=5").then(r => r.json()).catch(() => ({ totalDocs: 0, docs: [] })),
          fetch("/api/invoices?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch("/api/packages?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
        ]);

        setData({
          leads: leads.totalDocs || 0,
          bookings: bookings.totalDocs || 0,
          tasks: (tasks.docs || []).map((t: Record<string, unknown>) => ({
            id: t.id as string,
            title: t.title as string,
            priority: t.priority as string,
            dueDate: t.dueDate as string,
          })),
          openTasks: tasks.totalDocs || 0,
          blogPosts: blogPosts.totalDocs || 0,
          testimonials: testimonials.totalDocs || 0,
          inquiries: (inquiries.docs || []).map((i: Record<string, unknown>) => ({
            id: i.id as string,
            firstName: i.firstName as string,
            lastName: i.lastName as string,
            serviceRequired: i.serviceRequired as string,
            createdAt: i.createdAt as string,
          })),
          invoices: invoices.totalDocs || 0,
          packages: packages.totalDocs || 0,
        });
      } catch (e) {
        console.error("Dashboard fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        <p style={{ color: "#A48374", fontSize: "14px" }}>Loading dashboard...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        <p style={{ color: "#B3261E", fontSize: "14px" }}>Failed to load dashboard data.</p>
      </div>
    );
  }

  const s: React.CSSProperties = {};

  return (
    <div style={{ padding: "32px 40px", maxWidth: "1200px", margin: "0 auto", fontFamily: "'Jost', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 300, color: "#3A2D28", margin: 0, letterSpacing: "0.04em" }}>
          Welcome back, Gigi
        </h1>
        <p style={{ fontSize: "13px", color: "#A48374", marginTop: "6px" }}>
          Here&apos;s what&apos;s happening with your studio.
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "32px" }}>
        {[
          { label: "Leads", value: data.leads, href: "/admin/collections/leads" },
          { label: "Bookings", value: data.bookings, href: "/admin/collections/bookings" },
          { label: "Open Tasks", value: data.openTasks, href: "/admin/collections/tasks" },
          { label: "Blog Posts", value: data.blogPosts, href: "/admin/collections/blog-posts" },
        ].map((kpi) => (
          <a
            key={kpi.label}
            href={kpi.href}
            style={{
              background: "#FFFFFF",
              border: "1px solid #D1C7BD",
              borderRadius: "10px",
              padding: "20px 24px",
              textDecoration: "none",
              display: "block",
            }}
          >
            <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#A48374", textTransform: "uppercase" as const, margin: "0 0 6px" }}>
              {kpi.label}
            </p>
            <p style={{ fontSize: "32px", fontWeight: 300, color: "#3A2D28", margin: 0, lineHeight: 1 }}>
              {kpi.value}
            </p>
          </a>
        ))}
      </div>

      {/* Two column */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        {/* Quick Actions */}
        <div style={{ background: "#FFFFFF", border: "1px solid #D1C7BD", borderRadius: "10px", padding: "24px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: 500, color: "#3A2D28", margin: "0 0 16px", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>
            Quick Actions
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {[
              { label: "+ New Lead", href: "/admin/collections/leads/create" },
              { label: "+ New Booking", href: "/admin/collections/bookings/create" },
              { label: "+ New Quote", href: "/admin/collections/quotes/create" },
              { label: "+ New Invoice", href: "/admin/collections/invoices/create" },
              { label: "+ Blog Post", href: "/admin/collections/blog-posts/create" },
              { label: "+ New Task", href: "/admin/collections/tasks/create" },
              { label: "Upload Media", href: "/admin/collections/media/create" },
              { label: "Site Settings", href: "/admin/globals/site-settings" },
            ].map((a) => (
              <a
                key={a.label}
                href={a.href}
                style={{
                  display: "block",
                  padding: "10px 14px",
                  background: "#F1EDE6",
                  borderRadius: "6px",
                  color: "#3A2D28",
                  textDecoration: "none",
                  fontSize: "12px",
                  textAlign: "center" as const,
                }}
              >
                {a.label}
              </a>
            ))}
          </div>
        </div>

        {/* Open Tasks */}
        <div style={{ background: "#FFFFFF", border: "1px solid #D1C7BD", borderRadius: "10px", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: 500, color: "#3A2D28", margin: 0, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>
              Open Tasks
            </h2>
            <a href="/admin/collections/tasks" style={{ fontSize: "11px", color: "#A48374", textDecoration: "none" }}>View all →</a>
          </div>
          {data.tasks.length === 0 ? (
            <p style={{ color: "#A48374", fontSize: "13px", fontStyle: "italic" }}>All caught up!</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "6px" }}>
              {data.tasks.map((task) => (
                <a
                  key={task.id}
                  href={`/admin/collections/tasks/${task.id}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    background: "#FBF9F6",
                    borderRadius: "6px",
                    textDecoration: "none",
                    borderLeft: `3px solid ${task.priority === "high" || task.priority === "urgent" ? "#B3261E" : "#D1C7BD"}`,
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#3A2D28" }}>{task.title}</span>
                  <span style={{ fontSize: "11px", color: "#A48374" }}>
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Recent Inquiries */}
        <div style={{ background: "#FFFFFF", border: "1px solid #D1C7BD", borderRadius: "10px", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: 500, color: "#3A2D28", margin: 0, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>
              Recent Inquiries
            </h2>
            <a href="/admin/collections/inquiries" style={{ fontSize: "11px", color: "#A48374", textDecoration: "none" }}>View all →</a>
          </div>
          {data.inquiries.length === 0 ? (
            <p style={{ color: "#A48374", fontSize: "13px", fontStyle: "italic" }}>No inquiries yet. They&apos;ll appear when someone submits the contact form.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "6px" }}>
              {data.inquiries.map((inq) => (
                <a
                  key={inq.id}
                  href={`/admin/collections/inquiries/${inq.id}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    background: "#FBF9F6",
                    borderRadius: "6px",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#3A2D28" }}>{inq.firstName} {inq.lastName}</span>
                  <span style={{ fontSize: "11px", color: "#A48374" }}>{inq.serviceRequired}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Studio Overview */}
        <div style={{ background: "#FFFFFF", border: "1px solid #D1C7BD", borderRadius: "10px", padding: "24px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: 500, color: "#3A2D28", margin: "0 0 16px", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>
            Studio Overview
          </h2>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "8px" }}>
            {[
              { label: "Packages", count: data.packages, href: "/admin/collections/packages" },
              { label: "Testimonials", count: data.testimonials, href: "/admin/collections/testimonials" },
              { label: "Invoices", count: data.invoices, href: "/admin/collections/invoices" },
              { label: "Bookings", count: data.bookings, href: "/admin/collections/bookings" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  background: "#FBF9F6",
                  borderRadius: "6px",
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: "12px", color: "#3A2D28" }}>{item.label}</span>
                <span style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  background: "#3A2D28",
                  borderRadius: "999px",
                  padding: "2px 10px",
                  minWidth: "24px",
                  textAlign: "center" as const,
                }}>{item.count}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
