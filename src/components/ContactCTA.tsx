import { motion } from 'framer-motion';

export default function ContactCTA() {
  return (
    <section id="contact" className="relative py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="grad-border-glow p-12 md:p-16 text-center relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 30% 20%, rgba(6,182,212,0.25), transparent 50%), radial-gradient(circle at 70% 80%, rgba(52,211,153,0.20), transparent 50%)',
            }}
          />
          <div className="relative">
            <div className="pill mb-6 mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Founders take every inbound
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Ready to see your <span className="grad-text">vision architected?</span>
            </h2>
            <p className="mt-6 text-slate-300 text-lg max-w-xl mx-auto">
              Pick a channel. We reply within a business day — usually much sooner on WhatsApp.
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="grad-border p-5 hover:-translate-y-1 transition-all"
              >
                <div className="text-2xl mb-1">💬</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  WhatsApp
                </div>
                <div className="text-white font-display font-bold text-lg mt-1">
                  Chat now →
                </div>
              </a>
              <a
                href="tel:+919876543210"
                className="grad-border p-5 hover:-translate-y-1 transition-all"
              >
                <div className="text-2xl mb-1">📞</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  Call
                </div>
                <div className="text-white font-display font-bold text-lg mt-1">
                  +91 98765 43210
                </div>
              </a>
              <a
                href="mailto:hello@adkrak.com"
                className="grad-border p-5 hover:-translate-y-1 transition-all"
              >
                <div className="text-2xl mb-1">✉️</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                  Email
                </div>
                <div className="text-white font-display font-bold text-lg mt-1 break-all">
                  hello@adkrak.com
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
