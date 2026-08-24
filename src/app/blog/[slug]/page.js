'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageTransition from '@/components/PageTransition';
import { blogArticles } from '@/data/blogData';
import { ChevronRight, Clock, ArrowRight, Calendar } from 'lucide-react';

export default function BlogArticlePage({ params }) {
  const resolvedParams = use(params);
  const article = blogArticles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="space-y-12 pb-24 font-sans max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-black text-white">
        
        {/* Breadcrumb */}
        <div className="pt-8 flex items-center gap-2 text-xs font-mono text-[#a1a1aa]">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#3b82f6] font-semibold">{article.title}</span>
        </div>

        {/* Article Header */}
        <div className="space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-[#09090b] border border-[#1f1f23] text-[#3b82f6] text-xs font-mono">
            {article.category}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1f1f23] text-xs text-[#a1a1aa] font-mono">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#1f1f23]">
                <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
              </div>
              <div>
                <span className="text-white font-bold block">{article.author.name}</span>
                <span className="text-[#a1a1aa]">{article.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-[300px] sm:h-[420px] w-full rounded-2xl overflow-hidden border border-[#1f1f23] bg-black">
          <Image src={article.coverImage} alt={article.title} fill className="object-cover" priority />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none text-[#a1a1aa] space-y-6 text-base leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
        </div>

        {/* Share & Author Bio */}
        <div className="pt-8 border-t border-[#1f1f23] bg-[#09090b] p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#1f1f23] shrink-0">
              <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">Written by {article.author.name}</h5>
              <p className="text-xs text-[#a1a1aa]">{article.author.role} at DevCodeX Agency.</p>
            </div>
          </div>

          <Link
            href="/contact"
            className="bg-white text-black font-medium text-xs px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-colors inline-flex items-center gap-2"
          >
            <span>Discuss This Topic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </PageTransition>
  );
}
