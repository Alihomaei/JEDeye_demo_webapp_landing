import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { whyNowContent } from '@/config/content';
import { cn } from '@/lib/utils';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

export function WhyNow() {
    return (
        <SectionWrapper id="why-now" background="gray">
            <FadeIn>
                <h2 className={cn('text-section-mobile lg:text-section-desktop', 'text-text-primary', 'mb-4', 'text-center')}>
                    {whyNowContent.heading}
                </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
                <p className={cn('text-base sm:text-lg', 'text-text-secondary', 'text-center', 'max-w-2xl mx-auto', 'mb-10 lg:mb-12')}>
                    {whyNowContent.subheading}
                </p>
            </FadeIn>

            <StaggerContainer
                className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto"
                stagger={0.15}
            >
                {whyNowContent.drivers.map((driver) => (
                    <StaggerItem key={driver.id}>
                        <div className="glass-card rounded-xl p-6 sm:p-8 h-full flex flex-col">
                            <h3 className="text-xl font-semibold text-text-primary mb-3">
                                {driver.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-grow">
                                {driver.description}
                            </p>
                            <div className="rounded-lg bg-primary/10 p-3 mb-3">
                                <p className="text-sm font-semibold text-primary-dark">
                                    {driver.highlight}
                                </p>
                            </div>
                            <p className="text-xs text-text-muted">
                                {driver.timeline}
                            </p>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </SectionWrapper>
    );
}
