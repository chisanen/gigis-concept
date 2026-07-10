"use client";

import { useEffect, useState } from "react";
import { AdminHelpChat } from "./AdminHelpChat";

export const NavLinks: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.getAttribute("data-theme") === "dark");

    // Style description boxes as collapsible instruction cards
    function styleDescriptions() {
      // Find elements containing "HOW TO USE" text (our admin descriptions)
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const el = node as HTMLElement;
        if (el.getAttribute("data-gc-styled")) continue;
        const text = el.textContent || "";
        // Match our instruction descriptions (contain "HOW TO USE" or "TIP:")
        if ((text.includes("HOW TO USE:") || text.includes("TIP:")) &&
            el.children.length === 0 && text.length > 100) {
          el.setAttribute("data-gc-styled", "true");
          const s = el.style;
          s.background = "linear-gradient(135deg, #F8F5F1, #FFFFFF)";
          s.border = "1px solid #D1C7BD";
          s.borderLeft = "4px solid #A48374";
          s.borderRadius = "0 8px 8px 0";
          s.padding = "14px 18px";
          s.margin = "8px 0 16px";
          s.fontSize = "13px";
          s.lineHeight = "1.7";
          s.color = "#5C463B";
          s.maxHeight = "3.6em";
          s.overflow = "hidden";
          s.cursor = "pointer";
          s.transition = "max-height 0.4s ease";
          s.position = "relative";
          // Add expand/collapse on click
          el.addEventListener("click", () => {
            const expanded = el.style.maxHeight !== "3.6em";
            el.style.maxHeight = expanded ? "3.6em" : "600px";
          });
        }
      }
    }
    styleDescriptions();
    const observer = new MutationObserver(styleDescriptions);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    setIsDark(next === "dark");
    localStorage.setItem("payload-theme", next);
  }

  return (
    <>
      <div style={{ padding: "0 16px 12px", borderBottom: "1px solid var(--theme-elevation-300, #D1C7BD)", marginBottom: "8px" }}>
        {/* Home / Dashboard button */}
        <a
          href="/admin"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 12px",
            marginBottom: "8px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "var(--theme-elevation-1000, #3A2D28)",
            background: "var(--theme-elevation-50, #F1EDE6)",
            transition: "background 0.2s",
          }}
        >
          <span style={{ fontSize: "16px" }}>&#8962;</span>
          Dashboard
        </a>

        {/* View Site button */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 12px",
            marginBottom: "8px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "12px",
            letterSpacing: "0.06em",
            color: "var(--theme-elevation-500, #A48374)",
            transition: "color 0.2s",
          }}
        >
          <span style={{ fontSize: "14px" }}>&#8599;</span>
          View Live Site
        </a>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 12px",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid var(--theme-elevation-300, #D1C7BD)",
            background: "transparent",
            cursor: "pointer",
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: "var(--theme-elevation-500, #A48374)",
            transition: "background 0.2s",
          }}
        >
          <span style={{ fontSize: "14px" }}>{isDark ? "☀" : "☾"}</span>
          {isDark ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>
      <AdminHelpChat />
    </>
  );
};
