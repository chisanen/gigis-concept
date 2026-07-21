"use client";

import { Fragment } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

// Render the light markdown the assistant uses (bold, # headings) as real
// formatting instead of showing literal ** and # characters in the bubble.
function renderInlineNodes(text: string, keyPrefix: string) {
  const cleaned = text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  return cleaned.split(/\*\*([^*]+)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={`${keyPrefix}-b-${i}`}>{part}</strong>
    ) : (
      <Fragment key={`${keyPrefix}-s-${i}`}>{part}</Fragment>
    )
  );
}

function renderRichText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    return (
      <Fragment key={i}>
        {heading ? (
          <strong>{renderInlineNodes(heading[1], `h-${i}`)}</strong>
        ) : (
          renderInlineNodes(line, `l-${i}`)
        )}
        {i < lines.length - 1 && <br />}
      </Fragment>
    );
  });
}

const STORAGE_KEY = "gigi-admin-help-chat";

const SEED_QUESTIONS = [
  "How do I create a popup?",
  "How do I change pricing?",
  "How do I add a testimonial?",
  "How do I send a gallery to a client?",
  "How do I add a new feature to my website?",
  "What features are not built yet?",
];

export function AdminHelpChat() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => { setMounted(true); }, []);

  // Load chat history from localStorage on mount
  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (hasLoadedRef.current && messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        // Ignore storage errors
      }
    }
  }, [messages]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMessage: ChatMessage = { role: "user", text: trimmed };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);

      try {
        // Build history for the API (exclude the new message)
        const history = messages.map((m) => ({
          role: m.role === "user" ? "user" : "model",
          text: m.text,
        }));

        const res = await fetch("/api/admin-help", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
        });

        const data = await res.json();
        const assistantMessage: ChatMessage = {
          role: "assistant",
          text: data.reply || "No response received.",
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Could not reach the help assistant. Please check your connection and try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function clearChat() {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }

  // Find the question that prompted a given assistant answer (the nearest
  // preceding user message), so the PDF can be titled with it.
  function questionForAnswer(index: number): string {
    for (let i = index - 1; i >= 0; i--) {
      if (messages[i].role === "user") return messages[i].text;
    }
    return "Your Question";
  }

  // Generate and download a branded PDF of a single answer using the
  // browser's native print-to-PDF. No server dependency required, so this
  // works end to end on Vercel. Gigi picks "Save as PDF" in the dialog.
  function downloadPdf(question: string, answer: string) {
    const esc = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    // Convert the light markdown the assistant uses into HTML. Runs on
    // already-escaped text, so it only produces the tags we add here.
    const inlineMd = (escaped: string) =>
      escaped
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

    // Turn the answer into paragraphs. Blank lines separate paragraphs;
    // single newlines become line breaks within a paragraph. Lines that
    // start with # are treated as bold sub-headings.
    const bodyHtml = answer
      .split(/\n{2,}/)
      .map((block) => {
        const trimmed = block.trim();
        if (!trimmed) return "";
        const lines = trimmed.split("\n").map((line) => {
          const escaped = esc(line);
          const heading = escaped.match(/^#{1,6}\s+(.*)$/);
          if (heading) return `<strong>${inlineMd(heading[1])}</strong>`;
          return inlineMd(escaped);
        });
        return `<p>${lines.join("<br/>")}</p>`;
      })
      .join("");

    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const safeTitle = esc(question);
    const fileName = question
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50) || "how-to-guide";

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>${fileName}</title>
<style>
  @page { margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #3A2D28;
    background: #FFFFFF;
    line-height: 1.65;
  }
  .cover {
    background: #3A2D28;
    color: #F1EDE6;
    padding: 56px 56px 48px;
  }
  .brand {
    font-size: 12px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #D1C7BD;
    margin: 0 0 20px;
  }
  .cover h1 {
    font-size: 30px;
    line-height: 1.25;
    margin: 0;
    font-weight: 600;
  }
  .cover .meta {
    margin-top: 24px;
    font-size: 12px;
    color: #A48374;
    letter-spacing: 0.04em;
  }
  .content { padding: 44px 56px 64px; }
  .content .label {
    font-size: 11px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #76220B;
    margin: 0 0 14px;
    font-weight: 700;
  }
  .content p {
    font-size: 14px;
    margin: 0 0 16px;
    color: #3A2D28;
  }
  .footer {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #D1C7BD;
    font-size: 11px;
    color: #A48374;
    letter-spacing: 0.04em;
  }
</style>
</head>
<body>
  <div class="cover">
    <p class="brand">Gigi's Concept &middot; Admin How-To</p>
    <h1>${safeTitle}</h1>
    <p class="meta">Generated ${today}</p>
  </div>
  <div class="content">
    <p class="label">Step by step</p>
    ${bodyHtml}
    <div class="footer">
      Gigi's Concept Admin Help &middot; Keep this guide handy or reprint it anytime from the Help Assistant.
    </div>
  </div>
</body>
</html>`;

    // Print via a hidden iframe. This avoids pop-up blockers (no new window)
    // and reliably triggers the browser's Save-as-PDF dialog.
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.setAttribute("aria-hidden", "true");
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      document.body.removeChild(iframe);
      return;
    }
    doc.open();
    doc.write(html);
    doc.close();

    let printed = false;
    const triggerPrint = () => {
      if (printed) return;
      printed = true;
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch {
        // Ignore
      }
      // Remove the iframe after the print dialog has had time to open.
      setTimeout(() => {
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      }, 1000);
    };

    if (iframe.contentWindow) {
      iframe.contentWindow.onload = triggerPrint;
    }
    // Fallback in case onload does not fire for a written document.
    setTimeout(triggerPrint, 400);
  }

  // --- Styles ---

  const fabStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#3A2D28",
    color: "#F1EDE6",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "bold",
    zIndex: 9999,
    transition: "transform 0.2s",
  };

  const panelStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 90,
    right: 24,
    width: 360,
    height: 500,
    maxHeight: "calc(100vh - 120px)",
    borderRadius: 12,
    background: "#FFFFFF",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    display: "flex",
    flexDirection: "column",
    zIndex: 9999,
    overflow: "hidden",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    background: "#3A2D28",
    color: "#F1EDE6",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.03em",
    flexShrink: 0,
  };

  const messagesAreaStyle: React.CSSProperties = {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    background: "#F1EDE6",
  };

  const inputBarStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 16px",
    borderTop: "1px solid #D1C7BD",
    background: "#FFFFFF",
    flexShrink: 0,
  };

  const userBubbleStyle: React.CSSProperties = {
    alignSelf: "flex-end",
    background: "#3A2D28",
    color: "#F1EDE6",
    padding: "10px 14px",
    borderRadius: "16px 16px 4px 16px",
    maxWidth: "85%",
    fontSize: 13,
    lineHeight: 1.5,
    wordBreak: "break-word",
  };

  const assistantBubbleStyle: React.CSSProperties = {
    alignSelf: "flex-start",
    background: "#FFFFFF",
    color: "#3A2D28",
    padding: "10px 14px",
    borderRadius: "16px 16px 16px 4px",
    maxWidth: "85%",
    fontSize: 13,
    lineHeight: 1.5,
    wordBreak: "break-word",
    border: "1px solid #D1C7BD",
  };

  const pdfButtonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "5px 12px",
    borderRadius: 14,
    border: "1px solid #D1C7BD",
    background: "#FFFFFF",
    color: "#76220B",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.03em",
    cursor: "pointer",
    transition: "background 0.2s, border-color 0.2s",
  };

  const chipStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: 20,
    border: "1px solid #A48374",
    background: "#FFFFFF",
    color: "#3A2D28",
    fontSize: 12,
    cursor: "pointer",
    transition: "background 0.2s, border-color 0.2s",
    lineHeight: 1.3,
    textAlign: "left",
  };

  // Media query handled via inline check
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 640;

  const responsivePanelStyle: React.CSSProperties = isMobile
    ? {
        ...panelStyle,
        bottom: 0,
        right: 0,
        width: "100%",
        height: "100%",
        maxHeight: "100vh",
        borderRadius: 0,
      }
    : panelStyle;

  // Wait for client-side mount before rendering portal
  if (!mounted) return null;

  return createPortal(
    <>
      {/* Floating help button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={fabStyle}
          aria-label="Open help assistant"
          type="button"
        >
          ?
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div style={responsivePanelStyle} role="dialog" aria-label="Help assistant chat">
          {/* Header */}
          <div style={headerStyle}>
            <span>Help Assistant</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                onClick={clearChat}
                type="button"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(241,237,230,0.3)",
                  color: "#F1EDE6",
                  fontSize: 11,
                  padding: "4px 10px",
                  borderRadius: 6,
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                }}
                aria-label="Clear chat history"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#F1EDE6",
                  fontSize: 20,
                  cursor: "pointer",
                  padding: "0 4px",
                  lineHeight: 1,
                }}
                aria-label="Close help assistant"
              >
                &#x2715;
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div style={messagesAreaStyle}>
            {/* Welcome message when no messages */}
            {messages.length === 0 && !isLoading && (
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <p
                  style={{
                    fontSize: 13,
                    color: "#A48374",
                    marginBottom: 16,
                    lineHeight: 1.5,
                  }}
                >
                  Hi Gigi! I can help you navigate the admin panel. Ask me
                  anything or tap a question below.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    justifyContent: "center",
                  }}
                >
                  {SEED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      style={chipStyle}
                      onClick={() => sendMessage(q)}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "#F1EDE6";
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.borderColor = "#3A2D28";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "#FFFFFF";
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.borderColor = "#A48374";
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg, idx) =>
              msg.role === "user" ? (
                <div key={`${msg.role}-${idx}`} style={userBubbleStyle}>
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < msg.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              ) : (
                <div
                  key={`${msg.role}-${idx}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 6,
                    maxWidth: "85%",
                    alignSelf: "flex-start",
                  }}
                >
                  <div style={{ ...assistantBubbleStyle, maxWidth: "100%" }}>
                    {renderRichText(msg.text)}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      downloadPdf(questionForAnswer(idx), msg.text)
                    }
                    style={pdfButtonStyle}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#F1EDE6";
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#76220B";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#FFFFFF";
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#D1C7BD";
                    }}
                    aria-label="Download this answer as a PDF guide"
                  >
                    &#8595; Download PDF guide
                  </button>
                </div>
              )
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div style={assistantBubbleStyle}>
                <span
                  style={{
                    display: "inline-flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#A48374",
                      animation: "gcPulse 1.2s infinite",
                      animationDelay: "0s",
                    }}
                  />
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#A48374",
                      animation: "gcPulse 1.2s infinite",
                      animationDelay: "0.2s",
                    }}
                  />
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#A48374",
                      animation: "gcPulse 1.2s infinite",
                      animationDelay: "0.4s",
                    }}
                  />
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <form onSubmit={handleSubmit} style={inputBarStyle}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #D1C7BD",
                fontSize: 13,
                outline: "none",
                background: "#F1EDE6",
                color: "#3A2D28",
              }}
              aria-label="Type your question"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                border: "none",
                background:
                  isLoading || !input.trim() ? "#D1C7BD" : "#3A2D28",
                color: "#F1EDE6",
                fontSize: 18,
                cursor:
                  isLoading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
              aria-label="Send message"
            >
              &#8593;
            </button>
          </form>

          {/* Keyframe animation for loading dots */}
          <style>{`
            @keyframes gcPulse {
              0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
              40% { opacity: 1; transform: scale(1.1); }
            }
          `}</style>
        </div>
      )}
    </>,
    document.body
  );
}
