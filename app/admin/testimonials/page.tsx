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
  type TestimonialRecord,
  type UpdateTestimonialInput,
} from "@/lib/api";
import { parseApiErrorMessage } from "@/lib/adminSession";
import { useAdminAuth } from "@/lib/useAdminAuth";

type TestimonialFormState = {
  author_name: string;
  position: string;
  testimonial_text: string;
  is_published: boolean;
  sort_order: string;
  photo: File | null;
};

const initialForm: TestimonialFormState = {
  author_name: "",
  position: "",
  testimonial_text: "",
  is_published: true,
  sort_order: "1",
  photo: null,
};

export default function AdminTestimonialsPage() {
  const { ready, token } = useAdminAuth();
  const [items, setItems] = useState<TestimonialRecord[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<TestimonialRecord>["meta"] | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<TestimonialFormState>(initialForm);

  useEffect(() => {
    if (!ready || !token) return;
    const authToken = token;

    let cancelled = false;

    async function loadItems() {
      setLoading(true);
      setError(null);

      try {
        const response = await api.admin.testimonials.list({ token: authToken, query: { page } });
        if (cancelled) return;
        setItems(response.data);
        setMeta(response.meta);
      } catch (err) {
        if (!cancelled) {
          setError(parseApiErrorMessage(err, "Failed to load testimonials."));
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

  function mapRecordToForm(item: TestimonialRecord): TestimonialFormState {
    return {
      author_name: item.author_name || "",
      position: item.position || "",
      testimonial_text: item.testimonial_text || "",
      is_published: item.is_published,
      sort_order: String(item.sort_order || 1),
      photo: null,
    };
  }

  async function handleEdit(id: number) {
    if (!token) return;
    const authToken = token;

    try {
      const response = await api.admin.testimonials.get(id, { token: authToken });
      setForm(mapRecordToForm(response.data));
      setEditingId(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(parseApiErrorMessage(err, "Unable to load testimonial details."));
    }
  }

  async function handleDelete(id: number) {
    if (!token) return;
    const authToken = token;
    if (!window.confirm("Delete this testimonial?")) return;

    setDeletingId(id);
    setError(null);

    try {
      await api.admin.testimonials.delete(id, { token: authToken });
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(parseApiErrorMessage(err, "Failed to delete testimonial."));
    } finally {
      setDeletingId(null);
    }
  }

  function buildPayload(): UpdateTestimonialInput {
    return {
      author_name: form.author_name,
      position: form.position || undefined,
      testimonial_text: form.testimonial_text,
      is_published: form.is_published,
      sort_order: Number(form.sort_order || 1),
      photo: form.photo || undefined,
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
        await api.admin.testimonials.update(editingId, payload, { token: authToken });
      } else {
        await api.admin.testimonials.create(
          payload as typeof payload & { author_name: string; testimonial_text: string },
          { token: authToken }
        );
      }

      resetForm();
      const refreshed = await api.admin.testimonials.list({ token: authToken, query: { page: 1 } });
      setItems(refreshed.data);
      setMeta(refreshed.meta);
      setPage(1);
    } catch (err) {
      setError(parseApiErrorMessage(err, "Failed to save testimonial."));
    } finally {
      setSaving(false);
    }
  }

  if (!ready) {
    return <main className="min-h-screen bg-[#080C14]" />;
  }

  return (
    <AdminShell title="Testimonials" subtitle="Manage client testimonial entries.">
      <AdminAlert message={error} />

      <AdminCard title={editingId ? `Edit Testimonial #${editingId}` : "Create Testimonial"}>
        <form className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <input
            value={form.author_name}
            onChange={(event) => setForm((prev) => ({ ...prev, author_name: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Author name *"
            required
          />
          <input
            value={form.position}
            onChange={(event) => setForm((prev) => ({ ...prev, position: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Position"
          />

          <textarea
            value={form.testimonial_text}
            onChange={(event) => setForm((prev) => ({ ...prev, testimonial_text: event.target.value }))}
            className="min-h-[120px] rounded-md border border-white/15 bg-[#080C14] px-3 py-2 text-sm text-white sm:col-span-2"
            placeholder="Testimonial text *"
            required
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
            Photo
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setForm((prev) => ({ ...prev, photo: event.target.files?.[0] || null }))}
              className="mt-1 block w-full rounded-md border border-white/15 bg-[#080C14] px-2 py-1 text-xs text-gray-200"
            />
          </label>

          <AdminSubmitRow
            saving={saving}
            editing={Boolean(editingId)}
            createLabel="Create Testimonial"
            updateLabel="Update Testimonial"
            onCancel={resetForm}
          />
        </form>
      </AdminCard>

      <AdminCard className="mt-4" title="All Testimonials">
        <AdminDataTable
          loading={loading}
          loadingLabel="Loading testimonials..."
          emptyLabel="No testimonials found."
          items={items}
          rowKey={(item) => item.id}
          minWidthClassName="min-w-[720px]"
          columns={[
            { id: "id", label: "ID", render: (item) => `#${item.id}` },
            { id: "author", label: "Author", cellClassName: "text-white", render: (item) => item.author_name },
            { id: "position", label: "Position", render: (item) => item.position || "-" },
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
