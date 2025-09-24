"use client";

import { useEffect, useRef } from "react";

export function CursorShip2D() {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const vel = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const el = ref.current!;
    const loop = () => {
      const stiffness = 0.18; // follow speed
      const damping = 0.86; // friction
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      vel.current.x = vel.current.x * damping + dx * stiffness;
      vel.current.y = vel.current.y * damping + dy * stiffness;
      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      const angle = Math.atan2(vel.current.y, vel.current.x);
      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${angle + Math.PI / 2}rad)`;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{ position: "fixed", left: 0, top: 0, zIndex: 2, pointerEvents: "none", willChange: "transform" }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#ffffff"/>
      </svg>
    </div>
  );
}



