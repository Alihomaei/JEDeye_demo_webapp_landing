import Image from 'next/image';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { EngineCard } from '@/components/shared/EngineCard';
import { howItWorksContent } from '@/config/content';
import { cn } from '@/lib/utils';

// =============================================================================
// Icon Configuration
// =============================================================================

interface IconConfig {
    src: string;
    alt: string;
}

const iconMap: Record<string, IconConfig> = {
    'icon-vision': {
        src: '/images/icon-vision.svg',
        alt: 'Vision Engine icon - eye symbol',
    },
    'icon-spatial': {
        src: '/images/icon-spatial.svg',
        alt: 'Spatial Engine icon - 3D cube',
    },
    'icon-scoring': {
        src: '/images/icon-scoring.svg',
        alt: 'Scoring Engine icon - analytics chart',
    },
    'icon-interaction': {
        src: '/images/icon-interaction.svg',
        alt: 'Interaction Engine icon - chat bubbles',
    },
};

// Default fallback icon
const defaultIcon: IconConfig = {
    src: '/images/icon-vision.svg',
    alt: 'Engine icon',
};

// =============================================================================
// Icon Component
// =============================================================================

interface EngineIconProps {
    iconKey: string;
}

function EngineIcon({ iconKey }: EngineIconProps) {
    const config = iconMap[iconKey] || defaultIcon;

    return (
        <Image
            src={config.src}
            alt={config.alt}
            width={48}
            height={48}
            className="h-12 w-12"
            priority={false}
        />
    );
}

// =============================================================================
// HowItWorks Section Component
// =============================================================================

export function HowItWorks() {
    return (
        <SectionWrapper id="how-it-works" background="gray">
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
                {howItWorksContent.heading}
            </h2>

            {/* Subheading */}
            <p
                className={cn(
                    'text-base sm:text-lg',
                    'text-text-secondary',
                    'text-center',
                    'max-w-2xl mx-auto',
                    'mb-8 lg:mb-12'
                )}
            >
                {howItWorksContent.subheading}
            </p>

            {/* Cards Grid */}
            <div
                className={cn(
                    'grid gap-6',
                    // Responsive columns: 1 on mobile, 2 on md, 4 on xl
                    'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
                )}
            >
                {howItWorksContent.engines.map((engine) => (
                    <EngineCard
                        key={engine.id}
                        icon={<EngineIcon iconKey={engine.icon} />}
                        title={engine.title}
                        description={engine.description}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
}
