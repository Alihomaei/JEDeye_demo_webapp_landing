import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Demo } from '@/components/sections/Demo';
import { Solutions } from '@/components/sections/Solutions';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Waitlist } from '@/components/sections/Waitlist';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Demo />
      <Solutions />
      <HowItWorks />
      <Waitlist />
      <Contact />
    </>
  );
}
