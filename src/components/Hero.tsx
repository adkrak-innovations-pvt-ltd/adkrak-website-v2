import { Suspense, lazy, useEffect, useState } from 'react';
import SplitText from './SplitText';

const WaveField = lazy(() => import('./WaveField'));

export default function Hero() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, window.innerHeight);
      setP(Math.min(1, window.scrollY / max));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    /* Two viewports tall: the inner layer is sticky, so the hero copy stays
       pinned while the canvas beneath it morphs on scroll. */
    <section id="top" className="relative h-[200svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* WebGL wave field */}
        <div className="absolute inset-0 z-0" aria-hidden>
          <Suspense fallback={null}>
            <WaveField />
          </Suspense>
        </div>

        <div className="absolute inset-0 z-[1] grid-overlay pointer-events-none" />

        {/* Bottom fade into the page */}
        <div
          className="absolute inset-x-0 bottom-0 h-64 z-[2] pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, transparent, rgba(8,11,17,0.86) 62%, #080b11 100%)',
          }}
        />

        {/* Pinned copy — fades as the field takes over */}
        <div
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
          style={{
            opacity: 1 - Math.min(1, p * 1.35),
            transform: `translateY(${-p * 70}px)`,
          }}
        >
          <div
            className="rise inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 mb-9
                       text-[12.5px] font-semibold text-white/85
                       border border-white/15 bg-white/[0.04] backdrop-blur-md"
            style={{ '--d': '120ms' } as React.CSSProperties}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#00f2fe', boxShadow: '0 0 10px #00f2fe' }}
            />
            Now incorporated — Adkrak Innovations Pvt Ltd
          </div>

          <SplitText
            as="h1"
            lines={['Your Vision,', 'Architected to Perfection.']}
            gradientFrom={1}
            className="font-display font-bold tracking-[-0.035em]
                       text-[11.5vw] sm:text-6xl md:text-7xl lg:text-[86px]
                       leading-[0.98] max-w-5xl"
          />

          <p
            className="rise mt-8 max-w-2xl text-[16px] md:text-[19px] text-white/60 leading-relaxed"
            style={{ '--d': '900ms' } as React.CSSProperties}
          >
            Vertical SaaS for restaurants, schools, exams and roads.
            Mobile-first, India-priced, built in Kerala.
          </p>

          <div
            className="rise mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{ '--d': '1050ms' } as React.CSSProperties}
          >
            <a href="#products" className="btn btn-primary">
              Explore products <span aria-hidden>→</span>
            </a>
            <a
              href="https://wa.me/917012837825"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              Talk to a founder
            </a>
          </div>

          <div
            className="rise mt-14 text-[11px] uppercase tracking-[0.32em] text-white/35"
            style={{ '--d': '1250ms' } as React.CSSProperties}
          >
            AD · KR · AK
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ opacity: 1 - Math.min(1, p * 2) }}
        >
          <span className="text-[10px] uppercase tracking-[0.34em] text-white/30">
            Scroll
          </span>
          <div
            className="w-px h-10"
            style={{ background: 'linear-gradient(180deg, #00f2fe, transparent)' }}
          />
        </div>
      </div>
    </section>
  );
}
