// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Trail, useTexture } from "@react-three/drei";
import { MeshBasicMaterial } from "three";

const BASE_LERP_FACTOR = 0.075; // Base speed factor for the ship's movement

const velocity = new THREE.Vector3();
const smoothedVelocity = new THREE.Vector3();
const q = new THREE.Quaternion();
const a = new THREE.Vector3(0, 0, 1);

export const Spaceship = ({ planetLayout }: { planetLayout: unknown }) => {
  const shipRef = useRef<THREE.Group>(null);
  const exhaustRef1 = useRef<THREE.Mesh>(null);
  const exhaustRef2 = useRef<THREE.Mesh>(null);
  const exhaustRef3 = useRef<THREE.Mesh>(null);
  const texture = useTexture("/spaceship.png");
  const speed = useRef(1); // Manages the ship's current speed factor
  const { camera, gl, viewport } = useThree();
  const pointerNdc = useRef({ x: 0, y: 0 });
  const raycaster = useRef(new THREE.Raycaster());
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const anchorOffset = useRef(new THREE.Vector3(0, -0.5, 0));

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      pointerNdc.current.x = x;
      pointerNdc.current.y = y;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [gl]);

  useFrame((state, delta) => {
    if (!shipRef.current) return;

    // Update target position
    // Intersect a ray from the camera through pointer with a constant-Z plane at ship depth
    const depth = camera.position.z - 5;
    plane.current.set(plane.current.normal, -depth);
    raycaster.current.setFromCamera(pointerNdc.current as unknown as THREE.Vector2, camera);
    const targetPosition = new THREE.Vector3();
    raycaster.current.ray.intersectPlane(plane.current, targetPosition);
    targetPosition.add(anchorOffset.current);

    // --- Velocity and Turn Angle Logic ---
    const targetDirection = new THREE.Vector3()
      .copy(targetPosition)
      .sub(shipRef.current.position);

    // Only calculate angle if the ship is actually moving
    if (smoothedVelocity.lengthSq() > 0.001 && targetDirection.lengthSq() > 0.001) {
      const angleChange = smoothedVelocity.angleTo(targetDirection);

      // If the angle change is sharp (e.g., > 120 degrees), decelerate
      if (angleChange > Math.PI * 0.75) {
        speed.current = THREE.MathUtils.lerp(speed.current, 0.1, 0.1);
      } else {
        // Otherwise, accelerate back to normal speed
        speed.current = THREE.MathUtils.lerp(speed.current, 1.0, 0.05);
      }
    } else {
      // Accelerate if starting from a standstill
      speed.current = THREE.MathUtils.lerp(speed.current, 1.0, 0.05);
    }

    // The interpolation factor is now dynamic based on the current speed
    const lerpFactor = BASE_LERP_FACTOR * speed.current;

    // Smoothly interpolate ship's position towards the target
    shipRef.current.position.lerp(targetPosition, lerpFactor);

    // Add a force to pull the ship back if it goes off-screen
    const shipPosition = shipRef.current.position;
    const vp = viewport.getCurrentViewport(camera, shipPosition);
    const halfWidth = vp.width / 2;
    const halfHeight = vp.height / 2;
    const pullStrength = 0.0005;

    const pullForce = new THREE.Vector3();
    const dx = shipPosition.x - camera.position.x;
    const dy = shipPosition.y - camera.position.y;

    if (Math.abs(dx) > halfWidth) {
      pullForce.x = -dx * pullStrength * (Math.abs(dx) - halfWidth);
    }
    if (Math.abs(dy) > halfHeight) {
      pullForce.y = -dy * pullStrength * (Math.abs(dy) - halfHeight);
    }

    shipRef.current.position.add(pullForce);

    // Calculate velocity for rotation
    velocity.copy(targetPosition).sub(shipRef.current.position);

    // Adjust smoothing factor for responsiveness
    smoothedVelocity.lerp(velocity, 0.05);

    if (smoothedVelocity.length() > 0.1) {
      const angle = Math.atan2(smoothedVelocity.y, smoothedVelocity.x);
      q.setFromAxisAngle(a, angle - Math.PI / 2);
      // Tie rotation speed to movement speed for a cohesive feel
      shipRef.current.quaternion.slerp(q, lerpFactor);

      // Add banking effect
      const bankAngle = -smoothedVelocity.x * 0.05;
      shipRef.current.rotation.z = bankAngle;
    }

    // Engine blast effect
    if (exhaustRef1.current && exhaustRef2.current && exhaustRef3.current) {
      const time = performance.now() / 50;
      // Tie the engine thrust visual to the current speed
      const thrust = Math.min(smoothedVelocity.length() / 2, 1.0) * speed.current;

      const scale1 = 0.8 + 0.2 * Math.sin(time * 1.5);
      const scale2 = 0.8 + 0.2 * Math.sin(time * 2);
      const scale3 = 0.8 + 0.2 * Math.sin(time * 2.5);

      exhaustRef1.current.scale.set(scale1 * thrust, scale1 * thrust, scale1 * thrust);
      exhaustRef2.current.scale.set(scale2 * thrust, scale2 * thrust, scale2 * thrust);
      exhaustRef3.current.scale.set(scale3 * thrust, scale3 * thrust, scale3 * thrust);

      (exhaustRef1.current.material as MeshBasicMaterial).opacity = scale1 * thrust;
      (exhaustRef2.current.material as MeshBasicMaterial).opacity = scale2 * thrust;
      (exhaustRef3.current.material as MeshBasicMaterial).opacity = scale3 * thrust;
    }
  });

  return (
    <group ref={shipRef}>
      {/* Spaceship Body */}
      <mesh position={[0, 0.5, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} transparent alphaTest={0.5} />
      </mesh>
      <Trail
        width={1.5}
        length={8}
        color={"#F8D628"}
        attenuation={(t) => t * t}
      >
        {/* Trail emitter */}
        <mesh>
          <sphereGeometry args={[0.01, 3, 3]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </Trail>
      {/* Engine Blast */}
      <group rotation={[Math.PI, 0, 0]}>
        <mesh ref={exhaustRef1}>
          <coneGeometry args={[0.15, 0.4, 8]} />
          <meshBasicMaterial color="#ff4400" transparent />
        </mesh>
        <mesh ref={exhaustRef2}>
          <coneGeometry args={[0.1, 0.6, 8]} />
          <meshBasicMaterial color="#ff8800" transparent />
        </mesh>
        <mesh ref={exhaustRef3}>
          <coneGeometry args={[0.08, 0.3, 8]} />
          <meshBasicMaterial color="#ffcc00" transparent />
        </mesh>
      </group>
    </group>
  );
};

