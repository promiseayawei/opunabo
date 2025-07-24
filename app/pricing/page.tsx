"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const packages = [
  {
    name: "Essential VA",
    price: "$299/month",
    features: [
      "Admin & inbox support",
      "Calendar & scheduling",
      "Up to 20 hours/month",
      "Email & chat communication",
    ],
    popular: false,
  },
  {
    name: "Pro Support",
    price: "$599/month",
    features: [
      "Everything in Essential",
      "Client & CRM management",
      "Up to 50 hours/month",
      "Weekly reporting",
    ],
    popular: true,
  },
  {
    name: "Growth Partner",
    price: "Custom",
    features: [
      "Full-time virtual ops team",
      "Custom hours & services",
      "Dedicated account manager",
      "Process automation support",
    ],
    popular: false,
  },
];

const addons = [
  "Social Media Assistance",
  "E-commerce Store Support",
  "Invoice & Bookkeeping",
  "Data Entry & Reporting",
];

export default function PricingPage() {
  return (
    <main className="bg-[#0b1120] text-white min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#2559ac] mb-4">
            Simple Pricing for Serious Growth
          </h1>
          <p className="text-gray-300 text-lg">
            Transparent monthly packages designed to grow with you.
          </p>
        </motion.div>

        {/* Packages */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative rounded-xl border p-8 shadow-lg transition hover:scale-[1.02] ${
                pkg.popular
                  ? "bg-[#1c2333] border-[#2559ac]"
                  : "bg-[#151c2f] border-[#2a334d]"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 right-3 bg-[#2559ac] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-semibold text-[#2559ac] mb-2">{pkg.name}</h3>
              <p className="text-3xl font-bold mb-4 text-white">{pkg.price}</p>
              <ul className="space-y-3">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <CheckCircle color="#2559ac" size={18} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-[#2559ac] text-white py-2 rounded-md font-semibold hover:opacity-90 transition">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-[#2559ac] mb-4">Need More?</h2>
          <p className="text-gray-400 mb-6">
            Add-ons available to tailor your support even further.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {addons.map((addon, idx) => (
              <div
                key={idx}
                className="bg-[#1c2333] border border-[#2a334d] px-4 py-2 rounded-lg text-gray-300"
              >
                {addon}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h3 className="text-xl font-semibold text-[#2559ac]">
            Not sure which plan is right?
          </h3>
          <p className="text-gray-300">
            Book a free strategy call to explore what’s best for your business.
          </p>
          <a
            href="/book"
            className="inline-block bg-[#2559ac] text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
          >
            Book a Free Call
          </a>
        </motion.div>
      </div>
    </main>
  );
}
