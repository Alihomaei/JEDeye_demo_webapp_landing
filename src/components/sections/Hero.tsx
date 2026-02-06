'use client';

import { Button } from '@/components/ui/button';
import { heroContent } from '@/config/content';
import { useScrollTo } from '@/hooks/useScrollTo';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Hero() {
    const { scrollTo } = useScrollTo();

    const handlePrimaryCta = () => scrollTo('waitlist');
    const handleSecondaryCta = () => scrollTo('about');

    return (
        <section
            id="hero"
            className={cn(
                'relative min-h-screen min-h-[100dvh]',
                'flex flex-col items-center justify-center',
                'px-4 sm:px-6 lg:px-8',
                'bg-gradient-to-br from-background via-background to-primary-light/20',
                'overflow-hidden'
            )}
        >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 -z-10" aria-hidden="true">
                <div className={cn('absolute -top-40 -right-40', 'h-80 w-80 sm:h-96 sm:w-96', 'rounded-full', 'bg-primary/10 blur-3xl')} />
                <div className={cn('absolute -bottom-40 -left-40', 'h-80 w-80 sm:h-96 sm:w-96', 'rounded-full', 'bg-primary-dark/10 blur-3xl')} />
                <div className={cn('absolute inset-0', 'bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)]', 'bg-[size:4rem_4rem]', 'opacity-30')} />
            </div>

            {/* Content Container — staggered entrance */}
            <motion.div
                className="relative z-10 mx-auto max-w-4xl text-center"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.15 } },
                }}
            >
                {/* Badge */}
                <motion.div
                    className="mb-6 sm:mb-8"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                    }}
                >
                    <span className={cn('inline-flex items-center gap-2', 'rounded-full', 'bg-primary/10 px-4 py-1.5', 'text-sm font-medium text-primary-dark', 'ring-1 ring-primary/20')}>
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                        </span>
                        {heroContent.badge}
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    className={cn('text-hero-mobile lg:text-hero-desktop', 'text-text-primary', 'mb-4 sm:mb-6', 'text-balance')}
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                    }}
                >
                    {heroContent.headline}
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    className={cn('text-lg sm:text-xl lg:text-2xl', 'font-normal', 'text-text-secondary', 'mb-8 sm:mb-10', 'mx-auto max-w-2xl', 'leading-relaxed')}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                    }}
                >
                    {heroContent.subheadline}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                    }}
                >
                    <Button
                        size="lg"
                        onClick={handlePrimaryCta}
                        className={cn('min-w-[200px]', 'h-12 px-8', 'text-base font-semibold', 'shadow-lg shadow-primary/25', 'hover:shadow-xl hover:shadow-primary/30', 'transition-all duration-200')}
                    >
                        {heroContent.primaryCta}
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleSecondaryCta}
                        className={cn('min-w-[200px]', 'h-12 px-8', 'text-base font-semibold', 'transition-all duration-200')}
                    >
                        {heroContent.secondaryCta}
                    </Button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <div
                className={cn('absolute bottom-8 left-1/2 -translate-x-1/2', 'hidden sm:flex flex-col items-center gap-2', 'text-text-muted', 'animate-bounce')}
                aria-hidden="true"
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
