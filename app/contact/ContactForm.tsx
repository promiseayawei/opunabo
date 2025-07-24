"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-[#0b1120] text-white min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#4282ea] mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have a question, project, or just want to connect? We’d love to hear from you. Reach out using the form below or via any of our channels.
          </p>
        </motion.div>

        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 text-gray-300"
        >
          <div className="flex items-start space-x-3">
            <Mail className="text-[#4282ea]" />
            <div>
              <p className="text-sm">Email</p>
              <p className="font-medium">hello@bricore.com</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Phone className="text-[#4282ea]" />
            <div>
              <p className="text-sm">Phone</p>
              <p className="font-medium">+234 9055 348 075</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="text-[#4282ea]" />
            <div>
              <p className="text-sm">Location</p>
              <p className="font-medium">Abuja, Nigeria</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-[#1c2333] p-8 rounded-xl space-y-6 shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Your Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-[#0f172a] text-white border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4282ea]"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email Address</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-[#0f172a] text-white border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4282ea]"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Message</label>
            <textarea
              rows={5}
              className="w-full p-3 rounded-lg bg-[#0f172a] text-white border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4282ea]"
              placeholder="How can we support your business?"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#4282ea] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3269cc] transition-all"
          >
            <Send size={18} />
            Send Message
          </button>
        </motion.form>
      </div>
    </main>
  );
}
