"use client";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-[#0f172a] text-gray-100 min-h-screen px-6 md:px-16 py-10">
      <div className="max-w-6xl mx-auto space-y-16">{children}</div>
    </main>
  );
}
