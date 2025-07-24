"use client";

import { motion } from "framer-motion";
import { ClipboardList, Workflow, Headset, LineChart, Users } from "lucide-react";

const services = [
  {
    icon: ClipboardList,
    title: "Admin & Executive Assistance",
    description:
      "Delegate your email, scheduling, document prep, and daily ops to a professional assistant who gets it done fast and right.",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description:
      "We identify bottlenecks and automate your workflows using smart tools so you can scale without burnout.",
  },
  {
    icon: Headset,
    title: "Customer Support",
    description:
      "From DMs to email and help desk tickets, we handle your customer conversations with speed and professionalism.",
  },
  {
    icon: LineChart,
    title: "Data & Reporting",
    description:
      "Get custom dashboards, reports, and tracking tools that help you make decisions based on real insights — not guesswork.",
  },
  {
    icon: Users,
    title: "Team Coordination",
    description:
      "We help manage your virtual team, track tasks, and ensure everyone stays aligned with your business goals.",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#0b1120] text-white min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#4282ea] mb-4">Our Services</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We help founders and business owners stay organized, automate tasks, and deliver great customer experiences.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#1c2333] p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <Icon size={40} className="text-[#4282ea] mb-4" />
              <h3 className="text-xl font-semibold text-[#4282ea] mb-2">{title}</h3>
              <p className="text-gray-400">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mt-10"
        >
          <h2 className="text-2xl font-bold text-[#4282ea]">Let’s Work Together</h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Whether you’re just starting out or scaling fast, we’ll match you with support that grows with your business.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="/book-session"
              className="px-6 py-3 bg-[#4282ea] text-black font-semibold rounded-md hover:opacity-90 transition"
            >
              Book a Session
            </a>
            <a
              href="/contact"
              className="px-6 py-3 border border-[#4282ea] text-[#4282ea] rounded-md font-semibold hover:bg-[#4282ea]/10 transition"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
