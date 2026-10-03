"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";

const SIZE = 96;
const STROKE = 4;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      setPercent((p) => {
        if (p >= 90) return p;
        const elapsed = Date.now() - startTime;
        const next = Math.min(90, Math.floor((elapsed / 1200) * 90));
        return next > p ? next : p;
      });
    }, 60);

    const minTime = new Promise((resolve) => setTimeout(resolve, 1200));
    const pageReady = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve(true);
      } else {
        window.addEventListener("load", () => resolve(true), { once: true });
      }
    });
    const hardCap = new Promise((resolve) => setTimeout(resolve, 3000));

    Promise.race([Promise.all([minTime, pageReady]), hardCap]).then(() => {
      clearInterval(progressInterval);
      setPercent(100);
      setTimeout(() => {
        setLoading(false);
        window.dispatchEvent(new Event("loader-complete"));
      }, 400);
    });

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-5"
          >
            <div className="relative h-24 w-24">
              <svg
                width={SIZE}
                height={SIZE}
                className="absolute inset-0 -rotate-90"
              >
                <circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  stroke="var(--border)"
                  strokeWidth={STROKE}
                  fill="none"
                />
                <circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  stroke="url(#loaderGradient)"
                  strokeWidth={STROKE}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={offset}
                  style={{ transition: "stroke-dashoffset 0.2s ease-out" }}
                />
                <defs>
                  <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--secondary)" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-2 overflow-hidden rounded-full border border-border">
                <Image
                  src="/profile.png"
                  alt={siteConfig.name}
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            <p className="font-mono text-lg font-semibold tabular-nums text-foreground">
              {percent}%
            </p>

            <div className="h-2 w-40 overflow-hidden rounded-full bg-surface">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>

            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
              Loading portfolio
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}