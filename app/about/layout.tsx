import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Opunabo Ekine & Associates — a full-service law firm with over 25 years of principled legal practice in Port Harcourt, Rivers State, Nigeria.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Us | Opunabo Ekine & Associates",
    description:
      "25 years of principled legal practice, commercial sophistication, and genuine commitment to every client — headquartered in Port Harcourt, Nigeria.",
    url: `${SITE_URL}/about`,
    images: [{ url: "/og-about.jpg", width: 1200, height: 630, alt: "About Opunabo Ekine & Associates" }],
  },
  twitter: { card: "summary_large_image", title: "About Us | Opunabo Ekine & Associates" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "About Us", href: "/about" }])} />
      {children}
    </>
  );
}
