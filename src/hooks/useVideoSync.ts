'use client';

import { useEffect, useState, useCallback, RefObject } from 'react';

const DEFAULT_SYNC_THRESHOLD = 0.05; // 50ms

export interface UseVideoSyncOptions {
  syncThreshold?: number;  // Default: 0.05 (50ms)
  enabled?: boolean;       // Default: true
}

export interface UseVideoSyncReturn {
  isPlaying: boolean;
  isSynced: boolean;
  error: Error | null;
  play: () => Promise<void>;
  pause: () => void;
  restart: () => void;
}

export function useVideoSync(
  masterRef: RefObject<HTMLVideoElement>,
  slaveRef: RefObject<HTMLVideoElement>,
  options: UseVideoSyncOptions = {}
): UseVideoSyncReturn {
  const { syncThreshold = DEFAULT_SYNC_THRESHOLD, enabled = true } = options;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynced, setIsSynced] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;
    
    const master = masterRef.current;
    const slave = slaveRef.current;
    if (!master || !slave) return;

    let animationId: number;

    const syncLoop = () => {
      if (!master || !slave) return;
      
      const drift = Math.abs(master.currentTime - slave.currentTime);
      setIsSynced(drift <= syncThreshold);
      
      if (drift > syncThreshold) {
        slave.currentTime = master.currentTime;
      }
      
      if (!master.paused) {
        animationId = requestAnimationFrame(syncLoop);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      slave.play().catch(setError);
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

    const handleEnded = () => {
      if (master.loop) {
        slave.currentTime = 0;
        master.currentTime = 0;
      }
    };

    // Handle buffering: pause both if one buffers
    const handleWaiting = () => {
      slave.pause();
    };

    const handleSlaveWaiting = () => {
      master.pause();
    };

    const handleCanPlay = () => {
      if (!master.paused && slave.paused) {
        slave.play().catch(setError);
      }
    };

    master.addEventListener('play', handlePlay);
    master.addEventListener('pause', handlePause);
    master.addEventListener('seeked', handleSeeked);
    master.addEventListener('ended', handleEnded);
    master.addEventListener('waiting', handleWaiting);
    slave.addEventListener('waiting', handleSlaveWaiting);
    slave.addEventListener('canplay', handleCanPlay);

    return () => {
      cancelAnimationFrame(animationId);
      master.removeEventListener('play', handlePlay);
      master.removeEventListener('pause', handlePause);
      master.removeEventListener('seeked', handleSeeked);
      master.removeEventListener('ended', handleEnded);
      master.removeEventListener('waiting', handleWaiting);
      slave.removeEventListener('waiting', handleSlaveWaiting);
      slave.removeEventListener('canplay', handleCanPlay);
    };
  }, [masterRef, slaveRef, syncThreshold, enabled]);

  const play = useCallback(async () => {
    const master = masterRef.current;
    if (master) {
      try {
        await master.play();
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    }
  }, [masterRef]);

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
