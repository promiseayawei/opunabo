import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Opunabo Ekine & Associates in Port Harcourt, Nigeria. Get expert legal advice on litigation, corporate law, property law, and more.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Us | Opunabo Ekine & Associates",
    description:
      "Reach our legal team in Port Harcourt, Rivers State, Nigeria. Phone, email, and office location details.",
    url: `${SITE_URL}/contact`,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Contact Opunabo Ekine & Associates" }],
  },
  twitter: { card: "summary_large_image", title: "Contact Us | Opunabo Ekine & Associates" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }])} />
      {children}
    </>
  );
}
