import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";

export const metadata: Metadata = {
  title: "Legal Fees & Pricing",
  description:
    "Understand the legal fee structure at Opunabo Ekine & Associates. Transparent pricing across consultation, retainer, and matter-specific engagements.",
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: "Legal Fees & Pricing | Opunabo Ekine & Associates",
    description:
      "Transparent and fair legal fee structures. Retainer, hourly, and fixed-fee options available across all practice areas.",
    url: `${SITE_URL}/pricing`,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Legal Fees & Pricing" }],
  },
  twitter: { card: "summary_large_image", title: "Legal Fees & Pricing | Opunabo Ekine & Associates" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Pricing", href: "/pricing" }])} />
      {children}
    </>
  );
}
