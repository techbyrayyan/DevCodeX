'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { services } from '@/data/servicesData';
import { 
  ArrowRight, CheckCircle2, Code2, Layout, Sparkles, Zap, Cpu, Layers, 
  Server, Box, Database, Globe, ShoppingBag, Bot, Brain, Palette, Cloud, TrendingUp,
  ChevronLeft, ChevronRight, Play, Pause,
  Smartphone, ShieldAlert, ShieldCheck, Search, Target, Megaphone, Boxes
} from 'lucide-react';

const iconMap = { 
  Code2, Layout, Sparkles, Zap, Cpu, Layers, 
  Server, Box, Database, Globe, ShoppingBag, Bot, Brain, Palette, Cloud, TrendingUp,
  Smartphone, ShieldAlert, ShieldCheck, Search, Target, Megaphone, Boxes
};

// Triple the services array for seamless infinite looping
const extendedServices = [...services, ...services, ...services];

export default function ServicesSection() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(services.length); // Start at middle segment (index 15)
  const [withTransition, setWithTransition] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const cardStyle = { 
    backgroundColor: 'rgba(16, 16, 20, 0.75)', 
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(16px)'
  };
  const iconBoxStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.04)', 
    border: '1px solid rgba(255, 255, 255, 0.08)' 
  };
  const innerCardStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.03)', 
    border: '1px solid rgba(255, 255, 255, 0.07)' 
  };

  const getServiceColor = (badge = '') => {
    const b = badge.toLowerCase();
    if (b.includes('ai') || b.includes('smart') || b.includes('workflow')) {
      return {
        badgeClass: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
        iconClass: 'text-purple-400',
        iconBoxClass: 'bg-purple-500/10 border-purple-500/25',
        hoverBorder: 'hover:border-purple-500/40 hover:shadow-[0_12px_30px_-10px_rgba(168,85,247,0.2)]'
      };
    }
    if (b.includes('commerce') || b.includes('cms') || b.includes('growth') || b.includes('portal')) {
      return {
        badgeClass: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
        iconClass: 'text-emerald-400',
        iconBoxClass: 'bg-emerald-500/10 border-emerald-500/25',
        hoverBorder: 'hover:border-emerald-500/40 hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.2)]'
      };
    }
    if (b.includes('frontend') || b.includes('styling') || b.includes('ui') || b.includes('css')) {
      return {
        badgeClass: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
        iconClass: 'text-cyan-400',
        iconBoxClass: 'bg-cyan-500/10 border-cyan-500/25',
        hoverBorder: 'hover:border-cyan-500/40 hover:shadow-[0_12px_30px_-10px_rgba(6,182,212,0.2)]'
      };
    }
    if (b.includes('cloud') || b.includes('devops') || b.includes('design') || b.includes('prototyping')) {
      return {
        badgeClass: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
        iconClass: 'text-amber-400',
        iconBoxClass: 'bg-amber-500/10 border-amber-500/25',
        hoverBorder: 'hover:border-amber-500/40 hover:shadow-[0_12px_30px_-10px_rgba(245,158,11,0.2)]'
      };
    }
    return {
      badgeClass: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
      iconClass: 'text-blue-400',
      iconBoxClass: 'bg-blue-500/10 border-blue-500/25',
      hoverBorder: 'hover:border-blue-500/40 hover:shadow-[0_12px_30px_-10px_rgba(59,130,246,0.2)]'
    };
  };

  // Calculate items visible per view responsively (wider cards: max 3 per view on desktop, 2 on tablet, 1 on mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1200) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slide forward by 1 card
  const handleNext = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // Slide backward by 1 card
  const handlePrev = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Seamless boundary wrap when animation completes
  const handleTransitionEnd = () => {
    if (currentIndex >= services.length * 2) {
      setWithTransition(false);
      setCurrentIndex(currentIndex - services.length);
    } else if (currentIndex < services.length) {
      setWithTransition(false);
      setCurrentIndex(currentIndex + services.length);
    }
  };

  // Re-enable transition smoothly after jump
  useEffect(() => {
    if (!withTransition) {
      const timer = setTimeout(() => {
        setWithTransition(true);
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [withTransition]);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Calculate current normalized active service index for counter (1 to 15)
  const activeServiceNum = (currentIndex % services.length) + 1;

  return (
    <section className="py-14 relative overflow-hidden" style={{ borderBottom: '1px solid #27272a' }}>
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-mono font-semibold uppercase tracking-widest text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FULL-SPECTRUM DIGITAL SERVICES</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
              style={{ fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
            >
              Technology Solutions & Services
            </h2>
            <p className="text-sm max-w-2xl" style={{ color: '#a1a1aa' }}>
              Explore our complete suite of engineering capabilities. Swipe or use the controls below to slide through all {services.length} specialized services.
            </p>
          </div>

          {/* Navigation Controls & Counter */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              title={isAutoPlay ? 'Pause Auto-play' : 'Resume Auto-play'}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            {/* Slider Counter */}
            <span className="text-xs font-mono text-zinc-400 px-3 py-2 rounded-full border border-zinc-800 bg-zinc-900/60 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-white font-bold">{activeServiceNum < 10 ? `0${activeServiceNum}` : activeServiceNum}</span> / {services.length}
            </span>

            {/* Prev / Next Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Service Card"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 bg-zinc-900/80 hover:border-blue-500/50 hover:bg-gradient-to-tr hover:from-blue-600 hover:to-indigo-600 hover:text-white text-zinc-300 shadow-md transition-all duration-300 cursor-pointer active:scale-95 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Service Card"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 bg-zinc-900/80 hover:border-blue-500/50 hover:bg-gradient-to-tr hover:from-blue-600 hover:to-indigo-600 hover:text-white text-zinc-300 shadow-md transition-all duration-300 cursor-pointer active:scale-95 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ══ INFINITE 4-CARD SLIDER VIEWPORT ══ */}
        <div 
          className="overflow-hidden relative -mx-2.5 px-2.5 py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Continuous Sliding Track */}
          <div
            onTransitionEnd={handleTransitionEnd}
            className="flex"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
              transition: withTransition ? 'transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1)' : 'none',
            }}
          >
            {extendedServices.map((service, idx) => {
              const IconComponent = iconMap[service.icon] || Code2;
              const { badgeClass, iconClass, iconBoxClass, hoverBorder } = getServiceColor(service.badge);

              return (
                <div
                  key={`${service.id}-${idx}`}
                  className="w-full md:w-1/2 lg:w-1/3 shrink-0 p-3"
                >
                  <Link 
                    href={`/services/${service.slug}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/services/${service.slug}`);
                    }}
                    className={`block h-full rounded-2xl p-7 flex flex-col justify-between hover-card border transition-all duration-300 group cursor-pointer ${hoverBorder}`}
                    style={cardStyle}
                  >
                    {/* Card Top Section */}
                    <div className="space-y-5">
                      {/* Icon & Badge */}
                      <div className="flex items-center justify-between">
                        <div 
                          className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 ${iconBoxClass}`} 
                        >
                          <IconComponent className={`w-6 h-6 ${iconClass}`} />
                        </div>
                        <span
                          className={`text-xs font-mono px-3 py-1 rounded-full border font-semibold uppercase tracking-wider ${badgeClass}`}
                        >
                          {service.badge}
                        </span>
                      </div>

                      {/* Title & Short Description */}
                      <div className="space-y-2.5">
                        <h3
                          className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1"
                          style={{ fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                        >
                          {service.title}
                        </h3>
                        <p className="text-sm leading-relaxed line-clamp-3 text-zinc-300">
                          {service.shortDescription || service.description}
                        </p>
                      </div>

                      {/* Feature Bullet Points */}
                      <div className="space-y-2 pt-2">
                        {service.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-400">
                            <CheckCircle2 className={`w-4 h-4 shrink-0 ${iconClass}`} />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Bottom CTA Link */}
                    <div className="pt-5 mt-6 border-t border-white/5">
                      <div
                        className="btn-interactive inline-flex items-center justify-between w-full text-sm font-bold font-mono group/btn text-zinc-300 group-hover:text-blue-300 transition-colors"
                      >
                        <span>Explore Details</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ BOTTOM PROGRESS BAR & ALL SERVICES LINK ══ */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">Total Available Services:</span>
            <span suppressHydrationWarning className="text-xs font-mono font-bold text-white">{services.length} Specialized Offerings</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/services"
              suppressHydrationWarning
              className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors font-semibold group"
            >
              <span>View All {services.length} Services on Services Page</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}


