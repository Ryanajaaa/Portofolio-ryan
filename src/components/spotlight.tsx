"use client";

import { useRef } from "react";

export function Spotlight({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
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
