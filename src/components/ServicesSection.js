'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { services } from '@/data/servicesData';
import { 
  ArrowRight, CheckCircle2, Code2, Layout, Sparkles, Zap, Cpu, Layers, 
  Server, Box, Database, Globe, ShoppingBag, Bot, Brain, Palette, Cloud, TrendingUp,
  ChevronLeft, ChevronRight, Play, Pause
} from 'lucide-react';

const iconMap = { 
  Code2, Layout, Sparkles, Zap, Cpu, Layers, 
  Server, Box, Database, Globe, ShoppingBag, Bot, Brain, Palette, Cloud, TrendingUp 
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

  const cardStyle = { backgroundColor: '#121212', border: '1px solid #27272a' };
  const iconBoxStyle = { backgroundColor: '#050505', border: '1px solid #27272a' };
  const innerCardStyle = { backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid #27272a' };

  // Calculate items visible per view responsively
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 840) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1140) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
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
    <section className="py-24 relative overflow-hidden" style={{ borderBottom: '1px solid #27272a' }}>
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
              Explore our complete suite of engineering capabilities. Swipe or use the controls below to slide through all 15 specialized services.
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
                className="w-11 h-11 rounded-full flex items-center justify-center border border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black text-white shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Service Card"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black text-white shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
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
              return (
                <div
                  key={`${service.id}-${idx}`}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shrink-0 p-2.5"
                >
                  <Link 
                    href={`/services/${service.slug}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/services/${service.slug}`);
                    }}
                    className="block h-full rounded-2xl p-6 flex flex-col justify-between hover-card hover-glow border transition-all duration-300 group cursor-pointer"
                    style={cardStyle}
                  >
                    {/* Card Top Section */}
                    <div className="space-y-4">
                      {/* Icon & Badge */}
                      <div className="flex items-center justify-between">
                        <div 
                          className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:border-blue-500/50 transition-colors" 
                          style={iconBoxStyle}
                        >
                          <IconComponent className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <span
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 font-semibold uppercase tracking-wider"
                        >
                          {service.badge}
                        </span>
                      </div>

                      {/* Title & Short Description */}
                      <div className="space-y-2">
                        <h3
                          className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1"
                          style={{ fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                        >
                          {service.title}
                        </h3>
                        <p className="text-xs leading-relaxed line-clamp-3" style={{ color: '#a1a1aa' }}>
                          {service.shortDescription || service.description}
                        </p>
                      </div>

                      {/* Feature Bullet Points */}
                      <div className="space-y-1.5 pt-2">
                        {service.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px]" style={{ color: '#a1a1aa' }}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Bottom CTA Link */}
                    <div className="pt-4 mt-5" style={{ borderTop: '1px solid #27272a' }}>
                      <div
                        className="btn-interactive inline-flex items-center justify-between w-full text-xs font-bold font-mono group/btn text-white group-hover:text-blue-400 transition-colors"
                      >
                        <span>Explore Details</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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
            <span className="text-xs font-mono font-bold text-white">{services.length} Specialized Offerings</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors font-semibold group"
            >
              <span>View All 15 Services on Services Page</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}


