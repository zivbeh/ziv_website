"use client";

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { BOOT } from "@/lib/site-intro";
import type { BootVisualPhase } from "@/hooks/useHeroBoot";

type HeroBootRevealProps = {
  visual: BootVisualPhase;
  live: boolean;
  bypass: boolean;
  children: ReactNode;
};

/**
 * Spinning + (hold ≥1s) → edges unfold into hollow square → expand with field.
 * Children never remount.
 */
export function HeroBootReveal({
  visual,
  live,
  bypass,
  children,
}: HeroBootRevealProps) {
  const geoRef = useRef<HTMLDivElement>(null);
  const frozeSpin = useRef(false);

  // Freeze infinite spin at current angle, then ease to 0° while edges morph
  useLayoutEffect(() => {
    const el = geoRef.current;
    if (!el) return;

    if (visual === "plus") {
      frozeSpin.current = false;
      el.style.transition = "none";
      el.style.transform = "";
      return;
    }

    if (visual === "square" && !frozeSpin.current) {
      frozeSpin.current = true;
      const computed = getComputedStyle(el).transform;
      el.style.animation = "none";
      el.style.transform =
        !computed || computed === "none"
          ? "translate(-50%, -50%) rotate(0deg)"
          : computed;
      // Next frame: ease back to upright while hollow-square morph runs
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = `transform ${BOOT.toSquare}ms var(--ease-out)`;
          el.style.transform = "translate(-50%, -50%) rotate(0deg)";
        });
      });
    }
  }, [visual]);

  if (bypass) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
        {children}
      </div>
    );
  }

  const phase = visual === "done" ? "expand" : visual;
  const showMark = visual === "plus" || visual === "square";
  const showField =
    visual === "square" || visual === "expand" || visual === "done";
  // Keep spin class through the first square frame so we can freeze the live angle
  const spinning =
    live &&
    (visual === "plus" || (visual === "square" && !frozeSpin.current));
  const asSquare =
    visual === "square" || visual === "expand" || visual === "done";
  /** Above the page scroller while playing — otherwise bg-black covers the whole boot */
  const layerZ = visual === "done" ? "z-0" : "z-[280]";

  const timingStyle = {
    ["--boot-square" as string]: `${BOOT.toSquare}ms`,
    ["--boot-expand" as string]: `${BOOT.expand}ms`,
  } as CSSProperties;

  return (
    <div
      className={`pointer-events-none fixed inset-0 ${layerZ} overflow-hidden bg-black`}
      style={timingStyle}
      aria-hidden
      data-boot-phase={visual}
    >
      <div
        ref={geoRef}
        className={[
          "hero-boot-geo",
          spinning ? "hero-boot-geo--spin" : "",
          asSquare ? "hero-boot-geo--square" : "hero-boot-geo--plus",
          live ? "hero-boot-geo--live" : "",
          showMark ? "hero-boot-geo--on" : "hero-boot-geo--off",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="hero-boot-edge hero-boot-edge--n" />
        <span className="hero-boot-edge hero-boot-edge--s" />
        <span className="hero-boot-edge hero-boot-edge--e" />
        <span className="hero-boot-edge hero-boot-edge--w" />
      </div>

      <div
        className={[
          "hero-boot-window",
          `hero-boot-window--${phase}`,
          visual === "done" ? "hero-boot-window--settled" : "",
          live && visual !== "done" ? "hero-boot-window--live" : "",
          showField ? "hero-boot-window--on" : "hero-boot-window--off",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="hero-boot-scene">{children}</div>
      </div>
    </div>
  );
}
