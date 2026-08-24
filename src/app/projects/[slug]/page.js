'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageTransition from '@/components/PageTransition';
import { projects } from '@/data/projectsData';
import { ChevronRight, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function ProjectDetailPage({ params }) {
  const resolvedParams = use(params);
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="space-y-20 pb-24 font-sans bg-black text-white">
        
        {/* Header Breadcrumbs & Project Hero */}
        <section className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa]">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/projects" className="hover:text-white">Projects</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#3b82f6] font-semibold">{project.title}</span>
          </div>

          <div className="space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-[#09090b] border border-[#1f1f23] text-[#3b82f6] text-xs font-mono">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-[#a1a1aa] text-base sm:text-xl max-w-3xl leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Project Metadata Banner */}
          <div className="bg-[#09090b] border border-[#1f1f23] rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono">
            <div>
              <span className="text-[#a1a1aa] block uppercase">Client</span>
              <span className="text-white font-bold text-sm">{project.client}</span>
            </div>
            <div>
              <span className="text-[#a1a1aa] block uppercase">Year</span>
              <span className="text-white font-bold text-sm">{project.year}</span>
            </div>
            <div>
              <span className="text-[#a1a1aa] block uppercase">Duration</span>
              <span className="text-white font-bold text-sm">{project.duration}</span>
            </div>
            <div>
              <span className="text-[#a1a1aa] block uppercase">Live Preview</span>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#3b82f6] hover:underline font-bold text-sm flex items-center gap-1"
              >
                <span>Visit Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Main Cover Showcase */}
          <div className="relative h-[320px] sm:h-[480px] w-full rounded-2xl overflow-hidden border border-[#1f1f23] bg-black">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </section>

        {/* Results Metrics */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#09090b] border border-[#1f1f23] rounded-2xl p-8">
            <h3 className="text-xs font-mono text-[#3b82f6] uppercase tracking-widest mb-6">Key Performance Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {project.results.map((res, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-4xl font-black text-white font-mono">{res.value}</div>
                  <div className="text-xs font-mono text-[#a1a1aa] uppercase">{res.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenge & Solution Breakdown */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-[#09090b] border border-[#1f1f23] rounded-2xl p-8 space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span>The Challenge</span>
            </h3>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="bg-[#09090b] border border-[#1f1f23] rounded-2xl p-8 space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3b82f6]" />
              <span>DevCodeX Engineering Solution</span>
            </h3>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </section>

        {/* Features List */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h3 className="text-2xl font-bold text-white">Engineered Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.features.map((feat, i) => (
              <div key={i} className="bg-[#09090b] border border-[#1f1f23] rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0" />
                <span className="text-xs font-semibold text-white">{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#09090b] border border-[#1f1f23] rounded-2xl p-10 space-y-4">
            <h3 className="text-2xl font-bold text-white">Want a similar high-performance platform for your business?</h3>
            <Link
              href="/contact"
              className="bg-white text-black font-medium text-sm px-8 py-3.5 rounded-full hover:bg-neutral-200 transition-colors inline-flex items-center gap-2"
            >
              <span>Schedule a Technical Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
