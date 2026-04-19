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

export default function Home() {
  return (
    <>
      <ScrollVideo>
        <Hero />
      </ScrollVideo>
      <div className="relative z-20">
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
