import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';

/**
 * Scroll-triggered reveal.
 *
 * The hidden state is applied by JS (`js-armed`) only after mount, so the
 * markup's resting state stays visible. If JS or IntersectionObserver never
 * runs, the content simply shows — it can never be stranded invisible.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    // Already in view on mount (e.g. above the fold) — skip the hidden state.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) {
      setShown(true);
      return;
    }

    setArmed(true);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -70px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${armed ? 'js-armed' : ''} ${shown ? 'in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
