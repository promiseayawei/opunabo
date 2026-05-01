import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Schedule a confidential legal consultation with an attorney at Opunabo Ekine & Associates, Port Harcourt, Nigeria.",
  alternates: { canonical: `${SITE_URL}/book` },
  openGraph: {
    title: "Book a Consultation | Opunabo Ekine & Associates",
    description:
      "Book your confidential legal consultation with Opunabo Ekine & Associates. Expert advice across all practice areas.",
    url: `${SITE_URL}/book`,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Book a Consultation" }],
  },
  twitter: { card: "summary_large_image", title: "Book a Consultation | Opunabo Ekine & Associates" },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Book a Consultation", href: "/book" }])} />
      {children}
    </>
  );
}
