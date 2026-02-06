import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { WaitlistForm } from '@/components/forms/WaitlistForm';
import { waitlistContent } from '@/config/content';
import { cn } from '@/lib/utils';
import { FadeIn, ScaleIn } from '@/components/motion';

export function Waitlist() {
    return (
        <SectionWrapper id="waitlist" background="white">
            <FadeIn>
                <h2 className={cn('text-section-mobile lg:text-section-desktop', 'text-text-primary', 'mb-4', 'text-center')}>
                    {waitlistContent.heading}
                </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
                <p className={cn('text-base sm:text-lg', 'text-text-secondary', 'text-center', 'max-w-xl mx-auto', 'mb-8 lg:mb-10')}>
                    {waitlistContent.subheading}
                </p>
            </FadeIn>

            <ScaleIn delay={0.2} scale={0.95}>
                <div className="mx-auto max-w-md">
                    <WaitlistForm />
                </div>
            </ScaleIn>
        </SectionWrapper>
    );
}
