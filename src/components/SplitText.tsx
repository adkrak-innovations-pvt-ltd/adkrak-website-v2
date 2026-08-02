import { useEffect, useRef, useState } from 'react';

/**
 * Splits a heading into lines → words and staggers them upward on
 * viewport entry.
 *
 * The hidden state is applied by JS only after mount, so the resting
 * markup stays visible: if JS or IntersectionObserver never runs, the
 * copy still reads instead of being stranded at opacity 0.
 */
export default function SplitText({
  lines,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  gradientFrom,
}: {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
  /** index of the first line that should use the neon gradient */
  gradientFrom?: number;
}) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    setArmed(true);

    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.94) {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as 'h2';
  let wordIndex = 0;

  return (
    <Component
      ref={ref}
      className={`split ${armed ? 'js-armed' : ''} ${shown ? 'in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` } as React.CSSProperties}
    >
      {lines.map((line, li) => (
        <span className="split-line" key={li}>
          {line.split(' ').map((word, wi) => {
            const i = wordIndex++;
            const useGrad = gradientFrom !== undefined && li >= gradientFrom;
            return (
              <span
                key={wi}
                className={`split-word ${useGrad ? 'grad-text' : ''}`}
                style={{ '--i': i } as React.CSSProperties}
              >
                {word}
                {wi < line.split(' ').length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </span>
      ))}
    </Component>
  );
}
