import Image from 'next/image';
import { modules } from '@/config/content';
import { Media } from './Media';

/**
 * A numbered list, not a card grid. Odd rows put the figure on the right,
 * even rows on the left, so the eye zig-zags down the page.
 */
export function Modules() {
  return (
    <section id="modules" className="section rule-top" data-rise>
      <div className="wrap">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          <div>
            <p className="eyebrow">{modules.eyebrow}</p>
            <h2 className="font-display mt-4 text-h2 font-medium">{modules.heading}</h2>
          </div>
          <p className="prose-measure text-lg text-ink-2 lg:pt-9">{modules.intro}</p>
        </div>

        <ol className="mt-16 flex flex-col">
          {modules.items.map((m, idx) => {
            const flip = idx % 2 === 1;
            return (
              <li
                key={m.n}
                data-rise
                className="grid gap-6 border-t border-rule py-10 lg:grid-cols-12 lg:gap-10 lg:py-12"
              >
                <div className={`flex gap-5 lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
                  <span className="nums font-mono mt-1 text-sm text-ink-3">{m.n}</span>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-[1.6rem] font-medium leading-tight">
                      {m.name}
                      {'concept' in m && m.concept && (
                        <span className="ml-2 align-middle font-mono text-[0.625rem] uppercase tracking-wider text-warn">concept</span>
                      )}
                    </h3>
                    <p className="text-lg leading-snug text-ink">{m.claim}</p>
                    <p className="prose-measure text-ink-2">{m.detail}</p>
                    <p className="nums mt-1 flex items-baseline gap-2">
                      <span className="font-display text-2xl text-accent-strong">{m.stat.value}</span>
                      <span className="text-sm text-ink-2">{m.stat.label}</span>
                    </p>
                  </div>
                </div>

                <div className={`lg:col-span-7 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-6'}`}>
                  {'clip' in m && m.clip ? (
                    <div className="figure">
                      <Media clip={m.clip} />
                    </div>
                  ) : 'figure' in m && m.figure ? (
                    <div className="figure relative" style={{ aspectRatio: String(m.figure.ratio) }}>
                      <Image src={m.figure.src} alt={m.figure.alt} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
                    </div>
                  ) : (
                    <PhaseStrip />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

const PHASES = [
  ['Preparation', 4],
  ['Calot triangle dissection', 26],
  ['Clipping and cutting', 9],
  ['Gallbladder dissection', 31],
  ['Packaging', 5],
  ['Cleaning and coagulation', 15],
  ['Retraction', 10],
] as const;

/** Typical phase proportions of a cholecystectomy, drawn as a single band. */
function PhaseStrip() {
  return (
    <div className="figure p-5">
      <p className="mb-4 flex items-center gap-2 text-sm text-ink-2">
        <span className="pulse" aria-hidden="true" />
        The seven phases of a cholecystectomy, in typical proportion
      </p>
      <div className="relative">
        <div className="flex h-10 w-full overflow-hidden rounded-sm">
          {PHASES.map(([name, pct], i) => (
            <div key={name} title={name} style={{ width: `${pct}%`, background: `var(--phase-${i})` }} />
          ))}
        </div>
        <span className="playhead" aria-hidden="true" />
      </div>
      <ol className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-ink-2 sm:grid-cols-3">
        {PHASES.map(([name, pct], i) => (
          <li key={name} className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: `var(--phase-${i})` }} />
            <span className="truncate">{name}</span>
            <span className="nums ml-auto font-mono text-ink-3">{pct}%</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
