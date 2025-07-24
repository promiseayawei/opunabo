"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TeamPage() {
  const team = [
    {
      name: "John Doe",
      role: "Chief Executive Officer",
      image: "/team/john.jpg",
    },
    {
      name: "Sarah Johnson",
      role: "Chief Investment Officer",
      image: "/team/sarah.jpg",
    },
    {
      name: "Michael Smith",
      role: "Operations Director",
      image: "/team/michael.jpg",
    },
    {
      name: "Emily Davis",
      role: "Head of Research",
      image: "/team/emily.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0A0F1A] text-[#F1F1F1] py-16 px-4 md:px-12">
      <section className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#D4AF37]"
        >
          Meet Our Team
        </motion.h2>
        <p className="text-[#F1F1F1] mt-4 max-w-2xl mx-auto text-lg">
          Our leadership team brings expertise and vision to guide your investments.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {team.map((member, index) => (
          <motion.div
            key={index}
            className="bg-[#1C2230] p-6 rounded-2xl shadow-lg border border-[#D4AF37] text-center hover:shadow-2xl transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden border-2 border-[#D4AF37]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#F1F1F1]">{member.name}</h3>
            <p className="text-sm text-[#D4AF37]">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
