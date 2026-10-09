import { hero } from '@/config/content';
import { Figure, Media } from './Media';

export function Hero() {
  return (
    <section className="wrap grid gap-10 pb-16 pt-14 md:pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:pb-24">
      <div className="flex flex-col gap-6 lg:pt-4">
        <p className="eyebrow reveal" style={{ ['--i' as string]: 0 }}>
          {hero.eyebrow}
        </p>
        <h1
          className="font-display reveal text-display font-medium text-ink"
          style={{ ['--i' as string]: 1, maxWidth: '12ch' }}
        >
          {hero.headline}
        </h1>
        <p className="reveal max-w-[46ch] text-lg text-ink-2" style={{ ['--i' as string]: 2 }}>
          {hero.lede}
        </p>
        <div className="reveal flex flex-wrap gap-3" style={{ ['--i' as string]: 3 }}>
          <a href={hero.primaryCta.href} className="btn btn-primary">
            {hero.primaryCta.label}
          </a>
          <a href={hero.secondaryCta.href} className="btn btn-ghost">
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>

      <div className="reveal flex flex-col gap-6" style={{ ['--i' as string]: 2 }}>
        <Figure label={hero.clipCaption.label} text={hero.clipCaption.text} source={hero.clipCaption.source}>
          <Media clip={hero.clip} priority />
        </Figure>

        <dl className="grid grid-cols-3 gap-x-6 gap-y-2 rule-top pt-5">
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
    </section>
  );
}
