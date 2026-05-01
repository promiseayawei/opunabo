/**
 * JSON-LD Structured Data component.
 * Usage:  <JsonLd data={schema} />
 *
 * Accepts any schema.org object or array of objects.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─── Pre-built schemas ──────────────────────────────────────── */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LegalService", "LocalBusiness"],
  name: "Opunabo Ekine & Associates",
  alternateName: "Opunabo & Associates",
  description:
    "Full-service Nigerian law firm offering litigation, corporate law, property law, energy law, and estate planning — headquartered in Port Harcourt, Rivers State.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo2.png`,
  image: `${SITE_URL}/og-default.jpg`,
  telephone: "+234-000-000-0000",
  email: "info@opunaboekine.ng",
  foundingDate: "1999",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 25 },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Port Harcourt",
    addressRegion: "Rivers State",
    addressCountry: "NG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 4.8156,
    longitude: 7.0498,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "State", name: "Rivers State" },
    { "@type": "Country", name: "Nigeria" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Legal Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Litigation & Dispute Resolution" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate & Commercial Law" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Property & Real Estate Law" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Energy & Natural Resources Law" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Family & Estate Planning" } },
    ],
  },
  sameAs: [
    "https://www.linkedin.com/company/opunabo-ekine-associates",
    "https://twitter.com/OpunaboEkine",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Opunabo Ekine & Associates",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function articleSchema({
  title,
  description,
  slug,
  author,
  publishedAt,
  updatedAt,
  imageUrl,
}: {
  title: string;
  description: string;
  slug: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalScholarlyArticle",
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: {
      "@type": "Person",
      name: author,
      worksFor: { "@type": "Organization", name: "Opunabo Ekine & Associates" },
    },
    publisher: {
      "@type": "Organization",
      name: "Opunabo Ekine & Associates",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo2.png` },
    },
    image: imageUrl ? { "@type": "ImageObject", url: imageUrl } : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
  };
}

export function personSchema({
  name,
  title,
  specialty,
  slug,
  imageUrl,
  email,
}: {
  name: string;
  title: string;
  specialty: string;
  slug: string;
  imageUrl?: string;
  email?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: title,
    knowsAbout: specialty,
    url: `${SITE_URL}/team/${slug}`,
    image: imageUrl,
    email,
    worksFor: {
      "@type": "Organization",
      name: "Opunabo Ekine & Associates",
      url: SITE_URL,
    },
    memberOf: {
      "@type": "BarAssociation",
      name: "Nigerian Bar Association",
    },
  };
}
