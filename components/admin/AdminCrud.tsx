"use client";

import { ReactNode } from "react";
import type { PaginationMeta } from "@/lib/api";

type AlertType = "error" | "success";

type AdminAlertProps = {
  message: string | null;
  type?: AlertType;
};

export function AdminAlert({ message, type = "error" }: AdminAlertProps) {
  if (!message) return null;

  const styles =
    type === "success"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
      : "border-red-500/30 bg-red-500/10 text-red-300";

  return <div className={`mb-4 rounded-md border px-4 py-3 text-sm ${styles}`}>{message}</div>;
}

type AdminCardProps = {
  title?: string;
  rightSlot?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function AdminCard({ title, rightSlot, children, className = "" }: AdminCardProps) {
  return (
    <section className={`rounded-xl border border-white/10 bg-[#0E1420] p-4 ${className}`.trim()}>
      {title || rightSlot ? (
        <div className="mb-3 flex items-center justify-between gap-2">
          {title ? <h2 className="text-lg font-semibold text-[#FFD700]">{title}</h2> : <span />}
          {rightSlot}
        </div>
      ) : null}
      {children}
    </section>
  );
}

type AdminSubmitRowProps = {
  saving: boolean;
  editing: boolean;
  createLabel: string;
  updateLabel: string;
  onCancel?: () => void;
};

export function AdminSubmitRow({
  saving,
  editing,
  createLabel,
  updateLabel,
  onCancel,
}: AdminSubmitRowProps) {
  return (
    <div className="sm:col-span-2 flex gap-2">
      <button
        type="submit"
        disabled={saving}
        className="h-10 rounded-md bg-[#FFD700] px-4 text-xs font-bold uppercase tracking-widest text-[#080C14] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {saving ? "Saving..." : editing ? updateLabel : createLabel}
      </button>
      {editing && onCancel ? (
        <button
          type="button"
          onClick={onCancel}
          className="h-10 rounded-md border border-white/20 px-4 text-xs font-semibold uppercase tracking-widest text-gray-200"
        >
          Cancel Edit
        </button>
      ) : null}
    </div>
  );
}

type AdminTableColumn<T> = {
  id: string;
  label: string;
  headerClassName?: string;
  cellClassName?: string;
  render: (row: T) => ReactNode;
};

type AdminDataTableProps<T> = {
  loading: boolean;
  loadingLabel: string;
  emptyLabel: string;
  items: T[];
  rowKey: (row: T) => string | number;
  columns: Array<AdminTableColumn<T>>;
  minWidthClassName?: string;
};

export function AdminDataTable<T>({
  loading,
  loadingLabel,
  emptyLabel,
  items,
  rowKey,
  columns,
  minWidthClassName = "min-w-[720px]",
}: AdminDataTableProps<T>) {
  if (loading) {
    return <p className="text-sm text-gray-400">{loadingLabel}</p>;
  }

  if (items.length === 0) {
    return <p className="text-sm text-gray-400">{emptyLabel}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className={`w-full text-left text-sm ${minWidthClassName}`.trim()}>
        <thead className="text-xs uppercase tracking-wider text-gray-400">
          <tr>
            {columns.map((column) => (
              <th key={column.id} className={`pb-2 ${column.headerClassName || ""}`.trim()}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={rowKey(item)} className="border-t border-white/10">
              {columns.map((column) => (
                <td key={column.id} className={`py-2 ${column.cellClassName || "text-gray-300"}`.trim()}>
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type AdminPaginationProps = {
  meta: PaginationMeta | null;
  onPageChange: (page: number) => void;
};

export function AdminPagination({ meta, onPageChange }: AdminPaginationProps) {
  if (!meta) return null;

  return (
    <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
      <span>
        Page {meta.current_page} of {meta.last_page} • Total {meta.total}
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, meta.current_page - 1))}
          disabled={meta.current_page <= 1}
          className="rounded-md border border-white/20 px-2 py-1 disabled:opacity-50"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(meta.last_page, meta.current_page + 1))}
          disabled={meta.current_page >= meta.last_page}
          className="rounded-md border border-white/20 px-2 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
