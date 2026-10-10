'use client';

import { useId, useState } from 'react';
import { evidence } from '@/config/content';
import { Figure, Media } from './Media';
import dynamic from 'next/dynamic';
import { VideoComparisonSlider } from '@/components/demo/VideoComparisonSlider';

// three.js and the model only load when this tab is opened.
const TwinScene = dynamic(() => import('@/components/twin/TwinScene'), {
  ssr: false,
  loading: () => (
    <div className="figure flex items-center justify-center text-sm text-ink-2" style={{ aspectRatio: '16 / 10' }}>
      Loading the twin…
    </div>
  ),
});

export function Evidence() {
  const [active, setActive] = useState(0);
  const id = useId();
  const tab = evidence.tabs[active];

  return (
    <section id="evidence" className="section rule-top bg-paper-2/60" data-rise>
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
          </div>

          <div key={tab.id} className="flex flex-col gap-4">
            {tab.kind === 'compare' && (
              <>
                <div className="figure">
                  <VideoComparisonSlider />
                </div>
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
            {tab.kind === 'scene' && (
              <>
                <TwinScene />
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
