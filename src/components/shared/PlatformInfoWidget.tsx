import React from 'react';
import { Sparkles, ArrowRight, Code, Zap, Shield, Heart } from 'lucide-react';

export default function PlatformInfoWidget() {
  return (
    <div className="card p-6 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white relative overflow-hidden shadow-xl shadow-indigo-500/20">
      {/* Decorative background elements */}
      <div className="absolute -top-10 -right-10 text-white/10 rotate-12">
        <Sparkles size={180} />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md shadow-inner border border-white/20">
                <Heart size={22} className="text-white fill-white/20" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">About DevCodex</h3>
            </div>
            <p className="text-indigo-100 text-sm leading-relaxed max-w-2xl">
              Welcome to the Ultimate AI Business Suite. We empower modern entrepreneurs, creators, and agencies with 
              cutting-edge AI tools to generate content, manage expenses, and scale operations effortlessly. 
              Our mission is to automate the mundane so you can focus on building what matters.
            </p>
          </div>
          
          <button className="flex items-center gap-2 text-sm font-semibold bg-white text-indigo-600 hover:bg-indigo-50 px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg whitespace-nowrap self-start md:self-auto">
            Learn More <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code size={20} className="text-indigo-100" />
            </div>
            <h4 className="font-semibold text-base mb-1.5">Lightweight & Fast</h4>
            <p className="text-xs text-indigo-200/90 leading-relaxed">Built for ultimate performance. Reusable, dynamic components ensure a seamless and blazing-fast user experience.</p>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap size={20} className="text-indigo-100" />
            </div>
            <h4 className="font-semibold text-base mb-1.5">AI-Powered Suite</h4>
            <p className="text-xs text-indigo-200/90 leading-relaxed">Leveraging state-of-the-art models for intelligent automation, from smart generation to precise text extraction.</p>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield size={20} className="text-indigo-100" />
            </div>
            <h4 className="font-semibold text-base mb-1.5">Secure & Reliable</h4>
            <p className="text-xs text-indigo-200/90 leading-relaxed">Your workflow and data stay private. We focus on building enterprise-grade tools that you can depend on daily.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
