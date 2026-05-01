import "./globals.css";
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "react-hot-toast";
import { JsonLd, localBusinessSchema, websiteSchema } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";
const FIRM_NAME = "Opunabo Ekine & Associates";
const TAGLINE = "Premier Legal Services in Port Harcourt, Nigeria";
const DEFAULT_DESCRIPTION =
  "Opunabo Ekine & Associates is a full-service Nigerian law firm offering expert litigation, corporate law, property law, energy law, and estate planning services from Port Harcourt, Rivers State.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${FIRM_NAME} | ${TAGLINE}`,
    template: `%s | ${FIRM_NAME}`,
  },

  description: DEFAULT_DESCRIPTION,

  keywords: [
    "law firm Nigeria",
    "lawyer Port Harcourt",
    "legal services Rivers State",
    "litigation Nigeria",
    "corporate law Nigeria",
    "property law Rivers State",
    "energy law Nigeria",
    "estate planning Nigeria",
    "Opunabo Ekine",
    "Nigerian barrister",
    "commercial law firm Nigeria",
  ],

  authors: [{ name: FIRM_NAME, url: SITE_URL }],
  creator: FIRM_NAME,
  publisher: FIRM_NAME,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: FIRM_NAME,
    title: `${FIRM_NAME} | ${TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${FIRM_NAME} — Legal Excellence in Nigeria`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@OpunaboEkine",
    creator: "@OpunaboEkine",
    title: `${FIRM_NAME} | ${TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-default.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },

  manifest: "/site.webmanifest",

  category: "legal services",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080C14" },
    { media: "(prefers-color-scheme: light)", color: "#080C14" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A0F1A] text-[#F1F1F1] flex flex-col min-h-screen font-sans">
        <JsonLd data={[localBusinessSchema, websiteSchema]} />
        <Header />
        <Toaster position="top-right" />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
