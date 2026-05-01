import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Team Members" };

export default function TeamMembersLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
