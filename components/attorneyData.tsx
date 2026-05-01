export type Attorney = {
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
};

export const attorneys: Attorney[] = [
  {
    slug: "opunabo-ekine",
    name: "Barr. Opunabo Ekine ESQ.",
    title: "Principal Partner",
    specialty: "Constitutional Law, Oil and Gas & Litigation",
    image: "/bar opunabo.jpeg",
    email: "opunabo@opunaboekine.com",
    phone: "+234 08100013606",
    callToBar: "2014",
    bio: [
      "Barr. Opunabo Ekine is the founding principal of the firm and one of Rivers State's most distinguished trial lawyers. Called to the Nigerian Bar in 2014, he has spent nearly a decade building a reputation for fearless courtroom advocacy and exacting legal analysis.",
      "He has appeared before every level of the Nigerian judiciary — from Magistrate Courts to the Supreme Court — and has led the firm's most high-profile and complex matters, including constitutional challenges, landmark commercial disputes, and high-stakes criminal defence briefs.",
      "Beyond the courtroom, Barr. Ekine is a trusted advisor to corporate boards, government bodies, and high-net-worth individuals navigating sensitive legal terrain. His philosophy is simple: no matter how complex the brief, preparation and principle win cases.",
    ],
    practiceAreas: ["Civil & Criminal Litigation", "Constitutional Law", "Appellate Advocacy", "Commercial Dispute Resolution"],
    education: ["LL.B — University of Port Harcourt", "B.L — Nigerian Law School, Lagos"],
    achievements: [
      "N450M commercial settlement secured on behalf of multinational client",
      "Lead counsel in over 300 superior court matters",
      "Landmark acquittal in nationally-watched criminal brief (2018)",
    ],
  },
  {
    slug: "kemi-ekine",
    name: "Barr. Mrs. Kemi Ekine ESQ.",
    title: "Managing Partner",
    specialty: "Corporate Practice, Family Law and Practice",
    image: "/bar kemi.jpeg",
    email: "kemi@opunaboekine.com",
    phone: "+234 706 329 0976",
    callToBar: "2016",
    bio: [
      "Barr. Kemi Ekine is the firm's Managing Partner and head of its corporate and commercial practice. She brings a sophisticated commercial intelligence to every mandate, having advised some of Nigeria's most prominent businesses on transactions, governance structures, and regulatory matters.",
      "Her practice spans mergers and acquisitions, company formation and secretarial services, intellectual property, and corporate compliance. She is particularly sought after for complex cross-border commercial arrangements and for guiding businesses through the Nigerian regulatory framework.",
      "Barr. Kemi is known not only for her legal precision but for her ability to simplify complexity — translating intricate legal risk into clear, actionable counsel that enables her clients to move forward with confidence.",
    ],
    practiceAreas: ["Corporate & Commercial Law", "Mergers & Acquisitions", "Corporate Governance", "Regulatory Compliance"],
    education: ["LL.B — University of Lagos", "LL.M (Commercial Law) — University of Ibadan", "B.L — Nigerian Law School, Abuja"],
    achievements: [
      "Lead counsel in N1.2B tech infrastructure merger (2023)",
      "Advised 60+ companies on CAC registration and compliance",
      "Named among Port Harcourt's top corporate attorneys (2021)",
    ],
  },
  {
    slug: "wapaemi-sokari-richman",
    name: "Barr. Wapaemi Sokari Richman ESQ.",
    title: "Senior Partner",
    specialty: "Property & Real Estate Law",
    image: "/bar wapaemi.jpeg",
    email: "wapaemi@opunaboekine.com",
    phone: "+234 806 809 2289",
    callToBar: "2014",
    bio: [
      "Barr. Wapaemi Sokari Richman is the firm's Senior Partner and head of its property, real estate, and estate planning practice. With two decades of experience, she is one of the most trusted property law practitioners in Rivers State.",
      "Her work spans the full spectrum of property law: from title verification, due diligence, and land documentation to complex landlord-tenant disputes, compulsory acquisition matters, and estate administration. She has successfully recovered contested land for clients in landmark appellate decisions.",
      "Barr. Wapaemi also advises extensively on wills, probate, and estate planning — guiding families and businesses through sensitive succession matters with the discretion and compassion they deserve.",
    ],
    practiceAreas: ["Property & Real Estate Law", "Title Disputes & Verification", "Estate Planning & Probate", "Landlord-Tenant Matters"],
    education: ["LL.B — Rivers State University", "B.L — Nigerian Law School, Lagos", "Certificate in Property Law — ICSL"],
    achievements: [
      "Recovered 50 hectares of contested land via appellate advocacy",
      "Advised on property portfolio worth over N2B",
      "Resolved 200+ landlord-tenant disputes across Rivers State",
    ],
  },
];