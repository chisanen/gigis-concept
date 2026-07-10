"use client";

import { useState, useEffect, useCallback } from "react";

interface GalleryDoc {
  id: string;
  title: string;
  collectionName: string;
  category: string;
  password?: string;
  clientName?: string;
  clientEmail?: string;
  image?: {
    url?: string;
    kind?: string;
  };
}

interface CollectionGroup {
  name: string;
  category: string;
  clientName: string;
  clientEmail: string;
  images: GalleryDoc[];
}

interface SendFormState {
  email: string;
  additionalEmails: string;
  sending: boolean;
  result: string;
  resultType: "success" | "error" | "";
}

const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    padding: "24px",
    background: "#F1EDE6",
    borderRadius: "8px",
    marginTop: "24px",
  } as React.CSSProperties,
  heading: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#3A2D28",
    marginBottom: "20px",
    letterSpacing: "0.05em",
  } as React.CSSProperties,
  card: {
    background: "#fff",
    border: "1px solid #D1C7BD",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "16px",
  } as React.CSSProperties,
  collectionTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#3A2D28",
    marginBottom: "8px",
  } as React.CSSProperties,
  meta: {
    fontSize: "13px",
    color: "#A48374",
    marginBottom: "4px",
  } as React.CSSProperties,
  badge: (category: string) => ({
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.05em",
    marginLeft: "8px",
    background: category === "public" ? "#d4edda" : category === "password" ? "#fff3cd" : "#f8d7da",
    color: category === "public" ? "#155724" : category === "password" ? "#856404" : "#721c24",
  } as React.CSSProperties),
  btnRow: {
    display: "flex",
    gap: "8px",
    marginTop: "12px",
    flexWrap: "wrap" as const,
  } as React.CSSProperties,
  btn: {
    padding: "8px 16px",
    fontSize: "12px",
    letterSpacing: "0.1em",
    border: "1px solid #3A2D28",
    borderRadius: "4px",
    cursor: "pointer",
    background: "#3A2D28",
    color: "#F1EDE6",
    transition: "opacity 0.2s",
  } as React.CSSProperties,
  btnOutline: {
    padding: "8px 16px",
    fontSize: "12px",
    letterSpacing: "0.1em",
    border: "1px solid #3A2D28",
    borderRadius: "4px",
    cursor: "pointer",
    background: "transparent",
    color: "#3A2D28",
    transition: "opacity 0.2s",
  } as React.CSSProperties,
  emailForm: {
    marginTop: "12px",
    padding: "16px",
    background: "#F1EDE6",
    borderRadius: "6px",
  } as React.CSSProperties,
  input: {
    width: "100%",
    padding: "8px 12px",
    fontSize: "13px",
    border: "1px solid #D1C7BD",
    borderRadius: "4px",
    marginBottom: "8px",
    background: "#fff",
    color: "#3A2D28",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,
  textarea: {
    width: "100%",
    padding: "8px 12px",
    fontSize: "13px",
    border: "1px solid #D1C7BD",
    borderRadius: "4px",
    marginBottom: "8px",
    background: "#fff",
    color: "#3A2D28",
    minHeight: "60px",
    resize: "vertical" as const,
    boxSizing: "border-box" as const,
  } as React.CSSProperties,
  label: {
    fontSize: "12px",
    color: "#A48374",
    display: "block",
    marginBottom: "4px",
  } as React.CSSProperties,
  feedback: (type: "success" | "error" | "") => ({
    fontSize: "13px",
    marginTop: "8px",
    color: type === "success" ? "#155724" : type === "error" ? "#721c24" : "#3A2D28",
  } as React.CSSProperties),
  loading: {
    textAlign: "center" as const,
    padding: "40px",
    color: "#A48374",
    fontSize: "14px",
  } as React.CSSProperties,
};

export function GalleryManager() {
  const [collections, setCollections] = useState<CollectionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [emailForms, setEmailForms] = useState<Record<string, SendFormState>>({});

  const fetchCollections = useCallback(async () => {
    try {
      const res = await fetch("/api/gallery-images?limit=200&depth=1");
      const data = await res.json();
      const docs = (data.docs || []) as GalleryDoc[];

      const grouped: Record<string, CollectionGroup> = {};
      for (const doc of docs) {
        const name = doc.collectionName || "Uncategorized";
        if (!grouped[name]) {
          grouped[name] = {
            name,
            category: doc.category || "public",
            clientName: doc.clientName || "",
            clientEmail: doc.clientEmail || "",
            images: [],
          };
        }
        grouped[name].images.push(doc);
      }

      setCollections(Object.values(grouped));
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  function getShareLink(collectionName: string) {
    return `${window.location.origin}/gallery/${encodeURIComponent(collectionName)}`;
  }

  async function handleCopy(collectionName: string) {
    const link = getShareLink(collectionName);
    try {
      await navigator.clipboard.writeText(link);
      setCopiedName(collectionName);
      setTimeout(() => setCopiedName(null), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = link;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopiedName(collectionName);
      setTimeout(() => setCopiedName(null), 2000);
    }
  }

  function toggleEmailForm(collectionName: string, clientEmail: string) {
    setEmailForms((prev) => {
      if (prev[collectionName]) {
        const next = { ...prev };
        delete next[collectionName];
        return next;
      }
      return {
        ...prev,
        [collectionName]: {
          email: clientEmail || "",
          additionalEmails: "",
          sending: false,
          result: "",
          resultType: "",
        },
      };
    });
  }

  function updateEmailForm(collectionName: string, field: keyof SendFormState, value: string | boolean) {
    setEmailForms((prev) => ({
      ...prev,
      [collectionName]: {
        ...prev[collectionName],
        [field]: value,
      },
    }));
  }

  async function handleSend(collectionName: string) {
    const form = emailForms[collectionName];
    if (!form) return;

    const allEmails: string[] = [];
    if (form.email.trim()) {
      allEmails.push(form.email.trim());
    }
    if (form.additionalEmails.trim()) {
      const extras = form.additionalEmails.split(",").map((e) => e.trim()).filter(Boolean);
      allEmails.push(...extras);
    }

    if (allEmails.length === 0) {
      updateEmailForm(collectionName, "result", "Please enter at least one email address.");
      updateEmailForm(collectionName, "resultType", "error");
      return;
    }

    updateEmailForm(collectionName, "sending", true);
    updateEmailForm(collectionName, "result", "");

    try {
      const galleryUrl = getShareLink(collectionName);
      const to = allEmails.length === 1 ? allEmails[0] : allEmails;

      const res = await fetch("/api/send-gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, collectionName, galleryUrl }),
      });

      if (res.ok) {
        updateEmailForm(collectionName, "result", `Email sent to ${allEmails.join(", ")}`);
        updateEmailForm(collectionName, "resultType", "success");
      } else {
        const errData = await res.json();
        updateEmailForm(collectionName, "result", errData.error || "Failed to send email.");
        updateEmailForm(collectionName, "resultType", "error");
      }
    } catch {
      updateEmailForm(collectionName, "result", "Something went wrong. Please try again.");
      updateEmailForm(collectionName, "resultType", "error");
    } finally {
      updateEmailForm(collectionName, "sending", false);
    }
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading gallery collections...</div>
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Gallery Manager</h2>
        <p style={styles.meta}>No gallery collections found. Add images to the Gallery Images collection to get started.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Gallery Manager</h2>
      {collections.map((col) => (
        <div key={col.name} style={styles.card}>
          <div style={styles.collectionTitle}>
            {col.name}
            <span style={styles.badge(col.category)}>
              {col.category}
            </span>
          </div>
          <p style={styles.meta}>
            {col.images.length} image{col.images.length !== 1 ? "s" : ""}
          </p>
          {col.clientName && (
            <p style={styles.meta}>Client: {col.clientName}</p>
          )}
          {col.clientEmail && (
            <p style={styles.meta}>Email: {col.clientEmail}</p>
          )}

          <div style={styles.btnRow}>
            <button
              style={styles.btnOutline}
              onClick={() => handleCopy(col.name)}
            >
              {copiedName === col.name ? "COPIED!" : "COPY SHARE LINK"}
            </button>
            <button
              style={styles.btn}
              onClick={() => toggleEmailForm(col.name, col.clientEmail)}
            >
              {emailForms[col.name] ? "CLOSE" : "SEND EMAIL"}
            </button>
          </div>

          {emailForms[col.name] && (
            <div style={styles.emailForm}>
              <label style={styles.label}>Primary Email</label>
              <input
                type="email"
                style={styles.input}
                value={emailForms[col.name].email}
                onChange={(e) => updateEmailForm(col.name, "email", e.target.value)}
                placeholder="client@example.com"
              />
              <label style={styles.label}>Additional Emails (comma-separated)</label>
              <textarea
                style={styles.textarea}
                value={emailForms[col.name].additionalEmails}
                onChange={(e) => updateEmailForm(col.name, "additionalEmails", e.target.value)}
                placeholder="friend@example.com, family@example.com"
              />
              <button
                style={{
                  ...styles.btn,
                  opacity: emailForms[col.name].sending ? 0.6 : 1,
                }}
                disabled={emailForms[col.name].sending}
                onClick={() => handleSend(col.name)}
              >
                {emailForms[col.name].sending ? "SENDING..." : "SEND"}
              </button>
              {emailForms[col.name].result && (
                <p style={styles.feedback(emailForms[col.name].resultType)}>
                  {emailForms[col.name].result}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
