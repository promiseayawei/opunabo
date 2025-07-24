// components/teamSection.tsx

import Image from "next/image";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Chinedu Okeke",
    title: "Managing Partner",
    image: "/team1.jpg",
  },
  {
    name: "Zainab Bello",
    title: "Financial Analyst",
    image: "/team2.jpg",
  },
  {
    name: "Tunde Adewale",
    title: "Investment Strategist",
    image: "/team3.jpg",
  },
  {
    name: "Amara Ibe",
    title: "Client Relations Lead",
    image: "/team4.jpg",
  },
];

export function TeamSection() {
  return (
    <section className="py-20 bg-[#0A0F1A] text-[#F1F1F1]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4 text-[#D4AF37]"
        >
          Meet Our Leadership
        </motion.h2>
        <p className="mb-12 text-gray-300 max-w-3xl mx-auto">
          The Bricore team brings decades of combined experience in investment banking, advisory, and asset management.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1C2230] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={500}
                height={400}
                className="object-cover h-64 w-full"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#D4AF37]">{member.name}</h3>
                <p className="text-sm text-gray-300">{member.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
