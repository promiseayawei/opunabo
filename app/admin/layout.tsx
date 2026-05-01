import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Admin — Opunabo & Associates",
    template: "%s | Admin — Opunabo & Associates",
  },
  description: "Content management dashboard for Opunabo & Associates.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080C14] text-white antialiased" suppressHydrationWarning>
      {children}
    </div>
  );
}
