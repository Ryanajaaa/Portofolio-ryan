"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";


export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.10,
      allowNestedScroll: true,
    });

    function onClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const anchor = (e.target as Element | null)?.closest?.("a");
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      const samePage =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname;
      if (!samePage || url.hash.length < 2) return;

      let target: Element | null = null;
      try {
        target = document.querySelector(decodeURIComponent(url.hash));
      } catch {
        return; 
      }
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      lenis.scrollTo(target as HTMLElement, { duration: 1.2 });
    }
    document.addEventListener("click", onClick, true);

    function syncLock() {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    }
    syncLock();
    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      document.removeEventListener("click", onClick, true);
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
}
