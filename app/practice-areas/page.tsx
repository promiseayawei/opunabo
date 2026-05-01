"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Gavel,
  Briefcase,
  Scale,
  Landmark,
  ShieldAlert,
  FileText,
  Users,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { mapPracticeAreaToView } from "@/lib/publicMappers";
import { formatCacheAge, getCachedEntry, isCacheStale, setCachedEntry } from "@/lib/swrCache";
import { FetchSpinner } from "@/components/LoadingState";

const PRACTICE_STALE_TIME_MS = 300000;

/* ── data ─────────────────────────────────────────────────────── */
const fallbackPractices = [
  {
    id: "litigation",
    title: "Litigation & Dispute Resolution",
    icon: Gavel,
    image: "/Supreme-Court.jpg",
    tagline: "Fearless advocacy at every level of the judiciary.",
    description:
      "Our litigators are renowned for their courtroom prowess and strategic thinking. We handle everything from high-stakes commercial disputes to rigorous criminal defense, ensuring your rights are protected at every level.",
    items: [
      "Contract disputes",
      "Tort and negligence claims",
      "Debt recovery",
      "Fundamental rights enforcement",
      "Commercial Arbitration",
      "Court-connected Arbitration",
      "Criminal Defence",
    ],
  },
  {
    id: "corporate",
    title: "Corporate & Commercial",
    icon: Briefcase,
    image: "/law-deal.jpeg",
    tagline: "The legal backbone your business depends on.",
    description:
      "We provide comprehensive legal support for businesses at every stage. From formation and compliance to mergers and acquisitions, we safeguard your commercial interests with precision.",
    items: [
      "Legal Advisory",
      "Conducting of Corporate Searches",
      "Drafting and Review of Commercial Agreements",
      "Corporate Registration (CAC, NSITF etc.)",
      "Corporate Regulatory Compliance Certifications",
      "Companies Retainership",
    ],
  },
  {
    id: "property",
    title: "Property & Real Estate",
    icon: Landmark,
    image: "/law-library.jpeg",
    tagline: "Securing your investments with watertight title.",
    description:
      "Deep expertise in property acquisition, land documentation, and landlord-tenant relations. We ensure every transaction is legally sound, properly titled, and future-proof.",
    items: [
      "Drafting and Review of Legal Documents",
      "Landlord–Tenant matters",
      "Conducting of Real Estate Searches (Due Diligence)",
      "Title Dispute Resolution",
    ],
  },
  {
    id: "family",
    title: "Family & Probate",
    icon: Users,
    image: "/consultation.jpeg",
    tagline: "Guidance through life's most personal transitions.",
    description:
      "Sensitive and discreet legal guidance for family and estate matters. We handle every case with the empathy and privacy it deserves, delivering outcomes that protect your legacy.",
    items: [
      "Matrimonial causes",
      "Child Adoption Processes",
      "Child custody and Maintenance",
      "Family Mediation",
      "Wills & Probate",
      "Estate Administration Disputes",
    ],
  },
  {
    id: "labour",
    title: "Labour & Employment",
    icon: FileText,
    image: "/group.jpeg",
    tagline: "Balancing the employer-employee relationship.",
    description:
      "Expert counsel on the full spectrum of employment and industrial relations law. We help employers and employees navigate disputes, contracts, and compliance with confidence.",
    items: [
      "Industrial Relation Disputes",
      "Legal Advisory and Regulatory Compliance",
      "Employment Contract Drafting",
      "Wrongful Termination Claims",
    ],
  },
  {
    id: "energy",
    title: "Energy & Natural Resources",
    icon: ShieldAlert,
    image: "/law-deal.jpeg",
    tagline: "Navigating Nigeria's most complex regulatory terrain.",
    description:
      "Specialised knowledge of the legal frameworks governing oil, gas, and renewable energy sectors. We guide clients through regulatory compliance, joint ventures, and industry disputes.",
    items: [
      "Joint Venture Disputes",
      "Legal Drafting and Review of Documents",
      "Oil and Gas Industry Regulatory Certification",
      "Environmental Compliance",
    ],
  },
];

/* ── floating particles (reuse from homepage) ─────────────────── */
function Particles() {
  const ps = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    dur: Math.random() * 12 + 8,
    delay: Math.random() * -20,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {ps.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#FFD700]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.3 }}
          animate={{ y: [0, -50, 0], opacity: [0.1, 0.45, 0.1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── accordion card ───────────────────────────────────────────── */
type PracticeCardItem = typeof fallbackPractices[0];

function PracticeCard({ area, index }: { area: PracticeCardItem; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = area.icon;

  return (
    <motion.div
      className="group relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* animated left glow bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFD700] via-[#FFD700]/50 to-transparent"
        style={{ originY: 0 }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 + 0.3, duration: 0.6 }}
      />

      <div className="bg-[#0E1420] border border-white/5 hover:border-[#FFD700]/25 transition-colors duration-500 ml-1">
        {/* header row — always visible */}
        <button
          className="w-full text-left"
          onClick={() => setOpen((o) => !o)}
        >
          <div className="flex items-center gap-6 p-7 md:p-8">
            {/* image thumbnail */}
            <div className="flex-shrink-0 relative w-20 h-20 md:w-24 md:h-24 overflow-hidden hidden sm:block">
              <Image
                src={area.image}
                alt={area.title}
                fill
                sizes="96px"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[#FFD700]/10 group-hover:bg-transparent transition-colors duration-500" />
              {/* corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#FFD700]/60" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#FFD700]/60" />
            </div>

            {/* icon + title */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <Icon className="w-5 h-5 text-[#FFD700] flex-shrink-0 drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]" />
                <span className="text-[10px] text-[#FFD700]/50 font-sans uppercase tracking-[0.25em]">Practice Area</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#FFD700] transition-colors duration-300 leading-snug">
                {area.title}
              </h2>
              <p className="text-gray-500 text-sm mt-1 font-sans italic">{area.tagline}</p>
            </div>

            {/* chevron */}
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5 text-[#FFD700]/60" />
            </motion.div>
          </div>
        </button>

        {/* expandable body */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-7 md:px-8 pb-8 border-t border-white/5 pt-6">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  {/* description */}
                  <div>
                    <p className="text-gray-400 leading-relaxed font-sans text-sm mb-6">{area.description}</p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[#FFD700] text-xs font-sans font-bold uppercase tracking-widest hover:gap-4 transition-all duration-300"
                    >
                      Enquire about this area
                      <ChevronRight size={14} />
                    </Link>
                  </div>

                  {/* services list */}
                  <div>
                    <p className="text-[10px] text-[#FFD700]/50 font-sans uppercase tracking-[0.25em] mb-4">Services include</p>
                    <ul className="space-y-3">
                      {area.items.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3 text-sm text-gray-300 font-sans"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <div className="flex-shrink-0 w-5 h-5 mt-0.5 border border-[#FFD700]/30 flex items-center justify-center">
                            <div className="w-1 h-1 bg-[#FFD700] rotate-45" />
                          </div>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function PracticeAreas() {
  const [practices, setPractices] = useState<PracticeCardItem[]>(fallbackPractices);
  const [isFetching, setIsFetching] = useState(true);
  const [cacheAge, setCacheAge] = useState("no cache");

  useEffect(() => {
    let cancelled = false;
    const cacheKey = "public:practice-areas:list:v1";

    async function loadPracticeAreas() {
      const cached = getCachedEntry<PracticeCardItem[]>(cacheKey, false);
      if (cached?.data?.length) {
        setPractices(cached.data);
      }
      setCacheAge(formatCacheAge(cached?.updatedAt ?? null));

      const shouldRevalidate = isCacheStale(cached, PRACTICE_STALE_TIME_MS);
      setIsFetching(shouldRevalidate);
      if (!shouldRevalidate) return;

      try {
        const response = await api.public.practiceAreas();
        if (cancelled) return;

        const iconMap = {
          gavel: Gavel,
          briefcase: Briefcase,
          landmark: Landmark,
          shield: ShieldAlert,
          shieldalert: ShieldAlert,
          filetext: FileText,
          users: Users,
          scale: Scale,
        } as const;

        const mapped = response.data.map((item, index) => {
          const view = mapPracticeAreaToView(item, index);
          const iconKey = view.icon.toLowerCase().replace(/[^a-z]/g, "");
          const Icon = iconMap[iconKey as keyof typeof iconMap] || Scale;

          return {
            id: view.id,
            title: view.title,
            icon: Icon,
            image: view.image,
            tagline: view.tagline,
            description: view.description,
            items: view.items,
          };
        });

        if (mapped.length > 0) {
          setPractices(mapped);
          setCachedEntry(cacheKey, mapped, false);
          setCacheAge("just now");
        }
      } catch {
        // Keep local fallback if API is unavailable.
      } finally {
        if (!cancelled) setIsFetching(false);
      }
    }

    loadPracticeAreas();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="bg-[#080C14] text-white overflow-x-hidden" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <FetchSpinner show={isFetching} label="Refreshing practice areas" cacheAge={cacheAge} />

      {/* ── HERO HEADER ─────────────────────────────────────── */}
      <section className="relative py-36 text-center overflow-hidden">
        {/* bg image */}
        <div className="absolute inset-0 z-0">
          <Image src="/Supreme-Court.jpg" alt="Practice Areas" fill sizes="100vw" className="object-cover opacity-60 brightness-110" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14]/40 via-[#080C14]/20 to-[#080C14]/30 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_60%,rgba(255,215,0,0.07),transparent)] z-10 pointer-events-none" />
        <Particles />

        <motion.div
          className="relative z-20 max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* breadcrumb */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFD700]" />
            <span className="text-[#FFD700]/70 text-xs font-sans tracking-[0.3em] uppercase">Opunabo Ekine & Associates</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFD700]" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ textShadow: "0 0 60px rgba(255,215,0,0.15)" }}>
            Our <span className="text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">Practice Areas</span>
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto font-sans font-light">
            We combine deep local knowledge with international best practices to deliver
            exceptional results across six core areas of law.
          </p>

          {/* decorative diamonds */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#FFD700]/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#FFD700]" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#FFD700]/40" />
          </div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#FFD700]/50" />
          <span className="text-[#FFD700]/40 text-[10px] font-sans tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ── INTRO STAT ROW ──────────────────────────────────── */}
      <section className="relative py-10 border-y border-[#FFD700]/10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/4 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          {[
            { val: "6", label: "Practice Areas" },
            { val: "25+", label: "Years of Experience" },
            { val: "1,200+", label: "Cases Resolved" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-3xl md:text-4xl font-bold text-[#FFD700]"
                   style={{ textShadow: "0 0 20px rgba(255,215,0,0.4)" }}>{s.val}</div>
              <div className="text-xs text-gray-500 font-sans uppercase tracking-widest mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRACTICE CARDS ──────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-5">
          <motion.p
            className="text-center text-[#FFD700]/50 text-xs font-sans uppercase tracking-[0.3em] mb-10"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            Click any area to explore our services
          </motion.p>
          {practices.map((area, i) => (
            <PracticeCard key={area.id} area={area} index={i} />
          ))}
        </div>
      </section>

      {/* ── PROCESS STRIP ───────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#060A10] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFD700] mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.35)]">
              How We Work With You
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFD700]" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#FFD700]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFD700]" />
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-4 gap-0 relative">
            {/* connector line */}
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent hidden sm:block" />

            {[
              { step: "01", label: "Initial Consultation", desc: "Discuss your situation in confidence." },
              { step: "02", label: "Case Assessment",      desc: "We evaluate merits and strategy." },
              { step: "03", label: "Engagement",           desc: "Formal retainer and action plan." },
              { step: "04", label: "Resolution",           desc: "Diligent execution to outcome." },
            ].map((s, i) => (
              <motion.div key={i} className="flex flex-col items-center text-center px-4"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}>
                <div className="relative w-20 h-20 mb-5 flex items-center justify-center">
                  <div className="absolute inset-0 border border-[#FFD700]/30 rotate-45" />
                  <span className="text-2xl font-bold text-[#FFD700]"
                        style={{ textShadow: "0 0 15px rgba(255,215,0,0.5)" }}>{s.step}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{s.label}</h4>
                <p className="text-gray-500 text-xs font-sans leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────── */}
      <section className="py-28 px-6 relative overflow-hidden">
        {/* bg image */}
        <div className="absolute inset-0 z-0">
          <Image src="/consultation.jpeg" alt="Consultation" fill sizes="100vw" className="object-cover opacity-15" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14] via-[#080C14]/85 to-[#080C14] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(255,215,0,0.07),transparent)] z-10 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent z-20" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent z-20" />

        <motion.div
          className="relative z-20 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <p className="text-[#FFD700]/60 text-xs font-sans tracking-[0.35em] uppercase mb-6">Begin Your Case</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Need Expert <span className="text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">Legal Representation?</span>
          </h2>
          <p className="text-gray-400 mb-10 font-sans text-sm leading-relaxed">
            Our team is ready to review your case and provide the strategic guidance you need.
            Schedule a confidential consultation with one of our senior attorneys.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact"
              className="inline-block bg-[#FFD700] text-[#080C14] px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-all duration-300"
            >
              Schedule a Meeting
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}