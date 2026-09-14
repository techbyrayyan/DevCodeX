'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function BackgroundVideo() {
  const pathname = usePathname();
  const videoRef = useRef(null);

  // 1. Core setup and auto-play listeners (runs once on mount)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');

    const tryPlay = () => {
      if (video && video.paused) {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      }
    };

    tryPlay();

    // Interaction fallback for browsers blocking autoplay
    const handleInteraction = () => tryPlay();
    const interactionEvents = ['click', 'touchstart', 'scroll', 'mousemove', 'keydown'];
    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, handleInteraction, { passive: true });
    });

    // Auto-resume when tab is visible
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        tryPlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    video.addEventListener('pause', tryPlay);
    video.addEventListener('waiting', tryPlay);
    video.addEventListener('ended', tryPlay);
    video.addEventListener('canplay', tryPlay);

    // Heartbeat to keep video playing
    const intervalId = setInterval(() => {
      if (video && video.paused && document.visibilityState === 'visible') {
        tryPlay();
      }
    }, 1500);

    return () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleInteraction);
      });
      document.removeEventListener('visibilitychange', handleVisibility);
      video.removeEventListener('pause', tryPlay);
      video.removeEventListener('waiting', tryPlay);
      video.removeEventListener('ended', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      clearInterval(intervalId);
    };
  }, []);

  // 2. Route change effect: triggers play on navigation across pages
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      if (video.paused) {
        const p = video.play();
        if (p && typeof p.catch === 'function') {
          p.catch(() => {});
        }
      }
    }
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
    >
      <video
        ref={videoRef}
        src="/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80 pointer-events-none"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Subtle translucent dark overlay */}
      <div className="absolute inset-0 bg-[#050505]/30 pointer-events-none" />
    </div>
  );
}
