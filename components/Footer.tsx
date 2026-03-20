"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Scale } from "lucide-react";

const practiceAreas = [
  { label: "Civil & Criminal Litigation", href: "/practice-areas" },
  { label: "Constitutional Law",          href: "/practice-areas" },
  { label: "Corporate & Commercial Law",  href: "/practice-areas" },
  { label: "Property & Real Estate",      href: "/practice-areas" },
  { label: "Estate Planning & Probate",   href: "/practice-areas" },
  { label: "Appellate Advocacy",          href: "/practice-areas" },
];

const quickLinks = [
  { label: "Home",          href: "/" },
  { label: "About",         href: "/about" },
  { label: "Our Team",      href: "/team" },
  { label: "Cases",         href: "/cases" },
  { label: "Contact",       href: "/contact" },
];

export default function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  return (
    <footer
      className="relative overflow-hidden border-t border-white/5"
      style={{
        background: "linear-gradient(180deg,#060A10 0%,#04070E 100%)",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      {/* ── Ambient glow ────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[320px]"
          style={{ background: "radial-gradient(ellipse,rgba(255,215,0,0.04) 0%,transparent 70%)" }}
        />
      </div>

      {/* ── Top gold rule ───────────────────────────────────── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />

      {/* ── Main grid ───────────────────────────────────────── */}
      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-10 grid md:grid-cols-4 gap-10">

        {/* ── Brand ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="md:col-span-1"
        >
          {/* wordmark */}
          <div className="flex items-start gap-3 mb-5">
            <Scale className="w-5 h-5 mt-1 text-[#FFD700] flex-shrink-0 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
            <div>
              <p className="text-white text-base font-bold leading-snug">Opunabo Ekine</p>
              <p className="text-[#FFD700]/60 text-[10px] uppercase tracking-[0.25em]">& Associates</p>
            </div>
          </div>

          <p className="text-[13px] leading-relaxed mb-5" style={{ color: "rgba(241,241,241,0.4)" }}>
            Rivers State&apos;s trusted counsel for complex litigation, corporate mandates,
            and property law. Called to the Nigerian Bar since 1999.
          </p>

          {/* decorative divider */}
          <div className="flex items-center gap-2">
            <div className="h-px w-6 bg-gradient-to-r from-transparent to-[#FFD700]/50" />
            <div className="w-1 h-1 rotate-45 bg-[#FFD700]/50" />
            <div className="h-px w-12 bg-gradient-to-r from-[#FFD700]/50 to-transparent" />
          </div>
        </motion.div>

        {/* ── Practice Areas ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}
        >
          <h4 className="text-[#FFD700] text-[10px] font-bold uppercase tracking-[0.28em] mb-5">
            Practice Areas
          </h4>
          <ul className="space-y-2.5">
            {practiceAreas.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="group flex items-center gap-2 text-[13px] transition-colors duration-300"
                  style={{ color: "rgba(241,241,241,0.4)" }}
                >
                  <span className="w-3 h-px bg-[#FFD700]/25 group-hover:w-5 group-hover:bg-[#FFD700] transition-all duration-300 flex-shrink-0" />
                  <span className="group-hover:text-[#FFD700] transition-colors duration-300">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Quick Links ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h4 className="text-[#FFD700] text-[10px] font-bold uppercase tracking-[0.28em] mb-5">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="group flex items-center gap-2 text-[13px] transition-colors duration-300"
                  style={{ color: "rgba(241,241,241,0.4)" }}
                >
                  <span className="w-3 h-px bg-[#FFD700]/25 group-hover:w-5 group-hover:bg-[#FFD700] transition-all duration-300 flex-shrink-0" />
                  <span className="group-hover:text-[#FFD700] transition-colors duration-300">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Contact ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h4 className="text-[#FFD700] text-[10px] font-bold uppercase tracking-[0.28em] mb-5">
            Contact
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#FFD700]/40 mt-0.5 flex-shrink-0" />
              <span className="text-[13px] leading-relaxed" style={{ color: "rgba(241,241,241,0.4)" }}>
                Port Harcourt,<br />Rivers State, Nigeria
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#FFD700]/40 flex-shrink-0" />
              <a
                href="tel:+2349053480750"
                className="text-[13px] hover:text-[#FFD700] transition-colors duration-300"
                style={{ color: "rgba(241,241,241,0.4)" }}
              >
                +234 905 348 075
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#FFD700]/40 flex-shrink-0" />
              <a
                href="mailto:opunabo@opunaboekine.com"
                className="text-[13px] hover:text-[#FFD700] transition-colors duration-300"
                style={{ color: "rgba(241,241,241,0.4)" }}
              >
                opunabo@opunaboekine.com
              </a>
            </li>
          </ul>

          {/* CTA */}
          <motion.div className="mt-7">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#080C14] bg-[#FFD700] hover:bg-white hover:shadow-[0_0_28px_rgba(255,215,0,0.4)] transition-all duration-300"
              style={{ fontFamily: "sans-serif" }}
            >
              Request a Consultation
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <div className="relative max-w-6xl mx-auto px-6 pb-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/6 to-transparent mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-[11px] uppercase tracking-widest"
            style={{ color: "rgba(241,241,241,0.2)", fontFamily: "sans-serif" }}
          >
            &copy; {year} Opunabo Ekine & Associates. All rights reserved.
          </p>
          <div className="flex items-center gap-1" style={{ fontFamily: "sans-serif" }}>
            <div className="w-px h-3 bg-[#FFD700]/20 mx-2" />
            {["Privacy Policy", "Terms of Use"].map((t, i, arr) => (
              <span key={t} className="flex items-center gap-2">
                <Link
                  href="#"
                  className="text-[11px] uppercase tracking-widest hover:text-[#FFD700] transition-colors duration-300"
                  style={{ color: "rgba(241,241,241,0.2)" }}
                >
                  {t}
                </Link>
                {i < arr.length - 1 && (
                  <span className="w-px h-3 bg-white/10" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}