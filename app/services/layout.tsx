import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";

export const metadata: Metadata = {
  title: "Our Legal Services",
  description:
    "Opunabo Ekine & Associates provides expert legal services across dispute resolution, corporate advisory, real estate, employment law, and more across Nigeria.",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: "Our Legal Services | Opunabo Ekine & Associates",
    description:
      "Comprehensive legal services from one of Rivers State's most respected law firms. Strategic advice, fearless advocacy, client-first outcomes.",
    url: `${SITE_URL}/services`,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Legal Services" }],
  },
  twitter: { card: "summary_large_image", title: "Our Legal Services | Opunabo Ekine & Associates" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }])} />
      {children}
    </>
  );
}
