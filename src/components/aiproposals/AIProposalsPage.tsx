'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles, Loader2, FileText, CheckCircle2, ChevronDown, ChevronUp,
  Copy, Download, Trash2, Settings, History, AlertTriangle, X, Clock,
  Zap, RefreshCw, DollarSign
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const CURRENCIES: Record<string, { symbol: string; name: string }> = {
  USD: { symbol: '$',   name: 'USD' },
  PKR: { symbol: '₨',  name: 'PKR' },
  EUR: { symbol: '€',  name: 'EUR' },
  GBP: { symbol: '£',  name: 'GBP' },
  AED: { symbol: 'د.إ',name: 'AED' },
  SAR: { symbol: '﷼',  name: 'SAR' },
  CAD: { symbol: 'C$', name: 'CAD' },
  AUD: { symbol: 'A$', name: 'AUD' },
  INR: { symbol: '₹',  name: 'INR' },
  JPY: { symbol: '¥',  name: 'JPY' },
};

// ─── Daily Quota Helpers ──────────────────────────────────────────
const DAILY_LIMIT = 3; // Max proposals per day
const QUOTA_KEY = 'ai_proposal_quota';

interface QuotaRecord {
  date: string;
  used: number;
}

function getQuota(): QuotaRecord {
  if (typeof window === 'undefined') return { date: '', used: 0 };
  try {
    const raw = localStorage.getItem(QUOTA_KEY);
    if (!raw) return { date: getTodayKey(), used: 0 };
    const record: QuotaRecord = JSON.parse(raw);
    // Reset if it's a new day
    if (record.date !== getTodayKey()) return { date: getTodayKey(), used: 0 };
    return record;
  } catch {
    return { date: getTodayKey(), used: 0 };
  }
}

function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

function incrementQuota(): QuotaRecord {
  const current = getQuota();
  const updated = { date: current.date, used: current.used + 1 };
  localStorage.setItem(QUOTA_KEY, JSON.stringify(updated));
  return updated;
}

function getQuotaRemaining(): number {
  return Math.max(0, DAILY_LIMIT - getQuota().used);
}

// Daily reset time display (midnight UTC+5)
function getResetTimeDisplay(): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ─── Main Component ───────────────────────────────────────────────
export default function AIProposalsPage() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Quota state
  const [quotaUsed, setQuotaUsed] = useState(0);
  const [quotaRemaining, setQuotaRemaining] = useState(DAILY_LIMIT);
  const [quotaExhausted, setQuotaExhausted] = useState(false);

  // Initialize quota on mount
  useEffect(() => {
    const q = getQuota();
    setQuotaUsed(q.used);
    setQuotaRemaining(Math.max(0, DAILY_LIMIT - q.used));
    setQuotaExhausted(q.used >= DAILY_LIMIT);
  }, []);

  const refreshQuotaState = () => {
    const q = getQuota();
    setQuotaUsed(q.used);
    setQuotaRemaining(Math.max(0, DAILY_LIMIT - q.used));
    setQuotaExhausted(q.used >= DAILY_LIMIT);
  };

  const [prompt, setPrompt] = useState({
    clientName: '', companyName: '', website: '', email: '',
    projectTitle: '', projectType: 'Web Development', industry: '', country: '',
    budget: '', timeline: '', jobDescription: '', requirements: '',
    painPoints: '', requiredSkills: '', experienceLevel: 'Expert',
    proposalTone: 'Professional', proposalLength: 'Medium', language: 'English',
    extraInstructions: ''
  });
  const [currency, setCurrency] = useState('USD');

  const [generatedProposal, setGeneratedProposal] = useState<any>(null);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('proposal_history');
    if (saved) {
      try {
        setProposals(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse history');
      }
    }
  }, []);

  const saveToHistory = (data: any) => {
    const newProposal = {
      _id: uuidv4(),
      name: prompt.projectTitle || prompt.clientName || 'Untitled Proposal',
      createdAt: new Date().toISOString(),
      content: data
    };
    const newHistory = [newProposal, ...proposals];
    setProposals(newHistory);
    localStorage.setItem('proposal_history', JSON.stringify(newHistory));
  };

  const deleteHistory = (id: string) => {
    const newHistory = proposals.filter((p: any) => p._id !== id);
    setProposals(newHistory);
    localStorage.setItem('proposal_history', JSON.stringify(newHistory));
  };

  const PROJECT_TYPES = [
    'Web Development', 'E-commerce System', 'Business Blog', 'SaaS Platform',
    'CRM System', 'Mobile App (iOS/Android)', 'API Development', 'Marketing Campaign',
    'SEO Optimization', 'UI/UX Design', 'Enterprise Software', 'Other'
  ];
  const TONES = ['Professional', 'Friendly', 'Technical', 'Executive', 'Beginner', 'Agency', 'Premium'];
  const LENGTHS = ['Short', 'Medium', 'Long'];

  const handleGenerate = async (e: React.FormEvent, isRegenerate = false) => {
    if (e) e.preventDefault();

    // ── Pre-flight checks (no loading state needed) ────────────────────────
    if (!isRegenerate) {
      const remaining = getQuotaRemaining();
      if (remaining <= 0) {
        setQuotaExhausted(true);
        setError(`Daily limit of ${DAILY_LIMIT} proposals reached. Resets tomorrow at midnight.`);
        return;
      }
    }

    if (!prompt.clientName?.trim() && !prompt.projectTitle?.trim()) {
      setError('Please provide at least a Client Name or Project Title.');
      return;
    }

    // ── Start loading — MUST be stopped in finally ─────────────────────────
    setIsGenerating(true);
    setError(null);
    setSuccessMsg(null);

    // Abort controller for client-side timeout (35s safety net)
    const controller = new AbortController();
    const clientTimeoutId = setTimeout(() => controller.abort(), 35_000);

    try {
      const res = await fetch('/api/ai/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prompt),
        signal: controller.signal,
      });

      // Parse JSON (always, even on error)
      let data: Record<string, string> = {};
      try {
        data = await res.json();
      } catch {
        setError('Server returned an unreadable response. Please try again.');
        return; // finally will still run
      }

      // ── Handle non-OK responses ──────────────────────────────────────────
      if (!res.ok) {
        const serverMsg = data?.message;
        switch (res.status) {
          case 400:
            setError(serverMsg || 'Please fill in the required fields.');
            break;
          case 401:
          case 403:
            setError(serverMsg || 'API authentication error. Please check configuration.');
            break;
          case 429:
            setError(serverMsg || 'API quota exceeded. Please try again later or tomorrow.');
            break;
          case 502:
          case 503:
            setError(serverMsg || 'AI service is temporarily unavailable. Please try again in a moment.');
            break;
          case 504:
            setError(serverMsg || 'Request timed out. The AI is busy — please try again.');
            break;
          default:
            setError(serverMsg || `Generation failed (HTTP ${res.status}). Please try again.`);
        }
        return; // finally will still run — spinner WILL stop
      }

      // ── Validate response has expected proposal fields ───────────────────
      if (!data || typeof data !== 'object' || !data.executiveSummary) {
        setError('AI returned an incomplete response. Please try again.');
        return;
      }

      // ── Success ──────────────────────────────────────────────────────────
      setGeneratedProposal(data);

      if (!isRegenerate) {
        saveToHistory(data);
        const updatedQuota = incrementQuota();
        setQuotaUsed(updatedQuota.used);
        setQuotaRemaining(Math.max(0, DAILY_LIMIT - updatedQuota.used));
        setQuotaExhausted(updatedQuota.used >= DAILY_LIMIT);

        const rem = DAILY_LIMIT - updatedQuota.used;
        setSuccessMsg(
          rem > 0
            ? `✅ Proposal generated! You have ${rem} proposal${rem > 1 ? 's' : ''} remaining today.`
            : `✅ Proposal generated! You've used all ${DAILY_LIMIT} proposals for today.`
        );
        setTimeout(() => setSuccessMsg(null), 5000);
      }

    } catch (err: any) {
      console.error('[AIProposals] Generation error:', err);

      if (err?.name === 'AbortError') {
        setError('Request timed out after 35 seconds. The AI is very busy — please try again.');
      } else if (err?.message?.includes('fetch') || err?.message?.includes('network')) {
        setError('Network error — please check your internet connection and try again.');
      } else {
        setError(err?.message || 'An unexpected error occurred. Please try again.');
      }

    } finally {
      // ⚠️ CRITICAL: Always runs — prevents infinite loading spinner
      clearTimeout(clientTimeoutId);
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (format: 'text' | 'markdown') => {
    if (!generatedProposal) return;
    let content = '';
    if (format === 'markdown') {
      content = `# Executive Summary\n${generatedProposal.executiveSummary}\n\n## Project Understanding\n${generatedProposal.projectUnderstanding}\n\n## Pain Points & Solutions\n${generatedProposal.painPoints}\n\n## Recommended Solution\n${generatedProposal.recommendedSolution}\n\n## Timeline & Milestones\n${generatedProposal.timelineAndMilestones}\n\n## Budget & Pricing\n${generatedProposal.budgetJustification}\n\n## Why Choose Us\n${generatedProposal.whyChooseMe}\n\n## Conclusion\n${generatedProposal.closing}`;
    } else {
      content = `Executive Summary:\n${generatedProposal.executiveSummary}\n\nProject Understanding:\n${generatedProposal.projectUnderstanding}\n\nPain Points & Solutions:\n${generatedProposal.painPoints}\n\nRecommended Solution:\n${generatedProposal.recommendedSolution}\n\nTimeline & Milestones:\n${generatedProposal.timelineAndMilestones}\n\nBudget & Pricing:\n${generatedProposal.budgetJustification}\n\nWhy Choose Us:\n${generatedProposal.whyChooseMe}\n\nConclusion:\n${generatedProposal.closing}`;
    }
    navigator.clipboard.writeText(content);
    alert('Copied to clipboard!');
  };

  const downloadTXT = () => {
    if (!generatedProposal) return;
    const content = `Executive Summary:\n${generatedProposal.executiveSummary}\n\nProject Understanding:\n${generatedProposal.projectUnderstanding}\n\nPain Points & Solutions:\n${generatedProposal.painPoints}\n\nRecommended Solution:\n${generatedProposal.recommendedSolution}\n\nTimeline & Milestones:\n${generatedProposal.timelineAndMilestones}\n\nBudget & Pricing:\n${generatedProposal.budgetJustification}\n\nWhy Choose Us:\n${generatedProposal.whyChooseMe}\n\nConclusion:\n${generatedProposal.closing}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prompt.clientName || 'Proposal'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = async () => {
    const element = document.getElementById('proposal-pdf-content');
    if (!element) return;
    try {
      const html2pdf = (await import('html2pdf.js' as any)).default as any;
      const opt = {
        margin: 15,
        filename: `${prompt.clientName || 'Proposal'}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF. Make sure html2pdf.js is installed.');
    }
  };

  // Quota bar color
  const quotaPercent = ((DAILY_LIMIT - quotaRemaining) / DAILY_LIMIT) * 100;
  const quotaBarColor = quotaRemaining === 0
    ? 'bg-rose-500'
    : quotaRemaining === 1
    ? 'bg-amber-500'
    : 'bg-emerald-500';

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 flex-wrap">
            <Sparkles className="text-indigo-500 shrink-0" />
            AI Proposal Generator
            <span className="text-xs bg-indigo-500 text-white px-2 py-1 rounded-full font-medium">Enterprise</span>
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Harness the power of Gemini AI to craft winning proposals instantly.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="btn-secondary text-sm w-full sm:w-auto"
          >
            <Settings size={16} className="mr-2" /> Configure AI
          </button>
        </div>
      </div>

      {/* ── Daily Quota Display ── */}
      <div className={`mb-6 rounded-xl p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        quotaExhausted
          ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-700'
          : quotaRemaining === 1
          ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700'
          : 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800'
      }`}>
        <div className="flex items-center gap-3">
          <Zap className={`shrink-0 ${quotaExhausted ? 'text-rose-500' : quotaRemaining === 1 ? 'text-amber-500' : 'text-indigo-500'}`} size={20} />
          <div className="flex-1">
            <p className={`font-semibold text-sm ${quotaExhausted ? 'text-rose-700 dark:text-rose-300' : 'text-slate-700 dark:text-slate-200'}`}>
              {quotaExhausted
                ? `Daily Limit Reached — Resets at midnight`
                : `Daily Quota: ${quotaRemaining} of ${DAILY_LIMIT} proposals remaining`}
            </p>
            <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 max-w-xs">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${quotaBarColor}`}
                style={{ width: `${quotaPercent}%` }}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {Array.from({ length: DAILY_LIMIT }).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                i < quotaUsed
                  ? 'bg-indigo-500 border-indigo-500 text-white'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400'
              }`}
            >
              {i < quotaUsed ? <CheckCircle2 size={14} /> : i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* ── Success Message ── */}
      {successMsg && (
        <div className="mb-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
          <CheckCircle2 size={18} />
          {successMsg}
        </div>
      )}

      {/* ── Error Banner ── */}
      {error && (
        <div className="mb-6 bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-lg flex items-start justify-between gap-4 dark:bg-rose-900/30">
          <div className="flex items-start gap-2">
            <AlertTriangle size={18} className="text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-rose-700 dark:text-rose-400">Generation Failed</p>
              <p className="text-sm text-rose-600 dark:text-rose-300 mt-1">{error}</p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            {!quotaExhausted && (
              <button
                onClick={e => handleGenerate(e as any, true)}
                className="whitespace-nowrap text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              >
                <RefreshCw size={14} /> Retry
              </button>
            )}
            <button onClick={() => setError(null)} className="text-rose-400 hover:text-rose-600">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-full">
        {/* Input Form */}
        <div className="card p-6 h-fit border-t-4 border-t-indigo-500">
          <h2 className="text-xl font-semibold mb-4">Project Requirements</h2>
          <form onSubmit={e => handleGenerate(e, false)} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company/Client Name *</label>
                <input type="text" className="input-field" required
                  value={prompt.clientName} onChange={e => setPrompt({ ...prompt, clientName: e.target.value })}
                  placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Title *</label>
                <input type="text" className="input-field" required
                  value={prompt.projectTitle} onChange={e => setPrompt({ ...prompt, projectTitle: e.target.value })}
                  placeholder="e.g. Website Redesign" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Type</label>
                <select className="input-field" value={prompt.projectType} onChange={e => setPrompt({ ...prompt, projectType: e.target.value })}>
                  {PROJECT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Budget</label>
                <div className="flex gap-2">
                  <select
                    value={currency}
                    onChange={e => setCurrency(e.target.value)}
                    className="input-field shrink-0 w-24 text-sm"
                  >
                    {Object.entries(CURRENCIES).map(([code, c]) => (
                      <option key={code} value={code}>{code} {c.symbol}</option>
                    ))}
                  </select>
                  <input type="text" className="input-field flex-1" value={prompt.budget} onChange={e => setPrompt({ ...prompt, budget: e.target.value })} placeholder="e.g. 5,000" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Core Requirements *</label>
              <textarea className="input-field h-24 resize-none" required
                value={prompt.requirements} onChange={e => setPrompt({ ...prompt, requirements: e.target.value })}
                placeholder="What exactly does the client need?" />
            </div>

            {/* Advanced Toggle */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 p-3 flex justify-between items-center text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span>Advanced Details & Tone Settings</span>
                {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showAdvanced && (
                <div className="p-4 space-y-4 bg-white dark:bg-slate-900 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">Tone of Voice</label>
                    <select className="input-field text-sm" value={prompt.proposalTone} onChange={e => setPrompt({ ...prompt, proposalTone: e.target.value })}>
                      {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Proposal Length</label>
                    <select className="input-field text-sm" value={prompt.proposalLength} onChange={e => setPrompt({ ...prompt, proposalLength: e.target.value })}>
                      {LENGTHS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Job Description (Original text)</label>
                    <textarea className="input-field text-sm h-16" value={prompt.jobDescription} onChange={e => setPrompt({ ...prompt, jobDescription: e.target.value })} placeholder="Paste original posting here..." />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Client Pain Points</label>
                    <textarea className="input-field text-sm h-16" value={prompt.painPoints} onChange={e => setPrompt({ ...prompt, painPoints: e.target.value })} placeholder="What are they struggling with?" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Required Skills</label>
                    <input type="text" className="input-field text-sm" value={prompt.requiredSkills} onChange={e => setPrompt({ ...prompt, requiredSkills: e.target.value })} placeholder="React, Node, etc" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Timeline</label>
                    <input type="text" className="input-field text-sm" value={prompt.timeline} onChange={e => setPrompt({ ...prompt, timeline: e.target.value })} placeholder="3 months" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Industry</label>
                    <input type="text" className="input-field text-sm" value={prompt.industry} onChange={e => setPrompt({ ...prompt, industry: e.target.value })} placeholder="e.g. Healthcare, Fintech" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Country</label>
                    <input type="text" className="input-field text-sm" value={prompt.country} onChange={e => setPrompt({ ...prompt, country: e.target.value })} placeholder="e.g. United States" />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isGenerating || quotaExhausted}
              title={quotaExhausted ? 'Daily limit reached. Resets at midnight.' : `${quotaRemaining} proposals remaining today`}
              className={`w-full btn-primary py-4 text-lg mt-4 shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 ${
                quotaExhausted ? 'opacity-50 cursor-not-allowed bg-rose-500 hover:bg-rose-500 border-rose-500' : ''
              }`}
            >
              {isGenerating ? (
                <><Loader2 className="animate-spin" size={20} /> AI is Crafting Your Proposal...</>
              ) : quotaExhausted ? (
                <><Clock size={20} /> Daily Limit Reached — Resets at Midnight</>
              ) : (
                <><Sparkles size={20} /> Generate AI Proposal ({quotaRemaining} left today)</>
              )}
            </button>
          </form>
        </div>

        {/* Output Area */}
        <div className="card flex flex-col min-h-[600px] border-t-4 border-t-emerald-500">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 rounded-t-xl">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">Live Proposal Preview</h2>
            {generatedProposal && (
              <div className="flex gap-2">
                <button onClick={() => copyToClipboard('text')} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors" title="Copy Plain Text"><Copy size={16} /></button>
                <button onClick={downloadTXT} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors" title="Download TXT"><Download size={16} /></button>
                <button onClick={downloadPDF} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors font-bold text-sm text-indigo-600 dark:text-indigo-400" title="Download PDF">PDF</button>
                <button
                  onClick={e => handleGenerate(e, true)}
                  disabled={isGenerating}
                  className="btn-secondary py-1 text-sm"
                  title="Regenerate (does not count against daily quota)"
                >
                  <Sparkles size={14} className="mr-1" /> Regenerate
                </button>
              </div>
            )}
          </div>

          <div className="p-6 flex-1 overflow-y-auto w-full custom-scrollbar">
            {isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center text-indigo-500 space-y-6">
                <Loader2 size={48} className="animate-spin" />
                <div className="space-y-2 text-center">
                  <p className="font-medium animate-pulse">Analyzing project requirements...</p>
                  <p className="text-sm text-slate-400">Structuring professional arguments and timeline.</p>
                </div>
                {/* Skeleton UI */}
                <div className="w-full max-w-md space-y-4 opacity-50">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                  <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded w-full mt-4"></div>
                </div>
              </div>
            ) : generatedProposal ? (
              <div id="proposal-pdf-content" className="space-y-6 text-slate-700 dark:text-slate-300 proposal-content bg-white p-8 rounded-xl print-container">
                <div className="flex justify-between items-start border-b-2 border-slate-200 dark:border-slate-800 pb-6 mb-6">
                  <img src="/logo1.png" alt="DevCodeX Logo" className="h-16 object-contain" />
                  <div className="text-right text-slate-500 text-sm">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{prompt.clientName || 'Client Proposal'}</p>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 pb-2 border-b border-slate-200 dark:border-slate-800">Executive Summary</h3>
                  <p className="whitespace-pre-wrap leading-relaxed">{generatedProposal.executiveSummary}</p>
                </section>
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 pb-2 border-b border-slate-200 dark:border-slate-800">Project Understanding</h3>
                  <p className="whitespace-pre-wrap leading-relaxed">{generatedProposal.projectUnderstanding}</p>
                </section>
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 pb-2 border-b border-slate-200 dark:border-slate-800">Pain Points & Solution</h3>
                  <p className="whitespace-pre-wrap leading-relaxed bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                    <strong className="block mb-2 text-indigo-700 dark:text-indigo-400">Identified Challenges:</strong> {generatedProposal.painPoints}<br /><br />
                    <strong className="block mb-2 text-indigo-700 dark:text-indigo-400">Proposed Strategy:</strong> {generatedProposal.recommendedSolution}
                  </p>
                </section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section className="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Timeline & Milestones</h3>
                    <p className="whitespace-pre-wrap text-sm">{generatedProposal.timelineAndMilestones}</p>
                  </section>
                  <section className="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Investment Structure</h3>
                    <p className="whitespace-pre-wrap text-sm">{generatedProposal.budgetJustification}</p>
                  </section>
                </div>
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 pb-2 border-b border-slate-200 dark:border-slate-800">Why Choose Us</h3>
                  <p className="whitespace-pre-wrap leading-relaxed">{generatedProposal.whyChooseMe}</p>
                </section>
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 pb-2 border-b border-slate-200 dark:border-slate-800">Moving Forward</h3>
                  <p className="whitespace-pre-wrap leading-relaxed italic">{generatedProposal.closing}</p>
                </section>
                <div className="mt-12 pt-8 border-t-2 border-slate-200 pb-4 flex justify-end">
                  <div className="text-center">
                    <div className="bg-white rounded-xl p-2 inline-block mb-1 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/ceo-signature.png"
                        alt="CEO Signature"
                        className="h-20 object-contain"
                      />
                    </div>
                    <div className="border-t border-slate-400 pt-2 font-bold text-slate-900 w-48 mx-auto">
                      CEO, DevCodeX
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex w-full h-full min-h-[400px] flex-col items-center justify-center text-slate-400">
                <div className="p-6 bg-slate-50 dark:bg-slate-900/30 rounded-full mb-6">
                  <FileText size={64} className="opacity-40 text-indigo-400" />
                </div>
                <h3 className="text-xl font-medium text-slate-600 dark:text-slate-300 mb-2">No Proposal Generated Yet</h3>
                <p className="text-center max-w-sm">Fill in the project requirements and click &quot;Generate AI Proposal&quot; to see the magic happen.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History / Saved Proposals */}
      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
          <History className="text-slate-500" />
          Local Proposal History
          <span className="text-sm font-normal text-slate-400 ml-2">({proposals.length} saved)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proposals.map((p: any) => (
            <div key={p._id} className="card p-5 card-hover group border-l-4 border-l-slate-300 hover:border-l-indigo-500 transition-all flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg line-clamp-1 flex-1 pr-2" title={p.name}>{p.name}</h3>
                <button onClick={() => deleteHistory(p._id)} className="text-slate-400 hover:text-rose-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-xs text-slate-500 mb-4">{new Date(p.createdAt).toLocaleString()}</p>
              <button
                onClick={() => {
                  setGeneratedProposal(p.content);
                  window.scrollTo({ top: 100, behavior: 'smooth' });
                }}
                className="w-full text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 py-2 rounded-lg mt-auto transition-colors"
              >
                View Proposal
              </button>
            </div>
          ))}
          {proposals.length === 0 && (
            <div className="col-span-full p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              <History size={48} className="mx-auto mb-4 opacity-20" />
              <p>Your generated proposals will be saved here automatically.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}