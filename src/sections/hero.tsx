"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data";

const Lanyard = dynamic(
  () => import("@/components/lanyard").then((m) => m.Lanyard),
  { ssr: false }
);

/* ====== Teks di ID card (silakan ubah sesuai keinginan) ====== */
const CARD_TAG = "BACKEND DEVELOPER";
const CARD_DESC =
  "I build scalable web applications, backend systems, and AI-powered solutions using modern technologies.";
const CARD_INITIALS = "RA";
const CARD_PHOTO = "/profile.jpeg";
/* ============================================================== */

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function RoleCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % siteConfig.roles.length),
      2600
    );
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block h-[1.4em] min-w-[13ch] overflow-hidden align-bottom">
      {siteConfig.roles.map((role, i) => (
        <motion.span
          key={role}
          className="absolute inset-0 text-gradient"
          initial={false}
          animate={{
            y: i === index ? 0 : i < index ? "-100%" : "100%",
            opacity: i === index ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {role}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [canStart, setCanStart] = useState(false);
  const [inView, setInView] = useState(true);

  // Muat library 3D lebih awal (selama layar loading masih tampil)
  useEffect(() => {
    void import("@/components/lanyard");
  }, []);

  // Card mulai jatuh setelah loading selesai
  useEffect(() => {
    function handleLoaderComplete() {
      setCanStart(true);
    }
    window.addEventListener("loader-complete", handleLoaderComplete);
    const fallback = setTimeout(() => setCanStart(true), 4000);

    return () => {
      window.removeEventListener("loader-complete", handleLoaderComplete);
      clearTimeout(fallback);
    };
  }, []);

  // Hentikan render 3D saat Hero tidak terlihat (hemat baterai/GPU)
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* ID card 3D: kolom kanan penuh di desktop, blok di atas pada HP */}
      <div
        ref={stageRef}
        aria-label="Interactive ID card. Drag to swing it."
        className="relative z-10 h-[460px] w-full md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-1/2"
      >
        {canStart && (
          <Lanyard
            active={inView}
            name={siteConfig.name}
            initials={CARD_INITIALS}
            tag={CARD_TAG}
            description={CARD_DESC}
            photoSrc={CARD_PHOTO}
          />
        )}
      </div>

      <Container className="relative grid items-center md:min-h-screen md:grid-cols-2">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 pb-16 pt-4 md:py-24 md:pr-8"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs text-muted">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Available for new opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl"
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="font-heading text-lg font-medium text-muted sm:text-2xl"
          >
            <RoleCycler />
          </motion.p>

          <motion.p
            variants={item}
            className="max-w-lg text-balance text-sm leading-relaxed text-muted sm:text-base"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
            <a href="#projects">
              <Button>
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href={siteConfig.resumeUrl} download>
              <Button variant="secondary">
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}