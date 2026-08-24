'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function DevCodeXLogo({ className = "", size = "normal", showText = true }) {
  const heights = {
    small: "h-7",
    normal: "h-9 sm:h-10",
    large: "h-12 sm:h-14"
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}>
      <div className={`relative ${heights[size] || heights.normal} w-auto flex items-center justify-center overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105`}>
        <Image
          src="/devcodex.jpeg"
          alt="DevCodeX Logo"
          width={180}
          height={60}
          className="h-full w-auto object-contain rounded-md filter drop-shadow-[0_0_12px_rgba(0,240,255,0.2)]"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            DevCodeX
          </span>
          <span className="text-[9px] tracking-[0.25em] font-mono text-neutral-400 uppercase -mt-0.5">
            Code | Create | Scale
          </span>
        </div>
      )}
    </Link>
  );
}
