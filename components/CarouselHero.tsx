"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

const carouselImages = [
  { src: "/law-library.jpeg", caption: "Deep-rooted Legal Expertise" },
  { src: "/Supreme-Court.jpg", caption: "Resolute Litigation & Advocacy" },
  { src: "/law-deal.jpeg", caption: "Strategic Corporate Advisory" },
  { src: "/consultation.jpeg", caption: "Client-Focused Legal Solutions" },
];

export default function CarouselHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
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
            className={`object-cover absolute transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? "opacity-40 z-10" : "opacity-0 z-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      <motion.div
        className="relative z-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-[#F1F1F1] tracking-tight">
          Opunabo Ekine & Associates
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-[#F1F1F1]/90 leading-relaxed font-light">
          Providing sophisticated legal counsel and aggressive advocacy. 
          Integrity in practice, excellence in results.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/contact"
            className="bg-[#D4AF37] text-[#0A0F1A] px-8 py-4 rounded-md font-bold uppercase tracking-widest hover:bg-[#E5C97B] transition duration-300"
          >
            Request a Legal Consultation
          </a>
        </div>
        <div className="mt-8 text-sm text-[#D4AF37] font-medium tracking-widest uppercase">
          — {carouselImages[currentSlide].caption} —
        </div>
      </motion.div>
    </section>
  );
}
