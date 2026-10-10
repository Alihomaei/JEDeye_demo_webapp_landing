'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** Counts a number up from zero the first time it scrolls into view. */
export function Count({ value, duration = 1400 }: { value: string; duration?: number }) {
  const target = Number.parseFloat(value);
  const decimals = (value.split('.')[1] ?? '').length;
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(() => (Number.isNaN(target) ? value : (0).toFixed(decimals)));

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target)) return;
    if (reduced) {
      setShown(value);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setShown((target * eased).toFixed(decimals));
          if (t < 1) raf = requestAnimationFrame(tick);
          else setShown(value);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, decimals, duration, reduced, value]);

  return <span ref={ref}>{shown}</span>;
}
