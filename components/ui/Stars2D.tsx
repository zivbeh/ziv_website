"use client";

import { useEffect, useRef } from "react";

type Stars2DProps = {
  density?: number; // stars per 10,000 px^2 at dpr=1
};

export function Stars2D({ density = 0.6 }: Stars2DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mq.matches;
    const onChange = () => (reduceMotionRef.current = mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1; // fix DPR for perf stability
    let stars: { x: number; y: number; r: number; a: number; tw: number; sp: number }[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const area = (width * height) / 10000; // 10k px^2 buckets
      const n = Math.floor(area * density);
      stars = new Array(n).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random(),
        tw: Math.random() * 0.02 + 0.01, // twinkle speed
        sp: Math.random() * 0.06 + 0.02, // drift speed
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000";
      // don't fill background; canvas sits over black page
      for (const s of stars) {
        const alpha = 0.5 + 0.5 * Math.sin(t * s.tw + s.a * 6.283);
        ctx.globalAlpha = 0.3 + 0.7 * alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        if (!reduceMotionRef.current) {
          s.y += s.sp;
          if (s.y - s.r > height) s.y = -s.r;
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time / 1000);
      rafRef.current = requestAnimationFrame(loop);
    };

    resize();
    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 0, background: "transparent", pointerEvents: "none" }}
    />
  );
}


