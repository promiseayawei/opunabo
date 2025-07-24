"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Rocket, Briefcase, Users, Star } from "lucide-react";

const milestones = [
  {
    year: "2010+",
    title: "Over a Decade of Experience",
    description:
      "For more than a decade, CCMG has managed capital in real estate, energy, banking, and trade finance.",
  },
  {
    year: "2023",
    title: "Capital Management Excellence",
    description:
      "Managed capital for numerous entities including TBFT Properties, Xtreme Conflict Zone, and The Foulkon Foundation.",
  },
  {
    year: "2024",
    title: "Innovative Energy Investment",
    description:
      "Deployed cutting-edge strategies with Light Switch Atomic Energy and PP&T Technologies Limited.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#0A0F1A] text-[#F1F1F1] min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-28">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-[#D4AF37] mb-4">
            About CCMG
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            At Chicago Capital Management Group LLC, our business is capital:
            managing it, creating it, and controlling its use to build a better
            world.
          </p>
        </motion.div>

        {/* Mission, Strategy, Research */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6"
        >
          {[
            {
              icon: Rocket,
              title: "Planning",
              text: "Every investment begins with detailed planning and a robust exit strategy.",
            },
            {
              icon: Briefcase,
              title: "Strategy",
              text: "Growth, timing, and risk management are our core investment principles.",
            },
            {
              icon: Users,
              title: "Research",
              text: "Top-tier research across sectors fuels our risk-aware, market-savvy decisions.",
            },
            {
              icon: Star,
              title: "Experience",
              text: "Over 90 years of combined expertise across real estate, energy, and finance.",
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#1C2230] p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <Icon size={40} className="text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#D4AF37]">{title}</h3>
              <p className="text-gray-400">{text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* About CCMG */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-3xl font-bold text-[#D4AF37]">Who We Are</h3>
          <p className="text-gray-300 leading-relaxed">
            Chicago Capital Management Group LLC (CCMG) stands at the forefront
            of capital strategy. With a rich legacy in real estate, energy,
            trade finance, and investment banking, CCMG invests in what makes
            life better for people and planet.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We specialize in structured capital deployment and manage assets for
            for-profit and non-profit ventures. Our portfolio spans domestic and
            international projects with measurable impact.
          </p>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial="hidden"
          whileInView="show"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-[#D4AF37] mb-12">
            CCMG Milestones
          </h3>
          <div className="space-y-12 relative border-l-2 border-[#D4AF37] pl-10">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex gap-6 items-start"
              >
                <div className="absolute -left-[42px] top-1 bg-[#D4AF37] text-black rounded-full p-2 shadow-lg">
                  <Star size={20} />
                </div>
                <div className="ml-2">
                  <h4 className="text-lg font-bold text-[#F1F1F1]">
                    {item.year} - {item.title}
                  </h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h3 className="text-xl font-semibold text-[#D4AF37]">
            Let&apos;s Invest in a Better Future
          </h3>
          <p className="text-gray-300">
            Reach out to discuss partnership opportunities or capital strategies
            that work for you.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="mailto:info@chicagocapitalmanagementgroup.com"
              className="px-6 py-3 bg-[#D4AF37] text-black rounded-md font-semibold hover:opacity-90 transition"
            >
              Email Us
            </a>
            <a
              href="/contact"
              className="px-6 py-3 border border-[#D4AF37] text-[#D4AF37] rounded-md font-semibold hover:bg-[#D4AF37]/10 transition"
            >
              Contact Page
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
