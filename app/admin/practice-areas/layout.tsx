import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Practice Areas" };

export default function PracticeAreasLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
