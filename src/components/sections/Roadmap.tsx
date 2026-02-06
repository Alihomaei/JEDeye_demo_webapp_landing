'use client';

import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { roadmapContent } from '@/config/content';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

const statusStyles = {
    completed: {
        dot: 'bg-primary border-primary',
        text: 'text-text-primary',
    },
    active: {
        dot: 'bg-white border-primary ring-4 ring-primary/20',
        text: 'text-text-primary',
    },
    upcoming: {
        dot: 'bg-white/70 border-gray-300',
        text: 'text-text-secondary',
    },
};

export function Roadmap() {
    const milestones = roadmapContent.milestones;

    return (
        <SectionWrapper id="roadmap" background="white">
            <FadeIn>
                <h2 className="text-section-mobile lg:text-section-desktop text-text-primary mb-4 text-center">
                    {roadmapContent.heading}
                </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
                <p className="text-base sm:text-lg text-text-secondary text-center max-w-2xl mx-auto mb-10 lg:mb-14">
                    {roadmapContent.subheading}
                </p>
            </FadeIn>

            {/* Desktop: horizontal timeline */}
            <div className="hidden md:block">
                <StaggerContainer stagger={0.12}>
                    <div className="relative flex items-start justify-between">
                        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
                        <div
                            className="absolute top-5 left-0 h-0.5 bg-primary transition-all"
                            style={{
                                width: `${(milestones.findIndex(m => m.status === 'active') / (milestones.length - 1)) * 100}%`,
                            }}
                        />
                        {milestones.map((milestone) => {
                            const styles = statusStyles[milestone.status];
                            return (
                                <StaggerItem key={milestone.id} className="relative flex flex-col items-center text-center flex-1">
                                    <div className={cn('relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2', styles.dot)}>
                                        {milestone.status === 'completed' && <Check className="h-5 w-5 text-white" />}
                                        {milestone.status === 'active' && <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />}
                                    </div>
                                    <h3 className={cn('mt-4 text-sm font-semibold', styles.text)}>{milestone.label}</h3>
                                    <p className="mt-1 text-xs text-text-secondary max-w-[160px] leading-relaxed">{milestone.description}</p>
                                </StaggerItem>
                            );
                        })}
                    </div>
                </StaggerContainer>
            </div>

            {/* Mobile: vertical timeline */}
            <StaggerContainer className="md:hidden space-y-0" stagger={0.1}>
                {milestones.map((milestone, i) => {
                    const styles = statusStyles[milestone.status];
                    const isLast = i === milestones.length - 1;
                    return (
                        <StaggerItem key={milestone.id} direction="left">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className={cn('flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2', styles.dot)}>
                                        {milestone.status === 'completed' && <Check className="h-5 w-5 text-white" />}
                                        {milestone.status === 'active' && <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />}
                                    </div>
                                    {!isLast && (
                                        <div className={cn('w-0.5 flex-1 min-h-[40px]', milestone.status === 'completed' ? 'bg-primary' : 'bg-gray-200')} />
                                    )}
                                </div>
                                <div className="pb-8">
                                    <h3 className={cn('text-sm font-semibold', styles.text)}>{milestone.label}</h3>
                                    <p className="mt-1 text-xs text-text-secondary leading-relaxed">{milestone.description}</p>
                                </div>
                            </div>
                        </StaggerItem>
                    );
                })}
            </StaggerContainer>
        </SectionWrapper>
    );
}
