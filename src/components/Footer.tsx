export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src="/logo-mark.svg"
              alt="Adkrak"
              className="w-11 h-11 rounded-xl"
              style={{ boxShadow: '0 0 30px rgba(6,182,212,0.35)' }}
            />
            <div className="leading-tight">
              <div className="font-display font-bold text-white text-lg">
                Adkrak<span className="text-cyan-400">.</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Innovations Pvt Ltd
              </div>
            </div>
          </div>
          <p className="mt-5 text-slate-400 text-sm max-w-md leading-relaxed">
            Your Vision, Architected to Perfection. Vertical SaaS built for the
            industries that keep real life moving.
          </p>
          <p className="mt-4 text-xs text-slate-600">
            🇮🇳 100% Made in India · Shipping from Kerala
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-4">
            Explore
          </div>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="#products" className="hover:text-white transition">Products</a></li>
            <li><a href="#founders" className="hover:text-white transition">Founders</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-4">
            Reach us
          </div>
          <ul className="space-y-2 text-sm text-slate-400">
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
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="hover:text-white transition">
                WhatsApp ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} Adkrak Innovations Pvt Ltd. All rights reserved.</div>
          <div className="tracking-widest uppercase">
            AD · KR · AK
          </div>
        </div>
      </div>
    </footer>
  );
}
