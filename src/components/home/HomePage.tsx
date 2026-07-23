'use client';
import { useAuth } from '@/lib/AuthContext';
import { useEffect, useState, useRef } from 'react';
import {
  ArrowRight, Zap, LayoutDashboard, FileText, Sparkles,
  CheckCircle2, BarChart2,
  Globe, Cpu, Star, TrendingUp, Lock, Clock, Eraser, ImageDown, FileOutput,
  FileUser, QrCode, Paintbrush, Calculator, FileJson, Tag, Link2,
  MessageSquare, ScanText, User
} from 'lucide-react';

// ─── Typing Animation Hook ────────────────────────────────────────────────────
function useTypingEffect(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx(c => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

// ─── Counter Animation ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          setCount(Math.floor(current));
          if (current >= target) clearInterval(timer);
        }, 16);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── Fade-in-on-scroll hook ───────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Section wrapper with fade-in ────────────────────────────────────────────
function FadeSection({ children, className = '', delay = 0, ...props }: { children: React.ReactNode; className?: string; delay?: number } & React.HTMLAttributes<HTMLDivElement>) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Main Data ────────────────────────────────────────────────────────────────
const TYPING_WORDS = ['DevCodeX', 'Smart Invoices', 'AI Proposals', 'BG Remover', 'Image Compressor', 'Image to PDF', 'Client Contracts', 'Business Growth'];

const FEATURES = [
  { id: 'ai-proposals', icon: Sparkles, color: 'indigo', title: 'AI Proposal Generator', desc: 'Craft winning proposals in seconds. Powered by Google Gemini AI — fully personalized to every client.' },
  { id: 'invoices', icon: FileText, color: 'purple', title: 'Invoice Builder', desc: 'Create, send, and track professional invoices with PDF export, tax management, and instant downloads.' },
  { id: 'contracts', icon: CheckCircle2, color: 'emerald', title: 'Contract Generator', desc: 'Generate legally-sound contracts tailored to each project. Edit, sign, and archive in one place.' },
  { id: 'analytics', icon: BarChart2, color: 'amber', title: 'Business Analytics', desc: 'Visual dashboards showing revenue trends, project profitability, and client performance metrics.' },
  { id: 'projects', icon: TrendingUp, color: 'violet', title: 'Project Tracking', desc: 'Manage projects with milestones, deadlines, and status boards — never miss a delivery.' },
  { id: 'bg-remover', icon: Eraser, color: 'rose', title: 'BG Remover', desc: 'Remove image backgrounds instantly in-browser — no API key, no upload, 100% private and free.' },
  { id: 'image-compressor', icon: ImageDown, color: 'cyan', title: 'Image Compressor', desc: 'Compress images up to 90% smaller with quality control. Export as JPEG, WebP, or PNG instantly.' },
  { id: 'image-to-pdf', icon: FileOutput, color: 'violet', title: 'Image to PDF', desc: 'Convert multiple images into a single professional PDF with custom page sizes, margins, and fit modes — all in-browser.' },
  { id: 'resume-builder', icon: FileUser, color: 'blue', title: 'Resume Builder', desc: 'Build ATS-friendly, professional resumes fast in-browser. Standard design layouts with real-time PDF compiling.' },
  { id: 'qr-code-generator', icon: QrCode, color: 'emerald', title: 'QR Code Generator', desc: 'Generate high-resolution QR codes templates for URLs, Wi-Fi keys, text, or payment references instantly.' },
  { id: 'css-gradient-generator', icon: Paintbrush, color: 'rose', title: 'CSS Gradient Generator', desc: 'Design stunning CSS linear and radial gradients with direct clipboard copies of cross-browser styling properties.' },
  { id: 'business-letter', icon: FileText, color: 'amber', title: 'Business Letter Generator', desc: 'Draft executive-level letters, query responses, apologies, and business proposals powered by Gemini AI.' },
];

const STATS = [
  { value: 5000, suffix: '+', label: 'Active Users' },
  { value: 50000, suffix: '+', label: 'Proposals Generated' },
  { value: 120, suffix: 'K+', label: 'Invoices Created' },
  { value: 99, suffix: '%', label: 'Satisfaction Rate' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Enter Client Details', desc: 'Fill in client name, project type, budget, and your specific requirements in seconds.' },
  { step: '02', title: 'AI Generates Content', desc: 'Google Gemini AI crafts a professional, personalized proposal with executive summary, scope, timeline, and pricing.' },
  { step: '03', title: 'Review & Customize', desc: 'Fine-tune the proposal with one-click tone changes, length adjustments, and section edits.' },
  { step: '04', title: 'Export & Win Clients', desc: 'Copy, download as PDF/TXT, or share directly. Watch your conversion rate skyrocket.' },
];

const TESTIMONIALS = [
  { name: 'Ahmad Raza', role: 'Freelance Developer', text: 'DevCodeX completely changed how I win clients. The AI proposals are so good, clients think I spent hours writing them!', rating: 5 },
  { name: 'Sara Malik', role: 'Agency Owner', text: 'We switched from 5 different tools to just DevCodeX. The invoice + proposal + contract combo is unbeatable.', rating: 5 },
  { name: 'Usman Khan', role: 'UI/UX Designer', text: 'The fastest proposal tool I have ever used. The AI understands context perfectly and writes like a senior consultant.', rating: 5 },
];

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white',
  purple: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white',
  blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white',
  emerald: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white',
  rose: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-500 group-hover:text-white',
  amber: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white',
  cyan: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white',
  violet: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:bg-violet-500 group-hover:text-white',
};

export default function HomePage() {
  const { goTo } = useAuth();
  const typedWord = useTypingEffect(TYPING_WORDS, 150); // slower speed
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      {/* Intentionally removed to inherit global DevCodeX navbar */}

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 relative overflow-hidden">
        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto space-y-8" style={{ animation: 'fadeUp 0.8s ease-out both' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-medium text-sm">
            <Sparkles size={14} className="animate-spin" style={{ animationDuration: '3s' }} />
            The Ultimate AI Business Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Elevate Your Business<br />
            <span className="relative">
              with{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                {typedWord}
              </span>
              <span className="inline-block w-1 h-14 md:h-20 bg-indigo-500 ml-1 align-middle animate-pulse rounded-sm" />
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Manage your entire business workflow from one unified platform. AI-powered proposals, smart invoicing, client management, contracts, and analytics — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => goTo('dashboard')}
              className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-1"
            >
              <LayoutDashboard size={22} />
              Launch Workspace
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => goTo('ai-proposals')}
              className="group px-8 py-4 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-200 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:-translate-y-1"
            >
              <Sparkles size={22} className="text-indigo-500" />
              Try AI Proposals Free
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-slate-500 dark:text-slate-400">
            {[['✅', 'No credit card required'], ['🔒', 'Fully secure'], ['⚡', 'Instant setup'], ['🌍', 'Works globally']].map(([icon, label]) => (
              <span key={label} className="flex items-center gap-1.5">{icon} {label}</span>
            ))}
          </div>
        </div>
      </main>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
        <FadeSection className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map(stat => (
            <div key={stat.label} className="space-y-2">
              <div className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </FadeSection>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <FadeSection className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium text-sm border border-purple-200 dark:border-purple-500/20">
              <Cpu size={14} /> Packed with Powerful Tools
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">Everything Your Business Needs</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">One platform replaces 10+ different tools. Stop juggling subscriptions and start building your business.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <FadeSection key={feat.title} delay={i * 80} className="relative group bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-6 space-y-4 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] dark:hover:shadow-[0_8px_30px_rgb(99,102,241,0.2)] hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden z-10" onClick={() => goTo(feat.id as Parameters<typeof goTo>[0])}>
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 ${colorMap[feat.color]} shadow-sm group-hover:shadow-md`}>
                    <Icon size={22} className="transition-transform duration-500" />
                  </div>
                  
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {feat.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300">
                    {feat.desc}
                  </p>
                  
                  {/* Animated border bottom */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-0 group-hover:w-full transition-all duration-500 ease-out rounded-b-2xl" />
                </FadeSection>
              );
            })}
          </div>
        </FadeSection>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-900/50">
        <FadeSection className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium text-sm border border-indigo-200 dark:border-indigo-500/20">
              <Zap size={14} /> Incredibly Simple
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">How DevCodeX Works</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto">From idea to winning proposal in under 60 seconds. Seriously.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {HOW_IT_WORKS.map((step, i) => (
              <FadeSection key={step.step} delay={i * 120} className="relative text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-black mx-auto shadow-lg shadow-indigo-500/30">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-indigo-400 to-transparent z-10" style={{ width: '60%', left: '70%' }} />
                )}
              </FadeSection>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── AI TOOLS DIRECTORY ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800">
        <FadeSection className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium text-sm border border-indigo-200 dark:border-indigo-500/20">
              <Zap size={14} /> 15+ Advanced AI Tools
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">Ultimate Builder Suite</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Everything you need to launch, scale, and manage a business instantly.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { id: 'bg-remover',        label: 'BG Remover',        desc: 'Remove image backgrounds',        icon: Eraser,    gradient: 'from-violet-500 to-purple-600',  shadow: 'shadow-violet-500/25' },
              { id: 'image-compressor',  label: 'Image Compressor',  desc: 'Lossless bulk compression',       icon: ImageDown, gradient: 'from-blue-500 to-cyan-500',      shadow: 'shadow-blue-500/25' },
              { id: 'image-to-pdf',      label: 'Doc Converter',     desc: 'Images to Word/PDF instantly',    icon: FileOutput,gradient: 'from-rose-500 to-pink-600',      shadow: 'shadow-rose-500/25' },
              { id: 'resume-builder',    label: 'Resume Builder',    desc: 'ATS-friendly templates',          icon: FileUser,  gradient: 'from-indigo-500 to-blue-600',   shadow: 'shadow-indigo-500/25' },
              { id: 'qr-code-generator', label: 'QR Generator',      desc: 'High-res branded QR codes',       icon: QrCode,    gradient: 'from-emerald-500 to-teal-600',  shadow: 'shadow-emerald-500/25' },
              { id: 'css-gradient-generator', label: 'CSS Gradient', desc: 'Stunning web backgrounds',        icon: Paintbrush,gradient: 'from-pink-500 to-orange-400',   shadow: 'shadow-pink-500/25' },
              { id: 'business-letter',   label: 'Letter Generator',  desc: 'Draft executive letters with AI', icon: FileText,  gradient: 'from-amber-500 to-orange-600',  shadow: 'shadow-amber-500/25' },
              { id: 'estimate-calculator',label: 'Estimate Calc',    desc: 'Detailed project pricing',        icon: Calculator,gradient: 'from-amber-400 to-orange-500',  shadow: 'shadow-amber-500/25' },
              { id: 'json-to-csv',       label: 'JSON to CSV',       desc: 'Quick data conversion tool',      icon: FileJson,  gradient: 'from-teal-500 to-emerald-600',  shadow: 'shadow-teal-500/25' },
              { id: 'meta-tag-generator',label: 'Meta Tags Gen',     desc: 'SEO meta tag builder',            icon: Tag,       gradient: 'from-indigo-500 to-purple-500', shadow: 'shadow-indigo-500/25' },
              { id: 'slug-generator',    label: 'Slug Generator',    desc: 'SEO-friendly URL generator',      icon: Link2,     gradient: 'from-cyan-500 to-blue-600',     shadow: 'shadow-cyan-500/25' },
              { id: 'ai-social-caption', label: 'Social Captions',   desc: 'Social multi-platform texts',     icon: MessageSquare, gradient: 'from-pink-500 to-rose-600', shadow: 'shadow-pink-500/25' },
              { id: 'image-ocr',         label: 'Image OCR',         desc: 'Extract text from any photo',     icon: ScanText,  gradient: 'from-rose-500 to-orange-500',   shadow: 'shadow-rose-500/25' },
            ].map(tool => (
              <button
                key={tool.id}
                onClick={() => goTo(tool.id as Parameters<typeof goTo>[0])}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-left flex flex-col gap-4 group hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg ${tool.shadow} group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-white leading-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{tool.label}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{tool.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── AI DEMO SECTION ────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <FadeSection className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium text-sm border border-emerald-200 dark:border-emerald-500/20">
              <Sparkles size={14} /> AI-Powered Writing
            </div>
            <h2 className="text-4xl font-extrabold leading-tight">Your Proposals.<br /><span className="text-indigo-600">Written by AI.</span><br />Won by You.</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Stop staring at blank pages. Tell DevCodeX what you need, and watch as Google Gemini AI crafts a perfectly structured, client-specific proposal in real time — with executive summary, scope, timeline, budget, and closing.</p>
            <ul className="space-y-3">
              {['Personalized to every client', 'Multiple tone options (Professional, Friendly, Technical)', '7 export formats including PDF', 'Local history saved automatically', 'Works for Upwork, Fiverr, LinkedIn, and cold emails'].map(pt => (
                <li key={pt} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-sm">{pt}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => goTo('ai-proposals')} className="group px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 w-fit">
              Generate Your First Proposal Free
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Live AI typing mockup */}
          <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-400 text-xs ml-2">AI Proposal Generator</span>
            </div>
            <AIDemoTyping />
          </div>
        </FadeSection>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/30">
        <FadeSection className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium text-sm border border-amber-200 dark:border-amber-500/20">
              <Star size={14} /> Loved by Freelancers
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold">What Our Users Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <FadeSection key={t.name} delay={i * 100} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── SECURITY & TRUST ───────────────────────────────────────────────── */}
      <FadeSection className="py-16 px-6 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-3xl p-10 border border-indigo-100 dark:border-indigo-900/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Lock, title: 'API Key Never Exposed', desc: 'Your Google Gemini API key stays server-side. Never visible to the browser.' },
              { icon: Globe, title: 'Works Anywhere', desc: 'Vercel-ready deployment. Works from any country, any device, instantly.' },
              { icon: Clock, title: 'Real-time Generation', desc: 'Proposals generate in under 10 seconds using the fastest Gemini Flash model.' },
            ].map(item => (
              <div key={item.title} className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
                  <item.icon size={22} />
                </div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center">
        <FadeSection className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">10x Your Business?</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">Join thousands of freelancers and agencies already using DevCodeX to win more clients, faster.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => goTo('dashboard')}
              className="group px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-3 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-1"
            >
              <LayoutDashboard size={24} />
              Start Free — No Credit Card
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </FadeSection>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <img src="/logo1.png" alt="DevCodeX" className="h-7 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <span className="font-semibold text-slate-700 dark:text-slate-300">DevCodeX</span>
          </div>
          <p>© {new Date().getFullYear()} DevCodeX. All rights reserved. Built with ❤️ using Next.js & Google Gemini AI.</p>
          <div className="flex gap-4">
            {['Dashboard', 'AI Proposals', 'Invoices'].map(link => (
              <button key={link} onClick={() => goTo(link === 'Dashboard' ? 'dashboard' : link === 'AI Proposals' ? 'ai-proposals' : 'invoices')} className="hover:text-indigo-500 transition-colors duration-200">
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── AI Typing Demo Component ─────────────────────────────────────────────────
const AI_DEMO_TEXT = `✦ Executive Summary

We are thrilled to present this proposal for your E-commerce platform redesign. Our team will deliver a world-class shopping experience that converts visitors into loyal customers.

✦ Scope of Work

• Full-stack Next.js 15 development
• Modern UI/UX with Tailwind CSS
• Stripe payment gateway integration
• Admin dashboard with analytics
• Mobile-first responsive design

✦ Timeline

Week 1-2: Design & prototyping
Week 3-6: Core development
Week 7-8: Testing & launch

✦ Investment

Total: $8,500
Milestone-based payment plan available.

✦ Why Choose Us

5+ years of e-commerce experience with a 98% client satisfaction rate. Let us turn your vision into a revenue-generating machine.`;

function AIDemoTyping() {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setRunning(true);
    }, { threshold: 0.3 });
    const el = document.getElementById('ai-demo-box');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    if (idx >= AI_DEMO_TEXT.length) return;
    const timeout = setTimeout(() => {
      setDisplayed(AI_DEMO_TEXT.slice(0, idx + 1));
      setIdx(i => i + 1);
    }, 18);
    return () => clearTimeout(timeout);
  }, [idx, running]);

  return (
    <div id="ai-demo-box" className="font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap min-h-[240px] max-h-72 overflow-y-auto custom-scrollbar">
      {displayed}
      {idx < AI_DEMO_TEXT.length && <span className="inline-block w-1.5 h-4 bg-indigo-400 ml-0.5 align-middle animate-pulse" />}
    </div>
  );
}
