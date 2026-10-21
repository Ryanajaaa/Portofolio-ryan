"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import "./theme-transition.css";

type ViewTransitionLike = {
  ready: Promise<void>;
  finished: Promise<void>;
};
type DocumentWithTransitions = Document & {
  startViewTransition?: (update: () => void) => ViewTransitionLike;
};

const DURATION_MS = 600;
const SWITCHING_CLASS = "theme-switching";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const latestTransition = useRef<ViewTransitionLike | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- required mount check to avoid next-themes hydration mismatch
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const doc = document as DocumentWithTransitions;
    const button = buttonRef.current;
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Browser belum mendukung / Reduce Motion aktif: ganti tema seperti biasa.
    if (!doc.startViewTransition || !button || prefersReducedMotion) {
      setTheme(next);
      return;
    }

    // Titik asal lingkaran = tengah tombol; radius = jarak ke sudut terjauh.
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const root = document.documentElement;

    const transition = doc.startViewTransition(() => {
      root.classList.add(SWITCHING_CLASS);
      // flushSync: pastikan class <html> sudah berganti saat callback selesai,
      // karena browser memotret tampilan baru tepat setelah callback ini.
      flushSync(() => setTheme(next));
    });
    latestTransition.current = transition;

    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: DURATION_MS,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        /* transisi dilewati (mis. tab tersembunyi): tema tetap berganti */
      });

    transition.finished
      .catch(() => {})
      .finally(() => {
        // Hanya transisi terakhir yang boleh melepas class (klik beruntun).
        if (latestTransition.current === transition) {
          root.classList.remove(SWITCHING_CLASS);
          latestTransition.current = null;
        }
      });
  }, [resolvedTheme, setTheme]);

  if (!mounted) {
    return <div className="h-10 w-10 rounded-full" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}