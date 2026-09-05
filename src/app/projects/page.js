'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import { projects } from '@/data/projectsData';
import { ArrowRight, ExternalLink } from 'lucide-react';

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

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web App', 'AI Platform', 'FinTech', 'E-Commerce'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const cardStyle = { backgroundColor: '#121212', border: '1px solid #27272a' };

  return (
    <PageTransition>
      <div className="space-y-20 pb-24 font-sans" style={{ backgroundColor: 'transparent', color: '#ffffff' }}>
        
        {/* Projects Hero */}
        <section className="pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: '#3b82f6' }}>
              + PORTFOLIO & CASE STUDIES
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto"
              style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
            >
              Engineered Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">That Speaks</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#a1a1aa' }}>
              Explore our curated portfolio of bespoke web platforms, autonomous AI infrastructure, and high-converting commercial applications.
            </motion.p>

            {/* Category Filters */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="btn-interactive text-xs font-medium px-5 py-2.5 rounded-full cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: selectedCategory === cat ? '#ffffff' : '#121212',
                    color: selectedCategory === cat ? '#000000' : '#a1a1aa',
                    border: selectedCategory === cat ? 'none' : '1px solid #27272a',
                    fontWeight: selectedCategory === cat ? '600' : '500',
                  }}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Projects Showcase Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={fadeInUp}
                  custom={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="hover-card rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer"
                  style={cardStyle}
                >
                  <div
                    className="relative h-56 w-full overflow-hidden"
                    style={{ borderBottom: '1px solid #27272a', backgroundColor: '#050505' }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-mono backdrop-blur-md"
                        style={{ backgroundColor: 'rgba(5,5,5,0.85)', border: '1px solid #27272a', color: '#3b82f6' }}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3
                        className="text-2xl font-bold group-hover:text-white transition-colors"
                        style={{ color: '#ffffff', fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: '#a1a1aa' }}>
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between" style={{ borderTop: '1px solid #27272a' }}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="btn-interactive inline-flex items-center gap-2 text-xs font-bold group/link"
                        style={{ color: '#ffffff' }}
                      >
                        <span>Read Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                      </Link>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded-lg hover:text-white transition-colors"
                        style={{ color: '#a1a1aa' }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
}


