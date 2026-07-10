"use client";

import { useState } from "react";

export const AIImageButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const presets = [
    "Elegant African American bride and groom, golden hour, editorial wedding photography",
    "Luxury photo booth at an upscale wedding reception, warm ambient lighting",
    "Professional videographer filming a Nigerian wedding celebration",
    "Champagne tower at an elegant event, bokeh lights, luxurious atmosphere",
    "African American bridesmaids in formal attire, candid laughter, editorial style",
    "Behind the scenes of a content creation shoot, camera equipment, soft lighting",
    "Kids birthday celebration, balloons and cake, joyful candid moment",
    "Elegant outdoor wedding venue in Dallas, string lights, golden hour",
  ];

  async function generate() {
    if (!prompt.trim()) return;
    setGenerating(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/ai/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, quality: "high" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate image");
      }

      const data = await res.json();
      if (data.url) setPreviewUrl(data.url);
      setResult(data.mediaId ? "Image saved to Media library! Refresh and select it from the image picker above." : data.url ? "Image generated!" : "Done!");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          fontSize: "12px",
          letterSpacing: "0.05em",
          background: "linear-gradient(135deg, #3A2D28, #5C463B)",
          color: "#F1EDE6",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "8px",
          transition: "opacity 0.2s",
        }}
      >
        <span style={{ fontSize: "16px" }}>✨</span> Generate with AI
      </button>
    );
  }

  return (
    <div style={{
      marginTop: "12px",
      padding: "20px",
      background: "#F1EDE6",
      borderRadius: "12px",
      border: "1px solid #D1C7BD",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h4 style={{ fontSize: "14px", fontWeight: 500, color: "#3A2D28", margin: 0, letterSpacing: "0.05em" }}>
          ✨ AI Image Generator
        </h4>
        <button
          type="button"
          onClick={() => { setOpen(false); setResult(null); setError(""); }}
          style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#A48374" }}
        >×</button>
      </div>

      {/* Presets */}
      <div style={{ marginBottom: "12px" }}>
        <p style={{ fontSize: "11px", color: "#7C6253", marginBottom: "8px", letterSpacing: "0.05em" }}>Quick presets:</p>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
          {presets.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPrompt(p)}
              style={{
                padding: "4px 10px",
                fontSize: "10px",
                background: prompt === p ? "#3A2D28" : "#FFFFFF",
                color: prompt === p ? "#F1EDE6" : "#7C6253",
                border: "1px solid #D1C7BD",
                borderRadius: "999px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {p.length > 40 ? p.slice(0, 40) + "…" : p}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt input */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the image you want... (e.g. 'Elegant African American couple at a luxury wedding, golden hour, editorial photography')"
        rows={3}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "13px",
          border: "1px solid #D1C7BD",
          borderRadius: "8px",
          background: "#FFFFFF",
          color: "#3A2D28",
          resize: "none",
          fontFamily: "'Jost', system-ui, sans-serif",
        }}
      />

      <div style={{ display: "flex", gap: "8px", marginTop: "12px", alignItems: "center" }}>
        <button
          type="button"
          onClick={generate}
          disabled={generating || !prompt.trim()}
          style={{
            padding: "10px 24px",
            fontSize: "12px",
            letterSpacing: "0.1em",
            background: generating ? "#A48374" : "#3A2D28",
            color: "#F1EDE6",
            border: "none",
            borderRadius: "999px",
            cursor: generating ? "wait" : "pointer",
            opacity: !prompt.trim() ? 0.5 : 1,
          }}
        >
          {generating ? "Generating..." : "Generate Image"}
        </button>
        <span style={{ fontSize: "11px", color: "#A48374" }}>
          Saves to your Media library — then pick it from the image field above
        </span>
      </div>

      {error && (
        <p style={{ marginTop: "8px", fontSize: "12px", color: "#B3261E" }}>{error}</p>
      )}

      {result && (
        <p style={{ marginTop: "8px", fontSize: "12px", color: "#2E7D32", fontWeight: 500 }}>{result}</p>
      )}

      {previewUrl && (
        <div style={{ marginTop: "12px", borderRadius: "8px", overflow: "hidden", border: "1px solid #D1C7BD" }}>
          <img src={previewUrl} alt="Generated image" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      )}
    </div>
  );
};
