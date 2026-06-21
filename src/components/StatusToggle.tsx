"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function StatusToggle({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleStatus() {
    setLoading(true);
    const newStatus = currentStatus === "new" ? "reviewed" : "new";

    await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={toggleStatus}
      disabled={loading}
      className={`px-4 py-2 text-xs tracking-widest rounded transition-colors disabled:opacity-50 ${
        currentStatus === "new"
          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
          : "bg-green-100 text-green-800 hover:bg-green-200"
      }`}
    >
      {loading
        ? "UPDATING..."
        : currentStatus === "new"
        ? "MARK REVIEWED"
        : "MARK AS NEW"}
    </button>
  );
}
