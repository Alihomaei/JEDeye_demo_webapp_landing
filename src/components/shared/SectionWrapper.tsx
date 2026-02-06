'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Props for the SectionWrapper component.
 */
interface SectionWrapperProps {
    /** Section anchor ID for navigation links */
    id: string;
    /** Section content */
    children: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Background color variant */
    background?: 'white' | 'gray';
}

/**
 * Framer Motion animation variants for section entry.
 */
const sectionVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

/**
 * Reduced motion variants (instant appearance, no movement).
 */
const reducedMotionVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.01,
        },
    },
};

/**
 * Reusable wrapper for page sections with consistent spacing and scroll animations.
 * Wraps content in a semantic <section> element with proper ID for anchor links.
 * Applies Framer Motion fade-in/slide-up animation on viewport entry.
 * Respects prefers-reduced-motion for accessibility.
 *
 * @example
 * <SectionWrapper id="about" background="gray">
 *   <h2>About Us</h2>
 *   <p>Content here...</p>
 * </SectionWrapper>
 */
export function SectionWrapper({
    id,
    children,
    className,
    background = 'white',
}: SectionWrapperProps): JSX.Element {
    // Check if user prefers reduced motion
    const prefersReducedMotion = useReducedMotion();

    // Select appropriate animation variants based on motion preference
    const variants = prefersReducedMotion ? reducedMotionVariants : sectionVariants;

    return (
        <motion.section
            id={id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={variants}
            className={cn(
                // Responsive vertical padding using Tailwind spacing tokens
                'py-section-mobile lg:py-section-desktop',
                // Horizontal padding for mobile
                'px-4 sm:px-6 lg:px-8',
                // Background color variants
                background === 'white' ? 'bg-white' : 'bg-muted',
                className
            )}
        >
            {/* Centered container with max-width */}
            <div className="mx-auto max-w-container">
                {children}
            </div>
        </motion.section>
    );
}

export default SectionWrapper;
