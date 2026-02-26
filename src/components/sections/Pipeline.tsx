import {
    ScanEye,
    Crosshair,
    Brain,
    Wrench,
    Bone,
    Box,
    Clock,
    Layers,
    type LucideIcon,
} from 'lucide-react';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { EngineCard } from '@/components/shared/EngineCard';
import { pipelineContent } from '@/config/content';
import { cn } from '@/lib/utils';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

const iconMap: Record<string, LucideIcon> = {
    ScanEye,
    Crosshair,
    Brain,
    Wrench,
    Bone,
    Box,
    Clock,
    Layers,
};

function ModuleIcon({ iconKey }: { iconKey: string }) {
    const Icon = iconMap[iconKey] || ScanEye;
    return <Icon className="h-7 w-7" strokeWidth={1.5} />;
}

export function Pipeline() {
    return (
        <SectionWrapper id="pipeline" background="white">
            <FadeIn>
                <h2
                    className={cn(
                        'text-section-mobile lg:text-section-desktop',
                        'text-text-primary',
                        'mb-4',
                        'text-center'
                    )}
                >
                    {pipelineContent.heading}
                </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
                <p
                    className={cn(
                        'text-base sm:text-lg',
                        'text-text-secondary',
                        'text-center',
                        'max-w-3xl mx-auto',
                        'mb-8 lg:mb-12'
                    )}
                >
                    {pipelineContent.subheading}
                </p>
            </FadeIn>

            <StaggerContainer
                className={cn(
                    'grid gap-6',
                    'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
                )}
                stagger={0.08}
            >
                {pipelineContent.modules.map((mod) => (
                    <StaggerItem key={mod.id}>
                        <EngineCard
                            icon={<ModuleIcon iconKey={mod.icon} />}
                            title={mod.title}
                            description={mod.description}
                            capabilities={mod.capabilities}
                        />
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </SectionWrapper>
    );
}
