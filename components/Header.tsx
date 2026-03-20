"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home",          href: "/" },
  { label: "About",         href: "/about" },
  { label: "Services",      href: "/services" },
  { label: "Team",          href: "/team" },
  { label: "Testimonials",  href: "/testimonials" },
  { label: "Practice Areas",href: "/practice-areas" },
  { label: "Projects",      href: "/projects" },
  { label: "Contact",       href: "/contact" },
];

export default function Header() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname              = usePathname();

  /* close mobile nav on route change */
  useEffect(() => { setOpen(false); }, [pathname]);

  /* shrink header on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(8,12,20,0.97)"
          : "rgba(8,12,20,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,215,0,0.12)"
          : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.6)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between"
           style={{ height: scrolled ? "68px" : "84px", transition: "height 0.4s ease" }}>

        {/* ── Logo ──────────────────────────────────────────── */}
        <Link href="/" className="relative flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <Image
              src="/logo2.png"
              alt="CCMG Logo"
              width={110}
              height={72}
              priority
              className="object-contain transition-opacity duration-300 group-hover:opacity-90"
            />
          </motion.div>
          <span className="sr-only">Chicago Capital Management Group</span>
        </Link>

        {/* ── Desktop Nav ───────────────────────────────────── */}
        <nav
          className="hidden lg:flex items-center gap-1"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {links.map((link, i) => {
            const active = pathname === link.href;
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className="relative px-3 py-1.5 text-[13px] tracking-wider uppercase group"
                  style={{
                    color: active ? "#FFD700" : "rgba(241,241,241,0.6)",
                    fontWeight: active ? 600 : 400,
                    letterSpacing: "0.1em",
                  }}
                >
                  {/* hover underline */}
                  <span
                    className="absolute bottom-0 left-3 right-3 h-px origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                    style={{ background: "linear-gradient(90deg,#FFD700,rgba(255,215,0,0.3))" }}
                  />
                  {/* active dot */}
                  {active && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rotate-45 bg-[#FFD700]"
                    />
                  )}
                  <span className="relative transition-colors duration-300 group-hover:text-[#FFD700]">
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="ml-4"
          >
            <Link
              href="/contact"
              className="relative inline-flex items-center gap-2 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#080C14] bg-[#FFD700] hover:bg-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,215,0,0.4)]"
              style={{ fontFamily: "sans-serif" }}
            >
              Enquire
            </Link>
          </motion.div>
        </nav>

        {/* ── Mobile Toggle ─────────────────────────────────── */}
        <button
          className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white/70 hover:text-[#FFD700] transition-colors duration-300"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div key="x"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div key="menu"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MenuIcon size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* ── Mobile Menu ───────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-white/5"
            style={{ background: "rgba(8,12,20,0.98)" }}
          >
            <nav
              className="max-w-7xl mx-auto px-6 py-4 flex flex-col"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {links.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 py-3 border-b border-white/5 group"
                    >
                      {/* active/hover bar */}
                      <span
                        className="w-1 h-4 flex-shrink-0 transition-all duration-300"
                        style={{
                          background: active ? "#FFD700" : "transparent",
                          boxShadow: active ? "0 0 8px rgba(255,215,0,0.5)" : "none",
                        }}
                      />
                      <span
                        className="text-sm uppercase tracking-widest transition-colors duration-300 group-hover:text-[#FFD700]"
                        style={{
                          color: active ? "#FFD700" : "rgba(241,241,241,0.55)",
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="pt-5 pb-2"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#080C14] bg-[#FFD700] hover:bg-white transition-all duration-300"
                  style={{ fontFamily: "sans-serif" }}
                >
                  Request a Consultation
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}