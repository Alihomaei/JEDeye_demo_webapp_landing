'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { hero } from '@/config/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Scroll-stopped hero. The viewport pins for PIN_VH of scrolling while the
 * operating-room sequence scrubs frame by frame under the headline.
 *
 * Built from 96 WebP frames (2.6 MB total, ~27 KB each) drawn to a canvas, not
 * from a video element: seeking a 19 MB H.264 file on every scroll tick is what
 * made the old version stutter. Frames load progressively after the poster;
 * whatever is loaded is drawn, so the first paint is one 30 KB image.
 *
 * When the pin ends the sharp scene cross-fades into a fixed, blurred copy of
 * its last frame that stays behind the rest of the page.
 */
const FRAMES = 96;
const PIN_VH = 250;
const TEXT_FADE_END = 0.3;
/** Over the last part of the pin the page content rises over the scene while it fades. */
const CANVAS_FADE = [0.72, 1] as const;
const BG = '#0a1628';

const src = (i: number) => `/hero-frames/f_${String(i + 1).padStart(3, '0')}.webp`;

export function ScrollHero({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const frostRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(Array(FRAMES).fill(null));
  const lastDrawn = useRef(-1);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  const draw = useCallback((index: number, force = false) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    // Nearest loaded frame at or below the target, so scrubbing never blanks.
    let i = Math.min(FRAMES - 1, Math.max(0, index));
    while (i > 0 && !framesRef.current[i]) i--;
    const img = framesRef.current[i];
    if (!img || (!force && i === lastDrawn.current)) return;
    lastDrawn.current = i;
    const cw = canvas.width;
    const ch = canvas.height;
    const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * s;
    const h = img.naturalHeight * s;
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }, []);

  // Progressive frame loading: poster frame first, then the rest in order.
  useEffect(() => {
    let cancelled = false;
    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (!cancelled) framesRef.current[i] = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = src(i);
      });
    (async () => {
      await load(0);
      if (cancelled) return;
      setReady(true);
      draw(0, true);
      // Two frames in flight keeps the pipe full without starving other assets.
      for (let i = 1; i < FRAMES; i += 2) {
        await Promise.all([load(i), i + 1 < FRAMES ? load(i + 1) : Promise.resolve()]);
        if (cancelled) return;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [draw]);

  // Size the canvas to the viewport (device pixels, capped for memory).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      draw(lastDrawn.current < 0 ? 0 : lastDrawn.current, true);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [draw]);

  // Scroll → progress → frame, text opacity, canvas fade. One rAF per scroll.
  useEffect(() => {
    if (!ready) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas) return;
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;

      draw(reduced ? FRAMES - 1 : Math.round(p * (FRAMES - 1)));

      if (textRef.current) {
        const o = Math.max(0, 1 - p / TEXT_FADE_END);
        textRef.current.style.opacity = String(o);
        textRef.current.style.pointerEvents = o < 0.1 ? 'none' : 'auto';
        if (frostRef.current) frostRef.current.style.opacity = String(o);
      }
      const fade = p <= CANVAS_FADE[0] ? 0 : Math.min(1, (p - CANVAS_FADE[0]) / (CANVAS_FADE[1] - CANVAS_FADE[0]));
      if (sceneRef.current) sceneRef.current.style.opacity = String(1 - fade);
      if (bgRef.current) bgRef.current.style.opacity = String(fade);
      if (contentRef.current) {
        // Content sits under the pinned viewport in layout and rises over it.
        contentRef.current.style.transform = `translateY(${((1 - fade) * 100).toFixed(2)}vh)`;
      }
      if (progressRef.current) {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const sp = max > 0 ? window.scrollY / max : 0;
        progressRef.current.style.transform = `scaleX(${sp.toFixed(4)})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    // In-page anchors: the content is translated while the hero is pinned, so
    // jump past the pin first, then let the browser scroll to the target.
    const jumpTo = (hash: string) => {
      const wrap = wrapRef.current;
      let el: Element | null = null;
      try {
        el = hash.length > 1 ? document.querySelector(hash) : null;
      } catch {
        el = null;
      }
      if (!wrap || !el) return false;
      const pinEnd = wrap.offsetTop + wrap.offsetHeight - window.innerHeight;
      if (window.scrollY < pinEnd) {
        window.scrollTo({ top: pinEnd, behavior: 'instant' });
        update();
      }
      // A second scroll in the same tick is dropped by Chrome; wait a frame.
      const target = el;
      requestAnimationFrame(() => {
        const top = target.getBoundingClientRect().top + window.scrollY - 56; // sticky header
        window.scrollTo({ top, behavior: reduced ? 'instant' : 'smooth' });
      });
      return true;
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      const href = a?.getAttribute('href');
      if (!href || !jumpTo(href)) return;
      e.preventDefault();
      history.replaceState(null, '', href);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onClick);
    if (window.location.hash) jumpTo(window.location.hash);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ready, reduced, draw]);

  // Scroll-triggered reveals for everything below the hero marked data-rise.
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-rise]'));
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  return (
    <>
    {/* Reading progress, drawn under the sticky header. */}
    <div className="pointer-events-none fixed left-0 right-0 top-14 z-40 h-px" aria-hidden="true">
      <div ref={progressRef} className="h-full origin-left bg-accent" style={{ transform: 'scaleX(0)' }} />
    </div>

    {/* The last frame of the sequence, blurred, stays behind the whole page. */}
    <div ref={bgRef} className="pointer-events-none fixed inset-0 z-0" style={{ opacity: 0, background: BG }} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-frames/last_blur.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'blur(18px) saturate(1.1)', transform: 'scale(1.08)' }}
      />
      <div className="absolute inset-0" style={{ background: 'oklch(from var(--paper) l c h / 0.84)' }} />
    </div>

    <div ref={wrapRef} style={{ height: `${PIN_VH}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={sceneRef} className="absolute inset-0" style={{ background: BG }}>
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        {/* Poster keeps the first paint meaningful before the canvas has a frame. */}
        {!ready && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/hero-frames/poster.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: 'linear-gradient(180deg, rgba(10,22,40,0.35) 0%, rgba(10,22,40,0.1) 50%, rgba(10,22,40,0.45) 100%)' }}
        />
        {/* Frosted opening: the first frame is blurred under the brand, then clears as the scrub begins. */}
        <div
          ref={frostRef}
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background: 'rgba(10,22,40,0.45)',
            backdropFilter: 'blur(14px) saturate(1.2)',
            WebkitBackdropFilter: 'blur(14px) saturate(1.2)',
          }}
        />
        </div>

        <div ref={textRef} className="wrap relative flex h-full flex-col items-center justify-center text-center text-[var(--paper)]">
          <p className="eyebrow reveal !text-[oklch(0.85_0.02_205)]" style={{ ['--i' as string]: 0 }}>
            {hero.eyebrow}
          </p>
          <h1 className="font-display reveal mt-6 text-[clamp(4.5rem,2rem+12vw,11rem)] font-semibold leading-none tracking-[-0.03em]" style={{ ['--i' as string]: 1 }}>
            {hero.brand}
          </h1>
          <p className="font-display reveal mt-4 max-w-[22ch] text-[clamp(1.5rem,1rem+2vw,2.5rem)] font-medium leading-tight text-[oklch(0.93_0.012_205)]" style={{ ['--i' as string]: 2 }}>
            {hero.headline}
          </p>
          <p className="reveal mt-6 max-w-[58ch] text-lg leading-[1.55] text-[oklch(0.86_0.012_205)]" style={{ ['--i' as string]: 3 }}>
            {hero.lede}
          </p>
          <div className="reveal mt-8 flex flex-wrap justify-center gap-3" style={{ ['--i' as string]: 4 }}>
            <a href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="btn !text-[var(--paper)] !shadow-[inset_0_0_0_1px_oklch(0.9_0.012_205/0.5)] hover:!bg-[oklch(1_0_0/0.08)]">
              {hero.secondaryCta.label}
            </a>
          </div>
          <p className="reveal scroll-cue absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.6875rem] text-[oklch(0.75_0.02_205)]" style={{ ['--i' as string]: 5 }}>
            Scroll
            <span className="scroll-cue-line" aria-hidden="true" />
          </p>
        </div>
      </div>
    </div>
    <div
      ref={contentRef}
      className="relative z-10"
      style={{ marginTop: '-100vh', transform: 'translateY(100vh)', willChange: 'transform' }}
    >
      {children}
    </div>
    </>
  );
}
