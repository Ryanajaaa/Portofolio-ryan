"use client";

import { useEffect, useRef } from "react";

export function Spotlight({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
    }
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={
        {
          "--x": "50%",
          "--y": "30%",
          background:
            "radial-gradient(600px circle at var(--x) var(--y), rgba(124,58,237,0.16), transparent 70%)",
        } as React.CSSProperties
      }
    />
  );
}