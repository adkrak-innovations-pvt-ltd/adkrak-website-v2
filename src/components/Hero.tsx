/* The four-pane brand mark — AD · KR · AK plus the whole.
   Panes lift in one after another via CSS, so they can never be
   left stranded invisible if the animation engine doesn't run. */
function BrandMark() {
  const panes = [
    { label: 'AD', a: 0.34, b: 0.14 },
    { label: 'KR', a: 0.30, b: 0.11 },
    { label: 'AK', a: 0.28, b: 0.10 },
    { label: '', a: 0.24, b: 0.08 },
  ];

  return (
    <div
      className="grid grid-cols-2 gap-3 md:gap-4 mx-auto"
      style={{ width: 'min(62vw, 330px)' }}
    >
      {panes.map((p, i) => (
        <div
          key={i}
          className="rise rounded-xl grid place-items-center backdrop-blur-sm"
          style={
            {
              '--d': `${350 + i * 110}ms`,
              aspectRatio: '1',
              background: `linear-gradient(135deg, rgba(255,255,255,${p.a}), rgba(255,255,255,${p.b}))`,
              border: '1px solid rgba(255,255,255,0.42)',
              boxShadow: '0 12px 36px -14px rgba(10,40,80,0.45)',
            } as React.CSSProperties
          }
        >
          <span
            className="font-display font-bold text-white/85 tracking-[0.14em]"
            style={{ fontSize: 'clamp(13px, 3.1vw, 22px)' }}
          >
            {p.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col items-center justify-center
                 text-center px-6 pt-28 pb-20"
    >
      {/* Soft clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute"
          style={{
            width: '46vw', height: '26vw', right: '-6vw', top: '18%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.55), transparent 66%)',
            filter: 'blur(28px)',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '38vw', height: '20vw', left: '-8vw', top: '46%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.40), transparent 68%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto w-full">
        <a
          href="#products"
          className="rise inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-10
                     text-[13px] font-semibold text-white
                     border border-white/45 hover:bg-white/15 transition"
          style={
            {
              '--d': '100ms',
              background: 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(10px)',
            } as React.CSSProperties
          }
        >
          Six products, built in Kerala <span aria-hidden>›</span>
        </a>

        <p
          className="rise text-white/85 text-lg md:text-xl font-medium mb-3"
          style={{ '--d': '180ms' } as React.CSSProperties}
        >
          Adkrak Innovations
        </p>

        <h1
          className="rise font-display font-bold text-white tracking-[-0.025em]
                     text-[10vw] sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.02]"
          style={
            {
              '--d': '260ms',
              textShadow: '0 4px 30px rgba(10,40,80,0.25)',
            } as React.CSSProperties
          }
        >
          Your Vision,
          <br />
          Architected to Perfection
        </h1>

        <div className="mt-14 md:mt-16">
          <BrandMark />
        </div>

        <div
          className="rise copy-card relative mt-16 md:mt-20 mx-auto p-7 md:p-8 text-left max-w-2xl"
          style={{ '--d': '950ms' } as React.CSSProperties}
        >
          <p className="text-white text-[17px] md:text-xl leading-relaxed">
            Vertical SaaS for the industries that keep real life moving —
            restaurants, schools, exams and roads. Built mobile-first and
            priced for real operators.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#products" className="btn btn-primary">
              Explore products <span aria-hidden>›</span>
            </a>
            <a href="#founders" className="btn btn-outline">
              Meet the founders
            </a>
          </div>
        </div>

        <div
          className="rise mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3
                     text-[13px] font-medium text-white/80"
          style={{ '--d': '1150ms' } as React.CSSProperties}
        >
          <span>🇮🇳 100% Made in India</span>
          <span>⚡ Shipping from Kerala</span>
          <span>🔒 Data stays in-country</span>
        </div>
      </div>
    </section>
  );
}
