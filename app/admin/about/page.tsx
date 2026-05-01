"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { api, type AboutSection, type UpdateAboutInput } from "@/lib/api";
import { parseApiErrorMessage } from "@/lib/adminSession";
import { useAdminAuth } from "@/lib/useAdminAuth";

type AboutFormState = {
  title: string;
  content: string;
  sectionsJson: string;
  image: File | null;
};

const initialForm: AboutFormState = {
  title: "",
  content: "",
  sectionsJson: "[]",
  image: null,
};

export default function AdminAboutPage() {
  const { ready, token } = useAdminAuth();
  const [form, setForm] = useState<AboutFormState>(initialForm);
  const [recordId, setRecordId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!ready || !token) return;
    const authToken = token;

    let cancelled = false;

    async function loadAbout() {
      setLoading(true);
      setError(null);

      try {
        const response = await api.admin.about.get({ token: authToken });
        if (cancelled) return;

        const data = response.data;
        setRecordId(data.id);
        setForm({
          title: data.title || "",
          content: data.content || "",
          sectionsJson: JSON.stringify(data.sections || [], null, 2),
          image: null,
        });
      } catch (err) {
        if (!cancelled) {
          setError(parseApiErrorMessage(err, "Failed to load about content."));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAbout();

    return () => {
      cancelled = true;
    };
  }, [ready, token]);

  function parseSections(input: string): AboutSection[] {
    if (!input.trim()) return [];

    const parsed = JSON.parse(input) as unknown;
    if (!Array.isArray(parsed)) {
      throw new Error("Sections must be a JSON array.");
    }

    return parsed.map((section, index) => {
      if (!section || typeof section !== "object") {
        throw new Error(`Section ${index + 1} is invalid.`);
      }

      const candidate = section as Record<string, unknown>;
      const heading = candidate.heading;
      const body = candidate.body;

      if (typeof heading !== "string" || typeof body !== "string") {
        throw new Error(`Section ${index + 1} must include string heading and body.`);
      }

      return { heading, body };
    });
  }

  function buildPayload(): UpdateAboutInput {
    return {
      title: form.title || undefined,
      content: form.content || undefined,
      sections: parseSections(form.sectionsJson),
      image: form.image || undefined,
    };
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;
    const authToken = token;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = buildPayload();
      const response = await api.admin.about.update(payload, { token: authToken });

      setRecordId(response.data.id);
      setForm((prev) => ({ ...prev, image: null }));
      setSuccess("About page content updated successfully.");
    } catch (err) {
      setError(parseApiErrorMessage(err, "Failed to update about content."));
    } finally {
      setSaving(false);
    }
  }

  if (!ready) {
    return <main className="min-h-screen bg-[#080C14]" />;
  }

  return (
    <AdminShell title="About Page" subtitle="Manage the about page content and sections.">
      {error ? (
        <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="mb-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {success}
        </div>
      ) : null}

      <section className="rounded-xl border border-white/10 bg-[#0E1420] p-4">
        <h2 className="text-lg font-semibold text-[#FFD700]">
          {recordId ? `Edit About Record #${recordId}` : "Edit About Content"}
        </h2>

        {loading ? (
          <p className="mt-4 text-sm text-gray-400">Loading content...</p>
        ) : (
          <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
            <input
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
              placeholder="About title"
            />

            <textarea
              value={form.content}
              onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
              className="min-h-[160px] rounded-md border border-white/15 bg-[#080C14] px-3 py-2 text-sm text-white"
              placeholder="Main about content"
            />

            <textarea
              value={form.sectionsJson}
              onChange={(event) => setForm((prev) => ({ ...prev, sectionsJson: event.target.value }))}
              className="min-h-[180px] rounded-md border border-white/15 bg-[#080C14] px-3 py-2 font-mono text-xs text-white"
              placeholder='[{"heading":"Who We Are","body":"..."}]'
            />
            <p className="text-xs text-gray-500">Provide sections as a JSON array of objects with heading and body.</p>

            <label className="text-xs text-gray-400">
              Hero image
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.files?.[0] || null }))}
                className="mt-1 block w-full rounded-md border border-white/15 bg-[#080C14] px-2 py-1 text-xs text-gray-200"
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="h-10 w-fit rounded-md bg-[#FFD700] px-4 text-xs font-bold uppercase tracking-widest text-[#080C14] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save About Content"}
            </button>
          </form>
        )}
      </section>
    </AdminShell>
  );
}
