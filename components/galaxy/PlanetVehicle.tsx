// @ts-nocheck
"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Project } from "@/lib/types";

interface PlanetVehicleProps {
  project: Project;
  planetSize: number;
}

function hashStringToNumber(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom01(seed: number): () => number {
  let state = seed || 1;
  return () => {
    // xorshift32
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return ((state >>> 0) % 1000) / 1000;
  };
}

function VehicleCar({ color = "#e53935" }: { color?: string }) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.6, 0.18, 0.3]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 0.23, 0]}>
        <boxGeometry args={[0.35, 0.14, 0.28]} />
        <meshStandardMaterial color="#cfd8dc" metalness={0.1} roughness={0.4} />
      </mesh>
      {/* Wheels */}
      {[-0.22, 0.22].map((x) =>
        [-0.12, 0.12].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.06, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
            <meshStandardMaterial color="#212121" />
          </mesh>
        ))
      )}
    </group>
  );
}

function VehicleRover({ color = "#8d6e63" }: { color?: string }) {
  return (
    <group>
      {/* Chassis */}
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[0.8, 0.16, 0.5]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Mast */}
      <mesh position={[0.05, 0.45, 0]}>
        <boxGeometry args={[0.06, 0.5, 0.06]} />
        <meshStandardMaterial color="#b0bec5" />
      </mesh>
      <mesh position={[0.05, 0.62, 0]}>
        <boxGeometry args={[0.25, 0.12, 0.12]} />
        <meshStandardMaterial color="#90a4ae" />
      </mesh>
      {/* Wheels - six */}
      {[-0.32, 0, 0.32].map((x) =>
        [-0.22, 0.22].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.08, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 12]} />
            <meshStandardMaterial color="#263238" />
          </mesh>
        ))
      )}
    </group>
  );
}

function VehicleDrone({ color = "#00bcd4" }: { color?: string }) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.3} />
      </mesh>
      {/* Rotors */}
      {[-0.28, 0.28].map((x) =>
        [-0.28, 0.28].map((z) => (
          <group key={`${x}-${z}`} position={[x, 0.12, z]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
              <meshStandardMaterial color="#455a64" />
            </mesh>
            <mesh rotation={[0, 0, 0]}>
              <boxGeometry args={[0.3, 0.01, 0.06]} />
              <meshStandardMaterial color="#b0bec5" />
            </mesh>
          </group>
        ))
      )}
    </group>
  );
}

function VehicleSatellite({ color = "#9fa8da" }: { color?: string }) {
  return (
    <group>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.22, 0.22, 0.22]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Solar panels */}
      {[-0.4, 0.4].map((x) => (
        <mesh key={x} position={[x, 0.12, 0]}>
          <boxGeometry args={[0.5, 0.08, 0.02]} />
          <meshStandardMaterial color="#3949ab" />
        </mesh>
      ))}
      {/* Dish */}
      <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.12, 0.16, 16]} />
        <meshStandardMaterial color="#c5cae9" />
      </mesh>
    </group>
  );
}

function VehicleStealthPlane() {
  const black = "#000000";
  return (
    <group>
      {/* Fuselage */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.7, 0.08, 0.12]} />
        <meshStandardMaterial color={black} metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Wings */}
      <mesh>
        <boxGeometry args={[0.9, 0.02, 0.2]} />
        <meshStandardMaterial color={black} metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 0.18, -0.04]}>
        <boxGeometry args={[0.1, 0.2, 0.02]} />
        <meshStandardMaterial color={black} metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

export const PlanetVehicle = ({ project, planetSize }: PlanetVehicleProps) => {
  const orbitRef = useRef<THREE.Group>(null);
  const vehicleRef = useRef<THREE.Group>(null);
  const seed = useMemo(() => hashStringToNumber(project.id), [project.id]);
  const rng = useMemo(() => seededRandom01(seed), [seed]);

  // Orbit parameters are computed below after determining vehicle type
  const phaseX = useMemo(() => rng() * Math.PI * 2, [rng]);
  const phaseY = useMemo(() => rng() * Math.PI * 2, [rng]);
  const phaseZ = useMemo(() => rng() * Math.PI * 2, [rng]);

  const palette = [
    "#e53935",
    "#8e24aa",
    "#3949ab",
    "#00897b",
    "#fdd835",
    "#fb8c00",
    "#6d4c41",
    "#90a4ae",
    "#26a69a",
    "#5c6bc0",
  ];
  const color = palette[seed % palette.length];

  const vehicleType: "stealth" | "rover" | "car" | "drone" | "sat" = useMemo(() => {
    if (project.id === "stealth-founder") return "stealth";
    const types = ["rover", "car", "drone", "sat"] as const;
    return types[seed % types.length];
  }, [project.id, seed]);

  const isSurfaceVehicle = vehicleType === "rover" || vehicleType === "car";
  const isPlane = vehicleType === "stealth";
  const isSatellite = vehicleType === "sat";
  const isDrone = vehicleType === "drone";
  // Keep rover wheels essentially touching the surface; allow cars a slight float
  const surfaceClearance = useMemo(() => {
    if (vehicleType === "rover") return Math.max(0.005, planetSize * 0.01);
    if (vehicleType === "car") return 0.06 + planetSize * 0.03; // subtle hover look
    return 0.1;
  }, [planetSize, vehicleType]);
  const planeClearance = useMemo(() => 0.12 + planetSize * 0.06, [planetSize]);
  const surfaceLatAmp = useMemo(() => 0.35 + rng() * 0.3, [rng]); // radians
  const surfaceLatFreq = useMemo(() => 0.2 + rng() * 0.6, [rng]);
  const surfaceLonFreq = useMemo(() => 0.3 + rng() * 0.8, [rng]);
  const surfacePhaseLat = useMemo(() => rng() * Math.PI * 2, [rng]);
  const surfacePhaseLon = useMemo(() => rng() * Math.PI * 2, [rng]);

  // Orbit parameters (type-dependent)
  const orbitRadiusBase = useMemo(() => {
    if (isSatellite) return planetSize + 0.35 + rng() * 0.25; // very close to surface
    if (isDrone) return planetSize + 0.9 + rng() * 0.5; // medium altitude
    return planetSize + 1.2 + rng() * 0.6; // default for other orbiters
  }, [planetSize, rng, isSatellite, isDrone]);
  const orbitRadiusY = useMemo(() => {
    if (isSatellite) return planetSize * 0.12 + 0.2 + rng() * 0.2; // small vertical bob
    if (isDrone) return planetSize * 0.25 + 0.4 + rng() * 0.4;
    return planetSize * 0.4 + 0.8 + rng() * 0.8;
  }, [planetSize, rng, isSatellite, isDrone]);
  const orbitSpeedX = useMemo(
    () => (isSatellite ? 0.12 + rng() * 0.18 : isDrone ? 0.35 + rng() * 0.45 : 0.4 + rng() * 0.6),
    [rng, isSatellite, isDrone]
  );
  const orbitSpeedY = useMemo(
    () => (isSatellite ? 0.1 + rng() * 0.16 : isDrone ? 0.28 + rng() * 0.4 : 0.3 + rng() * 0.5),
    [rng, isSatellite, isDrone]
  );
  const orbitSpeedZ = useMemo(
    () => (isSatellite ? 0.12 + rng() * 0.18 : isDrone ? 0.32 + rng() * 0.45 : 0.35 + rng() * 0.5),
    [rng, isSatellite, isDrone]
  );
  const swirlAmount = useMemo(() => (isSatellite ? 0.1 + rng() * 0.1 : 0.3 + rng() * 0.4), [rng, isSatellite]);
  const bobAmplitude = useMemo(() => (isSatellite ? 0.06 + rng() * 0.06 : isDrone ? 0.15 + rng() * 0.15 : 0.25 + rng() * 0.25), [rng, isSatellite, isDrone]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (isSurfaceVehicle) {
      const r = planetSize + surfaceClearance;
      const lat = Math.sin(t * surfaceLatFreq + surfacePhaseLat) * surfaceLatAmp; // [-amp, amp]
      const lon = t * surfaceLonFreq + surfacePhaseLon; // wrap naturally

      const cosLat = Math.cos(lat);
      const sinLat = Math.sin(lat);
      const cosLon = Math.cos(lon);
      const sinLon = Math.sin(lon);

      const pos = new THREE.Vector3(r * cosLat * cosLon, r * sinLat, r * cosLat * sinLon);

      // Derivative approximation for forward direction
      const dt = 0.02;
      const lat2 = Math.sin((t + dt) * surfaceLatFreq + surfacePhaseLat) * surfaceLatAmp;
      const lon2 = (t + dt) * surfaceLonFreq + surfacePhaseLon;
      const cosLat2 = Math.cos(lat2);
      const sinLat2 = Math.sin(lat2);
      const cosLon2 = Math.cos(lon2);
      const sinLon2 = Math.sin(lon2);
      const pos2 = new THREE.Vector3(r * cosLat2 * cosLon2, r * sinLat2, r * cosLat2 * sinLon2);

      const forward = pos2.clone().sub(pos).normalize();
      const upSurface = pos.clone().normalize();
      const right = new THREE.Vector3().crossVectors(upSurface, forward).normalize();
      const adjustedForward = new THREE.Vector3().crossVectors(right, upSurface).normalize();

      if (vehicleRef.current) {
        vehicleRef.current.position.copy(pos);
        const m = new THREE.Matrix4().makeBasis(right, upSurface, adjustedForward);
        vehicleRef.current.quaternion.setFromRotationMatrix(m);
      }
    } else if (isPlane) {
      // Near-surface flight similar to cars, slightly higher and faster
      const r = planetSize + planeClearance;
      const lat = Math.sin(t * (surfaceLatFreq * 1.3) + surfacePhaseLat) * (surfaceLatAmp * 0.9);
      const lon = t * (surfaceLonFreq * 1.6) + surfacePhaseLon;

      const cosLat = Math.cos(lat);
      const sinLat = Math.sin(lat);
      const cosLon = Math.cos(lon);
      const sinLon = Math.sin(lon);

      const pos = new THREE.Vector3(r * cosLat * cosLon, r * sinLat, r * cosLat * sinLon);

      const dt = 0.02;
      const lat2 = Math.sin((t + dt) * (surfaceLatFreq * 1.3) + surfacePhaseLat) * (surfaceLatAmp * 0.9);
      const lon2 = (t + dt) * (surfaceLonFreq * 1.6) + surfacePhaseLon;
      const cosLat2 = Math.cos(lat2);
      const sinLat2 = Math.sin(lat2);
      const cosLon2 = Math.cos(lon2);
      const sinLon2 = Math.sin(lon2);
      const pos2 = new THREE.Vector3(r * cosLat2 * cosLon2, r * sinLat2, r * cosLat2 * sinLon2);

      const forward = pos2.clone().sub(pos).normalize();
      const upSurface = pos.clone().normalize();
      const right = new THREE.Vector3().crossVectors(upSurface, forward).normalize();
      const adjustedForward = new THREE.Vector3().crossVectors(right, upSurface).normalize();

      if (vehicleRef.current) {
        vehicleRef.current.position.copy(pos);
        const m = new THREE.Matrix4().makeBasis(right, upSurface, adjustedForward);
        vehicleRef.current.quaternion.setFromRotationMatrix(m);
      }
    } else {
      // Lissajous-like orbit around planet with slight swirl (non-surface vehicles)
      const x = Math.sin(t * orbitSpeedX + phaseX) * orbitRadiusBase * (1 + Math.sin(t * 0.5) * swirlAmount * 0.15);
      const z = Math.cos(t * orbitSpeedZ + phaseZ) * orbitRadiusBase * (1 + Math.cos(t * 0.6) * swirlAmount * 0.15);
      const y = Math.sin(t * orbitSpeedY + phaseY) * orbitRadiusY + Math.sin(t * 1.7) * bobAmplitude;

      if (vehicleRef.current) {
        vehicleRef.current.position.set(x, y, z);

        // Orient vehicle in direction of travel for more dynamics
        const dx = Math.cos(t * orbitSpeedX + phaseX) * orbitRadiusBase;
        const dz = -Math.sin(t * orbitSpeedZ + phaseZ) * orbitRadiusBase;
        const dy = Math.cos(t * orbitSpeedY + phaseY) * orbitRadiusY;
        const dir = new THREE.Vector3(dx, dy, dz).normalize();
        const up = new THREE.Vector3(0, 1, 0);
        const right = new THREE.Vector3().crossVectors(up, dir).normalize();
        const adjustedUp = new THREE.Vector3().crossVectors(dir, right).normalize();
        const m = new THREE.Matrix4().makeBasis(right, adjustedUp, dir);
        vehicleRef.current.quaternion.setFromRotationMatrix(m);
      }
    }
  });

  return (
    <group ref={orbitRef}>
      <group ref={vehicleRef}>
        {/* Increase size proportional to planet for visibility */}
        <group scale={Math.max(0.5, planetSize * (vehicleType === "rover" ? 0.2 : isSurfaceVehicle ? 0.18 : 0.24))}>
          {vehicleType === "stealth" && <VehicleStealthPlane />}
          {vehicleType === "rover" && <VehicleRover color={color} />}
          {vehicleType === "car" && <VehicleCar color={color} />}            
          {vehicleType === "drone" && <VehicleDrone color={color} />}
          {vehicleType === "sat" && <VehicleSatellite color={color} />}
        </group>
        {/* Accent light to make vehicle pop */}
        <pointLight color={color} intensity={isSurfaceVehicle ? 0.5 : 0.9} distance={planetSize * 3 + 6} decay={2} />
      </group>
    </group>
  );
};


