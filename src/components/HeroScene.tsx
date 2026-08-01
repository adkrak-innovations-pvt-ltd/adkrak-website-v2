import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import AuroraShader from './AuroraShader';

/* Slow-turning wireframe shells — depth cues over the aurora, never the focus */
function WireShells({ scrollP }: { scrollP: number }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (a.current) {
      a.current.rotation.x = t * 0.08 + py * 0.18;
      a.current.rotation.y = t * 0.11 + px * 0.18;
      a.current.position.z = -60 - scrollP * 140;
    }
    if (b.current) {
      b.current.rotation.x = -t * 0.06 - py * 0.12;
      b.current.rotation.y = -t * 0.09 - px * 0.12;
      b.current.position.z = -110 - scrollP * 180;
    }
    if (ring.current) {
      ring.current.rotation.x = Math.PI / 2.3 + Math.sin(t * 0.25) * 0.14;
      ring.current.rotation.z = t * 0.14;
      ring.current.position.z = -85 - scrollP * 160;
    }
  });

  return (
    <group>
      <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.9}>
        <Icosahedron ref={a} args={[17, 1]} position={[96, 20, -60]}>
          <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.10} />
        </Icosahedron>
      </Float>

      <Float speed={0.7} rotationIntensity={0.1} floatIntensity={0.7}>
        <Icosahedron ref={b} args={[24, 1]} position={[122, -26, -110]}>
          <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.07} />
        </Icosahedron>
      </Float>

      <Torus ref={ring} args={[40, 0.12, 8, 140]} position={[104, 6, -85]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.16} />
      </Torus>
    </group>
  );
}

function CameraRig({ scrollP }: { scrollP: number }) {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 14 - camera.position.x) * 0.035;
    camera.position.y += (pointer.y * 9 - scrollP * 26 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, -80);
  });
  return null;
}

export default function HeroScene({ scrollP }: { scrollP: number }) {
  return (
    <>
      {/* Aurora renders first, depth-disabled → sits behind everything */}
      <AuroraShader scrollP={scrollP} />

      <ambientLight intensity={0.4} />
      <pointLight position={[80, 60, 60]} intensity={1.4} color="#06b6d4" />
      <pointLight position={[-80, -40, 40]} intensity={1.1} color="#34d399" />

      <WireShells scrollP={scrollP} />
      <CameraRig scrollP={scrollP} />

      <EffectComposer>
        <Bloom
          intensity={0.85}
          luminanceThreshold={0.35}
          luminanceSmoothing={0.92}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.22} darkness={0.72} />
      </EffectComposer>
    </>
  );
}
