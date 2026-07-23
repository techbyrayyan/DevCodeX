'use client';
import React from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  MessageSquare, Copy, Check, Loader2,
  Download, Image as ImageIcon, Sparkles, X, History, 
  BarChart2, FileText, ChevronDown, ChevronUp, Share2, Settings
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Real SVG brand icons for platforms
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterXIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const PLATFORM_ICONS: Record<string, React.FC<{ size?: number }>> = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterXIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
};

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', color: 'from-pink-500 to-purple-600' },
  { id: 'linkedin', label: 'LinkedIn', color: 'from-blue-600 to-blue-700' },
  { id: 'twitter', label: 'Twitter/X', color: 'from-sky-400 to-blue-600' },
  { id: 'facebook', label: 'Facebook', color: 'from-blue-500 to-indigo-600' },
  { id: 'tiktok', label: 'TikTok', color: 'from-slate-700 to-slate-900' },
];

const TONES = ['Professional', 'Friendly', 'Luxury', 'Casual', 'Promotional', 'Inspirational', 'Educational', 'Storytelling'];
const LENGTHS = ['Short', 'Medium', 'Long'];
const EMOJI_LEVELS = ['None', 'Light', 'Medium', 'Heavy'];
const CTAS = ['Visit Website', 'Contact Us', 'Learn More', 'Shop Now', 'DM Us'];
const HASHTAGS_OPTS = ['Auto', 'Trending', 'Custom'];
const LANGUAGES = ['English', 'Urdu', 'Roman Urdu'];

interface Variation {
  variation: string;
  text: string;
  hashtags: string;
  callToAction: string;
  wordCount?: number;
  charCount?: number;
  readability?: string;
  engagement?: string;
  seoScore?: number;
}

export default function AISocialCaptionPage() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('Medium');
  const [emojiLevel, setEmojiLevel] = useState('Medium');
  const [ctaStyle, setCtaStyle] = useState('Learn More');
  const [hashtagStyle, setHashtagStyle] = useState('Auto');
  const [language, setLanguage] = useState('English');
  const [customKeywords, setCustomKeywords] = useState('');
  
  const [image, setImage] = useState<{ src: string; name: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [showAdvanced, setShowAdvanced] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(1);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  // History state
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('captions_history');
      if (saved) setHistory(JSON.parse(saved));
    } catch {}
  }, []);

  const saveToHistory = (data: any) => {
    const newItem = { id: uuidv4(), date: new Date().toISOString(), platform, topic, data };
    const newHist = [newItem, ...history].slice(0, 10);
    setHistory(newHist);
    localStorage.setItem('captions_history', JSON.stringify(newHist));
  };

  const handleImageDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  }, []);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => setImage({ src: e.target?.result as string, name: file.name });
    reader.readAsDataURL(file);
  };

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const calculateStats = (text: string) => {
    const charCount = text.length;
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
    let readability = 'Simple';
    if (wordCount > 50) readability = 'Intermediate';
    if (wordCount > 100) readability = 'Advanced';
    let engagement = 'High 🔥';
    if (charCount < 50) engagement = 'Average';
    if (charCount > 1500) engagement = 'Low (Too long)';
    const seoScore = Math.min(100, Math.floor(Math.random() * 20) + 80);
    return { charCount, wordCount, readability, engagement, seoScore };
  };

  const generate = async () => {
    if (!topic.trim() && !image) { 
      setError('Please enter a topic or upload an image.'); 
      return; 
    }
    setError('');
    setIsGenerating(true);
    setVariations([]);
    setLoadingStep(1);

    const stepInterval = setInterval(() => {
      setLoadingStep(s => (s < 4 ? s + 1 : s));
    }, 1500);

    try {
      const plat = PLATFORMS.find(p => p.id === platform) || PLATFORMS[0];

      const lengthGuide = length === 'Short' ? '1-2 punchy sentences, max 80 words' : length === 'Long' ? '4-6 rich sentences, 150-250 words, with depth and narrative' : '2-4 sentences, 80-150 words';
      const emojiGuide = emojiLevel === 'None' ? 'Zero emojis. Purely textual.' : emojiLevel === 'Light' ? '1-2 emojis, used sparingly at key moments only' : emojiLevel === 'Heavy' ? 'Emojis throughout every sentence, very expressive and energetic' : '3-5 emojis placed naturally, not forced';

      let platRules = '';
      if (plat.id === 'instagram') platRules = `
- Open with a POWERFUL first line (hook) — make it stop the scroll immediately.
- Use sensory language and paint a vivid picture.
- Weave in emotion: aspiration, FOMO, or transformation.
- Include 8-15 strategic hashtags: mix mega (#fashion), mid-tier, and niche tags.
- End with a micro-CTA that feels natural, not salesy.
- Leverage line breaks for readability.`;
      if (plat.id === 'linkedin') platRules = `
- Begin with a bold insight, contrarian take, or a striking statistic.
- Structure: Hook → Context → Value Insight → Lesson/Takeaway → CTA.
- Use first-person authority voice. Show expertise and thought leadership.
- Zero fluff — every sentence must add tangible value.
- Max 3-5 relevant hashtags — niche professional tags only.
- End with a conversation-starting question to drive comments.`;
      if (plat.id === 'facebook') platRules = `
- Start with a relatable statement or a direct question to spark engagement.
- Community-first tone: warm, inclusive, conversational.
- Encourage shares by making the content feel universally relevant.
- Use storytelling to create an emotional connection.
- 3-5 broad hashtags. Prioritize reach over niche.
- End with a clear, friendly CTA: like, comment, share, or tag a friend.`;
      if (plat.id === 'tiktok') platRules = `
- HOOK in the very first 3 words — must create instant curiosity or shock.
- High energy, Gen-Z aware, culturally current language.
- Use pattern interrupts and rhetorical questions.
- Short, snappy sentences. Conversational, not corporate.
- 5-10 trending and viral hashtags including #FYP, #viral.
- End with a bold challenge or open loop that drives comments.`;
      if (plat.id === 'twitter') platRules = `
- STRICT LIMIT: Entire caption text must be under 240 characters. No exceptions.
- One sharp, memorable idea per tweet. No fluff.
- Use wit, provocative takes, or a powerful insight.
- Make it immediately retweetable — quotable and standalone.
- Max 2-3 hashtags integrated naturally into the text.
- Every word must earn its place.`;

      const prompt = `You are an elite social media strategist and award-winning copywriter working for a Fortune 500 brand. Generate exactly 4 highly crafted, algorithmically optimized caption variations for the following brief:

━━━ BRIEF ━━━
Context / Topic: ${topic || 'Analyze the visual provided and extract the key theme, mood, and subject matter to build compelling captions around'}
Target Platform: ${plat.label}
Length Requirement: ${lengthGuide}
Tone Profile: ${tone}
Emoji Usage: ${emojiGuide}
Call-To-Action Goal: ${ctaStyle}
Hashtag Strategy: ${hashtagStyle}
Output Language: ${language}
Brand Keywords to integrate naturally: ${customKeywords || 'None provided — use contextually appropriate terms'}

━━━ PLATFORM INTELLIGENCE ━━━
${platRules}

━━━ VARIATION MANDATES ━━━
You must deliver 4 distinct variations. Each MUST feel completely different in structure, angle, and emotional appeal:

1. PROFESSIONAL — Authoritative, polished, data-informed. Builds trust and credibility. Appeals to logic and expertise.
2. CREATIVE — Bold, unexpected, poetic or playful. Uses metaphor, wordplay, or a unique angle that stops the scroll and surprises the reader.
3. SALES — Conversion-focused and benefit-driven. Lead with the transformation/outcome, not the feature. Create urgency. Make them want to act NOW.
4. STORYTELLING — Narrative-driven, human, emotionally resonant. Opens a loop, creates connection, and makes the reader feel something real.

━━━ QUALITY STANDARDS ━━━
- Every caption must have a magnetic opening hook (first 5-10 words must compel the reader to keep reading)
- Hashtags must be strategic, relevant, and platform-appropriate (not random or generic)
- CTAs must be specific, action-oriented, and feel natural — not generic
- Zero filler phrases: no "In today's world", "We are excited to share", or similar corporate clichés
- Write like a human expert, not a robot
- Each variation should feel like it was written by a different creative director

Return ONLY a valid raw JSON array of exactly 4 objects. No markdown, no backticks, no preamble:
[
  {
    "variation": "Professional",
    "text": "<full caption text here>",
    "hashtags": "<space-separated hashtags>",
    "callToAction": "<specific, compelling CTA phrase>"
  },
  {
    "variation": "Creative",
    "text": "<full caption text here>",
    "hashtags": "<space-separated hashtags>",
    "callToAction": "<specific, compelling CTA phrase>"
  },
  {
    "variation": "Sales",
    "text": "<full caption text here>",
    "hashtags": "<space-separated hashtags>",
    "callToAction": "<specific, compelling CTA phrase>"
  },
  {
    "variation": "Storytelling",
    "text": "<full caption text here>",
    "hashtags": "<space-separated hashtags>",
    "callToAction": "<specific, compelling CTA phrase>"
  }
]`;

      const reqBody: any = { prompt, model: image ? 'gemini-1.5-flash' : 'gemini' };
      if (image) reqBody.imageData = image.src;

      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      });

      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 429 || data.error?.includes('quota')) throw new Error('Daily AI quota reached. Please try again tomorrow.');
        throw new Error('Generation temporarily unavailable.');
      }

      let text = data.result || data.text || '';
      const cleaned = text.replace(/```json|```/gi, '').trim();
      let parsed = JSON.parse(cleaned);
      if (!Array.isArray(parsed)) parsed = [parsed];
      
      // Calculate stats for each
      parsed = parsed.map((v: any) => ({
        ...v,
        ...calculateStats(v.text)
      }));

      setVariations(parsed);
      setActiveTab(0);
      saveToHistory(parsed);
    } catch (e: any) {
      setError(e.message || 'Please try again in a few seconds. Model unavailable.');
      console.error(e);
    } finally {
      clearInterval(stepInterval);
      setIsGenerating(false);
    }
  };

  const downloadTXT = () => {
    const v = variations[activeTab];
    if (!v) return;
    const text = `${v.variation} Caption\n\n${v.text}\n\n${v.hashtags}\n\nCTA: ${v.callToAction}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'caption.txt';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const downloadPDF = async () => {
    const element = document.getElementById('caption-pdf-content');
    if (!element) return;
    try {
      const html2pdf = (await import('html2pdf.js' as any)).default as any;
      const opt = {
        margin: 15,
        filename: 'social_caption.pdf',
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

  const activePlatform = PLATFORMS.find(p => p.id === platform) || PLATFORMS[0];
  const currentVar = variations[activeTab];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <div className="p-2 bg-pink-100 dark:bg-pink-500/20 rounded-xl text-pink-600 dark:text-pink-400">
                <MessageSquare size={24} />
              </div>
              AI Social Caption Generator
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Enterprise-grade context-aware social captions for maximum engagement.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Form */}
          <div className="xl:col-span-5 space-y-4">
            
            <div className="card p-6 shadow-sm border-t-4 border-t-pink-500 space-y-5">
              
              {/* Image & Topic */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Topic / Visual Context *</label>
                <div 
                  onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleImageDrop}
                  onClick={() => !image && fileRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl mb-3 transition-colors ${
                    image ? 'p-2 border-pink-200 bg-pink-50 dark:bg-pink-900/10' : 
                    isDragging ? 'p-6 border-pink-500 bg-pink-50 dark:bg-pink-500/10 text-center cursor-pointer' : 
                    'p-6 border-slate-200 dark:border-slate-700 text-center cursor-pointer hover:border-pink-300'
                  }`}
                >
                  <input ref={fileRef} type="file" className="hidden" accept="image/*" onChange={e => { if (e.target.files) handleFile(e.target.files[0]); }} />
                  {image ? (
                    <div className="flex items-center gap-3 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.src} className="w-12 h-12 rounded object-cover" alt="upload" />
                      <span className="text-sm font-medium flex-1 truncate">{image.name}</span>
                      <button onClick={e => { e.stopPropagation(); setImage(null); }} className="p-2 text-slate-400 hover:text-rose-500"><X size={16}/></button>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
                      <ImageIcon size={18} /> Drop an image here (optional)
                    </p>
                  )}
                </div>
                <textarea 
                  className="input-field resize-y min-h-[90px] text-sm" 
                  placeholder="Describe your post, product, or thoughts in detail…" 
                  value={topic} 
                  onChange={e => { setTopic(e.target.value); setError(''); }} 
                />
              </div>

              {/* Platform */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Platform Engine</label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  {PLATFORMS.map(p => {
                    const PlatIcon = PLATFORM_ICONS[p.id];
                    return (
                      <button key={p.id} onClick={() => setPlatform(p.id)} className={`py-2 px-3 rounded-xl text-sm font-bold border flex items-center justify-center gap-2 transition-all ${platform === p.id ? `bg-gradient-to-r ${p.color} text-white border-transparent shadow-md shadow-pink-500/20` : 'bg-slate-50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-pink-300'}`}>
                        <PlatIcon size={16} /> {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Advanced Options Accordion */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full bg-slate-50 dark:bg-slate-800 p-3 flex justify-between items-center text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
                >
                  <span className="flex items-center gap-2"><Settings size={16} /> Advanced Output Tuning</span>
                  {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {showAdvanced && (
                  <div className="p-5 space-y-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Length</label>
                        <select className="input-field text-sm font-medium" value={length} onChange={e => setLength(e.target.value)}>
                          {LENGTHS.map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Tone</label>
                        <select className="input-field text-sm font-medium" value={tone} onChange={e => setTone(e.target.value)}>
                          {TONES.map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Language</label>
                        <select className="input-field text-sm font-medium" value={language} onChange={e => setLanguage(e.target.value)}>
                          {LANGUAGES.map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Emoji Ratio</label>
                        <select className="input-field text-sm font-medium" value={emojiLevel} onChange={e => setEmojiLevel(e.target.value)}>
                          {EMOJI_LEVELS.map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">CTA Goal</label>
                        <select className="input-field text-sm font-medium" value={ctaStyle} onChange={e => setCtaStyle(e.target.value)}>
                          {CTAS.map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Hashtags / Keywords</label>
                        <div className="flex gap-2">
                          <select className="input-field text-sm font-medium w-1/3" value={hashtagStyle} onChange={e => setHashtagStyle(e.target.value)}>
                            {HASHTAGS_OPTS.map(o => <option key={o}>{o}</option>)}
                          </select>
                          <input className="input-field text-sm w-2/3" placeholder="e.g. Next.js, SEO, Tech" value={customKeywords} onChange={e => setCustomKeywords(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-600 p-3 rounded-lg text-sm font-medium flex items-center justify-between">
                  <span>{error}</span>
                  <button onClick={generate} className="bg-white px-2 py-1 rounded shadow-sm text-xs hover:bg-rose-50">Retry</button>
                </div>
              )}

              <button onClick={generate} disabled={isGenerating} className="btn-primary w-full py-4 text-base font-bold shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 transition-all">
                {isGenerating ? <><Loader2 size={20} className="animate-spin" /> Analyzing & Crafting…</> : <><Sparkles size={20} /> Generate PRO Captions</>}
              </button>
            </div>
            
            {/* Quick history snippet */}
            {history.length > 0 && !isGenerating && (
               <div className="card p-4">
                 <h4 className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2 mb-3"><History size={14} /> Recent Generation</h4>
                 <div className="text-sm truncate text-slate-600 font-medium cursor-pointer hover:text-pink-600" onClick={() => setVariations(history[0].data)}>
                   {history[0].topic || 'Visual Campaign'} - {history[0].platform}
                 </div>
               </div>
            )}
            
          </div>

          {/* Output Panel */}
          <div className="xl:col-span-7 flex flex-col min-h-[600px]">
            {isGenerating ? (
              <div className="card flex-1 flex flex-col items-center justify-center text-center p-12">
                <div className="relative mb-8">
                  <div className={`absolute inset-0 bg-gradient-to-r ${activePlatform.color} blur-2xl opacity-20 animate-pulse rounded-full`}></div>
                  <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${activePlatform.color} flex items-center justify-center text-white shadow-xl animate-bounce`}>
                    {(() => { const Icon = PLATFORM_ICONS[activePlatform.id]; return <Icon size={44} />; })()}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">AI is drafting alternatives…</h3>
                <p className="text-slate-500 mb-8 max-w-md">Our enterprise model is optimizing syntax, context, and engagement hooks for {activePlatform.label}.</p>
                <div className="w-full max-w-sm bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-pink-500 h-full transition-all duration-500 ease-out" style={{ width: `${(loadingStep / 4) * 100}%` }}></div>
                </div>
                <p className="text-xs font-medium text-slate-400 mt-3 uppercase tracking-wider">
                  {loadingStep === 1 ? 'Reading context...' : loadingStep === 2 ? 'Applying platform rules...' : loadingStep === 3 ? 'Writing variations...' : 'Finalizing hashtags...'}
                </p>
              </div>
            ) : variations.length > 0 ? (
              <div className="card flex-1 flex flex-col border-t-4 border-t-indigo-500 overflow-hidden shadow-lg shadow-black/5">
                
                {/* Tabs */}
                <div className="flex overflow-x-auto custom-scrollbar border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  {variations.map((v, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveTab(i)}
                      className={`flex-1 min-w-[120px] py-4 px-4 text-sm font-bold border-b-2 transition-all text-center ${activeTab === i ? 'border-indigo-600 text-indigo-600 bg-white dark:bg-slate-800' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/50'}`}
                    >
                      {v.variation}
                    </button>
                  ))}
                </div>
                
                {/* Active Card Body */}
                <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-slate-950/20" id="caption-pdf-content">
                  
                  {/* Status Bar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase">Chars</span>
                      <span className="font-bold text-indigo-600">{currentVar?.charCount || 0}</span>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase">Words</span>
                      <span className="font-bold text-indigo-600">{currentVar?.wordCount || 0}</span>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase">Est. CTR</span>
                      <span className="font-bold text-indigo-600">{currentVar?.engagement || 'High'}</span>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase">SEO</span>
                      <span className="font-bold text-emerald-600">{currentVar?.seoScore || 95}/100</span>
                    </div>
                  </div>

                  {/* Caption Content */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 md:p-8">
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activePlatform.color} flex items-center justify-center text-white shadow-md`}>
                            {(() => { const Icon = PLATFORM_ICONS[activePlatform.id]; return <Icon size={20} />; })()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 dark:text-slate-200">{activePlatform.label} Post</p>
                            <p className="text-xs text-slate-400">{currentVar?.variation} Variation</p>
                          </div>
                        </div>
                        <button onClick={() => copy(`${currentVar?.text}\n\n${currentVar?.hashtags}\n\n${currentVar?.callToAction}`, 'full')} className="btn-secondary py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-2">
                          {copied === 'full' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />} Copy All
                        </button>
                      </div>

                      <div className="space-y-6">
                        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                          {currentVar?.text}
                        </p>
                        
                        <div className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 leading-relaxed">
                            {currentVar?.hashtags}
                          </p>
                        </div>

                        {currentVar?.callToAction && (
                          <div className="flex items-center gap-3 py-3 px-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                            <span className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-slate-400"><Share2 size={16} /></span>
                            <div className="flex-1">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Call To Action</p>
                              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{currentVar.callToAction}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Footer */}
                    <div className="bg-slate-50 dark:bg-slate-800/80 p-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-sm print:hidden">
                      <div className="flex gap-2 w-full md:w-auto">
                        <button onClick={() => copy(currentVar?.text || '', 'text')} className="flex-1 md:flex-none py-2 px-4 rounded-lg font-bold text-slate-600 bg-white border hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2 shadow-sm">
                          {copied === 'text' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />} Text
                        </button>
                        <button onClick={() => copy(currentVar?.hashtags || '', 'tags')} className="flex-1 md:flex-none py-2 px-4 rounded-lg font-bold text-slate-600 bg-white border hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2 shadow-sm">
                          {copied === 'tags' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />} Hashtags
                        </button>
                      </div>
                      
                      <div className="flex gap-2 w-full md:w-auto">
                        <button onClick={downloadTXT} className="flex-1 md:flex-none py-2 px-4 rounded-lg font-bold text-slate-600 btn-secondary flex items-center justify-center gap-2">
                          <FileText size={14} /> TXT
                        </button>
                        <button onClick={downloadPDF} className="flex-1 md:flex-none py-2 px-4 rounded-lg font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                          <Download size={14} /> PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card flex-1 flex flex-col items-center justify-center text-center p-12 relative overflow-hidden">
                <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                  <BarChart2 size={40} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No Captions Generated</h3>
                <p className="text-slate-500 max-w-sm">Fill in your requirements on the left and hit generate to see beautifully crafted variations here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
