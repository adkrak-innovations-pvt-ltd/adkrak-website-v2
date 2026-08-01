import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 260;
const BOX = { x: 380, y: 260, z: 220 };
const LINK_DIST = 60;
const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
const MAX_LINKS = 800;

function makeSpriteTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0.0, 'rgba(52,211,153,1)');
  g.addColorStop(0.35, 'rgba(6,182,212,0.55)');
  g.addColorStop(1.0, 'rgba(6,182,212,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

export default function Constellation() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { size } = useThree();

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * BOX.x * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * BOX.y * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * BOX.z * 2;
      vel.push({
        x: (Math.random() - 0.5) * 0.18,
        y: (Math.random() - 0.5) * 0.18,
        z: (Math.random() - 0.5) * 0.12,
      });
    }
    return { positions: pos, velocities: vel };
  }, []);

  const linePositions = useMemo(() => new Float32Array(MAX_LINKS * 6), []);
  const spriteTex = useMemo(() => makeSpriteTexture(), []);

  const pointsGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  const lineGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    g.setDrawRange(0, 0);
    return g;
  }, [linePositions]);

  useFrame(({ camera, pointer, clock }) => {
    // Move particles
    for (let i = 0; i < COUNT; i++) {
      const v = velocities[i];
      positions[i * 3 + 0] += v.x;
      positions[i * 3 + 1] += v.y;
      positions[i * 3 + 2] += v.z;
      if (positions[i * 3 + 0] > BOX.x) positions[i * 3 + 0] = -BOX.x;
      if (positions[i * 3 + 0] < -BOX.x) positions[i * 3 + 0] = BOX.x;
      if (positions[i * 3 + 1] > BOX.y) positions[i * 3 + 1] = -BOX.y;
      if (positions[i * 3 + 1] < -BOX.y) positions[i * 3 + 1] = BOX.y;
      if (positions[i * 3 + 2] > BOX.z) positions[i * 3 + 2] = -BOX.z;
      if (positions[i * 3 + 2] < -BOX.z) positions[i * 3 + 2] = BOX.z;
    }
    pointsGeom.attributes.position.needsUpdate = true;

    // Rebuild link web
    let idx = 0;
    let pair = 0;
    for (let i = 0; i < COUNT && pair < MAX_LINKS; i++) {
      for (let j = i + 1; j < COUNT && pair < MAX_LINKS; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < LINK_DIST_SQ) {
          linePositions[idx++] = positions[i * 3];
          linePositions[idx++] = positions[i * 3 + 1];
          linePositions[idx++] = positions[i * 3 + 2];
          linePositions[idx++] = positions[j * 3];
          linePositions[idx++] = positions[j * 3 + 1];
          linePositions[idx++] = positions[j * 3 + 2];
          pair++;
        }
      }
    }
    for (let k = idx; k < linePositions.length; k++) linePositions[k] = 0;
    lineGeom.attributes.position.needsUpdate = true;
    lineGeom.setDrawRange(0, pair * 2);

    // Camera drift
    const targetX = pointer.x * 60;
    const targetY = pointer.y * 40;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z = 340 + Math.sin(clock.elapsedTime * 0.4) * 6;
    camera.lookAt(0, 0, 0);
  });

  // Adaptive DPR handled at Canvas level
  void size;

  return (
    <>
      <points ref={pointsRef} geometry={pointsGeom}>
        <pointsMaterial
          size={7}
          map={spriteTex}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeom}>
        <lineBasicMaterial
          color={0x60a5fa}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}
