import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { rng } from "../../lib/rng";
import { chartCanvas, drawChart } from "../shared";

const COLS = ["#7FD0DE", "#6FD39E", "#7FD0DE"];

/** 03 Markets: three floating trading screens with live mini charts. */
export function Screens({ active }: { active: boolean }) {
  const g = useRef<THREE.Group>(null);
  const screens = useMemo(() => COLS.map((col, j) => {
    const c = chartCanvas();
    const r = rng(11 + j * 97);
    const data = Array.from({ length: 32 }, () => 0.5);
    for (let i = 1; i < data.length; i++) data[i] = Math.min(0.95, Math.max(0.05, data[i - 1] + (r() - 0.47) * 0.12));
    drawChart(c, data, col);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    // toneMapped off + bright colour so bloom picks the screens up.
    const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, toneMapped: false, color: new THREE.Color(1.5, 1.5, 1.5) });
    return { c, r, data, tex, mat, col };
  }), []);
  useEffect(() => () => screens.forEach((s) => { s.tex.dispose(); s.mat.dispose(); }), [screens]);
  const last = useRef(0);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (g.current) g.current.position.y = Math.sin(t * 1.4) * 0.12;
    // Tick the charts ~6x a second (faster when this station is active).
    if (t - last.current < (active ? 0.16 : 0.5)) return;
    last.current = t;
    screens.forEach((s) => {
      s.data.shift();
      s.data.push(Math.min(0.95, Math.max(0.05, s.data[s.data.length - 1] + (s.r() - 0.47) * 0.12)));
      drawChart(s.c, s.data, s.col);
      s.tex.needsUpdate = true;
    });
  });
  return (
    <group ref={g}>
      {screens.map((s, j) => (
        <mesh key={j} material={s.mat} position={[(j - 1) * 1.3, j === 1 ? 0.25 : 0, j === 1 ? 0.2 : 0]} rotation-y={(1 - j) * 0.35}>
          <planeGeometry args={[1.5, 0.95]} />
        </mesh>
      ))}
    </group>
  );
}
