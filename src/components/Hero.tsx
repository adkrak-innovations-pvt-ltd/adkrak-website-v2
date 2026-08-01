import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Constellation from './Constellation';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 md:pt-32"
    >
      {/* 3D constellation backdrop */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 340], fov: 60, near: 0.1, far: 1500 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Constellation />
        </Canvas>
      </div>

      {/* Grid + gradient overlay */}
      <div className="absolute inset-0 z-[1] grid-bg pointer-events-none" />
      <div
        className="absolute inset-x-0 bottom-0 h-64 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(5,9,20,0.85) 60%, #050914 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 items-center w-full">
        <div className="md:col-span-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="pill mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Now incorporated — Adkrak Innovations Pvt Ltd
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display font-bold tracking-tight text-white text-5xl md:text-7xl lg:text-[86px] leading-[1.02]"
          >
            Your Vision,
            <br />
            <span className="grad-text">Architected to Perfection.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-8 max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed"
          >
            Vertical SaaS built for the industries that keep real life moving —
            restaurants, schools, exams and roads. Mobile-first, India-priced,
            <span className="text-white"> shipping from Kerala</span>.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#products" className="btn btn-primary">
              Explore products <span>→</span>
            </a>
            <a href="#founders" className="btn btn-ghost">
              Meet the founders
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400"
          >
            <span>🇮🇳 100% Made in India</span>
            <span>⚡ Shipping from Kerala</span>
            <span>🔒 Data stays in-country</span>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="md:col-span-4 hidden md:block"
        >
          <div className="grad-border-glow p-6 relative">
            <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500 mb-3">
              The stack we build on
            </div>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Product suite live', value: '6' },
                { label: 'Demos in market', value: '2' },
                { label: 'Cofounders', value: '3' },
                { label: 'Bugs we tolerate', value: '0' },
              ].map((s) => (
                <li key={s.label} className="flex items-baseline justify-between">
                  <span className="text-slate-400">{s.label}</span>
                  <span className="font-display font-bold text-2xl grad-text">
                    {s.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
