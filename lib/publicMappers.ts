import type {
  PostRecord,
  PracticeAreaRecord,
  TeamMemberRecord,
  TestimonialRecord,
} from "@/lib/api";

const FALLBACK_PARTNER_IMAGES = [
  "/bar opunabo.jpeg",
  "/bar kemi.jpeg",
  "/bar wapaemi.jpeg",
];

const FALLBACK_PRACTICE_IMAGES = [
  "/Supreme-Court.jpg",
  "/law-deal.jpeg",
  "/law-library.jpeg",
  "/consultation.jpeg",
  "/group.jpeg",
];

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(value: string | null): string {
  if (!value) return "";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function estimateReadTime(content: string | null, excerpt: string | null): string {
  const source = content || excerpt || "";
  const words = source.trim().split(/\s+/).filter(Boolean).length;
  if (!words) return "4 min read";
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export interface BlogPostViewModel {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorTitle: string;
  date: string;
  readTime: string;
  featured?: boolean;
  content?: string;
}

export function mapPostToBlogView(post: PostRecord): BlogPostViewModel {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    category: post.category || "General",
    author: post.author || "Opunabo Ekine & Associates",
    authorTitle: "Attorney",
    date: formatDate(post.published_at || post.created_at),
    readTime: estimateReadTime(post.content, post.excerpt),
    featured: post.featured,
    content: post.content || undefined,
  };
}

export interface TeamCardViewModel {
  slug: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  email: string;
  phone: string;
  callToBar: string;
  bio: string[];
  practiceAreas: string[];
  education: string[];
  achievements: string[];
}

export function mapTeamMemberToView(member: TeamMemberRecord, index = 0): TeamCardViewModel {
  const specialty = member.specialty || "General Practice";
  return {
    slug: member.slug || toSlug(member.name),
    name: member.name,
    title: member.title || "Attorney",
    specialty,
    image: member.image_url || FALLBACK_PARTNER_IMAGES[index % FALLBACK_PARTNER_IMAGES.length],
    email: member.email || "info@opunaboekine.ng",
    phone: member.phone || "+234 000 000 0000",
    callToBar: "N/A",
    bio: member.bio ? [member.bio] : ["Profile details will be updated soon."],
    practiceAreas: specialty.split(/,|&/).map((part) => part.trim()).filter(Boolean),
    education: ["Details available on request"],
    achievements: ["Notable matters available on request"],
  };
}

export interface PracticeViewModel {
  id: string;
  title: string;
  icon: string;
  image: string;
  tagline: string;
  description: string;
  items: string[];
}

export function mapPracticeAreaToView(area: PracticeAreaRecord, index = 0): PracticeViewModel {
  const description = area.description || "Detailed information for this practice area will be published shortly.";
  return {
    id: area.slug || toSlug(area.title),
    title: area.title,
    icon: area.icon || "scale",
    image: area.image_url || FALLBACK_PRACTICE_IMAGES[index % FALLBACK_PRACTICE_IMAGES.length],
    tagline: description.slice(0, 90),
    description,
    items: [description],
  };
}

export interface TestimonialViewModel {
  text: string;
  author: string;
  position: string;
  area: string;
  image: string;
  rating: number;
}

export function mapTestimonialToView(item: TestimonialRecord, index = 0): TestimonialViewModel {
  return {
    text: item.testimonial_text,
    author: item.author_name,
    position: item.position || "Client",
    area: "Client Testimonial",
    image: item.photo_url || FALLBACK_PARTNER_IMAGES[index % FALLBACK_PARTNER_IMAGES.length],
    rating: 5,
  };
}
