import Image from 'next/image';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { EngineCard } from '@/components/shared/EngineCard';
import { howItWorksContent } from '@/config/content';
import { cn } from '@/lib/utils';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

interface IconConfig { src: string; alt: string; }

const iconMap: Record<string, IconConfig> = {
    'icon-vision': { src: '/images/icon-vision.svg', alt: 'Vision Engine icon - eye symbol' },
    'icon-spatial': { src: '/images/icon-spatial.svg', alt: 'Spatial Engine icon - 3D cube' },
    'icon-scoring': { src: '/images/icon-scoring.svg', alt: 'Scoring Engine icon - analytics chart' },
    'icon-interaction': { src: '/images/icon-interaction.svg', alt: 'Interaction Engine icon - chat bubbles' },
};

const defaultIcon: IconConfig = { src: '/images/icon-vision.svg', alt: 'Engine icon' };

function EngineIcon({ iconKey }: { iconKey: string }) {
    const config = iconMap[iconKey] || defaultIcon;
    return <Image src={config.src} alt={config.alt} width={48} height={48} className="h-12 w-12" priority={false} />;
}

export function HowItWorks() {
    return (
        <SectionWrapper id="how-it-works" background="gray">
            <FadeIn>
                <h2 className={cn('text-section-mobile lg:text-section-desktop', 'text-text-primary', 'mb-4', 'text-center')}>
                    {howItWorksContent.heading}
                </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
                <p className={cn('text-base sm:text-lg', 'text-text-secondary', 'text-center', 'max-w-2xl mx-auto', 'mb-8 lg:mb-12')}>
                    {howItWorksContent.subheading}
                </p>
            </FadeIn>

            <StaggerContainer
                className={cn('grid gap-6', 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4')}
                stagger={0.12}
            >
                {howItWorksContent.engines.map((engine) => (
                    <StaggerItem key={engine.id}>
                        <EngineCard
                            icon={<EngineIcon iconKey={engine.icon} />}
                            title={engine.title}
                            description={engine.description}
                            capabilities={engine.capabilities}
                        />
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </SectionWrapper>
    );
}
