import Image from 'next/image';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { SectorCard } from '@/components/shared/SectorCard';
import { solutionsContent } from '@/config/content';
import { cn } from '@/lib/utils';

// =============================================================================
// Icon Configuration
// =============================================================================

interface IconConfig {
    src: string;
    alt: string;
}

const iconMap: Record<string, IconConfig> = {
    'icon-or': {
        src: '/images/icon-or.svg',
        alt: 'Operating Room Efficiency icon',
    },
    'icon-insurance': {
        src: '/images/icon-insurance.svg',
        alt: 'Insurance and Quality Assurance icon',
    },
    'icon-education': {
        src: '/images/icon-education.svg',
        alt: 'Education and Training icon',
    },
};

// Default fallback icon
const defaultIcon: IconConfig = {
    src: '/images/icon-or.svg',
    alt: 'Section icon',
};

// =============================================================================
// Icon Component
// =============================================================================

interface SectorIconProps {
    iconKey: string;
}

function SectorIcon({ iconKey }: SectorIconProps) {
    const config = iconMap[iconKey] || defaultIcon;

    return (
        <Image
            src={config.src}
            alt={config.alt}
            width={48}
            height={48}
            className="h-12 w-12 text-primary"
            priority={false}
        />
    );
}

// =============================================================================
// Solutions Section Component
// =============================================================================

export function Solutions() {
    return (
        <SectionWrapper id="solutions" background="white">
            {/* Section Heading */}
            <h2
                className={cn(
                    // Responsive typography
                    'text-section-mobile lg:text-section-desktop',
                    // Color
                    'text-text-primary',
                    // Spacing
                    'mb-8 lg:mb-12',
                    // Alignment
                    'text-center'
                )}
            >
                {solutionsContent.heading}
            </h2>

            {/* Cards Grid */}
            <div
                className={cn(
                    'grid gap-6 lg:gap-8',
                    // Responsive columns: 1 on mobile, 3 on lg+
                    'grid-cols-1 lg:grid-cols-3'
                )}
            >
                {solutionsContent.cards.map((card) => (
                    <SectorCard
                        key={card.id}
                        icon={<SectorIcon iconKey={card.icon} />}
                        title={card.title}
                        description={card.description}
                        benefits={card.benefits}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
}
