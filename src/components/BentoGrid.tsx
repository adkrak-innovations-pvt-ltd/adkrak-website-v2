import { motion } from 'framer-motion';
import { products, statusLabel, statusColor } from '../data/products';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

// Bento layout: alternate large + small cells for visual rhythm
const spanFor = (i: number) => {
  const pattern = ['md:col-span-2', 'md:col-span-1', 'md:col-span-1', 'md:col-span-2', 'md:col-span-1', 'md:col-span-1'];
  return pattern[i] ?? 'md:col-span-1';
};

export default function BentoGrid() {
  return (
    <section id="products" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <div className="pill mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Digital Catalogue
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Six pillars.
            <br />
            <span className="grad-text">One promise.</span>
          </h2>
          <p className="mt-6 text-lg text-slate-400 max-w-xl">
            Every product is built to the same brief — clean, opinionated software
            that saves the person who uses it fifteen minutes a day, or it doesn't ship.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-5"
        >
          {products.map((p, i) => (
            <motion.a
              key={p.code}
              variants={card}
              href={p.href ?? '#contact'}
              target={p.href ? '_blank' : undefined}
              rel={p.href ? 'noreferrer' : undefined}
              className={`grad-border p-7 group relative overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-15px_rgba(6,182,212,0.35)] ${spanFor(i)}`}
              whileHover={{ scale: 1.01 }}
            >
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-700 bg-gradient-to-br pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                }}
              />
              <div className="relative">
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl grid place-items-center font-display font-bold text-lg text-white bg-gradient-to-br ${p.accent} shadow-lg`}
                  >
                    {p.code}
                  </div>
                  <span
                    className={`pill border ${statusColor[p.status]}`}
                  >
                    ● {statusLabel[p.status]}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                  {p.name}
                  <span className="text-cyan-400 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all">
                    →
                  </span>
                </h3>
                <p className="text-slate-400 mt-1.5 mb-5">{p.tagline}</p>

                <ul className="space-y-2 text-sm text-slate-300">
                  {p.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2.5">
                      <span
                        className={`inline-block w-1 h-1 rounded-full mt-2 bg-gradient-to-br ${p.accent}`}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
