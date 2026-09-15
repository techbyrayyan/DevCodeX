'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { projects } from '@/data/projectsData';
import { ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';

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

  // Docfind project
  const docfindProject = projects.find((p) => p.id === 'docfind');

  // Filter remaining projects
  const filteredProjects = selectedCategory === 'All'
    ? projects.filter((p) => p.id !== 'docfind')
    : projects.filter((p) => p.category === selectedCategory && p.id !== 'docfind');

  const showDocfindFeatured = selectedCategory === 'All' || selectedCategory === 'Web App';

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

        {/* ══ FEATURED DOCFIND SHOWCASE (Right: Image, Left: Description - About style) ══ */}
        {showDocfindFeatured && docfindProject && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-6 sm:p-10 lg:p-12 border border-zinc-800/80 bg-[#121212]/90 backdrop-blur-xl relative overflow-hidden group hover:border-blue-500/40 transition-all duration-500 shadow-2xl"
            >
              {/* Ambient background glow */}
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                
                {/* ── LEFT COLUMN: Docfind Description & Details ── */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-mono font-semibold uppercase tracking-widest text-blue-400">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span>+ FEATURED HEALTHCARE PLATFORM</span>
                  </div>

                  <div className="space-y-3">
                    <h2
                      className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
                      style={{ fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}
                    >
                      Docfind
                    </h2>
                    <p className="text-lg sm:text-xl font-medium text-zinc-300">
                      Find The Best Doctor Near You
                    </p>
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                    Find and book appointments with top verified medical specialists near you. Docfind is an accessible, modern healthcare platform engineered to simplify doctor discovery with specialty categorization, real-time doctor availability, verified patient ratings, and frictionless one-click consultation reservations.
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Specialist Search &amp; Discovery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Instant Calendar Scheduling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Verified Patient Ratings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Mobile-First Responsive UI</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Next.js', 'React', 'Tailwind CSS', 'Healthcare', 'Doctor Booking'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900/90 border border-zinc-800 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <a
                      href="https://docfind-two.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-interactive inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm bg-white text-black hover:bg-blue-400 hover:text-black transition-all duration-300 shadow-lg shadow-white/10"
                    >
                      <span>Visit Live Site</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <Link
                      href="/projects/docfind"
                      className="btn-interactive inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-white border border-zinc-700 bg-zinc-900/60 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* ── RIGHT COLUMN: Docfind Screenshot Image ── */}
                <div className="lg:col-span-7">
                  <a
                    href="https://docfind-two.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="relative block w-full h-[280px] sm:h-[380px] lg:h-[440px] rounded-2xl overflow-hidden border border-zinc-800 bg-[#050505] group/img shadow-2xl hover:border-blue-500/60 transition-all duration-500"
                  >
                    <Image
                      src="/docfind.png"
                      alt="Docfind - Find The Best Doctor Near You"
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity duration-300" />
                    
                    {/* Live status badge */}
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Site</span>
                    </div>

                    {/* Hover overlay hint */}
                    <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300 group-hover/img:text-white transition-colors">
                      <span>Preview docfind-two.vercel.app</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </a>
                </div>

              </div>
            </motion.div>
          </section>
        )}

        {/* Projects Showcase Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showDocfindFeatured && filteredProjects.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: '"Outfit", "Inter", system-ui, sans-serif' }}>
                More Selected Works
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Explore additional enterprise and commercial case studies engineered by DevCodeX.
              </p>
            </div>
          )}

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


