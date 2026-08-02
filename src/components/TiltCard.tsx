import { useRef, type ReactNode } from 'react';

/**
 * Glassmorphic card with a cursor-driven 3D tilt and a radial spotlight
 * that reveals the gradient border (see .glass / .tilt in index.css).
 *
 * Values are written straight to CSS custom properties inside a rAF, so
 * pointer tracking never triggers a React re-render.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 9,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);
  const pending = useRef<{ x: number; y: number } | null>(null);

  const flush = () => {
    frame.current = null;
    const el = ref.current;
    const p = pending.current;
    if (!el || !p) return;

    const r = el.getBoundingClientRect();
    const px = (p.x - r.left) / r.width;
    const py = (p.y - r.top) / r.height;

    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.setProperty('--ry', `${(px - 0.5) * maxTilt * 2}deg`);
    el.style.setProperty('--rx', `${(0.5 - py) * maxTilt * 2}deg`);
  };

  const onMove = (e: React.PointerEvent) => {
    pending.current = { x: e.clientX, y: e.clientY };
    if (frame.current === null) frame.current = requestAnimationFrame(flush);
  };

  const onLeave = () => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`glass tilt ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
