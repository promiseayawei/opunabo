import type { MetadataRoute } from "next";
import { api } from "@/lib/api";
import type { PostRecord, TeamMemberRecord } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`,                 changeFrequency: "weekly",  priority: 1.0,  lastModified: new Date() },
  { url: `${SITE_URL}/about`,            changeFrequency: "monthly", priority: 0.9,  lastModified: new Date() },
  { url: `${SITE_URL}/practice-areas`,   changeFrequency: "monthly", priority: 0.9,  lastModified: new Date() },
  { url: `${SITE_URL}/services`,         changeFrequency: "monthly", priority: 0.85, lastModified: new Date() },
  { url: `${SITE_URL}/team`,             changeFrequency: "monthly", priority: 0.85, lastModified: new Date() },
  { url: `${SITE_URL}/blog`,             changeFrequency: "daily",   priority: 0.8,  lastModified: new Date() },
  { url: `${SITE_URL}/testimonials`,     changeFrequency: "monthly", priority: 0.7,  lastModified: new Date() },
  { url: `${SITE_URL}/contact`,          changeFrequency: "yearly",  priority: 0.75, lastModified: new Date() },
  { url: `${SITE_URL}/book`,             changeFrequency: "yearly",  priority: 0.7,  lastModified: new Date() },
  { url: `${SITE_URL}/pricing`,          changeFrequency: "monthly", priority: 0.65, lastModified: new Date() },
  { url: `${SITE_URL}/projects`,         changeFrequency: "monthly", priority: 0.65, lastModified: new Date() },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamic: MetadataRoute.Sitemap = [];

  try {
    const [blogRes, teamRes] = await Promise.allSettled([
      api.public.posts.list(),
      api.public.team(),
    ]);

    if (blogRes.status === "fulfilled" && Array.isArray(blogRes.value.data)) {
      blogRes.value.data.forEach((post: PostRecord) => {
        if (post.slug) {
          dynamic.push({
            url: `${SITE_URL}/blog/${post.slug}`,
            changeFrequency: "weekly",
            priority: 0.7,
            lastModified: new Date(post.updated_at ?? post.created_at),
          });
        }
      });
    }

    if (teamRes.status === "fulfilled" && Array.isArray(teamRes.value.data)) {
      teamRes.value.data.forEach((member: TeamMemberRecord) => {
        if (member.slug) {
          dynamic.push({
            url: `${SITE_URL}/team/${member.slug}`,
            changeFrequency: "monthly",
            priority: 0.65,
            lastModified: new Date(member.updated_at ?? member.created_at),
          });
        }
      });
    }
  } catch {
    // Sitemap falls back to static routes only on API failure.
  }

  return [...staticRoutes, ...dynamic];
}
