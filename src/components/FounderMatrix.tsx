import { motion } from 'framer-motion';
import { founders } from '../data/founders';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function FounderMatrix() {
  return (
    <section id="founders" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        {/* Section head */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-3xl mb-20 text-center mx-auto"
        >
          <div className="pill mb-7 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            The Co-founders
          </div>

          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-white leading-[0.98]">
            <span className="grad-text">AD · KR · AK</span>
            <br />
            The three that make ADKRAK.
          </h2>

          <p className="mt-7 text-lg text-slate-400">
            <span className="text-cyan-400 font-semibold">AD</span>arsh ·{' '}
            <span className="text-emerald-400 font-semibold">KR</span>ishna ·{' '}
            <span className="text-orange-400 font-semibold">AK</span>ash — engineering,
            operations and growth under one roof.
          </p>
        </motion.div>

        {/* Portrait matrix */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {founders.map((f, i) => (
            <motion.article
              key={f.monogram}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 1, delay: i * 0.14, ease: EASE }}
              className="group relative rounded-2xl overflow-hidden bg-ink-800
                         ring-1 ring-white/10 hover:ring-cyan-400/40
                         transition-all duration-700
                         hover:shadow-[0_40px_90px_-30px_rgba(6,182,212,0.5)]"
            >
              {/* Portrait */}
              <div className="relative aspect-[4/5] overflow-hidden bg-ink-900">
                {f.photo ? (
                  <motion.img
                    src={f.photo}
                    alt={f.name}
                    className="absolute inset-0 w-full h-full object-cover object-top
                               grayscale group-hover:grayscale-0
                               scale-[1.02] group-hover:scale-[1.07]
                               transition-all duration-[1100ms] ease-out"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 grid place-items-center font-display font-black
                                text-7xl text-white bg-gradient-to-br ${f.gradient}`}
                  >
                    {f.monogram}
                  </div>
                )}

                {/* Cinematic gradient scrim */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(5,9,20,0) 30%, rgba(5,9,20,0.55) 62%, rgba(10,20,40,0.96) 100%)',
                  }}
                />

                {/* Accent wash on hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-25
                              transition-opacity duration-700 mix-blend-overlay
                              bg-gradient-to-tr ${f.gradient} pointer-events-none`}
                />

                {/* Monogram badge */}
                <div className="absolute top-5 left-5">
                  <div
                    className={`px-3 py-1.5 rounded-lg font-display font-bold text-sm tracking-[0.16em]
                                text-white bg-gradient-to-br ${f.gradient}
                                shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)]`}
                  >
                    {f.monogram}
                  </div>
                </div>

                {/* Name block over image */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display font-bold text-white text-2xl lg:text-[26px] leading-tight">
                    {f.name}
                  </h3>
                  <div
                    className={`mt-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]
                                bg-gradient-to-r ${f.gradient} bg-clip-text text-transparent`}
                  >
                    {f.roles.join(' · ')}
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="p-6 lg:p-7">
                <p className="text-slate-300 text-[15px] italic leading-relaxed relative pl-5">
                  <span className="absolute left-0 -top-1 text-cyan-400/50 text-3xl font-serif leading-none">
                    &ldquo;
                  </span>
                  {f.quote}
                </p>

                <p className="mt-5 text-slate-400 text-sm leading-relaxed">{f.bio}</p>

                {(f.linkedin || f.email) && (
                  <div className="mt-6 flex gap-3">
                    {f.linkedin && (
                      <a
                        href={f.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="pill hover:text-white transition"
                      >
                        LinkedIn ↗
                      </a>
                    )}
                    {f.email && (
                      <a
                        href={`mailto:${f.email}`}
                        className="pill hover:text-white transition"
                      >
                        Email ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
