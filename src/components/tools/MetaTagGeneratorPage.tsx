'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState } from 'react';
import { Tag, Copy, Check, Download, RefreshCw } from 'lucide-react';

const CHAR_LIMITS = { title: 60, description: 160, keywords: 200 };

const OG_TYPES = ['website', 'article', 'product', 'profile', 'video', 'music'];

interface MetaData {
  title: string;
  description: string;
  keywords: string;
  author: string;
  robots: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  twitterSite: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  viewport: string;
  charset: string;
  themeColor: string;
}

export default function MetaTagGeneratorPage() {
  const [meta, setMeta] = useState<MetaData>({
    title: '',
    description: '',
    keywords: '',
    author: '',
    robots: 'index, follow',
    canonical: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    viewport: 'width=device-width, initial-scale=1',
    charset: 'UTF-8',
    themeColor: '#4f46e5',
  });

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'og' | 'twitter' | 'technical'>('general');

  const update = (k: keyof MetaData, v: string) => setMeta(p => ({ ...p, [k]: v }));

  const generateTags = () => {
    const lines: string[] = [];
    lines.push(`<!-- Basic SEO -->`);
    if (meta.charset) lines.push(`<meta charset="${meta.charset}">`);
    if (meta.viewport) lines.push(`<meta name="viewport" content="${meta.viewport}">`);
    if (meta.title) lines.push(`<title>${meta.title}</title>`);
    if (meta.description) lines.push(`<meta name="description" content="${meta.description}">`);
    if (meta.keywords) lines.push(`<meta name="keywords" content="${meta.keywords}">`);
    if (meta.author) lines.push(`<meta name="author" content="${meta.author}">`);
    if (meta.robots) lines.push(`<meta name="robots" content="${meta.robots}">`);
    if (meta.canonical) lines.push(`<link rel="canonical" href="${meta.canonical}">`);
    if (meta.themeColor) lines.push(`<meta name="theme-color" content="${meta.themeColor}">`);
    lines.push('');
    lines.push(`<!-- Open Graph / Facebook -->`);
    if (meta.ogType) lines.push(`<meta property="og:type" content="${meta.ogType}">`);
    if (meta.ogTitle || meta.title) lines.push(`<meta property="og:title" content="${meta.ogTitle || meta.title}">`);
    if (meta.ogDescription || meta.description) lines.push(`<meta property="og:description" content="${meta.ogDescription || meta.description}">`);
    if (meta.ogImage) lines.push(`<meta property="og:image" content="${meta.ogImage}">`);
    if (meta.canonical) lines.push(`<meta property="og:url" content="${meta.canonical}">`);
    lines.push('');
    lines.push(`<!-- Twitter Card -->`);
    if (meta.twitterCard) lines.push(`<meta name="twitter:card" content="${meta.twitterCard}">`);
    if (meta.twitterSite) lines.push(`<meta name="twitter:site" content="${meta.twitterSite}">`);
    if (meta.twitterTitle || meta.title) lines.push(`<meta name="twitter:title" content="${meta.twitterTitle || meta.ogTitle || meta.title}">`);
    if (meta.twitterDescription || meta.description) lines.push(`<meta name="twitter:description" content="${meta.twitterDescription || meta.ogDescription || meta.description}">`);
    if (meta.twitterImage || meta.ogImage) lines.push(`<meta name="twitter:image" content="${meta.twitterImage || meta.ogImage}">`);
    return lines.join('\n');
  };

  const output = generateTags();

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadHTML = () => {
    const blob = new Blob([`<!DOCTYPE html>\n<html lang="en">\n<head>\n${output}\n</head>\n<body>\n  <!-- Your content here -->\n</body>\n</html>`], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'meta-tags.html';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const charWidth = (val: string, limit: number) => Math.min(100, Math.round((val.length / limit) * 100));
  const charColor = (val: string, limit: number) => val.length > limit ? 'bg-rose-500' : val.length > limit * 0.85 ? 'bg-amber-400' : 'bg-emerald-500';

  const TABS = [
    { id: 'general', label: 'General' },
    { id: 'og', label: 'Open Graph' },
    { id: 'twitter', label: 'Twitter Card' },
    { id: 'technical', label: 'Technical' },
  ] as const;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl text-indigo-600 dark:text-indigo-400">
                <Tag size={24} />
              </div>
              Meta Tag Generator
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Generate SEO-optimized meta tags for every page, social share & more.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={copy} className="btn-secondary flex items-center gap-2">
              {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Tags'}
            </button>
            <button onClick={downloadHTML} className="btn-primary flex items-center gap-2">
              <Download size={16} /> Download
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-1 p-1.5 bg-slate-100/80 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex-1 ${activeTab === t.id ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
                  {t.label}
                </button>
              ))}
            </div>

            <div className="card p-5 space-y-4">
              {activeTab === 'general' && (
                <>
                  {/* Title */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-semibold">Page Title</label>
                      <span className={`text-xs ${meta.title.length > CHAR_LIMITS.title ? 'text-rose-500' : 'text-slate-400'}`}>{meta.title.length}/{CHAR_LIMITS.title}</span>
                    </div>
                    <input className="input-field" placeholder="My Awesome Page" value={meta.title} onChange={e => update('title', e.target.value)} />
                    <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${charColor(meta.title, CHAR_LIMITS.title)}`} style={{ width: `${charWidth(meta.title, CHAR_LIMITS.title)}%` }} />
                    </div>
                  </div>
                  {/* Description */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-semibold">Meta Description</label>
                      <span className={`text-xs ${meta.description.length > CHAR_LIMITS.description ? 'text-rose-500' : 'text-slate-400'}`}>{meta.description.length}/{CHAR_LIMITS.description}</span>
                    </div>
                    <textarea className="input-field resize-none min-h-[80px]" placeholder="A brief, compelling description of your page…" value={meta.description} onChange={e => update('description', e.target.value)} />
                    <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${charColor(meta.description, CHAR_LIMITS.description)}`} style={{ width: `${charWidth(meta.description, CHAR_LIMITS.description)}%` }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Keywords <span className="text-slate-400 font-normal">(comma-separated)</span></label>
                    <input className="input-field" placeholder="seo, meta tags, website" value={meta.keywords} onChange={e => update('keywords', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Author</label>
                    <input className="input-field" placeholder="Your Name" value={meta.author} onChange={e => update('author', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Robots</label>
                    <select className="input-field" value={meta.robots} onChange={e => update('robots', e.target.value)}>
                      {['index, follow', 'noindex, nofollow', 'index, nofollow', 'noindex, follow'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Canonical URL</label>
                    <input className="input-field" placeholder="https://example.com/page" value={meta.canonical} onChange={e => update('canonical', e.target.value)} />
                  </div>
                </>
              )}

              {activeTab === 'og' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold mb-1">OG Title <span className="text-slate-400 font-normal">(defaults to Page Title)</span></label>
                    <input className="input-field" placeholder={meta.title || 'My Awesome Page'} value={meta.ogTitle} onChange={e => update('ogTitle', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">OG Description</label>
                    <textarea className="input-field resize-none min-h-[80px]" placeholder={meta.description || 'Page description…'} value={meta.ogDescription} onChange={e => update('ogDescription', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">OG Image URL</label>
                    <input className="input-field" placeholder="https://example.com/og-image.jpg" value={meta.ogImage} onChange={e => update('ogImage', e.target.value)} />
                    <p className="text-xs text-slate-400 mt-1">Recommended: 1200×630px</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">OG Type</label>
                    <select className="input-field" value={meta.ogType} onChange={e => update('ogType', e.target.value)}>
                      {OG_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'twitter' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Card Type</label>
                    <select className="input-field" value={meta.twitterCard} onChange={e => update('twitterCard', e.target.value)}>
                      {['summary', 'summary_large_image', 'app', 'player'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Twitter @username</label>
                    <input className="input-field" placeholder="@yoursite" value={meta.twitterSite} onChange={e => update('twitterSite', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Twitter Title</label>
                    <input className="input-field" placeholder={meta.ogTitle || meta.title || 'My Page'} value={meta.twitterTitle} onChange={e => update('twitterTitle', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Twitter Description</label>
                    <textarea className="input-field resize-none min-h-[80px]" value={meta.twitterDescription} onChange={e => update('twitterDescription', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Twitter Image URL</label>
                    <input className="input-field" placeholder={meta.ogImage || 'https://example.com/twitter-img.jpg'} value={meta.twitterImage} onChange={e => update('twitterImage', e.target.value)} />
                  </div>
                </>
              )}

              {activeTab === 'technical' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Charset</label>
                    <select className="input-field" value={meta.charset} onChange={e => update('charset', e.target.value)}>
                      {['UTF-8', 'ISO-8859-1', 'UTF-16'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Viewport</label>
                    <input className="input-field" value={meta.viewport} onChange={e => update('viewport', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Theme Color</label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={meta.themeColor} onChange={e => update('themeColor', e.target.value)} className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer" />
                      <input className="input-field flex-1 font-mono text-sm" value={meta.themeColor} onChange={e => update('themeColor', e.target.value)} />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Preview Card */}
            {(meta.title || meta.description) && (
              <div className="card p-4">
                <p className="text-xs text-slate-400 font-semibold uppercase mb-3">Google Search Preview</p>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">{meta.canonical || 'https://yoursite.com/page'}</p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium text-base leading-tight">{meta.title || 'Page Title'}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{meta.description ? meta.description.slice(0, 160) : 'Meta description will appear here…'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="space-y-4">
            <div className="card p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm">Generated Tags</h3>
                <button onClick={() => setMeta(p => ({ ...p, title: '', description: '', keywords: '', author: '', canonical: '', ogTitle: '', ogDescription: '', ogImage: '', twitterSite: '', twitterTitle: '', twitterDescription: '', twitterImage: '' }))} className="text-xs text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1">
                  <RefreshCw size={12} /> Reset
                </button>
              </div>
              <pre className="bg-slate-900 dark:bg-slate-950 text-emerald-400 text-xs p-4 rounded-xl overflow-x-auto min-h-[400px] font-mono leading-relaxed">{output || '<!-- Fill in the fields to generate tags -->'}</pre>
              <div className="flex gap-2">
                <button onClick={copy} className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm">
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy All Tags'}
                </button>
                <button onClick={downloadHTML} className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm">
                  <Download size={14} /> Download HTML
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
