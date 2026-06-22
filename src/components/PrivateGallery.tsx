"use client";

import { useState } from "react";

export function PrivateGallery() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, this would verify against a database
    // For now, show a message
    if (!password.trim()) {
      setError("Please enter your gallery password.");
      return;
    }
    setError("");
    setUnlocked(true);
  }

  if (unlocked) {
    return (
      <div className="text-center py-12">
        <p className="font-script text-3xl text-brand-900 mb-4">Coming Soon</p>
        <p className="text-[14px] text-brand-600 leading-[1.8]">
          Your private gallery is being prepared. You&apos;ll receive an email
          notification when your photos are ready for viewing and download.
        </p>
        <button
          onClick={() => { setUnlocked(false); setPassword(""); }}
          className="mt-8 border border-brand-900 px-8 py-3 text-[10px] tracking-[0.25em] text-brand-900 hover:bg-brand-900 hover:text-white transition-all"
        >
          ENTER ANOTHER CODE
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your gallery password"
          className="w-full border border-brand-400 bg-white px-4 py-3.5 text-sm text-center focus:outline-none focus:border-brand-700 transition-colors"
        />
      </div>
      {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full bg-brand-900 text-white py-3.5 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors"
      >
        ACCESS GALLERY
      </button>
    </form>
  );
}
