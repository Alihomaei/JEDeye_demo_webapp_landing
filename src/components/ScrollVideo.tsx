'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ScrollVideoProps {
  /** Path to the video file in /public */
  videoSrc?: string;
  /** Height of the scroll container (CSS value) */
  scrollHeight?: string;
  /** Content to overlay on top of the video (e.g. Hero section) */
  children?: React.ReactNode;
  /** Called when scroll reaches/leaves the end of the video (true = done, false = scrolled back) */
  onScrollComplete?: (complete: boolean) => void;
  /** Called continuously with canvas fade progress: 0 = fade not started, 1 = canvas fully transparent */
  onFadeProgress?: (progress: number) => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_VIDEO_SRC = '/scroll-video.mp4';
const DEFAULT_SCROLL_HEIGHT = '250vh';

/** Children fully fade out by this scroll progress (0-1) */
const CHILDREN_FADE_END = 0.3;

/**
 * Canvas starts fading as the Demo section scrolls over the pinned area.
 * Earlier crossfade (70-90%) for a longer, smoother transition.
 */
const CANVAS_FADE_START = 0.70;
const CANVAS_FADE_END = 0.90;

/** Page background color for base canvas fill */
const PAGE_BG = '#0a1628';

/** Poster image shown while the video loads */
const POSTER_SRC = '/images/scroll-video-poster.jpg';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Gentle ease-in-out quadratic — less extreme than cubic for smoother scrubbing.
 * Maps linear progress [0,1] → eased progress [0,1].
 */
function easeInOutQuad(t: number): number {
  return t < 0.5
    ? 2 * t * t
    : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ScrollVideo({
  videoSrc = DEFAULT_VIDEO_SRC,
  scrollHeight = DEFAULT_SCROLL_HEIGHT,
  children,
  onScrollComplete,
  onFadeProgress,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollCompleteRef = useRef(false);
  const lastTimeRef = useRef(-1);
  const readyRef = useRef(false);
  const rafIdRef = useRef<number>(0);

  const [isLoading, setIsLoading] = useState(true);

  // -----------------------------------------------------------------------
  // Draw the current video frame to canvas (ambient blur + sharp foreground)
  // -----------------------------------------------------------------------

  const drawVideoFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const video = videoRef.current;
    if (!canvas || !ctx || !video || video.readyState < 2) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = video.videoWidth;
    const ih = video.videoHeight;
    if (iw === 0 || ih === 0) return;

    // 1. Base fill with page background color
    ctx.fillStyle = PAGE_BG;
    ctx.fillRect(0, 0, cw, ch);

    // 2. Blurred ambient background — fills entire canvas to cover black bars
    const bgScale = Math.max(cw / iw, ch / ih) * 1.3;
    const bgW = iw * bgScale;
    const bgH = ih * bgScale;
    ctx.save();
    ctx.filter = 'blur(30px) brightness(0.5)';
    ctx.drawImage(video, (cw - bgW) / 2, (ch - bgH) / 2, bgW, bgH);
    ctx.restore();

    // 3. Sharp foreground — cover-fit with slight zoom to crop letterbox bars
    const fgScale = Math.max(cw / iw, ch / ih) * 1.08;
    const fgW = iw * fgScale;
    const fgH = ih * fgScale;
    ctx.drawImage(video, (cw - fgW) / 2, (ch - fgH) / 2, fgW, fgH);
  }, []);

  // -----------------------------------------------------------------------
  // Resize canvas to match viewport
  // -----------------------------------------------------------------------

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (readyRef.current) drawVideoFrame();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawVideoFrame]);

  // -----------------------------------------------------------------------
  // Video ready handler — draw first frame and mark loading done
  // -----------------------------------------------------------------------

  const handleVideoReady = useCallback(() => {
    if (readyRef.current) return; // Only fire once
    readyRef.current = true;

    // Small delay to ensure the video decoder has a frame available
    requestAnimationFrame(() => {
      drawVideoFrame();
      setIsLoading(false);
    });
  }, [drawVideoFrame]);

  // Fallback: if video loaded from cache before React attached the listener,
  // onLoadedData won't fire. Check readyState after mount.
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 2) {
      handleVideoReady();
    }
  }, [handleVideoReady]);

  // -----------------------------------------------------------------------
  // GSAP ScrollTrigger setup
  // -----------------------------------------------------------------------

  // -----------------------------------------------------------------------
  // Continuous rAF draw loop — redraws canvas every frame for smooth scrub
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (isLoading) return;

    let running = true;
    const loop = () => {
      if (!running) return;
      drawVideoFrame();
      rafIdRef.current = requestAnimationFrame(loop);
    };
    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [isLoading, drawVideoFrame]);

  // -----------------------------------------------------------------------
  // GSAP ScrollTrigger setup
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (isLoading) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let scrollTriggerInstance: any = null;

    async function initGSAP() {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');

      const gsap = gsapModule.default || gsapModule;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;
      const pinned = pinnedRef.current;
      const video = videoRef.current;
      if (!container || !pinned || !video) return;

      const duration = video.duration;

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinned,
        pinSpacing: false,
        scrub: 0.3,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onUpdate: (self: any) => {
          const progress: number = self.progress;

          // --- Eased video scrubbing (gentler quadratic) ---
          const easedProgress = easeInOutQuad(progress);
          const targetTime = Math.min(easedProgress * duration, duration - 0.01);

          // Seek with a tight threshold for responsiveness
          if (Math.abs(targetTime - lastTimeRef.current) > 0.01) {
            lastTimeRef.current = targetTime;
            video.currentTime = targetTime;
          }

          // --- Children fade-out (Hero overlay) ---
          if (childrenRef.current) {
            const opacity = Math.max(0, 1 - progress / CHILDREN_FADE_END);
            childrenRef.current.style.opacity = String(opacity);
            childrenRef.current.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';
          }

          // --- Dark blur overlay fade-out (matches children timing) ---
          if (overlayRef.current) {
            const overlayOpacity = Math.max(0, 1 - progress / CHILDREN_FADE_END);
            overlayRef.current.style.opacity = String(overlayOpacity);
          }

          // --- Canvas fade-out + expose fade progress for coordinated reveal ---
          const fadeProgress = progress <= CANVAS_FADE_START
            ? 0
            : Math.min(1, (progress - CANVAS_FADE_START) / (CANVAS_FADE_END - CANVAS_FADE_START));

          if (canvasRef.current) {
            canvasRef.current.style.opacity = String(Math.max(0, 1 - fadeProgress));
          }

          onFadeProgress?.(fadeProgress);

          // --- Notify parent when crossfade is 20% done (canvas at 80% opacity) ---
          const showDemo = fadeProgress >= 0.2;
          if (showDemo !== scrollCompleteRef.current) {
            scrollCompleteRef.current = showDemo;
            onScrollComplete?.(showDemo);
          }
        },
      });
    }

    initGSAP();

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [isLoading, drawVideoFrame, onScrollComplete, onFadeProgress]);

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <div ref={containerRef} style={{ height: scrollHeight }} className="relative z-10">
      {/* Hidden video element — in DOM for reliable decoding */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        onLoadedData={handleVideoReady}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      {/* Pinned viewport panel */}
      <div ref={pinnedRef} className="relative w-full h-screen overflow-hidden">
        {/* Canvas — full viewport, edge-to-edge */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block"
          style={{ width: '100vw', height: '100vh' }}
          aria-hidden="true"
        />

        {/* Loading placeholder — poster image with subtle pulse while video loads */}
        {isLoading && (
          <div className="absolute inset-0 z-30 bg-[#0a1628]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={POSTER_SRC}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover animate-pulse"
              style={{ opacity: 0.7 }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                  style={{ width: '100%' }}
                />
              </div>
              <p className="mt-3 text-sm text-white/60">Loading…</p>
            </div>
          </div>
        )}

        {/* Dark blur overlay — dims/blurs the video behind the Hero for readability */}
        {!isLoading && (
          <div
            ref={overlayRef}
            className="absolute inset-0 z-[5]"
            aria-hidden="true"
            style={{
              opacity: 1,
              background: 'radial-gradient(ellipse 80% 70% at 50% 45%, rgba(10,22,40,0.75) 0%, rgba(10,22,40,0.55) 60%, rgba(10,22,40,0.3) 100%)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />
        )}

        {/* Overlay content (Hero section) — fades out as user scrolls */}
        {!isLoading && children && (
          <div ref={childrenRef} className="absolute inset-0 z-10" style={{ opacity: 1 }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
