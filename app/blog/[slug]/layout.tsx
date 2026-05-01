import type { Metadata } from "next";
import { api } from "@/lib/api";
import { mapPostToBlogView } from "@/lib/publicMappers";
import { posts as fallbackPosts } from "@/components/blogData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.opunaboekine.ng";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await api.public.posts.getBySlug(slug);
    if (res?.data) {
      const post = mapPostToBlogView(res.data);
      const title = post.title;
      const description = post.excerpt || `Read this legal insight from Opunabo Ekine & Associates.`;
      const imageUrl = res.data.cover_image_url || res.data.featured_image_url || "/og-blog.jpg";

      return {
        title,
        description,
        alternates: { canonical: `${SITE_URL}/blog/${slug}` },
        openGraph: {
          title: `${title} | Opunabo Ekine & Associates`,
          description,
          url: `${SITE_URL}/blog/${slug}`,
          type: "article",
          publishedTime: post.date,
          authors: [post.author],
          images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
        },
        twitter: {
          card: "summary_large_image",
          title: `${title} | Opunabo Ekine & Associates`,
          description,
          images: [imageUrl],
        },
      };
    }
  } catch {
    // Fall through to fallback.
  }

  const fallback = fallbackPosts.find((p) => p.slug === slug);
  if (fallback) {
    return {
      title: fallback.title,
      description: fallback.excerpt,
      alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    };
  }

  return {
    title: "Legal Article",
    description: "Expert legal insights from Opunabo Ekine & Associates.",
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
