import { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshReflectorMaterial, Float, Environment, Lightformer } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

/* ------------------------------------------------------------------
   An environment, not a backdrop: a mirrored floor under a drifting
   particle field, monolith forms receding into fog, and a camera that
   travels forward on scroll.
   ------------------------------------------------------------------ */

const CYAN = new THREE.Color('#00f2fe');
const PURPLE = new THREE.Color('#9d4edd');

/* ---------------- Particle wave field ---------------- */
const GRID = 120;
const SPAN = 40;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uPointer;
  uniform float uVelocity;
  attribute float aRand;
  varying float vHeight;
  varying float vRadius;
  varying float vRand;

  void main() {
    vec3 p = position;

    float w1 = sin(p.x * 0.28 + uTime * 0.80) * 0.66;
    float w2 = cos(p.y * 0.22 - uTime * 0.62) * 0.58;
    float w3 = sin((p.x + p.y) * 0.15 + uTime * 0.40) * 0.42;
    float h = w1 + w2 + w3;

    float d = distance(p.xy, uPointer);
    float falloff = exp(-d * 0.16);
    h += sin(d * 1.4 - uTime * 5.0) * falloff * (0.6 + uVelocity * 3.6);

    float r = length(p.xy);
    h -= r * r * 0.006;
    p.z = h;

    vHeight = h;
    vRadius = r;
    vRand = aRand;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (2.2 + aRand * 1.6 + falloff * 4.0) * (30.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform vec3 uCyan;
  uniform vec3 uPurple;
  uniform float uTime;
  varying float vHeight;
  varying float vRadius;
  varying float vRand;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float dist = length(c);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, dist);

    float mixer = clamp(vHeight * 0.34 + vRadius * 0.032 + 0.42, 0.0, 1.0);
    vec3 col = mix(uCyan, uPurple, mixer);
    col += vec3(0.5, 0.8, 1.0) * smoothstep(0.6, 1.6, vHeight) * 0.55;
    col *= 0.82 + 0.18 * sin(uTime * 1.5 + vRand * 40.0);

    float edge = 1.0 - smoothstep(12.0, 20.0, vRadius);
    gl_FragColor = vec4(col, alpha * edge * 0.95);
  }
`;

function ParticleField() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const prev = useRef(new THREE.Vector2());
  const vel = useRef(0);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = GRID * GRID;
    const pos = new Float32Array(n * 3);
    const rand = new Float32Array(n);
    let i = 0;
    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        pos[i * 3] = (x / (GRID - 1) - 0.5) * SPAN;
        pos[i * 3 + 1] = (y / (GRID - 1) - 0.5) * SPAN;
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
      uPointer: { value: new THREE.Vector2() },
      uVelocity: { value: 0 },
      uCyan: { value: CYAN.clone() },
      uPurple: { value: PURPLE.clone() },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;

    const t = new THREE.Vector2(
      state.pointer.x * (viewport.width / 2) * 1.6,
      state.pointer.y * (viewport.height / 2) * 1.6
    );
    const speed = t.distanceTo(prev.current) / Math.max(delta, 1e-4);
    vel.current += (Math.min(speed / 60, 1.4) - vel.current) * 0.09;
    prev.current.copy(t);

    (u.uPointer.value as THREE.Vector2).lerp(t, 0.12);
    u.uVelocity.value = vel.current;
  });

  return (
    <points geometry={geometry} rotation={[-Math.PI / 2.42, 0, 0]} position={[0, 3.4, -6]}>
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

/* ---------------- Mirrored floor ---------------- */
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.4, 0]}>
      <planeGeometry args={[90, 90]} />
      <MeshReflectorMaterial
        blur={[380, 110]}
        resolution={1024}
        mixBlur={1}
        mixStrength={62}
        roughness={0.92}
        depthScale={1.15}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.35}
        color="#070a10"
        metalness={0.72}
        mirror={0}
      />
    </mesh>
  );
}

/* ---------------- Monolith forms receding into fog ---------------- */
function Monoliths() {
  const forms = useMemo(
    () =>
      [
        { p: [-8.5, -0.6, -6], s: [1.5, 6.2, 1.5], r: 0.22, c: '#0b2a3a' },
        { p: [9.2, 0.4, -9], s: [2.0, 8.4, 2.0], r: -0.3, c: '#160f2e' },
        { p: [-13, 1.1, -15], s: [2.6, 11, 2.6], r: 0.15, c: '#0a1f33' },
        { p: [14.5, -0.2, -19], s: [3.0, 9.5, 3.0], r: -0.18, c: '#150d29' },
        { p: [-5.5, 2.2, -26], s: [2.2, 13, 2.2], r: 0.35, c: '#09202e' },
        { p: [6.5, 1.6, -31], s: [2.8, 12, 2.8], r: -0.24, c: '#130c25' },
      ] as const,
    []
  );

  return (
    <group>
      {forms.map((f, i) => (
        <Float key={i} speed={0.5 + i * 0.08} rotationIntensity={0.05} floatIntensity={0.5}>
          <mesh position={f.p as unknown as [number, number, number]} rotation={[0, f.r, 0]}>
            <boxGeometry args={f.s as unknown as [number, number, number]} />
            <meshStandardMaterial
              color={f.c}
              metalness={0.88}
              roughness={0.24}
              envMapIntensity={1.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ---------------- The glowing orb at the centre ---------------- */
function Orb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = -1.35 + Math.sin(t * 0.6) * 0.22;
    ref.current.rotation.y = t * 0.16;
  });

  return (
    <Float speed={1.1} floatIntensity={0.7}>
      <mesh ref={ref} position={[4.2, -1.35, -13]}>
        <sphereGeometry args={[1.55, 64, 64]} />
        <meshStandardMaterial
          color="#7cc7ff"
          emissive="#4aa8ff"
          emissiveIntensity={1.15}
          roughness={0.16}
          metalness={0.2}
        />
      </mesh>
      <pointLight position={[4.2, -1.35, -13]} intensity={30} distance={30} color="#5ec8ff" />
    </Float>
  );
}

/* ---------------- Camera travels forward on scroll ---------------- */
function Rig({ scrollP }: { scrollP: number }) {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 2.2 - camera.position.x) * 0.035;
    camera.position.y += (1.4 + pointer.y * 1.0 + scrollP * 2.4 - camera.position.y) * 0.035;
    // travel INTO the scene as the hero un-pins
    camera.position.z += (11 - scrollP * 15 - camera.position.z) * 0.045;
    camera.lookAt(0, 0.4 - scrollP * 0.8, -6);
  });
  return null;
}

function Scene({ scrollP }: { scrollP: number }) {
  return (
    <>
      <color attach="background" args={['#080b11']} />
      <fog attach="fog" args={['#080b11', 12, 46]} />

      <ambientLight intensity={0.28} />
      <directionalLight position={[6, 10, 4]} intensity={0.9} color="#9fd8ff" />
      <pointLight position={[-12, 4, -8]} intensity={26} distance={40} color="#00f2fe" />
      <pointLight position={[12, 3, -14]} intensity={22} distance={40} color="#9d4edd" />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.4} color="#00f2fe" position={[-8, 4, -6]} scale={[10, 8, 1]} />
        <Lightformer form="rect" intensity={2.0} color="#9d4edd" position={[8, 2, -8]} scale={[10, 8, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#ffffff" position={[0, 9, -4]} scale={[14, 4, 1]} />
      </Environment>

      <Floor />
      <Monoliths />
      <Orb />
      <ParticleField />
      <Rig scrollP={scrollP} />

      <EffectComposer>
        <Bloom intensity={1.25} luminanceThreshold={0.24} luminanceSmoothing={0.9} mipmapBlur />
        <ChromaticAberration
          offset={[0.0007, 0.0007]}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette eskil={false} offset={0.22} darkness={0.78} />
      </EffectComposer>
    </>
  );
}

export default function WaveField() {
  const [scrollP, setScrollP] = useState(0);

  // R3F sizes the canvas from a ResizeObserver on its container. That observer
  // does not fire while the document is hidden, so a canvas mounted in a
  // background tab stays stuck at the 300x150 HTML default even after the tab
  // is focused. Nudge a measurement on mount and whenever we become visible.
  useEffect(() => {
    // setTimeout, not rAF: rAF is paused while hidden, which is exactly
    // the case we need to recover from.
    const nudge = () => window.dispatchEvent(new Event('resize'));
    const t0 = setTimeout(nudge, 0);
    const t1 = setTimeout(nudge, 300);
    const onVis = () => { if (!document.hidden) nudge(); };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

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
      camera={{ position: [0, 1.4, 11], fov: 48, near: 0.1, far: 120 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      /* NOTE: R3F REPLACES its default container styles when `style` is
         passed, which collapses the wrapper and drops the canvas to the
         300x150 HTML default. Width/height must be restated here. */
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <Scene scrollP={scrollP} />
    </Canvas>
  );
}
