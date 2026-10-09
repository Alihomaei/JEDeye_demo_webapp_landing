'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { timeline } from '@/config/content';

type Sample = {
  t: number;
  phase_pred: number;
  phase_gt: number;
  rem_pred: number;
  rem_lo: number;
  rem_hi: number;
  rem_gt: number;
};
type Data = { video: string; total_min: number; phases: string[]; step_s: number; model: string; samples: Sample[] };

const W = 1000;
const H = 300;
const PAD = { l: 44, r: 16, t: 10, b: 24 };
const BAND = 18;

function segments(samples: Sample[], key: 'phase_pred' | 'phase_gt') {
  const out: { phase: number; t0: number; t1: number }[] = [];
  for (const s of samples) {
    const last = out[out.length - 1];
    if (last && last.phase === s[key]) last.t1 = s.t;
    else out.push({ phase: s[key], t0: s.t, t1: s.t });
  }
  return out;
}

/**
 * The page's signature element: a scrubbable read-out of one held-out surgery.
 * Pure SVG from a few KB of JSON; the only "video" on the page that is data.
 */
export function Timeline() {
  const [data, setData] = useState<Data | null>(null);
  const [failed, setFailed] = useState(false);
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        fetch(timeline.dataUrl)
          .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
          .then((d: Data) => {
            setData(d);
            setI(Math.floor(d.samples.length * 0.42));
          })
          .catch(() => setFailed(true));
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const geo = useMemo(() => {
    if (!data) return null;
    const s = data.samples;
    const tMax = s[s.length - 1].t;
    const yMax = Math.max(...s.map((x) => Math.max(x.rem_hi, x.rem_gt))) * 1.05;
    const x = (t: number) => PAD.l + (t / tMax) * (W - PAD.l - PAD.r);
    const plotTop = PAD.t + BAND * 2 + 14;
    const y = (m: number) => H - PAD.b - (m / yMax) * (H - PAD.b - plotTop);
    const line = (k: 'rem_pred' | 'rem_gt') => s.map((p, j) => `${j ? 'L' : 'M'}${x(p.t).toFixed(1)},${y(p[k]).toFixed(1)}`).join('');
    const band =
      s.map((p, j) => `${j ? 'L' : 'M'}${x(p.t).toFixed(1)},${y(p.rem_hi).toFixed(1)}`).join('') +
      [...s].reverse().map((p) => `L${x(p.t).toFixed(1)},${y(p.rem_lo).toFixed(1)}`).join('') +
      'Z';
    const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => ({ t: f * tMax, label: `${Math.round((f * tMax) / 60)} min` }));
    const yTicks = [0, 0.5, 1].map((f) => ({ m: f * yMax, label: `${Math.round(f * yMax)}` }));
    return { x, y, line, band, tMax, yMax, plotTop, ticks, yTicks, pred: segments(s, 'phase_pred'), gt: segments(s, 'phase_gt') };
  }, [data]);

  const cur = data?.samples[i];

  return (
    <section id="timeline" className="section rule-top" ref={ref} aria-labelledby={`${id}-h`}>
      <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
        <div className="flex flex-col gap-4">
          <p className="eyebrow">{timeline.eyebrow}</p>
          <h2 id={`${id}-h`} className="font-display text-h2 font-medium">
            {timeline.heading}
          </h2>
          <p className="prose-measure text-ink-2">{timeline.intro}</p>

          {cur && data && (
            <dl className="nums mt-2 grid grid-cols-2 gap-x-6 gap-y-3 rule-top pt-5 text-sm">
              <div>
                <dt className="text-ink-3">Elapsed</dt>
                <dd className="font-display text-2xl text-ink">{(cur.t / 60).toFixed(1)} min</dd>
              </div>
              <div>
                <dt className="text-ink-3">Predicted remaining</dt>
                <dd className="font-display text-2xl text-accent-strong">{cur.rem_pred.toFixed(1)} min</dd>
                <dd className="text-xs text-ink-3">
                  95% band {cur.rem_lo.toFixed(0)}–{cur.rem_hi.toFixed(0)} · actual {cur.rem_gt.toFixed(1)}
                </dd>
              </div>
              <div>
                <dt className="text-ink-3">Phase recognised</dt>
                <dd className="flex items-center gap-2 text-ink">
                  <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: `var(--phase-${cur.phase_pred})` }} />
                  {data.phases[cur.phase_pred]}
                </dd>
              </div>
              <div>
                <dt className="text-ink-3">Annotated phase</dt>
                <dd className="flex items-center gap-2 text-ink">
                  <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: `var(--phase-${cur.phase_gt})` }} />
                  {data.phases[cur.phase_gt]}
                </dd>
              </div>
            </dl>
          )}
        </div>

        <div className="figure">
          <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
            {data && geo && cur ? (
              <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Phase and remaining-time read-out across one surgery">
                {/* phase bands: recognised, then annotated */}
                {(['pred', 'gt'] as const).map((k, row) =>
                  geo[k].map((seg) => (
                    <rect
                      key={`${k}-${seg.t0}`}
                      x={geo.x(seg.t0)}
                      y={PAD.t + row * (BAND + 2)}
                      width={Math.max(1, geo.x(seg.t1 + data.step_s) - geo.x(seg.t0))}
                      height={BAND}
                      fill={`var(--phase-${seg.phase})`}
                    />
                  )),
                )}
                <text x={PAD.l - 6} y={PAD.t + BAND - 5} textAnchor="end" className="fill-ink-3 font-mono" fontSize="10">
                  AI
                </text>
                <text x={PAD.l - 6} y={PAD.t + BAND * 2 - 3} textAnchor="end" className="fill-ink-3 font-mono" fontSize="10">
                  GT
                </text>

                {/* axes */}
                {geo.yTicks.map((tk) => (
                  <g key={tk.m}>
                    <line x1={PAD.l} x2={W - PAD.r} y1={geo.y(tk.m)} y2={geo.y(tk.m)} stroke="var(--rule)" strokeDasharray={tk.m ? '2 4' : undefined} />
                    <text x={PAD.l - 6} y={geo.y(tk.m) + 3} textAnchor="end" fontSize="10" className="fill-ink-3 font-mono">
                      {tk.label}
                    </text>
                  </g>
                ))}
                {geo.ticks.map((tk) => (
                  <text key={tk.t} x={geo.x(tk.t)} y={H - 8} textAnchor="middle" fontSize="10" className="fill-ink-3 font-mono">
                    {tk.label}
                  </text>
                ))}

                {/* uncertainty band, truth, prediction */}
                <path d={geo.band} fill="var(--accent-soft)" />
                <path d={geo.line('rem_gt')} fill="none" stroke="var(--ink-3)" strokeWidth="1.25" strokeDasharray="3 3" />
                <path d={geo.line('rem_pred')} fill="none" stroke="var(--accent)" strokeWidth="2" />

                {/* cursor */}
                <line x1={geo.x(cur.t)} x2={geo.x(cur.t)} y1={PAD.t} y2={H - PAD.b} stroke="var(--ink)" strokeWidth="1" />
                <circle cx={geo.x(cur.t)} cy={geo.y(cur.rem_pred)} r="4" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
                <circle cx={geo.x(cur.t)} cy={geo.y(cur.rem_gt)} r="3" fill="var(--ink-2)" stroke="var(--paper)" strokeWidth="2" />
              </svg>
            ) : (
              <div className="absolute inset-0 grid place-items-center text-sm text-ink-3">
                {failed ? 'Read-out unavailable.' : 'Loading read-out…'}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 border-t border-rule px-4 py-3">
            <label htmlFor={`${id}-scrub`} className="flex items-center justify-between text-xs text-ink-2">
              <span>Scrub through the case</span>
              <span className="font-mono text-ink-3">{timeline.source}</span>
            </label>
            <input
              id={`${id}-scrub`}
              type="range"
              min={0}
              max={data ? data.samples.length - 1 : 0}
              value={i}
              disabled={!data}
              onChange={(e) => setI(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
              aria-valuetext={cur ? `${(cur.t / 60).toFixed(1)} minutes elapsed` : undefined}
            />
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.6875rem] text-ink-3">
              <span className="flex items-center gap-1.5"><i className="inline-block h-0.5 w-4 bg-accent" />predicted remaining</span>
              <span className="flex items-center gap-1.5"><i className="inline-block h-0.5 w-4 border-t border-dashed border-ink-3" />actual remaining</span>
              <span className="flex items-center gap-1.5"><i className="inline-block h-2.5 w-4 bg-accent-soft" />95% interval</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
