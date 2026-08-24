'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, CheckCircle2 } from 'lucide-react';

export default function WelcomePopup({ isOpen, onContinue, toolName }) {
  // Backdrop animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Popup modal animation variants (Exact specs from prompt)
  const popupVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.75, 
      y: 40 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.45,
        ease: 'easeOut',
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.85, 
      y: 20,
      transition: {
        duration: 0.45,
        ease: 'easeOut',
      }
    },
  };

  // Staggered children animation variants
  const childFadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
  };

  const logoScale = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.45, ease: 'easeOut' }
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with 0.65 opacity and backdrop-blur-xl */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 backdrop-blur-xl"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
            }}
          />

          {/* Premium SaaS Glassmorphism Popup Container */}
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-[24px] border p-6 sm:p-[40px] text-[#F8FAFC] shadow-2xl transition-all"
            style={{
              backgroundColor: '#111827',
              borderColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              boxShadow: '0 0 70px -10px rgba(37, 99, 235, 0.4), 0 25px 50px -12px rgba(0, 0, 0, 0.85), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Background Secondary Glow Effects */}
            <div 
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl opacity-35"
              style={{ background: '#7C3AED' }}
            />
            <div 
              className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl opacity-35"
              style={{ background: '#2563EB' }}
            />

            <div className="relative z-20 flex flex-col items-center text-center">
              {/* Circular Glowing Icon at Top */}
              <motion.div variants={logoScale} className="mb-6 relative">
                {/* Continuous Soft Pulse Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.18, 1],
                    opacity: [0.4, 0.85, 0.4],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 rounded-full blur-xl"
                  style={{
                    background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                  }}
                />
                <div
                  className="relative flex h-20 w-20 items-center justify-center rounded-full p-[2px] shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                  }}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#111827]/90 backdrop-blur-md">
                    <Sparkles className="h-9 w-9 text-[#2563EB] animate-pulse" />
                  </div>
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h2
                variants={childFadeUp}
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F8FAFC] mb-3"
              >
                🚀 Welcome to DevCodeX Tools
              </motion.h2>

              {/* Tool specific badge if tool name is passed */}
              {toolName && (
                <motion.div variants={childFadeUp} className="mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/30">
                    <Zap className="w-3.5 h-3.5 text-[#2563EB]" /> Launching: {toolName}
                  </span>
                </motion.div>
              )}

              {/* Description Body */}
              <motion.div variants={childFadeUp} className="space-y-3.5 text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-8">
                <p className="font-medium text-[#F8FAFC]/90">
                  Thank you for choosing DevCodeX.
                </p>
                <p>
                  We're excited to have you here.
                </p>
                <p className="text-xs sm:text-sm">
                  Every tool on DevCodeX is carefully crafted to help developers, designers, freelancers, students, and businesses work faster and smarter.
                </p>

                {/* Mission Bullet Points Box */}
                <div className="my-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 text-left backdrop-blur-md">
                  <p className="font-bold text-[#F8FAFC] text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#2563EB]" /> Our mission is simple:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#F8FAFC]/85">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" /> Save your time
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" /> Boost your productivity
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" /> Deliver accurate results
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" /> Build with confidence
                    </li>
                  </ul>
                </div>

                <p className="text-xs sm:text-sm pt-1">
                  We hope you enjoy using this tool.
                </p>
                <p className="font-semibold text-[#F8FAFC] text-sm sm:text-base">
                  Happy Building! 💙
                </p>
                <p className="text-xs font-semibold text-[#94A3B8] tracking-wide">
                  — Team DevCodeX
                </p>
              </motion.div>

              {/* Primary Button */}
              <motion.div variants={childFadeUp} className="w-full">
                <button
                  type="button"
                  onClick={onContinue}
                  className="group relative flex w-full items-center justify-center gap-2 rounded-full py-4 px-8 font-bold text-white text-base shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: '#2563EB',
                    boxShadow: '0 0 25px rgba(37, 99, 235, 0.55)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#3B82F6';
                    e.currentTarget.style.boxShadow = '0 0 35px rgba(59, 130, 246, 0.75)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563EB';
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(37, 99, 235, 0.55)';
                  }}
                >
                  <span>Continue to Tool</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
