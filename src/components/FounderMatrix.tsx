import { founders } from '../data/founders';
import Reveal from './Reveal';
import { asset } from '../lib/asset';

export default function FounderMatrix() {
  return (
    <section id="founders" className="relative px-4 md:px-6 py-20 md:py-28">
      <div className="max-w-[1180px] mx-auto">
        <Reveal className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-[-0.025em] text-[#0d2b4d] leading-[1.04]">
            The three that make ADKRAK
          </h2>
          <p className="mt-6 text-[17px] md:text-lg text-[#2c5479]">
            <span className="font-bold text-[#0e7490]">AD</span>arsh ·{' '}
            <span className="font-bold text-[#0f766e]">KR</span>ishna ·{' '}
            <span className="font-bold text-[#c2410c]">AK</span>ash — engineering,
            operations and growth under one roof.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {founders.map((f, i) => (
            <Reveal
              as="article"
              key={f.monogram}
              delay={i * 120}
              className="panel group bg-white"
            >
              {/* Portrait */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0c1a2c]">
                {f.photo ? (
                  <img
                    src={asset(f.photo)}
                    alt={f.name}
                    className="absolute inset-0 w-full h-full object-cover object-top
                               scale-[1.02] group-hover:scale-[1.06]
                               transition-transform duration-[1100ms] ease-out"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 grid place-items-center font-display
                                font-black text-7xl text-white bg-gradient-to-br ${f.gradient}`}
                  >
                    {f.monogram}
                  </div>
                )}

                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(12,26,44,0) 42%, rgba(12,26,44,0.62) 70%, rgba(12,26,44,0.94) 100%)',
                  }}
                />

                <div className="absolute top-5 left-5">
                  <span
                    className={`px-3 py-1.5 rounded-lg font-display font-bold text-[13px]
                                tracking-[0.16em] text-white bg-gradient-to-br ${f.gradient}`}
                    style={{ boxShadow: '0 8px 22px -8px rgba(0,0,0,0.7)' }}
                  >
                    {f.monogram}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display font-bold text-white text-[25px] leading-tight">
                    {f.name}
                  </h3>
                  <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                    {f.roles.join(' · ')}
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="p-6 lg:p-7">
                <p className="text-[#1c3f63] text-[15px] italic leading-relaxed relative pl-5">
                  <span className="absolute left-0 -top-1 text-cyan-500/45 text-3xl font-serif leading-none">
                    &ldquo;
                  </span>
                  {f.quote}
                </p>
                <p className="mt-5 text-[#4a6b8a] text-[14px] leading-relaxed">
                  {f.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
