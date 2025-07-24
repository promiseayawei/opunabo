"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Southside Affordable Housing",
    description:
      "A multi-phase residential housing project in Chicago’s Southside, focused on affordable units and community revitalization.",
    image: "/projects/housing.jpg",
  },
  {
    title: "Small Business Development Fund",
    description:
      "Partnered with local institutions to fund and mentor over 75 minority-owned businesses in underserved neighborhoods.",
    image: "/projects/business.jpg",
  },
  {
    title: "Clean Energy Microgrid",
    description:
      "Piloting sustainable microgrid infrastructure in collaboration with energy partners for low-income communities.",
    image: "/projects/energy.jpg",
  },
  {
    title: "Youth Tech Accelerator",
    description:
      "CCMG funded and launched an innovation hub giving inner-city youth access to STEM education and startup mentorship.",
    image: "/projects/tech.jpg",
  },
];

export default function ProjectsPage() {
  return (
    <main className="bg-[#0A0F1A] text-[#F1F1F1] py-16 px-6 md:px-20">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-12 text-center text-[#D4AF37]"
      >
        Our Projects
      </motion.h1>

      <div className="grid gap-10 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="rounded-2xl shadow-md overflow-hidden bg-[#1C2230]"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={350}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-[#D4AF37] mb-3">
                {project.title}
              </h3>
              <p className="text-[#F1F1F1]">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
