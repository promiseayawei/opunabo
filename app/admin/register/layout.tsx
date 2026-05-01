import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Register" };

export default function AdminRegisterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      {children}
    </div>
  );
}
