'use client';

import { ReactNode } from 'react';
import { motion, Variants, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

// =============================================================================
// Shared config
// =============================================================================

const VIEWPORT = { once: false, amount: 0.15, margin: '-50px' };

// =============================================================================
// FadeIn — basic opacity + translate-Y
// =============================================================================

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    y?: number;
    as?: 'div' | 'span' | 'p' | 'h2' | 'h3';
}

export function FadeIn({
    children,
    className,
    delay = 0,
    duration = 0.5,
    y = 24,
    as = 'div',
}: FadeInProps) {
    const prefersReduced = useReducedMotion();
    const Tag = motion[as];

    return (
        <Tag
            className={className}
            initial={{ opacity: 0, y: prefersReduced ? 0 : y }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : y }}
            viewport={VIEWPORT}
            transition={{ duration: prefersReduced ? 0.01 : duration, delay, ease: 'easeOut' }}
        >
            {children}
        </Tag>
    );
}

// =============================================================================
// SlideIn — from left or right
// =============================================================================

interface SlideInProps {
    children: ReactNode;
    className?: string;
    direction?: 'left' | 'right';
    delay?: number;
    duration?: number;
    distance?: number;
}

export function SlideIn({
    children,
    className,
    direction = 'left',
    delay = 0,
    duration = 0.6,
    distance = 60,
}: SlideInProps) {
    const prefersReduced = useReducedMotion();
    const x = direction === 'left' ? -distance : distance;

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, x: prefersReduced ? 0 : x }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: prefersReduced ? 0 : x }}
            viewport={VIEWPORT}
            transition={{ duration: prefersReduced ? 0.01 : duration, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}

// =============================================================================
// ScaleIn — scale from smaller
// =============================================================================

interface ScaleInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    scale?: number;
}

export function ScaleIn({
    children,
    className,
    delay = 0,
    duration = 0.5,
    scale = 0.9,
}: ScaleInProps) {
    const prefersReduced = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: prefersReduced ? 1 : scale }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: prefersReduced ? 1 : scale }}
            viewport={VIEWPORT}
            transition={{ duration: prefersReduced ? 0.01 : duration, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}

// =============================================================================
// StaggerContainer + StaggerItem — children animate in sequence
// =============================================================================

interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    stagger?: number;
}

export function StaggerContainer({ children, className, stagger = 0.1 }: StaggerContainerProps) {
    const prefersReduced = useReducedMotion();

    const variants: Variants = prefersReduced
        ? { hidden: {}, visible: {} }
        : {
              hidden: {},
              visible: {
                  transition: { staggerChildren: stagger },
              },
          };

    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
        >
            {children}
        </motion.div>
    );
}

interface StaggerItemProps {
    children: ReactNode;
    className?: string;
    direction?: 'up' | 'left' | 'right';
}

export function StaggerItem({ children, className, direction = 'up' }: StaggerItemProps) {
    const prefersReduced = useReducedMotion();

    const hidden = (() => {
        if (prefersReduced) return { opacity: 0 };
        switch (direction) {
            case 'left': return { opacity: 0, x: -40 };
            case 'right': return { opacity: 0, x: 40 };
            default: return { opacity: 0, y: 24 };
        }
    })();

    const variants: Variants = {
        hidden,
        visible: prefersReduced
            ? { opacity: 1, transition: { duration: 0.01 } }
            : { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
    };

    return (
        <motion.div className={className} variants={variants}>
            {children}
        </motion.div>
    );
}
