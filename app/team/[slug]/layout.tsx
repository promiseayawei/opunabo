import type { Metadata } from "next";
import { api } from "@/lib/api";
import { mapTeamMemberToView } from "@/lib/publicMappers";
import { attorneys } from "@/components/attorneyData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await api.public.team();
    if (res?.data) {
      const raw = res.data.find((m) => m.slug === slug);
      if (raw) {
        const member = mapTeamMemberToView(raw, 0);
        const title = `${member.name} — ${member.title}`;
        const description =
          member.bio?.[0] ||
          `${member.name} is an attorney at Opunabo Ekine & Associates specialising in ${member.specialty}.`;
        const imageUrl = member.image || "/og-default.jpg";

        return {
          title: member.name,
          description,
          alternates: { canonical: `${SITE_URL}/team/${slug}` },
          openGraph: {
            title: `${title} | Opunabo Ekine & Associates`,
            description,
            url: `${SITE_URL}/team/${slug}`,
            images: [{ url: imageUrl, width: 800, height: 800, alt: member.name }],
          },
          twitter: {
            card: "summary_large_image",
            title: `${title} | Opunabo Ekine & Associates`,
            description,
            images: [imageUrl],
          },
        };
      }
    }
  } catch {
    // Fall through to fallback.
  }

  const fallback = attorneys.find((a) => a.slug === slug);
  if (fallback) {
    return {
      title: fallback.name,
      description: `${fallback.name} — ${fallback.title} at Opunabo Ekine & Associates, Port Harcourt.`,
      alternates: { canonical: `${SITE_URL}/team/${slug}` },
    };
  }

  return {
    title: "Attorney Profile",
    description: "Meet the attorneys at Opunabo Ekine & Associates.",
  };
}

export default function TeamProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
