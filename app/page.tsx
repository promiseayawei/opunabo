// app/page.tsx

"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Users2, SlidersHorizontal } from "lucide-react";

const carouselImages = [
  { src: "/carousel1.jpg", caption: "Personalized Wealth Management" },
  { src: "/carousel2.jpg", caption: "Strategic Financial Planning" },
  { src: "/carousel3.jpg", caption: "Tailored Investment Solutions" },
  { src: "/carousel4.jpg", caption: "Long-Term Capital Growth" },
];

export default function Home() {
  const [clients, setClients] = useState(0);
  const [consultations, setConsultations] = useState(0);
  const [projects, setProjects] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const animateCount = (setter: React.Dispatch<React.SetStateAction<number>>, end: number) => {
      let count = 0;
      const step = Math.ceil(end / 40);
      const interval = setInterval(() => {
        count += step;
        if (count >= end) {
          setter(end);
          clearInterval(interval);
        } else {
          setter(count);
        }
      }, 50);
    };

    animateCount(setClients, 150);
    animateCount(setConsultations, 300);
    animateCount(setProjects, 120);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const delta = touchStartX.current - touchEndX.current;
    if (delta > 50) {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    } else if (delta < -50) {
      setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    }
  };

  return (
    <main className="bg-[#0d1117] text-white">
      {/* Hero Section */}
      <section
        className="relative text-center py-32 px-6 overflow-hidden bg-[#0A0F1A] text-[#F1F1F1]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 w-full h-full z-0">
          {carouselImages.map((item, idx) => (
            <Image
              key={idx}
              src={item.src}
              alt={`Slide ${idx + 1}`}
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover absolute transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/70 z-10" />
        </div>

        <motion.div
          className="relative z-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#F1F1F1]">
            Chicago Capital Management Group
          </h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-[#F1F1F1]/80">
            Dedicated to delivering long-term financial security through trusted investment strategies and personal advisory.
          </p>
          <a
            href="/contact"
            className="bg-[#D4AF37] text-[#0A0F1A] px-6 py-3 rounded-full font-medium hover:bg-[#E5C97B] transition duration-300"
          >
            Book a Consultation
          </a>
          <div className="mt-4 text-sm text-[#F1F1F1]/70 italic">
            {carouselImages[currentSlide].caption}
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#1C2230] text-center text-[#F1F1F1]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-[#D4AF37]">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="text-3xl font-bold">
              <h2 className="text-sm font-medium text-[#F1F1F1]/70 uppercase mb-1">Clients</h2>
              {clients}+
            </div>
            <div className="text-3xl font-bold">
              <h2 className="text-sm font-medium text-[#F1F1F1]/70 uppercase mb-1">Consultations</h2>
              {consultations}+
            </div>
            <div className="text-3xl font-bold">
              <h2 className="text-sm font-medium text-[#F1F1F1]/70 uppercase mb-1">Portfolios Managed</h2>
              {projects}+
            </div>
          </div>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-[#0A0F1A] text-center text-[#F1F1F1]">
        <motion.div
          className="max-w-6xl mx-auto px-6"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-[#D4AF37]">Why Clients Trust CCMG</h2>
          <p className="max-w-xl mx-auto text-[#F1F1F1]/80 mb-12">
            We bring clarity to complexity — empowering individuals and institutions to make smart financial decisions.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "Expertise",
                desc: "Decades of experience in financial advisory and asset management.",
              },
              {
                title: "Transparency",
                desc: "We operate with full disclosure and integrity at all times.",
              },
              {
                title: "Performance",
                desc: "Driven by results, focused on long-term client goals.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-[#1C2230] p-6 rounded-lg hover:shadow-xl transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-[#F1F1F1]">{item.title}</h3>
                <p className="text-[#F1F1F1]/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <section className="py-20 bg-[#0A0F1A] text-[#F1F1F1]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/consulting.jpg"
              alt="Financial Advisory"
              width={600}
              height={400}
              className="rounded-lg shadow-xl object-cover w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#D4AF37]">Holistic Financial Advisory</h2>
            <p className="text-[#F1F1F1]/80 mb-4">
              We guide clients with tailored wealth strategies, risk management, and investment planning.
            </p>
            <ul className="list-disc list-inside text-[#F1F1F1]/70 space-y-1">
              <li>Investment Portfolio Design</li>
              <li>Retirement & Estate Planning</li>
              <li>Risk Assessment</li>
              <li>Corporate Advisory</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 bg-[#0A0F1A] text-center">
        <motion.div
          className="max-w-6xl mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-[#D4AF37]">What Makes Us Different</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-[#1C2230] shadow hover:shadow-lg transition">
              <ShieldCheck className="mx-auto mb-4 text-[#D4AF37]" size={32} />
              <h3 className="font-semibold text-xl mb-2 text-[#F1F1F1]">Fiduciary Duty</h3>
              <p className="text-[#F1F1F1]/70">Your interests always come first in every decision we make.</p>
            </div>
            <div className="p-6 rounded-xl bg-[#1C2230] shadow hover:shadow-lg transition">
              <Users2 className="mx-auto mb-4 text-[#D4AF37]" size={32} />
              <h3 className="font-semibold text-xl mb-2 text-[#F1F1F1]">Client-Centric</h3>
              <p className="text-[#F1F1F1]/70">We listen, adapt, and personalize every plan to your needs.</p>
            </div>
            <div className="p-6 rounded-xl bg-[#1C2230] shadow hover:shadow-lg transition">
              <SlidersHorizontal className="mx-auto mb-4 text-[#D4AF37]" size={32} />
              <h3 className="font-semibold text-xl mb-2 text-[#F1F1F1]">Flexible Options</h3>
              <p className="text-[#F1F1F1]/70">Solutions that evolve with your financial journey.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* testimonial */}
      <section className="bg-[#0A0F1A] text-[#F1F1F1] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#D4AF37]">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sophia Ade",
                image: "/image1.jpg",
                comment:
                  "Chicago Capital helped transform our portfolio with unmatched insight and integrity.",
              },
              {
                name: "James Okonkwo",
                image: "/image2.jpg",
                comment:
                  "Professional, reliable, and deeply committed to delivering results.",
              },
              {
                name: "Levy George",
                image: "/image3.jpg",
                comment:
                  "We felt supported and informed throughout our investment journey.",
              },
            ].map(({ name, image, comment }, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-[#1C2230] p-6 rounded-2xl shadow-lg transition"
              >
                <Image
                  src={image}
                  alt={name}
                  width={80}
                  height={80}
                  className="mx-auto rounded-full mb-4"
                />
             <p className="italic">&quot;{comment}&quot;</p>
                <h4 className="mt-4 font-semibold text-[#D4AF37]">{name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* team */}

      <section className="bg-[#0A0F1A] text-[#F1F1F1] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#D4AF37]">Meet Our Leadership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Brian Smith",
                position: "Managing Partner",
                image: "/team1.jpg",
              },
              {
                name: "Hariet Conde",
                position: "Investment Strategist",
                image: "/team4.jpg",
              },
              {
                name: "Professor Prosper Ayawei",
                position: "African Director",
                image: "/team3.png",
              },
            ].map(({ name, position, image }, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-[#1C2230] p-6 rounded-2xl shadow-lg transition"
              >
                <Image
                  src={image}
                  alt={name}
                  width={100}
                  height={100}
                  className="mx-auto rounded-full mb-4"
                />
                <h4 className="font-bold text-lg text-[#D4AF37]">{name}</h4>
                <p className="text-sm text-gray-400">{position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




      {/*news letter*/}
      <section className="bg-[#0A0F1A] text-[#F1F1F1] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#D4AF37]">Stay Updated</h2>
          <p className="mb-6 text-[#F1F1F1]">
            Subscribe to receive the latest investment insights and updates from Chicago Capital.
          </p>
          <form className="flex flex-col md:flex-row justify-center gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-full border border-[#D4AF37] bg-transparent text-white placeholder:text-[#F1F1F1] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#D4AF37] hover:bg-[#E5C97B] text-[#0A0F1A] font-semibold px-6 py-2 rounded-full transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>



      {/* ...keep Testimonials, Team, and Newsletter sections... update images and names if necessary... */}

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/234905348075?text=Hello%20CCMG%2C%20I%27m%20interested%20in%20your%20financial%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.72 12.28..." />
          </svg>
        </div>
      </a>
    </main>
  );
}
