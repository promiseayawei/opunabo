"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  api,
  type PaginatedResponse,
  type TeamMemberRecord,
  type UpdateTeamMemberInput,
} from "@/lib/api";
import {
  AdminAlert,
  AdminCard,
  AdminDataTable,
  AdminPagination,
  AdminSubmitRow,
} from "@/components/admin/AdminCrud";
import { parseApiErrorMessage } from "@/lib/adminSession";
import { useAdminAuth } from "@/lib/useAdminAuth";

type TeamFormState = {
  name: string;
  slug: string;
  title: string;
  specialty: string;
  bio: string;
  email: string;
  phone: string;
  socialLinksJson: string;
  is_published: boolean;
  sort_order: string;
  image: File | null;
};

const initialForm: TeamFormState = {
  name: "",
  slug: "",
  title: "",
  specialty: "",
  bio: "",
  email: "",
  phone: "",
  socialLinksJson: "{}",
  is_published: true,
  sort_order: "1",
  image: null,
};

export default function AdminTeamMembersPage() {
  const { ready, token } = useAdminAuth();
  const [items, setItems] = useState<TeamMemberRecord[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<TeamMemberRecord>["meta"] | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<TeamFormState>(initialForm);

  useEffect(() => {
    if (!ready || !token) return;
    const authToken = token;

    let cancelled = false;

    async function loadItems() {
      setLoading(true);
      setError(null);

      try {
        const response = await api.admin.teamMembers.list({ token: authToken, query: { page } });
        if (cancelled) return;
        setItems(response.data);
        setMeta(response.meta);
      } catch (err) {
        if (!cancelled) {
          setError(parseApiErrorMessage(err, "Failed to load team members."));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      cancelled = true;
    };
  }, [ready, token, page]);

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function mapRecordToForm(item: TeamMemberRecord): TeamFormState {
    return {
      name: item.name || "",
      slug: item.slug || "",
      title: item.title || "",
      specialty: item.specialty || "",
      bio: item.bio || "",
      email: item.email || "",
      phone: item.phone || "",
      socialLinksJson: JSON.stringify(item.social_links || {}, null, 2),
      is_published: item.is_published,
      sort_order: String(item.sort_order || 1),
      image: null,
    };
  }

  async function handleEdit(id: number) {
    if (!token) return;
    const authToken = token;

    try {
      const response = await api.admin.teamMembers.get(id, { token: authToken });
      setForm(mapRecordToForm(response.data));
      setEditingId(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(parseApiErrorMessage(err, "Unable to load team member details."));
    }
  }

  async function handleDelete(id: number) {
    if (!token) return;
    const authToken = token;
    if (!window.confirm("Delete this team member?")) return;

    setDeletingId(id);
    setError(null);

    try {
      await api.admin.teamMembers.delete(id, { token: authToken });
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(parseApiErrorMessage(err, "Failed to delete team member."));
    } finally {
      setDeletingId(null);
    }
  }

  function buildPayload(): UpdateTeamMemberInput {
    let social_links: Record<string, string> | undefined;

    try {
      const parsed = JSON.parse(form.socialLinksJson || "{}");
      if (parsed && typeof parsed === "object") {
        social_links = parsed as Record<string, string>;
      }
    } catch {
      social_links = undefined;
    }

    return {
      name: form.name,
      slug: form.slug || undefined,
      title: form.title || undefined,
      specialty: form.specialty || undefined,
      bio: form.bio || undefined,
      email: form.email || undefined,
      phone: form.phone || undefined,
      social_links,
      is_published: form.is_published,
      sort_order: Number(form.sort_order || 1),
      image: form.image || undefined,
    };
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;
    const authToken = token;

    setSaving(true);
    setError(null);

    try {
      const payload = buildPayload();

      if (editingId) {
        await api.admin.teamMembers.update(editingId, payload, { token: authToken });
      } else {
        await api.admin.teamMembers.create(payload as typeof payload & { name: string }, { token: authToken });
      }

      resetForm();
      const refreshed = await api.admin.teamMembers.list({ token: authToken, query: { page: 1 } });
      setItems(refreshed.data);
      setMeta(refreshed.meta);
      setPage(1);
    } catch (err) {
      setError(parseApiErrorMessage(err, "Failed to save team member."));
    } finally {
      setSaving(false);
    }
  }

  if (!ready) {
    return <main className="min-h-screen bg-[#080C14]" />;
  }

  return (
    <AdminShell title="Team Members" subtitle="Manage attorney and staff profiles.">
      <AdminAlert message={error} />

      <AdminCard title={editingId ? `Edit Member #${editingId}` : "Create Team Member"}>

        <form className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <input
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Name *"
            required
          />
          <input
            value={form.slug}
            onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Slug"
          />
          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Role / Title"
          />
          <input
            value={form.specialty}
            onChange={(event) => setForm((prev) => ({ ...prev, specialty: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Specialty"
          />
          <input
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Email"
          />
          <input
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Phone"
          />
          <textarea
            value={form.bio}
            onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))}
            className="min-h-[120px] rounded-md border border-white/15 bg-[#080C14] px-3 py-2 text-sm text-white sm:col-span-2"
            placeholder="Biography"
          />
          <textarea
            value={form.socialLinksJson}
            onChange={(event) => setForm((prev) => ({ ...prev, socialLinksJson: event.target.value }))}
            className="min-h-[110px] rounded-md border border-white/15 bg-[#080C14] px-3 py-2 text-xs text-white sm:col-span-2"
            placeholder='{"linkedin":"https://..."}'
          />

          <input
            value={form.sort_order}
            onChange={(event) => setForm((prev) => ({ ...prev, sort_order: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Sort order"
          />

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(event) => setForm((prev) => ({ ...prev, is_published: event.target.checked }))}
            />
            Published
          </label>

          <label className="text-xs text-gray-400 sm:col-span-2">
            Profile image
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.files?.[0] || null }))}
              className="mt-1 block w-full rounded-md border border-white/15 bg-[#080C14] px-2 py-1 text-xs text-gray-200"
            />
          </label>

          <AdminSubmitRow
            saving={saving}
            editing={Boolean(editingId)}
            createLabel="Create Team Member"
            updateLabel="Update Team Member"
            onCancel={resetForm}
          />
        </form>
      </AdminCard>

      <AdminCard className="mt-4" title="All Team Members">
        <AdminDataTable
          loading={loading}
          loadingLabel="Loading team members..."
          emptyLabel="No team members found."
          items={items}
          rowKey={(item) => item.id}
          minWidthClassName="min-w-[740px]"
          columns={[
            { id: "id", label: "ID", render: (item) => `#${item.id}` },
            { id: "name", label: "Name", cellClassName: "text-white", render: (item) => item.name },
            { id: "title", label: "Title", render: (item) => item.title || "-" },
            { id: "published", label: "Published", render: (item) => (item.is_published ? "Yes" : "No") },
            { id: "sort", label: "Sort", render: (item) => item.sort_order },
            {
              id: "actions",
              label: "Actions",
              headerClassName: "text-right",
              cellClassName: "text-right",
              render: (item) => (
                <>
                  <button
                    type="button"
                    onClick={() => handleEdit(item.id)}
                    className="mr-2 rounded-md border border-[#FFD700]/40 px-2 py-1 text-xs text-[#FFD700]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={deletingId === item.id}
                    onClick={() => handleDelete(item.id)}
                    className="rounded-md border border-red-500/40 px-2 py-1 text-xs text-red-300 disabled:opacity-60"
                  >
                    {deletingId === item.id ? "Deleting..." : "Delete"}
                  </button>
                </>
              ),
            },
          ]}
        />
        <AdminPagination meta={meta} onPageChange={setPage} />
      </AdminCard>
    </AdminShell>
  );
}
