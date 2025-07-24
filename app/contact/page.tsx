"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1A] text-[#F1F1F1] py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold text-[#D4AF37] mb-4">Contact Us</h1>
        <p className="text-[#F1F1F1] mb-12">
          Whether you're a partner, investor, or community member — we're ready to connect.
        </p>
      </motion.div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Address */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#1C2230] rounded-2xl p-6 shadow-lg transition-all"
        >
          <MapPin className="text-[#D4AF37] w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Headquarters</h3>
          <p className="text-[#F1F1F1]">
            47 W Polk St, Suite 100-207<br />
            Chicago, IL 60605, USA
          </p>
        </motion.div>

        {/* Email */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#1C2230] rounded-2xl p-6 shadow-lg transition-all"
        >
          <Mail className="text-[#D4AF37] w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p className="text-[#F1F1F1]">contact@ccmgllc.com</p>
        </motion.div>

        {/* Phone */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#1C2230] rounded-2xl p-6 shadow-lg transition-all"
        >
          <Phone className="text-[#D4AF37] w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Phone</h3>
          <p className="text-[#F1F1F1]">+1 (312) 555-0198</p>
        </motion.div>
      </section>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-16 max-w-3xl mx-auto"
      >
        <form className="bg-[#1C2230] rounded-2xl p-8 shadow-lg space-y-6">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-[#0A0F1A] text-[#F1F1F1] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-[#0A0F1A] text-[#F1F1F1] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              className="w-full px-4 py-2 rounded-lg bg-[#0A0F1A] text-[#F1F1F1] focus:outline-none"
              rows={5}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#D4AF37] hover:bg-[#E5C97B] text-[#0A0F1A] font-semibold py-2 px-6 rounded-lg transition-all"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </main>
  );
}
