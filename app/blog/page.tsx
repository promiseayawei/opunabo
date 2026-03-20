"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, BookOpen, Clock, Tag } from "lucide-react";
import { Particles } from "../../components/teamData";
import { posts } from "../../components/blogData";

const categories = ["All", "Property Law", "Corporate Law", "Constitutional Law", "Estate Planning", "Commercial Law", "Litigation"];

const categoryColors: Record<string, string> = {
  "Property Law":      "#b8860b",
  "Corporate Law":     "#8b6914",
  "Constitutional Law":"#a07720",
  "Estate Planning":   "#996515",
  "Commercial Law":    "#c49a00",
  "Litigation":        "#b07d10",
};

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function BlogPage() {
  const [active, setActive] = useState("All");

  const featured = posts.filter((p) => p.featured);
  const filtered = active === "All"
    ? posts.filter((p) => !p.featured)
    : posts.filter((p) => p.category === active && !p.featured);
  const allFiltered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <main
      className="bg-[#080C14] text-white overflow-x-hidden min-h-screen"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-36 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(255,215,0,0.06),transparent)] pointer-events-none" />
        {/* grid texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,215,0,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.8) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        <Particles count={14} />

        <motion.div
          className="relative z-20 max-w-3xl mx-auto px-6"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFD700]" />
            <span className="text-[#FFD700]/70 text-xs font-sans tracking-[0.3em] uppercase">Legal Insight</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFD700]" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05]"
            style={{ textShadow: "0 0 60px rgba(255,215,0,0.15)" }}>
            The <span className="text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">Brief</span>
          </h1>
          <p className="text-gray-400 text-lg font-sans font-light leading-relaxed max-w-xl mx-auto">
            Authoritative commentary on Nigerian law — from our partners to the public.
          </p>

          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#FFD700]/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#FFD700]" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#FFD700]/40" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#FFD700]/50" />
          <span className="text-[#FFD700]/40 text-[10px] font-sans tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ── FEATURED POSTS ───────────────────────────────────── */}
      {active === "All" && (
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FFD700]" />
              <span className="text-[#FFD700]/60 text-xs font-sans tracking-[0.3em] uppercase">Featured</span>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <div className="relative h-full bg-[#0E1420] border border-white/5 group-hover:border-[#FFD700]/30 p-8 transition-all duration-500 overflow-hidden">
                      {/* corner brackets */}
                      {[["top-0 left-0","border-t border-l"],["top-0 right-0","border-t border-r"],["bottom-0 left-0","border-b border-l"],["bottom-0 right-0","border-b border-r"]].map(([pos, border], j) => (
                        <span key={j} className={`absolute ${pos} w-6 h-6 ${border} border-[#FFD700]/0 group-hover:border-[#FFD700]/50 transition-colors duration-500`} />
                      ))}

                      {/* glow on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%,rgba(255,215,0,0.04),transparent)" }} />

                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-5">
                          <span
                            className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] px-2.5 py-1 border"
                            style={{
                              color: "#FFD700",
                              borderColor: "rgba(255,215,0,0.25)",
                              background: "rgba(255,215,0,0.06)",
                            }}
                          >
                            {post.category}
                          </span>
                          <span className="text-[#FFD700]/30 text-[10px] font-sans">Featured</span>
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#FFD700] transition-colors duration-300 mb-4 leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-gray-500 text-sm font-sans leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white text-xs font-sans font-semibold">{post.author}</p>
                            <p className="text-gray-600 text-[11px] font-sans italic">{post.authorTitle}</p>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600 text-[11px] font-sans">
                            <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                            <span>{post.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mt-5 text-[#FFD700]/50 group-hover:text-[#FFD700] transition-colors duration-300 text-xs font-sans uppercase tracking-widest">
                          Read Article <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CATEGORY FILTER ──────────────────────────────────── */}
      <section className="py-10 px-6 border-t border-white/5 sticky top-[70px] z-30 backdrop-blur-md"
        style={{ background: "rgba(8,12,20,0.92)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="flex-shrink-0 px-4 py-2 text-[11px] font-sans font-bold uppercase tracking-[0.15em] border transition-all duration-300"
                style={{
                  color:       active === cat ? "#080C14" : "rgba(241,241,241,0.4)",
                  background:  active === cat ? "#FFD700" : "transparent",
                  borderColor: active === cat ? "#FFD700" : "rgba(255,255,255,0.08)",
                  boxShadow:   active === cat ? "0 0 20px rgba(255,215,0,0.3)" : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL / FILTERED POSTS ─────────────────────────────── */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {active !== "All" && (
            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FFD700]" />
              <span className="text-[#FFD700]/60 text-xs font-sans tracking-[0.3em] uppercase">{active}</span>
            </motion.div>
          )}

          {active === "All" && (
            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FFD700]" />
              <span className="text-[#FFD700]/60 text-xs font-sans tracking-[0.3em] uppercase">All Articles</span>
            </motion.div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {(active === "All" ? filtered : allFiltered).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="relative h-full bg-[#0A0E18] border border-white/5 group-hover:border-[#FFD700]/25 p-6 transition-all duration-500 flex flex-col overflow-hidden">

                    {/* top gold accent line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/0 group-hover:via-[#FFD700]/40 to-transparent transition-all duration-500" />

                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] flex items-center gap-1.5"
                        style={{ color: categoryColors[post.category] ?? "#FFD700" }}
                      >
                        <Tag size={9} />
                        {post.category}
                      </span>
                      <span className="text-gray-700 text-[10px] font-sans flex items-center gap-1">
                        <Clock size={9} /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors duration-300 mb-3 leading-snug flex-1">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-xs font-sans leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-[11px] font-sans font-medium">{post.author.replace("Barr. Mrs. ", "Barr. ").split(" ").slice(0, 3).join(" ")}</p>
                        <p className="text-gray-700 text-[10px] font-sans">{post.date}</p>
                      </div>
                      <span className="flex items-center gap-1 text-[#FFD700]/40 group-hover:text-[#FFD700] transition-colors duration-300 text-[10px] font-sans uppercase tracking-widest">
                        Read <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {(active === "All" ? filtered : allFiltered).length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <BookOpen className="w-10 h-10 text-[#FFD700]/20 mx-auto mb-4" />
              <p className="text-gray-600 font-sans text-sm">No articles in this category yet.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER / CTA ─────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(255,215,0,0.06),transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />

        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FFD700]/60" />
            <BookOpen className="w-5 h-5 text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#FFD700]/60" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Need Advice on a <span className="text-[#FFD700]">Legal Matter?</span>
          </h2>
          <p className="text-gray-400 mb-10 font-sans text-sm leading-relaxed">
            Our articles provide general information only. For advice specific to your
            circumstances, speak with one of our senior attorneys.
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