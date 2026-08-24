'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState, useMemo, memo, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { AppView } from '@/types';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
// Removed usePopupNavigation and WelcomePopup imports (no popup needed)
import ToolCard from '@/components/tools/ToolCard';

import {
  Search, LayoutGrid, List,
  Receipt, FileText, PenTool, Eraser,
  ImageDown, FileOutput, FileUser, QrCode, Paintbrush, Code, Calculator, FileJson,
  Tag, Link2, MessageSquare, ScanText, Star, Sparkles, Check, X,
} from 'lucide-react';

// ============================================================================
// PREMIUM AI CORE SQUARE COMPONENT - Professional interactive center piece
// ============================================================================
const PremiumOrb = memo(({ onOrbClick, isActive }: { onOrbClick: () => void; isActive: boolean }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hardware accelerated mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.3 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);

  const glowX = useTransform(smoothMouseX, v => v * 40 - 25);
  const glowY = useTransform(smoothMouseY, v => v * 40 - 25);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleClick = () => {
    setIsClicked(true);
    setIsExpanding(true);
    setTimeout(() => {
      setIsClicked(false);
      setIsExpanding(false);
      onOrbClick();
    }, 500);
  };

  // Get color classes for icons
  const getIconColor = (color: string) => {
    const map: Record<string, { bg: string; text: string; border: string; glow: string }> = {
      violet: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30', glow: 'rgba(167, 139, 250, 0.4)' },
      emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'rgba(52, 211, 153, 0.4)' },
      blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'rgba(96, 165, 250, 0.4)' },
      orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30', glow: 'rgba(251, 146, 60, 0.4)' },
      rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30', glow: 'rgba(244, 63, 94, 0.4)' },
      teal: { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500/30', glow: 'rgba(45, 212, 191, 0.4)' },
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'rgba(168, 85, 247, 0.4)' },
      pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30', glow: 'rgba(236, 72, 153, 0.4)' },
    };
    return map[color] || map.violet;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(88, 28, 135, 0.12) 0%, transparent 70%)',
      }}
    >
      {/* Background ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(124, 58, 255, 0.06) 0%, transparent 60%)',
        }}
        animate={{
          scale: isHovering ? 1.3 : 1,
          opacity: isHovering ? 1 : 0.5,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />

      {/* Main interactive square container */}
      <motion.div
        ref={orbRef}
        className="relative cursor-pointer w-[180px] h-[180px]"
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          mouseX.set(0);
          mouseY.set(0);
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ rotateX, rotateY, perspective: 1200 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Grid icons */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ y: [0, -6, 0] }}
          transition={{ y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <GridIcons
            tools={[
              { id: 'invoice-create', icon: Receipt, color: 'violet', label: 'Invoice' },
              { id: 'quotations', icon: FileText, color: 'emerald', label: 'Quotation' },
              { id: 'ai-proposals', icon: PenTool, color: 'blue', label: 'Proposal' },
              { id: 'bg-remover', icon: Eraser, color: 'orange', label: 'BG Remover' },
              { id: 'image-compressor', icon: ImageDown, color: 'rose', label: 'Compressor' },
              { id: 'image-to-pdf', icon: FileOutput, color: 'teal', label: 'To PDF' },
              { id: 'resume-builder', icon: FileUser, color: 'purple', label: 'Resume' },
              { id: 'qr-code-generator', icon: QrCode, color: 'blue', label: 'QR Code' },
              { id: 'css-gradient-generator', icon: Paintbrush, color: 'pink', label: 'Gradient' },
            ]}
            isHovering={isHovering}
            isExpanding={isExpanding}
            getIconColor={getIconColor}
          />
        </motion.div>

        {/* Click animation */}
        <AnimatePresence>
          {isClicked && (
            <>
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="absolute inset-0 pointer-events-none"
                style={{ border: '2px solid rgba(167, 139, 250, 0.6)', borderRadius: '28px' }}
              />
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(167, 139, 250, 0.5) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                  borderRadius: '28px',
                }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Surface particles */}
        <SurfaceSparks isHovering={isHovering} />
      </motion.div>
    </div>
  );
});

PremiumOrb.displayName = 'PremiumOrb';

// ============================================================================
// GRID ICONS - Tool icons arranged in a 3x3 grid behind the glass
// ============================================================================
const GridIcons = memo(({ tools, isHovering, isExpanding, getIconColor }: { tools: any[]; isHovering: boolean; isExpanding: boolean; getIconColor: (color: string) => any }) => {
  const iconSize = 42;
  const gap = 10;
  const totalSize = iconSize * 3 + gap * 2;
  const startX = -totalSize / 2 + iconSize / 2;
  const startY = -totalSize / 2 + iconSize / 2;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        width: totalSize,
        height: totalSize,
        transform: 'translate(-50%, -50%)',
        zIndex: 30,
      }}
    >
      {tools.map((tool, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const x = startX + col * (iconSize + gap);
        const y = startY + row * (iconSize + gap);
        const colors = getIconColor(tool.color);
        const expandX = x * 3.5;
        const expandY = y * 3.5;

        return (
          <motion.div
            key={tool.id}
            className="absolute"
            style={{
              width: iconSize,
              height: iconSize,
              left: '50%',
              top: '50%',
              marginLeft: -iconSize / 2,
              marginTop: -iconSize / 2,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isExpanding ? 0 : 1,
              opacity: isExpanding ? 0 : 1,
              x: isExpanding ? expandX : x,
              y: isExpanding ? expandY : y,
            }}
            transition={{
              scale: {
                type: 'spring',
                stiffness: isExpanding ? 200 : 400,
                damping: isExpanding ? 25 : 20,
                delay: isExpanding ? 0 : index * 0.04,
              },
              opacity: { duration: isExpanding ? 0.2 : 0.4, delay: isExpanding ? 0 : index * 0.04 },
              x: { type: 'spring', stiffness: 180, damping: 22, delay: isExpanding ? 0 : index * 0.02 },
              y: { type: 'spring', stiffness: 180, damping: 22, delay: isExpanding ? 0 : index * 0.02 },
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                filter: 'blur(15px)',
                background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
                borderRadius: '12px',
              }}
              animate={{ opacity: isHovering ? 0.9 : 0.5, scale: isHovering ? 1.5 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            />
            <motion.div
              className={`w-full h-full flex items-center justify-center`}
              style={{ borderRadius: '12px' }}
              animate={{ scale: isHovering ? 1.15 : 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            >
              <tool.icon size={22} className={colors.text} style={{ filter: isHovering ? 'drop-shadow(0 0 15px currentColor)' : 'none', transition: 'filter 0.3s ease' }} />
            </motion.div>
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ y: [0, -5, 0] }}
              transition={{ y: { duration: 2.5 + index * 0.15, repeat: Infinity, ease: 'easeInOut', delay: index * 0.08 } }}
            />
          </motion.div>
        );
      })}
    </div>
  );
});

GridIcons.displayName = 'GridIcons';

// ============================================================================
// SURFACE SPARKS - Tiny shimmering particles on square surface
// ============================================================================
const SurfaceSparks = memo(({ isHovering }: { isHovering: boolean }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sparks = useMemo(() => [
    { id: 0, x: 25, y: 35, size: 2.1, duration: 2.2, delay: 0.2 },
    { id: 1, x: 65, y: 20, size: 1.8, duration: 2.8, delay: 0.5 },
    { id: 2, x: 30, y: 75, size: 1.5, duration: 2.0, delay: 0.8 },
    { id: 3, x: 80, y: 60, size: 2.4, duration: 3.1, delay: 0.1 },
    { id: 4, x: 45, y: 45, size: 1.2, duration: 2.5, delay: 1.2 },
    { id: 5, x: 15, y: 60, size: 2.0, duration: 2.9, delay: 0.4 },
    { id: 6, x: 70, y: 80, size: 1.6, duration: 2.1, delay: 0.9 },
    { id: 7, x: 55, y: 25, size: 2.2, duration: 3.0, delay: 0.6 },
    { id: 8, x: 35, y: 15, size: 1.4, duration: 2.4, delay: 1.0 },
    { id: 9, x: 85, y: 30, size: 1.9, duration: 2.7, delay: 0.3 },
    { id: 10, x: 20, y: 85, size: 2.3, duration: 2.6, delay: 0.7 },
    { id: 11, x: 60, y: 70, size: 1.7, duration: 2.3, delay: 1.1 },
  ], []);

  if (!mounted) return null;
  return (
    <>
      {sparks.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full pointer-events-none"
          style={{ width: s.size, height: s.size, background: 'rgba(255,255,255,0.8)', left: `${s.x}%`, top: `${s.y}%`, filter: 'blur(0.5px)', boxShadow: `0 0 ${s.size * 3}px rgba(167,139,250,0.3)` }}
          animate={{ opacity: isHovering ? [0,1,0] : [0,0.4,0], scale: isHovering ? [0,2.5,0] : [0,1.5,0] }}
          transition={{ opacity: { duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }, scale: { duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay } }}
        />
      ))}
    </>
  );
});

SurfaceSparks.displayName = 'SurfaceSparks';

// ============================================================================
// MAIN DASHBOARD PAGE COMPONENT
// ============================================================================
export default function DashboardPage() {
  const { goTo } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({ name: '', desc: '', category: 'AI Tool' });
  const [submittedRequests, setSubmittedRequests] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user_tool_requests');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCards, setShowCards] = useState(true);

  const tools: { id: AppView; label: string; desc: string; icon: any; color: string }[] = [
    { id: 'invoice-create', label: 'Invoice Generator', desc: 'Create professional invoices in seconds.', icon: Receipt, color: 'violet' },
    { id: 'quotations', label: 'Quotation Maker', desc: 'Generate quotation and estimates easily.', icon: FileText, color: 'emerald' },
    { id: 'ai-proposals', label: 'AI Proposal Writer', desc: 'Create winning proposals using AI.', icon: PenTool, color: 'blue' },
    { id: 'bg-remover', label: 'BG Remover', desc: 'Remove background from images instantly.', icon: Eraser, color: 'orange' },
    { id: 'image-compressor', label: 'Image Compressor', desc: 'Compress images without losing quality.', icon: ImageDown, color: 'rose' },
    { id: 'image-to-pdf', label: 'Image to PDF', desc: 'Convert multiple images to PDF file.', icon: FileOutput, color: 'teal' },
    { id: 'resume-builder', label: 'Resume Builder', desc: 'Create professional resumes that stand out.', icon: FileUser, color: 'purple' },
    { id: 'qr-code-generator', label: 'QR Code Generator', desc: 'Generate custom QR codes for anything.', icon: QrCode, color: 'blue' },
    { id: 'css-gradient-generator', label: 'CSS Gradient', desc: 'Generate beautiful CSS gradients.', icon: Paintbrush, color: 'pink' },
    { id: 'business-letter', label: 'Letter Generator', desc: 'Draft executive letters with AI.', icon: FileText, color: 'amber' },
    { id: 'estimate-calculator', label: 'Estimate Calc', desc: 'Detailed project pricing.', icon: Calculator, color: 'orange' },
    { id: 'json-to-csv', label: 'JSON to CSV', desc: 'Quick data conversion tool.', icon: FileJson, color: 'emerald' },
    { id: 'meta-tag-generator', label: 'Meta Tags Gen', desc: 'SEO meta tag builder.', icon: Tag, color: 'indigo' },
    { id: 'slug-generator', label: 'Slug Generator', desc: 'SEO-friendly URL generator.', icon: Link2, color: 'cyan' },
    { id: 'ai-social-caption', label: 'Social Captions', desc: 'Social multi-platform texts.', icon: MessageSquare, color: 'rose' },
    { id: 'image-ocr', label: 'Image OCR', desc: 'Extract text from any photo.', icon: ScanText, color: 'orange' },
  ];

  const filteredTools = tools.filter(t =>
    t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getColorClasses = (color: string) => {
    const map: Record<string, { bg: string; text: string; border: string; lightBg: string; hoverBorder: string }> = {
      violet: { bg: 'bg-violet-500', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-200 dark:border-violet-500/30', lightBg: 'bg-violet-50 dark:bg-violet-500/10', hoverBorder: 'hover:border-violet-400 dark:hover:border-violet-500' },
      emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-500/30', lightBg: 'bg-emerald-50 dark:bg-emerald-500/10', hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-500' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-500/30', lightBg: 'bg-blue-50 dark:bg-blue-500/10', hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-500' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-500/30', lightBg: 'bg-orange-50 dark:bg-orange-500/10', hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-500' },
      rose: { bg: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-200 dark:border-rose-500/30', lightBg: 'bg-rose-50 dark:bg-rose-500/10', hoverBorder: 'hover:border-rose-400 dark:hover:border-rose-500' },
      teal: { bg: 'bg-teal-500', text: 'text-teal-600 dark:text-teal-400', border: 'border-teal-200 dark:border-teal-500/30', lightBg: 'bg-teal-50 dark:bg-teal-500/10', hoverBorder: 'hover:border-teal-400 dark:hover:border-teal-500' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-500/30', lightBg: 'bg-purple-50 dark:bg-purple-500/10', hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-500' },
      pink: { bg: 'bg-pink-500', text: 'text-pink-600 dark:text-pink-400', border: 'border-pink-200 dark:border-pink-500/30', lightBg: 'bg-pink-50 dark:bg-pink-500/10', hoverBorder: 'hover:border-pink-400 dark:hover:border-pink-500' },
      amber: { bg: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-500/30', lightBg: 'bg-amber-50 dark:bg-amber-500/10', hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-500' },
      cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-500/30', lightBg: 'bg-cyan-50 dark:bg-cyan-500/10', hoverBorder: 'hover:border-cyan-400 dark:hover:border-cyan-500' },
      indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-500/30', lightBg: 'bg-indigo-50 dark:bg-indigo-500/10', hoverBorder: 'hover:border-indigo-400 dark:hover:border-indigo-500' },
    };
    return map[color] || map.violet;
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestForm.name.trim() || !requestForm.desc.trim()) return;
    const newRequest = { id: Math.random().toString(36).substr(2, 9), name: requestForm.name, desc: requestForm.desc, category: requestForm.category, date: new Date().toLocaleDateString(), status: 'Reviewing' };
    const updated = [newRequest, ...submittedRequests];
    setSubmittedRequests(updated);
    localStorage.setItem('user_tool_requests', JSON.stringify(updated));
    setRequestForm({ name: '', desc: '', category: 'AI Tool' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!showCards) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="orb-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PremiumOrb onOrbClick={() => setShowCards(true)} isActive={!showCards} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        key="cards-view"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-8 max-w-7xl mx-auto w-full pb-12"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">All Tools</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Powerful tools to help you build, create and grow your business.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64 transition-all"
              />
            </div>
            <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-sm">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                <LayoutGrid size={18} />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                <List size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-50/80 via-purple-50/50 to-pink-50/80 dark:from-violet-950/30 dark:via-purple-900/10 dark:to-pink-950/30 border border-violet-100/50 dark:border-violet-500/10 p-8 md:p-12"
        >
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
              Everything you need, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">all in one place.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
              Explore our collection of powerful tools designed to make your work easier and faster.
            </p>
          </div>
          <div className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 items-center justify-center pointer-events-none">
            <div className="relative w-64 h-64">
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-28 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center transform -rotate-2">
                <span className="text-white/90 font-black text-4xl tracking-widest">DCX</span>
              </div>
              <div className="absolute top-8 left-0 p-4 bg-emerald-400 text-white rounded-xl transform -rotate-12 shadow-lg animate-pulse" style={{ animationDuration: '3s' }}>
                <ImageDown size={28} />
              </div>
              <div className="absolute top-0 right-10 p-4 bg-amber-400 text-white rounded-xl transform rotate-12 shadow-lg animate-pulse" style={{ animationDuration: '4s' }}>
                <FileText size={28} />
              </div>
              <div className="absolute top-20 right-0 p-4 bg-pink-500 text-white rounded-xl transform rotate-6 shadow-lg animate-pulse" style={{ animationDuration: '3.5s' }}>
                <Code size={28} />
              </div>
              <Sparkles className="absolute top-10 left-20 text-indigo-300" size={20} />
              <Sparkles className="absolute top-24 -right-4 text-pink-300" size={16} />
              <Sparkles className="absolute bottom-12 -left-8 text-violet-300" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"}
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool, index) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                index={index}
                viewMode={viewMode}
                onClick={(e) => {
                  e?.preventDefault?.();
                  // Delay navigation to let click animation fully complete
                  setTimeout(() => goTo(tool.id), 1300);
                }}

                getColorClasses={getColorClasses}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTools.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <Search className="text-slate-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No tools found</h3>
            <p className="text-slate-500">We couldn't find any tools matching "{searchQuery}"</p>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }} className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-[1.5rem] p-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center shrink-0">
              <Star className="text-amber-500 fill-amber-500" size={24} />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-lg">More tools coming soon!</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">We're constantly building new tools to help you do more. Stay tuned!</p>
            </div>
          </div>
          <button onClick={() => setIsRequestModalOpen(true)} className="px-6 py-3 rounded-xl border border-amber-300 hover:border-amber-400 dark:border-amber-500/30 dark:hover:border-amber-500/50 text-amber-700 dark:text-amber-400 font-bold text-sm whitespace-nowrap transition-colors bg-white dark:bg-slate-900 hover:shadow-md">
            Request a Tool
          </button>
        </motion.div>

        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }} onClick={() => setShowCards(false)} className="mx-auto px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:shadow-md">
          ← Back to Explore
        </motion.button>
      </motion.div>

      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsRequestModalOpen(false)} className="absolute right-5 top-5 p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 transition-colors"><X size={18} /></button>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><Star className="text-amber-500 fill-amber-500" size={20} /> Request a Custom Tool</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Tell us what tool you need, and we will build it for you!</p>
            </div>
            {showSuccess ? (
              <div className="py-8 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 animate-bounce"><Check size={32} /></div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Request Received!</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Our engineering team has received your request and is reviewing it.</p>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tool Name *</label>
                  <input type="text" required placeholder="e.g. SVG to PNG Converter" value={requestForm.name} onChange={e => setRequestForm({ ...requestForm, name: e.target.value })} className="w-full input-field" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Category</label>
                  <select value={requestForm.category} onChange={e => setRequestForm({ ...requestForm, category: e.target.value })} className="w-full input-field">
                    <option value="AI Tool">AI Tool</option>
                    <option value="SEO">SEO Tool</option>
                    <option value="Image & Design">Image & Design</option>
                    <option value="Data & Dev">Data & Dev</option>
                    <option value="Business & Finance">Business & Finance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description *</label>
                  <textarea required rows={3} placeholder="Describe what the tool should do and how it will help you..." value={requestForm.desc} onChange={e => setRequestForm({ ...requestForm, desc: e.target.value })} className="w-full input-field resize-none" />
                </div>
                <button type="submit" className="w-full btn-primary py-3 font-semibold text-sm">Submit Request</button>
              </form>
            )}
            {submittedRequests.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Your Requests ({submittedRequests.length})</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                  {submittedRequests.map(req => (
                    <div key={req.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{req.name}</p>
                        <p className="text-slate-400 mt-0.5">{req.category} · {req.date}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold rounded-full">{req.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
