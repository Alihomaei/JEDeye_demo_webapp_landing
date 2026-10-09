import { hero } from '@/config/content';
import { Figure, Media } from './Media';

/** First light section after the scroll-stopped hero: the twin and three measured facts. */
export function Hero() {
  return (
    <section className="wrap relative z-10 grid gap-10 pb-16 pt-14 md:pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:pb-24">
      <div className="flex flex-col gap-5 lg:pt-2">
        <p className="eyebrow">At a glance</p>
        <h2 className="font-display text-h2 font-medium">Built from the video, measured on held-out cases.</h2>
        <dl className="mt-2 grid grid-cols-3 gap-x-6 gap-y-2 rule-top pt-5 sm:grid-cols-1 sm:gap-y-6">
          {hero.facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-1">
              <dd className="nums font-display text-[clamp(1.75rem,1.2rem+1.8vw,2.75rem)] font-medium leading-none text-ink">
                {f.value}
                <span className="ml-1 text-[0.5em] text-ink-2">{f.unit}</span>
              </dd>
              <dt className="text-sm text-ink-2">{f.label}</dt>
              <span className="font-mono text-[0.6875rem] text-ink-3">{f.note}</span>
            </div>
          ))}
        </dl>
      </div>

      <Figure label={hero.clipCaption.label} text={hero.clipCaption.text} source={hero.clipCaption.source}>
        <Media clip={hero.clip} priority />
      </Figure>
    </section>
  );
}
