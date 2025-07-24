"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Users2, SlidersHorizontal } from "lucide-react";

export default function ServicesPage() {
  return (
    <main className="bg-[#0A0F1A] text-[#F1F1F1]">
      {/* Hero */}
      <section className="py-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-[#D4AF37] text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-[#ccc] text-lg">
            Tailored investment strategies, trusted advisory, and world-class financial services built for long-term growth.
          </p>
        </motion.div>
      </section>

      {/* Financial Advisory */}
      <section className="py-20 bg-[#0A0F1A]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/consulting.jpg"
              alt="Financial Advisory"
              width={600}
              height={400}
              className="rounded-lg shadow-xl object-cover w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#D4AF37]">Holistic Financial Advisory</h2>
            <p className="text-[#ccc] mb-4">
              Our team works with high-net-worth individuals and institutions to build tailored investment and wealth preservation strategies.
            </p>
            <ul className="list-disc list-inside text-[#F1F1F1]">
              <li>Portfolio Management & Asset Allocation</li>
              <li>Trust & Estate Planning Strategies</li>
              <li>Alternative Investment Access</li>
              <li>Family Office & Private Client Services</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 bg-[#1C2230] text-center">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-[#D4AF37]">What Sets Us Apart</h2>
          <div className="grid sm:grid-cols-3 gap-8 px-6">
            <div className="p-6 rounded-lg bg-[#0A0F1A] shadow hover:shadow-xl transition">
              <ShieldCheck className="mx-auto mb-4 text-[#D4AF37]" size={32} />
              <h3 className="font-semibold text-xl mb-2">Independent & Objective</h3>
              <p className="text-[#ccc]">We act with full transparency and no conflict of interest—your goals lead every decision.</p>
            </div>
            <div className="p-6 rounded-lg bg-[#0A0F1A] shadow hover:shadow-xl transition">
              <Users2 className="mx-auto mb-4 text-[#D4AF37]" size={32} />
              <h3 className="font-semibold text-xl mb-2">Client-Focused</h3>
              <p className="text-[#ccc]">We build relationships that span generations, with your legacy at the forefront.</p>
            </div>
            <div className="p-6 rounded-lg bg-[#0A0F1A] shadow hover:shadow-xl transition">
              <SlidersHorizontal className="mx-auto mb-4 text-[#D4AF37]" size={32} />
              <h3 className="font-semibold text-xl mb-2">Adaptive Strategies</h3>
              <p className="text-[#ccc]">Our solutions evolve with your needs—dynamic, data-driven, and resilient.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-[#0A0F1A] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4 text-[#D4AF37]">Let’s Build a Smarter Future Together</h2>
          <p className="text-[#ccc] mb-6">
            Discover how Chicago Capital Management Group can transform your financial strategy with integrity and foresight.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#b8962f] transition"
          >
            Get in Touch
          </a>
        </motion.div>
      </section>
    </main>
  );
}
