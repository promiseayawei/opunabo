"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  AdminAlert,
  AdminCard,
  AdminDataTable,
  AdminPagination,
  AdminSubmitRow,
} from "@/components/admin/AdminCrud";
import {
  api,
  type PaginatedResponse,
  type PracticeAreaRecord,
  type UpdatePracticeAreaInput,
} from "@/lib/api";
import { parseApiErrorMessage } from "@/lib/adminSession";
import { useAdminAuth } from "@/lib/useAdminAuth";

type PracticeFormState = {
  title: string;
  slug: string;
  description: string;
  icon: string;
  is_published: boolean;
  sort_order: string;
  image: File | null;
};

const initialForm: PracticeFormState = {
  title: "",
  slug: "",
  description: "",
  icon: "",
  is_published: true,
  sort_order: "1",
  image: null,
};

export default function AdminPracticeAreasPage() {
  const { ready, token } = useAdminAuth();
  const [items, setItems] = useState<PracticeAreaRecord[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<PracticeAreaRecord>["meta"] | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<PracticeFormState>(initialForm);

  useEffect(() => {
    if (!ready || !token) return;
    const authToken = token;

    let cancelled = false;

    async function loadItems() {
      setLoading(true);
      setError(null);

      try {
        const response = await api.admin.practiceAreas.list({ token: authToken, query: { page } });
        if (cancelled) return;
        setItems(response.data);
        setMeta(response.meta);
      } catch (err) {
        if (!cancelled) {
          setError(parseApiErrorMessage(err, "Failed to load practice areas."));
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

  function mapRecordToForm(item: PracticeAreaRecord): PracticeFormState {
    return {
      title: item.title || "",
      slug: item.slug || "",
      description: item.description || "",
      icon: item.icon || "",
      is_published: item.is_published,
      sort_order: String(item.sort_order || 1),
      image: null,
    };
  }

  async function handleEdit(id: number) {
    if (!token) return;
    const authToken = token;

    try {
      const response = await api.admin.practiceAreas.get(id, { token: authToken });
      setForm(mapRecordToForm(response.data));
      setEditingId(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(parseApiErrorMessage(err, "Unable to load practice area details."));
    }
  }

  async function handleDelete(id: number) {
    if (!token) return;
    const authToken = token;
    if (!window.confirm("Delete this practice area?")) return;

    setDeletingId(id);
    setError(null);

    try {
      await api.admin.practiceAreas.delete(id, { token: authToken });
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(parseApiErrorMessage(err, "Failed to delete practice area."));
    } finally {
      setDeletingId(null);
    }
  }

  function buildPayload(): UpdatePracticeAreaInput {
    return {
      title: form.title,
      slug: form.slug || undefined,
      description: form.description || undefined,
      icon: form.icon || undefined,
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
        await api.admin.practiceAreas.update(editingId, payload, { token: authToken });
      } else {
        await api.admin.practiceAreas.create(payload as typeof payload & { title: string }, { token: authToken });
      }

      resetForm();
      const refreshed = await api.admin.practiceAreas.list({ token: authToken, query: { page: 1 } });
      setItems(refreshed.data);
      setMeta(refreshed.meta);
      setPage(1);
    } catch (err) {
      setError(parseApiErrorMessage(err, "Failed to save practice area."));
    } finally {
      setSaving(false);
    }
  }

  if (!ready) {
    return <main className="min-h-screen bg-[#080C14]" />;
  }

  return (
    <AdminShell title="Practice Areas" subtitle="Manage legal practice area entries.">
      <AdminAlert message={error} />

      <AdminCard title={editingId ? `Edit Practice Area #${editingId}` : "Create Practice Area"}>
        <form className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Title *"
            required
          />
          <input
            value={form.slug}
            onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Slug"
          />
          <input
            value={form.icon}
            onChange={(event) => setForm((prev) => ({ ...prev, icon: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Icon name (e.g. briefcase)"
          />
          <input
            value={form.sort_order}
            onChange={(event) => setForm((prev) => ({ ...prev, sort_order: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Sort order"
          />

          <label className="flex items-center gap-2 text-sm text-gray-300 sm:col-span-2">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(event) => setForm((prev) => ({ ...prev, is_published: event.target.checked }))}
            />
            Published
          </label>

          <textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            className="min-h-[120px] rounded-md border border-white/15 bg-[#080C14] px-3 py-2 text-sm text-white sm:col-span-2"
            placeholder="Description"
          />

          <label className="text-xs text-gray-400 sm:col-span-2">
            Image
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
            createLabel="Create Practice Area"
            updateLabel="Update Practice Area"
            onCancel={resetForm}
          />
        </form>
      </AdminCard>

      <AdminCard className="mt-4" title="All Practice Areas">
        <AdminDataTable
          loading={loading}
          loadingLabel="Loading practice areas..."
          emptyLabel="No practice areas found."
          items={items}
          rowKey={(item) => item.id}
          minWidthClassName="min-w-[720px]"
          columns={[
            { id: "id", label: "ID", render: (item) => `#${item.id}` },
            { id: "title", label: "Title", cellClassName: "text-white", render: (item) => item.title },
            { id: "icon", label: "Icon", render: (item) => item.icon || "-" },
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
