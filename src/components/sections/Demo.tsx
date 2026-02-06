import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { DemoCarousel } from '@/components/demo/DemoCarousel';
import { demoContent } from '@/config/content';

export function Demo() {
  return (
    <SectionWrapper id="demo" background="gray">
      <div className="text-center mb-10">
        <h2 className="text-section-mobile lg:text-section-desktop text-text-primary mb-4">
          {demoContent.heading}
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          {demoContent.intro}
        </p>
      </div>

      <DemoCarousel />
    </SectionWrapper>
  );
}
