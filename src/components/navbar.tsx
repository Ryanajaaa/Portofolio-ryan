"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const sectionOrder = [
  "home",
  "about",
  "projects",
  "experience",
  "certificates",
  "contact",
] as const;

export function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang].nav;
  const navLinks = sectionOrder.map((key) => ({
    href: `#${key}`,
    label: t[key],
  }));

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionOrder
      .map((key) => document.getElementById(key))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-5"
    >
      <div
        className={cn(
          "flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled
            ? "border-border bg-background/75 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-border/60 bg-background/40 backdrop-blur-lg"
        )}
      >
        <Link
          href="#home"
          className="shrink-0 font-heading text-base font-semibold tracking-tight"
        >
          <span className="text-gradient">RA</span>
          <span className="text-foreground">.dev</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-pill"
                    className="absolute inset-0 rounded-full bg-surface"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <button
            onClick={toggleLang}
            aria-label={translations[lang].langToggle.label}
            title={translations[lang].langToggle.label}
            className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1.5 font-mono text-[11px] font-medium text-muted transition-colors hover:text-foreground"
          >
            <Languages className="h-3.5 w-3.5" />
            {lang.toUpperCase()}
          </button>
          <ThemeToggle />
          <a href={siteConfig.resumeUrl} download>
            <Button size="sm">Resume</Button>
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 md:hidden">
          <button
            onClick={toggleLang}
            aria-label={translations[lang].langToggle.label}
            className="flex h-9 items-center gap-1 rounded-full border border-border px-2 font-mono text-[11px] font-medium text-muted"
          >
            {lang.toUpperCase()}
          </button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-4 right-4 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border border-border bg-background/95 shadow-xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm transition-colors",
                    activeHref === link.href
                      ? "bg-surface text-foreground font-medium"
                      : "text-muted hover:bg-surface hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a href={siteConfig.resumeUrl} download className="mt-1">
                <Button size="sm" className="w-full">
                  Resume
                </Button>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}