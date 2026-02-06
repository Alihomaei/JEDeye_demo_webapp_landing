import { Hero } from '@/components/sections/Hero';
import { Partners } from '@/components/sections/Partners';
import { About } from '@/components/sections/About';
import { Demo } from '@/components/sections/Demo';
import { Solutions } from '@/components/sections/Solutions';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Roadmap } from '@/components/sections/Roadmap';
import { Team } from '@/components/sections/Team';
import { Waitlist } from '@/components/sections/Waitlist';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <About />
      <Demo />
      <Solutions />
      <HowItWorks />
      <Roadmap />
      <Team />
      <Waitlist />
      <Contact />
    </>
  );
}
