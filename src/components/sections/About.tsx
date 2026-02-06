import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { aboutContent } from '@/config/content';
import { cn } from '@/lib/utils';

// =============================================================================
// About Section Component
// =============================================================================

export function About() {
    return (
        <SectionWrapper id="about" background="gray">
            {/* Section Heading */}
            <h2
                className={cn(
                    // Responsive typography
                    'text-section-mobile lg:text-section-desktop',
                    // Color
                    'text-text-primary',
                    // Spacing
                    'mb-6 lg:mb-8',
                    // Alignment
                    'text-center'
                )}
            >
                {aboutContent.heading}
            </h2>

            {/* Content Container */}
            <div className="mx-auto max-w-3xl">
                {/* Paragraphs */}
                <div className="space-y-6">
                    {aboutContent.paragraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            className={cn(
                                // Typography
                                'text-base sm:text-lg',
                                'leading-relaxed',
                                // Color
                                'text-text-secondary',
                                // Alignment
                                'text-center'
                            )}
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Placeholder for Future Diagram/Illustration */}
                <div
                    className={cn(
                        'mt-10 lg:mt-12',
                        'rounded-xl',
                        'border-2 border-dashed border-border',
                        'bg-background/50',
                        'p-8 sm:p-12',
                        'text-center'
                    )}
                    aria-hidden="true"
                >
                    <div className="flex flex-col items-center gap-3 text-text-muted">
                        <svg
                            className="h-12 w-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                        <span className="text-sm">Product diagram coming soon</span>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
