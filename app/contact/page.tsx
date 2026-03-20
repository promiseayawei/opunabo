"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

/* ── contact info cards ─────────────────────────────────────── */
const contactDetails = [
  {
    icon: MapPin,
    title: "Our Office",
    lines: ["47 W Polk St, Suite 100-207", "Chicago, IL 60605, USA"],
    sub: "Visit us by appointment",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["contact@ccmgllc.com"],
    sub: "We respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+1 (312) 555-0198"],
    sub: "Mon – Fri, 9am – 6pm",
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Monday – Friday: 9:00am – 6:00pm", "Saturday: 10:00am – 2:00pm"],
    sub: "Closed on public holidays",
  },
];

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  }

  return (
    <main
      className="bg-[#080C14] text-white overflow-x-hidden min-h-screen"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-36 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/consultation.jpeg" alt="Contact Us" fill sizes="100vw" className="object-cover opacity-60 brightness-110" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14]/40 via-[#080C14]/20 to-[#080C14]/30 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_60%,rgba(255,215,0,0.07),transparent)] z-10 pointer-events-none" />
        <Particles />

        <motion.div
          className="relative z-20 max-w-3xl mx-auto px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
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
            Get In <span className="text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">Touch</span>
          </h1>

          <p className="text-gray-400 text-lg font-sans font-light leading-relaxed">
            Whether you need urgent legal counsel or want to explore a retainer arrangement —
            our team is ready to connect with you.
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

      {/* ── CONTACT CARDS ───────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactDetails.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                className="group relative bg-[#0E1420] p-7 border border-white/5 hover:border-[#FFD700]/30 transition-colors duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ y: -4 }}
              >
                {/* left accent bar */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFD700] via-[#FFD700]/40 to-transparent"
                  style={{ originY: 0 }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                />
                {/* ambient glow */}
                <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-[#FFD700]/4 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }} transition={{ duration: 0.35 }}>
                  <Icon className="w-8 h-8 mb-5 text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                </motion.div>
                <h3 className="text-base font-bold text-white mb-3 group-hover:text-[#FFD700] transition-colors duration-300">
                  {item.title}
                </h3>
                {item.lines.map((line, j) => (
                  <p key={j} className="text-gray-300 text-sm font-sans leading-relaxed">{line}</p>
                ))}
                <p className="text-[#FFD700]/40 text-xs font-sans mt-3 italic">{item.sub}</p>

                {/* bottom sweep line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── FORM + MAP ──────────────────────────────────────── */}
      <section className="py-10 pb-28 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

          {/* ── FORM ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#FFD700]/60 text-xs font-sans tracking-[0.3em] uppercase mb-3">Send a Message</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
              Schedule a <span className="text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]">Confidential Consultation</span>
            </h2>

            {submitted ? (
              <motion.div
                className="bg-[#0E1420] border border-[#FFD700]/30 p-10 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 border-2 border-[#FFD700] flex items-center justify-center"
                  animate={{ boxShadow: ["0 0 0px rgba(255,215,0,0.3)", "0 0 30px rgba(255,215,0,0.6)", "0 0 0px rgba(255,215,0,0.3)"] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                >
                  <Send className="w-7 h-7 text-[#FFD700]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">Message Received</h3>
                <p className="text-gray-400 font-sans text-sm leading-relaxed">
                  Thank you for reaching out. A member of our team will contact you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { label: "Full Name", type: "text", id: "name", placeholder: "e.g. John Adamu" },
                  { label: "Email Address", type: "email", id: "email", placeholder: "you@example.com" },
                  { label: "Phone Number", type: "tel", id: "phone", placeholder: "+234 800 000 0000" },
                ].map((field) => (
                  <div key={field.id} className="group">
                    <label className="block text-xs font-sans text-[#FFD700]/60 uppercase tracking-widest mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.id !== "phone"}
                      className="w-full bg-[#0E1420] border border-white/10 focus:border-[#FFD700]/50 text-white placeholder-gray-600 px-5 py-3.5 font-sans text-sm outline-none transition-colors duration-300"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-sans text-[#FFD700]/60 uppercase tracking-widest mb-2">
                    Area of Law
                  </label>
                  <select className="w-full bg-[#0E1420] border border-white/10 focus:border-[#FFD700]/50 text-gray-300 px-5 py-3.5 font-sans text-sm outline-none transition-colors duration-300 appearance-none">
                    <option value="">Select a practice area…</option>
                    <option>Litigation & Dispute Resolution</option>
                    <option>Corporate & Commercial</option>
                    <option>Property & Real Estate</option>
                    <option>Family & Probate</option>
                    <option>Labour & Employment</option>
                    <option>Energy & Natural Resources</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#FFD700]/60 uppercase tracking-widest mb-2">
                    Brief Description
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Please describe your legal matter in brief…"
                    required
                    className="w-full bg-[#0E1420] border border-white/10 focus:border-[#FFD700]/50 text-white placeholder-gray-600 px-5 py-3.5 font-sans text-sm outline-none transition-colors duration-300 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="relative w-full bg-[#FFD700] text-[#080C14] font-bold uppercase tracking-widest text-sm py-4 overflow-hidden hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] transition-shadow duration-300 disabled:opacity-70"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        className="w-4 h-4 border-2 border-[#080C14]/40 border-t-[#080C14] rounded-full inline-block"
                        animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                      />
                      Sending…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send size={15} /> Send Message
                    </span>
                  )}
                </motion.button>

                <p className="text-gray-600 text-xs font-sans text-center leading-relaxed">
                  All enquiries are treated with strict confidentiality under attorney-client privilege.
                </p>
              </form>
            )}
          </motion.div>

          {/* ── IMAGE / MAP SIDE ── */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* photo */}
            <div className="relative overflow-hidden h-72">
              <Image src="/law-library.jpeg" alt="Our office" fill sizes="600px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080C14]/80 to-transparent" />
              {/* corner brackets */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#FFD700]/60" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#FFD700]/60" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#FFD700]/60" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#FFD700]/60" />
              <div className="absolute bottom-5 left-6 z-10">
                <p className="text-white font-bold text-lg">Opunabo Ekine & Associates</p>
                <p className="text-[#FFD700]/70 text-xs font-sans tracking-widest uppercase">Port Harcourt, Nigeria</p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/234905348075?text=Hello%20Opunabo%20%26%20Associates%2C%20I%20require%20legal%20counsel"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#0E1420] border border-white/5 hover:border-green-500/40 p-5 group transition-colors duration-300"
              whileHover={{ x: 4 }}
            >
              <div className="w-12 h-12 bg-green-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-600/30 transition-colors duration-300">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-green-400">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.747-2.874-2.512-2.96-2.626-.088-.113-.716-.953-.716-1.819 0-.866.454-1.292.614-1.456.16-.164.346-.205.462-.205.115 0 .23 0 .33.006.107.004.25-.039.392.302.144.35.492 1.203.535 1.289.043.086.072.186.014.302-.057.116-.086.186-.172.287-.086.1-.18.223-.258.3-.086.086-.175.18-.075.35.1.171.446.737.956 1.192.658.587 1.212.77 1.381.854.171.086.271.072.371-.043.1-.114.428-.498.542-.669.115-.171.23-.142.386-.086.158.057 1.001.472 1.173.558.171.086.286.129.33.201.043.072.043.415-.101.82z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Chat on WhatsApp</p>
                <p className="text-gray-500 text-xs font-sans mt-0.5">Quick response guaranteed</p>
              </div>
              <div className="ml-auto text-[#FFD700]/40 group-hover:text-[#FFD700] transition-colors duration-300">→</div>
            </motion.a>

            {/* disclaimer box */}
            <div className="bg-[#0E1420] border-l-2 border-[#FFD700]/40 p-5">
              <p className="text-[#FFD700] text-xs font-sans font-bold uppercase tracking-widest mb-2">Confidentiality Notice</p>
              <p className="text-gray-500 text-xs font-sans leading-relaxed">
                All communications submitted through this form are protected by attorney-client privilege and treated with absolute confidentiality.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHATSAPP FLOAT ─────────────────────────────────── */}
      <a href="https://wa.me/234905348075?text=Hello%20Opunabo%20%26%20Associates%2C%20I%20require%20legal%20counsel"
         target="_blank" rel="noopener noreferrer"
         className="fixed bottom-6 right-6 z-50 group">
        <motion.div
          className="bg-green-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)]"
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