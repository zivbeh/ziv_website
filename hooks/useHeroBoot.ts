"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  BOOT,
  BOOT_EXPAND_DONE_MS,
  clearIntroPendingHold,
  markSiteIntroSeen,
  shouldSkipSiteIntro,
} from "@/lib/site-intro";

/** plus (held ≥1s) → square → expand → done */
export type BootVisualPhase = "plus" | "square" | "expand" | "done";

export type BootChrome = {
  visual: BootVisualPhase;
  live: boolean;
  bypass: boolean;
  nameReady: boolean;
};

function motionPreference(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * Always runs the boot (≥1s on the +, then square, then expand).
 * Skip only for reduced-motion or ?skipIntro=1.
 */
export function useHeroBoot(): BootChrome {
  const reduceHook = useReducedMotion();
  const finished = useRef(false);

  const [visual, setVisual] = useState<BootVisualPhase>("plus");
  const [live, setLive] = useState(false);
  const [bypass, setBypass] = useState(false);
  const [nameReady, setNameReady] = useState(false);

  useEffect(() => {
    clearIntroPendingHold();

    const reduce =
      reduceHook === null ? motionPreference() : !!reduceHook;
    const skip = shouldSkipSiteIntro() || reduce;

    // Skip must win even across Strict Mode / reduceHook null→bool flips
    if (skip) {
      finished.current = true;
      setBypass(true);
      setLive(false);
      setVisual("done");
      setNameReady(true);
      document.body.style.overflow = "";
      return;
    }

    if (finished.current) return;

    let cancelled = false;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => {
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) fn();
        }, ms)
      );
    };

    document.body.style.overflow = "hidden";
    setBypass(false);
    setLive(true);
    setVisual("plus");
    setNameReady(false);

    at(BOOT.plusHold, () => setVisual("square"));
    at(BOOT.plusHold + BOOT.toSquare, () => setVisual("expand"));
    at(BOOT_EXPAND_DONE_MS, () => {
      setVisual("done");
      markSiteIntroSeen();
      document.body.style.overflow = "";
      finished.current = true;
      setNameReady(true);
    });

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      document.body.style.overflow = "";
    };
  }, [reduceHook]);

  return { visual, live, bypass, nameReady };
}
