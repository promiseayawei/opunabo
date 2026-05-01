import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";

export const metadata: Metadata = {
  title: "Our Practice Areas",
  description:
    "Explore the full range of legal practice areas at Opunabo Ekine & Associates — from litigation and corporate law to property, energy, family, and estate planning.",
  alternates: { canonical: `${SITE_URL}/practice-areas` },
  openGraph: {
    title: "Practice Areas | Opunabo Ekine & Associates",
    description:
      "Specialist legal representation across litigation, corporate & commercial, property, energy & natural resources, family law, and estates — Port Harcourt, Nigeria.",
    url: `${SITE_URL}/practice-areas`,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Our Practice Areas" }],
  },
  twitter: { card: "summary_large_image", title: "Practice Areas | Opunabo Ekine & Associates" },
};

export default function PracticeAreasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Practice Areas", href: "/practice-areas" }])} />
      {children}
    </>
  );
}
