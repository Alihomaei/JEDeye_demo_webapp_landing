'use client';

import { useRef, useState } from 'react';

/**
 * The pitch film. Nothing but the poster loads until the viewer presses play;
 * then the 1080p file streams with sound and native controls.
 */
const SRC = '/media/pitch.mp4';
const POSTER = '/media/pitch_poster.webp';

export function Pitch() {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <section id="pitch" className="section rule-top" data-rise>
      <div className="wrap">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          <div>
            <p className="eyebrow">The pitch</p>
            <h2 className="font-display mt-4 text-h2 font-medium">Two and a half minutes, with sound.</h2>
          </div>
          <p className="prose-measure text-lg text-ink-2 lg:pt-9">
            What JEDeye does, why it needs no new hardware, and where the measurements come from. The same film we open the
            meeting with.
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-xl bg-[#05080c] shadow-[0_40px_90px_-40px_oklch(0.15_0.04_230/0.7)]" style={{ aspectRatio: '16 / 9' }}>
          {playing ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption -- narrated film; transcript on request
            <video ref={ref} src={SRC} poster={POSTER} controls autoPlay playsInline preload="auto" className="absolute inset-0 h-full w-full" />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 flex items-center justify-center"
              aria-label="Play the pitch film"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={POSTER} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(5,8,12,0.7))]" aria-hidden="true" />
              <span className="relative grid h-20 w-20 place-items-center rounded-full bg-paper/95 text-ink shadow-xl transition-transform duration-300 ease-out group-hover:scale-105">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="absolute bottom-5 left-6 text-sm text-[oklch(0.9_0.01_230)]">JEDeye pitch · 2:31 · 1080p</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
