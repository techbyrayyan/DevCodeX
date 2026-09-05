'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import { pricingPlans } from '@/data/pricingData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
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

export default function PricingPage() {
  const cardStyle = { backgroundColor: '#121212', border: '1px solid #27272a' };

  return (
    <PageTransition>
      <div className="space-y-20 pb-24 font-sans" style={{ backgroundColor: 'transparent', color: '#ffffff' }}>
        
        {/* Pricing Hero */}
        <section className="pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: '#3b82f6' }}>
              + TRANSPARENT INVESTMENT
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto"
              style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
            >
              Flexible Packages For Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Growth Stage</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#a1a1aa' }}>
              Predictable milestone pricing with 100% code ownership, zero hidden fees, and dedicated technical SLAs.
            </motion.p>
          </motion.div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {pricingPlans.map((tier, idx) => (
              <motion.div
                key={tier.id}
                variants={fadeInUp}
                custom={idx}
                className="hover-card rounded-2xl p-8 space-y-6 flex flex-col justify-between relative group cursor-pointer"
                style={{
                  backgroundColor: '#121212',
                  border: tier.popular ? '1px solid #3b82f6' : '1px solid #27272a',
                  boxShadow: tier.popular ? '0 0 25px rgba(59, 130, 246, 0.15)' : 'none',
                }}
              >
                {tier.popular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full font-mono font-bold text-xs uppercase"
                    style={{ backgroundColor: '#3b82f6', color: '#000000' }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3
                      className="text-2xl font-bold group-hover:text-white transition-colors"
                      style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                    >
                      {tier.name}
                    </h3>
                    <p className="text-xs mt-1" style={{ color: '#a1a1aa' }}>{tier.description}</p>
                  </div>

                  <div className="pt-4 flex items-baseline gap-1" style={{ borderTop: '1px solid #27272a' }}>
                    <span
                      className="text-4xl font-black font-mono"
                      style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                    >
                      {tier.priceMonthly}
                    </span>
                    <span className="text-xs font-mono" style={{ color: '#a1a1aa' }}>/{tier.period}</span>
                  </div>

                  <div className="space-y-3 pt-4" style={{ borderTop: '1px solid #27272a' }}>
                    <span className="text-xs font-mono uppercase tracking-wider block font-semibold" style={{ color: '#3b82f6' }}>Included Deliverables</span>
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs" style={{ color: '#a1a1aa' }}>
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#3b82f6' }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6" style={{ borderTop: '1px solid #27272a' }}>
                  <Link
                    href="/contact"
                    className="btn-interactive w-full py-3.5 rounded-full font-medium text-xs sm:text-sm inline-flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: tier.popular ? '#ffffff' : 'transparent',
                      color: tier.popular ? '#000000' : '#ffffff',
                      border: tier.popular ? 'none' : '1px solid #27272a',
                    }}
                  >
                    <span>{tier.ctaText || `Get Started with ${tier.name}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
}



