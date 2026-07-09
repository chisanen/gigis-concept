"use client";

import { useRef, useState } from "react";

type DeviceSize = "desktop" | "tablet" | "mobile";

const deviceWidths: Record<DeviceSize, number> = {
  desktop: 1200,
  tablet: 768,
  mobile: 375,
};

const deviceLabels: Record<DeviceSize, string> = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
};

export const LivePreview: React.FC = () => {
  const [device, setDevice] = useState<DeviceSize>("desktop");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const width = deviceWidths[device];

  return (
    <div
      style={{
        padding: "32px 40px",
        maxWidth: "1400px",
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
          marginBottom: "20px",
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
          Live Preview
        </h2>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 14px",
              background: "transparent",
              border: "1px solid #D1C7BD",
              color: "#3A2D28",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Open in new tab
          </a>
          <button
            onClick={handleRefresh}
            style={{
              padding: "8px 14px",
              background: "#3A2D28",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Help Text */}
      <div
        style={{
          background: "#FBF9F6",
          border: "1px solid #D1C7BD",
          borderRadius: "10px",
          padding: "14px 20px",
          marginBottom: "20px",
        }}
      >
        <p style={{ fontSize: "13px", color: "#3A2D28", margin: 0, lineHeight: 1.6 }}>
          This is a live preview of your website. Use the device buttons to see how it looks on
          different screens. Changes you make in the admin appear here after you Publish.
        </p>
      </div>

      {/* Device Buttons */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
          justifyContent: "center",
        }}
      >
        {(["desktop", "tablet", "mobile"] as DeviceSize[]).map((d) => (
          <button
            key={d}
            onClick={() => setDevice(d)}
            style={{
              padding: "8px 20px",
              background: device === d ? "#3A2D28" : "#FFFFFF",
              color: device === d ? "#FFFFFF" : "#3A2D28",
              border: `1px solid ${device === d ? "#3A2D28" : "#D1C7BD"}`,
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
            }}
          >
            {deviceLabels[d]} ({deviceWidths[d]}px)
          </button>
        ))}
      </div>

      {/* Iframe Container */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "24px",
          background: "#EBE3DB",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            width: `${width}px`,
            maxWidth: "100%",
            transition: "width 0.3s ease",
          }}
        >
          <iframe
            ref={iframeRef}
            src="/"
            title="Site Preview"
            style={{
              width: "100%",
              height: "700px",
              border: "1px solid #D1C7BD",
              borderRadius: "8px",
              background: "#FFFFFF",
              boxShadow: "0 4px 24px rgba(58, 45, 40, 0.12)",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};
