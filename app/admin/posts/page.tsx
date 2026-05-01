"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  api,
  type PaginatedResponse,
  type PostRecord,
  type UpdatePostInput,
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

type PostFormState = {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tagsInput: string;
  featured: boolean;
  author: string;
  status: string;
  published_at: string;
  cover_image: File | null;
  featured_image: File | null;
};

const initialForm: PostFormState = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  category: "",
  tagsInput: "",
  featured: false,
  author: "",
  status: "draft",
  published_at: "",
  cover_image: null,
  featured_image: null,
};

export default function AdminPostsPage() {
  const { ready, token } = useAdminAuth();
  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<PostRecord>["meta"] | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<PostFormState>(initialForm);

  useEffect(() => {
    if (!ready || !token) return;
    const authToken = token;

    let cancelled = false;

    async function loadPosts() {
      setLoading(true);
      setError(null);

      try {
        const response = await api.admin.posts.list({ token: authToken, page });
        if (cancelled) return;
        setPosts(response.data);
        setMeta(response.meta);
      } catch (err) {
        if (!cancelled) {
          setError(parseApiErrorMessage(err, "Failed to load posts."));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, [ready, token, page]);

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function mapRecordToForm(post: PostRecord): PostFormState {
    return {
      title: post.title || "",
      slug: post.slug || "",
      content: post.content || "",
      excerpt: post.excerpt || "",
      category: post.category || "",
      tagsInput: post.tags.join(", "),
      featured: post.featured,
      author: post.author || "",
      status: post.status || "draft",
      published_at: post.published_at ? post.published_at.slice(0, 10) : "",
      cover_image: null,
      featured_image: null,
    };
  }

  async function handleEdit(id: number) {
    if (!token) return;
    const authToken = token;

    try {
      const response = await api.admin.posts.get(id, { token: authToken });
      setForm(mapRecordToForm(response.data));
      setEditingId(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(parseApiErrorMessage(err, "Unable to load post details."));
    }
  }

  async function handleDelete(id: number) {
    if (!token) return;
    const authToken = token;
    if (!window.confirm("Delete this post?")) return;

    setDeletingId(id);
    setError(null);

    try {
      await api.admin.posts.delete(id, { token: authToken });
      setPosts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(parseApiErrorMessage(err, "Failed to delete post."));
    } finally {
      setDeletingId(null);
    }
  }

  function buildPayload(): UpdatePostInput {
    const tags = form.tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    return {
      title: form.title,
      slug: form.slug || undefined,
      content: form.content || undefined,
      excerpt: form.excerpt || undefined,
      category: form.category || undefined,
      tags,
      featured: form.featured,
      author: form.author || undefined,
      status: form.status || undefined,
      published_at: form.published_at || undefined,
      cover_image: form.cover_image || undefined,
      featured_image: form.featured_image || undefined,
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
        await api.admin.posts.update(editingId, payload, { token: authToken });
      } else {
        await api.admin.posts.create(payload as typeof payload & { title: string }, { token: authToken });
      }

      resetForm();
      const refreshed = await api.admin.posts.list({ token: authToken, page: 1 });
      setPosts(refreshed.data);
      setMeta(refreshed.meta);
      setPage(1);
    } catch (err) {
      setError(parseApiErrorMessage(err, "Failed to save post."));
    } finally {
      setSaving(false);
    }
  }

  if (!ready) {
    return <main className="min-h-screen bg-[#080C14]" />;
  }

  return (
    <AdminShell title="Posts" subtitle="Create, update, and remove published content.">
      <AdminAlert message={error} />

      <AdminCard title={editingId ? `Edit Post #${editingId}` : "Create Post"}>

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
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Category"
          />
          <input
            value={form.author}
            onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
            placeholder="Author"
          />
          <input
            value={form.tagsInput}
            onChange={(event) => setForm((prev) => ({ ...prev, tagsInput: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white sm:col-span-2"
            placeholder="Tags (comma separated)"
          />
          <textarea
            value={form.excerpt}
            onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))}
            className="min-h-[80px] rounded-md border border-white/15 bg-[#080C14] px-3 py-2 text-sm text-white sm:col-span-2"
            placeholder="Excerpt"
          />
          <textarea
            value={form.content}
            onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
            className="min-h-[180px] rounded-md border border-white/15 bg-[#080C14] px-3 py-2 text-sm text-white sm:col-span-2"
            placeholder="Content"
          />

          <select
            value={form.status}
            onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <input
            type="date"
            value={form.published_at}
            onChange={(event) => setForm((prev) => ({ ...prev, published_at: event.target.value }))}
            className="h-10 rounded-md border border-white/15 bg-[#080C14] px-3 text-sm text-white"
          />

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) => setForm((prev) => ({ ...prev, featured: event.target.checked }))}
            />
            Featured post
          </label>

          <label className="text-xs text-gray-400">
            Cover image
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setForm((prev) => ({ ...prev, cover_image: event.target.files?.[0] || null }))}
              className="mt-1 block w-full rounded-md border border-white/15 bg-[#080C14] px-2 py-1 text-xs text-gray-200"
            />
          </label>

          <label className="text-xs text-gray-400">
            Featured image
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setForm((prev) => ({ ...prev, featured_image: event.target.files?.[0] || null }))}
              className="mt-1 block w-full rounded-md border border-white/15 bg-[#080C14] px-2 py-1 text-xs text-gray-200"
            />
          </label>

          <AdminSubmitRow
            saving={saving}
            editing={Boolean(editingId)}
            createLabel="Create Post"
            updateLabel="Update Post"
            onCancel={resetForm}
          />
        </form>
      </AdminCard>

      <AdminCard
        className="mt-4"
        title="All Posts"
        rightSlot={
          <button
            type="button"
            onClick={() => setPage(1)}
            className="rounded-md border border-white/20 px-3 py-2 text-xs uppercase tracking-widest text-gray-300"
          >
            Refresh
          </button>
        }
      >
        <AdminDataTable
          loading={loading}
          loadingLabel="Loading posts..."
          emptyLabel="No posts found."
          items={posts}
          rowKey={(post) => post.id}
          minWidthClassName="min-w-[760px]"
          columns={[
            { id: "id", label: "ID", render: (post) => `#${post.id}` },
            { id: "title", label: "Title", cellClassName: "text-white", render: (post) => post.title },
            { id: "status", label: "Status", render: (post) => post.status },
            { id: "category", label: "Category", render: (post) => post.category || "-" },
            {
              id: "published",
              label: "Published",
              render: (post) => (post.published_at ? post.published_at.slice(0, 10) : "-"),
            },
            {
              id: "actions",
              label: "Actions",
              headerClassName: "text-right",
              cellClassName: "text-right",
              render: (post) => (
                <>
                  <button
                    type="button"
                    onClick={() => handleEdit(post.id)}
                    className="mr-2 rounded-md border border-[#FFD700]/40 px-2 py-1 text-xs text-[#FFD700]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={deletingId === post.id}
                    onClick={() => handleDelete(post.id)}
                    className="rounded-md border border-red-500/40 px-2 py-1 text-xs text-red-300 disabled:opacity-60"
                  >
                    {deletingId === post.id ? "Deleting..." : "Delete"}
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
