import { motion } from 'framer-motion';
import { founders } from '../data/founders';

export default function FounderMatrix() {
  return (
    <section id="founders" className="relative py-32 md:py-40">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16 text-center mx-auto"
        >
          <div className="pill mb-6 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> The Co-founders
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            <span className="grad-text">AD · KR · AK</span>
            <br />
            The three that make ADKRAK.
          </h2>
          <p className="mt-6 text-lg text-slate-400">
            <span className="font-mono text-cyan-400">A</span>darsh ·{' '}
            <span className="font-mono text-emerald-400">K</span>rishna ·{' '}
            <span className="font-mono text-orange-400">A</span>kash — engineering,
            operations and growth under one roof.
          </p>
        </motion.div>

        {/* Monogram matrix */}
        <div className="grid md:grid-cols-3 gap-6">
          {founders.map((f, i) => (
            <motion.article
              key={f.monogram}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              whileHover={{ y: -6 }}
              className="grad-border p-8 relative overflow-hidden group"
            >
              {/* giant faded monogram in background */}
              <div
                className={`absolute -top-8 -right-4 text-[180px] font-display font-black leading-none opacity-[0.06] bg-gradient-to-br ${f.gradient} bg-clip-text text-transparent select-none pointer-events-none`}
              >
                {f.monogram}
              </div>

              <div className="relative flex flex-col items-center text-center">
                {/* Avatar */}
                {f.photo ? (
                  <img
                    src={f.photo}
                    alt={f.name}
                    className="w-28 h-28 rounded-2xl object-cover mb-5"
                    style={{
                      boxShadow: '0 12px 40px -12px rgba(6,182,212,0.5)',
                      border: '2px solid rgba(6,182,212,0.4)',
                    }}
                  />
                ) : (
                  <div
                    className={`w-28 h-28 rounded-2xl grid place-items-center font-display font-black text-4xl text-white bg-gradient-to-br ${f.gradient} mb-5`}
                    style={{ boxShadow: '0 12px 40px -12px rgba(6,182,212,0.4)' }}
                  >
                    {f.monogram}
                  </div>
                )}

                <div
                  className={`text-xs font-mono uppercase tracking-[0.28em] mb-1.5 bg-gradient-to-r ${f.gradient} bg-clip-text text-transparent`}
                >
                  Co-founder · {f.monogram}
                </div>
                <h3 className="font-display font-bold text-white text-2xl">
                  {f.name}
                </h3>
                <div className="mt-1 text-sm text-slate-500 tracking-wide">
                  {f.roles.join(' · ')}
                </div>

                <p className="mt-6 text-slate-300 text-[15px] italic leading-relaxed relative">
                  <span className="text-cyan-400/60 text-3xl absolute -top-3 -left-2 font-serif">
                    &ldquo;
                  </span>
                  {f.quote}
                </p>

                <p className="mt-5 text-slate-400 text-sm">{f.bio}</p>

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

        {/* placeholder notice — user will send full bios later */}
        <p className="mt-10 text-center text-xs text-slate-600 tracking-wider">
          Additional founder bios, metrics and links pending — content will be updated
          as it is received.
        </p>
      </div>
    </section>
  );
}
