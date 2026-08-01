import { useEffect, useState } from 'react';
import { asset } from '../lib/asset';

const links = [
  { id: 'products', label: 'Products' },
  { id: 'founders', label: 'Founders' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-colors duration-300"
      style={{
        background: solid ? 'rgba(12,26,44,0.92)' : 'rgba(12,26,44,0.55)',
        backdropFilter: 'saturate(170%) blur(16px)',
        WebkitBackdropFilter: 'saturate(170%) blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src={asset("logo-mark.svg")} alt="" className="w-9 h-9 rounded-lg" />
          <span className="font-display font-bold text-white text-[17px] tracking-tight">
            Adkrak
          </span>
          <span className="hidden sm:inline text-[11px] uppercase tracking-[0.18em] text-white/55">
            Innovations Pvt Ltd
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9 text-[14px] text-white/85">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="hover:text-white transition-colors relative group py-2"
            >
              {l.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-300 to-emerald-300 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-primary !py-2.5 !px-6 !text-[14px]">
          Get in touch <span aria-hidden>›</span>
        </a>
      </div>
    </header>
  );
}
