"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type AnimationPlaybackControls,
} from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";

const Lanyard = dynamic(
  () => import("@/components/lanyard").then((m) => m.Lanyard),
  { ssr: false }
);

const CARD_TAG = "BACKEND DEVELOPER";
const CARD_DESC =
  "I build scalable web applications, backend systems, and AI-powered solutions using modern technologies.";
const CARD_INITIALS = "RA";
const CARD_PHOTO = "/profile.jpeg";
const DESKTOP_BREAKPOINT = 768;

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

function useGreeting() {
  const { lang } = useLanguage();
  const [key, setKey] = useState<"morning" | "afternoon" | "evening" | "night" | null>(
    null
  );

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) setKey("morning");
    else if (hour >= 11 && hour < 15) setKey("afternoon");
    else if (hour >= 15 && hour < 18) setKey("evening");
    else setKey("night");
  }, []);

  if (!key) return null;
  const g = translations[lang].hero.greeting[key];
  return { emoji: g.emoji, text: g.text, suffix: translations[lang].hero.greeting.suffix };
}

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

const strapUnits = Array.from({ length: 6 }, (_, i) => i);

function IdCard2D({ canStart }: { canStart: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [strapHeight, setStrapHeight] = useState(100);
  const [settled, setSettled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cardRotate = useTransform(x, [-70, 70], [-14, 14]);
  const strapLength = useTransform([x, y], (latest) => {
    const [xv, yv] = latest as number[];
    const dy = strapHeight + yv;
    return Math.sqrt(xv * xv + dy * dy);
  });
  const strapAngle = useTransform([x, y], (latest) => {
    const [xv, yv] = latest as number[];
    const dy = strapHeight + yv;
    return (Math.atan2(xv, dy) * 180) / Math.PI;
  });

  const idleControls = useRef<AnimationPlaybackControls | null>(null);

  const measureStrap = useCallback(() => {
    if (cardRef.current) {
      setStrapHeight(Math.max(getAbsoluteTop(cardRef.current), 0));
    }
  }, []);

  useEffect(() => {
    measureStrap();
    window.addEventListener("resize", measureStrap);
    return () => window.removeEventListener("resize", measureStrap);
  }, [measureStrap]);

  const startIdleSway = useCallback(() => {
    idleControls.current = animate(x, [-8, 8, -8], {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    });
  }, [x]);

  useEffect(() => {
    if (settled && !isDragging) startIdleSway();
    return () => idleControls.current?.stop();
  }, [settled, isDragging, startIdleSway]);

  function handlePanStart() {
    idleControls.current?.stop();
    setIsDragging(true);
  }
  function handlePan(_: unknown, info: PanInfo) {
    x.set(Math.max(-70, Math.min(70, info.offset.x * 0.6)));
    y.set(Math.max(-10, Math.min(40, info.offset.y * 0.3)));
  }
  function handlePanEnd(_: unknown, info: PanInfo) {
    setIsDragging(false);
    const vx = Math.max(-40, Math.min(40, info.velocity.x * 0.03));
    animate(x, [x.get() + vx, 0], {
      type: "spring",
      stiffness: 130,
      damping: 7,
      onComplete: startIdleSway,
    });
    animate(y, 0, { type: "spring", stiffness: 200, damping: 14 });
  }

  return (
    <div className="relative mx-auto w-full max-w-[210px] pt-4 sm:max-w-[250px] md:max-w-[270px]">
      <motion.div
        initial={{ opacity: 0, y: -320 }}
        animate={canStart ? { opacity: 1, y: 0 } : { opacity: 0, y: -320 }}
        transition={{
          y: { type: "spring", mass: 1.2, stiffness: 170, damping: 11 },
          opacity: { duration: 0.2 },
        }}
        onAnimationComplete={() => setSettled(true)}
        className="relative"
      >
        <motion.div
          className="absolute left-1/2 w-7 origin-top -translate-x-1/2 overflow-hidden rounded-sm bg-black sm:w-8"
          style={{ top: -strapHeight, height: strapLength, rotate: strapAngle }}
        >
          <div className="flex flex-col items-center gap-6 py-2 text-white">
            {strapUnits.map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white text-[8px] font-bold sm:h-5 sm:w-5 sm:text-[9px]">
                  {CARD_INITIALS.charAt(0)}
                </span>
                <span
                  className="whitespace-nowrap text-[9px] font-semibold tracking-widest sm:text-[10px]"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {siteConfig.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={cardRef}
          style={{ x, y, rotate: cardRotate, touchAction: "none" }}
          animate={
            !settled ? { scaleX: [1, 1.08, 1], scaleY: [1, 0.92, 1] } : undefined
          }
          transition={{ duration: 0.35, times: [0, 0.4, 1], ease: "easeOut" }}
          onPanStart={settled ? handlePanStart : undefined}
          onPan={settled ? handlePan : undefined}
          onPanEnd={settled ? handlePanEnd : undefined}
          className={`relative select-none ${
            settled ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""
          }`}
        >
          <div className="absolute left-1/2 -top-2.5 z-10 h-4 w-3 -translate-x-1/2 rounded-full bg-black sm:-top-3 sm:h-5 sm:w-3.5" />

          <motion.div
            whileTap={settled ? { scale: 0.96 } : undefined}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-400 via-indigo-300/70 to-slate-600 p-[5px] shadow-2xl sm:p-[6px]"
          >
            <div className="relative flex aspect-[59/86] flex-col gap-1 overflow-hidden rounded-md bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 p-1.5 sm:gap-1.5 sm:p-2">
              <div className="flex items-center justify-between border border-amber-800/70 bg-amber-100/90 px-1.5 py-0.5 sm:px-2 sm:py-1">
                <span className="truncate font-serif text-[8px] font-bold uppercase tracking-wide text-zinc-900 sm:text-[11px]">
                  {siteConfig.name}
                </span>
                <span className="ml-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-amber-900 bg-amber-50 font-serif text-[7px] font-bold text-zinc-900 sm:h-5 sm:w-5 sm:text-[8px]">
                  {CARD_INITIALS}
                </span>
              </div>

              <div className="flex justify-end gap-[2px] sm:gap-0.5">
                {Array.from({ length: 8 }, (_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full border border-red-900/60 bg-gradient-to-br from-orange-300 to-red-600 sm:h-2 sm:w-2"
                  />
                ))}
              </div>

              <div className="relative aspect-square w-full border-2 border-zinc-500 bg-black">
                <Image
                  src={CARD_PHOTO}
                  alt={siteConfig.name}
                  fill
                  sizes="(max-width: 640px) 200px, 260px"
                  className="pointer-events-none object-cover object-top"
                  priority
                />
              </div>

              <div className="flex flex-1 flex-col justify-between border border-amber-800/70 bg-amber-50/90 px-1.5 py-1 sm:px-2">
                <div>
                  <p className="font-serif text-[7px] font-semibold text-zinc-900 sm:text-[9px]">
                    [{CARD_TAG}]
                  </p>
                  <p className="line-clamp-4 text-[6px] leading-tight text-zinc-700 sm:text-[8px]">
                    {CARD_DESC}
                  </p>
                </div>
                <div className="flex justify-end gap-4 font-serif text-[7px] font-bold text-zinc-900 sm:text-[9px]">
                  <span>ATK/</span>
                  <span>DEF/</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isDesktop;
}

export function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const greeting = useGreeting();

  const stageRef = useRef<HTMLDivElement>(null);
  const [canStart, setCanStart] = useState(false);
  const [inView, setInView] = useState(true);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (isDesktop) void import("@/components/lanyard");
  }, [isDesktop]);

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
      <div
        ref={stageRef}
        aria-label="Interactive ID card. Drag to swing it."
        className="relative z-10 flex w-full items-start justify-center pb-4 pt-24 sm:pb-0 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-1/2 md:pt-0"
      >
        {isDesktop === false && <IdCard2D canStart={canStart} />}
        {isDesktop === true && canStart && (
          <div className="h-[550px] w-full md:h-[650px] lg:h-[700px]">
            <Lanyard
              active={inView}
              name={siteConfig.name}
              initials={CARD_INITIALS}
              tag={CARD_TAG}
              description={CARD_DESC}
              photoSrc={CARD_PHOTO}
            />
          </div>
        )}
      </div>

      <Container className="relative grid items-center md:min-h-screen md:grid-cols-2">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 pb-16 pt-[420px] sm:pt-[460px] md:py-24 md:pr-8 md:pt-24"
        >
          {greeting && (
            <motion.div variants={item}>
              <p className="font-mono text-xs text-muted">
                {greeting.emoji} {greeting.text}, {greeting.suffix}
              </p>
            </motion.div>
          )}

          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs text-muted">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {t.badge}
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
            {t.tagline}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
            <a href="#projects">
              <Button>
                {t.viewProjects}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href={siteConfig.resumeUrl} download>
              <Button variant="secondary">
                <Download className="h-4 w-4" />
                {t.downloadResume}
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}