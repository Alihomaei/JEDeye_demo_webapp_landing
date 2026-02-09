import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { DemoCarousel } from '@/components/demo/DemoCarousel';
import { demoContent } from '@/config/content';
import { FadeIn, ScaleIn } from '@/components/motion';

interface DemoProps {
  /** Controls visibility — hidden until scroll video crossfade triggers */
  active?: boolean;
}

export function Demo({ active = false }: DemoProps) {
  return (
    <div
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
        transition: 'opacity 0.4s ease-out',
      }}
    >
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
    </div>
  );
}
