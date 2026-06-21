"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="font-script text-4xl text-brand-700 mb-2">Gigi&apos;s Concept</p>
          <p className="text-sm tracking-[0.2em] text-brand-600">ADMIN</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 border border-brand-200">
          <div className="mb-6">
            <label className="block text-sm mb-2">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-brand-400 px-4 py-3 text-sm focus:outline-none focus:border-brand-700"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full border border-brand-400 px-4 py-3 text-sm focus:outline-none focus:border-brand-700"
            />
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-900 text-white py-3 text-sm tracking-[0.2em] hover:bg-brand-700 transition-colors disabled:opacity-50"
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>
      </div>
    </div>
  );
}
