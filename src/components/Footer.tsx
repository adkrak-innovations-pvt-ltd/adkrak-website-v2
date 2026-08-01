import { asset } from '../lib/asset';
export default function Footer() {
  return (
    <footer style={{ background: '#0c1a2c' }}>
      <div className="max-w-[1180px] mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={asset("logo-mark.svg")} alt="" className="w-11 h-11 rounded-xl" />
            <div className="leading-tight">
              <div className="font-display font-bold text-white text-lg">Adkrak</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                Innovations Pvt Ltd
              </div>
            </div>
          </div>
          <p className="mt-5 text-white/60 text-sm max-w-md leading-relaxed">
            Your Vision, Architected to Perfection. Vertical SaaS built for the
            industries that keep real life moving.
          </p>
          <p className="mt-4 text-xs text-white/40">
            🇮🇳 100% Made in India · Shipping from Kerala
          </p>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
            Explore
          </div>
          <ul className="space-y-2.5 text-sm text-white/65">
            <li><a href="#products" className="hover:text-white transition">Products</a></li>
            <li><a href="#founders" className="hover:text-white transition">Founders</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
            Reach us
          </div>
          <ul className="space-y-2.5 text-sm text-white/65">
            <li>
              <a href="mailto:hello@adkrak.com" className="hover:text-white transition break-all">
                hello@adkrak.com
              </a>
            </li>
            <li>
              <a href="tel:+919876543210" className="hover:text-white transition">
                +91 98765 43210
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                WhatsApp ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-[1180px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Adkrak Innovations Pvt Ltd. All rights reserved.</div>
          <div className="tracking-[0.24em] uppercase">AD · KR · AK</div>
        </div>
      </div>
    </footer>
  );
}
