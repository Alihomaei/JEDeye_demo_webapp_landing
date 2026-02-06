import Image from 'next/image';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { SectorCard } from '@/components/shared/SectorCard';
import { solutionsContent } from '@/config/content';
import { cn } from '@/lib/utils';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

interface IconConfig { src: string; alt: string; }

const iconMap: Record<string, IconConfig> = {
    'icon-or': { src: '/images/icon-or.svg', alt: 'Operating Room Efficiency icon' },
    'icon-insurance': { src: '/images/icon-insurance.svg', alt: 'Insurance and Quality Assurance icon' },
    'icon-education': { src: '/images/icon-education.svg', alt: 'Education and Training icon' },
};

const defaultIcon: IconConfig = { src: '/images/icon-or.svg', alt: 'Section icon' };

function SectorIcon({ iconKey }: { iconKey: string }) {
    const config = iconMap[iconKey] || defaultIcon;
    return <Image src={config.src} alt={config.alt} width={48} height={48} className="h-12 w-12 text-primary" priority={false} />;
}

export function Solutions() {
    return (
        <SectionWrapper id="solutions" background="white">
            <FadeIn>
                <h2 className={cn('text-section-mobile lg:text-section-desktop', 'text-text-primary', 'mb-4', 'text-center')}>
                    {solutionsContent.heading}
                </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
                <p className={cn('text-base sm:text-lg', 'text-text-secondary', 'text-center', 'max-w-2xl mx-auto', 'mb-8 lg:mb-12')}>
                    {solutionsContent.subheading}
                </p>
            </FadeIn>

            <StaggerContainer
                className={cn('grid gap-6 lg:gap-8', 'grid-cols-1 lg:grid-cols-3')}
                stagger={0.15}
            >
                {solutionsContent.cards.map((card) => (
                    <StaggerItem key={card.id}>
                        <SectorCard
                            icon={<SectorIcon iconKey={card.icon} />}
                            title={card.title}
                            description={card.description}
                            benefits={card.benefits}
                        />
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </SectionWrapper>
    );
}
