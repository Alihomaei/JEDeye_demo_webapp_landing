'use client';

import { useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  // Auto-play when opened
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — user can click play manually
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center',
        'bg-black/80 backdrop-blur-sm',
        'animate-in fade-in duration-200'
      )}
      onClick={(e) => {
        if (e.target === modalRef.current) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Demo video"
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className={cn(
          'absolute top-4 right-4 z-10',
          'w-10 h-10 rounded-full',
          'bg-white/20 hover:bg-white/30',
          'flex items-center justify-center',
          'text-white transition-colors'
        )}
        aria-label="Close video"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Video container */}
      <div className="relative w-full max-w-5xl mx-4 aspect-video rounded-xl overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          controls
          playsInline
          className="w-full h-full object-cover"
          poster="/videos/demo-poster.jpg"
        >
          <source src="/videos/surgical-segmentation.webm" type="video/webm" />
          <source src="/videos/surgical-segmentation.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
