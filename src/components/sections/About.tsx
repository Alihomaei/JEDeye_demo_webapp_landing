import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { aboutContent } from '@/config/content';
import { cn } from '@/lib/utils';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

export function About() {
    return (
        <SectionWrapper id="about" background="gray">
            <FadeIn>
                <h2
                    className={cn(
                        'text-section-mobile lg:text-section-desktop',
                        'text-text-primary',
                        'mb-6 lg:mb-8',
                        'text-center'
                    )}
                >
                    {aboutContent.heading}
                </h2>
            </FadeIn>

            <div className="mx-auto max-w-3xl">
                <StaggerContainer className="space-y-6" stagger={0.15}>
                    {aboutContent.paragraphs.map((paragraph, index) => (
                        <StaggerItem key={index}>
                            <p
                                className={cn(
                                    'text-base sm:text-lg',
                                    'leading-relaxed',
                                    'text-text-secondary',
                                    'text-center'
                                )}
                            >
                                {paragraph}
                            </p>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Market stats */}
                <FadeIn delay={0.3}>
                    <div className="mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {aboutContent.stats.map((stat) => (
                            <div
                                key={stat.value}
                                className="glass-card rounded-xl p-6 text-center"
                            >
                                <div className="text-3xl sm:text-4xl font-bold text-primary-dark mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-text-primary">
                                    {stat.label}
                                </div>
                                <div className="text-xs text-text-muted mt-1">
                                    {stat.source}
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeIn>

                {/* Positioning statement */}
                <FadeIn delay={0.4}>
                    <p className="mt-8 text-base sm:text-lg text-center font-medium text-text-primary italic">
                        {aboutContent.positioning}
                    </p>
                </FadeIn>
            </div>
        </SectionWrapper>
    );
}
