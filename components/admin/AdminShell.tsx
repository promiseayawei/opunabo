"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { clearAdminSession, getAdminToken } from "@/lib/adminSession";

type AdminShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

const links = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Posts", href: "/admin/posts" },
  { label: "Team", href: "/admin/team-members" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "Practice Areas", href: "/admin/practice-areas" },
  { label: "About", href: "/admin/about" },
];

export default function AdminShell({ title, subtitle, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const active = useMemo(() => pathname || "", [pathname]);

  async function handleLogout() {
    const token = getAdminToken();
    setBusy(true);

    try {
      if (token) {
        await api.auth.logout({ token });
      }
    } catch {
      // Clear local session regardless of API logout outcome.
    } finally {
      clearAdminSession();
      setBusy(false);
      router.replace("/admin/login");
    }
  }

  return (
    <main className="min-h-screen bg-[#080C14] text-white px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-xl border border-white/10 bg-[#0E1420] p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#FFD700]/70">Admin Console</p>
              <h1 className="mt-2 text-2xl font-bold text-[#FFD700]">{title}</h1>
              {subtitle ? <p className="mt-1 text-sm text-gray-400">{subtitle}</p> : null}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={busy}
              className="h-10 rounded-lg border border-[#FFD700]/40 px-4 text-xs font-semibold uppercase tracking-widest text-[#FFD700] transition hover:bg-[#FFD700]/10 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {busy ? "Signing out..." : "Logout"}
            </button>
          </div>

          <nav className="mt-4 flex flex-wrap gap-2">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md border px-3 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    isActive
                      ? "border-[#FFD700] bg-[#FFD700] text-[#080C14]"
                      : "border-white/10 bg-white/5 text-gray-300 hover:border-[#FFD700]/40 hover:text-[#FFD700]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {children}
      </div>
    </main>
  );
}
