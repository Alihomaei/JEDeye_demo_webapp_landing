import { business } from '@/config/content';

export function Business() {
  return (
    <section id="business" className="section rule-top bg-paper-2/60">
      <div className="wrap">
        <p className="eyebrow">{business.eyebrow}</p>
        <h2 className="font-display mt-4 max-w-[22ch] text-h2 font-medium">{business.heading}</h2>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {business.levers.map((l, i) => (
            <div key={l.name} className="flex flex-col gap-3 border-t border-rule-strong pt-5">
              <span className="nums font-mono text-xs text-ink-3">0{i + 1}</span>
              <h3 className="font-display text-2xl font-medium">{l.name}</h3>
              <p className="text-ink-2">{l.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="font-display text-2xl font-medium">{business.whyNow.heading}</h3>
            <dl className="mt-6 flex flex-col gap-6">
              {business.whyNow.items.map((w) => (
                <div key={w.title} className="grid gap-1 border-t border-rule pt-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="font-medium text-ink">{w.title}</dt>
                  <dd className="text-ink-2">{w.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="font-display text-2xl font-medium">{business.roadmap.heading}</h3>
            <ol className="mt-6 flex flex-col">
              {business.roadmap.items.map((r) => (
                <li key={r.what} className="grid grid-cols-[5rem_1fr] gap-4 border-t border-rule py-3.5">
                  <span className={`font-mono text-xs ${r.status === 'done' ? 'text-ok' : r.status === 'active' ? 'text-accent-strong' : 'text-ink-3'}`}>
                    {r.when}
                  </span>
                  <span className={r.status === 'next' ? 'text-ink-2' : 'text-ink'}>{r.what}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
