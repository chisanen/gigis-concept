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
  mediaCount: number;
  galleryCount: number;
  hasContactEmail: boolean;
  revenueCents: number;
}

export const StudioDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [leads, bookings, tasks, blogPosts, testimonials, inquiries, invoices, packages, media, gallery, siteSettings] = await Promise.all([
          fetch("/api/leads?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch("/api/bookings?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch("/api/tasks?where[status][equals]=open&sort=dueDate&limit=10").then(r => r.json()).catch(() => ({ totalDocs: 0, docs: [] })),
          fetch("/api/blog-posts?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch("/api/testimonials?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch("/api/inquiries?sort=-createdAt&limit=5").then(r => r.json()).catch(() => ({ totalDocs: 0, docs: [] })),
          fetch("/api/invoices?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0, docs: [] })),
          fetch("/api/packages?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch("/api/media?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch("/api/gallery-images?limit=0").then(r => r.json()).catch(() => ({ totalDocs: 0 })),
          fetch("/api/globals/site-settings").then(r => r.json()).catch(() => ({})),
        ]);

        const revenueCents = (invoices.docs || []).reduce(
          (sum: number, inv: Record<string, unknown>) => sum + (Number(inv.amountPaidCents) || 0),
          0,
        );

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
          mediaCount: media.totalDocs || 0,
          galleryCount: gallery.totalDocs || 0,
          hasContactEmail: Boolean(siteSettings?.contactEmail),
          revenueCents,
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

  const checklistItems = [
    {
      label: "Upload at least 1 media file",
      done: data.mediaCount >= 1,
      href: "/admin/collections/media/create",
    },
    {
      label: "Update site settings (add contact email)",
      done: data.hasContactEmail,
      href: "/admin/globals/site-settings",
    },
    {
      label: "Add at least 1 gallery image",
      done: data.galleryCount >= 1,
      href: "/admin/collections/gallery-images/create",
    },
    {
      label: "Publish at least 5 blog posts",
      done: data.blogPosts >= 5,
      href: "/admin/collections/blog-posts/create",
    },
    {
      label: "Add more than 1 testimonial",
      done: data.testimonials > 1,
      href: "/admin/collections/testimonials/create",
    },
  ];

  const allDone = checklistItems.every((item) => item.done);
  const completedCount = checklistItems.filter((item) => item.done).length;

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  };

  return (
    <div style={{ padding: "16px", maxWidth: "1200px", margin: "0 auto", fontFamily: "'Jost', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 300, color: "#3A2D28", margin: 0, letterSpacing: "0.04em" }}>
          Welcome back, Gigi
        </h1>
        <p style={{ fontSize: "13px", color: "#A48374", marginTop: "6px" }}>
          Here&apos;s what&apos;s happening with your studio.
        </p>
      </div>

      {/* Setup Checklist */}
      <div style={{
        background: "#FFFFFF",
        border: "1px solid #D1C7BD",
        borderRadius: "10px",
        padding: "24px",
        marginBottom: "24px",
      }}>
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "#3A2D28",
            margin: "0 0 4px",
            letterSpacing: "0.04em",
          }}>
            Setup Checklist
          </h2>
          <p style={{ fontSize: "12px", color: "#A48374", margin: 0 }}>
            {allDone
              ? "All set! Your studio is ready."
              : `Complete these to get the most out of your studio admin. (${completedCount}/${checklistItems.length})`}
          </p>
        </div>
        {!allDone && (
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "6px" }}>
            {checklistItems.map((item) => (
              <a
                key={item.label}
                href={item.done ? undefined : item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  background: item.done ? "#F4F9F4" : "#FBF9F6",
                  borderRadius: "6px",
                  textDecoration: "none",
                  cursor: item.done ? "default" : "pointer",
                }}
              >
                <span style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: item.done ? "none" : "2px solid #D1C7BD",
                  background: item.done ? "#4A8C5C" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 700,
                }}>
                  {item.done ? "\u2713" : ""}
                </span>
                <span style={{
                  fontSize: "13px",
                  color: item.done ? "#6B8F71" : "#3A2D28",
                  textDecoration: item.done ? "line-through" : "none",
                  flex: 1,
                }}>
                  {item.label}
                </span>
                {!item.done && (
                  <span style={{ fontSize: "11px", color: "#A48374" }}>
                    Go &rarr;
                  </span>
                )}
              </a>
            ))}
          </div>
        )}
        {allDone && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px",
            background: "#F4F9F4",
            borderRadius: "6px",
          }}>
            <span style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "#4A8C5C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 700,
            }}>
              {"\u2713"}
            </span>
            <span style={{ fontSize: "13px", color: "#4A8C5C", fontWeight: 500 }}>
              All {checklistItems.length} steps completed
            </span>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "32px" }}>
        {[
          { label: "Leads", value: String(data.leads), href: "/admin/collections/leads" },
          { label: "Bookings", value: String(data.bookings), href: "/admin/collections/bookings" },
          { label: "Revenue", value: formatCurrency(data.revenueCents), href: "/admin/collections/invoices" },
          { label: "Open Tasks", value: String(data.openTasks), href: "/admin/collections/tasks" },
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
      <div className="gc-admin-grid-2" style={{ marginBottom: "20px" }}>
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
            <a href="/admin/collections/tasks" style={{ fontSize: "11px", color: "#A48374", textDecoration: "none" }}>View all &rarr;</a>
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
      <div className="gc-admin-grid-2">
        {/* Recent Inquiries */}
        <div style={{ background: "#FFFFFF", border: "1px solid #D1C7BD", borderRadius: "10px", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: 500, color: "#3A2D28", margin: 0, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>
              Recent Inquiries
            </h2>
            <a href="/admin/collections/inquiries" style={{ fontSize: "11px", color: "#A48374", textDecoration: "none" }}>View all &rarr;</a>
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
