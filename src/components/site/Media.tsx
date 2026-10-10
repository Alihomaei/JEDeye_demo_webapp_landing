'use client';

import { useEffect, useRef, useState } from 'react';
import type { Clip } from '@/config/content';

type Props = {
  clip: Clip;
  className?: string;
  /** Load the clip immediately instead of waiting for it to scroll into view. */
  priority?: boolean;
  /** Hand the element to a parent that wants to sync playback. */
  videoRef?: React.MutableRefObject<HTMLVideoElement | null>;
};

/**
 * A muted, looping clip that costs nothing until it is near the viewport:
 * only the WebP poster is requested up front. Users who prefer reduced motion
 * keep the poster and get a play control instead of autoplay.
 */
export function Media({ clip, className = '', priority = false, videoRef }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [armed, setArmed] = useState(priority);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (videoRef) videoRef.current = el;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setArmed(true);
          if (reduced) continue;
          if (e.isIntersecting) el.play().catch(() => undefined);
          else el.pause();
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, videoRef]);

  const base = `/media/${clip.id}`;
  const poster = `${base}_poster.webp`;

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: String(clip.ratio) }}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- clips are silent */}
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        preload={armed ? 'auto' : 'none'}
        muted
        loop
        playsInline
        aria-label={clip.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {armed && (
          <>
            <source src={`${base}.webm`} type="video/webm" />
            <source src={`${base}.mp4`} type="video/mp4" />
          </>
        )}
      </video>
      {reduced && (
        <button
          type="button"
          onClick={() => {
            const el = ref.current;
            if (!el) return;
            if (el.paused) el.play().catch(() => undefined);
            else el.pause();
          }}
          className="absolute bottom-3 left-3 rounded-md bg-paper/90 px-3 py-1.5 text-xs font-medium text-ink shadow-sm"
        >
          {playing ? 'Pause' : 'Play clip'}
        </button>
      )}
    </div>
  );
}

export function Figure({
  children,
  label,
  text,
  source,
  className = '',
}: {
  children: React.ReactNode;
  label: string;
  text?: string;
  source?: string;
  className?: string;
}) {
  return (
    <figure className={`figure ${className}`}>
      {children}
      <figcaption className="figcaption">
        <b>{label}</b>
        {text ? <span>{text}</span> : <span />}
      </figcaption>
    </figure>
  );
}
