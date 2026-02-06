'use client';

import { useRef, useState, useEffect } from 'react';
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider';
import { useVideoSync } from '@/hooks/useVideoSync';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { demoContent } from '@/config/content';

interface VideoComparisonSliderProps {
  className?: string;
}

export function VideoComparisonSlider({ className }: VideoComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const masterRef = useRef<HTMLVideoElement>(null);
  const slaveRef = useRef<HTMLVideoElement>(null);
  
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // Tracks if animation has played this session
  const [showAnimationHint, setShowAnimationHint] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();
  
  const { play } = useVideoSync(masterRef, slaveRef, {
    enabled: isInView && !prefersReducedMotion,
  });

  // Intersection Observer for viewport detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Animation hint: start on first viewport entry, auto-stop after 2.5s
  useEffect(() => {
    // Skip if reduced motion, already animated, or user interacted
    if (prefersReducedMotion || hasAnimated || hasInteracted) return;
    
    if (isInView) {
      // Start animation on first viewport entry
      setShowAnimationHint(true);
      setHasAnimated(true); // Mark as animated (won't animate again this session)
      
      // Auto-stop after 2.5 seconds
      const timer = setTimeout(() => {
        setShowAnimationHint(false);
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, prefersReducedMotion, hasAnimated, hasInteracted]);

  // Stop animation immediately on user interaction
  useEffect(() => {
    if (hasInteracted) {
      setShowAnimationHint(false);
    }
  }, [hasInteracted]);

  // Start playing when first visible (but don't pause when scrolling away)
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (hasStartedPlaying) return; // Only start once
    
    if (isInView && !isLoading && !hasError) {
      play()
        .then(() => setHasStartedPlaying(true))
        .catch(() => setAutoplayBlocked(true));
    }
  }, [isInView, isLoading, hasError, prefersReducedMotion, play, hasStartedPlaying]);

  // Track individual video ready states for more reliable loading detection
  const [masterReady, setMasterReady] = useState(false);
  const [slaveReady, setSlaveReady] = useState(false);

  // Update isLoading when both videos are ready
  useEffect(() => {
    if (masterReady && slaveReady) {
      setIsLoading(false);
    }
  }, [masterReady, slaveReady]);

  // Timeout fallback: remove loading state after 5 seconds even if videos aren't fully loaded
  useEffect(() => {
    if (!isLoading) return;
    
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [isLoading]);

  // Handle video load events - use canplay which fires earlier and more reliably on mobile
  const handleMasterCanPlay = () => {
    setMasterReady(true);
  };

  const handleSlaveCanPlay = () => {
    setSlaveReady(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Handle manual play button click
  const handlePlayClick = async () => {
    try {
      await play();
      setAutoplayBlocked(false);
    } catch {
      // Still blocked, do nothing
    }
  };

  // Reduced motion: show static poster
  if (prefersReducedMotion) {
    return (
      <div className={cn('relative aspect-video max-w-[900px] mx-auto rounded-xl overflow-hidden shadow-lg', className)}>
        <img
          src="/videos/demo-poster.jpg"
          alt="Comparison of original surgical video and AI segmentation"
          className="w-full h-full object-cover"
        />
        <VideoLabels />
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className={cn('relative aspect-video max-w-[900px] mx-auto rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center', className)}>
        <p className="text-white text-center px-4">{demoContent.fallback.loadError}</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn('relative max-w-[900px] mx-auto', className)}>
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900 rounded-xl">
          <img src="/videos/demo-poster.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
      )}

      {/* Autoplay blocked overlay */}
      {autoplayBlocked && !isLoading && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 rounded-xl"
          aria-label="Play demo video"
        >
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
            <PlayIcon className="w-10 h-10 text-white ml-1" />
          </div>
        </button>
      )}

      <ReactCompareSlider
        className="aspect-video rounded-xl overflow-hidden shadow-lg"
        position={35}
        onPositionChange={() => setHasInteracted(true)}
        handle={<CustomSliderHandle showHint={showAnimationHint} />}
        aria-label="Video comparison slider: drag to compare original surgical video with AI segmentation"
        itemOne={
          <div className="relative w-full h-full">
            <video
              ref={masterRef}
              muted
              loop
              playsInline
              preload="auto"
              poster="/videos/demo-poster.jpg"
              onCanPlay={handleMasterCanPlay}
              onError={handleError}
              className="w-full h-full object-cover"
            >
              <source src="/videos/surgical-original.webm" type="video/webm" />
              <source src="/videos/surgical-original.mp4" type="video/mp4" />
            </video>
            <VideoLabel position="left" text={demoContent.labels.original} />
          </div>
        }
        itemTwo={
          <div className="relative w-full h-full">
            <video
              ref={slaveRef}
              muted
              loop
              playsInline
              preload="auto"
              poster="/videos/demo-poster.jpg"
              onCanPlay={handleSlaveCanPlay}
              onError={handleError}
              className="w-full h-full object-cover"
            >
              <source src="/videos/surgical-segmentation.webm" type="video/webm" />
              <source src="/videos/surgical-segmentation.mp4" type="video/mp4" />
            </video>
            <VideoLabel position="right" text={demoContent.labels.segmentation} />
          </div>
        }
      />
    </div>
  );
}

// Subcomponent: Video Label
function VideoLabel({ position, text }: { position: 'left' | 'right'; text: string }) {
  return (
    <span
      className={cn(
        'absolute top-4 px-3 py-1.5 text-sm font-medium text-white bg-black/60 rounded',
        position === 'left' ? 'left-4' : 'right-4'
      )}
    >
      {text}
    </span>
  );
}

// Subcomponent: Video Labels (for static view)
function VideoLabels() {
  return (
    <>
      <VideoLabel position="left" text={demoContent.labels.original} />
      <VideoLabel position="right" text={demoContent.labels.segmentation} />
    </>
  );
}

// Subcomponent: Custom Slider Handle
function CustomSliderHandle({ showHint }: { showHint: boolean }) {
  return (
    <ReactCompareSliderHandle
      buttonStyle={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: '#0097A7',
        border: '3px solid white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'ew-resize',
      }}
      linesStyle={{
        width: 3,
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      <div className={cn(
        'flex items-center gap-0.5 text-white',
        showHint && 'animate-pulse'
      )}>
        <ChevronLeftIcon className="w-4 h-4" />
        <ChevronRightIcon className="w-4 h-4" />
      </div>
    </ReactCompareSliderHandle>
  );
}

// Icon components
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
