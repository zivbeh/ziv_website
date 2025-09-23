"use client";

import { useEffect, useMemo, useState } from "react";
import { useProgress } from "@react-three/drei";

interface PreloaderProps {
  /**
   * If true, keeps the preloader visible regardless of loading state
   * Useful if you need to hold the screen for an initial hero animation.
   */
  forceShow?: boolean;
  /** Minimum time to show the loader (ms) to avoid flash */
  minDurationMs?: number;
}

export function Preloader({ forceShow = false, minDurationMs = 600 }: PreloaderProps) {
  const { active, progress } = useProgress();
  const [mountedAt] = useState(() => performance.now());
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  const messages = useMemo(
    () => [
      "Booting thrusters",
      "Plotting orbits",
      "Warming up shaders",
      "Calibrating camera",
      "Loading projects",
    ],
    []
  );

  // Gate hiding until both loading is inactive and minimum duration elapsed
  useEffect(() => {
    if (forceShow) return;
    if (!active) {
      const elapsed = performance.now() - mountedAt;
      const remaining = Math.max(0, minDurationMs - elapsed);
      const t = window.setTimeout(() => setReady(true), remaining);
      return () => window.clearTimeout(t);
    }
  }, [active, forceShow, minDurationMs, mountedAt]);

  // After we flag ready, delay a bit to let CSS fade complete, then unmount
  useEffect(() => {
    if (ready) {
      const t = window.setTimeout(() => setHidden(true), 500);
      return () => window.clearTimeout(t);
    }
  }, [ready]);

  const pct = useMemo(() => Math.round(progress), [progress]);

  // Rotate loading messages while active
  useEffect(() => {
    if (ready) return;
    const t = window.setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 1400);
    return () => window.clearInterval(t);
  }, [messages.length, ready]);

  if (hidden) return null;

  return (
    <div
      aria-hidden={ready}
      className="fixed inset-0 z-[100] grid place-items-center bg-black transition-opacity duration-500"
      style={{
        opacity: ready ? 0 : 1,
        pointerEvents: ready ? "none" : "auto",
      }}
    >
      <div className="flex flex-col items-center gap-5 select-none">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-2 border-white/15" />
          <div
            className="absolute inset-0 rounded-full border-2 border-white"
            style={{
              // simple spinner
              clipPath: "polygon(50% 0%, 100% 0, 100% 100%, 50% 100%)",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
        <div className="text-white text-base font-medium tracking-wide">{messages[msgIndex]}…</div>
        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white"
            style={{ width: `${Math.max(4, pct)}%`, transition: "width 0.2s ease-out" }}
          />
        </div>
        <div className="text-white/70 text-xs">{pct}%</div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}


