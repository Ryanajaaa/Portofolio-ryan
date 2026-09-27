"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/spotlight";
import { AnimatedBackground } from "@/components/animated-background";
import { siteConfig } from "@/lib/data";

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
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <AnimatedBackground />
      <Spotlight className="absolute inset-0" />

      <Container className="relative grid items-center gap-16 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs text-muted">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Available for new opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="font-heading text-xl font-medium text-muted sm:text-2xl"
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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative mx-auto hidden aspect-square w-full max-w-sm md:block"
        >
          <div className="absolute inset-0 animate-float-slow rounded-[2.5rem] border border-border bg-card/60 backdrop-blur-sm" />
          <div className="absolute inset-6 overflow-hidden rounded-[2rem] border border-border">
            <Image
              src="/profile.jpeg"
              alt={siteConfig.name}
              fill
              sizes="384px"
              className="object-cover"
              priority
            />
          </div>
          <motion.div
            className="absolute -right-4 top-8 rounded-2xl border border-border bg-card px-4 py-3 font-mono text-xs shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-accent">●</span> Ryan Andiya 
          </motion.div>
          <motion.div
            className="absolute -left-6 bottom-10 rounded-2xl border border-border bg-card px-4 py-3 font-mono text-xs shadow-lg"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            My Skill is never give up
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}