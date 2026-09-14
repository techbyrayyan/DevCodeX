'use client';

import React from 'react';
import Link from 'next/link';
import { servicesMegaMenuCategories } from '@/data/servicesData';
import { 
  Code2, Smartphone, Server, Globe, Layers, Box, ShoppingBag, 
  Layout, Bot, Cloud, ShieldCheck, Palette, TrendingUp, Sparkles, 
  ArrowRight, ChevronRight
} from 'lucide-react';

const iconMap = {
  Code2,
  Smartphone,
  Server,
  Globe,
  Layers,
  Box,
  ShoppingBag,
  Layout,
  Bot,
  Cloud,
  ShieldCheck,
  Palette,
  TrendingUp,
  Sparkles,
};

export default function ServicesMegaDropdown({ isOpen, onClose, onMouseEnter, onMouseLeave }) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-0 right-0 px-4 sm:px-6 lg:px-8 pt-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150 pointer-events-none"
    >
      <div 
        className="w-full max-w-7xl mx-auto rounded-3xl px-6 py-4 sm:px-7 sm:py-5 lg:px-8 lg:py-5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(59,130,246,0.18)] border border-zinc-800/90 pointer-events-auto relative overflow-hidden"
        style={{
          background: 'linear-gradient(170deg, rgba(14, 14, 18, 0.98) 0%, rgba(8, 8, 11, 0.99) 100%)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Invisible top hover buffer bridging to header */}
        <div className="absolute -top-4 left-0 right-0 h-5 bg-transparent" />

        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* 4-Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10 mb-3">
          {servicesMegaMenuCategories.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2">
              {/* Category Header */}
              <div className="flex items-center gap-2 pb-1.5 border-b border-white/10">
                <span 
                  className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_10px_currentColor]"
                  style={{ backgroundColor: group.dotColor, color: group.dotColor }}
                />
                <h4 
                  className="text-xs font-mono font-bold tracking-wider uppercase text-zinc-200"
                >
                  {group.category}
                </h4>
              </div>

              {/* Service Items List */}
              <div className="space-y-1">
                {group.services.map((item) => {
                  const Icon = iconMap[item.icon] || Code2;
                  return (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      onClick={onClose}
                      className="group flex items-center gap-3 px-3 py-1.5 sm:py-2 rounded-xl transition-all duration-200 hover:bg-white/[0.06] border border-transparent hover:border-white/10 hover:shadow-md hover:shadow-blue-500/5"
                    >
                      <div 
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-110 ${item.iconBg}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1.5">
                          <p className="text-xs sm:text-[13px] font-semibold text-zinc-100 group-hover:text-blue-300 transition-colors leading-snug">
                            {item.title}
                          </p>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0 opacity-0 group-hover:opacity-100" />
                        </div>
                        <p className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="pt-3 border-t border-zinc-800/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm relative z-10">
          <div className="flex items-center gap-2.5 text-zinc-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>End-to-End Enterprise Architecture &amp; Agile Engineering</span>
          </div>

          <Link
            href="/contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 font-mono font-semibold text-xs sm:text-sm text-blue-400 hover:text-cyan-300 transition-colors group"
          >
            <span>Free Architecture Consultation</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
