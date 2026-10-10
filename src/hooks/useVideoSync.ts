'use client';

import { useEffect, useState, useCallback, RefObject } from 'react';

/** Drift above this is corrected by seeking the slave. */
const SEEK_THRESHOLD = 0.12;
/** Drift above this (and below SEEK_THRESHOLD) is corrected by nudging playback rate. */
const NUDGE_THRESHOLD = 0.02;

export interface UseVideoSyncOptions {
  syncThreshold?: number;
  enabled?: boolean;
}

export interface UseVideoSyncReturn {
  isPlaying: boolean;
  isSynced: boolean;
  error: Error | null;
  play: () => Promise<void>;
  pause: () => void;
  restart: () => void;
}

/**
 * Keeps two frame-aligned clips on the same timestamp. The master owns the
 * loop; the slave is rewound with it and nudged (never seeked) for small drift,
 * so the overlay never flickers mid-slide.
 */
export function useVideoSync(
  masterRef: RefObject<HTMLVideoElement | null>,
  slaveRef: RefObject<HTMLVideoElement | null>,
  options: UseVideoSyncOptions = {}
): UseVideoSyncReturn {
  const { syncThreshold = SEEK_THRESHOLD, enabled = true } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynced, setIsSynced] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const master = masterRef.current;
    const slave = slaveRef.current;
    if (!master || !slave) return;

    // The master loops; the slave follows it so both wrap on the same frame.
    slave.loop = false;
    let animationId = 0;

    const syncLoop = () => {
      const delta = master.currentTime - slave.currentTime; // >0: slave behind
      const drift = Math.abs(delta);
      setIsSynced(drift <= syncThreshold);

      if (drift > syncThreshold) {
        slave.currentTime = master.currentTime;
        slave.playbackRate = 1;
      } else if (drift > NUDGE_THRESHOLD) {
        slave.playbackRate = delta > 0 ? 1.08 : 0.92;
      } else {
        slave.playbackRate = 1;
      }

      if (slave.paused && !master.paused) slave.play().catch(() => undefined);
      if (!master.paused) animationId = requestAnimationFrame(syncLoop);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      slave.currentTime = master.currentTime;
      slave.play().catch(setError);
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(syncLoop);
    };

    const handlePause = () => {
      setIsPlaying(false);
      slave.pause();
      cancelAnimationFrame(animationId);
    };

    const handleSeeked = () => {
      slave.currentTime = master.currentTime;
    };

    // Slave reaches its end a hair before/after the master wraps: hold it on
    // the last frame until the master comes back around, then rewind both.
    const handleSlaveEnded = () => {
      if (master.currentTime < 1) {
        slave.currentTime = master.currentTime;
        if (!master.paused) slave.play().catch(() => undefined);
      }
    };

    // Buffering recovery: when either side can play again, keep them together.
    const handleCanPlay = () => {
      if (!master.paused && slave.paused) {
        slave.currentTime = master.currentTime;
        slave.play().catch(setError);
      }
    };

    master.addEventListener('play', handlePlay);
    master.addEventListener('pause', handlePause);
    master.addEventListener('seeked', handleSeeked);
    master.addEventListener('canplay', handleCanPlay);
    slave.addEventListener('canplay', handleCanPlay);
    slave.addEventListener('ended', handleSlaveEnded);

    if (!master.paused) handlePlay();

    return () => {
      cancelAnimationFrame(animationId);
      master.removeEventListener('play', handlePlay);
      master.removeEventListener('pause', handlePause);
      master.removeEventListener('seeked', handleSeeked);
      master.removeEventListener('canplay', handleCanPlay);
      slave.removeEventListener('canplay', handleCanPlay);
      slave.removeEventListener('ended', handleSlaveEnded);
    };
  }, [masterRef, slaveRef, syncThreshold, enabled]);

  const play = useCallback(async () => {
    const master = masterRef.current;
    const slave = slaveRef.current;
    if (!master) return;
    try {
      // Start both from the first frame so the overlay lines up from the first scrub.
      master.currentTime = 0;
      if (slave) slave.currentTime = 0;
      await master.play();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [masterRef, slaveRef]);

  const pause = useCallback(() => {
    masterRef.current?.pause();
  }, [masterRef]);

  const restart = useCallback(() => {
    const master = masterRef.current;
    const slave = slaveRef.current;
    if (master && slave) {
      master.currentTime = 0;
      slave.currentTime = 0;
    }
  }, [masterRef, slaveRef]);

  return { isPlaying, isSynced, error, play, pause, restart };
}
