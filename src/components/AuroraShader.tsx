import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Full-screen flowing aurora / liquid-metal shader.
 * Domain-warped fractal noise, brand-tinted, reacts to cursor + scroll.
 */
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform float uScroll;

  // --- simplex-ish noise (Ashima) ---
  vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // fractal brownian motion — few octaves keeps shapes large and cinematic
  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for(int i = 0; i < 4; i++){
      v += a * snoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  // Soft elliptical light veil with noise-warped edges
  float veil(vec2 p, vec2 centre, vec2 radius, float warp){
    vec2 d = (p - centre) / radius;
    float r = length(d);
    return smoothstep(1.0, 0.0, r + warp * 0.35);
  }

  void main(){
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    float t = uTime * 0.045;

    vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
    float mdist = length(p - m);

    // Single low-frequency warp field — drives every veil's edge
    float w1 = fbm(p * 0.75 + vec2(0.0, t));
    float w2 = fbm(p * 0.60 + vec2(4.1, -t * 0.8));

    // --- brand palette ---
    vec3 teal    = vec3(0.024, 0.714, 0.831);
    vec3 emerald = vec3(0.204, 0.827, 0.600);
    vec3 steel   = vec3(0.118, 0.227, 0.435);

    // Near-black base — the page background, essentially
    vec3 col = vec3(0.019, 0.035, 0.078);

    // --- three large drifting light veils ---
    vec2 c1 = vec2(-0.42 + sin(t * 1.5) * 0.10, 0.20 + cos(t * 1.1) * 0.07);
    vec2 c2 = vec2( 0.46 + cos(t * 1.2) * 0.11, -0.16 + sin(t * 1.6) * 0.08);
    vec2 c3 = vec2( 0.06 + sin(t * 0.9) * 0.14, 0.34 + cos(t * 1.4) * 0.06);

    float v1 = veil(p, c1, vec2(0.62, 0.40), w1);
    float v2 = veil(p, c2, vec2(0.54, 0.34), w2);
    float v3 = veil(p, c3, vec2(0.46, 0.26), w1 * 0.7 + w2 * 0.3);

    col += steel   * v1 * 0.42;
    col += teal    * v2 * 0.26;
    col += emerald * v3 * 0.15;

    // A single soft filament arc for movement, kept faint
    float arc = 1.0 - abs(w1 * 0.9 + w2 * 0.4);
    arc = pow(max(arc, 0.0), 14.0);
    col += teal * arc * 0.30;

    // Cursor bloom
    col += (teal * 0.5 + emerald * 0.3) * smoothstep(0.62, 0.0, mdist) * 0.16;

    // Scroll dims the field
    col *= (1.0 - uScroll * 0.65);

    // Vignette to true black at the edges
    float vig = 1.0 - smoothstep(0.28, 1.05, length(uv - 0.5) * 1.7);
    col *= mix(0.10, 1.0, vig);

    // Keep the left band (headline copy) reliably dark
    float textGuard = smoothstep(0.05, 0.68, uv.x);
    col *= mix(0.38, 1.0, textGuard);

    // Gentle tone curve — never lets highlights approach white
    col = col / (col + vec3(1.25));

    // Grain kills banding across the large soft gradients
    float grain = fract(sin(dot(uv * uResolution, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.016;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function AuroraShader({ scrollP }: { scrollP: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uResolution.value.set(size.width, size.height);
    // pointer is -1..1 → map to 0..1, damped
    const tx = state.pointer.x * 0.5 + 0.5;
    const ty = state.pointer.y * 0.5 + 0.5;
    u.uMouse.value.x += (tx - u.uMouse.value.x) * 0.045;
    u.uMouse.value.y += (ty - u.uMouse.value.y) * 0.045;
    u.uScroll.value += (scrollP - u.uScroll.value) * 0.08;
  });

  void viewport;

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
