"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { api, type DashboardStats } from "@/lib/api";
import { clearAdminSession, parseApiErrorMessage, setAdminUser } from "@/lib/adminSession";
import { useAdminAuth } from "@/lib/useAdminAuth";

const initialStats: DashboardStats = {
  posts: 0,
  published_posts: 0,
  team_members: 0,
  practice_areas: 0,
  testimonials: 0,
};

export default function AdminDashboardPage() {
  const { ready, token, admin } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready || !token) return;
    const authToken = token;

    let cancelled = false;

    async function loadDashboard() {
      setLoading(true);
      setError(null);

      try {
        const [meResponse, statsResponse] = await Promise.all([
          api.auth.me({ token: authToken }),
          api.dashboard.getStats({ token: authToken }),
        ]);

        if (cancelled) return;

        setAdminUser(meResponse.data);
        setStats(statsResponse.stats);
      } catch (err) {
        if (cancelled) return;

        const message = parseApiErrorMessage(err, "Unable to load dashboard data.");
        setError(message);

        if (message.toLowerCase().includes("unauth")) {
          clearAdminSession();
          window.location.href = "/admin/login";
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [ready, token]);

  if (!ready) {
    return <main className="min-h-screen bg-[#080C14]" />;
  }

  return (
    <AdminShell
      title="Dashboard"
      subtitle={admin ? `Signed in as ${admin.name} (${admin.role})` : "Overview of site content"}
    >
      {error ? (
        <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { key: "posts", label: "Posts", value: stats.posts },
          { key: "published_posts", label: "Published", value: stats.published_posts },
          { key: "team_members", label: "Team Members", value: stats.team_members },
          { key: "practice_areas", label: "Practice Areas", value: stats.practice_areas },
          { key: "testimonials", label: "Testimonials", value: stats.testimonials },
        ].map((item) => (
          <article key={item.key} className="rounded-xl border border-white/10 bg-[#0E1420] p-4">
            <p className="text-xs uppercase tracking-widest text-gray-400">{item.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#FFD700]">{loading ? "..." : item.value}</p>
          </article>
        ))}
      </div>

      <section className="mt-5 rounded-xl border border-white/10 bg-[#0E1420] p-4">
        <h2 className="text-lg font-semibold text-[#FFD700]">Quick Actions</h2>
        <p className="mt-1 text-sm text-gray-400">
          Use the tabs above to manage posts, team members, testimonials, practice areas, and about content.
        </p>
      </section>
    </AdminShell>
  );
}
