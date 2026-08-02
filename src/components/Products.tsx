import { products, statusLabel, statusColor } from '../data/products';
import SplitText from './SplitText';
import TiltCard from './TiltCard';
import Reveal from './Reveal';

/* Per-product accent used for the monogram tile and bullet glyphs */
const accent: Record<string, [string, string]> = {
  EN: ['#00f2fe', '#0ea5e9'],
  RP: ['#fb923c', '#f43f5e'],
  EP: ['#9d4edd', '#6366f1'],
  RG: ['#34d399', '#14b8a6'],
  RD: ['#f472b6', '#c026d3'],
  CW: ['#94a3b8', '#64748b'],
};

export default function Products() {
  return (
    <section id="products" className="relative px-5 md:px-8 py-28 md:py-36">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <Reveal className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-7
                            text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60
                            border border-white/12 bg-white/[0.03]">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#9d4edd' }} />
            The Ecosystem
          </Reveal>

          <SplitText
            lines={['Six products.', 'One standard.']}
            gradientFrom={1}
            className="font-display text-4xl md:text-6xl lg:text-[68px] font-bold
                       tracking-[-0.035em] leading-[1.0]"
          />

          <Reveal delay={160} className="mt-7 text-[16px] md:text-[17px] text-white/50 leading-relaxed">
            Every product ships to the same brief — software that saves the person
            using it fifteen minutes a day, or it doesn&rsquo;t ship at all.
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {products.map((p, i) => {
            const [a1, a2] = accent[p.code] ?? ['#00f2fe', '#9d4edd'];
            return (
              <Reveal key={p.code} delay={i * 90}>
                <TiltCard className="h-full p-7 md:p-8">
                  <div className="tilt-inner relative z-[1] flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl grid place-items-center
                                   font-display font-bold text-[15px] text-[#05070c]"
                        style={{
                          background: `linear-gradient(135deg, ${a1}, ${a2})`,
                          boxShadow: `0 10px 30px -10px ${a1}88`,
                        }}
                      >
                        {p.code}
                      </div>
                      <span className={`chip ${statusColor[p.status]}`}>
                        <span className="chip-dot" />
                        {statusLabel[p.status]}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl md:text-[27px] font-bold text-white tracking-[-0.02em]">
                      {p.name}
                    </h3>
                    <p className="mt-2.5 text-white/45 text-[14.5px] leading-relaxed">
                      {p.tagline}
                    </p>

                    <ul className="mt-6 space-y-3 flex-1">
                      {p.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 text-[14px] text-white/65 leading-snug">
                          <span
                            className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: a1, boxShadow: `0 0 8px ${a1}` }}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={p.href ?? '#contact'}
                      target={p.href ? '_blank' : undefined}
                      rel={p.href ? 'noreferrer' : undefined}
                      className="mt-7 inline-flex items-center gap-2 text-[13.5px] font-semibold
                                 transition-colors"
                      style={{ color: a1 }}
                    >
                      {p.href ? 'See it live' : 'Request a demo'}
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
