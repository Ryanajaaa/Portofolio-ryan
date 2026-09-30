"use client";

import { useEffect, useRef } from "react";

const AWAY_TITLE = "👋 Balik lagi yukkk!";

export function TabTitleSwap() {
  const originalTitle = useRef("");

  useEffect(() => {
    originalTitle.current = document.title;

    function handleVisibilityChange() {
      document.title = document.hidden ? AWAY_TITLE : originalTitle.current;
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle.current;
    };
  }, []);

  return null;
}