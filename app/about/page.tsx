"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Scale, Gavel, Shield, Users, ChevronRight, Quote } from "lucide-react";
import { api } from "@/lib/api";
import { mapTeamMemberToView } from "@/lib/publicMappers";
import { formatCacheAge, getCachedEntry, isCacheStale, setCachedEntry } from "@/lib/swrCache";
import { FetchSpinner } from "@/components/LoadingState";

const ABOUT_STALE_TIME_MS = 600000;

/* ── types ──────────────────────────────────────────────────── */
type Particle = { id: number; x: number; y: number; size: number; dur: number; delay: number };

/* ── particles — client-only to avoid hydration mismatch ───── */
function Particles() {
  const [ps, setPs] = useState<Particle[]>([]);
  useEffect(() => {
    setPs(Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      dur: Math.random() * 12 + 8,
      delay: Math.random() * -20,
    })));
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {ps.map((p) => (
        <motion.div key={p.id}
          className="absolute rounded-full bg-[#FFD700]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.3 }}
          animate={{ y: [0, -50, 0], opacity: [0.1, 0.45, 0.1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── section heading ────────────────────────────────────────── */
function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <motion.div className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}>
      <h2 className="text-3xl md:text-4xl font-bold text-[#FFD700] mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">
        {children}
      </h2>
      {sub && <p className="text-gray-500 font-sans text-sm max-w-xl mx-auto mb-6">{sub}</p>}
      <div className="flex items-center justify-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFD700]" />
        <div className="w-1.5 h-1.5 rotate-45 bg-[#FFD700]" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFD700]" />
      </div>
    </motion.div>
  );
}

/* ── data ─────────────────────────────────────────────────────── */
const pillars = [
  { icon: Gavel,  title: "Preparation",  text: "Every matter begins with meticulous preparation — understanding the facts, the law, and the opposing position before we enter any room." },
  { icon: Scale,  title: "Strategy",     text: "We craft bespoke legal strategies built around your specific objectives, risk tolerance, and the outcome you need to achieve." },
  { icon: Shield, title: "Advocacy",     text: "Fearless, ethical representation at every level of the Nigerian judiciary — from the magistrate court to the Supreme Court." },
  { icon: Users,  title: "Partnership",  text: "We treat every client as a long-term partner. Your success is our benchmark and we remain accessible throughout your matter." },
];

const milestones = [
  {
    year: "1999",
    title: "The Firm is Founded",
    description: "Barr. Opunabo Ekine establishes the firm in Port Harcourt with a founding commitment to rigorous, client-centred legal counsel. The firm quickly earns a reputation for principled litigation and sound corporate advisory.",
  },
  {
    year: "2005",
    title: "Corporate Practice Takes Root",
    description: "Rapid growth in the Rivers State business community brings a surge in corporate mandates. The firm formalises its corporate and commercial practice, advising on formations, regulatory compliance, and commercial contracts.",
  },
  {
    year: "2010",
    title: "Energy & Natural Resources Division",
    description: "Recognising Port Harcourt's position at the heart of Nigeria's oil and gas industry, the firm extends its expertise into energy law — advising on joint ventures, regulatory certifications, and environmental compliance.",
  },
  {
    year: "2018",
    title: "Landmark Victories & Firm Growth",
    description: "Secures defining wins: a N450M commercial settlement, an acquittal in a nationally watched criminal matter, and acting as lead counsel in a N1.2B corporate merger. Attorney headcount grows to 12.",
  },
  {
    year: "2024",
    title: "25 Years of Legal Excellence",
    description: "The firm celebrates its silver jubilee with 15 attorneys, 6 practice areas, and over 1,200 resolved matters — continuing to set the standard for legal excellence in Rivers State and beyond.",
  },
];

const fallbackPartners = [
  {
    name: "Barr. Opunabo Ekine",
    title: "Principal Partner",
    specialty: "Constitutional Law & Litigation",
    image: "/bar opunabo.jpeg",
    bio: "With over 25 years at the bar, Barr. Ekine is one of Rivers State's most recognised trial lawyers. He has appeared before every level of the Nigerian judiciary and led the firm's most consequential cases.",
  },
  {
    name: "Barr. Mrs. Kemi Ekine Esq",
    title: "Managing Partner",
    specialty: "Corporate Law & Governance",
    image: "/bar kemi.jpeg",
    bio: "Barr. Kemi brings a sophisticated commercial lens to every matter she handles. Her practice spans M&A advisory, corporate governance, and regulatory compliance for blue-chip and mid-market clients alike.",
  },
  {
    name: "Barr. Wapaemi Sokari Richman",
    title: "Senior Partner",
    specialty: "Property & Real Estate Law",
    image: "/bar wapaemi.jpeg",
    bio: "A leading voice in Rivers State property law, Barr. Wapaemi has handled complex title disputes, large-scale acquisitions, and landlord-tenant litigation for individuals and institutional clients.",
  },
];

const initialAboutIntro =
  "Opunabo Ekine & Associates is a full-service Nigerian law firm built on 25 years of principled practice, aggressive advocacy, and an unwavering commitment to client outcomes.";

const initialAboutContent =
  "Opunabo Ekine & Associates is a full-service law firm headquartered in Port Harcourt, Nigeria. Since our founding in 1999, we have grown into one of Rivers State's most respected legal institutions — known for courtroom tenacity, commercial sophistication, and genuine commitment to every client we represent.";

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const [aboutIntro, setAboutIntro] = useState(initialAboutIntro);
  const [aboutContent, setAboutContent] = useState(initialAboutContent);
  const [aboutSections, setAboutSections] = useState<{ heading: string; body: string }[]>([]);
  const [partners, setPartners] = useState(fallbackPartners);
  const [isFetching, setIsFetching] = useState(true);
  const [cacheAge, setCacheAge] = useState("no cache");

  useEffect(() => {
    let cancelled = false;
    const cacheKey = "public:about:page:v1";

    async function loadContent() {
      const cached = getCachedEntry<{
        aboutIntro: string;
        aboutContent: string;
        aboutSections: { heading: string; body: string }[];
        partners: typeof fallbackPartners;
      }>(cacheKey);

      if (cached) {
        setAboutIntro(cached.data.aboutIntro);
        setAboutContent(cached.data.aboutContent);
        setAboutSections(cached.data.aboutSections || []);
        if (cached.data.partners?.length) setPartners(cached.data.partners);
      }
      setCacheAge(formatCacheAge(cached?.updatedAt ?? null));

      const shouldRevalidate = isCacheStale(cached, ABOUT_STALE_TIME_MS);
      setIsFetching(shouldRevalidate);
      if (!shouldRevalidate) return;

      try {
        const [aboutResponse, teamResponse] = await Promise.all([
          api.public.about(),
          api.public.team(),
        ]);

        if (cancelled) return;

        if (aboutResponse.data.content) {
          setAboutIntro(aboutResponse.data.content);
          setAboutContent(aboutResponse.data.content);
        }

        if (aboutResponse.data.sections?.length) {
          setAboutSections(aboutResponse.data.sections);
        }

        const mappedTeam = teamResponse.data
          .slice(0, 3)
          .map((member, index) => mapTeamMemberToView(member, index))
          .map((member) => ({
            name: member.name,
            title: member.title,
            specialty: member.specialty,
            image: member.image,
            bio: member.bio[0] || "Profile details will be updated soon.",
          }));

        if (mappedTeam.length > 0) {
          setPartners(mappedTeam);
        }

        setCachedEntry(cacheKey, {
          aboutIntro: aboutResponse.data.content || initialAboutIntro,
          aboutContent: aboutResponse.data.content || initialAboutContent,
          aboutSections: aboutResponse.data.sections || [],
          partners: mappedTeam.length > 0 ? mappedTeam : fallbackPartners,
        });
        setCacheAge("just now");
      } catch {
        // Keep fallback content if API is unavailable.
      } finally {
        if (!cancelled) setIsFetching(false);
      }
    }

    loadContent();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="bg-[#080C14] text-white overflow-x-hidden min-h-screen"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <FetchSpinner show={isFetching} label="Refreshing about page" cacheAge={cacheAge} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-36 text-center overflow-hidden min-h-[72vh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0">
          <Image src="/law-library.jpeg" alt="About the Firm" fill sizes="100vw"
            className="object-cover opacity-60 brightness-110" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14]/40 via-[#080C14]/20 to-[#080C14]/30 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_55%,rgba(255,215,0,0.07),transparent)] z-10 pointer-events-none" />
        <Particles />

        <motion.div className="relative z-20 max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>

          <motion.div className="flex items-center justify-center gap-3 mb-8"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFD700]" />
            <span className="text-[#FFD700]/70 text-xs font-sans tracking-[0.3em] uppercase">EST. 2019 · Port Harcourt, Nigeria</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFD700]" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05]"
              style={{ textShadow: "0 0 60px rgba(255,215,0,0.15)" }}>
            About the{" "}
            <span className="text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.55)]">Firm</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl font-sans font-light leading-relaxed max-w-3xl mx-auto">
            {aboutIntro}
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

      {/* ── STATS BAR ───────────────────────────────────────── */}
      <section className="relative py-12 border-y border-[#FFD700]/10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/4 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "1999",   label: "Year Founded" },
            { val: "25+",    label: "Years of Practice" },
            { val: "15",     label: "Expert Attorneys" },
            { val: "1,200+", label: "Cases Resolved" },
          ].map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-3xl md:text-4xl font-bold text-[#FFD700]"
                   style={{ textShadow: "0 0 20px rgba(255,215,0,0.4)" }}>{s.val}</div>
              <div className="text-[10px] text-gray-500 font-sans uppercase tracking-[0.2em] mt-2">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHO WE ARE ──────────────────────────────────────── */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="relative overflow-hidden">
              <Image src="/group.jpeg" alt="The Firm" width={620} height={500}
                className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 border border-[#FFD700]/15 pointer-events-none" />
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#FFD700]/60" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#FFD700]/60" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#FFD700]/60" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#FFD700]/60" />
              <motion.div
                className="absolute -bottom-5 -right-5 bg-[#FFD700] p-6 hidden lg:flex items-center justify-center"
                animate={{ boxShadow: ["0 0 15px rgba(255,215,0,0.3)", "0 0 45px rgba(255,215,0,0.7)", "0 0 15px rgba(255,215,0,0.3)"] }}
                transition={{ repeat: Infinity, duration: 3 }}>
                <Scale size={40} className="text-[#080C14]" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[#FFD700]/60 text-xs font-sans tracking-[0.3em] uppercase mb-4">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Who We <span className="text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]">Are</span>
            </h2>
            <p className="text-gray-400 font-sans text-sm leading-relaxed mb-5">{aboutContent}</p>
            <p className="text-gray-400 font-sans text-sm leading-relaxed mb-8">
              We serve individuals, corporations, government bodies, and non-profit organisations across six core practice areas. From complex multi-jurisdictional litigation and energy sector advisory to family matters and property transactions, we bring the same rigour and dedication to every mandate.
            </p>
            <ul className="space-y-4">
              {(aboutSections.length > 0
                ? aboutSections.map((section) => `${section.heading}: ${section.body}`)
                : [
                    "Proven track record in the Nigerian superior courts",
                    "Multidisciplinary teams with deep specialist expertise",
                    "Transparent, timely communication on every matter",
                    "Strict confidentiality and attorney-client privilege",
                  ]
              ).map((item, i) => (
                <motion.li key={i} className="flex items-center gap-4 text-sm text-gray-300 font-sans"
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3 }}>
                  <div className="flex-shrink-0 w-6 h-6 border border-[#FFD700]/40 flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#FFD700] rotate-45" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── FOUR PILLARS ────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#060A10] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <SectionHeading sub="The principles that guide every matter we take on.">
            Our Four Pillars
          </SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i}
                  className="group relative bg-[#0E1420] p-8 border border-white/5 hover:border-[#FFD700]/30 transition-colors duration-500 overflow-hidden"
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
                  whileHover={{ y: -6 }}>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-[#FFD700]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-4 right-5 text-5xl font-bold text-white/[0.03] select-none leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <motion.div whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }} transition={{ duration: 0.4 }}
                    className="w-14 h-14 border border-[#FFD700]/20 flex items-center justify-center mb-6">
                    <Icon size={26} className="text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#FFD700] transition-colors duration-300">{p.title}</h3>
                  <p className="text-gray-500 text-sm font-sans leading-relaxed">{p.text}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MEET THE PARTNERS ───────────────────────────────── */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <SectionHeading sub="The attorneys who lead the firm and champion your case.">
            Meet the Partners
          </SectionHeading>
          <div className="grid md:grid-cols-3 gap-10">
            {partners.map((partner, i) => (
              <motion.div key={i} className="group"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}>
                <div className="relative h-[400px] w-full overflow-hidden mb-6">
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    {[["top-0 left-0","border-t-2 border-l-2"],["top-0 right-0","border-t-2 border-r-2"],["bottom-0 left-0","border-b-2 border-l-2"],["bottom-0 right-0","border-b-2 border-r-2"]].map(([pos, border], j) => (
                      <motion.div key={j} className={`absolute ${pos} w-8 h-8 ${border} border-[#FFD700]`}
                        initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.15 + j * 0.08 + 0.3 }} />
                    ))}
                  </div>
                  <Image src={partner.image} alt={partner.name} fill sizes="420px"
                    className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C14]/90 via-[#080C14]/20 to-transparent z-10" />
                  <div className="absolute inset-0 z-20 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <div className="text-center px-4">
                      <div className="w-10 h-px bg-[#FFD700] mx-auto mb-2" />
                      <p className="text-[#FFD700] text-xs font-sans tracking-widest uppercase">{partner.specialty}</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{partner.name}</h3>
                  <p className="text-[#FFD700] text-xs font-sans font-bold uppercase tracking-widest mb-4 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">
                    {partner.title}
                  </p>
                  <p className="text-gray-500 text-sm font-sans leading-relaxed px-2">{partner.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HISTORY TIMELINE ────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#060A10] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <SectionHeading sub="Key moments in 25 years of principled legal practice.">
            Our History
          </SectionHeading>
          <div className="relative">
            <motion.div
              className="absolute left-[28px] top-0 bottom-0 w-px bg-gradient-to-b from-[#FFD700]/80 via-[#FFD700]/30 to-transparent"
              style={{ originY: 0 }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            <div className="space-y-10 pl-20">
              {milestones.map((item, i) => (
                <motion.div key={i} className="relative group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.12, duration: 0.7 }}>
                  <div className="absolute -left-[62px] top-2 w-7 h-7 flex items-center justify-center">
                    <motion.div className="w-4 h-4 rotate-45 bg-[#FFD700]"
                      animate={{ boxShadow: ["0 0 6px rgba(255,215,0,0.4)", "0 0 22px rgba(255,215,0,0.8)", "0 0 6px rgba(255,215,0,0.4)"] }}
                      transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4 }} />
                  </div>
                  <div className="bg-[#0E1420] border border-white/5 group-hover:border-[#FFD700]/25 transition-colors duration-500 p-7 relative overflow-hidden">
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFD700] via-[#FFD700]/40 to-transparent"
                      style={{ originY: 0 }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.3, duration: 0.6 }}
                    />
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-3xl font-bold text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]">{item.year}</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-[#FFD700]/30 to-transparent" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#FFD700] transition-colors duration-300">{item.title}</h4>
                    <p className="text-gray-500 text-sm font-sans leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES STRIP ────────────────────────────────────── */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-px bg-white/5">
            {[
              { label: "Integrity",  desc: "We hold ourselves to the highest ethical standards — in court, in counsel, and in every client interaction." },
              { label: "Excellence", desc: "Mediocrity has no place here. Every brief, argument, and negotiation reflects our pursuit of the best outcome." },
              { label: "Discretion", desc: "Client confidentiality is absolute. We handle your most sensitive matters with the privacy they demand." },
            ].map((v, i) => (
              <motion.div key={i} className="bg-[#080C14] p-10 group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <div className="w-6 h-6 border border-[#FFD700]/30 rotate-45 mb-6 group-hover:border-[#FFD700] transition-colors duration-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#FFD700] rotate-45" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#FFD700] transition-colors duration-300">{v.label}</h4>
                <p className="text-gray-500 text-sm font-sans leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#060A10] border-t border-white/5 relative overflow-hidden">
        <Quote className="absolute -top-6 -left-6 w-56 h-56 text-[#FFD700]/4 pointer-events-none" />
        <motion.div className="max-w-3xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed italic mb-8">
            &quot;We do not merely practise law. We champion the rights of those who trust us
            with their most important challenges — and we do not stop until the work is done.&quot;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#FFD700]/50" />
            <p className="text-[#FFD700] text-sm font-sans font-bold uppercase tracking-widest">
              Barr. Opunabo Ekine — Principal Partner
            </p>
            <div className="w-8 h-px bg-[#FFD700]/50" />
          </div>
        </motion.div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-28 px-6 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(255,215,0,0.07),transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent" />

        <motion.div className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-[#FFD700]/60 text-xs font-sans tracking-[0.35em] uppercase mb-6">Begin Your Case</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Work With{" "}
            <span className="text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">Nigeria&apos;s Best?</span>
          </h2>
          <p className="text-gray-400 mb-10 font-sans text-sm leading-relaxed">
            Schedule a confidential consultation with one of our senior attorneys and take
            the first step toward resolving your legal matter.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#FFD700] text-[#080C14] px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-all duration-300"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Request a Consultation
            </motion.a>
            <motion.a href="/practice-areas"
              className="inline-flex items-center justify-center gap-2 border border-[#FFD700]/50 text-[#FFD700] px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#FFD700]/10 hover:border-[#FFD700] transition-all duration-300"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Explore Practice Areas <ChevronRight size={14} />
            </motion.a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}