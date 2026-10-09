'use client';

import { useId, useRef, useState } from 'react';
import { evidence, type Clip } from '@/config/content';
import { Figure, Media } from './Media';

export function Evidence() {
  const [active, setActive] = useState(0);
  const id = useId();
  const tab = evidence.tabs[active];

  return (
    <section id="evidence" className="section rule-top bg-paper-2/60">
      <div className="wrap">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          <div>
            <p className="eyebrow">{evidence.eyebrow}</p>
            <h2 className="font-display mt-4 text-h2 font-medium">{evidence.heading}</h2>
          </div>
          <p className="prose-measure text-lg text-ink-2 lg:pt-9">{evidence.intro}</p>
        </div>

        <div role="tablist" aria-label="Evidence panels" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-b border-rule">
          {evidence.tabs.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              id={`${id}-tab-${t.id}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              onClick={() => setActive(i)}
              className={`-mb-px border-b-2 py-3 text-sm transition-colors ${
                i === active ? 'border-accent text-ink' : 'border-transparent text-ink-2 hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${tab.id}`}
          className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14"
        >
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-[1.6rem] font-medium leading-tight">{tab.title}</h3>
            <p className="prose-measure text-ink-2">{tab.text}</p>
            <p className="font-mono text-[0.6875rem] text-ink-3">{tab.source}</p>
          </div>

          <div key={tab.id} className="flex flex-col gap-4">
            {tab.kind === 'compare' && (
              <>
                <Compare a={tab.a} b={tab.b} />
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5 px-1 text-xs text-ink-2">
                  {tab.legend.map(([name, color]) => (
                    <li key={name} className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-sm border border-rule-strong" style={{ background: color }} />
                      {name}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {tab.kind === 'pair' && (
              <>
                <Figure label={tab.a.alt}>
                  <Media clip={tab.a} />
                </Figure>
                <Figure label={tab.b.alt}>
                  <Media clip={tab.b} />
                </Figure>
              </>
            )}
            {tab.kind === 'single' && (
              <Figure label={tab.a.alt}>
                <Media clip={tab.a} />
              </Figure>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Two synchronised clips under a draggable divider. The slider is a native
 * range input stretched over the frame, so it is keyboard-accessible for free.
 */
function Compare({ a, b }: { a: Clip; b: Clip }) {
  const [pos, setPos] = useState(50);
  const va = useRef<HTMLVideoElement | null>(null);
  const vb = useRef<HTMLVideoElement | null>(null);

  // Keep the two decoders within a frame of each other.
  const sync = () => {
    const x = va.current;
    const y = vb.current;
    if (!x || !y) return;
    if (Math.abs(x.currentTime - y.currentTime) > 0.08) y.currentTime = x.currentTime;
    if (!x.paused && y.paused) y.play().catch(() => undefined);
    if (x.paused && !y.paused) y.pause();
  };

  return (
    <Figure label="Original | segmented" text="Drag to compare.">
      <div className="relative select-none" style={{ aspectRatio: String(a.ratio) }} onPointerMove={sync}>
        <div className="absolute inset-0">
          <Media clip={b} videoRef={vb} />
        </div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Media clip={a} videoRef={va} />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-paper" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-rule-strong bg-paper shadow-sm" />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => {
            setPos(Number(e.target.value));
            sync();
          }}
          aria-label="Reveal original video"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
        <span className="pointer-events-none absolute left-3 top-3 rounded bg-paper/90 px-2 py-1 font-mono text-[0.6875rem] text-ink-2">original</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded bg-paper/90 px-2 py-1 font-mono text-[0.6875rem] text-ink-2">segmented</span>
      </div>
    </Figure>
  );
}
