"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Users2, SlidersHorizontal, Gavel, Scale, Landmark, ChevronRight } from "lucide-react";
import Link from "next/link";

/* ── floating particles ─────────────────────────────────────── */
function Particles() {
  const ps = Array.from({ length: 16 }, (_, i) => ({
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
const differentiators = [
  {
    icon: ShieldCheck,
    title: "Unwavering Ethics",
    desc: "We uphold the highest standards of professional conduct — your interests are never compromised.",
  },
  {
    icon: Users2,
    title: "Client-First Counsel",
    desc: "We invest time in understanding your objectives before we advise, ensuring every strategy is tailored to you.",
  },
  {
    icon: SlidersHorizontal,
    title: "Proven Courtroom Pedigree",
    desc: "Decades of superior court experience across civil, criminal, and commercial matters speak for our results.",
  },
];

const services = [
  {
    icon: Gavel,
    title: "Litigation & Dispute Resolution",
    desc: "Fearless, strategic representation across civil, criminal, and commercial courts at every level of the Nigerian judiciary.",
    items: ["Contract & Debt Recovery Disputes", "Criminal Defence & Appeals", "Fundamental Rights Enforcement", "Commercial Arbitration & Mediation"],
    image: "/Supreme-Court.jpg",
    imageAlt: "Litigation",
  },
  {
    icon: Scale,
    title: "Corporate & Commercial Advisory",
    desc: "The legal backbone your business depends on — from inception and compliance through to complex transactions.",
    items: ["Company Formation & CAC Registration", "Drafting & Review of Commercial Agreements", "Mergers, Acquisitions & Restructuring", "Corporate Regulatory Compliance"],
    image: "/law-deal.jpeg",
    imageAlt: "Corporate Law",
    flip: true,
  },
  {
    icon: Landmark,
    title: "Property, Family & Estate Law",
    desc: "Expert guidance on the matters that affect your most personal and valuable assets — handled with discretion.",
    items: ["Title Verification & Land Documentation", "Landlord–Tenant & Lease Disputes", "Wills, Probate & Estate Administration", "Matrimonial Causes & Child Custody"],
    image: "/consultation.jpeg",
    imageAlt: "Property and Family Law",
  },
];

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  return (
    <main className="bg-[#080C14] text-white overflow-x-hidden min-h-screen"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-36 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/law-library.jpeg" alt="Services" fill sizes="100vw" className="object-cover opacity-25" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14]/60 via-[#080C14]/50 to-[#080C14] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_60%,rgba(255,215,0,0.07),transparent)] z-10 pointer-events-none" />
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

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ textShadow: "0 0 60px rgba(255,215,0,0.15)" }}>
            Our <span className="text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">Services</span>
          </h1>

          <p className="text-gray-400 text-lg font-sans font-light leading-relaxed">
            Comprehensive legal services for individuals, businesses, and institutions —
            delivered with precision, integrity, and an unwavering commitment to your outcome.
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

      {/* ── SERVICES SECTIONS ───────────────────────────────── */}
      <section className="py-10">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          const isFlipped = svc.flip;
          return (
            <div key={i} className={`py-20 px-6 ${i % 2 === 1 ? "bg-[#060A10]" : "bg-[#080C14]"} border-t border-white/5`}>
              <div className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center ${isFlipped ? "md:[&>*:first-child]:order-2" : ""}`}>

                {/* image */}
                <motion.div className="relative"
                  initial={{ opacity: 0, x: isFlipped ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <div className="relative overflow-hidden">
                    <Image src={svc.image} alt={svc.imageAlt} width={600} height={440}
                      className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 border border-[#FFD700]/15 pointer-events-none" />
                    {/* corner brackets */}
                    <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#FFD700]/50" />
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#FFD700]/50" />
                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#FFD700]/50" />
                    <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#FFD700]/50" />
                  </div>
                  {/* floating icon badge */}
                  <motion.div
                    className="absolute -bottom-5 -right-5 bg-[#FFD700] p-5 hidden lg:flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                    animate={{ boxShadow: ["0 0 15px rgba(255,215,0,0.2)", "0 0 40px rgba(255,215,0,0.6)", "0 0 15px rgba(255,215,0,0.2)"] }}
                    transition={{ repeat: Infinity, duration: 3 }}>
                    <Icon size={32} className="text-[#080C14]" />
                  </motion.div>
                </motion.div>

                {/* text */}
                <motion.div
                  initial={{ opacity: 0, x: isFlipped ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <p className="text-[#FFD700]/60 text-xs font-sans tracking-[0.3em] uppercase mb-4">Service {String(i + 1).padStart(2, "0")}</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                    {svc.title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]">
                      {svc.title.split(" ").slice(-1)}
                    </span>
                  </h2>
                  <p className="text-gray-400 font-sans text-sm leading-relaxed mb-8">{svc.desc}</p>

                  <ul className="space-y-4 mb-8">
                    {svc.items.map((item, j) => (
                      <motion.li key={j} className="flex items-center gap-4 text-sm text-gray-300 font-sans"
                        initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: j * 0.1 + 0.3 }}>
                        <div className="flex-shrink-0 w-6 h-6 border border-[#FFD700]/30 flex items-center justify-center">
                          <div className="w-1 h-1 bg-[#FFD700] rotate-45" />
                        </div>
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  <Link href="/contact"
                    className="inline-flex items-center gap-2 text-[#FFD700] text-xs font-sans font-bold uppercase tracking-widest group hover:gap-4 transition-all duration-300">
                    Enquire about this service
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── DIFFERENTIATORS ─────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#060A10] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <SectionHeading sub="The principles that define how we practise law and serve our clients.">
            What Sets Us Apart
          </SectionHeading>

          <div className="grid sm:grid-cols-3 gap-6">
            {differentiators.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div key={i}
                  className="group relative bg-[#0E1420] p-9 border border-white/5 hover:border-[#FFD700]/30 transition-colors duration-500 overflow-hidden text-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.7 }}
                  whileHover={{ y: -6 }}>
                  {/* ambient glow */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                  <motion.div whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }} transition={{ duration: 0.4 }}
                    className="inline-flex items-center justify-center w-16 h-16 border border-[#FFD700]/20 mb-6 mx-auto">
                    <Icon size={28} className="text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#FFD700] transition-colors duration-300">{d.title}</h3>
                  <p className="text-gray-500 text-sm font-sans leading-relaxed">{d.desc}</p>

                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS STRIP ───────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <SectionHeading sub="A clear, structured approach from your first call to final resolution.">
            How We Work
          </SectionHeading>

          <div className="grid sm:grid-cols-4 gap-0 relative">
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent hidden sm:block" />
            {[
              { step: "01", label: "Consultation",  desc: "Confidential review of your legal matter and objectives." },
              { step: "02", label: "Assessment",    desc: "We evaluate the merits, risks, and best strategic approach." },
              { step: "03", label: "Engagement",    desc: "Formal retainer, clear scope, and an agreed action plan." },
              { step: "04", label: "Resolution",    desc: "Diligent, aggressive execution through to your outcome." },
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

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-28 px-6 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(255,215,0,0.07),transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent" />

        <motion.div className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-[#FFD700]/60 text-xs font-sans tracking-[0.35em] uppercase mb-6">Begin Your Case</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready for <span className="text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">Expert Representation?</span>
          </h2>
          <p className="text-gray-400 mb-10 font-sans text-sm leading-relaxed">
            Schedule a confidential consultation with one of our senior attorneys and take the first step toward resolving your legal matter.
          </p>
          <motion.a href="/contact"
            className="inline-block bg-[#FFD700] text-[#080C14] px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-all duration-300"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Request a Consultation
          </motion.a>
        </motion.div>
      </section>
    </main>
  );
}