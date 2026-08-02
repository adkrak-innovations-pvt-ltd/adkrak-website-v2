import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Scroll-linked fade.
 *
 * Instead of a one-shot "reveal on enter", opacity/translate/blur are driven
 * continuously by where the element sits in the viewport, so content eases IN
 * as it rises and eases OUT as it leaves — a travelling feel rather than a pop.
 *
 * Safety: the resting markup is fully visible. Scroll-linked styles are only
 * applied by JS after mount, so if JS or rAF never runs the content still
 * reads instead of being stranded invisible.
 *
 * All instances share one rAF loop and one scroll listener.
 */

const registry = new Set<() => void>();
let rafId: number | null = null;
let listening = false;

function tick() {
  rafId = null;
  registry.forEach((fn) => fn());
}

function schedule() {
  if (rafId === null) rafId = requestAnimationFrame(tick);
}

function ensureListener() {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
// smootherstep — no harsh start/stop
const ease = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  lift = 46,
  fadeOut = true,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'article';
  className?: string;
  /** distance travelled while fading in (px) */
  lift?: number;
  /** also fade back out while leaving the top of the viewport */
  fadeOut?: boolean;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Stagger by shifting where this element's fade-in window begins.
    const offset = delay * 0.18;

    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 when the top is at the bottom edge → 1 once risen into view
      const inP = ease(clamp01((vh - r.top - offset) / (vh * 0.52)));

      // fade back out over the final stretch as it exits the top
      const outP = fadeOut ? ease(clamp01((r.bottom + vh * 0.05) / (vh * 0.42))) : 1;

      const p = Math.min(inP, outP);

      el.style.opacity = String(p);
      el.style.transform =
        `translate3d(0, ${(1 - p) * lift}px, 0) scale(${0.985 + p * 0.015})`;
      el.style.filter = p > 0.985 ? 'none' : `blur(${(1 - p) * 6}px)`;
    };

    el.style.willChange = 'opacity, transform, filter';

    registry.add(update);
    ensureListener();
    update();

    return () => {
      registry.delete(update);
      el.style.opacity = '';
      el.style.transform = '';
      el.style.filter = '';
      el.style.willChange = '';
    };
  }, [delay, lift, fadeOut]);

  const Component = Tag as 'div';

  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
}
