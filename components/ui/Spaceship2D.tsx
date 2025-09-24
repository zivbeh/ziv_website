"use client";

import { useEffect, useRef } from "react";

// 2D spaceship cursor follower that emulates the 3D motion feel without three.js
export function Spaceship2D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(true);
  const skipRef = useRef(false);

  // State
  const target = useRef({ x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, y: typeof window !== "undefined" ? window.innerHeight / 2 : 0 });
  const pos = useRef({ x: target.current.x, y: target.current.y });
  const vel = useRef({ x: 0, y: 0 });
  const smoothedVel = useRef({ x: 0, y: 0 });
  const rot = useRef(0);
  const speedFactor = useRef(1);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mq.matches;
    const onChange = () => (reduceMotionRef.current = mq.matches);
    mq.addEventListener?.("change", onChange);
    const onVis = () => {
      runningRef.current = document.visibilityState === "visible";
      if (runningRef.current && !rafRef.current) rafRef.current = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      mq.removeEventListener?.("change", onChange);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Pointer target
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        target.current.x = e.touches[0].clientX;
        target.current.y = e.touches[0].clientY;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1; // fixed DPR for performance

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Load sprite once
    if (!imgRef.current) {
      const img = new Image();
      img.src = "/spaceship.png";
      imgRef.current = img;
    }

    const BASE_LERP_FACTOR = 0.085; // match 3D feel
    const pullStrength = 0.0005; // match 3D off-screen pull
    const SHIP_SIZE_PX = 48; // keep ship size; we'll enlarge burst instead

    const drawShip = (x: number, y: number, angle: number, thrust: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle - Math.PI / 2);

      // Engine flames (3 cones) — enlarged slightly and tied to thrust
      const drawCone = (r: number, h: number, color: string, alpha: number) => {
        ctx.save();
        ctx.rotate(Math.PI);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-r, h);
        ctx.lineTo(r, h);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      };
      const t = performance.now() / 50;
      const scale1 = 0.9 + 0.25 * Math.sin(t * 1.5);
      const scale2 = 0.9 + 0.25 * Math.sin(t * 2.0 + 0.7);
      const scale3 = 0.9 + 0.25 * Math.sin(t * 2.5 + 1.3);
      const thrustBoost = 1 + thrust * 0.3;
      drawCone(4.5 * scale1 * thrustBoost, 18 * scale1 * thrustBoost, "#ff4400", Math.min(0.75, 0.5 + 0.5 * thrust));
      drawCone(3.4 * scale2 * thrustBoost, 25 * scale2 * thrustBoost, "#ff8800", Math.min(0.7, 0.45 + 0.5 * thrust));
      drawCone(3.0 * scale3 * thrustBoost, 14 * scale3 * thrustBoost, "#ffcc00", Math.min(0.65, 0.4 * thrust + 0.3));

      // Body sprite (fallback to simple triangle if image not loaded)
      const img = imgRef.current!;
      if (img.complete && img.naturalWidth > 0) {
        ctx.globalAlpha = 1;
        const size = SHIP_SIZE_PX;
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
      } else {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(6, 8);
        ctx.lineTo(-6, 8);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    };

    // trail using a fading polyline of recent positions
    const trail: { x: number; y: number }[] = [];

    const step = () => {
      // Dynamic speed factor based on turn angle
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      const targetDir = { x: dx, y: dy };

      const sv = smoothedVel.current;
      const svLen = Math.hypot(sv.x, sv.y);
      const tdLen = Math.hypot(targetDir.x, targetDir.y);
      if (svLen > 0.001 && tdLen > 0.001) {
        const dot = (sv.x * targetDir.x + sv.y * targetDir.y) / (svLen * tdLen);
        const angleChange = Math.acos(Math.min(1, Math.max(-1, dot)));
        if (angleChange > Math.PI * 0.75) {
          speedFactor.current = speedFactor.current * 0.9 + 0.1 * 0.1; // decelerate
        } else {
          speedFactor.current = speedFactor.current * 0.95 + 0.05 * 1.0; // accelerate back
        }
      } else {
        speedFactor.current = speedFactor.current * 0.95 + 0.05 * 1.0;
      }

      const lerp = Math.min(0.16, BASE_LERP_FACTOR * speedFactor.current);
      pos.current.x += (target.current.x - pos.current.x) * lerp;
      pos.current.y += (target.current.y - pos.current.y) * lerp;

      // Pull back if near edges
      const halfW = width / 2;
      const halfH = height / 2;
      const dxc = pos.current.x - halfW;
      const dyc = pos.current.y - halfH;
      if (Math.abs(dxc) > halfW) {
        pos.current.x += -dxc * pullStrength * (Math.abs(dxc) - halfW);
      }
      if (Math.abs(dyc) > halfH) {
        pos.current.y += -dyc * pullStrength * (Math.abs(dyc) - halfH);
      }

      // Velocity and smoothing
      vel.current.x = target.current.x - pos.current.x;
      vel.current.y = target.current.y - pos.current.y;
      smoothedVel.current.x = smoothedVel.current.x * 0.88 + vel.current.x * 0.12; // 0.12 like 3D
      smoothedVel.current.y = smoothedVel.current.y * 0.88 + vel.current.y * 0.12;

      // Render
      ctx.clearRect(0, 0, width, height);

      // trail polyline with quadratic falloff (attenuation t*t) + glow core like drei Trail
      if (!reduceMotionRef.current) {
        trail.push({ x: pos.current.x, y: pos.current.y });
        if (trail.length > 90) trail.shift();
        const n = trail.length;
        // Glow pass (additive blend)
        const prevComp = ctx.globalCompositeOperation;
        ctx.globalCompositeOperation = "lighter";
        for (let i = 1; i < n; i++) {
          const t1 = i / n;
          const a1 = (1 - t1) * (1 - t1);
          const p0 = trail[i - 1];
          const p1 = trail[i];
          const w = 10 * (1 - t1); // wider glow
          ctx.strokeStyle = "#F8D628";
          ctx.globalAlpha = 0.06 + 0.25 * a1;
          ctx.lineWidth = Math.max(1, w);
          ctx.shadowColor = "#F8D628";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
        // Core pass
        ctx.shadowBlur = 0;
        for (let i = 1; i < n; i++) {
          const t1 = i / n;
          const a1 = (1 - t1) * (1 - t1);
          const p0 = trail[i - 1];
          const p1 = trail[i];
          const w = 3.2 * (1 - t1);
          ctx.strokeStyle = "#F8D628";
          ctx.globalAlpha = 0.15 + 0.55 * a1;
          ctx.lineWidth = Math.max(1, w);
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
        ctx.globalCompositeOperation = prevComp;
        ctx.globalAlpha = 1;
      } else {
        trail.length = 0;
      }

      // orientation smoothing akin to quaternion slerp intensity (approx)
      const targetAngle = Math.atan2(smoothedVel.current.y, smoothedVel.current.x);
      const da = ((targetAngle - rot.current + Math.PI) % (2 * Math.PI)) - Math.PI; // shortest path
      rot.current += da * (lerp * 0.9);
      const thrust = Math.min(Math.hypot(smoothedVel.current.x, smoothedVel.current.y) / 20, 1.0) * speedFactor.current;
      drawShip(pos.current.x, pos.current.y, rot.current, thrust);
    };

    const loop = () => {
      if (!runningRef.current) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      // Skip every other frame to cap ~30fps work while keeping cursor smooth
      if (skipRef.current && !reduceMotionRef.current) {
        skipRef.current = false;
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      skipRef.current = true;
      step();
      rafRef.current = requestAnimationFrame(loop);
    };

    resize();
    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 50, pointerEvents: "none", background: "transparent" }}
    />
  );
}


