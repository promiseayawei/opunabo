"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/* ── types ──────────────────────────────────────────────────── */
type Particle = { id: number; x: number; y: number; size: number; dur: number; delay: number };

/* ── attorneys data ─────────────────────────────────────────── */
// attorneys data moved to attorneyData.tsx

/* ── Particles — hydration-safe, reusable ───────────────────── */
export function Particles({ count = 16 }: { count?: number }) {
  const [ps, setPs] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPs(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        dur: Math.random() * 12 + 8,
        delay: Math.random() * -20,
      }))
    );
    setMounted(true);
  }, [count]);

  // Render nothing on server / before first client paint to prevent
  // hydration mismatches caused by Math.random() differing SSR vs client.
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {ps.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#FFD700]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.3 }}
          animate={{ y: [0, -50, 0], opacity: [0.1, 0.45, 0.1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}