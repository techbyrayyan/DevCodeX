'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import { blogArticles } from '@/data/blogData';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

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

export default function BlogPage() {
  const cardStyle = { backgroundColor: '#121212', border: '1px solid #27272a' };

  return (
    <PageTransition>
      <div className="space-y-20 pb-24 font-sans" style={{ backgroundColor: '#050505', color: '#ffffff' }}>
        
        {/* Blog Hero */}
        <section className="pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: '#3b82f6' }}>
              + INSIGHTS & INSIGHTFUL READING
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto"
              style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
            >
              Engineering Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Tech Trends</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#a1a1aa' }}>
              Articles on Next.js 15, autonomous AI agent architecture, WebGL graphics optimization, and modern web application scaling.
            </motion.p>
          </motion.div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {blogArticles.map((article, idx) => (
              <motion.div
                key={article.id}
                variants={fadeInUp}
                custom={idx}
                className="hover-card rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer"
                style={cardStyle}
              >
                <div
                  className="relative h-52 w-full overflow-hidden"
                  style={{ borderBottom: '1px solid #27272a', backgroundColor: '#050505' }}
                >
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono backdrop-blur-md"
                      style={{ backgroundColor: 'rgba(5,5,5,0.85)', border: '1px solid #27272a', color: '#3b82f6' }}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs font-mono" style={{ color: '#a1a1aa' }}>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                    </div>

                    <h3
                      className="text-xl font-bold leading-snug group-hover:text-white transition-colors"
                      style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-xs leading-relaxed line-clamp-3" style={{ color: '#a1a1aa' }}>
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between" style={{ borderTop: '1px solid #27272a' }}>
                    <div className="flex items-center gap-2">
                      <div
                        className="relative w-6 h-6 rounded-full overflow-hidden"
                        style={{ border: '1px solid #27272a', backgroundColor: '#050505' }}
                      >
                        <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
                      </div>
                      <span className="text-xs font-medium" style={{ color: '#ffffff' }}>{article.author.name}</span>
                    </div>

                    <Link
                      href={`/blog/${article.slug}`}
                      className="btn-interactive inline-flex items-center gap-1 text-xs font-bold group/link"
                      style={{ color: '#ffffff' }}
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
}


