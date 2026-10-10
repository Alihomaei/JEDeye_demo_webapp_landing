import { hero } from '@/config/content';
import { Media } from './Media';
import { Count } from './Count';

/** First light section after the scroll-stopped hero: the twin and three measured facts. */
export function Hero() {
  return (
    <section className="wrap relative z-10 grid gap-10 pb-16 pt-14 md:pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14 lg:pb-24">
      <div className="flex flex-col gap-5" data-rise>
        <p className="eyebrow">At a glance</p>
        <h2 className="font-display text-h2 font-medium">Built from the video, measured on held-out cases.</h2>
        <dl className="mt-2 grid grid-cols-3 gap-x-6 gap-y-2 rule-top pt-5 sm:grid-cols-1 sm:gap-y-6">
          {hero.facts.map((f, i) => (
            <div key={f.label} className="flex flex-col gap-1" data-rise style={{ ['--i' as string]: i + 1 }}>
              <dd className="nums font-display text-[clamp(1.75rem,1.2rem+1.8vw,2.75rem)] font-medium leading-none text-ink">
                <Count value={f.value} />
                <span className="ml-1 text-[0.5em] text-ink-2">{f.unit}</span>
              </dd>
              <dt className="text-sm text-ink-2">{f.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="figure self-center" data-rise style={{ ['--i' as string]: 2 }}>
        <Media clip={hero.clip} priority />
      </div>
    </section>
  );
}
