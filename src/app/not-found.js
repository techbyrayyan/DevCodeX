'use client';

import Link from 'next/link';
import DevCodeXLogo from '@/components/DevCodeXLogo';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="glass-card p-10 sm:p-14 max-w-lg space-y-6 border-cyan-500/30 relative z-10">
        <DevCodeXLogo size="large" />

        <div className="space-y-2">
          <span className="text-6xl font-black font-mono cyan-gradient-text">404</span>
          <h2 className="text-2xl font-bold text-white">Dimension Not Found</h2>
          <p className="text-xs text-neutral-400">
            The page or route you are looking for has shifted coordinates or does not exist.
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs px-6 py-3 rounded-full shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
