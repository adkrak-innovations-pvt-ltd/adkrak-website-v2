import { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ------------------------------------------------------------------
   Interactive 3D particle wave field.
   A grid of points displaced by travelling sine waves, deformed further
   by a cursor "wake" whose strength scales with pointer VELOCITY, so
   fast flicks push a visible ripple through the mesh.
   Colour lerps deep cyan -> electric purple across height + radius.
   ------------------------------------------------------------------ */

const GRID = 132;          // points per side
const SPAN = 34;           // world units across
const CYAN = new THREE.Color('#00f2fe');
const PURPLE = new THREE.Color('#9d4edd');

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uPointer;      // world-space cursor
  uniform float uVelocity;     // smoothed pointer speed
  uniform float uScroll;

  attribute float aRand;

  varying float vHeight;
  varying float vRadius;
  varying float vRand;

  void main() {
    vec3 p = position;

    // --- travelling wave stack ---
    float w1 = sin(p.x * 0.30 + uTime * 0.85) * 0.62;
    float w2 = cos(p.y * 0.24 - uTime * 0.65) * 0.55;
    float w3 = sin((p.x + p.y) * 0.16 + uTime * 0.42) * 0.40;
    float h = w1 + w2 + w3;

    // --- cursor wake: a ripple that rides on pointer velocity ---
    float d = distance(p.xy, uPointer);
    float falloff = exp(-d * 0.17);
    float ripple = sin(d * 1.5 - uTime * 5.2) * falloff;
    h += ripple * (0.55 + uVelocity * 3.4);

    // gentle dome so the field reads as a surface, not a plane
    float r = length(p.xy);
    h -= r * r * 0.0075;

    p.z = h;

    vHeight = h;
    vRadius = r;
    vRand = aRand;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // Perspective-correct point size, with a lift near the cursor
    float size = 2.1 + aRand * 1.5 + falloff * 3.6 * (0.4 + uVelocity * 5.0);
    gl_PointSize = size * (26.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3  uCyan;
  uniform vec3  uPurple;
  uniform float uTime;

  varying float vHeight;
  varying float vRadius;
  varying float vRand;

  void main() {
    // round, soft-edged point
    vec2 c = gl_PointCoord - 0.5;
    float dist = length(c);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.06, dist);

    // colour: crest height + distance from centre drive the cyan->purple mix
    float mixer = clamp(vHeight * 0.36 + vRadius * 0.035 + 0.42, 0.0, 1.0);
    vec3 col = mix(uCyan, uPurple, mixer);

    // crests glow hotter
    float crest = smoothstep(0.55, 1.5, vHeight);
    col += vec3(0.55, 0.85, 1.0) * crest * 0.5;

    // subtle per-point shimmer
    float tw = 0.82 + 0.18 * sin(uTime * 1.6 + vRand * 40.0);
    col *= tw;

    // fade the far edges into the void
    float edge = 1.0 - smoothstep(11.0, 18.0, vRadius);

    gl_FragColor = vec4(col, alpha * edge * 0.95);
  }
`;

function Field({ scrollP }: { scrollP: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // Grid geometry with a per-point random for shimmer
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = GRID * GRID;
    const pos = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    let i = 0;
    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        pos[i * 3 + 0] = (x / (GRID - 1) - 0.5) * SPAN;
        pos[i * 3 + 1] = (y / (GRID - 1) - 0.5) * SPAN;
        pos[i * 3 + 2] = 0;
        rand[i] = Math.random();
        i++;
      }
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uVelocity: { value: 0 },
      uScroll: { value: 0 },
      uCyan: { value: CYAN.clone() },
      uPurple: { value: PURPLE.clone() },
    }),
    []
  );

  // Pointer tracking with velocity
  const prev = useRef(new THREE.Vector2(0, 0));
  const smoothVel = useRef(0);

  useFrame((state, delta) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;

    // pointer (-1..1) -> world units on the field plane
    const wx = state.pointer.x * (viewport.width / 2) * 1.5;
    const wy = state.pointer.y * (viewport.height / 2) * 1.5;
    const target = new THREE.Vector2(wx, wy);

    // instantaneous speed, then smoothed so the wake decays rather than snaps
    const speed = target.distanceTo(prev.current) / Math.max(delta, 0.0001);
    smoothVel.current += (Math.min(speed / 60, 1.4) - smoothVel.current) * 0.09;
    prev.current.copy(target);

    (u.uPointer.value as THREE.Vector2).lerp(target, 0.12);
    u.uVelocity.value = smoothVel.current;
    u.uScroll.value = scrollP;
  });

  return (
    <points geometry={geometry} rotation={[-Math.PI / 2.62, 0, 0]} position={[0, -1.6, 0]}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* Camera drifts with cursor and pulls back as the hero un-pins */
function Rig({ scrollP }: { scrollP: number }) {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 1.6 - camera.position.x) * 0.04;
    camera.position.y += (5.2 + pointer.y * 0.9 + scrollP * 3.2 - camera.position.y) * 0.04;
    camera.position.z += (13.5 + scrollP * 6 - camera.position.z) * 0.04;
    camera.lookAt(0, -1.2, 0);
  });
  return null;
}

export default function WaveField() {
  const [scrollP, setScrollP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, window.innerHeight);
      setScrollP(Math.min(1, window.scrollY / max));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 5.2, 13.5], fov: 46, near: 0.1, far: 120 }}
      dpr={[1, 1.9]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <Field scrollP={scrollP} />
      <Rig scrollP={scrollP} />
      <EffectComposer>
        <Bloom
          intensity={1.15}
          luminanceThreshold={0.28}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.24} darkness={0.72} />
      </EffectComposer>
    </Canvas>
  );
}
