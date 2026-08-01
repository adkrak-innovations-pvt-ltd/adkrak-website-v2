import type { Product } from '../data/products';
import { statusLabel, statusColor } from '../data/products';
import { mockFor } from './Mockups';
import Reveal from './Reveal';

/* Panel background wash per product */
const panelBg: Record<string, string> = {
  EN: 'linear-gradient(135deg, #7cc4e8 0%, #a9d8ee 45%, #cfe9f6 100%)',
  RP: 'linear-gradient(135deg, #f8b57a 0%, #f6cba4 45%, #fbe3cd 100%)',
  EP: 'linear-gradient(135deg, #a99af0 0%, #c4bbf5 45%, #ddd8fa 100%)',
  RG: 'linear-gradient(135deg, #7ad4bd 0%, #a8e3d3 45%, #d0f0e7 100%)',
  RD: 'linear-gradient(135deg, #f2a0c4 0%, #f6bfd7 45%, #fbdcea 100%)',
  CW: 'linear-gradient(135deg, #9db2c8 0%, #bfcede 45%, #dde5ee 100%)',
};

export default function ProductPanel({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const Mock = mockFor[product.code];
  const flip = index % 2 === 1;

  return (
    <Reveal
      as="section"
      className="panel"
      style={{ background: panelBg[product.code] }}
    >
      {/* soft light bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: flip
            ? 'radial-gradient(900px circle at 18% 12%, rgba(255,255,255,0.55), transparent 58%)'
            : 'radial-gradient(900px circle at 82% 12%, rgba(255,255,255,0.55), transparent 58%)',
        }}
      />

      <div className="relative" style={{ minHeight: 520 }}>
        {/* Mockup stage — desktop */}
        <div
          className={`absolute inset-y-0 hidden md:block ${
            flip ? 'left-0 right-[34%]' : 'left-[30%] right-0'
          }`}
        >
          <div className="relative w-full h-full">
            <Mock />
          </div>
        </div>

        {/* Mockup — mobile, stacked. Scaled down so the windows stay
            inside their box instead of running under the copy card. */}
        <div className="md:hidden relative h-[260px] w-full overflow-hidden">
          <div
            className="absolute inset-0 origin-top"
            style={{ transform: 'scale(0.66)', width: '152%' }}
          >
            <Mock />
          </div>
        </div>

        {/* Copy card */}
        <div
          className={`copy-card relative md:absolute bottom-0 m-5 md:m-8 p-7 md:p-9
                      w-auto md:w-[38%] max-w-[520px]
                      ${flip ? 'md:right-0' : 'md:left-0'}`}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <span
              className="w-9 h-9 rounded-lg grid place-items-center font-display
                         font-bold text-[13px] text-white"
              style={{ background: 'rgba(255,255,255,0.16)' }}
            >
              {product.code}
            </span>
            <span className={`chip ${statusColor[product.status]}`}>
              ● {statusLabel[product.status]}
            </span>
          </div>

          <h3 className="font-display text-3xl md:text-[38px] font-bold leading-[1.05]">
            {product.name}
          </h3>
          <p className="mt-3 text-white/80 text-[15px] leading-relaxed">
            {product.tagline}
          </p>

          <ul className="mt-5 space-y-2.5">
            {product.bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5 text-[14px] text-white/85 leading-snug">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 bg-gradient-to-br from-cyan-300 to-emerald-300" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <a
            href={product.href ?? '#contact'}
            target={product.href ? '_blank' : undefined}
            rel={product.href ? 'noreferrer' : undefined}
            className="btn btn-light mt-7"
          >
            {product.href ? 'See it live' : 'Request a demo'}
          </a>
        </div>
      </div>
    </Reveal>
  );
}
