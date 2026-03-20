"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronRight, Scale } from "lucide-react";

/* ── types ──────────────────────────────────────────────────── */
type Particle = { id: number; x: number; y: number; size: number; dur: number; delay: number };

/* ── shared team data — import from here in the slug page too ── */
export const attorneys = [
  {
    slug: "opunabo-ekine",
    name: "Barr. Opunabo Ekine",
    title: "Principal Partner",
    specialty: "Constitutional Law & Litigation",
    image: "/bar opunabo.jpeg",
    email: "opunabo@opunaboekine.com",
    phone: "+234 905 348 075",
    callToBar: "1999",
    bio: [
      "Barr. Opunabo Ekine is the founding principal of the firm and one of Rivers State's most distinguished trial lawyers. Called to the Nigerian Bar in 1999, he has spent over two decades building a reputation for fearless courtroom advocacy and exacting legal analysis.",
      "He has appeared before every level of the Nigerian judiciary — from Magistrate Courts to the Supreme Court — and has led the firm's most high-profile and complex matters, including constitutional challenges, landmark commercial disputes, and high-stakes criminal defence briefs.",
      "Beyond the courtroom, Barr. Ekine is a trusted advisor to corporate boards, government bodies, and high-net-worth individuals navigating sensitive legal terrain. His philosophy is simple: no matter how complex the brief, preparation and principle win cases.",
    ],
    practiceAreas: ["Civil & Criminal Litigation", "Constitutional Law", "Appellate Advocacy", "Commercial Dispute Resolution"],
    education: ["LL.B — University of Port Harcourt", "B.L — Nigerian Law School, Lagos"],
    achievements: ["N450M commercial settlement secured on behalf of multinational client", "Lead counsel in over 300 superior court matters", "Landmark acquittal in nationally-watched criminal brief (2018)"],
  },
  {
    slug: "kemi-ekine",
    name: "Barr. Mrs. Kemi Ekine Esq",
    title: "Managing Partner",
    specialty: "Corporate Law & Governance",
    image: "/bar kemi.jpeg",
    email: "kemi@opunaboekine.com",
    phone: "+234 905 348 076",
    callToBar: "2002",
    bio: [
      "Barr. Kemi Ekine is the firm's Managing Partner and head of its corporate and commercial practice. She brings a sophisticated commercial intelligence to every mandate, having advised some of Nigeria's most prominent businesses on transactions, governance structures, and regulatory matters.",
      "Her practice spans mergers and acquisitions, company formation and secretarial services, intellectual property, and corporate compliance. She is particularly sought after for complex cross-border commercial arrangements and for guiding businesses through the Nigerian regulatory framework.",
      "Barr. Kemi is known not only for her legal precision but for her ability to simplify complexity — translating intricate legal risk into clear, actionable counsel that enables her clients to move forward with confidence.",
    ],
    practiceAreas: ["Corporate & Commercial Law", "Mergers & Acquisitions", "Corporate Governance", "Regulatory Compliance"],
    education: ["LL.B — University of Lagos", "LL.M (Commercial Law) — University of Ibadan", "B.L — Nigerian Law School, Abuja"],
    achievements: ["Lead counsel in N1.2B tech infrastructure merger (2023)", "Advised 60+ companies on CAC registration and compliance", "Named among Port Harcourt's top corporate attorneys (2021)"],
  },
  {
    slug: "wapaemi-sokari-richman",
    name: "Barr. Wapaemi Sokari Richman",
    title: "Senior Partner",
    specialty: "Property & Real Estate Law",
    image: "/bar wapaemi.jpeg",
    email: "wapaemi@opunaboekine.com",
    phone: "+234 905 348 077",
    callToBar: "2004",
    bio: [
      "Barr. Wapaemi Sokari Richman is the firm's Senior Partner and head of its property, real estate, and estate planning practice. With two decades of experience, she is one of the most trusted property law practitioners in Rivers State.",
      "Her work spans the full spectrum of property law: from title verification, due diligence, and land documentation to complex landlord-tenant disputes, compulsory acquisition matters, and estate administration. She has successfully recovered contested land for clients in landmark appellate decisions.",
      "Barr. Wapaemi also advises extensively on wills, probate, and estate planning — guiding families and businesses through sensitive succession matters with the discretion and compassion they deserve.",
    ],
    practiceAreas: ["Property & Real Estate Law", "Title Disputes & Verification", "Estate Planning & Probate", "Landlord-Tenant Matters"],
    education: ["LL.B — Rivers State University", "B.L — Nigerian Law School, Lagos", "Certificate in Property Law — ICSL"],
    achievements: ["Recovered 50 hectares of contested land via appellate advocacy", "Advised on property portfolio worth over N2B", "Resolved 200+ landlord-tenant disputes across Rivers State"],
  },
];

/* ── particles — also exported for reuse in slug page ──────── */
export function Particles({ count = 16 }: { count?: number }) {
  const [ps, setPs] = useState<Particle[]>([]);
  useEffect(() => {
    setPs(Array.from({ length: count }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2.5 + 1, dur: Math.random() * 12 + 8, delay: Math.random() * -20,
    })));
  }, [count]);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {ps.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full bg-[#FFD700]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.3 }}
          animate={{ y: [0, -50, 0], opacity: [0.1, 0.45, 0.1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function TeamPage() {
  return (
    <main className="bg-[#080C14] text-white overflow-x-hidden min-h-screen"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-36 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/group.jpeg" alt="Our Attorneys" fill sizes="100vw" className="object-cover opacity-25" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14]/70 via-[#080C14]/45 to-[#080C14] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_55%,rgba(255,215,0,0.07),transparent)] z-10 pointer-events-none" />
        <Particles />

        <motion.div className="relative z-20 max-w-3xl mx-auto px-6"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>

          <motion.div className="flex items-center justify-center gap-3 mb-8"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFD700]" />
            <span className="text-[#FFD700]/70 text-xs font-sans tracking-[0.3em] uppercase">Opunabo Ekine & Associates</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFD700]" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05]"
              style={{ textShadow: "0 0 60px rgba(255,215,0,0.15)" }}>
            Our <span className="text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">Attorneys</span>
          </h1>
          <p className="text-gray-400 text-lg font-sans font-light leading-relaxed">
            Meet the legal professionals who champion your rights,
            protect your interests, and deliver results.
          </p>
          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#FFD700]/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#FFD700]" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#FFD700]/40" />
          </div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#FFD700]/50" />
          <span className="text-[#FFD700]/40 text-[10px] font-sans tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ── ATTORNEY CARDS ──────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {attorneys.map((attorney, i) => (
            <motion.div key={attorney.slug}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}>
              <Link href={`/team/${attorney.slug}`} className="group block">

                {/* portrait */}
                <div className="relative h-[440px] overflow-hidden mb-6">
                  {/* corner brackets */}
                  {[["top-0 left-0","border-t-2 border-l-2"],["top-0 right-0","border-t-2 border-r-2"],["bottom-0 left-0","border-b-2 border-l-2"],["bottom-0 right-0","border-b-2 border-r-2"]].map(([pos, border], j) => (
                    <motion.div key={j} className={`absolute ${pos} w-8 h-8 ${border} border-[#FFD700] z-20 pointer-events-none`}
                      initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.15 + j * 0.07 + 0.3 }} />
                  ))}

                  <Image src={attorney.image} alt={attorney.name} fill sizes="420px"
                    className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C14]/90 via-[#080C14]/10 to-transparent z-10" />

                  {/* hover overlay */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-8 px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-center">
                    <div className="w-10 h-px bg-[#FFD700] mb-3" />
                    <p className="text-[#FFD700] text-xs font-sans tracking-widest uppercase mb-3">{attorney.specialty}</p>
                    <span className="inline-flex items-center gap-1 text-white text-xs font-sans font-bold uppercase tracking-widest">
                      View Profile <ChevronRight size={12} />
                    </span>
                  </div>
                </div>

                {/* info */}
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#FFD700] transition-colors duration-300 mb-1 leading-snug">
                    {attorney.name}
                  </h3>
                  <p className="text-[#FFD700] text-xs font-sans font-bold uppercase tracking-widest drop-shadow-[0_0_8px_rgba(255,215,0,0.4)] mb-2">
                    {attorney.title}
                  </p>
                  <p className="text-gray-500 text-xs font-sans italic">{attorney.specialty}</p>

                  {/* call to bar */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="w-4 h-px bg-[#FFD700]/40" />
                    <span className="text-[10px] text-gray-600 font-sans uppercase tracking-widest">
                      Called to Bar {attorney.callToBar}
                    </span>
                    <div className="w-4 h-px bg-[#FFD700]/40" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FIRM ETHOS STRIP ────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#060A10] border-t border-white/5">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-px bg-white/5">
          {[
            { val: "25+",   label: "Years of Combined Practice" },
            { val: "6",     label: "Areas of Legal Specialisation" },
            { val: "1,200+",label: "Matters Successfully Resolved" },
          ].map((s, i) => (
            <motion.div key={i} className="bg-[#060A10] py-10 text-center group"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-4xl font-bold text-[#FFD700] mb-2"
                   style={{ textShadow: "0 0 20px rgba(255,215,0,0.4)" }}>{s.val}</div>
              <div className="text-[10px] text-gray-500 font-sans uppercase tracking-[0.2em]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(255,215,0,0.07),transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
        <motion.div className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Scale className="w-10 h-10 text-[#FFD700] mx-auto mb-6 drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Ready to Speak With an <span className="text-[#FFD700]">Attorney?</span>
          </h2>
          <p className="text-gray-400 mb-10 font-sans text-sm">
            Schedule a confidential consultation with one of our senior attorneys today.
          </p>
          <motion.a href="/contact"
            className="inline-block bg-[#FFD700] text-[#080C14] px-12 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] transition-all duration-300"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Request a Consultation
          </motion.a>
        </motion.div>
      </section>
    </main>
  );
}