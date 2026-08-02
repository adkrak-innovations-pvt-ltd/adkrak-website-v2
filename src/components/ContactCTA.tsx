import SplitText from './SplitText';
import TiltCard from './TiltCard';
import Reveal from './Reveal';

const channels = [
  {
    label: 'WhatsApp',
    value: 'Message a founder',
    note: 'Direct line · fastest reply',
    href: 'https://wa.me/917012837825',
    accent: '#25D366',
    glyph: '💬',
  },
  {
    label: 'Call',
    value: '+91 70128 37825',
    note: 'Mon–Sat · 9 AM – 8 PM IST',
    href: 'tel:+917012837825',
    accent: '#00f2fe',
    glyph: '📞',
  },
  {
    label: 'Email',
    value: 'enquiry@adkrak.in',
    note: 'Replies within a business day',
    href: 'mailto:enquiry@adkrak.in',
    accent: '#9d4edd',
    glyph: '✉️',
  },
];

export default function ContactCTA() {
  return (
    <section id="contact" className="relative px-5 md:px-8 pb-28 md:pb-36">
      <div className="max-w-[1200px] mx-auto">
        <div className="hairline mb-20 md:mb-28" />

        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <Reveal className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-7
                            text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60
                            border border-white/12 bg-white/[0.03]">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00f2fe' }} />
            Founders take every inbound
          </Reveal>

          <SplitText
            lines={['Ready to build', 'something exceptional?']}
            gradientFrom={1}
            className="font-display text-4xl md:text-6xl lg:text-[66px] font-bold
                       tracking-[-0.035em] leading-[1.0]"
          />

          <Reveal delay={160} className="mt-7 text-[16px] md:text-[17px] text-white/50 leading-relaxed">
            No sales funnel, no chatbot. Pick a channel and you reach one of us directly.
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 100}>
              <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
                 rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                 className="block h-full">
                <TiltCard className="h-full p-7">
                  <div className="tilt-inner relative z-[1]">
                    <div className="text-2xl mb-4">{c.glyph}</div>
                    <div
                      className="text-[10.5px] font-semibold uppercase tracking-[0.22em] mb-2"
                      style={{ color: c.accent }}
                    >
                      {c.label}
                    </div>
                    <div className="font-display font-bold text-white text-[19px] leading-tight break-words">
                      {c.value}
                    </div>
                    <div className="text-white/35 text-[12.5px] mt-2.5">{c.note}</div>
                  </div>
                </TiltCard>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
