"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

const STORAGE_KEY = "gigi-admin-help-chat";

const SEED_QUESTIONS = [
  "How do I create a popup?",
  "How do I change pricing?",
  "How do I add a testimonial?",
  "How do I send a gallery to a client?",
  "What is a Lead vs an Inquiry?",
];

export function AdminHelpChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasLoadedRef = useRef(false);

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

  // Portal to document.body so the fixed positioning works outside the sidebar
  if (typeof document === "undefined") return null;

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
            {messages.map((msg, idx) => (
              <div
                key={`${msg.role}-${idx}`}
                style={
                  msg.role === "user" ? userBubbleStyle : assistantBubbleStyle
                }
              >
                {msg.text.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < msg.text.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </div>
            ))}

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
