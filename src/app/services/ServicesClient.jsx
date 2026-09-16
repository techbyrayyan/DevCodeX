'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { services } from '@/data/servicesData';
import { 
  ArrowRight, CheckCircle2, Code2, Layout, Sparkles, Zap, Cpu, Layers, 
  Server, Box, Database, Globe, ShoppingBag, Bot, Brain, Palette, Cloud, TrendingUp,
  Smartphone, ShieldAlert, ShieldCheck, Search, Target, Megaphone, Boxes
} from 'lucide-react';

const iconMap = { 
  Code2, Layout, Sparkles, Zap, Cpu, Layers, 
  Server, Box, Database, Globe, ShoppingBag, Bot, Brain, Palette, Cloud, TrendingUp,
  Smartphone, ShieldAlert, ShieldCheck, Search, Target, Megaphone, Boxes
};

/* ── Vibrant Color Palette Cycle (Blue, Yellow, Green, Purple, Cyan, Rose, Orange) ── */
const colorThemes = [
  {
    name: 'blue',
    color: '#3b82f6',
    hoverBorder: 'rgba(59, 130, 246, 0.8)',
    glow: 'rgba(59, 130, 246, 0.28)',
    badgeBg: 'rgba(59, 130, 246, 0.1)',
    badgeBorder: 'rgba(59, 130, 246, 0.3)',
    badgeText: '#60a5fa',
    iconBg: 'rgba(59, 130, 246, 0.12)',
    iconBorder: 'rgba(59, 130, 246, 0.25)',
  },
  {
    name: 'yellow',
    color: '#eab308',
    hoverBorder: 'rgba(234, 179, 8, 0.8)',
    glow: 'rgba(234, 179, 8, 0.28)',
    badgeBg: 'rgba(234, 179, 8, 0.1)',
    badgeBorder: 'rgba(234, 179, 8, 0.3)',
    badgeText: '#facc15',
    iconBg: 'rgba(234, 179, 8, 0.12)',
    iconBorder: 'rgba(234, 179, 8, 0.25)',
  },
  {
    name: 'green',
    color: '#10b981',
    hoverBorder: 'rgba(16, 185, 129, 0.8)',
    glow: 'rgba(16, 185, 129, 0.28)',
    badgeBg: 'rgba(16, 185, 129, 0.1)',
    badgeBorder: 'rgba(16, 185, 129, 0.3)',
    badgeText: '#34d399',
    iconBg: 'rgba(16, 185, 129, 0.12)',
    iconBorder: 'rgba(16, 185, 129, 0.25)',
  },
  {
    name: 'purple',
    color: '#a855f7',
    hoverBorder: 'rgba(168, 85, 247, 0.8)',
    glow: 'rgba(168, 85, 247, 0.28)',
    badgeBg: 'rgba(168, 85, 247, 0.1)',
    badgeBorder: 'rgba(168, 85, 247, 0.3)',
    badgeText: '#c084fc',
    iconBg: 'rgba(168, 85, 247, 0.12)',
    iconBorder: 'rgba(168, 85, 247, 0.25)',
  },
  {
    name: 'cyan',
    color: '#06b6d4',
    hoverBorder: 'rgba(6, 182, 212, 0.8)',
    glow: 'rgba(6, 182, 212, 0.28)',
    badgeBg: 'rgba(6, 182, 212, 0.1)',
    badgeBorder: 'rgba(6, 182, 212, 0.3)',
    badgeText: '#22d3ee',
    iconBg: 'rgba(6, 182, 212, 0.12)',
    iconBorder: 'rgba(6, 182, 212, 0.25)',
  },
  {
    name: 'rose',
    color: '#f43f5e',
    hoverBorder: 'rgba(244, 63, 94, 0.8)',
    glow: 'rgba(244, 63, 94, 0.28)',
    badgeBg: 'rgba(244, 63, 94, 0.1)',
    badgeBorder: 'rgba(244, 63, 94, 0.3)',
    badgeText: '#fb7185',
    iconBg: 'rgba(244, 63, 94, 0.12)',
    iconBorder: 'rgba(244, 63, 94, 0.25)',
  },
  {
    name: 'orange',
    color: '#f97316',
    hoverBorder: 'rgba(249, 115, 22, 0.8)',
    glow: 'rgba(249, 115, 22, 0.28)',
    badgeBg: 'rgba(249, 115, 22, 0.1)',
    badgeBorder: 'rgba(249, 115, 22, 0.3)',
    badgeText: '#fb923c',
    iconBg: 'rgba(249, 115, 22, 0.12)',
    iconBorder: 'rgba(249, 115, 22, 0.25)',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: custom * 0.04,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

/* ── Individual Professional Service Card Component ── */
function ProfessionalServiceCard({ service, index }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const theme = colorThemes[index % colorThemes.length];
  const IconComponent = iconMap[service.icon] || Code2;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/services/${service.slug}`)}
      className="relative rounded-3xl p-8 flex flex-col justify-between h-full group cursor-pointer transition-all duration-500 overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, rgba(22, 22, 28, 0.85) 0%, rgba(10, 10, 14, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${isHovered ? theme.hoverBorder : 'rgba(255, 255, 255, 0.08)'}`,
        boxShadow: isHovered 
          ? `0 20px 40px -12px ${theme.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.18)` 
          : 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Subtle Ambient Radial Glow on Hover */}
      <div
        className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
        style={{
          backgroundColor: theme.color,
          opacity: isHovered ? 0.22 : 0.04,
        }}
      />

      <div className="space-y-6 relative z-10">
        
        {/* Top Header: Icon + Badge */}
        <div className="flex items-center justify-between">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
            style={{
              backgroundColor: isHovered ? theme.iconBg : 'rgba(255, 255, 255, 0.04)',
              border: `1px solid ${isHovered ? theme.iconBorder : 'rgba(255, 255, 255, 0.08)'}`,
              color: isHovered ? theme.color : '#ffffff',
              transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            }}
          >
            <IconComponent className="w-7 h-7 transition-colors" />
          </div>

          <span
            className="text-[11px] font-mono px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold transition-colors duration-300"
            style={{
              backgroundColor: isHovered ? theme.badgeBg : 'rgba(0, 0, 0, 0.5)',
              border: `1px solid ${isHovered ? theme.badgeBorder : 'rgba(255, 255, 255, 0.08)'}`,
              color: isHovered ? theme.badgeText : '#a1a1aa',
            }}
          >
            {service.badge}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2.5">
          <h3
            className="text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300"
            style={{
              color: isHovered ? theme.color : '#ffffff',
              fontFamily: '"Outfit", "Inter", system-ui, sans-serif',
            }}
          >
            {service.title}
          </h3>

          <p className="text-sm leading-relaxed text-zinc-400 font-normal">
            {service.shortDescription}
          </p>
        </div>

        {/* Key Features List */}
        <div className="space-y-2.5 pt-2">
          {service.features.slice(0, 4).map((feat, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-300">
              <CheckCircle2
                className="w-4 h-4 shrink-0 transition-colors duration-300"
                style={{ color: isHovered ? theme.color : '#52525b' }}
              />
              <span className="leading-snug">{feat}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Footer CTA Link */}
      <div
        className="pt-6 mt-6 relative z-10 transition-colors duration-300 flex items-center justify-between"
        style={{
          borderTop: `1px solid ${isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.06)'}`,
        }}
      >
        <span
          className="text-xs font-mono font-semibold transition-colors duration-300 flex items-center gap-2"
          style={{
            color: isHovered ? theme.color : '#ffffff',
          }}
        >
          Explore Architecture &amp; Specs
        </span>

        <div
          className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: isHovered ? theme.iconBg : 'rgba(255, 255, 255, 0.04)',
            color: isHovered ? theme.color : '#a1a1aa',
            transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
          }}
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>

    </div>
  );
}

export default function ServicesClient() {
  return (
    <PageTransition>
      <div className="space-y-12 pb-16 font-sans" style={{ backgroundColor: 'transparent', color: '#ffffff' }}>
        
        {/* Services Hero */}
        <section className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-mono font-semibold uppercase tracking-widest text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ FULL-SPECTRUM DIGITAL ENGINEERING</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto"
              style={{ fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
            >
              Technology That Moves Your Business{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-200 to-indigo-300 drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                Forward
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-xl max-w-2xl mx-auto leading-relaxed text-zinc-400"
            >
              From high-speed Next.js web applications to AI agents and interactive 3D WebGL experiences, we engineer enterprise-grade solutions built to dominate.
            </motion.p>
          </motion.div>
        </section>

        {/* Services Listing Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
          >
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                custom={idx}
                className="h-full"
              >
                <ProfessionalServiceCard service={service} index={idx} />
              </motion.div>
            ))}
          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
}
