"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

export default function BookPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_PUBLIC_KEY")
      .then(() => {
        alert("Message sent!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => alert("Failed to send. Try again."));
  };

  return (
    <main className="min-h-screen bg-[#0b1120] px-4 py-20">
      {/* Header */}
      <motion.div
        className="max-w-5xl mx-auto text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">Book a Session</h1>
        <p className="text-gray-600">
          Choose a time that works for you or use the form below to send us a message.
        </p>
      </motion.div>

      {/* Calendly Embed */}
      <motion.div
        className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-xl bg-white p-4"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <iframe
          src="https://calendly.com/hello-bricores/30min?text_color=6883ab"
          className="w-full h-[620px] border-0 rounded-lg"
          allowFullScreen
        />
      </motion.div>

      {/* Toggle fallback form */}
      <div className="text-center mt-6">
        <button
          className="text-sm text-primary underline hover:opacity-80"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Contact Form" : "Can’t find a time? Contact us"}
        </button>
      </div>

      {/* Contact Form */}
      {showForm && (
        <motion.form
          onSubmit={sendEmail}
          className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:opacity-90 transition"
          >
            Send Message
          </button>
        </motion.form>
      )}
    </main>
  );
}
