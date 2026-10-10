'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * CostCal replay: the running bill of a public Cholec80 case, driven by the
 * tool presence labels (a perfect detector) and the placeholder price table,
 * with the remaining-time predictor turning it into a forecast of the final bill.
 */
type Charge = { t: number; first_seen: number; item: string; label: string; price: number };
type CostData = {
  video: string;
  duration_s: number;
  rate_per_min: number;
  offset_pre_min: number;
  offset_post_min: number;
  tools: string[];
  runs: Record<string, [number, number][]>;
  charges: Charge[];
};
type Sample = { t: number; phase_pred: number; rem_pred: number };
type Timeline = { phases: string[]; samples: Sample[] };

const CHARGED = new Set(['Clipper', 'Irrigator']);
const SPEED = 40; // seconds of surgery per real second while playing

const usd = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export function CostCal() {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [data, setData] = useState<CostData | null>(null);
  const [tl, setTl] = useState<Timeline | null>(null);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  // Load both files the first time the panel is near the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setStarted(true);
      io.disconnect();
      Promise.all([fetch('/data/video49_costcal.json').then((r) => r.json()), fetch('/data/video49_timeline.json').then((r) => r.json())])
        .then(([c, tlj]) => {
          setData(c);
          setTl(tlj);
          if (!reduced) setPlaying(true);
        })
        .catch(() => undefined);
    }, { rootMargin: '200px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [started, reduced]);

  // Playback.
  useEffect(() => {
    if (!playing || !data) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((v) => {
        const n = v + dt * SPEED;
        if (n >= data.duration_s) {
          setPlaying(false);
          return data.duration_s;
        }
        return n;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, data]);

  const state = useMemo(() => {
    if (!data) return null;
    const minutes = data.offset_pre_min + t / 60;
    const timeFee = minutes * data.rate_per_min;
    const charged = data.charges.filter((c) => c.t <= t);
    const items = charged.reduce((s, c) => s + c.price, 0);
    const running = timeFee + items;
    let sample: Sample | undefined;
    if (tl) {
      const i = Math.min(tl.samples.length - 1, Math.max(0, Math.round(t / 5)));
      sample = tl.samples[i];
    }
    const remaining = sample ? Math.max(0, sample.rem_pred) : Math.max(0, (data.duration_s - t) / 60);
    const forecast = running + (remaining + data.offset_post_min) * data.rate_per_min;
    const pending = data.charges.filter((c) => c.t > t);
    return { minutes, timeFee, charged, items, running, forecast, remaining, pending, phase: sample && tl ? tl.phases[sample.phase_pred] : null };
  }, [data, tl, t]);

  const W = 640;
  const ROW = 22;
  const LBL = 112;
  const H = data ? data.tools.length * ROW + 8 : 100;
  const x = (s: number) => (data ? (s / data.duration_s) * W : 0);

  return (
    <div ref={ref} className="figure">
      <div className="grid gap-0 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {/* Running figures */}
        <div className="flex flex-col gap-5 p-5 md:border-r md:border-rule">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-ink-2">Running cost</p>
              <p className="nums font-display mt-1 text-[2.5rem] font-medium leading-none text-ink">{state ? usd(state.running) : '—'}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-ink-2">Forecast at close</p>
              <p className="nums font-display mt-1 text-[1.6rem] font-medium leading-none text-accent-strong">{state ? usd(state.forecast) : '—'}</p>
            </div>
          </div>

          <dl className="nums grid grid-cols-3 gap-x-4 gap-y-1 text-xs">
            <dt className="text-ink-3">Elapsed</dt>
            <dt className="text-ink-3">Phase</dt>
            <dt className="text-ink-3">Remaining (predicted)</dt>
            <dd className="text-ink">{mmss(t)}</dd>
            <dd className="truncate text-ink">{state?.phase ?? '—'}</dd>
            <dd className="text-ink">{state ? `${state.remaining.toFixed(1)} min` : '—'}</dd>
          </dl>

          {/* Tool presence strip with cursor */}
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Instruments in view over the case">
            <title>Instruments in view over the case</title>
            {data?.tools.map((tool, i) => (
              <g key={tool} transform={`translate(0 ${i * ROW + 4})`}>
                <text x={0} y={ROW - 7} fontSize="11" className={CHARGED.has(tool) ? 'fill-ink' : 'fill-ink-3'}>
                  {tool === 'Irrigator' ? 'Suction-irrigator' : tool === 'Clipper' ? 'Clip applier' : tool === 'SpecimenBag' ? 'Specimen bag' : tool}
                </text>
                {data.runs[tool].map(([a, b]) => (
                  <rect
                    key={a}
                    x={LBL + (x(a) * (W - LBL)) / W}
                    y={3}
                    width={Math.max(1.5, ((b - a) / data.duration_s) * (W - LBL))}
                    height={ROW - 9}
                    rx={1.5}
                    className={CHARGED.has(tool) ? (a <= t ? 'fill-accent' : 'fill-accent/40') : 'fill-ink-3/35'}
                  />
                ))}
              </g>
            ))}
            {data && <line x1={LBL + (x(t) * (W - LBL)) / W} x2={LBL + (x(t) * (W - LBL)) / W} y1={0} y2={H} className="stroke-ink" strokeWidth={1.2} />}
          </svg>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (data && t >= data.duration_s) setT(0);
                setPlaying((p) => !p);
              }}
              disabled={!data}
              className="btn btn-ghost !min-h-9 !px-3 !py-1.5 text-xs"
            >
              {playing ? 'Pause' : t > 0 && data && t < data.duration_s ? 'Resume' : 'Replay'}
            </button>
            <label htmlFor={`${id}-scrub`} className="sr-only">
              Scrub through the case
            </label>
            <input
              id={`${id}-scrub`}
              type="range"
              min={0}
              max={data?.duration_s ?? 0}
              step={1}
              value={Math.round(t)}
              disabled={!data}
              onChange={(e) => {
                setPlaying(false);
                setT(Number(e.target.value));
              }}
              className="w-full accent-[var(--accent)]"
            />
            <span className="nums w-12 text-right text-xs text-ink-2">{data ? mmss(data.duration_s) : '--:--'}</span>
          </div>
        </div>

        {/* Ledger */}
        <div className="flex flex-col p-5">
          <p className="text-xs text-ink-2">Ledger</p>
          <ol className="nums mt-3 flex flex-col divide-y divide-rule text-sm">
            <li className="flex items-baseline justify-between gap-3 py-2">
              <span className="text-ink">
                OR time <span className="text-ink-3">· {state ? `${state.minutes.toFixed(0)} min` : ''}</span>
              </span>
              <span className="text-ink">{state ? usd(state.timeFee) : '—'}</span>
            </li>
            {state?.charged.map((c) => (
              <li key={c.item} className="flex items-baseline justify-between gap-3 py-2">
                <span className="text-ink">
                  {c.label} <span className="text-ink-3">· {mmss(c.t)}</span>
                </span>
                <span className="text-ink">{usd(c.price)}</span>
              </li>
            ))}
            {state?.pending.map((c) => (
              <li key={c.item} className="flex items-baseline justify-between gap-3 py-2 text-ink-3">
                <span>{c.label}</span>
                <span>not yet seen</span>
              </li>
            ))}
          </ol>
          <p className="mt-auto pt-5 text-[0.75rem] leading-snug text-ink-3">
            Cholec80 video 49, presence labels as a perfect detector. One charge per instrument at first confirmed use, 5 s after
            first sight; 20 min of unseen setup charged from the start, 10 min of closure added to the forecast. Placeholder prices.
          </p>
        </div>
      </div>
    </div>
  );
}
