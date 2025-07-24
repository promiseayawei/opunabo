"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  {
    name: "Aurora Investments",
    logo: "/partners/aurora.jpg",
    description: "A strategic investment firm focused on sustainable growth and innovation in frontier markets.",
  },
  {
    name: "Zenith Capital",
    logo: "/partners/zenith.webp",
    description: "A global capital partner committed to building resilient financial ecosystems.",
  },
  {
    name: "GreenWave Ventures",
    logo: "/partners/greenwave.jpg",
    description: "Backing clean-tech and impact-driven startups with bold visions.",
  },
  {
    name: "Nimbus Holdings",
    logo: "/partners/nimbus.jpg",
    description: "Providing comprehensive portfolio management and long-term wealth planning solutions.",
  },
  {
    name: "Crest Advisory",
    logo: "/partners/crest.jpg",
    description: "Advisory powerhouse with expertise in risk mitigation, governance, and global expansion.",
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1A] text-[#F1F1F1] px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-[#D4AF37]">Our Trusted Partners</h1>
        <p className="text-[#F1F1F1] text-lg">
          We collaborate with visionary partners to drive innovation, scale impactful ventures, and build sustainable financial futures.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            className="bg-[#1C2230] rounded-2xl p-6 text-center shadow-xl hover:scale-105 transition-transform duration-300"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="w-full h-28 flex items-center justify-center mb-4">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={100}
                height={60}
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-2">{partner.name}</h2>
            <p className="text-[#F1F1F1] text-sm">{partner.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-20">
        <p className="text-[#F1F1F1] text-lg">
          Interested in partnering with us?{" "}
          <a
            href="/contact"
            className="text-[#D4AF37] underline hover:text-[#E5C97B] transition-colors duration-200"
          >
            Reach out today
          </a>
          .
        </p>
      </div>
    </div>
  );
}
