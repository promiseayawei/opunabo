import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";

export const metadata: Metadata = {
  title: "Legal News & Insights",
  description:
    "Read the latest legal news, case commentary, and expert insights from the attorneys of Opunabo Ekine & Associates.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Legal News & Insights | Opunabo Ekine & Associates",
    description:
      "Expert legal commentary, case law updates, and practice insights from one of Port Harcourt's leading law firms.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [{ url: "/og-blog.jpg", width: 1200, height: 630, alt: "Legal News & Insights" }],
  },
  twitter: { card: "summary_large_image", title: "Legal News & Insights | Opunabo Ekine & Associates" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "News & Insights", href: "/blog" }])} />
      {children}
    </>
  );
}
