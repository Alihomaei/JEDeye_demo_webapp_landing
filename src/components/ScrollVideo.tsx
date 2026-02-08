'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

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

/** Page background color for base canvas fill */
const PAGE_BG = '#0a1628';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function frameUrl(template: string, index: number): string {
  const padded = String(index).padStart(4, '0');
  return template.replace('{{index}}', padded);
}

/**
 * Ease-in-out cubic — slow at start/end, fast in middle.
 * Maps linear progress [0,1] → eased progress [0,1].
 */
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
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

  // -----------------------------------------------------------------------
  // Draw a frame to the canvas (blurry ambient fill + sharp foreground)
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

    // 1. Base fill with page background color
    ctx.fillStyle = PAGE_BG;
    ctx.fillRect(0, 0, cw, ch);

    // 2. Blurred ambient background — fills entire canvas to cover black bars
    //    Extra overscan prevents blur edge artifacts
    const bgScale = Math.max(cw / iw, ch / ih) * 1.3;
    const bgW = iw * bgScale;
    const bgH = ih * bgScale;
    ctx.save();
    ctx.filter = 'blur(30px) brightness(0.5)';
    ctx.drawImage(img, (cw - bgW) / 2, (ch - bgH) / 2, bgW, bgH);
    ctx.restore();

    // 3. Sharp foreground — cover-fit with slight zoom to crop letterbox bars
    const fgScale = Math.max(cw / iw, ch / ih) * 1.08;
    const fgW = iw * fgScale;
    const fgH = ih * fgScale;
    ctx.drawImage(img, (cw - fgW) / 2, (ch - fgH) / 2, fgW, fgH);
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
  // Preload frame images — show first frame immediately, rest in background
  // -----------------------------------------------------------------------

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;

    const images: HTMLImageElement[] = new Array(frameCount);
    imagesRef.current = images; // Share reference so drawFrame sees frames as they load

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

    async function loadAll() {
      // Load frame 0 first — show hero immediately once it's ready
      await loadImage(0);
      if (cancelled) return;
      setIsLoading(false);
      drawFrame(0);

      // Load remaining frames in background (larger batches for speed)
      const batchSize = 20;
      for (let i = 1; i < frameCount; i += batchSize) {
        if (cancelled) return;
        const batch = [];
        for (let j = i; j < Math.min(i + batchSize, frameCount); j++) {
          batch.push(loadImage(j));
        }
        await Promise.all(batch);
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

          // --- Eased frame scrubbing (slow start/end, fast middle) ---
          const easedProgress = easeInOutCubic(progress);
          const frameIndex = Math.min(
            Math.floor(easedProgress * (frameCount - 1)),
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
    <div ref={containerRef} style={{ height: scrollHeight }} className="relative z-10">
      {/* Pinned viewport panel */}
      <div ref={pinnedRef} className="relative w-full h-screen overflow-hidden">
        {/* Canvas — full viewport, edge-to-edge */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block"
          style={{ width: '100vw', height: '100vh' }}
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
      </div>
    </div>
  );
}
