'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Layers, Sparkles } from 'lucide-react';

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function TeamCard({ member, index }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      suppressHydrationWarning
      className="group perspective-1000 w-full h-[470px] cursor-pointer select-none"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* ══════════════════ FRONT FACE ══════════════════ */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:border-blue-500/60"
          style={{
            backgroundColor: '#0d0d0e',
            border: '1px solid #27272a',
          }}
        >
          {/* Main Full Image */}
          <div className="relative w-full h-full overflow-hidden bg-zinc-950">
            {!imgError ? (
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                unoptimized
                priority={index < 3}
                onError={() => setImgError(true)}
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-600">
                <span className="text-5xl font-extrabold">{member.name.charAt(0)}</span>
                <span className="text-xs font-mono mt-2">{member.name}</span>
              </div>
            )}

            {/* Top Bar Indicator */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md bg-black/60 text-zinc-300 border border-white/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                DevCodeX
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono backdrop-blur-md bg-black/60 text-blue-400 border border-blue-500/20">
                0{index + 1}
              </span>
            </div>

            {/* Bottom Gradient & Name Bar */}
            <div className="absolute inset-x-0 bottom-0 pt-24 pb-5 px-5 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent z-10 flex flex-col justify-end">
              <div className="backdrop-blur-md bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-4 shadow-lg transition-all duration-300 group-hover:border-blue-500/40">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3
                      className="text-xl font-bold text-white tracking-tight"
                      style={{ fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-blue-400 font-medium mt-0.5">
                      {member.role}
                    </p>
                  </div>

                  {/* Flip Hint Icon */}
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>View Tech Stack</span>
                  <span className="text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Hover card &rarr;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════ BACK FACE ══════════════════ */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden p-6 flex flex-col justify-between shadow-2xl transition-all duration-300"
          style={{
            backgroundColor: '#101012',
            border: '1px solid #3b82f6',
            boxShadow: '0 20px 40px -15px rgba(59, 130, 246, 0.2)',
          }}
        >
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-44 h-44 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />

          {/* Top Section: Member Name & Role */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Team Profile
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800/80 text-zinc-400 border border-zinc-700">
                {member.experience || 'Core Member'}
              </span>
            </div>

            <div>
              <h3
                className="text-2xl font-extrabold text-white tracking-tight"
                style={{ fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
              >
                {member.name}
              </h3>
              <p className="text-xs font-mono font-semibold text-blue-400 mt-1">
                {member.role}
              </p>
            </div>

            {/* Bio */}
            <p className="text-xs text-zinc-300 leading-relaxed pt-1">
              {member.bio}
            </p>
          </div>

          {/* Middle Section: Tech Stack Badges */}
          <div className="relative z-10 space-y-2.5 my-auto py-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-200 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Tech Stack &amp; Expertise</span>
            </div>

            <div className="flex flex-wrap gap-1.5" suppressHydrationWarning>
              {member.skills?.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-900/90 text-zinc-200 border border-zinc-800 hover:border-blue-500/50 hover:text-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Section: Socials & Connect */}
          <div className="relative z-10 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {member.socials?.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-blue-500/60 hover:bg-zinc-800 transition-all"
                  aria-label="GitHub"
                >
                  <GithubIcon />
                </a>
              )}
              {member.socials?.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-blue-500/60 hover:bg-zinc-800 transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
              )}
              {member.socials?.twitter && (
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-blue-500/60 hover:bg-zinc-800 transition-all"
                  aria-label="Twitter / X"
                >
                  <TwitterIcon />
                </a>
              )}
            </div>

            <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
              <span>Flip back</span>
              <span className="text-blue-400">&circlearrowleft;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
