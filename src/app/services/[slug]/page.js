'use client';

import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import { services } from '@/data/servicesData';
import { 
  ArrowRight, CheckCircle2, Code2, Layout, Sparkles, Zap, Cpu, Layers, 
  Server, Box, Database, Globe, ShoppingBag, Bot, Brain, Palette, Cloud, TrendingUp, ChevronRight 
} from 'lucide-react';

const iconMap = { 
  Code2, Layout, Sparkles, Zap, Cpu, Layers, 
  Server, Box, Database, Globe, ShoppingBag, Bot, Brain, Palette, Cloud, TrendingUp 
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return notFound();
  }

  const IconComponent = iconMap[service.icon] || Code2;

  return (
    <PageTransition>
      <div className="space-y-24 pb-24 font-sans bg-black text-white">
        
        {/* Breadcrumb & Hero */}
        <section className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa]">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#3b82f6] font-semibold">{service.title}</span>
          </div>

          <div className="bg-[#09090b] border border-[#1f1f23] rounded-2xl p-8 sm:p-14 space-y-6 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-black border border-[#1f1f23] text-[#3b82f6]">
                <IconComponent className="w-7 h-7" />
              </div>
              <span className="px-3.5 py-1 rounded-full bg-black border border-[#1f1f23] text-[#3b82f6] text-xs font-mono">
                {service.badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
              {service.title}
            </h1>

            <p className="text-[#a1a1aa] text-base sm:text-xl max-w-3xl leading-relaxed">
              {service.description}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-white text-black font-medium text-sm px-7 py-3.5 rounded-full hover:bg-neutral-200 transition-colors inline-flex items-center gap-2"
              >
                <span>Request {service.title} Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Detailed Features & Capabilities */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Key Technical Features</h3>
            <div className="space-y-3">
              {service.features.map((feat, i) => (
                <div key={i} className="bg-[#09090b] border border-[#1f1f23] rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] shrink-0" />
                  <span className="text-sm font-medium text-white">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Capabilities & Scope</h3>
            <div className="bg-[#09090b] border border-[#1f1f23] rounded-xl p-8 space-y-4">
              <ul className="space-y-3">
                {service.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-center justify-between text-sm text-[#a1a1aa] border-b border-[#1f1f23] pb-2">
                    <span>{cap}</span>
                    <span className="text-xs font-mono text-[#3b82f6]">Included</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            badge="Process Workflow"
            title={`Our ${service.title} Process`}
            subtitle="How we take your project from discovery to production launch."
            center={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, i) => (
              <div key={i} className="bg-[#09090b] border border-[#1f1f23] rounded-2xl p-6 space-y-3">
                <span className="text-2xl font-mono font-black text-[#3b82f6]">{step.step}</span>
                <h4 className="text-lg font-bold text-white">{step.title}</h4>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
