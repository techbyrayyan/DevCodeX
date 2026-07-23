'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Link2, Copy, Check, RefreshCw, Wand2, Download, 
  Settings, History, AlertCircle, FileText, Globe, Sparkles, Loader2, Code, Trash2, Activity
} from 'lucide-react';

function removeEmojis(str: string) {
  return str.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
}

function toSlug(text: string, separator: string, stopWords: boolean): string {
  const stops = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'it'];
  let s = text.toLowerCase();
  
  s = removeEmojis(s);
  s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // remove accents
  s = s.replace(/[^a-z0-9\s-]/g, ' '); // standard special chars to space
  s = s.replace(/\s+/g, ' ').trim(); // normalize spaces

  if (stopWords) {
    s = s.split(' ').filter(w => !stops.includes(w)).join(' ');
  }
  
  if (!s) return '';
  const escapedSep = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const slug = s.replace(/\s+/g, separator).replace(new RegExp(`(${escapedSep})+`, 'g'), separator);
  
  return slug.replace(new RegExp(`^${escapedSep}+|${escapedSep}+$`, 'g'), '');
}

function calculateSEO(slug: string, original: string) {
  if (!slug) return { score: 0, color: 'text-slate-500', bg: 'bg-slate-100', tips: [] };
  
  let score = 100;
  const tips = [];
  
  const length = slug.length;
  if (length < 15) { score -= 20; tips.push({ msg: 'Too short. Target 40-60 chars.', good: false }); }
  else if (length > 75) { score -= 30; tips.push({ msg: 'Too long. Keep under 75 chars.', good: false }); }
  else { tips.push({ msg: 'Optimal length (15-75 chars).', good: true }); }
  
  const words = slug.split(/[-_.]/);
  if (words.length < 3) { score -= 10; tips.push({ msg: 'Add more keywords (3-5 words).', good: false }); }
  else if (words.length > 8) { score -= 15; tips.push({ msg: 'Too many words. Be concise.', good: false }); }
  else { tips.push({ msg: 'Excellent word count.', good: true }); }

  if (/[0-9]/.test(slug)) {
    tips.push({ msg: 'Contains numbers (good for CTR on lists/years).', good: true });
  }

  const hasStops = ['a', 'an', 'the', 'and', 'or', 'in'].some(w => words.includes(w));
  if (hasStops && score > 20) {
    score -= 10;
    tips.push({ msg: 'Warning: Contains stop words (a, the, etc).', good: false });
  } else if (!hasStops) {
    tips.push({ msg: 'No stop words detected (cleaner URL).', good: true });
  }

  score = Math.max(0, Math.min(100, score));
  let color = 'text-rose-500';
  let bg = 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-800';
  
  if (score >= 80) {
    color = 'text-emerald-500';
    bg = 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-800';
  } else if (score >= 50) {
    color = 'text-amber-500';
    bg = 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-800';
  }
  
  return { score, color, bg, tips };
}

const PRESETS = [
  'How to Start a Business in 2024!',
  'Top 10 Web Design Trends 🚀',
  'Ultimate Guide to SEO Optimization',
  'Best Restaurants in New York City (NYC)',
];

export default function SlugGeneratorPage() {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState('-');
  const [removeStopWords, setRemoveStopWords] = useState(true);
  const [maxLength, setMaxLength] = useState(75);
  const [baseUrl, setBaseUrl] = useState('https://example.com/blog/');
  
  const [copied, setCopied] = useState<string | null>(null);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkInput, setBulkInput] = useState('');
  
  const [history, setHistory] = useState<{original: string, slug: string, date: string}[]>([]);
  const [aiAlternatives, setAiAlternatives] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Load history on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('slugHistory');
      if (saved) setHistory(JSON.parse(saved));
    } catch {}
  }, []);

  const saveToHistory = (item: {original: string, slug: string}) => {
    if (!item.original || !item.slug) return;
    setHistory(prev => {
      const newHist = [{ ...item, date: new Date().toISOString() }, ...prev.filter(h => h.slug !== item.slug)].slice(0, 20);
      localStorage.setItem('slugHistory', JSON.stringify(newHist));
      return newHist;
    });
  };

  const slug = useMemo(() => {
    const raw = toSlug(input, separator, removeStopWords);
    return raw.slice(0, maxLength);
  }, [input, separator, removeStopWords, maxLength]);

  const bulkSlugs = useMemo(() => {
    if (!bulkInput.trim()) return [];
    const lines = bulkInput.split('\n').filter(l => l.trim());
    const seen = new Set<string>();
    
    return lines.map(line => {
      let raw = toSlug(line.trim(), separator, removeStopWords).slice(0, maxLength);
      // Ensure bulk slugs are unique
      let finalSlug = raw;
      let counter = 1;
      while (seen.has(finalSlug)) {
        finalSlug = `${raw}${separator}${counter}`;
        counter++;
      }
      seen.add(finalSlug);
      return { original: line.trim(), slug: finalSlug };
    });
  }, [bulkInput, separator, removeStopWords, maxLength]);

  const copy = async (text: string, key: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
    if (!bulkMode) saveToHistory({ original: input, slug: text });
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const downloadBulk = (format: 'csv' | 'json' | 'txt') => {
    if (format === 'csv') {
      const csv = ['Original Title,SEO Slug', ...bulkSlugs.map(r => `"${r.original}","${r.slug}"`)].join('\n');
      downloadFile(csv, 'slugs.csv', 'text/csv');
    } else if (format === 'json') {
      downloadFile(JSON.stringify(bulkSlugs, null, 2), 'slugs.json', 'application/json');
    } else {
      const txt = bulkSlugs.map(r => `${r.original} -> ${r.slug}`).join('\n');
      downloadFile(txt, 'slugs.txt', 'text/plain');
    }
  };

  const generateAIAlternatives = async () => {
    if (!input || !slug) return;
    setIsAiLoading(true);
    setAiAlternatives([]);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate 5 alternative highly-optimized SEO URL slugs for the title: "${input}". 
          Use separator "${separator}". Max length ${maxLength}.
          Return ONLY a JSON array of strings. No extra text.`,
          model: 'gemini-1.5-flash',
        })
      });
      const data = await res.json();
      let text = data.result || '';
      text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const arr = JSON.parse(text);
      if (Array.isArray(arr)) {
        setAiAlternatives(arr);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to generate AI alternatives.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const seoInfo = useMemo(() => calculateSEO(slug, input), [slug, input]);

  // Keyword highlighter
  const highlightedKeywords = useMemo(() => {
    if (!slug) return [];
    const words = slug.split(separator).filter(w => w.length > 2);
    // basic stop list for highlighter
    const nonKeywords = ['how', 'the', 'for', 'with', 'and', 'best', 'top', 'to'];
    return words.filter(w => !nonKeywords.includes(w));
  }, [slug, separator]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl text-indigo-600 dark:text-indigo-400">
                <Link2 size={24} />
              </div>
              Enterprise Slug Generator
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Create universally robust, SEO-optimized URL identifiers instantly.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setBulkMode(false)} 
              className={`btn-secondary flex items-center gap-2 ${!bulkMode ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 border-indigo-200' : ''}`}
            >
              <FileText size={16} /> Web Mode
            </button>
            <button 
              onClick={() => setBulkMode(true)} 
              className={`btn-secondary flex items-center gap-2 ${bulkMode ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 border-indigo-200' : ''}`}
            >
              <Code size={16} /> Bulk Mode
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 line-height-relaxed">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {!bulkMode ? (
              <>
                {/* Input Area */}
                <div className="card p-6 shadow-sm border-t-4 border-t-indigo-500">
                  <div className="flex justify-between items-end mb-3">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                      Blog Title, Article Name, or Text
                    </label>
                    <span className="text-xs text-slate-400 font-medium">{input.length} chars</span>
                  </div>
                  <textarea
                    className="input-field text-lg font-medium resize-y min-h-[90px] shadow-inner"
                    placeholder="e.g. 10 Best Enterprise SaaS Strategies for 2024!"
                    value={input}
                    onChange={e => { setInput(e.target.value); setAiAlternatives([]); }}
                  />
                  <div className="mt-3 flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mr-2">Try:</span>
                    {PRESETS.map((p, i) => (
                      <button key={i} onClick={() => { setInput(p); setAiAlternatives([]); }} className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-100 hover:text-indigo-600 transition-colors font-medium">
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Area */}
                <div className="card p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  
                  <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <Globe size={18} className="text-indigo-500" /> Live SEO Preview
                  </h3>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 overflow-x-auto shadow-sm custom-scrollbar mb-6">
                    <div className="flex items-center text-sm font-mono whitespace-nowrap">
                      <span className="text-slate-400 select-none mr-0.5">{baseUrl}</span>
                      {slug ? (
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 break-all select-all">
                          {slug.split(separator).map((word, i, arr) => (
                            <span key={i}>
                              <span className={highlightedKeywords.includes(word) ? 'bg-amber-100 dark:bg-amber-900/40 px-0.5 rounded' : ''}>{word}</span>
                              {i < arr.length - 1 && <span className="opacity-50">{separator}</span>}
                            </span>
                          ))}
                        </span>
                      ) : (
                        <span className="text-slate-300 italic">your-seo-optimized-slug</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                       <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{slug ? slug.length : 0}</p>
                       <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Length</p>
                     </div>
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                       <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{slug ? slug.split(separator).length : 0}</p>
                       <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Words</p>
                     </div>
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 text-center flex flex-col items-center justify-center">
                       <p className={`text-2xl font-black ${seoInfo.color}`}>{seoInfo.score}</p>
                       <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">SEO Score</p>
                     </div>
                     <button
                       onClick={() => copy(slug, 'main')}
                       disabled={!slug}
                       className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${!slug ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-100' : 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-700 cursor-pointer'}`}
                     >
                       {copied === 'main' ? <Check size={28} className="text-emerald-500 mb-1" /> : <Copy size={24} className="mb-1" />}
                       <p className="text-xs font-bold uppercase tracking-wider">{copied === 'main' ? 'Copied!' : 'Copy Slug'}</p>
                     </button>
                  </div>
                  
                  {/* SEO Analysis */}
                  {slug && (
                    <div className={`p-4 rounded-xl border ${seoInfo.bg}`}>
                      <h4 className={`text-sm font-bold flex items-center gap-2 mb-3 ${seoInfo.color}`}>
                        <Activity size={16} /> Smart SEO Analysis
                      </h4>
                      <ul className="space-y-2">
                        {seoInfo.tips.map((t, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            {t.good ? <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" /> : <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />}
                            <span className="text-slate-700 dark:text-slate-300 font-medium">{t.msg}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-slate-500 font-medium">Need more options? Let AI brainstorm for you.</p>
                        <button 
                          onClick={generateAIAlternatives}
                          disabled={isAiLoading || !slug}
                          className="btn-primary py-2 px-4 text-sm w-full sm:w-auto flex justify-center bg-indigo-600 hover:bg-indigo-700 border-none shadow-md"
                        >
                          {isAiLoading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Sparkles size={16} className="mr-2" />}
                          AI Alternatives
                        </button>
                      </div>

                      {aiAlternatives.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {aiAlternatives.map((alt, i) => (
                            <div key={i} className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-lg shadow-sm">
                              <code className="text-sm font-mono text-indigo-600 dark:text-indigo-400 break-all">{alt}</code>
                              <button onClick={() => copy(alt, `ai-${i}`)} className="p-2 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 rounded-md transition-colors ml-4 shrink-0">
                                {copied === `ai-${i}` ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Bulk Mode
              <div className="card shadow-sm flex flex-col h-full border-t-4 border-t-indigo-500">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-bold mb-1">Bulk Generation Mode</h3>
                  <p className="text-sm text-slate-500">Paste up to 500 titles (one per line). Duplicates are intelligently handled.</p>
                </div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <textarea
                    className="input-field font-mono text-sm flex-1 min-h-[300px] resize-none"
                    placeholder={"Enter multiple titles...\nHow to Learn React in 2024\nNext.js API Routing Guide\nTailwind CSS Best Practices"}
                    value={bulkInput}
                    onChange={e => setBulkInput(e.target.value)}
                  />
                  {bulkSlugs.length > 0 && (
                     <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                       <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                         <p className="font-bold text-slate-700 dark:text-slate-300">Generated <span className="text-indigo-600">{bulkSlugs.length}</span> slugs</p>
                         <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                           <button onClick={() => downloadBulk('txt')} className="btn-secondary py-2 px-3 text-xs flex-1 justify-center"><Download size={14} className="mr-1" /> TXT</button>
                           <button onClick={() => downloadBulk('csv')} className="btn-secondary py-2 px-3 text-xs flex-1 justify-center"><Download size={14} className="mr-1" /> CSV</button>
                           <button onClick={() => downloadBulk('json')} className="btn-secondary py-2 px-3 text-xs flex-1 justify-center"><Download size={14} className="mr-1" /> JSON</button>
                         </div>
                       </div>
                     </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Settings */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            <div className="card p-6 shadow-sm sticky top-6">
              <h3 className="font-bold border-b border-slate-100 dark:border-slate-800 pb-3 mb-5 flex items-center gap-2">
                <Settings size={18} className="text-slate-500" /> Configuration
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">Separator Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setSeparator('-')} className={`py-2 px-3 flex justify-center items-center rounded-lg text-sm font-bold border transition-all ${separator === '-' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none' : 'bg-slate-50 border-slate-200 hover:border-indigo-300 text-slate-700'}`}>
                      Hyphen <span className="bg-white/20 px-2 py-0.5 rounded text-xs ml-2">-</span>
                    </button>
                    <button onClick={() => setSeparator('_')} className={`py-2 px-3 flex justify-center items-center rounded-lg text-sm font-bold border transition-all ${separator === '_' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none' : 'bg-slate-50 border-slate-200 hover:border-indigo-300 text-slate-700'}`}>
                      Under<span className="bg-white/20 px-2 py-0.5 rounded text-xs ml-2">_</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                    Max Length: <span className="text-indigo-600 font-black">{maxLength}</span>
                  </label>
                  <input type="range" min={15} max={120} value={maxLength} onChange={e => setMaxLength(Number(e.target.value))} className="w-full accent-indigo-600" />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Base URL Preview</label>
                  <input 
                    className="input-field text-sm font-mono bg-slate-50" 
                    value={baseUrl} 
                    onChange={e => setBaseUrl(e.target.value)} 
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${removeStopWords ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 group-hover:border-indigo-400'}`}>
                      {removeStopWords && <Check size={14} strokeWidth={3} />}
                    </div>
                    <input type="checkbox" checked={removeStopWords} onChange={e => setRemoveStopWords(e.target.checked)} className="hidden" />
                    <div>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Remove Stop Words</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">Automatically strips SEO-diluting words like (a, and, the, in, of).</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex gap-2">
                <button 
                  onClick={() => { setInput(''); setBulkInput(''); setAiAlternatives([]); }} 
                  className="btn-secondary w-full py-2.5 text-sm font-bold flex justify-center gap-2"
                >
                  <RefreshCw size={16} /> Reset
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* History Section */}
        {!bulkMode && history.length > 0 && (
          <div className="card p-6 mt-4 border-t-4 border-slate-200">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold flex items-center gap-2"><History size={18} className="text-slate-400" /> Recent Slugs</h3>
              <button onClick={() => { setHistory([]); localStorage.removeItem('slugHistory'); }} className="text-xs text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1">
                <Trash2 size={14} /> Clear History
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((h, i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 group hover:border-indigo-300 transition-colors">
                  <p className="text-xs text-slate-400 truncate mb-2">{h.original}</p>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-sm font-mono text-indigo-700 dark:text-indigo-400 font-semibold truncate flex-1">{h.slug}</code>
                    <button onClick={() => copy(h.slug, `hist-${i}`)} className="text-slate-400 hover:text-indigo-600 transition-colors p-1">
                      {copied === `hist-${i}` ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
