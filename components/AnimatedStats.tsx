"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function AnimatedStats() {
  const [years, setYears] = useState(0);
  const [cases, setCases] = useState(0);
  const [attorneys, setAttorneys] = useState(0);

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
    animateCount(setYears, 25);
    animateCount(setCases, 1200);
    animateCount(setAttorneys, 15);
  }, []);

  return (
    <section className="py-20 bg-[#1C2230] text-center border-y border-[#D4AF37]/20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="text-[#D4AF37] text-4xl font-bold mb-2">{years}+</span>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Years of Experience</span>
          </div>
          <div className="flex flex-col items-center border-x border-gray-700">
            <span className="text-[#D4AF37] text-4xl font-bold mb-2">{cases}+</span>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Cases Resolved</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#D4AF37] text-4xl font-bold mb-2">{attorneys}</span>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Expert Attorneys</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
