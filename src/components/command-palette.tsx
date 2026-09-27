"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  User,
  FolderGit2,
  Briefcase,
  Award,
  Mail,
  Github,
  Linkedin,
  Download,
  Search,
  CornerDownLeft,
  Command as CommandIcon,
} from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";

type PaletteCommand = {
  id: string;
  label: string;
  group: "Navigate" | "Connect";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
};

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "#home": Home,
  "#about": User,
  "#projects": FolderGit2,
  "#experience": Briefcase,
  "#certificates": Award,
  "#contact": Mail,
};

function triggerDownload(url: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = "";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  const commands: PaletteCommand[] = useMemo(() => {
    const navCommands: PaletteCommand[] = navLinks.map((link) => ({
      id: link.href,
      label: link.label,
      group: "Navigate",
      icon: sectionIcons[link.href] ?? Home,
      action: () => {
        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
      },
    }));

    const connectCommands: PaletteCommand[] = [
      {
        id: "github",
        label: "Open GitHub",
        group: "Connect",
        icon: Github,
        action: () => window.open(siteConfig.github, "_blank"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        group: "Connect",
        icon: Linkedin,
        action: () => window.open(siteConfig.linkedin, "_blank"),
      },
      {
        id: "email",
        label: `Email — ${siteConfig.email}`,
        group: "Connect",
        icon: Mail,
        action: () => {
          window.location.href = `mailto:${siteConfig.email}`;
        },
      },
      {
        id: "resume",
        label: "Download Resume",
        group: "Connect",
        icon: Download,
        action: () => triggerDownload(siteConfig.resumeUrl),
      },
    ];

    return [...navCommands, ...connectCommands];
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  const closePalette = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const runCommand = (cmd: PaletteCommand) => {
    cmd.action();
    closePalette();
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isToggle = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isToggle) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;

      if (e.key === "Escape") {
        closePalette();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[activeIndex];
        if (cmd) runCommand(cmd);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filtered, activeIndex]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2.5 font-mono text-xs text-muted shadow-lg backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground sm:flex"
      >
        <CommandIcon className="h-3.5 w-3.5" />
        {isMac ? "⌘K" : "Ctrl K"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-background/80 backdrop-blur-sm px-4 pt-24 sm:pt-32"
            onClick={closePalette}
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Search className="h-4 w-4 shrink-0 text-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sections or links..."
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
                />
                <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
                  Esc
                </kbd>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <p className="px-3 py-6 text-center text-sm text-muted">
                    No results found.
                  </p>
                ) : (
                  filtered.map((cmd, index) => {
                    const Icon = cmd.icon;
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => runCommand(cmd)}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                          isActive
                            ? "bg-primary/10 text-foreground"
                            : "text-muted hover:bg-surface"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1 truncate">{cmd.label}</span>
                        {isActive && (
                          <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-primary" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
