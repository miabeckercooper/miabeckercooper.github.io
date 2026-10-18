import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { models } from "../../content/cv";
import { lossMat, teal } from "./materials";

const VARIANTS = models.backtest.variants;

/** 04 Substrate: four bars that grow to each variant's Sharpe ratio (A, B, C, D). */
export function BacktestBars({ active }: { active: boolean }) {
  const g = useRef<Group>(null);
  const grow = useRef(0);
  useFrame(({ clock }, dt) => {
    // Bars regrow each time the station becomes active.
    grow.current = active ? Math.min(1, grow.current + dt * 0.9) : Math.max(0.35, grow.current - dt);
    const t = clock.elapsedTime;
    g.current?.children.forEach((b, k) => {
      const v = VARIANTS[k].sharpe;
      const hh = 0.15 + v * 1.5 * grow.current * (0.95 + 0.05 * Math.sin(t * 2 + k));
      (b as Mesh).scale.y = hh;
      b.position.y = hh / 2 - 0.7;
    });
  });
  return (
    <group ref={g}>
      {VARIANTS.map((v, k) => (
        <mesh key={v.id} material={v.dsr > 0.5 ? teal : lossMat} position={[(k - 1.5) * 0.48, 0, 0]}>
          <boxGeometry args={[0.34, 1, 0.34]} />
        </mesh>
      ))}
    </group>
  );
}
