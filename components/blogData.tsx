export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorTitle: string;
  date: string;
  readTime: string;
  featured?: boolean;
};

export const posts: Post[] = [
  {
    slug: "understanding-land-title-verification-nigeria",
    title: "Understanding Land Title Verification in Nigeria: What Every Buyer Must Know",
    excerpt: "Before exchanging consideration on any parcel of land in Rivers State or elsewhere in Nigeria, a thorough title search is not optional — it is essential. We walk through the key instruments, registries, and red flags every buyer should understand.",
    category: "Property Law",
    author: "Barr. Wapaemi Sokari Richman",
    authorTitle: "Senior Partner",
    date: "12 May 2025",
    readTime: "6 min read",
    featured: true,
  },
  {
    slug: "directors-liability-nigerian-company-law",
    title: "Directors' Liability Under Nigerian Company Law: A Practical Guide",
    excerpt: "The Companies and Allied Matters Act 2020 significantly expanded the personal exposure of directors for corporate defaults. This piece examines the key provisions and how boards can structure governance to mitigate risk.",
    category: "Corporate Law",
    author: "Barr. Mrs. Kemi Ekine Esq",
    authorTitle: "Managing Partner",
    date: "28 April 2025",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "criminal-defence-rights-arrest-nigeria",
    title: "Your Rights Upon Arrest in Nigeria: What the Constitution Guarantees",
    excerpt: "Section 35 of the 1999 Constitution (as amended) enshrines the right to personal liberty. Yet violations remain endemic. This article clarifies what the law requires of law enforcement and what accused persons are entitled to demand.",
    category: "Constitutional Law",
    author: "Barr. Opunabo Ekine",
    authorTitle: "Principal Partner",
    date: "10 April 2025",
    readTime: "7 min read",
  },
  {
    slug: "probate-administration-rivers-state",
    title: "Probate and Estate Administration in Rivers State: A Step-by-Step Overview",
    excerpt: "The death of a loved one should not be compounded by legal uncertainty. We outline the grant of probate process, letters of administration, and how to avoid the disputes that frequently fracture families over inheritance.",
    category: "Estate Planning",
    author: "Barr. Wapaemi Sokari Richman",
    authorTitle: "Senior Partner",
    date: "18 March 2025",
    readTime: "9 min read",
  },
  {
    slug: "arbitration-vs-litigation-commercial-disputes",
    title: "Arbitration vs. Litigation for Commercial Disputes: Making the Right Choice",
    excerpt: "Speed, cost, confidentiality, and enforceability — the choice between arbitration and court litigation is rarely straightforward. We examine the trade-offs and when each mechanism best serves Nigerian commercial parties.",
    category: "Commercial Law",
    author: "Barr. Mrs. Kemi Ekine Esq",
    authorTitle: "Managing Partner",
    date: "2 March 2025",
    readTime: "5 min read",
  },
  {
    slug: "appellate-advocacy-supreme-court-nigeria",
    title: "Navigating the Appellate Courts: From the Court of Appeal to the Supreme Court",
    excerpt: "Most litigation ends at first instance — but when it does not, the appellate process in Nigeria demands a fundamentally different skillset. This primer covers grounds of appeal, briefs of argument, and what to expect at each level.",
    category: "Litigation",
    author: "Barr. Opunabo Ekine",
    authorTitle: "Principal Partner",
    date: "14 February 2025",
    readTime: "10 min read",
  },
];