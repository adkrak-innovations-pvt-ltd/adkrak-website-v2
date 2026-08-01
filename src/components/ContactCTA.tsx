import Reveal from './Reveal';

const channels = [
  {
    icon: '💬',
    label: 'WhatsApp',
    value: 'Chat with us',
    href: 'https://wa.me/919876543210',
    note: 'Usually under 2 hours',
  },
  {
    icon: '📞',
    label: 'Call',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    note: 'Mon–Sat · 9 AM – 8 PM IST',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'hello@adkrak.com',
    href: 'mailto:hello@adkrak.com',
    note: 'Replies within a business day',
  },
];

export default function ContactCTA() {
  return (
    <section id="contact" className="relative px-4 md:px-6 pb-20 md:pb-28">
      <Reveal
        className="panel max-w-[1180px] mx-auto"
        style={{
          background: 'linear-gradient(135deg, #12365c 0%, #0e6b8a 52%, #0f766e 100%)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(760px circle at 22% 18%, rgba(255,255,255,0.20), transparent 58%)',
          }}
        />

        <div className="relative px-7 md:px-14 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-5xl lg:text-[56px] font-bold text-white tracking-[-0.025em] leading-[1.05]">
            Ready to see your vision architected?
          </h2>
          <p className="mt-6 text-white/80 text-[17px] md:text-lg max-w-xl mx-auto">
            Founders take every inbound. Pick a channel — we reply within a
            business day, usually much sooner on WhatsApp.
          </p>

          <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                className="rounded-2xl p-6 transition-all duration-300
                           hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.20)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="text-2xl mb-2.5">{c.icon}</div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
                  {c.label}
                </div>
                <div className="text-white font-display font-bold text-lg mt-1.5 break-words">
                  {c.value}
                </div>
                <div className="text-white/55 text-[12px] mt-1.5">{c.note}</div>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
