"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";
import { mapTestimonialToView } from "@/lib/publicMappers";
import { formatCacheAge, getCachedEntry, isCacheStale, setCachedEntry } from "@/lib/swrCache";
import { FetchSpinner } from "@/components/LoadingState";

const TESTIMONIALS_STALE_TIME_MS = 180000;

/* ── data ─────────────────────────────────────────────────────── */
const fallbackTestimonials = [
  {
    text: "Opunabo Ekine & Associates provided clarity and direction during a very turbulent commercial dispute. Their strategic approach was methodical and their communication impeccable. We secured a settlement beyond our expectations.",
    author: "Chief Emeka Nwosu",
    position: "CEO, Trans-Sahara Holdings",
    area: "Commercial Litigation",
    image: "/bar opunabo.jpeg",
    rating: 5,
  },
  {
    text: "The professionalism and personal attention we received was truly exceptional. They handled our corporate restructuring with precision, and we felt informed and confident every step of the way. Highly recommend for complex corporate matters.",
    author: "Sarah J. Williams",
    position: "Managing Director, BlueChip Technologies",
    area: "Corporate Law",
    image: "/bar kemi.jpeg",
    rating: 5,
  },
  {
    text: "They understand business as well as they understand the law. Their counsel on our property acquisition saved our investment from a title dispute that would have cost us millions. Thorough, strategic, and trustworthy.",
    author: "Alhaji Ibrahim Kolo",
    position: "Principal, Kolo Real Estate Group",
    area: "Property & Real Estate",
    image: "/bar wapaemi.jpeg",
    rating: 5,
  },
  {
    text: "When we faced a serious regulatory compliance issue in the oil and gas sector, this firm navigated the complexity with absolute precision. Their knowledge of the Nigerian energy regulatory framework is unmatched.",
    author: "Engr. Tunde Badmus",
    position: "Operations Director, Petrafield Energy",
    area: "Energy & Natural Resources",
    image: "/bar opunabo.jpeg",
    rating: 5,
  },
  {
    text: "A deeply sensitive family matter was handled with the utmost discretion and empathy. Their guidance through the probate process was clear, compassionate, and efficient. I cannot recommend them highly enough.",
    author: "Mrs. Adaeze Okonkwo",
    position: "Private Client",
    area: "Family & Probate",
    image: "/bar kemi.jpeg",
    rating: 5,
  },
  {
    text: "We retained them for a wrongful termination dispute that had been dragging for months. Within weeks, their labour law team had restructured our entire approach. The matter was resolved swiftly and favourably.",
    author: "Mr. Femi Adewale",
    position: "HR Director, Granite Group Nigeria",
    area: "Labour & Employment",
    image: "/bar wapaemi.jpeg",
    rating: 5,
  },
];

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

/* ── star row ───────────────────────────────────────────────── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          viewport={{ once: true }} transition={{ delay: i * 0.07 + 0.2 }}>
          <Star size={13} className="fill-[#FFD700] text-[#FFD700] drop-shadow-[0_0_4px_rgba(255,215,0,0.6)]" />
        </motion.div>
      ))}
    </div>
  );
}

/* ── featured carousel ──────────────────────────────────────── */
function FeaturedCarousel({ testimonials }: { testimonials: typeof fallbackTestimonials }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (idx >= testimonials.length) {
      setIdx(0);
    }
  }, [idx, testimonials.length]);

  const t = testimonials[idx];

  if (!t) return null;

  return (
    <div className="relative bg-[#0E1420] border border-white/5 overflow-hidden">
      {/* gold top line */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

      <div className="grid lg:grid-cols-2 min-h-[380px]">
        {/* image pane */}
        <div className="relative hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div key={idx} className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
              <Image src={t.image} alt={t.author} fill sizes="600px"
                className="object-cover grayscale" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0E1420]" />
              <div className="absolute inset-0 bg-[#0E1420]/40" />
            </motion.div>
          </AnimatePresence>
          {/* corner brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#FFD700]/50 z-10" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#FFD700]/50 z-10" />
        </div>

        {/* text pane */}
        <div className="p-10 md:p-14 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <Stars count={t.rating} />
              <span className="text-[10px] text-[#FFD700]/50 font-sans uppercase tracking-[0.2em]">{t.area}</span>
            </div>

            <Quote size={32} className="text-[#FFD700]/15 mb-4" />

            <AnimatePresence mode="wait">
              <motion.p key={idx} className="text-gray-300 font-sans text-base leading-relaxed italic mb-8"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
                &quot;{t.text}&quot;
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={`author-${idx}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-6 h-px bg-[#FFD700]/50" />
                  <h4 className="text-white font-bold text-base">{t.author}</h4>
                </div>
                <p className="text-[#FFD700]/60 text-xs font-sans uppercase tracking-widest pl-7">{t.position}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* nav */}
          <div className="flex items-center gap-4 mt-8">
            <button onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 border border-white/10 hover:border-[#FFD700]/50 flex items-center justify-center text-gray-400 hover:text-[#FFD700] transition-colors duration-300">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2 flex-1">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  className={`h-0.5 rounded-full transition-all duration-500 ${i === idx ? "flex-1 bg-[#FFD700]" : "w-4 bg-white/15 hover:bg-white/30"}`} />
              ))}
            </div>
            <button onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
              className="w-10 h-10 border border-white/10 hover:border-[#FFD700]/50 flex items-center justify-center text-gray-400 hover:text-[#FFD700] transition-colors duration-300">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [isFetching, setIsFetching] = useState(true);
  const [cacheAge, setCacheAge] = useState("no cache");

  useEffect(() => {
    let cancelled = false;
    const cacheKey = "public:testimonials:list:v1";

    async function loadTestimonials() {
      const cached = getCachedEntry<typeof fallbackTestimonials>(cacheKey);
      if (cached?.data?.length) {
        setTestimonials(cached.data);
      }
      setCacheAge(formatCacheAge(cached?.updatedAt ?? null));

      const shouldRevalidate = isCacheStale(cached, TESTIMONIALS_STALE_TIME_MS);
      setIsFetching(shouldRevalidate);
      if (!shouldRevalidate) return;

      try {
        const response = await api.public.testimonials();
        if (cancelled) return;

        const mapped = response.data.map((item, index) => mapTestimonialToView(item, index));
        if (mapped.length > 0) {
          setTestimonials(mapped);
          setCachedEntry(cacheKey, mapped);
          setCacheAge("just now");
        }
      } catch {
        // Keep fallback testimonials when API is unavailable.
      } finally {
        if (!cancelled) setIsFetching(false);
      }
    }

    loadTestimonials();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="bg-[#080C14] text-white overflow-x-hidden min-h-screen"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <FetchSpinner show={isFetching} label="Refreshing testimonials" cacheAge={cacheAge} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-36 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/law-deal.jpeg" alt="Client Perspectives" fill sizes="100vw" className="object-cover opacity-60 brightness-110" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14]/40 via-[#080C14]/20 to-[#080C14]/30 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_60%,rgba(255,215,0,0.07),transparent)] z-10 pointer-events-none" />

        {/* giant background quote mark */}
        <Quote className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 text-[#FFD700]/4 z-10 pointer-events-none" />

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
            Client <span className="text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">Perspectives</span>
          </h1>

          <p className="text-gray-400 text-lg font-sans font-light leading-relaxed">
            Our reputation is built case by case, client by client.
            Here is what those we have served have to say.
          </p>

          {/* stars */}
          <motion.div className="flex items-center justify-center gap-2 mt-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            {[...Array(5)].map((_, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.08 + 0.5 }}>
                <Star size={18} className="fill-[#FFD700] text-[#FFD700] drop-shadow-[0_0_6px_rgba(255,215,0,0.7)]" />
              </motion.div>
            ))}
            <span className="text-gray-500 text-sm font-sans ml-2">5.0 · Rated by clients</span>
          </motion.div>

          <div className="flex items-center justify-center gap-3 mt-8">
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

      {/* ── FEATURED CAROUSEL ───────────────────────────────── */}
      <section className="py-10 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <FeaturedCarousel testimonials={testimonials} />
          </motion.div>
        </div>
      </section>

      {/* ── ALL TESTIMONIALS GRID ───────────────────────────── */}
      <section className="py-16 pb-28 px-6 bg-[#060A10] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-[#FFD700] mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.35)]">
              More Client Stories
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFD700]" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#FFD700]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFD700]" />
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i}
                className="group relative bg-[#0E1420] p-8 border border-white/5 hover:border-[#FFD700]/25 transition-colors duration-500 flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.7 }}
                whileHover={{ y: -5 }}
              >
                {/* top glow sweep */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                {/* ambient glow */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#FFD700]/4 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* area badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] text-[#FFD700]/50 font-sans font-bold uppercase tracking-[0.2em] border border-[#FFD700]/20 px-2.5 py-1">
                    {t.area}
                  </span>
                  <Stars count={t.rating} />
                </div>

                <Quote size={22} className="text-[#FFD700]/12 mb-3 flex-shrink-0" />

                <p className="text-gray-400 italic text-sm font-sans leading-relaxed flex-1 mb-7">
                  &quot;{t.text}&quot;
                </p>

                <div className="border-t border-white/5 pt-5">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-4 h-px bg-[#FFD700]/50" />
                    <h4 className="text-white font-bold text-sm">{t.author}</h4>
                  </div>
                  <p className="text-[#FFD700]/50 text-xs font-sans uppercase tracking-widest pl-5">{t.position}</p>
                </div>

                {/* bottom sweep */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(255,215,0,0.07),transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent" />

        <motion.div className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-[#FFD700]/60 text-xs font-sans tracking-[0.35em] uppercase mb-6">Join Our Clients</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Experience <span className="text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">Exceptional Counsel?</span>
          </h2>
          <p className="text-gray-400 mb-10 font-sans text-sm leading-relaxed">
            Schedule a confidential consultation with one of our senior attorneys today.
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