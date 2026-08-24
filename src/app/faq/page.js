'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import { faqCategories, faqs } from '@/data/faqData';
import { ChevronDown, MessageSquare } from 'lucide-react';

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
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter((item) => item.category === activeCategory);

  const cardStyle = { backgroundColor: '#121212', border: '1px solid #27272a' };

  return (
    <PageTransition>
      <div className="space-y-20 pb-24 font-sans" style={{ backgroundColor: 'transparent', color: '#ffffff' }}>
        
        {/* FAQ Hero */}
        <section className="pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: '#3b82f6' }}>
              + KNOWLEDGE BASE
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto"
              style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
            >
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Questions</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#a1a1aa' }}>
              Everything you need to know about our project timelines, engineering SLAs, IP rights, and pricing structure.
            </motion.p>

            {/* Category Tabs */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-2 pt-6">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setOpenItems({});
                }}
                className="btn-interactive text-xs font-medium px-5 py-2.5 rounded-full cursor-pointer transition-all duration-200"
                style={{
                  backgroundColor: activeCategory === 'all' ? '#ffffff' : '#121212',
                  color: activeCategory === 'all' ? '#000000' : '#a1a1aa',
                  border: activeCategory === 'all' ? 'none' : '1px solid #27272a',
                  fontWeight: activeCategory === 'all' ? '600' : '500',
                }}
              >
                All Questions
              </button>
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenItems({});
                  }}
                  className="btn-interactive text-xs font-medium px-5 py-2.5 rounded-full cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: activeCategory === cat.id ? '#ffffff' : '#121212',
                    color: activeCategory === cat.id ? '#000000' : '#a1a1aa',
                    border: activeCategory === cat.id ? 'none' : '1px solid #27272a',
                    fontWeight: activeCategory === cat.id ? '600' : '500',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* FAQ Accordion List */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <motion.div 
            layout
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            <AnimatePresence mode="popLayout">
              {filteredFaqs.map((q, idx) => {
                const isOpen = !!openItems[q.id];
                return (
                  <motion.div
                    key={q.id}
                    layout
                    variants={fadeInUp}
                    custom={idx}
                    className="hover-card rounded-2xl overflow-hidden cursor-pointer"
                    style={cardStyle}
                  >
                    <button
                      onClick={() => toggleItem(q.id)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg cursor-pointer"
                      style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                    >
                      <span className="hover:text-white transition-colors">{q.question}</span>
                      <ChevronDown
                        className="w-5 h-5 shrink-0 transition-transform duration-300"
                        style={{ color: '#3b82f6', transform: isOpen ? 'rotate(180deg)' : 'none' }}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div
                            className="px-6 pb-6 pt-2 text-sm leading-relaxed"
                            style={{ borderTop: '1px solid #27272a', color: '#a1a1aa' }}
                          >
                            {q.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Support CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
            style={cardStyle}
          >
            <div className="space-y-1">
              <h4
                className="text-xl font-bold"
                style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
              >
                Have a question not listed here?
              </h4>
              <p className="text-xs" style={{ color: '#a1a1aa' }}>Our engineering leads respond within 4 hours.</p>
            </div>
            <Link
              href="/contact"
              className="font-medium text-xs px-6 py-3 rounded-full inline-flex items-center gap-2 shrink-0"
              style={{ backgroundColor: '#ffffff', color: '#000000' }}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Support</span>
            </Link>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}


