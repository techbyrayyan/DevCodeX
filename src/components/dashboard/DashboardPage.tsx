'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { 
  Search, LayoutGrid, List, Receipt, FileText, PenTool, Eraser, ImageDown, 
  FileOutput, FileUser, QrCode, Paintbrush, Code, Calculator, FileJson, 
  Tag, Link2, MessageSquare, ScanText, User, ArrowRight, Star, Sparkles,
  Check, X
} from 'lucide-react';

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

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestForm.name.trim() || !requestForm.desc.trim()) return;

    const newRequest = {
      id: Math.random().toString(36).substr(2, 9),
      name: requestForm.name,
      desc: requestForm.desc,
      category: requestForm.category,
      date: new Date().toLocaleDateString(),
      status: 'Reviewing'
    };

    const updated = [newRequest, ...submittedRequests];
    setSubmittedRequests(updated);
    localStorage.setItem('user_tool_requests', JSON.stringify(updated));
    setRequestForm({ name: '', desc: '', category: 'AI Tool' });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const tools = [
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

  const filteredTools = tools.filter(t => t.label.toLowerCase().includes(searchQuery.toLowerCase()) || t.desc.toLowerCase().includes(searchQuery.toLowerCase()));

  // Color mapping helper
  const getColorClasses = (color: string) => {
    const map: Record<string, { bg: string, text: string, border: string, lightBg: string, hoverBorder: string }> = {
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

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full pb-12">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-50/80 via-purple-50/50 to-pink-50/80 dark:from-violet-950/30 dark:via-purple-900/10 dark:to-pink-950/30 border border-violet-100/50 dark:border-violet-500/10 p-8 md:p-12">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
              Everything you need, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">all in one place.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
              Explore our collection of powerful tools designed to make your work easier and faster.
            </p>
          </div>

          {/* Decorative Illustration (CSS-based composition) */}
          <div className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 items-center justify-center pointer-events-none">
            <div className="relative w-64 h-64">
              {/* Box/Container Base */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-28 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center transform -rotate-2">
                <span className="text-white/90 font-black text-4xl tracking-widest">DCX</span>
              </div>
              {/* Floating elements */}
              <div className="absolute top-8 left-0 p-4 bg-emerald-400 text-white rounded-xl transform -rotate-12 shadow-lg animate-pulse" style={{ animationDuration: '3s' }}>
                <ImageDown size={28} />
              </div>
              <div className="absolute top-0 right-10 p-4 bg-amber-400 text-white rounded-xl transform rotate-12 shadow-lg animate-pulse" style={{ animationDuration: '4s' }}>
                <FileText size={28} />
              </div>
              <div className="absolute top-20 right-0 p-4 bg-pink-500 text-white rounded-xl transform rotate-6 shadow-lg animate-pulse" style={{ animationDuration: '3.5s' }}>
                <Code size={28} />
              </div>
              {/* Sparkles */}
              <Sparkles className="absolute top-10 left-20 text-indigo-300" size={20} />
              <Sparkles className="absolute top-24 -right-4 text-pink-300" size={16} />
              <Sparkles className="absolute bottom-12 -left-8 text-violet-300" size={24} />
            </div>
          </div>
        </div>

        {/* Tools Grid / List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
          : "flex flex-col gap-4"
        }>
          {filteredTools.map(tool => {
            const colors = getColorClasses(tool.color);
            return (
              <button
                key={tool.id}
                onClick={() => goTo(tool.id as any)}
                className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] p-6 text-left flex ${viewMode === 'grid' ? 'flex-col gap-4' : 'flex-row items-center gap-6'} transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 group ${colors.hoverBorder}`}
              >
                <div className={`shrink-0 ${viewMode === 'grid' ? 'w-12 h-12 rounded-2xl' : 'w-14 h-14 rounded-2xl'} ${colors.lightBg} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                  <tool.icon size={22} className={colors.text} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{tool.label}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">{tool.desc}</p>
                </div>

                <div className={`${viewMode === 'grid' ? 'mt-2 w-full' : 'shrink-0'} py-2.5 px-6 rounded-xl border ${colors.border} flex items-center justify-center gap-2 ${colors.text} font-semibold text-sm transition-colors group-hover:${colors.lightBg}`}>
                  Use Tool <ArrowRight size={16} />
                </div>
              </button>
            )
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <Search className="text-slate-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No tools found</h3>
            <p className="text-slate-500">We couldn't find any tools matching "{searchQuery}"</p>
          </div>
        )}

        {/* Coming Soon Banner */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-[1.5rem] p-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center shrink-0">
              <Star className="text-amber-500 fill-amber-500" size={24} />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-lg">More tools coming soon!</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">We're constantly building new tools to help you do more. Stay tuned!</p>
            </div>
          </div>
          <button 
            onClick={() => setIsRequestModalOpen(true)}
            className="px-6 py-3 rounded-xl border border-amber-300 hover:border-amber-400 dark:border-amber-500/30 dark:hover:border-amber-500/50 text-amber-700 dark:text-amber-400 font-bold text-sm whitespace-nowrap transition-colors bg-white dark:bg-slate-900 hover:shadow-md"
          >
            Request a Tool
          </button>
        </div>

        {/* Request a Tool Modal */}
        {isRequestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-200">
              <button 
                onClick={() => setIsRequestModalOpen(false)}
                className="absolute right-5 top-5 p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Star className="text-amber-500 fill-amber-500" size={20} /> Request a Custom Tool
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Tell us what tool you need, and we will build it for you!</p>
              </div>

              {showSuccess ? (
                <div className="py-8 text-center flex flex-col items-center justify-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 animate-bounce">
                    <Check size={32} />
                  </div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white">Request Received!</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Our engineering team has received your request and is reviewing it.</p>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tool Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. SVG to PNG Converter"
                      value={requestForm.name}
                      onChange={e => setRequestForm({ ...requestForm, name: e.target.value })}
                      className="w-full input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Category</label>
                    <select 
                      value={requestForm.category}
                      onChange={e => setRequestForm({ ...requestForm, category: e.target.value })}
                      className="w-full input-field"
                    >
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
                    <textarea 
                      required 
                      rows={3}
                      placeholder="Describe what the tool should do and how it will help you..."
                      value={requestForm.desc}
                      onChange={e => setRequestForm({ ...requestForm, desc: e.target.value })}
                      className="w-full input-field resize-none"
                    />
                  </div>

                  <button type="submit" className="w-full btn-primary py-3 font-semibold text-sm">
                    Submit Request
                  </button>
                </form>
              )}

              {submittedRequests.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Your Requests ({submittedRequests.length})</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                    {submittedRequests.map((req: any) => (
                      <div key={req.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{req.name}</p>
                          <p className="text-slate-400 mt-0.5">{req.category} · {req.date}</p>
                        </div>
                        <span className="px-2.5 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold rounded-full">
                          {req.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
