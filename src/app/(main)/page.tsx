'use client';

import { useCallback, useRef } from 'react';
import { Hero } from '@/components/sections/Hero';
import { ScrollVideo } from '@/components/ScrollVideo';
import { Partners } from '@/components/sections/Partners';
import { About } from '@/components/sections/About';
import { Demo } from '@/components/sections/Demo';
import { Solutions } from '@/components/sections/Solutions';
import { WhyNow } from '@/components/sections/WhyNow';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Pipeline } from '@/components/sections/Pipeline';
import { Roadmap } from '@/components/sections/Roadmap';
import { Team } from '@/components/sections/Team';
import { Waitlist } from '@/components/sections/Waitlist';
import { Contact } from '@/components/sections/Contact';

// Demo begins rising when canvas has faded to 50% (fadeProgress = 0.5).
// It finishes rising (translateY 0, opacity 1) when canvas is fully gone (1.0).
const DEMO_RISE_START = 0.5;

export default function Home() {
  const demoWrapperRef = useRef<HTMLDivElement>(null);

  const handleFadeProgress = useCallback((progress: number) => {
    const el = demoWrapperRef.current;
    if (!el) return;
    const rise = Math.max(0, Math.min(1, (progress - DEMO_RISE_START) / (1 - DEMO_RISE_START)));
    el.style.transform = `translateY(${(1 - rise) * 100}vh)`;
    el.style.opacity = String(rise);
  }, []);

  return (
    <>
      <ScrollVideo onFadeProgress={handleFadeProgress}>
        <Hero />
      </ScrollVideo>
      <div
        ref={demoWrapperRef}
        className="relative z-0"
        style={{ transform: 'translateY(100vh)', opacity: 0, willChange: 'transform, opacity' }}
      >
        <Demo />
      </div>
      <Partners />
      <About />
      <Solutions />
      <WhyNow />
      <HowItWorks />
      <Pipeline />
      <Roadmap />
      <Team />
      <Waitlist />
      <Contact />
    </>
  );
}
