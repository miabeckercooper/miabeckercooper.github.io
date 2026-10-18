import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type ComponentType } from "react";
import * as THREE from "three";
import { stations } from "../content/cv";
import type { Emblem } from "../content/types";
import { TOWER_COLOURS, TOWER_HEIGHTS, TOWER_SPACING } from "../walk/layout";
import { walkStore } from "../walk/walkStore";
import { BacktestBars } from "./emblems/BacktestBars";
import { Discs } from "./emblems/Discs";
import { Gear } from "./emblems/Gear";
import { Globe } from "./emblems/Globe";
import { brass } from "./emblems/materials";
import { Screens } from "./emblems/Screens";
import { Vault } from "./emblems/Vault";
import { BELL_LINE, BELL_TOWER, bellStart, COL, easeOutCubic, labelTexture, live, smooth } from "./shared";

const EMBLEMS: Record<Emblem, ComponentType<{ active: boolean }>> = {
  gear: Gear, discs: Discs, screens: Screens, bars: BacktestBars, vault: Vault, globe: Globe,
};

const N = stations.length;
const X0 = (-TOWER_SPACING * (N - 1)) / 2;
const PLINTH = 0.3;
export const towerPos = (i: number) => new THREE.Vector3(X0 + i * TOWER_SPACING, 0, (i % 2) * -1.2);
const topY = (i: number) => PLINTH + TOWER_HEIGHTS[i];

/* ---------- Towers ---------- */

function Tower({ i, active }: { i: number; active: boolean }) {
  const s = stations[i];
  const h = TOWER_HEIGHTS[i];
  const rise = useRef<THREE.Group>(null);
  const emblem = useRef<THREE.Group>(null);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: TOWER_COLOURS[i], emissive: TOWER_COLOURS[i], emissiveIntensity: 0.12, roughness: 0.55, metalness: 0.2 }), [i]);
  const label = useMemo(() => labelTexture(s.n), [s.n]);
  useEffect(() => () => { mat.dispose(); label.dispose(); }, [mat, label]);
  const Em = EMBLEMS[s.emblem];

  useFrame(({ clock }) => {
    // Opening bell: each tower prints up from the floor, then its emblem pops in.
    const p = easeOutCubic((live.t - bellStart(i)) / BELL_TOWER);
    if (rise.current) rise.current.scale.y = Math.max(0.001, p);
    if (emblem.current) emblem.current.scale.setScalar(Math.max(0.001, smooth((live.t - bellStart(i) - BELL_TOWER * 0.7) / 0.4)));
    mat.emissiveIntensity = active ? 0.42 + Math.sin(clock.elapsedTime * 3) * 0.08 : 0.12;
  });

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    if (e.delta > 8) return; // a drag, not a tap
    e.stopPropagation();
    walkStore.go(i + 1);
  };

  return (
    <group position={towerPos(i)}>
      <mesh position-y={PLINTH / 2}>
        <boxGeometry args={[3.4, PLINTH, 3.4]} />
        <meshStandardMaterial color={COL.plinth} roughness={0.8} />
      </mesh>
      <group ref={rise}>
        <mesh
          material={mat}
          position-y={PLINTH + h / 2}
          onClick={onClick}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "")}
        >
          <boxGeometry args={[1.7, h, 1.7]} />
        </mesh>
        <mesh material={brass} position-y={PLINTH + (h + 1.6) / 2 - 0.2}>
          <boxGeometry args={[0.14, h + 1.6, 0.14]} />
        </mesh>
      </group>
      <group ref={emblem} position-y={topY(i) + 2.1}>
        <Em active={active} />
      </group>
      <sprite position={[0, 0.9, 2.2]} scale={[2, 1, 1]}>
        <spriteMaterial map={label} transparent depthWrite={false} />
      </sprite>
    </group>
  );
}

/* ---------- Gold price line and ticker tag ---------- */

function PriceLine() {
  const { geo, mat, total, tagPos } = useMemo(() => {
    const pts = stations.map((_, i) => towerPos(i).setY(topY(i) + 0.8));
    const curve = new THREE.CatmullRomCurve3(pts);
    const geo = new THREE.TubeGeometry(curve, 180, 0.07, 6, false);
    // Bright, untonemapped gold: the bloom pass picks it up.
    const mat = new THREE.MeshBasicMaterial({ color: COL.gold.clone().multiplyScalar(2.2), toneMapped: false });
    return { geo, mat, total: geo.index!.count, tagPos: pts[pts.length - 1].clone().add(new THREE.Vector3(1.9, 1.4, 0)) };
  }, []);
  const tagTex = useMemo(() => labelTexture("MBC ▲", "#1A1206", 256, 72, 38, "#E0AE5E"), []);
  const tag = useRef<THREE.Sprite>(null);
  useEffect(() => () => { geo.dispose(); mat.dispose(); tagTex.dispose(); }, [geo, mat, tagTex]);

  useFrame(() => {
    const p = smooth((live.t - BELL_LINE + 0.4) / 1.4);
    // Draw the tube progressively along its length (index order follows the curve).
    const segs = Math.floor((total / 6 / 6) * p) * 6 * 6;
    geo.setDrawRange(0, Math.max(0, Math.min(total, segs)));
    if (tag.current) {
      // The ticker tag lands on the last tower once the line arrives.
      const q = easeOutCubic((live.t - BELL_LINE - 1.0) / 0.6);
      tag.current.position.set(tagPos.x, tagPos.y + (1 - q) * 4, tagPos.z);
      tag.current.material.opacity = q;
    }
  });
  return (
    <>
      <mesh geometry={geo} material={mat} />
      <sprite ref={tag} scale={[3.2, 0.9, 1]}>
        <spriteMaterial map={tagTex} transparent depthWrite={false} opacity={0} />
      </sprite>
    </>
  );
}

/* ---------- Floor ---------- */

function Floor() {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(180, 90, 0x2c5560, 0x17313a);
    const m = g.material as THREE.Material;
    m.transparent = true; m.opacity = 0.55;
    g.position.y = 0.01;
    return g;
  }, []);
  return (
    <>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[260, 260]} />
        <meshLambertMaterial color={COL.floor} />
      </mesh>
      <primitive object={grid} />
    </>
  );
}

/* ---------- Camera: idle drift, scroll glide, click-to-fly ---------- */

function targetFor(k: number, wide: boolean, pos: THREE.Vector3, look: THREE.Vector3) {
  if (k === 0) {
    if (wide) { look.set(-9, 6.5, 0); pos.set(9, 20, 64); }
    else { look.set(2, 6.5, -1); pos.set(34, 20, 50); }
    return;
  }
  const p = towerPos(k - 1), top = topY(k - 1);
  if (wide) { look.set(p.x - 4.5, top * 0.75 + 0.5, p.z); pos.set(p.x - 1, top * 0.8 + 4, p.z + 14 + top * 1.6); }
  else { look.set(p.x, top * 0.8 + 2.4, p.z); pos.set(p.x + 1.5, top * 0.85 + 4, p.z + 15 + top * 1.7); }
}

function CameraRig() {
  const { camera, size } = useThree();
  const narrow = size.width <= 900;
  useEffect(() => {
    // On narrow screens the panel covers the lower half, so shift the picture up instead of shrinking the canvas.
    const cam = camera as THREE.PerspectiveCamera;
    if (narrow) cam.setViewOffset(size.width, size.height, 0, size.height * 0.24, size.width, size.height);
    else cam.clearViewOffset();
    cam.updateProjectionMatrix();
  }, [camera, narrow, size.width, size.height]);
  const cur = useRef({ pos: new THREE.Vector3(), look: new THREE.Vector3(), init: false });
  const a = useMemo(() => ({ p0: new THREE.Vector3(), l0: new THREE.Vector3(), p1: new THREE.Vector3(), l1: new THREE.Vector3(), p: new THREE.Vector3(), l: new THREE.Vector3() }), []);
  useFrame(({ clock }, dt) => {
    const wide = !narrow;
    const f = Math.max(0, Math.min(N, live.pos));
    const k0 = Math.floor(f), k1 = Math.min(N, k0 + 1);
    // Dwell at each station, glide between: the fraction is eased with a plateau at both ends.
    const frac = smooth((f - k0 - 0.2) / 0.6);
    targetFor(k0, wide, a.p0, a.l0);
    targetFor(k1, wide, a.p1, a.l1);
    a.p.lerpVectors(a.p0, a.p1, frac);
    a.l.lerpVectors(a.l0, a.l1, frac);
    const t = clock.elapsedTime;
    a.p.x += Math.sin(t * 0.25) * 0.8;
    a.p.y += Math.sin(t * 0.18) * 0.4;
    const c = cur.current;
    if (!c.init) {
      // Start a little higher and further back so the opening shot settles in.
      c.pos.copy(a.p).add(new THREE.Vector3(0, 6, 12));
      c.look.copy(a.l);
      c.init = true;
    }
    const k = 1 - Math.pow(0.001, dt);
    c.pos.lerp(a.p, k * 0.9);
    c.look.lerp(a.l, k);
    camera.position.copy(c.pos);
    camera.lookAt(c.look);
  });
  return null;
}

/* ---------- Clock for the opening bell ---------- */

function BellClock() {
  useFrame((_, dt) => { live.t += Math.min(dt, 0.1); });
  return null;
}

export function Scene({ step }: { step: number }) {
  return (
    <>
      <color attach="background" args={[COL.ink]} />
      <fog attach="fog" args={[COL.ink, 38, 110]} />
      <hemisphereLight args={[0xbfe6ee, 0x0a1418, 0.85]} />
      <directionalLight color={0xffd29a} intensity={1.4} position={[14, 26, 12]} />
      <directionalLight color={0x7fd0de} intensity={0.5} position={[-20, 10, -14]} />
      <BellClock />
      <Floor />
      {stations.map((s, i) => (
        <Tower key={s.n} i={i} active={step === i + 1} />
      ))}
      <PriceLine />
      <CameraRig />
    </>
  );
}
