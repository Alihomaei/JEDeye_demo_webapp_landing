import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * Props for the EngineCard component.
 */
interface EngineCardProps {
    /** Icon displayed at the top of the card */
    icon: ReactNode;
    /** Card title (e.g., "Vision Engine") */
    title: string;
    /** Description of what this engine does */
    description: string;
    /** Key capabilities (bullet points) */
    capabilities?: string[];
    /** Additional CSS classes */
    className?: string;
}

/**
 * Card component for the How It Works section.
 * Displays AI engine information with icon, title, and description.
 * Simpler than SectorCard (no benefits list).
 *
 * @example
 * <EngineCard
 *   icon={<VisionIcon />}
 *   title="Vision Engine"
 *   description="Processes raw endoscopic video in real-time..."
 * />
 */
export function EngineCard({
    icon,
    title,
    description,
    capabilities,
    className,
}: EngineCardProps) {
    return (
        <Card
            className={cn(
                // Base styling - consistent with SectorCard
                'flex flex-col h-full',
                'glass-card rounded-xl',
                // Shadow transition
                'shadow-card hover:shadow-card-hover',
                // Subtle hover lift effect
                'transform transition-all duration-200 ease-out',
                'hover:-translate-y-0.5',
                className
            )}
        >
            <CardHeader className="text-center pb-2">
                {/* Icon container - centered for engine cards */}
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
                    {icon}
                </div>

                {/* Title */}
                <CardTitle className="text-lg font-semibold text-text-primary">
                    {title}
                </CardTitle>
            </CardHeader>

            {/* Description */}
            <CardContent className="flex-grow pt-0 text-center">
                <CardDescription className="text-sm text-text-secondary leading-relaxed">
                    {description}
                </CardDescription>
                {capabilities && capabilities.length > 0 && (
                    <ul className="mt-3 space-y-1.5 text-left">
                        {capabilities.map((cap) => (
                            <li key={cap} className="flex items-start gap-2 text-xs text-text-secondary">
                                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                {cap}
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}

export default EngineCard;
