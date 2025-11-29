"use client";

import { useEffect, useRef } from "react";

const BASE_LERP_FACTOR = 0.125;
const TRAIL_LENGTH = 20;
const TRAIL_DURATION = 600;
const TRAIL_WIDTH_MAX = 20; 
// CHANGED: Reduced to 28px.
// This puts the trail origin very close to the center of rotation, eliminating the wide swing arc.
const TRAIL_OFFSET = 50; 
const TRAIL_COLOR = "#F8D628";
const EXHAUST_COLORS = ["#ff4400", "#ff8800", TRAIL_COLOR];

export function CursorShip2D() {
  const shipRef = useRef<HTMLDivElement | null>(null);
  const trailContainerRef = useRef<SVGGElement | null>(null);
  const exhaustRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const smoothedVelocity = useRef({ x: 0, y: 0 });
  const speed = useRef(1);
  const currentAngle = useRef(0);
  
  const trail = useRef<Array<{ x: number; y: number; time: number }>>([]);
  const lastTime = useRef(0);
  const lastTrailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      target.current = { x: cx, y: cy };
      pos.current = { x: cx, y: cy };
      lastTrailPos.current = { x: cx, y: cy + TRAIL_OFFSET };
    }
    
    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const shipEl = shipRef.current;
    const trailContainer = trailContainerRef.current;
    const exhaustEl = exhaustRef.current;
    if (!shipEl || !trailContainer || !exhaustEl) return;

    const loop = (currentTime: number) => {
      if (!lastTime.current) lastTime.current = currentTime;
      lastTime.current = currentTime;

      // --- 1. Movement Logic ---
      const targetDirection = {
        x: target.current.x - pos.current.x,
        y: target.current.y - pos.current.y,
      };
      
      const dist = Math.sqrt(targetDirection.x ** 2 + targetDirection.y ** 2);

      if (smoothedVelocity.current.x ** 2 + smoothedVelocity.current.y ** 2 > 0.001 && dist > 0.001) {
        const velAngle = Math.atan2(smoothedVelocity.current.y, smoothedVelocity.current.x);
        const targetAngle = Math.atan2(targetDirection.y, targetDirection.x);
        let angleChange = Math.abs(targetAngle - velAngle);
        if (angleChange > Math.PI) angleChange = 2 * Math.PI - angleChange;

        if (angleChange > Math.PI * 0.75) {
          speed.current = speed.current * 0.9 + 0.1 * 0.1; 
        } else {
          speed.current = speed.current * 0.95 + 0.05 * 1.0; 
        }
      } else {
        speed.current = speed.current * 0.95 + 0.05 * 1.0;
      }

      const lerpFactor = Math.min(0.16, BASE_LERP_FACTOR * speed.current);

      pos.current.x += (target.current.x - pos.current.x) * lerpFactor;
      pos.current.y += (target.current.y - pos.current.y) * lerpFactor;

      velocity.current.x = target.current.x - pos.current.x;
      velocity.current.y = target.current.y - pos.current.y;

      smoothedVelocity.current.x = smoothedVelocity.current.x * 0.85 + velocity.current.x * 0.15;
      smoothedVelocity.current.y = smoothedVelocity.current.y * 0.85 + velocity.current.y * 0.15;

      // --- 2. Rotation & Banking ---
      const velLength = Math.sqrt(smoothedVelocity.current.x ** 2 + smoothedVelocity.current.y ** 2);
      let angle = currentAngle.current;
      let bankAngle = 0;

      if (velLength > 1.0) {
        const targetAngle = Math.atan2(smoothedVelocity.current.y, smoothedVelocity.current.x) + Math.PI / 2;
        
        let angleDiff = targetAngle - angle;
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        
        angle += angleDiff * 0.1;
        currentAngle.current = angle;
        
        // Banking (Reduced slightly to keep the visual stable)
        const rawBank = -smoothedVelocity.current.x * 0.01;
        bankAngle = Math.max(-0.1, Math.min(0.1, rawBank));
      }
      
      shipEl.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) rotate(${angle}rad) rotateZ(${bankAngle}rad)`;

      // --- 3. Exhaust Alignment ---
      const time = currentTime / 50;
      const thrust = Math.min(velLength / 15, 1.0) * speed.current;
      const baseScale = Math.max(0.3, thrust); 
      
      // CHANGED: Reduced from 50px to 40px. 
      // This tucks the fire "under" the ship sprite so it pivots with the body, not behind it.
      const exhaustOffset = 60; 
      const exhaustX = pos.current.x - Math.sin(angle) * exhaustOffset;
      const exhaustY = pos.current.y + Math.cos(angle) * exhaustOffset;

      exhaustEl.style.transform = `translate(${exhaustX}px, ${exhaustY}px) translate(-50%, -50%) rotate(${angle + Math.PI}rad)`;
      exhaustEl.style.opacity = baseScale.toString();

      const flames = exhaustEl.children;
      if (flames.length >= 3) {
        const s1 = (0.8 + 0.2 * Math.sin(time * 1.5)) * baseScale;
        const s2 = (0.8 + 0.2 * Math.sin(time * 2.0)) * baseScale;
        const s3 = (0.8 + 0.2 * Math.sin(time * 2.5)) * baseScale;
        
        (flames[0] as HTMLElement).style.transform = `translate(-50%, -50%) scale(${s1})`;
        (flames[1] as HTMLElement).style.transform = `translate(-50%, -50%) scale(${s2})`;
        (flames[2] as HTMLElement).style.transform = `translate(-50%, -50%) scale(${s3})`;
      }

      // --- 4. Trail Logic ---
      const trailSourceX = pos.current.x - Math.sin(angle) * TRAIL_OFFSET;
      const trailSourceY = pos.current.y + Math.cos(angle) * TRAIL_OFFSET;

      const distFromLast = Math.hypot(trailSourceX - lastTrailPos.current.x, trailSourceY - lastTrailPos.current.y);
      
      if (distFromLast > 2) {
        trail.current.push({ x: trailSourceX, y: trailSourceY, time: currentTime });
        lastTrailPos.current = { x: trailSourceX, y: trailSourceY };
      }

      trail.current = trail.current.filter(p => currentTime - p.time < TRAIL_DURATION);
      if (trail.current.length > 80) trail.current.shift();

      if (trailContainer) {
        trailContainer.innerHTML = "";
        if (trail.current.length > 1) {
          for (let i = 0; i < trail.current.length - 1; i++) {
            const p1 = trail.current[i];
            const p2 = trail.current[i + 1];
            const age = 1 - ((currentTime - p1.time) / TRAIL_DURATION);
            if (age <= 0) continue;

            const width = TRAIL_WIDTH_MAX * age; 
            const opacity = age * age; 

            const path = document.createElementNS("http://www.w3.org/2000/svg", "line");
            path.setAttribute("x1", p1.x.toString());
            path.setAttribute("y1", p1.y.toString());
            path.setAttribute("x2", p2.x.toString());
            path.setAttribute("y2", p2.y.toString());
            path.setAttribute("stroke", TRAIL_COLOR);
            path.setAttribute("stroke-width", width.toString());
            path.setAttribute("stroke-linecap", "round");
            path.setAttribute("stroke-opacity", opacity.toString());
            
            trailContainer.appendChild(path);
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <svg
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: 9998,
          pointerEvents: "none",
          overflow: "visible"
        }}
      >
        <g ref={trailContainerRef} style={{ filter: "blur(1px)" }} />
      </svg>

      {/* Exhaust Layer (On top of trail) */}
      <div
        ref={exhaustRef}
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform, opacity",
        }}
      >
         <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "24px",
            height: "40px",
            background: `radial-gradient(ellipse at center, #ffffff 15%, ${EXHAUST_COLORS[2]} 40%, ${EXHAUST_COLORS[1]} 70%, ${EXHAUST_COLORS[0]} 100%)`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            filter: "blur(2px)",
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "16px",
            height: "60px",
            background: `radial-gradient(ellipse at center, ${EXHAUST_COLORS[2]} 30%, ${EXHAUST_COLORS[1]} 70%, ${EXHAUST_COLORS[0]} 100%)`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            filter: "blur(1.5px)",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "12px",
            height: "30px",
            background: `radial-gradient(ellipse at center, ${EXHAUST_COLORS[1]} 0%, ${EXHAUST_COLORS[0]} 100%)`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            filter: "blur(1px)",
            opacity: 0.6,
          }}
        />
      </div>

      {/* Ship Layer (Topmost) */}
      <div
        ref={shipRef}
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 10000,
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        <img
          src="/spaceship.png"
          alt=""
          style={{
            width: "96px",
            height: "96px",
          }}
        />
      </div>
    </>
  );
}