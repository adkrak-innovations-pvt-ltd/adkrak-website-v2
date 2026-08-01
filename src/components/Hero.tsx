/* Adkrak brand mark — three blades, one per founder, converging into an
   apex. Each blade rises in turn, then the apex holds a slow pulse. */
function BrandMark() {
  const blades = [
    { label: 'AD', rot: '-26deg', x: '-92px', h: 120, d: 380 },
    { label: 'KR', rot: '0deg', x: '0px', h: 168, d: 520 },
    { label: 'AK', rot: '26deg', x: '92px', h: 120, d: 660 },
  ];

  return (
    <div
      className="relative mx-auto"
      style={{ width: 'min(78vw, 330px)', height: 210 }}
    >
      {/* slow orbit ring */}
      <div
        className="mark-ring absolute left-1/2 top-1/2 rounded-full pointer-events-none"
        style={{
          width: 268,
          height: 268,
          marginLeft: -134,
          marginTop: -134,
          border: '1px dashed rgba(255,255,255,0.28)',
        }}
      />

      {blades.map((b) => (
        <div
          key={b.label}
          className="blade absolute bottom-4 left-1/2 rounded-[14px] backdrop-blur-sm grid place-items-end justify-center pb-3"
          style={
            {
              '--rot': b.rot,
              '--d': `${b.d}ms`,
              width: 62,
              height: b.h,
              marginLeft: -31,
              transform: `translateX(${b.x}) rotate(${b.rot})`,
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.42), rgba(255,255,255,0.10))',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 16px 40px -16px rgba(3,40,50,0.6)',
              left: `calc(50% + ${b.x})`,
            } as React.CSSProperties
          }
        >
          <span className="font-display font-bold text-white text-[13px] tracking-[0.16em]">
            {b.label}
          </span>
        </div>
      ))}

      {/* apex spark where the blades converge */}
      <div
        className="apex absolute left-1/2 rounded-full pointer-events-none"
        style={{
          width: 20,
          height: 20,
          marginLeft: -10,
          top: 6,
          background:
            'radial-gradient(circle, #ffffff 0%, #7fe7d2 45%, rgba(127,231,210,0) 72%)',
        }}
      />
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
