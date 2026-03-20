"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export type Particle = { id: number; x: number; y: number; size: number; dur: number; delay: number };

export default function Particles({ count = 12 }: { count?: number }) {
  const [ps, setPs] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPs(Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      dur: Math.random() * 10 + 8,
      delay: Math.random() * -18,
    })));
  }, [count]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {ps.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full bg-[#FFD700]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.25 }}
          animate={{ y: [0, -45, 0], opacity: [0.05, 0.4, 0.05] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}