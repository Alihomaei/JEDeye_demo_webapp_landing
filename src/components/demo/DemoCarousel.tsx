'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VideoComparisonSlider } from './VideoComparisonSlider';
import { SegmentationLegend } from './SegmentationLegend';
import { demoContent } from '@/config/content';

const slides = demoContent.slides;

export function DemoCarousel({ className }: { className?: string }) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    const goTo = (index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    };

    const prev = () => goTo((current - 1 + slides.length) % slides.length);
    const next = () => goTo((current + 1) % slides.length);

    // Detect when the carousel enters the viewport
    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Play videos in the active slide when tab changes or section enters viewport
    const playActiveVideos = useCallback(() => {
        const container = carouselRef.current;
        if (!container) return;
        const videos = container.querySelectorAll<HTMLVideoElement>('video');
        videos.forEach((video) => {
            if (video.paused && video.muted) {
                video.play().catch(() => {});
            }
        });
    }, []);

    useEffect(() => {
        if (!isInView) return;
        // Delay slightly to let AnimatePresence finish the enter animation (300ms)
        const timer = setTimeout(playActiveVideos, 350);
        return () => clearTimeout(timer);
    }, [current, isInView, playActiveVideos]);

    return (
        <div ref={carouselRef} className={cn('relative', className)}>
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
                            <div className="max-w-[900px] mx-auto">
                                <div className="aspect-video rounded-xl overflow-hidden bg-gray-900">
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="auto"
                                        className="w-full h-full object-contain"
                                    >
                                        <source src="/videos/realtime-overwatch.mp4" type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        )}
                        {current === 2 && (
                            <div className="max-w-[900px] mx-auto">
                                <div className="aspect-video rounded-xl overflow-hidden bg-gray-900">
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="auto"
                                        className="w-full h-full object-contain"
                                    >
                                        <source src="/videos/3d-reconstruction.mp4" type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        )}
                        {current === 3 && (
                            <div className="max-w-[900px] mx-auto">
                                <div className="aspect-video rounded-xl overflow-hidden bg-gray-900">
                                    <video
                                        controls
                                        playsInline
                                        preload="auto"
                                        className="w-full h-full object-contain"
                                    >
                                        <source src="/videos/pitch-deck.mp4" type="video/mp4" />
                                    </video>
                                </div>
                            </div>
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
