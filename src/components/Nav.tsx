import { motion, useScroll, useTransform } from 'framer-motion';

const sections = [
  { id: 'products', label: 'Products' },
  { id: 'founders', label: 'Founders' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.4, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);

  return (
    <motion.header
      style={{
        backgroundColor: 'rgba(5, 9, 20, 1)',
        opacity: 1,
      }}
      className="fixed top-0 inset-x-0 z-50 nav-blur"
    >
      <motion.div
        style={{
          borderBottomColor: useTransform(
            borderOpacity,
            (v) => `rgba(148,163,184,${v})`
          ),
        }}
        className="border-b"
      >
        <motion.div
          style={{ backgroundColor: useTransform(bgOpacity, (v) => `rgba(5,9,20,${v})`) }}
          className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
        >
          <a href="#top" className="flex items-center gap-3 group">
            <motion.img
              src="/logo-mark.svg"
              alt="Adkrak"
              className="w-11 h-11 rounded-xl"
              style={{ boxShadow: '0 0 30px rgba(6,182,212,0.35)' }}
              whileHover={{ rotate: 12, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 220, damping: 12 }}
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display font-bold text-white text-lg tracking-tight">
                Adkrak<span className="text-cyan-400">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Innovations Pvt Ltd
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-9 text-sm text-slate-300">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="hover:text-white transition-colors relative group"
              >
                {s.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-emerald-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <a href="#contact" className="btn btn-primary hidden md:inline-flex !py-2.5 !px-5">
            Get in touch <span>→</span>
          </a>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
