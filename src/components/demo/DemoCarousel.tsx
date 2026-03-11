'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VideoComparisonSlider } from './VideoComparisonSlider';
import { SegmentationLegend } from './SegmentationLegend';
import { demoContent } from '@/config/content';

const slides = demoContent.slides;

/**
 * Video slide with loading state — shows spinner until video is cached and ready,
 * then auto-plays (or shows controls for pitch video).
 */
function VideoSlide({
    src,
    autoPlay = true,
    controls = false,
}: {
    src: string;
    autoPlay?: boolean;
    controls?: boolean;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isReady, setIsReady] = useState(false);

    const handleCanPlay = useCallback(() => {
        setIsReady(true);
        if (autoPlay && videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    }, [autoPlay]);

    // Reset ready state when src changes
    useEffect(() => {
        setIsReady(false);
    }, [src]);

    return (
        <div className="max-w-[900px] mx-auto">
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-900 relative">
                {/* Loading overlay */}
                {!isReady && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
                    </div>
                )}
                <video
                    ref={videoRef}
                    muted={autoPlay}
                    loop={autoPlay}
                    playsInline
                    preload="auto"
                    controls={controls}
                    onCanPlay={handleCanPlay}
                    className={cn(
                        'w-full h-full object-contain transition-opacity duration-300',
                        isReady ? 'opacity-100' : 'opacity-0'
                    )}
                >
                    <source src={src} type="video/mp4" />
                </video>
            </div>
        </div>
    );
}

export function DemoCarousel({ className }: { className?: string }) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const goTo = (index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    };

    const prev = () => goTo((current - 1 + slides.length) % slides.length);
    const next = () => goTo((current + 1) % slides.length);

    return (
        <div className={cn('relative', className)}>
            {/* Slide indicators / labels */}
            <div className="flex items-center justify-center gap-2 mb-6">
                {slides.map((slide, i) => (
                    <button
                        key={slide.id}
                        onClick={() => goTo(i)}
                        className={cn(
                            'px-4 py-2 text-sm font-medium rounded-full transition-colors',
                            i === current
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                        )}
                    >
                        {slide.label}
                    </button>
                ))}
            </div>

            {/* Carousel area */}
            <div className="relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={current}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -80 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {current === 0 && (
                            <div>
                                <VideoComparisonSlider />
                                <SegmentationLegend />
                            </div>
                        )}
                        {current === 1 && (
                            <VideoSlide src="/videos/realtime-overwatch.mp4" />
                        )}
                        {current === 2 && (
                            <VideoSlide src="/videos/3d-reconstruction.mp4" />
                        )}
                        {current === 3 && (
                            <VideoSlide
                                src="/videos/pitch-deck.mp4"
                                autoPlay={false}
                                controls
                            />
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white transition-colors"
                    aria-label="Previous demo"
                >
                    <ChevronLeft className="w-5 h-5 text-text-primary" />
                </button>
                <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white transition-colors"
                    aria-label="Next demo"
                >
                    <ChevronRight className="w-5 h-5 text-text-primary" />
                </button>
            </div>

            {/* Slide description */}
            <p className="text-center text-text-secondary text-sm mt-4 max-w-2xl mx-auto">
                {slides[current].description}
            </p>
        </div>
    );
}

function Cube3DIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
    );
}

function PlayCircleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
        </svg>
    );
}
