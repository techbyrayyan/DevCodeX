'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function IntroAnimation() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const isTools = pathname?.startsWith('/tools');

  useEffect(() => {
    if (isTools) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    setIsFadingOut(false);

    // Auto-dismiss after 1.8s with smooth fadeout
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 400);
    }, 1800);

    const handleKey = () => handleDismiss();
    window.addEventListener('keydown', handleKey, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKey);
    };
  }, [isTools]);

  const handleDismiss = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible || isTools) return null;

  /*
   * Circuit lines traces definitions
   */
  const leftLines = [
    "M 600 350 L 450 350 L 360 260 L 220 260 L 160 320 L 80 320",
    "M 450 350 L 380 420 L 260 420 L 180 500 L 100 500",
    "M 480 520 L 360 520 L 280 600 L 160 600 L 120 640 L 40 640",
    "M 420 580 L 320 680 L 200 680 L 140 740 L 60 740",
    "M 520 620 L 440 700 L 340 700 L 260 780 L 120 780",
  ];
  const rightLines = [
    "M 600 350 L 750 350 L 840 260 L 980 260 L 1040 320 L 1120 320",
    "M 750 350 L 820 420 L 940 420 L 1020 500 L 1100 500",
    "M 720 520 L 840 520 L 920 600 L 1040 600 L 1080 640 L 1160 640",
    "M 780 580 L 880 680 L 1000 680 L 1060 740 L 1140 740",
    "M 680 620 L 760 700 L 860 700 L 940 780 L 1080 780",
  ];

  const pairDelays = [0, 0.08, 0.16, 0.24, 0.32];

  const traceStyle = (delay) => ({
    strokeDasharray: '80 920',
    animation: `circuitTrace 1.2s linear ${delay}s infinite`,
  });

  return (
    <div
      onClick={handleDismiss}
      className="intro-popup fixed inset-0 z-[99999] flex flex-col items-center justify-center text-white select-none overflow-hidden cursor-pointer"
      style={{
        backgroundColor: '#050505',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* ══ BACKGROUND CIRCUIT SVG ══ */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 1200 1000"
          className="w-[140vw] max-w-[1400px] h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="cGlow" cx="50%" cy="42%" r="45%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            <filter id="lightGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ambient glow */}
          <ellipse cx="600" cy="420" rx="480" ry="380" fill="url(#cGlow)" />

          {/* Outer geometric polygons */}
          <polygon
            points="600,80 860,200 1000,360 890,510 970,700 780,840 600,910 420,840 230,700 310,510 200,360 340,200"
            stroke="#27272a"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.35"
          />
          <polygon
            points="600,150 810,260 920,430 790,610 880,770 600,850 320,770 410,610 280,430 390,260"
            stroke="#3f3f46"
            strokeWidth="1.5"
            opacity="0.45"
          />

          {/* Static dim base circuit lines */}
          {[...leftLines, ...rightLines].map((d, i) => (
            <path key={`base-${i}`} d={d} stroke="#3f3f46" strokeWidth="1.4" opacity="0.5" />
          ))}

          {/* Animated travelling light on circuit lines */}
          {leftLines.map((d, i) => (
            <path
              key={`lt-${i}`}
              d={d}
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#lightGlow)"
              style={traceStyle(pairDelays[i])}
            />
          ))}
          {rightLines.map((d, i) => (
            <path
              key={`rt-${i}`}
              d={d}
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#lightGlow)"
              style={traceStyle(pairDelays[i])}
            />
          ))}

          {/* Microchip pins */}
          {[440, 452, 464, 476].map((y) => (
            <line key={`rp-${y}`} x1="878" y1={y} x2="930" y2={y} stroke="#71717a" strokeWidth="2" />
          ))}
          {[440, 452, 464, 476].map((y) => (
            <line key={`lp-${y}`} x1="322" y1={y} x2="270" y2={y} stroke="#71717a" strokeWidth="2" />
          ))}
        </svg>
      </div>

      {/* ══ CENTER LOGO & COPY ══ */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl mx-auto space-y-5"
        style={{ animation: 'logoReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        {/* DCX Metallic Logo */}
        <div
          className="w-48 sm:w-64 h-28 sm:h-40 flex items-center justify-center"
          style={{ filter: 'drop-shadow(0 12px 28px rgba(255,255,255,0.18))' }}
        >
          <Image
            src="/logo4.png"
            alt="DevCodeX Logo"
            width={260}
            height={160}
            priority
            className="object-contain"
            style={{ filter: 'brightness(1.1) contrast(1.15)' }}
          />
        </div>

        {/* Copy */}
        <div style={{ animation: 'textReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards', opacity: 0 }}>
          <p className="font-semibold text-sm text-white/90">Accelerating Digital Transformation</p>
          <p className="text-sm mt-1" style={{ color: '#a1a1aa' }}>Your Trusted Software Development Company</p>
        </div>
      </div>

      {/* ══ BOTTOM LASER GLOW BEAM ══ */}
      <div className="absolute bottom-6 inset-x-0 flex flex-col items-center pointer-events-none">
        <div
          className="animate-laser"
          style={{
            width: '22rem',
            height: '2px',
            background: 'linear-gradient(to right, transparent, #ffffff, transparent)',
            boxShadow: '0 0 18px #ffffff',
          }}
        />
        <div
          style={{
            width: '16rem',
            height: '8px',
            marginTop: '-4px',
            background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.35), transparent)',
            filter: 'blur(6px)',
          }}
        />
      </div>
    </div>
  );
}
