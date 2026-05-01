import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description:
    "See what clients say about Opunabo Ekine & Associates — real testimonials on our legal services in litigation, corporate law, property, and more.",
  alternates: { canonical: `${SITE_URL}/testimonials` },
  openGraph: {
    title: "Client Testimonials | Opunabo Ekine & Associates",
    description:
      "Trusted by hundreds of clients across Rivers State and Nigeria. Read testimonials about our legal representation and client service.",
    url: `${SITE_URL}/testimonials`,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Client Testimonials" }],
  },
  twitter: { card: "summary_large_image", title: "Client Testimonials | Opunabo Ekine & Associates" },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Testimonials", href: "/testimonials" }])} />
      {children}
    </>
  );
}
