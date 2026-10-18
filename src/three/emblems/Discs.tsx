import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const RADII = [1.1, 0.92, 0.76, 0.62, 0.5];

/** 02 MSc Finance: stacked shrinking discs, each later cash flow discounted to a smaller one. */
export function Discs({ active }: { active: boolean }) {
  const g = useRef<THREE.Group>(null);
  const mats = useMemo(
    () => RADII.map((_, k) => new THREE.MeshStandardMaterial({ color: 0x7fd0de, transparent: true, opacity: 0.95 - k * 0.14, emissive: 0x0f5a68, emissiveIntensity: 0.7 })),
    [],
  );
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!g.current) return;
    g.current.rotation.y = t * 0.5;
    g.current.children.forEach((d, k) => {
      // When active, discs re-stack one after another, shrinking into place.
      const phase = active ? Math.min(1, Math.max(0, ((t * 0.8) % 2.4) - k * 0.18)) : 1;
      d.position.y = k * 0.3 - 0.6 + Math.sin(t * 2 + k) * 0.03;
      d.scale.setScalar(0.6 + 0.4 * (1 - Math.pow(1 - phase, 3)));
    });
  });
  return (
    <group ref={g}>
      {RADII.map((r, k) => (
        <mesh key={r} material={mats[k]}><cylinderGeometry args={[r, r, 0.12, 32]} /></mesh>
      ))}
    </group>
  );
}
