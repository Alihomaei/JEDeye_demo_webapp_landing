import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { DemoCarousel } from '@/components/demo/DemoCarousel';
import { demoContent } from '@/config/content';
import { FadeIn, ScaleIn } from '@/components/motion';

export function Demo() {
  return (
    <SectionWrapper id="demo" background="gray">
      <FadeIn>
        <div className="text-center mb-10">
          <h2 className="text-section-mobile lg:text-section-desktop text-text-primary mb-4">
            {demoContent.heading}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {demoContent.intro}
          </p>
        </div>
      </FadeIn>

      <ScaleIn delay={0.2} scale={0.95}>
        <DemoCarousel />
      </ScaleIn>
    </SectionWrapper>
  );
}
