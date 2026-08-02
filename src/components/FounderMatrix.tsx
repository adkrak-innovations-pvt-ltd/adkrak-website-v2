import { founders } from '../data/founders';
import { asset } from '../lib/asset';
import SplitText from './SplitText';
import TiltCard from './TiltCard';
import Reveal from './Reveal';

const glow: Record<string, string> = {
  AD: '#00f2fe',
  KR: '#34d399',
  AK: '#f59e0b',
};

export default function FounderMatrix() {
  return (
    <section id="founders" className="relative px-5 md:px-8 py-28 md:py-36">
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <Reveal className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-7
                            text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60
                            border border-white/12 bg-white/[0.03]">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00f2fe' }} />
            The Founders
          </Reveal>

          <SplitText
            lines={['AD · KR · AK']}
            gradientFrom={0}
            className="font-display text-5xl md:text-7xl lg:text-[80px] font-bold
                       tracking-[-0.04em] leading-[1.0]"
          />

          <Reveal delay={160} className="mt-7 text-[16px] md:text-[17px] text-white/50">
            <span className="text-[#00f2fe] font-semibold">AD</span>arsh · Jai
            <span className="text-[#34d399] font-semibold">KR</span>ishna ·{' '}
            <span className="text-[#f59e0b] font-semibold">AK</span>ash — the three
            names inside Adkrak. Engineering, finance and growth under one roof.
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {founders.map((f, i) => (
            <Reveal key={f.monogram} delay={i * 110}>
              <TiltCard className="h-full" maxTilt={6}>
                <div className="tilt-inner relative z-[1]">
                  {/* Portrait */}
                  <div className="relative aspect-[4/5] overflow-hidden group">
                    {f.photo ? (
                      <img
                        src={asset(f.photo)}
                        alt={f.name}
                        className="absolute inset-0 w-full h-full object-cover object-top
                                   scale-[1.02] group-hover:scale-[1.06]
                                   transition-transform duration-[1200ms] ease-out"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 grid place-items-center
                                   font-display font-black text-7xl text-white"
                        style={{ background: `linear-gradient(135deg, ${glow[f.monogram]}, #1e293b)` }}
                      >
                        {f.monogram}
                      </div>
                    )}

                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(8,11,17,0) 38%, rgba(8,11,17,0.72) 68%, rgba(8,11,17,0.98) 100%)',
                      }}
                    />

                    <div className="absolute top-5 left-5">
                      <span
                        className="px-3 py-1.5 rounded-lg font-display font-bold text-[13px]
                                   tracking-[0.18em] text-[#05070c]"
                        style={{
                          background: `linear-gradient(135deg, ${glow[f.monogram]}, #ffffff)`,
                          boxShadow: `0 8px 26px -8px ${glow[f.monogram]}`,
                        }}
                      >
                        {f.monogram}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-display font-bold text-white text-[26px] leading-tight tracking-[-0.02em]">
                        {f.name}
                      </h3>
                      <div
                        className="mt-2 text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                        style={{ color: glow[f.monogram] }}
                      >
                        {f.roles.join(' · ')}
                      </div>
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="p-6 lg:p-7">
                    <p className="text-white/70 text-[14.5px] italic leading-relaxed relative pl-5">
                      <span
                        className="absolute left-0 -top-1 text-3xl font-serif leading-none"
                        style={{ color: `${glow[f.monogram]}66` }}
                      >
                        &ldquo;
                      </span>
                      {f.quote}
                    </p>
                    <p className="mt-5 text-white/40 text-[13.5px] leading-relaxed">
                      {f.bio}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
