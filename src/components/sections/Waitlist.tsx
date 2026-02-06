import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { WaitlistForm } from '@/components/forms/WaitlistForm';
import { waitlistContent } from '@/config/content';
import { cn } from '@/lib/utils';

// =============================================================================
// Waitlist Section Component
// =============================================================================

export function Waitlist() {
    return (
        <SectionWrapper id="waitlist" background="white">
            {/* Section Heading */}
            <h2
                className={cn(
                    // Responsive typography
                    'text-section-mobile lg:text-section-desktop',
                    // Color
                    'text-text-primary',
                    // Spacing
                    'mb-4',
                    // Alignment
                    'text-center'
                )}
            >
                {waitlistContent.heading}
            </h2>

            {/* Subheading */}
            <p
                className={cn(
                    'text-base sm:text-lg',
                    'text-text-secondary',
                    'text-center',
                    'max-w-xl mx-auto',
                    'mb-8 lg:mb-10'
                )}
            >
                {waitlistContent.subheading}
            </p>

            {/* Form Container - Centered with max-width */}
            <div className="mx-auto max-w-md">
                <WaitlistForm />
            </div>
        </SectionWrapper>
    );
}
