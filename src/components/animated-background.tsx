"use client";

import { motion, useReducedMotion } from "framer-motion";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  top: (i * 37) % 100,
  left: (i * 53) % 100,
  size: 2 + (i % 3),
  duration: 8 + (i % 6),
  delay: (i % 5) * 0.6,
}));

export function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />

      <motion.div
        aria-hidden
        className="absolute -top-16 left-1/4 h-[220px] w-[220px] rounded-full bg-primary/30 blur-[60px] md:-top-32 md:h-[420px] md:w-[420px] md:blur-[120px]"
        animate={
          shouldReduceMotion ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-10 right-0 hidden h-[360px] w-[360px] rounded-full bg-secondary/25 blur-[120px] sm:block"
        animate={
          shouldReduceMotion ? undefined : { x: [0, -30, 0], y: [0, 40, 0] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 hidden md:block">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute animate-float rounded-full bg-primary/40"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}