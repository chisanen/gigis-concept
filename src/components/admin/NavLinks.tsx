"use client";

import { useEffect, useState } from "react";
import { AdminHelpChat } from "./AdminHelpChat";

export const NavLinks: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.getAttribute("data-theme") === "dark");
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
