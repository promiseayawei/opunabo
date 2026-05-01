"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import {
  getAdminToken,
  parseApiErrorMessage,
  setAdminToken,
  setAdminUser,
} from "@/lib/adminSession";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [busy, setBusy]         = useState(false);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (token) router.replace("/admin/dashboard");
  }, [router]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
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
      setError(parseApiErrorMessage(err, "Registration failed. Please try again."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0E1420] p-6 sm:p-8">
      <p className="text-[11px] uppercase tracking-[0.25em] text-[#FFD700]/70">Admin</p>
      <h1 className="mt-2 text-2xl font-bold text-[#FFD700]">Create Account</h1>
      <p className="mt-2 text-sm text-gray-400">Register for administrative access.</p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-gray-400" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-11 w-full rounded-lg border border-white/15 bg-[#080C14] px-3 text-sm text-white outline-none ring-[#FFD700] transition focus:ring-1"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-gray-400" htmlFor="reg-email">
            Email
          </label>
          <input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 w-full rounded-lg border border-white/15 bg-[#080C14] px-3 text-sm text-white outline-none ring-[#FFD700] transition focus:ring-1"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-gray-400" htmlFor="reg-password">
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="h-11 w-full rounded-lg border border-white/15 bg-[#080C14] px-3 text-sm text-white outline-none ring-[#FFD700] transition focus:ring-1"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-gray-400" htmlFor="confirm">
            Confirm Password
          </label>
          <input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={8}
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
          {busy ? "Creating Account…" : "Create Account"}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-gray-500">
        Already have an account?{" "}
        <Link href="/admin/login" className="text-[#FFD700]/80 hover:text-[#FFD700] transition-colors">
          Sign In
        </Link>
      </p>
    </div>
  );
}
