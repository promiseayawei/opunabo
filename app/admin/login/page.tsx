"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import {
  getAdminToken,
  parseApiErrorMessage,
  setAdminToken,
  setAdminUser,
} from "@/lib/adminSession";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (token) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.trim().toUpperCase() === "ADMIN_PASSWORD") {
      setError("Use the real admin password. 'ADMIN_PASSWORD' is only a placeholder.");
      return;
    }

    setBusy(true);
    setError(null);

    try {
      const response = await api.auth.login({ email, password });
      setAdminToken(response.token);
      setAdminUser(response.admin);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(parseApiErrorMessage(err, "Login failed. Check your credentials and try again."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0E1420] p-6 sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#FFD700]/70">Admin</p>
        <h1 className="mt-2 text-2xl font-bold text-[#FFD700]">Sign In</h1>
        <p className="mt-2 text-sm text-gray-400">Access dashboard tools and content management.</p>
        <p className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
          Use valid backend credentials. Placeholder values like ADMIN_PASSWORD will fail.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-gray-400" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@opunaboekine.ng"
              autoComplete="email"
              required
              className="h-11 w-full rounded-lg border border-white/15 bg-[#080C14] px-3 text-sm text-white outline-none ring-[#FFD700] transition focus:ring-1"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-gray-400" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your real admin password"
              autoComplete="current-password"
              required
              className="h-11 w-full rounded-lg border border-white/15 bg-[#080C14] px-3 text-sm text-white outline-none ring-[#FFD700] transition focus:ring-1"
            />
          </div>

          {error ? (
            <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="h-11 w-full rounded-lg bg-[#FFD700] px-4 text-xs font-bold uppercase tracking-widest text-[#080C14] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {busy ? "Signing In..." : "Sign In"}
          </button>
        </form>
    </div>
  );
}
