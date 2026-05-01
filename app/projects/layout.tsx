import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";

export const metadata: Metadata = {
  title: "Case Studies & Projects",
  description:
    "Browse notable legal matters and case studies handled by Opunabo Ekine & Associates — demonstrating expertise across litigation, corporate law, property, and energy sectors.",
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title: "Case Studies & Projects | Opunabo Ekine & Associates",
    description:
      "A selection of significant legal matters and landmark cases handled by Opunabo Ekine & Associates across Rivers State and Nigeria.",
    url: `${SITE_URL}/projects`,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Case Studies & Projects" }],
  },
  twitter: { card: "summary_large_image", title: "Case Studies & Projects | Opunabo Ekine & Associates" },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }])} />
      {children}
    </>
  );
}
