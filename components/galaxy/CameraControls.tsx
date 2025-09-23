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
}

export const CameraControls = ({ targetPosition, yRange, onCameraYChange, initialY, wheelEnabled = true, introHold = false, introOffsetY = 0, introTrigger = true }: CameraControlsProps) => {
  const { camera } = useThree();
  const x = useMotionValue(camera.position.x);
  const z = useMotionValue(camera.position.z);
  const targetY = useRef(initialY ?? 0);
  const yRangeRef = useRef<[number, number]>([-20, 20]);

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
      const scrollY = event.deltaY * -0.01;
      const [minY, maxY] = yRangeRef.current;
      targetY.current = Math.max(minY, Math.min(maxY, targetY.current + scrollY));
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [wheelEnabled]);

  useFrame((state, delta) => {
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetY.current,
      0.1
    );

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
