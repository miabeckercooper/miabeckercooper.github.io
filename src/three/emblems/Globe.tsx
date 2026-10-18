import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { places } from "../../content/cv";
import { brass } from "./materials";

/** Pin coordinates (lat, lon in degrees) for the places in cv.ts. Geography, not claims. */
const COORDS: Record<string, [number, number]> = {
  Bristol: [51.45, -2.59],
  Barcelona: [41.39, 2.17],
  Monaco: [43.74, 7.42],
  Copenhagen: [55.68, 12.57],
};

/** 06 CEMS: a wireframe globe with pins on Bristol, Barcelona, Monaco and Copenhagen. */
export function Globe({ active }: { active: boolean }) {
  const g = useRef<THREE.Group>(null);
  const wire = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x7fd0de, wireframe: true, transparent: true, opacity: 0.8 }), []);
  const pins = useMemo(() => places.map((p) => {
    const [lat, lon] = COORDS[p];
    const v = new THREE.Vector3().setFromSphericalCoords(1.12, THREE.MathUtils.degToRad(90 - lat), THREE.MathUtils.degToRad(lon));
    return { p, v };
  }), []);
  useFrame(({ clock }, dt) => {
    if (!g.current) return;
    // Idle spin; when active, ease round to face Europe and hold.
    if (active) {
      const r = g.current.rotation.y;
      const wrapped = ((((r + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI;
      g.current.rotation.y = wrapped + (-0.12 - wrapped) * Math.min(1, dt * 2);
    }
    else g.current.rotation.y += dt * 0.4;
    g.current.children.forEach((c, k) => { if (k > 0) c.scale.setScalar(1 + Math.sin(clock.elapsedTime * 3 + k) * 0.15); });
  });
  return (
    <group ref={g} rotation-x={0.35}>
      <mesh material={wire}><icosahedronGeometry args={[1.05, 2]} /></mesh>
      {pins.map(({ p, v }) => (
        <mesh key={p} material={brass} position={v}><sphereGeometry args={[0.09, 12, 12]} /></mesh>
      ))}
    </group>
  );
}
