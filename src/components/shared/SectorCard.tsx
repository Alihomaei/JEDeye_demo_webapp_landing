import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * Props for the SectorCard component.
 */
interface SectorCardProps {
    /** Icon displayed at the top of the card */
    icon: ReactNode;
    /** Card title (e.g., "OR Efficiency") */
    title: string;
    /** Brief description (2-3 sentences) */
    description: string;
    /** List of benefits (3-4 bullet points) */
    benefits: string[];
    /** Additional CSS classes */
    className?: string;
}

/**
 * Reusable card component for the Solutions section.
 * Displays sector/solution information with icon, title, description, and benefits list.
 * Features hover effect with elevated shadow and slight lift animation.
 *
 * @example
 * <SectorCard
 *   icon={<ORIcon />}
 *   title="Operating Room Efficiency"
 *   description="Streamline surgical workflows..."
 *   benefits={['Reduce OR turnover time', 'Enhance surgeon spatial awareness']}
 * />
 */
export function SectorCard({
    icon,
    title,
    description,
    benefits,
    className,
}: SectorCardProps) {
    return (
        <Card
            className={cn(
                // Base styling
                'flex flex-col h-full',
                'bg-white border border-border rounded-xl',
                // Shadow transition
                'shadow-card hover:shadow-card-hover',
                // Hover lift effect
                'transform transition-all duration-200 ease-out',
                'hover:-translate-y-0.5',
                className
            )}
        >
            <CardHeader className="pb-4">
                {/* Icon container */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light text-primary">
                    {icon}
                </div>

                {/* Title */}
                <CardTitle className="text-xl font-semibold text-text-primary">
                    {title}
                </CardTitle>

                {/* Description */}
                <CardDescription className="mt-2 text-text-secondary">
                    {description}
                </CardDescription>
            </CardHeader>

            {/* Benefits list - flex-grow ensures equal height cards */}
            <CardContent className="flex-grow pt-0">
                <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-text-secondary"
                        >
                            {/* Bullet point indicator */}
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

export default SectorCard;
