import { ScrollHero } from '@/components/site/ScrollHero';
import { Hero } from '@/components/site/Hero';
import { Pitch } from '@/components/site/Pitch';
import { Modules } from '@/components/site/Modules';
import { Timeline } from '@/components/site/Timeline';
import { Evidence } from '@/components/site/Evidence';
import { MetricsTable } from '@/components/site/MetricsTable';
import { Business } from '@/components/site/Business';
import { Team } from '@/components/site/Team';
import { Closing } from '@/components/site/Closing';

export default function Home() {
  return (
    <>
      <ScrollHero>
        <Hero />
        <Pitch />
        <Modules />
        <Timeline />
        <Evidence />
        <MetricsTable />
        <Business />
        <Team />
        <Closing />
      </ScrollHero>
    </>
  );
}
