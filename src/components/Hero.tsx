import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useReducedMotion } from 'framer-motion';
import HeroScene from './HeroScene';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ---------------- Cinematic mask-reveal word ---------------- */
function RevealWord({
  text,
  delay = 0,
  className = '',
  gradient = false,
}: {
  text: string;
  delay?: number;
  className?: string;
  gradient?: boolean;
}) {
  // Under prefers-reduced-motion Framer skips transform animations, which
  // would strand the word outside its mask and leave it permanently
  // invisible. In that mode drop the transform and fade in only.
  const reduce = useReducedMotion();

  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        className={`inline-block ${gradient ? 'grad-text' : ''}`}
        initial={reduce ? { opacity: 0 } : { y: '110%', rotateX: -55, opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { y: '0%', rotateX: 0, opacity: 1 }}
        transition={{ duration: reduce ? 0.4 : 1.25, delay, ease: EASE }}
        style={reduce ? undefined : { transformOrigin: 'bottom center' }}
      >
        {text}
      </motion.span>
    </span>
  );
}

/* ---------------- Letter-by-letter kinetic line ---------------- */
function KineticLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <span className="inline-flex flex-wrap">
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.022,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [scrollP, setScrollP] = useState(0);

  // DOM content drifts up + fades as the user scrolls through the hero.
  // Driven from scrollP so it stays in lockstep with the shader.
  const fade = Math.min(1, scrollP * 1.7);
  const contentY = -140 * scrollP;
  const contentOpacity = 1 - fade;
  const contentBlur = `blur(${(9 * fade).toFixed(2)}px)`;

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, window.innerHeight * 1.15);
      setScrollP(Math.min(1, window.scrollY / max));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Fixed cinematic backdrop */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 120], fov: 55, near: 0.1, far: 2000 }}
          dpr={[1, 2]}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <HeroScene scrollP={scrollP} />
        </Canvas>
      </div>

      {/* Bottom fade into page background */}
      <div
        className="absolute inset-x-0 bottom-0 h-72 z-[2] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(5,9,20,0.78) 55%, #050914 100%)',
        }}
      />

      {/* ---------------- Content ---------------- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, filter: contentBlur }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-28"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="pill mb-9"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Now incorporated — Adkrak Innovations Pvt Ltd
        </motion.div>

        {/* Headline */}
        <h1
          className="font-display font-bold tracking-[-0.03em] text-white
                     text-[13vw] sm:text-[10vw] md:text-[7.4vw] lg:text-[6.6vw]
                     leading-[0.94]"
          style={{ perspective: '900px' }}
        >
          <RevealWord text="Your Vision," delay={0.35} />
          <br />
          <RevealWord text="Architected" delay={0.52} gradient />{' '}
          <RevealWord text="to" delay={0.66} gradient />{' '}
          <RevealWord text="Perfection." delay={0.78} gradient />
        </h1>

        {/* Sub-line */}
        <div className="mt-9 max-w-2xl text-lg md:text-xl text-slate-300/90 leading-relaxed">
          <KineticLine
            text="Vertical SaaS for the industries that keep real life moving."
            delay={1.35}
          />
        </div>

        {/* Rule + meta */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left center' }}
          className="mt-10 h-px w-full max-w-xl bg-gradient-to-r from-cyan-400/70 via-emerald-400/40 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.95 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a href="#products" className="btn btn-primary">
            Explore products <span>→</span>
          </a>
          <a href="#founders" className="btn btn-ghost">
            Meet the founders
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 2.2 }}
          className="mt-12 flex flex-wrap gap-x-9 gap-y-3 text-[13px] tracking-wide text-slate-400/90"
        >
          <span>🇮🇳 100% Made in India</span>
          <span>⚡ Shipping from Kerala</span>
          <span>🔒 Data stays in-country</span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.6 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.32em] text-slate-500">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 9, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-9 bg-gradient-to-b from-cyan-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
