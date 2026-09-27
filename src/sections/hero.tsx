"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
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

function getAbsoluteTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [strapHeight, setStrapHeight] = useState(100);
  const [canFall, setCanFall] = useState(false);
  const [settled, setSettled] = useState(false);

  const measureStrap = useCallback(() => {
    if (cardRef.current) {
      setStrapHeight(Math.max(getAbsoluteTop(cardRef.current), 0));
    }
  }, []);

  useEffect(() => {
    measureStrap();
  }, [measureStrap]);

  useEffect(() => {
    function handleLoaderComplete() {
      setCanFall(true);
    }
    window.addEventListener("loader-complete", handleLoaderComplete);
    const fallback = setTimeout(() => setCanFall(true), 4000);

    return () => {
      window.removeEventListener("loader-complete", handleLoaderComplete);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", measureStrap);
    window.addEventListener("load", measureStrap);

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measureStrap);
      ro.observe(document.body);
    }

    return () => {
      window.removeEventListener("resize", measureStrap);
      window.removeEventListener("load", measureStrap);
      ro?.disconnect();
    };
  }, [measureStrap]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-24 sm:pb-0"
    >
      <Container className="relative grid items-center gap-12 sm:gap-16 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="order-2 flex flex-col gap-6 md:order-1"
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

        <div className="relative order-1 mx-auto w-full max-w-[200px] self-start sm:max-w-[240px] md:order-2 md:max-w-[260px]">
          <motion.div
            initial={{ opacity: 0, y: -320, rotate: -8 }}
            animate={
              canFall
                ? { opacity: 1, y: 0, rotate: 0 }
                : { opacity: 0, y: -320, rotate: -8 }
            }
            transition={{
              y: { type: "spring", mass: 1.2, stiffness: 170, damping: 11 },
              rotate: { type: "spring", mass: 1, stiffness: 120, damping: 9 },
              opacity: { duration: 0.2 },
            }}
            onAnimationComplete={() => setSettled(true)}
            className="relative"
          >
            <motion.div
              ref={cardRef}
              style={{ transformOrigin: "top center" }}
              animate={
                settled
                  ? { rotate: [-2.5, 2.5, -2.5], scaleX: 1, scaleY: 1 }
                  : { scaleX: [1, 1.08, 1], scaleY: [1, 0.92, 1] }
              }
              transition={
                settled
                  ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.35, times: [0, 0.4, 1], ease: "easeOut" }
              }
              className="relative"
            >
              <div
                className="absolute left-1/2 w-6 -translate-x-1/2 bg-gradient-to-b from-primary to-secondary sm:w-8"
                style={{ top: -strapHeight, height: strapHeight }}
              />
              <div className="absolute left-1/2 -top-1 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-border bg-background sm:h-4 sm:w-4" />

              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="flex items-center justify-between bg-primary/10 px-3 py-1.5 sm:px-4 sm:py-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-primary sm:text-[10px]">
                    Staff ID
                  </span>
                  <span className="font-heading text-[11px] font-bold text-gradient sm:text-xs">
                    RA.dev
                  </span>
                </div>

                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/profile.jpeg"
                    alt={siteConfig.name}
                    fill
                    sizes="(max-width: 640px) 200px, 260px"
                    className="object-cover object-top"
                    priority
                  />
                </div>

                <div className="flex flex-col items-center gap-1 border-t border-border px-3 py-3 text-center sm:px-4 sm:py-5">
                  <h3 className="font-heading text-sm font-semibold sm:text-base">
                    {siteConfig.name}
                  </h3>
                </div>
              </div>

              <motion.div
                className="absolute -left-4 bottom-12 hidden rounded-2xl border border-border bg-card px-3 py-2 font-mono text-[10px] shadow-lg sm:-left-8 sm:bottom-16 sm:block"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                My Skill is Never Give Up
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}