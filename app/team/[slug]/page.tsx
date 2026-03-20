"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ChevronRight, ArrowLeft, Scale, BookOpen, Trophy } from "lucide-react";
import { attorneys, Particles } from "../../../components/teamData";

/* ── props ───────────────────────────────────────────────────── */
interface Props {
  params: Promise<{ slug: string }>;
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function AttorneyProfilePage({ params }: Props) {
  const { slug } = use(params);
  const attorney = attorneys.find((a) => a.slug === slug);
  if (!attorney) notFound();

  const others = attorneys.filter((a) => a.slug !== attorney.slug);

  return (
    <main
      className="bg-[#080C14] text-white overflow-x-hidden min-h-screen"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={attorney.image} alt={attorney.name} fill sizes="100vw"
            className="object-cover object-top opacity-20" priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14]/80 via-[#080C14]/60 to-[#080C14] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_30%_50%,rgba(255,215,0,0.06),transparent)] z-10 pointer-events-none" />
        <Particles count={12} />

        <div className="relative z-20 max-w-6xl mx-auto px-6 py-28 md:py-36">

          {/* back link */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-[#FFD700]/60 hover:text-[#FFD700] text-xs font-sans uppercase tracking-widest transition-colors duration-300 mb-12 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Team
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* portrait */}
            <motion.div
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative overflow-hidden max-w-md">
                {[
                  ["top-0 left-0",    "border-t-2 border-l-2"],
                  ["top-0 right-0",   "border-t-2 border-r-2"],
                  ["bottom-0 left-0", "border-b-2 border-l-2"],
                  ["bottom-0 right-0","border-b-2 border-r-2"],
                ].map(([pos, border], j) => (
                  <motion.div
                    key={j}
                    className={`absolute ${pos} w-10 h-10 ${border} border-[#FFD700] z-20 pointer-events-none`}
                    initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: j * 0.1 + 0.4, duration: 0.5 }}
                  />
                ))}
                <Image
                  src={attorney.image} alt={attorney.name} width={520} height={640}
                  className="w-full object-cover object-top" style={{ aspectRatio: "4/5" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080C14]/60 via-transparent to-transparent" />

                {/* floating call-to-bar badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-[#FFD700] px-5 py-3 hidden md:block"
                  animate={{ boxShadow: ["0 0 15px rgba(255,215,0,0.3)","0 0 40px rgba(255,215,0,0.7)","0 0 15px rgba(255,215,0,0.3)"] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <p className="text-[#080C14] text-[10px] font-sans font-bold uppercase tracking-widest">Called to Bar</p>
                  <p className="text-[#080C14] text-2xl font-bold leading-none mt-0.5">{attorney.callToBar}</p>
                </motion.div>
              </div>
            </motion.div>

            {/* intro text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FFD700]" />
                <span className="text-[#FFD700]/60 text-xs font-sans tracking-[0.3em] uppercase">{attorney.title}</span>
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight"
                style={{ textShadow: "0 0 40px rgba(255,215,0,0.1)" }}
              >
                {attorney.name}
              </h1>

              <p className="text-[#FFD700] text-sm font-sans font-bold uppercase tracking-widest mb-8 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">
                {attorney.specialty}
              </p>

              <p className="text-gray-300 font-sans text-base leading-relaxed mb-8 border-l-2 border-[#FFD700]/40 pl-5 italic">
                {attorney.bio[0]}
              </p>

              {/* contact chips */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href={`mailto:${attorney.email}`}
                  className="inline-flex items-center gap-2 border border-[#FFD700]/30 hover:border-[#FFD700] text-[#FFD700] px-4 py-2.5 text-xs font-sans uppercase tracking-widest transition-colors duration-300"
                >
                  <Mail size={13} /> {attorney.email}
                </a>
                <a
                  href={`tel:${attorney.phone}`}
                  className="inline-flex items-center gap-2 border border-white/10 hover:border-[#FFD700]/30 text-gray-400 hover:text-[#FFD700] px-4 py-2.5 text-xs font-sans uppercase tracking-widest transition-colors duration-300"
                >
                  <Phone size={13} /> {attorney.phone}
                </a>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#FFD700] text-[#080C14] px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] transition-all duration-300 group"
              >
                Instruct {attorney.name.split(" ")[1]}
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FULL BIO ─────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FFD700]" />
              <span className="text-[#FFD700]/60 text-xs font-sans tracking-[0.3em] uppercase">Biography</span>
            </div>
            <div className="space-y-5">
              {attorney.bio.map((para, i) => (
                <p key={i} className="text-gray-400 font-sans text-sm leading-relaxed">{para}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRACTICE AREAS + EDUCATION + ACHIEVEMENTS ────────── */}
      <section className="py-20 px-6 bg-[#060A10] border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {/* practice areas */}
          <motion.div
            className="bg-[#0E1420] p-8 border border-white/5 hover:border-[#FFD700]/20 transition-colors duration-500"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0, duration: 0.6 }}
          >
            <Scale className="w-7 h-7 text-[#FFD700] mb-5 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
            <h3 className="text-lg font-bold text-white mb-5">Practice Areas</h3>
            <ul className="space-y-3">
              {attorney.practiceAreas.map((area, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-400 font-sans"
                  initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                >
                  <div className="flex-shrink-0 w-5 h-5 mt-0.5 border border-[#FFD700]/30 flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#FFD700] rotate-45" />
                  </div>
                  {area}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* education */}
          <motion.div
            className="bg-[#0E1420] p-8 border border-white/5 hover:border-[#FFD700]/20 transition-colors duration-500"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}
          >
            <BookOpen className="w-7 h-7 text-[#FFD700] mb-5 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
            <h3 className="text-lg font-bold text-white mb-5">Education</h3>
            <ul className="space-y-4">
              {attorney.education.map((edu, i) => (
                <motion.li
                  key={i}
                  className="text-sm text-gray-400 font-sans leading-relaxed border-l border-[#FFD700]/20 pl-4"
                  initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                >
                  {edu}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* achievements */}
          <motion.div
            className="bg-[#0E1420] p-8 border border-white/5 hover:border-[#FFD700]/20 transition-colors duration-500"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Trophy className="w-7 h-7 text-[#FFD700] mb-5 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
            <h3 className="text-lg font-bold text-white mb-5">Notable Achievements</h3>
            <ul className="space-y-4">
              {attorney.achievements.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-400 font-sans leading-relaxed"
                  initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                >
                  <div className="flex-shrink-0 w-5 h-5 mt-0.5 border border-[#FFD700]/30 flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#FFD700] rotate-45" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── OTHER ATTORNEYS ──────────────────────────────────── */}
      {others.length > 0 && (
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#FFD700] mb-4 drop-shadow-[0_0_15px_rgba(255,215,0,0.35)]">
                Other Partners
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFD700]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#FFD700]" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFD700]" />
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {others.map((other, i) => (
                <motion.div
                  key={other.slug}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
                >
                  <Link
                    href={`/team/${other.slug}`}
                    className="group flex items-center gap-6 bg-[#0E1420] border border-white/5 hover:border-[#FFD700]/30 p-6 transition-colors duration-400"
                  >
                    <div className="relative flex-shrink-0 w-20 h-20 overflow-hidden">
                      <Image
                        src={other.image} alt={other.name} fill sizes="80px"
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#FFD700]/60" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#FFD700]/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-white group-hover:text-[#FFD700] transition-colors duration-300 leading-snug mb-1">
                        {other.name}
                      </h4>
                      <p className="text-[#FFD700]/60 text-xs font-sans uppercase tracking-widest mb-1">{other.title}</p>
                      <p className="text-gray-600 text-xs font-sans italic">{other.specialty}</p>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-[#FFD700]/30 group-hover:text-[#FFD700] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(255,215,0,0.07),transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#FFD700]/60 text-xs font-sans tracking-[0.35em] uppercase mb-6">Begin Your Case</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Ready to Work With{" "}
            <span className="text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">
              {attorney.name.split(" ")[1]}?
            </span>
          </h2>
          <p className="text-gray-400 mb-10 font-sans text-sm">
            Schedule a confidential consultation today.
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-[#FFD700] text-[#080C14] px-12 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] transition-all duration-300"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          >
            Request a Consultation
          </motion.a>
        </motion.div>
      </section>
    </main>
  );
}