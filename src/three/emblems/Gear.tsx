import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { brass, dark } from "./materials";

/** 01 Engineering: a spinning gear. */
export function Gear({ active }: { active: boolean }) {
  const g = useRef<Group>(null);
  useFrame((_, dt) => { if (g.current) g.current.rotation.z += dt * (active ? 1.6 : 0.6); });
  return (
    <group ref={g}>
      <mesh material={brass} rotation-x={Math.PI / 2}><cylinderGeometry args={[0.85, 0.85, 0.32, 28]} /></mesh>
      {Array.from({ length: 12 }, (_, k) => {
        const a = (k / 12) * Math.PI * 2;
        return (
          <mesh key={k} material={brass} position={[Math.cos(a) * 0.98, Math.sin(a) * 0.98, 0]} rotation-z={a}>
            <boxGeometry args={[0.3, 0.26, 0.32]} />
          </mesh>
        );
      })}
      <mesh material={dark} rotation-x={Math.PI / 2}><cylinderGeometry args={[0.25, 0.25, 0.4, 16]} /></mesh>
    </group>
  );
}
