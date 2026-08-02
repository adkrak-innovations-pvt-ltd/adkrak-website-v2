import { asset } from '../lib/asset';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={asset('logo-mark.svg')} alt="" className="w-11 h-11 rounded-xl" />
            <div className="leading-tight">
              <div className="font-display font-bold text-white text-lg">Adkrak</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                Innovations Pvt Ltd
              </div>
            </div>
          </div>
          <p className="mt-6 text-white/45 text-[14.5px] max-w-md leading-relaxed">
            Your Vision, Architected to Perfection. Vertical SaaS for restaurants,
            schools, exams and roads.
          </p>
          <p className="mt-5 text-[12px] text-white/30">
            🇮🇳 Made in India · Built in Kerala
          </p>
        </div>

        <div>
          <div className="text-[10.5px] uppercase tracking-[0.22em] text-white/30 mb-5">
            Explore
          </div>
          <ul className="space-y-3 text-[14px] text-white/55">
            <li><a href="#products" className="hover:text-[#00f2fe] transition">Products</a></li>
            <li><a href="#founders" className="hover:text-[#00f2fe] transition">Founders</a></li>
            <li><a href="#contact" className="hover:text-[#00f2fe] transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="text-[10.5px] uppercase tracking-[0.22em] text-white/30 mb-5">
            Reach us
          </div>
          <ul className="space-y-3 text-[14px] text-white/55">
            <li>
              <a href="mailto:enquiry@adkrak.in" className="hover:text-[#00f2fe] transition break-all">
                enquiry@adkrak.in
              </a>
            </li>
            <li>
              <a href="tel:+917012837825" className="hover:text-[#00f2fe] transition">
                +91 70128 37825
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/917012837825"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#00f2fe] transition"
              >
                WhatsApp ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-6 flex flex-col md:flex-row
                        items-center justify-between gap-3 text-[12px] text-white/30">
          <div>© {new Date().getFullYear()} Adkrak Innovations Pvt Ltd. All rights reserved.</div>
          <div className="tracking-[0.28em] uppercase">AD · KR · AK</div>
        </div>
      </div>
    </footer>
  );
}
