'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function BackgroundVideo() {
  const pathname = usePathname();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force DOM-level muted properties for strict browser autoplay compatibility
    video.defaultMuted = true;
    video.muted = true;
    video.playbackRate = 1.0;

    const playVideo = () => {
      if (video && video.paused) {
        video.play().catch(() => {
          // Autoplay blocked by browser policy until interaction
        });
      }
    };

    playVideo();

    // Wake up on first user gesture if browser blocked zero-interaction autoplay
    const handleUserInteraction = () => {
      playVideo();
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('scroll', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [pathname]);

  // Strictly DO NOT render video background on /tools
  if (pathname?.startsWith('/tools')) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        onCanPlay={(e) => {
          e.currentTarget.defaultMuted = true;
          e.currentTarget.muted = true;
          e.currentTarget.play().catch(() => {});
        }}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      {/* Semi-transparent dark overlay for high contrast */}
      <div 
        className="absolute inset-0 bg-[#050505]/40 backdrop-blur-[0.5px]"
      />
    </div>
  );
}
