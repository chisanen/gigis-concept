"use client";

import { useEffect, useState } from "react";

interface BlockData {
  blockType: string;
  id?: string;
  heading?: string;
  heading1?: string;
  subtitle?: string;
  eyebrow?: string;
  quote?: string;
  description?: string;
  content?: unknown;
  isVisible?: boolean;
  [key: string]: unknown;
}

interface PageData {
  id: string;
  title: string;
  slug?: string;
  layout?: BlockData[];
  isPublished?: boolean;
}

const blockLabels: Record<string, string> = {
  hero: "Hero",
  aboutSplit: "About",
  twoWays: "Two Ways",
  testimonial: "Testimonial",
  cta: "CTA Section",
  gallerySection: "Gallery",
  contactSection: "Contact",
  richText: "Rich Text",
  packagesToggle: "Packages",
  steps: "Steps",
  videoEmbed: "Video Embed",
  faq: "FAQ",
};

const blockIcons: Record<string, string> = {
  hero: "\u2B50",
  aboutSplit: "\u270D",
  twoWays: "\u21C4",
  testimonial: "\u201C",
  cta: "\u261B",
  gallerySection: "\u25A3",
  contactSection: "\u2709",
  richText: "\u2261",
  packagesToggle: "\u2630",
  steps: "\u21E8",
  videoEmbed: "\u25B6",
  faq: "\u2753",
};

function getBlockPreview(block: BlockData): string {
  const text =
    block.heading ||
    block.heading1 ||
    block.subtitle ||
    block.eyebrow ||
    block.quote ||
    block.description ||
    "";
  if (!text) return "No preview available";
  return text.length > 50 ? text.slice(0, 50) + "..." : text;
}

export const PageBuilder: React.FC = () => {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPages() {
      try {
        const res = await fetch("/api/pages?limit=10");
        const json = await res.json();
        setPages(json.docs || []);
      } catch (e) {
        console.error("PageBuilder fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchPages();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        <p style={{ color: "#A48374", fontSize: "14px", fontFamily: "'Jost', system-ui, sans-serif" }}>
          Loading page builder...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "32px 40px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "'Jost', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 300,
            color: "#3A2D28",
            margin: 0,
            letterSpacing: "0.04em",
          }}
        >
          Page Builder
        </h2>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 18px",
            background: "#3A2D28",
            color: "#FFFFFF",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}
        >
          Preview Site
        </a>
      </div>

      {/* Help Banner */}
      <div
        style={{
          background: "#FBF9F6",
          border: "1px solid #D1C7BD",
          borderRadius: "10px",
          padding: "16px 20px",
          marginBottom: "24px",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            color: "#3A2D28",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          This is your page builder. Each card represents a section on your website. Click Edit to
          change the text, images, or settings for that section. Changes save as a draft — press
          Publish in the editor to make them live.
        </p>
      </div>

      {/* Pages */}
      {pages.length === 0 ? (
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #D1C7BD",
            borderRadius: "10px",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#A48374", fontSize: "13px", fontStyle: "italic" }}>
            No pages found. Create your first page in the Pages collection.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "20px" }}>
          {pages.map((page) => (
            <div
              key={page.id}
              style={{
                background: "#FFFFFF",
                border: "1px solid #D1C7BD",
                borderRadius: "10px",
                padding: "24px",
              }}
            >
              {/* Page Title */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                  borderBottom: "1px solid #EBE3DB",
                  paddingBottom: "12px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#3A2D28",
                      margin: "0 0 2px",
                    }}
                  >
                    {page.title}
                  </h3>
                  {page.slug && (
                    <span style={{ fontSize: "11px", color: "#A48374" }}>/{page.slug}</span>
                  )}
                </div>
                <a
                  href={`/admin/collections/pages/${page.id}`}
                  style={{
                    padding: "6px 14px",
                    background: "#A48374",
                    color: "#FFFFFF",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                  }}
                >
                  Edit Page
                </a>
              </div>

              {/* Blocks */}
              {!page.layout || page.layout.length === 0 ? (
                <p style={{ color: "#A48374", fontSize: "12px", fontStyle: "italic" }}>
                  No sections added yet.
                </p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {page.layout.map((block, idx) => (
                    <div
                      key={block.id || idx}
                      style={{
                        background: "#EBE3DB",
                        borderRadius: "8px",
                        padding: "14px 16px",
                        display: "flex",
                        flexDirection: "column" as const,
                        gap: "8px",
                        opacity: block.isVisible === false ? 0.5 : 1,
                      }}
                    >
                      {/* Block header */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "16px" }}>
                            {blockIcons[block.blockType] || "\u25A0"}
                          </span>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "#3A2D28",
                              letterSpacing: "0.04em",
                              textTransform: "uppercase" as const,
                            }}
                          >
                            {blockLabels[block.blockType] || block.blockType}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "10px",
                            padding: "2px 8px",
                            borderRadius: "999px",
                            background: block.isVisible !== false ? "#4A8C5C" : "#B3261E",
                            color: "#FFFFFF",
                            fontWeight: 500,
                          }}
                        >
                          {block.isVisible !== false ? "Visible" : "Hidden"}
                        </span>
                      </div>

                      {/* Preview text */}
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#5C4A40",
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {getBlockPreview(block)}
                      </p>

                      {/* Edit button */}
                      <a
                        href={`/admin/collections/pages/${page.id}`}
                        style={{
                          fontSize: "11px",
                          color: "#A48374",
                          textDecoration: "none",
                          fontWeight: 500,
                          alignSelf: "flex-start",
                          marginTop: "auto",
                        }}
                      >
                        Edit &rarr;
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
