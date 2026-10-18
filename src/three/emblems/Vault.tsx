import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { rng } from "../../lib/rng";
import { chartCanvas } from "../shared";
import { brass, steel } from "./materials";

/** Holographic risk dashboard: a drawdown-style bar strip and two KPI rails. Purely illustrative, no client data. */
function drawDashboard(c: HTMLCanvasElement, r: () => number, phase: number) {
  const g = c.getContext("2d")!;
  const { width: w, height: h } = c;
  g.clearRect(0, 0, w, h);
  g.fillStyle = "rgba(14,26,32,0.75)"; g.fillRect(0, 0, w, h);
  g.strokeStyle = "#6FD39E"; g.lineWidth = 2; g.strokeRect(2, 2, w - 4, h - 4);
  for (let i = 0; i < 14; i++) {
    const v = 0.25 + 0.6 * Math.abs(Math.sin(i * 1.7 + phase * 0.9)) * (0.7 + 0.3 * r());
    g.fillStyle = i % 5 === 3 ? "#F08A76" : "#7FD0DE";
    g.fillRect(14 + i * 16, h - 18 - v * (h * 0.5), 10, v * (h * 0.5));
  }
  g.strokeStyle = "#E0AE5E"; g.lineWidth = 3; g.beginPath();
  for (let x = 0; x <= 24; x++) { const y = 36 + Math.sin(x * 0.5 + phase) * 12; if (x) g.lineTo(14 + x * 9.3, y); else g.moveTo(14, y); }
  g.stroke();
}

/** 05 ANDBank: a vault wheel turning, with a holographic risk dashboard above it. */
export function Vault({ active }: { active: boolean }) {
  const wheel = useRef<THREE.Group>(null);
  const holo = useRef<THREE.Mesh>(null);
  const dash = useMemo(() => {
    const c = chartCanvas(256, 160);
    const r = rng(4242);
    drawDashboard(c, r, 0);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, toneMapped: false, color: new THREE.Color(1.4, 1.4, 1.4), depthWrite: false });
    return { c, r, tex, mat };
  }, []);
  useEffect(() => () => { dash.tex.dispose(); dash.mat.dispose(); }, [dash]);
  const last = useRef(0);
  const rise = useRef(0);
  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    if (wheel.current) wheel.current.rotation.y += dt * (active ? 1.4 : 0.4);
    rise.current = active ? Math.min(1, rise.current + dt * 0.8) : Math.max(0.6, rise.current - dt);
    if (holo.current) {
      holo.current.position.y = 1.2 + rise.current * 0.8 + Math.sin(t * 1.2) * 0.08;
      holo.current.scale.setScalar(0.5 + rise.current * 0.5);
    }
    if (t - last.current > 0.2) { last.current = t; drawDashboard(dash.c, dash.r, t); dash.tex.needsUpdate = true; }
  });
  return (
    <group>
      <group rotation-x={Math.PI / 2}>
        <mesh material={steel}><cylinderGeometry args={[1.0, 1.0, 0.25, 40]} /></mesh>
        <mesh material={brass} rotation-x={Math.PI / 2}><torusGeometry args={[1.02, 0.08, 10, 40]} /></mesh>
        <group ref={wheel} position-y={0.2}>
          {Array.from({ length: 3 }, (_, k) => (
            <mesh key={k} material={brass} rotation-y={(k / 3) * Math.PI}><boxGeometry args={[0.08, 0.1, 1.5]} /></mesh>
          ))}
          <mesh material={brass}><cylinderGeometry args={[0.18, 0.18, 0.16, 16]} /></mesh>
        </group>
      </group>
      <mesh ref={holo} material={dash.mat} position={[0, 1.9, -0.4]}>
        <planeGeometry args={[2.4, 1.5]} />
      </mesh>
    </group>
  );
}
