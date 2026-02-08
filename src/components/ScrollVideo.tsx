'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { VideoModal } from './VideoModal';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ScrollVideoProps {
  /** Total number of frames to load */
  frameCount?: number;
  /** URL template — use {{index}} for the zero-padded frame number */
  framePath?: string;
  /** Height of the scroll container (CSS value) */
  scrollHeight?: string;
  /** Content to overlay on top of the video (e.g. Hero section) */
  children?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_FRAME_COUNT = 184;
const DEFAULT_FRAME_PATH = '/frames/frame_{{index}}.webp';
const DEFAULT_SCROLL_HEIGHT = '300vh';

/** Children fully fade out by this scroll progress (0-1) */
const CHILDREN_FADE_END = 0.3;

/** Play button appears after this scroll progress (0-1) */
const PLAY_BUTTON_THRESHOLD = 0.95;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function frameUrl(template: string, index: number): string {
  const padded = String(index).padStart(4, '0');
  return template.replace('{{index}}', padded);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ScrollVideo({
  frameCount = DEFAULT_FRAME_COUNT,
  framePath = DEFAULT_FRAME_PATH,
  scrollHeight = DEFAULT_SCROLL_HEIGHT,
  children,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // -----------------------------------------------------------------------
  // Draw a frame to the canvas (cover-fit)
  // -----------------------------------------------------------------------

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover-fit: scale to fill, center
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
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
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  // -----------------------------------------------------------------------
  // Preload all frame images
  // -----------------------------------------------------------------------

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;

    const images: HTMLImageElement[] = new Array(frameCount);

    const loadImage = (index: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (cancelled) return;
          images[index] = img;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / frameCount) * 100));
          resolve();
        };
        img.onerror = () => {
          if (cancelled) return;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / frameCount) * 100));
          resolve();
        };
        img.src = frameUrl(framePath, index + 1); // 1-based file names
      });

    // Load in batches for performance
    const batchSize = 12;
    async function loadAll() {
      for (let i = 0; i < frameCount; i += batchSize) {
        if (cancelled) return;
        const batch = [];
        for (let j = i; j < Math.min(i + batchSize, frameCount); j++) {
          batch.push(loadImage(j));
        }
        await Promise.all(batch);
      }
      if (!cancelled) {
        imagesRef.current = images;
        setIsLoading(false);
        drawFrame(0);
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, [frameCount, framePath, drawFrame]);

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
      if (!container || !pinned) return;

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinned,
        pinSpacing: false,
        scrub: 0.5,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onUpdate: (self: any) => {
          const progress: number = self.progress;

          // --- Frame scrubbing ---
          const frameIndex = Math.min(
            Math.floor(progress * (frameCount - 1)),
            frameCount - 1
          );
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            drawFrame(frameIndex);
          }

          // --- Children fade-out (Hero overlay) ---
          if (childrenRef.current) {
            const opacity = Math.max(0, 1 - progress / CHILDREN_FADE_END);
            childrenRef.current.style.opacity = String(opacity);
            childrenRef.current.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';
          }

          // --- Play button visibility ---
          setShowPlayButton(progress >= PLAY_BUTTON_THRESHOLD);
        },
      });
    }

    initGSAP();

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [isLoading, frameCount, drawFrame]);

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <>
      {/* Scroll container — tall spacer that drives the scrub */}
      <div ref={containerRef} style={{ height: scrollHeight }} className="relative">
        {/* Pinned viewport panel */}
        <div ref={pinnedRef} className="relative w-full h-screen overflow-hidden">
          {/* Canvas — full viewport, behind everything */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            style={{ width: '100%', height: '100%' }}
            aria-hidden="true"
          />

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0a1628]">
              <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-white/60">
                Loading {loadProgress}%
              </p>
            </div>
          )}

          {/* Overlay content (Hero section) — fades out as user scrolls */}
          {!isLoading && children && (
            <div ref={childrenRef} className="absolute inset-0 z-10" style={{ opacity: 1 }}>
              {children}
            </div>
          )}

          {/* Play button — fades in on last ~5% of scroll */}
          <div
            className={cn(
              'absolute inset-0 z-20 flex items-center justify-center',
              'transition-opacity duration-500',
              showPlayButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
          >
            <button
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 rounded-xl"
              aria-label="Play demo video"
              onClick={() => setIsModalOpen(true)}
              tabIndex={showPlayButton ? 0 : -1}
            >
              <div className={cn(
                'w-20 h-20 rounded-full bg-primary',
                'flex items-center justify-center',
                'shadow-lg shadow-primary/30',
                'hover:scale-110 transition-transform duration-200'
              )}>
                <svg className="w-10 h-10 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
