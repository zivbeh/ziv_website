"use client";

import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useMotionValue, animate } from "framer-motion";
import * as THREE from "three";
import { Vector3 } from "three";

interface CameraControlsProps {
  targetPosition: THREE.Vector3 | null;
  yRange: [number, number];
  onCameraYChange: (y: number) => void;
  initialY?: number;
  /** Enable user wheel/scroll input */
  wheelEnabled?: boolean;
  /** Hold camera at initialY + introOffsetY until introTrigger becomes true */
  introHold?: boolean;
  /** Offset in Y to start above initialY for a gentle settle */
  introOffsetY?: number;
  /** When true, release the hold so camera eases to initialY */
  introTrigger?: boolean;
  targetYProp?: number | null;
  onTargetReached?: () => void;
}

export const CameraControls = ({
  targetPosition,
  yRange,
  onCameraYChange,
  initialY,
  wheelEnabled = true,
  introHold = false,
  introOffsetY = 0,
  introTrigger = true,
  targetYProp,
  onTargetReached,
}: CameraControlsProps) => {
  const { camera } = useThree();
  const x = useMotionValue(camera.position.x);
  const z = useMotionValue(camera.position.z);
  const targetY = useRef(initialY ?? 0);
  const isNavigating = useRef(false);
  const yRangeRef = useRef<[number, number]>([-20, 20]);
  const dragState = useRef<{ active: boolean; lastY: number; velocity: number; lastT: number }>({
    active: false,
    lastY: 0,
    velocity: 0,
    lastT: 0,
  });
  const isCoarsePointerRef = useRef(false);

  // Detect phones/tablets (coarse pointers) to adjust scrolling behavior
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    try {
      isCoarsePointerRef.current = window.matchMedia("(pointer: coarse)").matches;
    } catch {}
  }, []);

  // Initialize camera Y and target with optional intro offset/hold
  useEffect(() => {
    const startY = (initialY ?? 0) + (introHold ? introOffsetY : 0);
    camera.position.y = startY;
    targetY.current = introHold ? startY : (initialY ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, initialY, introHold, introOffsetY]);

  useEffect(() => {
    if (!wheelEnabled) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const scrollY = event.deltaY * -0.02;
      const [minY, maxY] = yRangeRef.current;
      targetY.current = Math.max(minY, Math.min(maxY, targetY.current + scrollY));
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [wheelEnabled]);

  // Touch drag with inertial scrolling
  useEffect(() => {
    const start = (clientY: number) => {
      dragState.current.active = true;
      dragState.current.lastY = clientY;
      dragState.current.velocity = 0;
      dragState.current.lastT = performance.now();
    };
    const move = (clientY: number) => {
      if (!dragState.current.active) return;
      const now = performance.now();
      const dy = clientY - dragState.current.lastY;
      const dt = Math.max(1, now - dragState.current.lastT);
      dragState.current.velocity = (dy / dt) * 16; // px per 16ms frame
      dragState.current.lastY = clientY;
      dragState.current.lastT = now;
      const [minY, maxY] = yRangeRef.current;
      // Reduce touch move sensitivity for a more controlled scroll on phones
      targetY.current = Math.max(minY, Math.min(maxY, targetY.current - dy * 0.015));
    };
    const end = () => {
      if (!dragState.current.active) return;
      dragState.current.active = false;
      isNavigating.current = false; // User interaction cancels navigation
      // On phones, disable inertial fling for non-accelerated feel
      if (isCoarsePointerRef.current) return;
      const initialVel = dragState.current.velocity;
      if (Math.abs(initialVel) < 0.01) return;
      const [minY, maxY] = yRangeRef.current;
      // fling animation with decay
      const controls = animate(initialVel, 0, {
        type: "spring",
        stiffness: 40,
        // Increase damping and reduce fling contribution to feel less accelerated on phones
        damping: 28,
        onUpdate: (v) => {
          targetY.current = Math.max(minY, Math.min(maxY, targetY.current - v * 0.18));
        },
      });
      return () => controls.stop();
    };

    const onTouchStart = (e: TouchEvent) => start(e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); move(e.touches[0].clientY); };
    const onTouchEnd = () => { end(); };

    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: false });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [wheelEnabled]);

  useEffect(() => {
    if (targetYProp !== null && targetYProp !== undefined) {
      targetY.current = targetYProp;
      isNavigating.current = true;
    }
  }, [targetYProp]);

  useFrame((state, delta) => {
    const isClose = Math.abs(camera.position.y - targetY.current) < 0.01;

    if (isNavigating.current && isClose) {
      isNavigating.current = false;
      if (onTargetReached) {
        onTargetReached();
      }
    }

    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY.current, 0.1);

    if (onCameraYChange) {
      onCameraYChange(camera.position.y);
    }

    if (targetPosition) {
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        targetPosition.x,
        0.02
      );
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        targetPosition.z,
        0.02
      );
    }
  });

  useEffect(() => {
    const unsubscribeX = x.onChange((latest) => (camera.position.x = latest));
    const unsubscribeZ = z.onChange((latest) => (camera.position.z = latest));

    return () => {
      unsubscribeX();
      unsubscribeZ();
    };
  }, [camera, x, z]);

  useEffect(() => {
    if (targetPosition) {
      targetY.current = targetPosition.y;
    }
  }, [targetPosition]);

  // Release the intro hold to gently settle to initialY
  useEffect(() => {
    if (introHold && introTrigger && initialY !== undefined) {
      targetY.current = initialY;
    }
  }, [introHold, introTrigger, initialY]);

  useEffect(() => {
    if (yRange && yRange.length === 2) {
      yRangeRef.current = yRange;
    }
  }, [yRange]);

  return null;
};
