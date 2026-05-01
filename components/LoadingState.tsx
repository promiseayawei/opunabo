"use client";

import { Loader2 } from "lucide-react";

export function FetchSpinner({
  show,
  label = "Syncing live content",
  cacheAge,
}: {
  show: boolean;
  label?: string;
  cacheAge?: string;
}) {
  if (!show) return null;

  return (
    <div className="fixed right-4 top-24 z-[70]">
      <div className="flex items-center gap-2 border border-[#FFD700]/30 bg-[#080C14]/90 px-3 py-2 backdrop-blur-sm">
        <Loader2 size={14} className="text-[#FFD700] animate-spin" />
        <span className="text-[10px] font-sans uppercase tracking-widest text-[#FFD700]/80">
          {label}
          {cacheAge ? ` · ${cacheAge}` : ""}
        </span>
      </div>
    </div>
  );
}

export function PageSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="min-h-screen bg-[#080C14] px-6 py-24">
      <div className="mx-auto max-w-5xl animate-pulse space-y-4">
        {Array.from({ length: lines }).map((_, idx) => (
          <div
            key={idx}
            className="h-8 bg-gradient-to-r from-white/5 via-white/10 to-white/5"
            style={{ width: `${100 - idx * 7}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#080C14] px-6 py-20">
      <div className="mx-auto max-w-4xl animate-pulse">
        <div className="h-4 w-40 bg-white/10 mb-10" />
        <div className="h-5 w-28 bg-[#FFD700]/20 mb-6" />
        <div className="h-12 w-[85%] bg-white/10 mb-4" />
        <div className="h-12 w-[70%] bg-white/10 mb-8" />
        <div className="flex gap-3 mb-12">
          <div className="h-8 w-40 bg-white/10" />
          <div className="h-8 w-28 bg-white/10" />
          <div className="h-8 w-24 bg-white/10" />
        </div>

        <div className="space-y-4 border-t border-white/5 pt-12">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div
              key={idx}
              className="h-5 bg-gradient-to-r from-white/5 via-white/10 to-white/5"
              style={{ width: `${100 - idx * 4}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TeamProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#080C14] px-6 py-20">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-4 w-32 bg-white/10 mb-10" />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="h-[520px] w-full max-w-md bg-white/10" />

          <div>
            <div className="h-4 w-48 bg-[#FFD700]/20 mb-6" />
            <div className="h-10 w-[80%] bg-white/10 mb-4" />
            <div className="h-5 w-[65%] bg-[#FFD700]/20 mb-8" />

            <div className="space-y-3 mb-8">
              <div className="h-4 w-full bg-white/10" />
              <div className="h-4 w-[92%] bg-white/10" />
              <div className="h-4 w-[84%] bg-white/10" />
            </div>

            <div className="flex gap-3 mb-8">
              <div className="h-10 w-56 bg-white/10" />
              <div className="h-10 w-44 bg-white/10" />
            </div>

            <div className="h-12 w-56 bg-[#FFD700]/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
