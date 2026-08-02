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
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: solid ? 'rgba(8,11,17,0.82)' : 'transparent',
        backdropFilter: solid ? 'blur(18px) saturate(160%)' : 'none',
        WebkitBackdropFilter: solid ? 'blur(18px) saturate(160%)' : 'none',
        borderBottom: solid ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 h-[68px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <img
            src={asset('logo-mark.svg')}
            alt=""
            className="w-9 h-9 rounded-lg transition-transform duration-500 group-hover:rotate-[8deg]"
          />
          <span className="font-display font-bold text-white text-[17px] tracking-tight">
            Adkrak
          </span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-white/35">
            Innovations
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9 text-[14px] text-white/65">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="relative py-2 hover:text-white transition-colors group"
            >
              {l.label}
              <span
                className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-400"
                style={{ background: 'linear-gradient(90deg,#00f2fe,#9d4edd)' }}
              />
            </a>
          ))}
        </nav>

        <a
          href="https://wa.me/917012837825"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary !py-2.5 !px-6 !text-[13.5px]"
        >
          Talk to a founder
        </a>
      </div>
    </header>
  );
}
