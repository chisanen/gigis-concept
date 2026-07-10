"use client";

import { useState, useEffect, useCallback } from "react";

interface MediaItem {
  id: string;
  url?: string;
  alt?: string;
  aiPrompt?: string;
  createdAt: string;
  sizes?: {
    thumbnail?: { url?: string };
    card?: { url?: string };
  };
}

export const AIImageGallery: React.FC = () => {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genResult, setGenResult] = useState<string | null>(null);
  const [genError, setGenError] = useState("");

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "/api/media?where[isAiGenerated][equals]=true&sort=-createdAt&limit=50&depth=0"
      );
      if (res.ok) {
        const data = await res.json();
        setImages(data.docs || []);
        setTotalCount(data.totalDocs || 0);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setGenerating(true);
    setGenError("");
    setGenResult(null);

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
      setGenResult(data.message || "Image generated!");
      setPrompt("");
      await fetchImages();
    } catch (e) {
      setGenError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  }

  function formatDate(dateStr: string): string {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  }

  function getImageUrl(img: MediaItem): string {
    return img.sizes?.thumbnail?.url || img.url || "";
  }

  function getFullUrl(img: MediaItem): string {
    return img.sizes?.card?.url || img.url || "";
  }

  return (
    <div
      style={{
        marginTop: "24px",
        padding: "24px",
        background: "#F1EDE6",
        borderRadius: "12px",
        border: "1px solid #D1C7BD",
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
        <div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#3A2D28",
              margin: 0,
              letterSpacing: "0.03em",
            }}
          >
            AI Image Library
          </h3>
          <p
            style={{
              fontSize: "13px",
              color: "#A48374",
              margin: "4px 0 0 0",
            }}
          >
            {totalCount} AI-generated image{totalCount !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowGenerator(!showGenerator)}
          style={{
            padding: "8px 20px",
            fontSize: "12px",
            letterSpacing: "0.08em",
            background: showGenerator
              ? "#A48374"
              : "linear-gradient(135deg, #3A2D28, #5C463B)",
            color: "#F1EDE6",
            border: "none",
            borderRadius: "999px",
            cursor: "pointer",
          }}
        >
          {showGenerator ? "Close" : "Generate New"}
        </button>
      </div>

      {/* Generator Panel */}
      {showGenerator && (
        <div
          style={{
            marginBottom: "20px",
            padding: "16px",
            background: "#FFFFFF",
            borderRadius: "10px",
            border: "1px solid #D1C7BD",
          }}
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            rows={3}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "13px",
              border: "1px solid #D1C7BD",
              borderRadius: "8px",
              background: "#FAFAF7",
              color: "#3A2D28",
              resize: "none",
              fontFamily: "'Jost', system-ui, sans-serif",
              boxSizing: "border-box",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating || !prompt.trim()}
              style={{
                padding: "8px 20px",
                fontSize: "12px",
                letterSpacing: "0.08em",
                background: generating ? "#A48374" : "#3A2D28",
                color: "#F1EDE6",
                border: "none",
                borderRadius: "999px",
                cursor: generating ? "wait" : "pointer",
                opacity: !prompt.trim() ? 0.5 : 1,
              }}
            >
              {generating ? "Generating..." : "Generate"}
            </button>
            {genResult && (
              <span
                style={{ fontSize: "12px", color: "#2E7D32", fontWeight: 500 }}
              >
                {genResult}
              </span>
            )}
            {genError && (
              <span style={{ fontSize: "12px", color: "#B3261E" }}>
                {genError}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <p style={{ fontSize: "13px", color: "#A48374", textAlign: "center" }}>
          Loading images...
        </p>
      )}

      {/* Image Grid */}
      {!loading && images.length === 0 && (
        <p
          style={{
            fontSize: "13px",
            color: "#A48374",
            textAlign: "center",
            padding: "32px 0",
          }}
        >
          No AI-generated images yet. Click "Generate New" to create one.
        </p>
      )}

      {!loading && images.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
          }}
        >
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              style={{
                cursor: "pointer",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#FFFFFF",
                border: "1px solid #D1C7BD",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "scale(1.02)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 12px rgba(58,45,40,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "scale(1)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  background: "#E8E2DA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {getImageUrl(img) ? (
                  <img
                    src={getImageUrl(img)}
                    alt={img.alt || "AI generated image"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span
                    style={{ fontSize: "32px", color: "#D1C7BD" }}
                  >
                    ?
                  </span>
                )}
              </div>
              <div style={{ padding: "8px 10px" }}>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#3A2D28",
                    margin: 0,
                    lineHeight: 1.3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={img.aiPrompt || ""}
                >
                  {img.aiPrompt
                    ? img.aiPrompt.length > 60
                      ? img.aiPrompt.slice(0, 60) + "..."
                      : img.aiPrompt
                    : "No prompt"}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    color: "#A48374",
                    margin: "4px 0 0 0",
                  }}
                >
                  {formatDate(img.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(58, 45, 40, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: "40px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "900px",
              maxHeight: "90vh",
              background: "#FFFFFF",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "rgba(58, 45, 40, 0.7)",
                color: "#F1EDE6",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                fontSize: "18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              x
            </button>
            <img
              src={getFullUrl(selectedImage)}
              alt={selectedImage.alt || "AI generated image"}
              style={{
                width: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
                display: "block",
              }}
            />
            <div style={{ padding: "16px 20px" }}>
              <p
                style={{
                  fontSize: "13px",
                  color: "#3A2D28",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {selectedImage.aiPrompt || "No prompt recorded"}
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: "#A48374",
                  margin: "8px 0 0 0",
                }}
              >
                Created {formatDate(selectedImage.createdAt)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
