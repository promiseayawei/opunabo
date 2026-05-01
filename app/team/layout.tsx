import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";

export const metadata: Metadata = {
  title: "Our Legal Team",
  description:
    "Meet the experienced attorneys and legal professionals at Opunabo Ekine & Associates, Port Harcourt's trusted law firm for over 25 years.",
  alternates: { canonical: `${SITE_URL}/team` },
  openGraph: {
    title: "Our Legal Team | Opunabo Ekine & Associates",
    description:
      "Experienced barristers and solicitors dedicated to delivering exceptional legal outcomes. Meet the team behind Opunabo Ekine & Associates.",
    url: `${SITE_URL}/team`,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Our Legal Team" }],
  },
  twitter: { card: "summary_large_image", title: "Our Legal Team | Opunabo Ekine & Associates" },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Our Team", href: "/team" }])} />
      {children}
    </>
  );
}
