'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import { services } from '@/data/servicesData';
import { 
  ArrowRight, CheckCircle2, Code2, Layout, Sparkles, Zap, Cpu, Layers, 
  Server, Box, Database, Globe, ShoppingBag, Bot, Brain, Palette, Cloud, TrendingUp 
} from 'lucide-react';

const iconMap = { 
  Code2, Layout, Sparkles, Zap, Cpu, Layers, 
  Server, Box, Database, Globe, ShoppingBag, Bot, Brain, Palette, Cloud, TrendingUp 
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export default function ServicesPage() {
  const cardStyle = { backgroundColor: '#121212', border: '1px solid #27272a' };
  const iconBoxStyle = { backgroundColor: '#050505', border: '1px solid #27272a' };

  return (
    <PageTransition>
      <div className="space-y-24 pb-24 font-sans" style={{ backgroundColor: 'transparent', color: '#ffffff' }}>
        
        {/* Services Hero */}
        <section className="pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: '#3b82f6' }}>
              + FULL-SPECTRUM DIGITAL SERVICES
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto"
              style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
            >
              Technology That Moves Your Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Forward</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#a1a1aa' }}>
              From high-speed Next.js web applications to AI agents and interactive digital experiences, we engineer solutions designed to dominate.
            </motion.p>
          </motion.div>
        </section>

        {/* Services Listing Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {services.map((service, idx) => {
              const IconComponent = iconMap[service.icon] || Code2;
              return (
                <motion.div
                  key={service.id}
                  variants={fadeInUp}
                  custom={idx}
                  className="hover-card rounded-2xl p-8 space-y-6 flex flex-col justify-between group cursor-pointer"
                  style={cardStyle}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl flex items-center justify-center group-hover:border-blue-500/50 transition-colors" style={iconBoxStyle}>
                        <IconComponent className="w-6 h-6 group-hover:text-blue-400 transition-colors" style={{ color: '#ffffff' }} />
                      </div>
                      <span
                        className="text-xs font-mono px-3 py-1 rounded-full"
                        style={{ backgroundColor: '#050505', border: '1px solid #27272a', color: '#3b82f6' }}
                      >
                        {service.badge}
                      </span>
                    </div>

                    <h3
                      className="text-2xl font-bold group-hover:text-white transition-colors"
                      style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#a1a1aa' }}>
                      {service.shortDescription}
                    </p>

                    <div className="space-y-2 pt-2">
                      {service.features.slice(0, 4).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs" style={{ color: '#a1a1aa' }}>
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: '#3b82f6' }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4" style={{ borderTop: '1px solid #27272a' }}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="btn-interactive inline-flex items-center justify-between w-full text-xs font-bold font-mono group/btn"
                      style={{ color: '#ffffff' }}
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
}


