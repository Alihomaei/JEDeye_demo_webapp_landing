'use client';

import { useState } from 'react';
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
                            <div className="max-w-[900px] mx-auto">
                                <div className="aspect-video rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center border-2 border-dashed border-gray-600">
                                    <div className="text-center text-gray-400 px-6">
                                        <Cube3DIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                        <p className="text-lg font-medium mb-2">3D Reconstruction Demo</p>
                                        <p className="text-sm">Video placeholder — add your Gaussian splatting demo here</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {current === 2 && (
                            <div className="max-w-[900px] mx-auto">
                                <div className="aspect-video rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center border-2 border-dashed border-gray-600">
                                    <div className="text-center text-gray-400 px-6">
                                        <PlayCircleIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                        <p className="text-lg font-medium mb-2">Pitch Video</p>
                                        <p className="text-sm">Video placeholder — add your 8-minute pitch deck here</p>
                                    </div>
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
