"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Scale,
  Gavel,
  Shield,
  Users2,
  Briefcase,
  Landmark,
  Quote,
  Trophy,
  Star,
  ChevronRight,
} from "lucide-react";

/* ─── carousel data ────────────────────────────────────────── */
const carouselImages = [
  { src: "/law-library.jpeg",   caption: "Deep-rooted Legal Expertise" },
  { src: "/supreme-court.jpg",  caption: "Resolute Litigation & Advocacy" },
  { src: "/law-deal.jpeg",      caption: "Strategic Corporate Advisory" },
  { src: "/consultation.jpeg",  caption: "Client-Focused Legal Solutions" },
];

/* ─── helpers ───────────────────────────────────────────────── */
function useCountUp(target: number, trigger: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(id); }
      else setVal(cur);
    }, 30);
    return () => clearInterval(id);
  }, [trigger, target]);
  return val;
}

/* ─── floating particles ────────────────────────────────────── */
function Particles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 12 + 8,
    delay: Math.random() * -20,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#FFD700]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.35,
          }}
          animate={{ y: [0, -60, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── animated section heading ─────────────────────────────── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#FFD700] mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">
        {children}
      </h2>
      <div className="flex items-center justify-center gap-3">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#FFD700]" />
        <div className="w-2 h-2 rotate-45 bg-[#FFD700]" />
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#FFD700]" />
      </div>
    </motion.div>
  );
}

/* ─── practice area card ────────────────────────────────────── */
const practiceAreas = [
  { title: "Litigation & Dispute Resolution", desc: "Representing clients in complex civil, criminal, and commercial disputes with precision.", icon: Gavel },
  { title: "Corporate & Commercial",          desc: "Facilitating business growth through sound legal structures and contract management.", icon: Briefcase },
  { title: "Property & Real Estate",          desc: "Expert guidance on land documentation, acquisitions, and tenancy disputes.", icon: Landmark },
  { title: "Criminal Defense",                desc: "Protecting rights with vigorous and ethical defense strategies in superior courts.", icon: Shield },
  { title: "Family & Estate Law",             desc: "Managing probate, wills, and matrimonial matters with sensitivity and privacy.", icon: Users2 },
  { title: "Energy & Natural Resources",      desc: "Navigating the legal framework of oil, gas, and environmental regulations.", icon: Scale },
];

const partners = [
  { name: "Barr. Opunabo Ekine",         title: "Principal Partner",  specialty: "Constitutional Law & Litigation", image: "/bar opunabo.jpeg" },
  { name: "Barr. Mrs. Kemi Ekine Esq",   title: "Managing Partner",   specialty: "Corporate Law & Governance",      image: "/bar kemi.jpeg" },
  { name: "Barr. Wapaemi Sokari Richman",title: "Senior Partner",     specialty: "Property & Real Estate Law",      image: "/bar wapaemi.jpeg" },
];

const caseResults = [
  { outcome: "N450M Settlement Secured",  category: "Commercial Litigation", detail: "Represented a multinational firm in a complex breach of contract suit." },
  { outcome: "Acquittal in Landmark Case",category: "Criminal Defense",      detail: "Successfully defended a high-profile white-collar crime investigation." },
  { outcome: "Corporate Merger Finalized",category: "Corporate Law",         detail: "Acted as lead counsel in a N1.2B tech infrastructure merger." },
  { outcome: "Land Title Dispute Resolved",category: "Real Estate Law",      detail: "Recovered 50 hectares of contested land through appellate advocacy." },
];

const testimonials = [
  { text: "Opunabo Ekine & Associates provided clarity during a very turbulent legal battle. Brilliant strategic approach.", author: "Chief Emeka N.",     pos: "CEO, Trans-Sahara" },
  { text: "Professionalism and personal attention were exceptional. Highly recommend for corporate matters.",               author: "Sarah J. Williams", pos: "MD, BlueChip Tech" },
  { text: "They understand business as well as law. Their advice saved our property investment.",                           author: "Alhaji Ibrahim K.", pos: "Real Estate Developer" },
];

const insights = [
  { date: "Oct 24, 2025", title: "Navigating the New Land Use Regulatory Framework",         cat: "Real Estate" },
  { date: "Nov 12, 2025", title: "Recent Supreme Court Rulings on Cybercrime Liability",     cat: "Litigation" },
  { date: "Jan 05, 2026", title: "Corporate Compliance: What Startups Miss in 2026",         cat: "Corporate" },
];

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const years     = useCountUp(25,   statsVisible);
  const cases     = useCountUp(1200, statsVisible);
  const attorneys = useCountUp(15,   statsVisible);

  /* carousel auto-advance */
  useEffect(() => {
    const id = setInterval(() => setCurrentSlide(p => (p + 1) % carouselImages.length), 7000);
    return () => clearInterval(id);
  }, []);

  /* stats intersection observer */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* swipe handlers */
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.changedTouches[0].clientX; };
  const handleTouchEnd   = (e: React.TouchEvent) => {
    const d = touchStartX.current - e.changedTouches[0].clientX;
    if (d > 50)  setCurrentSlide(p => (p + 1) % carouselImages.length);
    if (d < -50) setCurrentSlide(p => (p - 1 + carouselImages.length) % carouselImages.length);
  };

  /* scroll-based parallax for hero */
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 120]);

  return (
    <main className="bg-[#080C14] text-white overflow-x-hidden" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        className="relative text-center py-36 px-6 overflow-hidden min-h-screen flex flex-col justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* parallax bg images */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          {carouselImages.map((item, idx) => (
            <AnimatePresence key={idx}>
              {idx === currentSlide && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 0.45, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                >
                  <Image src={item.src} alt={`Slide ${idx + 1}`} fill priority={idx === 0} sizes="100vw" className="object-cover" />
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </motion.div>

        {/* deep gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14]/70 via-[#080C14]/40 to-[#080C14] z-10" />

        {/* radial gold glow centre */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(255,215,0,0.07),transparent)] z-10 pointer-events-none" />

        <Particles />

        {/* content */}
        <motion.div className="relative z-20 max-w-5xl mx-auto" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          {/* decorative rule */}
          <motion.div className="flex items-center justify-center gap-4 mb-8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFD700]" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#FFD700]" />
            <span className="text-[#FFD700] text-xs font-sans tracking-[0.35em] uppercase">Est. 1999 · Port Harcourt, Nigeria</span>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#FFD700]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFD700]" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight leading-[1.05]"
              style={{ textShadow: "0 0 60px rgba(255,215,0,0.2)" }}>
            Opunabo Ekine
            <span className="block text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]"> & Associates</span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/75 leading-relaxed font-light tracking-wide">
            Providing sophisticated legal counsel and aggressive advocacy.<br />
            <em className="text-[#FFD700]/80">Integrity in practice, excellence in results.</em>
          </p>

          <motion.div className="flex flex-col sm:flex-row justify-center gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <a href="/contact"
               className="relative group overflow-hidden bg-[#FFD700] text-[#080C14] px-10 py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.6)]">
              <span className="relative z-10">Request a Consultation</span>
              <span className="absolute inset-0 bg-white translate-x-[-110%] group-hover:translate-x-0 transition-transform duration-300 ease-out opacity-20" />
            </a>
            <a href="#practice"
               className="border border-[#FFD700]/50 text-[#FFD700] px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#FFD700]/10 hover:border-[#FFD700] transition-all duration-300">
              Explore Practice Areas
            </a>
          </motion.div>

          {/* slide caption */}
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} className="mt-10 text-sm text-[#FFD700]/70 font-sans tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
              — {carouselImages[currentSlide].caption} —
            </motion.div>
          </AnimatePresence>

          {/* slide dots */}
          <div className="flex justify-center gap-3 mt-6">
            {carouselImages.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)}
                className={`h-1 rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 bg-[#FFD700]" : "w-2 bg-white/20 hover:bg-white/40"}`} />
            ))}
          </div>
        </motion.div>

        {/* scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#FFD700]/60" />
          <span className="text-[#FFD700]/50 text-[10px] font-sans tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ── STATS ───────────────────────────────────────────── */}
      <section ref={statsRef} className="py-20 relative">
        {/* glowing top border */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/5 to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 text-center px-6">
          {[
            { val: years,     suffix: "+", label: "Years of Experience" },
            { val: cases,     suffix: "+", label: "Cases Resolved" },
            { val: attorneys, suffix: "",  label: "Expert Attorneys" },
          ].map((stat, i) => (
            <motion.div key={i} className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
              <span className="text-5xl md:text-6xl font-bold text-[#FFD700] tabular-nums"
                    style={{ textShadow: "0 0 30px rgba(255,215,0,0.5)" }}>
                {stat.val.toLocaleString()}{stat.suffix}
              </span>
              <span className="text-xs font-sans text-gray-400 uppercase tracking-[0.2em] mt-3">{stat.label}</span>
              <div className="w-8 h-px bg-[#FFD700]/40 mt-3" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRACTICE AREAS ──────────────────────────────────── */}
      <section id="practice" className="py-28 px-6 bg-[#060A10]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>Our Practice Areas</SectionHeading>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto font-sans">
            Comprehensive legal services tailored to corporate entities and private individuals.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((area, i) => {
              const Icon = area.icon;
              return (
                <motion.div key={i}
                  className="group relative bg-[#0E1420] p-8 cursor-pointer overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
                  whileHover={{ y: -6 }}>
                  {/* glow border on hover */}
                  <div className="absolute inset-0 border border-[#FFD700]/0 group-hover:border-[#FFD700]/50 transition-all duration-500 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  {/* ambient glow */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <motion.div whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }} transition={{ duration: 0.4 }}>
                    <Icon className="w-10 h-10 mb-5 text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#FFD700] transition-colors duration-300">{area.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-sans">{area.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ─────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#080C14] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>The Partners</SectionHeading>

          <div className="grid md:grid-cols-3 gap-10">
            {partners.map((partner, i) => (
              <motion.div key={i} className="group text-center"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}>
                <div className="relative h-[420px] w-full mb-6 overflow-hidden">
                  {/* animated border frame */}
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <motion.div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FFD700]"
                      initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 + 0.3 }} />
                    <motion.div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FFD700]"
                      initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 + 0.4 }} />
                    <motion.div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#FFD700]"
                      initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 + 0.5 }} />
                    <motion.div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FFD700]"
                      initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 + 0.6 }} />
                  </div>
                  <Image src={partner.image} alt={partner.name} fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-transparent opacity-80 z-10" />
                  {/* name overlay on hover */}
                  <div className="absolute inset-0 flex items-end justify-center pb-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <div className="w-12 h-px bg-[#FFD700] mx-auto mb-3" />
                      <p className="text-[#FFD700] text-xs font-sans tracking-widest uppercase">{partner.specialty}</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{partner.name}</h3>
                <p className="text-[#FFD700] text-xs font-sans font-bold uppercase tracking-widest drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">{partner.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE RESULTS ─────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#060A10]">
        <div className="max-w-6xl mx-auto">
          <motion.div className="flex justify-center mb-4" initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <Trophy className="w-14 h-14 text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]" />
          </motion.div>
          <SectionHeading>Notable Case Results</SectionHeading>

          <div className="grid md:grid-cols-2 gap-6">
            {caseResults.map((result, i) => (
              <motion.div key={i}
                className="group relative bg-[#0E1420] p-8 overflow-hidden cursor-default"
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                whileHover={{ scale: 1.01 }}>
                {/* animated left accent */}
                <motion.div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFD700] via-[#FFD700]/50 to-transparent"
                  initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,215,0,0.04),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="text-[10px] text-[#FFD700]/70 font-sans font-bold uppercase tracking-[0.2em]">{result.category}</span>
                <h3 className="text-xl md:text-2xl font-bold mt-2 mb-3 text-white group-hover:text-[#FFD700] transition-colors duration-300">
                  {result.outcome}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-sans">{result.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center px-6">
          <motion.div className="relative" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="relative overflow-hidden">
              <Image src="/group.jpeg" alt="Law Firm Office" width={600} height={500}
                className="w-full grayscale hover:grayscale-0 transition-all duration-1000 object-cover" />
              <div className="absolute inset-0 border border-[#FFD700]/20" />
            </div>
            {/* floating badge */}
            <motion.div className="absolute -bottom-5 -right-5 bg-[#FFD700] p-6 hidden lg:flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.4)]"
              animate={{ boxShadow: ["0 0 20px rgba(255,215,0,0.3)", "0 0 50px rgba(255,215,0,0.7)", "0 0 20px rgba(255,215,0,0.3)"] }}
              transition={{ repeat: Infinity, duration: 3 }}>
              <Scale size={44} className="text-[#080C14]" />
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[#FFD700]/70 text-xs font-sans tracking-[0.3em] uppercase mb-4">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
              Legal Integrity <span className="text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]">You Can Depend On</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed font-sans text-sm">
              At Opunabo Ekine & Associates, we understand that legal challenges require more than just knowledge of the law — they require a partner who understands your objectives.
            </p>
            <ul className="space-y-5">
              {["Proactive Risk Management", "Timely and Clear Communication", "Unwavering Ethical Standards", "Proven Track Record in Superior Courts"].map((text, idx) => (
                <motion.li key={idx} className="flex items-center gap-4 text-sm text-gray-300 font-sans"
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 + 0.3 }}>
                  <div className="flex-shrink-0 w-7 h-7 border border-[#FFD700]/50 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-[#FFD700] rotate-45" />
                  </div>
                  {text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-28 bg-[#060A10] relative overflow-hidden">
        <Quote className="absolute -top-8 -left-8 w-72 h-72 text-[#FFD700]/4 -rotate-12 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <SectionHeading>Client Perspectives</SectionHeading>
            <motion.div className="flex gap-1.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {[...Array(5)].map((_, i) => (
                <motion.div key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: i * 0.08 + 0.2 }} viewport={{ once: true }}>
                  <Star size={18} className="fill-[#FFD700] text-[#FFD700] drop-shadow-[0_0_6px_rgba(255,215,0,0.7)]" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i}
                className="relative bg-[#0E1420] p-8 border border-white/5 group hover:border-[#FFD700]/30 transition-colors duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                whileHover={{ y: -4 }}>
                <Quote size={28} className="text-[#FFD700]/20 mb-4" />
                <p className="text-gray-300 italic mb-8 leading-relaxed text-sm font-sans">{t.text}</p>
                <div className="border-t border-white/5 pt-4">
                  <h4 className="text-white font-bold text-base">{t.author}</h4>
                  <p className="text-[#FFD700]/60 text-xs font-sans uppercase tracking-widest mt-1">{t.pos}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS ─────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#080C14]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>Legal Insights</SectionHeading>
          <p className="text-center text-gray-500 mb-16 max-w-xl mx-auto font-sans text-sm">
            Staying ahead of legislative changes and judicial precedents.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((post, i) => (
              <motion.div key={i}
                className="group relative bg-[#0E1420] p-7 cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <span className="text-[10px] text-gray-600 font-sans font-bold uppercase tracking-widest">{post.date} · {post.cat}</span>
                <h4 className="text-base md:text-lg font-bold text-white mt-3 mb-5 group-hover:text-[#FFD700] transition-colors duration-300 leading-snug">
                  {post.title}
                </h4>
                <div className="flex items-center text-[#FFD700] text-xs font-sans font-bold uppercase tracking-wider gap-1">
                  Read Article
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <ChevronRight size={13} />
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(255,215,0,0.08),transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent" />
        <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-[#FFD700]/60 text-xs font-sans tracking-[0.35em] uppercase mb-6">Begin Your Case</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Secure <span className="text-[#FFD700]">Expert Representation?</span>
          </h2>
          <p className="text-gray-400 mb-10 font-sans">Schedule a confidential consultation with one of our senior attorneys today.</p>
          <a href="/contact"
             className="inline-block bg-[#FFD700] text-[#080C14] px-12 py-5 font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] hover:bg-white transition-all duration-300">
            Request a Consultation
          </a>
        </motion.div>
      </section>

      {/* ── WHATSAPP FLOAT ───────────────────────────────────── */}
      <a href="https://wa.me/234905348075?text=Hello%20Opunabo%20%26%20Associates%2C%20I%20require%20legal%20counsel"
         target="_blank" rel="noopener noreferrer"
         className="fixed bottom-6 right-6 z-50 group">
        <motion.div
          className="bg-green-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] group-hover:shadow-[0_0_40px_rgba(34,197,94,0.7)]"
          whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}
          animate={{ boxShadow: ["0 0 20px rgba(34,197,94,0.3)", "0 0 35px rgba(34,197,94,0.6)", "0 0 20px rgba(34,197,94,0.3)"] }}
          transition={{ repeat: Infinity, duration: 2.5 }}>
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.747-2.874-2.512-2.96-2.626-.088-.113-.716-.953-.716-1.819 0-.866.454-1.292.614-1.456.16-.164.346-.205.462-.205.115 0 .23 0 .33.006.107.004.25-.039.392.302.144.35.492 1.203.535 1.289.043.086.072.186.014.302-.057.116-.086.186-.172.287-.086.1-.18.223-.258.3-.086.086-.175.18-.075.35.1.171.446.737.956 1.192.658.587 1.212.77 1.381.854.171.086.271.072.371-.043.1-.114.428-.498.542-.669.115-.171.23-.142.386-.086.158.057 1.001.472 1.173.558.171.086.286.129.33.201.043.072.043.415-.101.82z"/>
          </svg>
        </motion.div>
      </a>
    </main>
  );
}