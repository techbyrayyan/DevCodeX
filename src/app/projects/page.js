'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { projects } from '@/data/projectsData';
import { ExternalLink } from 'lucide-react';

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

        {/* ══ PROJECTS SHOWCASE (Direct Image, No Card BG, Hover Centered Button) ══ */}
        {filteredProjects.length > 0 ? (
          <div className="space-y-24 sm:space-y-32">
            {filteredProjects.map((project, idx) => (
              <section key={project.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
                >
                  {/* ── LEFT COLUMN: Description / Content Only ── */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-mono font-semibold uppercase tracking-widest text-blue-400">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <span>+ {project.badge || project.category.toUpperCase()}</span>
                    </div>

                    <div className="space-y-2">
                      <h2
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
                        style={{ fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                      >
                        {project.shortTitle || project.title}
                      </h2>
                      {project.subtitle && (
                        <p className="text-xl sm:text-2xl font-medium text-zinc-300">
                          {project.subtitle}
                        </p>
                      )}
                    </div>

                    <p className="text-base sm:text-lg leading-relaxed text-zinc-300 font-normal pt-2">
                      {project.description}
                    </p>
                  </div>

                  {/* ── RIGHT COLUMN: Direct Image with Hover Centered Visit Site Button ── */}
                  <div className="lg:col-span-7">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative block w-full h-[300px] sm:h-[400px] lg:h-[460px] rounded-2xl overflow-hidden border border-zinc-800/90 shadow-2xl hover:border-blue-500/60 transition-all duration-500 cursor-pointer"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        priority={idx === 0}
                      />

                      {/* Centered Visit Site button on hover */}
                      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                        <span className="btn-interactive inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm bg-white text-black hover:bg-blue-400 hover:text-black transition-all duration-300 shadow-2xl transform scale-90 group-hover:scale-100">
                          <span>Visit Live Site</span>
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </div>
                    </a>
                  </div>
                </motion.div>
              </section>
            ))}
          </div>
        ) : (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
            <div className="p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 max-w-md mx-auto space-y-3">
              <p className="text-zinc-400 text-sm font-medium">New case studies in this category are coming soon.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="btn-interactive text-xs font-semibold text-blue-400 hover:text-white underline cursor-pointer"
              >
                View All Projects
              </button>
            </div>
          </section>
        )}

      </div>
    </PageTransition>
  );
}


